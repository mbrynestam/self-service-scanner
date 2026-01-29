import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  // Must include ALL headers sent by the web client (otherwise the browser blocks the request during preflight)
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Simple in-memory rate limiter (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per minute per IP

function isAbortError(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err.name === "AbortError" || /aborted|timeout/i.test(err.message))
  );
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  return false;
}

// Honeypot bot detection - bots fill in hidden fields, humans don't
function isHoneypotTriggered(honeypot: string | undefined | null): boolean {
  // If honeypot field has any value, it's likely a bot
  return typeof honeypot === 'string' && honeypot.trim().length > 0;
}

// Suspicious user agent patterns
const SUSPICIOUS_USER_AGENTS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java(?!script)/i,
  /go-http/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
];

function isSuspiciousUserAgent(ua: string | null): boolean {
  if (!ua) return true; // No user agent is suspicious
  if (ua.length < 20) return true; // Too short is suspicious
  
  return SUSPICIOUS_USER_AGENTS.some(pattern => pattern.test(ua));
}

// URL validation to prevent SSRF attacks
function isValidPublicUrl(urlString: string): { valid: boolean; error?: string; url?: string } {
  try {
    // Length limit
    if (urlString.length > 2048) {
      return { valid: false, error: "URL is too long (max 2048 characters)" };
    }

    // Add protocol if missing
    let fullUrl = urlString.trim();
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl;
    }

    const parsed = new URL(fullUrl);

    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: "Only HTTP and HTTPS protocols are allowed" };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block localhost and loopback addresses
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '[::1]') {
      return { valid: false, error: "Local addresses are not allowed" };
    }

    // Block private IP ranges
    const privateIpPatterns = [
      /^10\./,                          // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
      /^192\.168\./,                    // 192.168.0.0/16
      /^169\.254\./,                    // Link-local
      /^fc[0-9a-f]{2}:/i,               // IPv6 unique local
      /^fd[0-9a-f]{2}:/i,               // IPv6 unique local
      /^fe80:/i,                        // IPv6 link-local
    ];

    for (const pattern of privateIpPatterns) {
      if (pattern.test(hostname)) {
        return { valid: false, error: "Private IP addresses are not allowed" };
      }
    }

    // Block cloud metadata endpoints
    const blockedHosts = [
      '169.254.169.254',           // AWS/GCP/Azure metadata
      'metadata.google.internal',   // GCP
      'metadata.google.com',        // GCP
      'instance-data',              // EC2
    ];

    if (blockedHosts.includes(hostname)) {
      return { valid: false, error: "This address is not allowed" };
    }

    // Must have a valid domain with at least one dot (no bare hostnames)
    if (!hostname.includes('.')) {
      return { valid: false, error: "Invalid domain name" };
    }

    return { valid: true, url: fullUrl };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
}

// Scrape website using Firecrawl API
async function scrapeWithFirecrawl(url: string): Promise<string> {
  const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!apiKey) {
    console.log("FIRECRAWL_API_KEY not configured, falling back to basic scraper");
    return scrapeWebsiteBasic(url);
  }

  try {
    // Ensure URL has protocol
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = 'https://' + url;
    }

    console.log("Scraping with Firecrawl:", fullUrl);
    
    const response = await fetchWithTimeout('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: fullUrl,
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 3000, // Wait for JavaScript to render
      }),
    }, 15000);

    if (!response.ok) {
      console.error("Firecrawl API error:", response.status);
      return scrapeWebsiteBasic(url);
    }

    const data = await response.json();
    const markdown = data.data?.markdown || data.markdown || "";
    
    // Limit text length to avoid token limits
    const maxLength = 12000;
    if (markdown.length > maxLength) {
      console.log("Firecrawl content truncated from", markdown.length, "to", maxLength);
      return markdown.substring(0, maxLength) + "...";
    }
    
    console.log("Firecrawl extracted text length:", markdown.length);
    return markdown;
  } catch (error) {
    if (isAbortError(error)) {
      console.warn("Firecrawl timeout, falling back to basic scraper");
    } else {
      console.error("Firecrawl error:", error);
    }
    return scrapeWebsiteBasic(url);
  }
}

// Basic HTML scraper as fallback
function extractTextFromHtml(html: string): string {
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  text = text.replace(/<\/(div|p|h[1-6]|li|tr|section|article|header|footer|nav|aside)>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&auml;/g, 'ä');
  text = text.replace(/&ouml;/g, 'ö');
  text = text.replace(/&aring;/g, 'å');
  text = text.replace(/&Auml;/g, 'Ä');
  text = text.replace(/&Ouml;/g, 'Ö');
  text = text.replace(/&Aring;/g, 'Å');
  text = text.replace(/\s+/g, ' ');
  text = text.replace(/\n\s+/g, '\n');
  text = text.replace(/\n+/g, '\n');
  return text.trim();
}

async function scrapeWebsiteBasic(url: string): Promise<string> {
  try {
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = 'https://' + url;
    }

    console.log("Basic scraper fetching:", fullUrl);
    
    const response = await fetchWithTimeout(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
      },
    }, 10000);

    if (!response.ok) {
      console.error("Basic scraper failed:", response.status);
      return "";
    }

    const html = await response.text();
    const text = extractTextFromHtml(html);
    
    const maxLength = 10000;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    
    console.log("Basic scraper extracted:", text.length, "chars");
    return text;
  } catch (error) {
    if (isAbortError(error)) {
      console.warn("Basic scraper timeout");
    } else {
      console.error("Basic scraper error:", error);
    }
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIp)) {
      console.warn("Rate limit exceeded for IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Bot detection: Check user agent
    const userAgent = req.headers.get("user-agent");
    if (isSuspiciousUserAgent(userAgent)) {
      console.warn("Suspicious user agent blocked:", userAgent, "IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Request blocked" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { url, honeypot } = await req.json();
    
    // Honeypot bot detection: If hidden field is filled, it's a bot
    if (isHoneypotTriggered(honeypot)) {
      console.warn("Honeypot triggered - bot detected, IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Request validation failed" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!url || typeof url !== 'string') {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate URL to prevent SSRF attacks
    const urlValidation = isValidPublicUrl(url);
    if (!urlValidation.valid) {
      console.warn("Invalid URL rejected:", url, urlValidation.error);
      return new Response(
        JSON.stringify({ error: urlValidation.error || "Invalid URL" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validatedUrl = urlValidation.url!;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analyzing website:", validatedUrl);

    // Scrape the website content using Firecrawl (with basic fallback)
    const websiteContent = await scrapeWithFirecrawl(validatedUrl);
    const hasContent = websiteContent.length > 100;
    
    console.log("Content scraped:", hasContent ? "success" : "failed/minimal", "length:", websiteContent.length);

    // Single consolidated prompt - v3 with updated analysis workflow
    const systemPrompt = `Du är en strategisk B2B-analytiker som analyserar företagswebbplatser för att identifiera möjliga self-service-verktyg som kan hjälpa köpare att känna sig trygga och välinformerade långt innan de pratar med sälj.

Detta verktyg visar möjligheter, inte beslut.
Det ska inte ersätta dialog, rådgivning eller implementation.

Grundregler (obligatoriska)

Nämn aldrig några böcker, metoder eller ramverk vid namn.

Detta verktyg är endast för B2B.

Om företaget primärt är B2C ska analysen avslutas direkt.

Användaren ska inte kunna välja vilket verktyg som ska byggas.

Resultatet ska kännas som en demo av vad som är möjligt, inte ett färdigt förslag.

Var hellre tydlig och något generell än osäker eller "okänt".

STEG 1 – Tvingad signalinsamling (kritisk)

Du får en URL.

När du analyserar webbplatsen ska du explicit och aktivt läsa och ta hänsyn till följande delar, i denna ordning:

Sidans title och meta description

Huvudnavigationens menyetiketter (toppmeny)

"Om oss"-text, även om den ligger längst ner på startsidan

Återkommande begrepp i brödtext (upprepade ord är viktigare än slogans)

Hero-texter, visioner och slogans (lägst prioritet)

Du ska analysera 2–5 relevanta sidor, exempelvis:

startsida

vad vi gör / tjänster / produkt / plattform

lösningar / use cases

priser (om finns)

om oss

⚠️ Navigation, title, meta och om-oss väger tyngre än marknadsföringsspråk.

STEG 2 – Bransch- och erbjudandeklassificering (med bevis)

2.1 Samla bevis först

Innan du anger bransch eller erbjudande ska du identifiera minst 3 och max 6 konkreta bevis, t.ex.:

ord/fraser från title

menyord (ex. "Kundundersökningar", "Medarbetarundersökningar", "Priser")

formuleringar i om-oss (ex. "vi hjälper företag mäta…")

Bevis ska vara faktiska ord, inte tolkningar.

2.2 Gör klassificeringen

Utifrån bevisen, avgör:

vilken bransch/kategori företaget verkar inom

vad de faktiskt säljer (t.ex. analys, mjukvara, metod, tjänst eller kombination)

vem de säljer till

om köpet verkar ha låg, medel eller hög komplexitet

Mycket viktig regel

Särskilj alltid:

Vad företaget ÄR (vad kunden köper)

Hur företaget BESKRIVER SIG (vision, effekt, positionering)

Ord som insikter, transformation, smartare beslut, framtid får aldrig ensamma avgöra bransch.

2.3 Analys-/undersöknings-fallback (nyckel för konsult-liknande bolag)

Om webbplatsen tydligt återkommer till begrepp som:

kundnöjdhet

kundundersökningar

medarbetarundersökningar

analys, mätning, insikter

lojalitet, CX, EX, NPS

beslutsunderlag, affärsbeslut

→ klassificera företaget som B2B kundinsikts- / analys-leverantör
(ofta en kombination av metod, analys och ibland mjukvara)

⚠️ Skriv inte "okänt" om dessa signaler finns.
Välj den mest sannolika B2B-kategorin baserat på bevis.

2.4 B2C-regel

Om bevisen tydligt visar att företaget säljer till privatpersoner:
Avsluta analysen och skriv att denna scanner endast är för B2B.

STEG 3 – Köpgrupp och roller

Gå nu in i målgruppens perspektiv.

Identifiera sannolika roller i köpgruppen.
Ju större och mer komplex affär, desto fler roller.

Exempel:

ledning

affärs-/verksamhetsansvar

marknad / kundansvar

HR (vid medarbetarundersökningar)

IT / data (vid analysplattformar)

ekonomi / inköp

STEG 4 – Köparnas osäkerhet före kontakt

För varje roll, identifiera:

största pain points

oro och upplevda risker

invändningar och motstånd

förutfattade meningar

tveksamheter och rädslor

frågor de vill ha svar på innan säljkontakt

Avsluta med en sammanfattning:
De vanligaste köparfrågorna som uppstår före köp.

STEG 5 – Brainstorma self-service-verktyg (möjligheter)

Ta fram idéer på self-service-verktyg som kan hjälpa dessa köpare att bli trygga och informerade innan de pratar med sälj.

Använd följande kategorier:

Pricing
(priskalkylator, ROI-kalkylator, budgetverktyg)

Assessment
(självtest, behovsanalys, mognadsbedömning, riskanalys)

Selector
(lösningsväljare, produkt- eller metodguide, jämförelseverktyg)

Configurator
(lösningsdesigner, paketbyggare, uppläggs-konfigurator)

Scheduling
(mötesbokning, demo-bokning, rådgivningssamtal)

Other
(endast om tydligt relevant)

Brainstorma 2–4 idéer per kategori, anpassade till just detta företag och dess köpare.

STEG 6 – Prioritering

Rangordna alla idéer efter förväntat affärsvärde i en B2B-säljprocess.
(Pris- och riskrelaterade verktyg är ofta högt värde, men inte alltid.)

Välj ut 4–6 starkaste förslagen totalt.

STEG 7 – Presentation av förslagen (KRITISKT FÖR KVALITET)

⚠️ MYCKET VIKTIGT: Varje verktygsförslag MÅSTE vara unikt och specifikt anpassat till just detta företag.

FÖRBJUDET att använda generiska fraser som:
- "er lösning", "era tjänster", "er verksamhet"
- "baserat på deras behov", "anpassat till kunden"
- "hjälper besökare förstå", "ger trygghet"

OBLIGATORISKT att:
- Nämna företagets faktiska erbjudande eller branschspecifika termer i titeln
- Beskriva konkret HUR verktyget hjälper köparen med specifika scenarier
- Referera till identifierade pain points och köpfrågor från steg 4

Exempel på BRA vs DÅLIGT:

DÅLIGT (generiskt):
- Titel: "Priskalkylator för er lösning"
- Beskrivning: "Låter besökare estimera kostnaden baserat på deras specifika behov."

BRA (specifikt för ett kundundersökningsföretag):
- Titel: "Beräkna kostnaden för er kundundersökning"  
- Beskrivning: "Ange antal respondenter, undersökningstyp och frekvens för att få en prisuppskattning – så slipper ni vänta på offert."

BRA (specifikt för ett SaaS-bolag inom HR):
- Titel: "Beräkna ROI för automatiserad onboarding"
- Beskrivning: "Se hur mycket tid era HR-chefer sparar per nyanställd och vad det motsvarar i kronor per år."

För varje utvalt verktyg, visa:

Titel: 3–8 ord, specifik och konkret med branschtermer eller företagets erbjudande

Beskrivning: 15–30 ord som beskriver:
1. VAD användaren gör i verktyget (konkret handling)
2. VARFÖR det hjälper dem (kopplat till deras oro eller fråga)

Kategori: pricing, assessment, selector, configurator, scheduling eller other

Affärsvärde: lågt, medium eller högt

Språk: svenska
Ton: professionell, tydlig, utan hype

Avslutande inramning (måste med)

Avsluta alltid med en kort förklaring som tydligt säger att:

detta är exempel på möjligheter, inte rekommendationer

vilket verktyg som är rätt att bygga avgörs först i dialog

nästa steg är ett möte där exempel visas och nästa steg diskuteras tillsammans

Returnera ENDAST valid JSON enligt detta schema:
{
  "isB2B": boolean,
  "businessType": "tjänst" | "produkt/tillverkning" | "SaaS" | "konsult/byrå" | "B2C",
  "industry": "string (max 5 ord)",
  "coreOffering": "string (max 10 ord, företagets huvuderbjudande)",
  "targetAudience": "string (max 15 ord)",
  "buyerRoles": ["string", "string"] (max 5 roller),
  "buyerQuestions": ["string", "string"] (max 5 frågor),
  "painPoints": ["string", "string"] (max 4 utmaningar),
  "concerns": ["string", "string"] (max 4 orosmoment),
  "opportunities": [
    {
      "type": "pricing" | "assessment" | "selector" | "configurator" | "scheduling" | "other",
      "title": "string (3-8 ord, specifik titel med branschtermer)",
      "description": "string (15-30 ord, konkret beskrivning av vad användaren gör och varför det hjälper)",
      "potentialValue": "high" | "medium" | "low"
    }
  ] (4-6 verktyg, sorterade efter affärsvärde),
  "closingNote": "string (en kort mening som säger att detta är exempel på möjligheter, inte rekommendationer, och att nästa steg är ett möte)"
}`;

    // Build user message with scraped content if available
    let userMessage = `Analysera denna webbplats: ${url}`;
    
    if (hasContent) {
      userMessage += `\n\nWebbplatsinnehåll:\n\n${websiteContent}`;
    }

    // Retry logic for AI calls
    let content: string | null = null;
    let lastError: Error | null = null;
    const maxRetries = 1;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`AI attempt ${attempt + 1}...`);
        const response = await fetchWithTimeout("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview", // Faster model for quicker response
            max_completion_tokens: 4000,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage }
            ],
          }),
        }, 90000); // Increased to 90 seconds

        if (!response.ok) {
          if (response.status === 429) {
            return new Response(
              JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          if (response.status === 402) {
            return new Response(
              JSON.stringify({ error: "Payment required, please add funds." }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          const errorText = await response.text();
          console.error("AI gateway error:", response.status, errorText);
          lastError = new Error(`AI gateway error: ${response.status}`);
          continue;
        }

        const data = await response.json();
        content = data.choices?.[0]?.message?.content;

        if (content && content.trim().length > 50) {
          console.log("AI response received, length:", content.length);
          
          // Validate JSON before accepting - retry if invalid
          try {
            const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            JSON.parse(jsonStr); // Test parse
            console.log("JSON validation passed");
            break; // Success - valid JSON
          } catch (jsonError) {
            console.warn(`Attempt ${attempt + 1}: Invalid JSON in response, retrying...`, jsonError);
            lastError = new Error("Invalid JSON response");
            content = null; // Reset so we retry
            continue;
          }
        }
        
        console.warn(`Attempt ${attempt + 1}: Empty or minimal AI response, retrying...`);
        lastError = new Error("Empty AI response");
      } catch (err) {
        console.error(`Attempt ${attempt + 1} failed:`, err);
        lastError = err instanceof Error ? err : new Error("Unknown error");
      }
      
      // Wait before retry
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }

    if (!content || content.trim().length < 50) {
      console.error("All AI attempts failed, returning error");
      return new Response(
        JSON.stringify({ 
          error: "Analysen kunde inte slutföras just nu. Vänligen försök igen om en stund.",
          details: isAbortError(lastError) ? "AI-förfrågan tog för lång tid." : undefined,
          retry: true 
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI response preview:", content.substring(0, 300));

    // Parse JSON from response
    let analysis;
    try {
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, "Content:", content.substring(0, 500));
      return new Response(
        JSON.stringify({ 
          error: "Analysen kunde inte slutföras. Vänligen försök igen.",
          retry: true 
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, analysis, hasScrapedContent: hasContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error analyzing website:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

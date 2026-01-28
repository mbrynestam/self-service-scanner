import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
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
    });

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
    console.error("Firecrawl error:", error);
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
    
    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
      },
    });

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
    console.error("Basic scraper error:", error);
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing website:", url);

    // Scrape the website content using Firecrawl (with basic fallback)
    const websiteContent = await scrapeWithFirecrawl(url);
    const hasContent = websiteContent.length > 100;
    
    console.log("Content scraped:", hasContent ? "success" : "failed/minimal", "length:", websiteContent.length);

    // Single consolidated prompt
    const systemPrompt = `Du är en strategisk B2B-analytiker som analyserar företagswebbplatser för att identifiera möjliga self-service-verktyg som kan hjälpa köpare bli trygga och välinformerade innan de pratar med sälj.

VIKTIGT
- Nämn aldrig några böcker, metoder eller ramverk vid namn.
- Detta verktyg är endast för B2B.
- Visa möjligheter, inte beslut.
- Användaren ska inte kunna välja vilket verktyg som ska byggas.
- Output ska kännas som en demo av vad som är möjligt, inte rådgivning eller implementation.

Arbetsgång

1. URL-analys
Läs in och analysera innehållet från webbplatsen (startsida, tjänster/produkter, lösningar/industrier, om oss, eventuell prissida).

2. Verksamhetsbedömning
Avgör:
- vilken bransch företaget verkar i
- vad de säljer (tjänst, produkt, SaaS eller kombination)
- vem de säljer till
- om köpet verkar vara enkelt eller komplext

Om företaget primärt är B2C:
avsluta direkt och sätt isB2B till false.

3. Köpgrupp & roller
Gå in i målgruppens perspektiv.
Identifiera troliga roller i köpgruppen (fler roller vid större/mer komplexa köp), t.ex. ledning, operativt ansvar, inköp, ekonomi, teknik.

4. Köparnas osäkerhet före kontakt
För varje roll, identifiera deras:
- största pain points
- oro och risker
- invändningar och motstånd
- förutfattade meningar
- tveksamheter och rädslor
- frågor de vill ha svar på innan de pratar med sälj

Sammanfatta detta till de vanligaste köparfrågorna som tenderar att uppstå före köp.

5. Brainstorma self-service-verktyg
Ta fram idéer på self-service-verktyg som kan hjälpa dessa köpare att känna sig trygga och informerade långt innan säljkontakt.

Använd följande kategorier:
- pricing: (t.ex. priskalkylator, ROI-kalkylator, budgetverktyg)
- assessment: (t.ex. självtest, behovsanalys, mognadsbedömning, riskanalys)
- selector: (t.ex. lösningsväljare, produktguide, jämförelseverktyg)
- configurator: (t.ex. produktkonfigurator, paketbyggare, lösningsdesigner)
- scheduling: (t.ex. bokningsverktyg, demo-bokning, mötesschemaläggare)
- other: (annat relevant verktyg om det är tydligt motiverat)

Brainstorma 2–4 idéer per kategori.
Var alltid specifik för just detta företag och dess köpare.

6. Prioritering
Rangordna samtliga idéer efter förväntat affärsvärde i en B2B-säljprocess
(pris-relaterade verktyg är ofta högt värde, men inte alltid).

Välj ut 4–6 starkaste förslagen totalt.

7. Presentation av förslagen
För varje utvalt verktyg ska du visa:
- Titel: 3–6 ord, tydlig och komplett
- Beskrivning: 10–20 ord som förklarar vad verktyget gör och vilken trygghet det skapar
- Kategori: vilken typ av self-service-verktyg det är
- Affärsvärde: lågt, medium eller högt

Språk: svenska.
Ton: professionell, tydlig, utan marknadsfluff.

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
      "title": "string (3-6 ord, komplett titel)",
      "description": "string (10-20 ord, en fullständig mening)",
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
    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`AI attempt ${attempt + 1}...`);
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userMessage }
            ],
          }),
        });

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
          break; // Success
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
      console.error("All AI attempts failed, using fallback");
      const fallbackAnalysis = {
        isB2B: true,
        businessType: "tjänst",
        industry: "Ej identifierat",
        coreOffering: "Professionella tjänster",
        targetAudience: "B2B-företag",
        buyerRoles: ["VD", "Marknadschef", "Inköpschef"],
        buyerQuestions: [
          "Vad kostar det?",
          "Hur lång är implementationstiden?",
          "Passar detta för vår verksamhet?"
        ],
        painPoints: [
          "Svårt att jämföra alternativ",
          "Otydlig prisbild"
        ],
        concerns: [
          "ROI osäkerhet",
          "Implementeringsrisk"
        ],
        opportunities: [
          {
            type: "pricing",
            title: "Priskalkylator för er lösning",
            description: "Låter besökare estimera kostnaden baserat på deras specifika behov och storlek.",
            potentialValue: "high"
          },
          {
            type: "assessment",
            title: "Behovsanalys för besökare",
            description: "Hjälp potentiella köpare förstå om er lösning passar deras situation.",
            potentialValue: "high"
          },
          {
            type: "selector",
            title: "Hitta rätt tjänst för er",
            description: "Guidad väljare som matchar besökarens behov med rätt erbjudande.",
            potentialValue: "medium"
          },
          {
            type: "scheduling",
            title: "Boka ett möte direkt",
            description: "Låt kvalificerade besökare boka ett möte utan att vänta på svar.",
            potentialValue: "medium"
          }
        ],
        closingNote: "Detta är exempel på möjligheter, inte rekommendationer. Vilket verktyg som är rätt att bygga avgörs i dialog vid ett möte."
      };
      
      return new Response(
        JSON.stringify({ success: true, analysis: fallbackAnalysis, hasScrapedContent: hasContent, fallback: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
      analysis = {
        isB2B: true,
        businessType: "tjänst",
        industry: "Ej identifierat",
        coreOffering: "Professionella tjänster",
        targetAudience: "B2B-företag",
        buyerRoles: ["VD", "Marknadschef"],
        buyerQuestions: ["Vad kostar det?", "Passar detta för oss?"],
        painPoints: ["Svårt att jämföra alternativ"],
        concerns: ["ROI osäkerhet"],
        opportunities: [
          {
            type: "pricing",
            title: "Priskalkylator",
            description: "Beräkna kostnader direkt baserat på era behov.",
            potentialValue: "high"
          },
          {
            type: "assessment",
            title: "Behovsanalys",
            description: "Hjälp besökare förstå sina behov och om lösningen passar.",
            potentialValue: "high"
          }
        ],
        closingNote: "Detta är exempel på möjligheter, inte rekommendationer."
      };
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

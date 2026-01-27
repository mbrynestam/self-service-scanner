import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple HTML to text extraction
function extractTextFromHtml(html: string): string {
  // Remove script and style tags with their content
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '');
  
  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  
  // Replace common block elements with newlines
  text = text.replace(/<\/(div|p|h[1-6]|li|tr|section|article|header|footer|nav|aside)>/gi, '\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
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
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ');
  text = text.replace(/\n\s+/g, '\n');
  text = text.replace(/\n+/g, '\n');
  
  return text.trim();
}

async function scrapeWebsite(url: string): Promise<string> {
  try {
    // Ensure URL has protocol
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = 'https://' + url;
    }

    console.log("Fetching website:", fullUrl);
    
    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch website:", response.status, response.statusText);
      return "";
    }

    const html = await response.text();
    const text = extractTextFromHtml(html);
    
    // Limit text length to avoid token limits (approx 8000 chars)
    const maxLength = 8000;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    
    console.log("Extracted text length:", text.length);
    return text;
  } catch (error) {
    console.error("Error scraping website:", error);
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, step } = await req.json();
    
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

    console.log("Analyzing website:", url, "step:", step || "full");

    // Scrape the website content
    const websiteContent = await scrapeWebsite(url);
    const hasContent = websiteContent.length > 100;
    
    console.log("Website content scraped:", hasContent ? "success" : "failed or minimal content");

    // Different prompts for different steps
    let systemPrompt: string;
    let expectedFields: string[];
    
    if (step === "audience") {
      // Step 1: Quick audience & roles analysis
      systemPrompt = `Du är en strateg på B2B-företaget Buyr. Analysera webbplatsen och identifiera ENDAST:
1. Om det är B2B eller B2C
2. Verksamhetstyp (tjänst/produkt/SaaS/konsult)
3. Primär målgrupp (kort beskrivning, max 15 ord)
4. Köproller (max 4 stycken)

Returnera ENDAST JSON:
{
  "isB2B": true | false,
  "businessType": "tjänst" | "produkt/tillverkning" | "SaaS" | "konsult/byrå" | "B2C",
  "targetAudience": "Kort beskrivning",
  "buyerRoles": ["Roll 1", "Roll 2"]
}`;
      expectedFields = ["isB2B", "businessType", "targetAudience", "buyerRoles"];
      
    } else if (step === "questions") {
      // Step 2: Pain points and questions
      systemPrompt = `Du är en strateg på B2B-företaget Buyr. Analysera webbplatsen och identifiera ENDAST:
1. Köparnas viktigaste frågor före köp (max 4)
2. Pain points (max 3)
3. Oro och risker köparen har (max 3)

Returnera ENDAST JSON:
{
  "buyerQuestions": ["Fråga 1", "Fråga 2"],
  "painPoints": ["Pain 1", "Pain 2"],
  "concerns": ["Oro 1", "Oro 2"]
}`;
      expectedFields = ["buyerQuestions", "painPoints", "concerns"];
      
    } else if (step === "opportunities") {
      // Step 3: Self-service opportunities
      systemPrompt = `Du är en strateg på B2B-företaget Buyr, expert på self-service som säljstrategi.
Analysera webbplatsen och rekommendera 1-6 self-service-verktyg som skapar affärsvärde.

VIKTIGT: En priskalkylator (pricing) är nästan ALLTID det mest relevanta verktyget för B2B-företag. 
Den ska ALLTID inkluderas om företaget inte redan har en synlig prissättning på sajten.
Priskalkylator bör typiskt vara det första alternativet i listan.

Self-service-typer:
1. pricing: Priskalkylator/ROI-kalkylator - Låter köparen förstå kostnader och värde innan kontakt
2. assessment: Självtest/behovsanalys - Hjälper köparen kvalificera sig själv
3. selector: Lösningsväljare/produktguide - Guidar till rätt produkt/tjänst
4. configurator: Produktkonfigurator - Låter köparen bygga sin lösning
5. scheduling: Bokningsverktyg - Enkel mötesbokning
6. other: Annat verktyg - För idéer som inte passar ovan

Returnera ENDAST JSON:
{
  "recommended": "pricing" | "assessment" | "selector" | "configurator" | "scheduling" | "other",
  "reasoning": "Kort förklaring (max 30 ord)",
  "opportunities": [
    {
      "type": "pricing" | "assessment" | "selector" | "configurator" | "scheduling" | "other",
      "title": "Verktygets namn",
      "description": "Vad det löser (max 20 ord)",
      "potentialValue": "high" | "medium" | "low",
      "fit": 0.0-1.0
    }
  ]
}`;
      expectedFields = ["recommended", "reasoning", "opportunities"];
      
    } else {
      // Full analysis (fallback)
      systemPrompt = `Du är en strateg på B2B-företaget Buyr, expert på self-service som säljstrategi.
Ditt jobb är att analysera B2B-webbplatser ur köparens perspektiv och identifiera vilka self-service-verktyg som skapar mest affärsvärde.

ARBETSFLÖDE:

1. Analysera webbplatsen:
   - Avgör om det är ett B2B-företag (tjänst, produkt/tillverkning, SaaS, konsult/byrå).
   - Om sajten primärt är B2C: sätt "isB2B" till false och avbryt analysen.

2. Identifiera målgruppen:
   - Bestäm primär målgrupp.
   - Gå in i rollen som deras primära köproller (t.ex. VD, operativ chef, inköp, marknad/sälj, teknisk roll).
   - Identifiera deras viktigaste: pain points, frågor före köp, oro/risker/rädslor, friktion och motstånd i köpresan.

3. Matcha mot de fem self-service-typerna:
   - Self-Assessment (assessment)
   - Self-Selection (selector)
   - Self-Configuration (configurator)
   - Self-Pricing (pricing)
   - Self-Scheduling (scheduling)

4. Brainstorma 1-4 konkreta idéer per relevant self-service-typ som minskar säljfriktion, bygger förtroende eller ökar kvalificering.

5. Prioritera och välj ut de 1-4 bästa idéerna totalt, rangordnade efter affärsvärde.

TON & REGLER:
- Var diagnostisk, konkret och affärsnära.
- Undvik fluff och generiska råd.
- Gör rimliga antaganden när information saknas, men var tydlig.
- Basera din analys på det faktiska innehållet från webbplatsen när det är tillgängligt.

Returnera ENDAST JSON med följande struktur:
{
  "isB2B": true | false,
  "businessType": "tjänst" | "produkt/tillverkning" | "SaaS" | "konsult/byrå" | "B2C",
  "targetAudience": "Beskrivning av primär målgrupp",
  "buyerRoles": ["VD", "Inköpschef", etc.],
  "painPoints": ["Pain point 1", "Pain point 2"],
  "buyerQuestions": ["Fråga 1", "Fråga 2"],
  "concerns": ["Oro/risk 1", "Oro/risk 2"],
  "recommended": "assessment" | "selector" | "configurator" | "pricing" | "scheduling",
  "confidence": 0.0-1.0,
  "reasoning": "Kort förklaring på svenska varför detta verktyg passar bäst",
  "opportunities": [
    {
      "type": "assessment" | "selector" | "configurator" | "pricing" | "scheduling",
      "title": "Arbetsnamn på verktyget",
      "description": "Vilket köparproblem verktyget löser",
      "potentialValue": "Högt" | "Mycket högt" | "Medium",
      "businessValuePercent": 10-50,
      "fit": 0.0-1.0
    }
  ]
}

Returnera ENDAST JSON, ingen annan text.`;
      expectedFields = ["isB2B", "businessType", "targetAudience", "buyerRoles", "opportunities"];
    }

    // Build user message with scraped content if available
    let userMessage = `Analysera denna webbplats: ${url}`;
    
    if (hasContent) {
      // Limit content for faster responses on partial steps
      const maxContent = step ? 4000 : 8000;
      const limitedContent = websiteContent.length > maxContent 
        ? websiteContent.substring(0, maxContent) + "..." 
        : websiteContent;
      userMessage += `\n\nWebbplatsinnehåll:\n\n${limitedContent}`;
    }

    // Retry logic for AI calls
    let content: string | null = null;
    let lastError: Error | null = null;
    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
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
            temperature: 0.5,
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

        if (content && content.trim().length > 10) {
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

    if (!content || content.trim().length < 10) {
      console.error("All AI attempts failed, using fallback for step:", step);
      // Use fallback response based on step
      let fallbackAnalysis;
      if (step === "audience") {
        fallbackAnalysis = {
          isB2B: true,
          businessType: "tjänst",
          targetAudience: "B2B-företag",
          buyerRoles: ["VD", "Marknadschef", "Inköpschef"]
        };
      } else if (step === "questions") {
        fallbackAnalysis = {
          buyerQuestions: ["Vad kostar det?", "Hur fungerar det?", "Passar detta för oss?"],
          painPoints: ["Svårt att jämföra alternativ", "Otydliga priser"],
          concerns: ["ROI osäkerhet", "Implementeringstid"]
        };
      } else if (step === "opportunities") {
        fallbackAnalysis = {
          recommended: "pricing",
          reasoning: "En priskalkylator hjälper köpare förstå investeringen tidigt.",
          opportunities: [
            {
              type: "pricing",
              title: "Priskalkylator",
              description: "Låter besökare estimera kostnaden baserat på deras behov.",
              potentialValue: "high",
              fit: 0.9
            },
            {
              type: "assessment",
              title: "Behovsanalys",
              description: "Hjälp besökare förstå om lösningen passar dem.",
              potentialValue: "high",
              fit: 0.85
            }
          ]
        };
      } else {
        fallbackAnalysis = {
          isB2B: true,
          businessType: "tjänst",
          targetAudience: "B2B-företag",
          buyerRoles: ["VD", "Marknadschef"],
          painPoints: ["Otydlig prissättning"],
          buyerQuestions: ["Vad kostar det?"],
          concerns: ["ROI osäkerhet"],
          recommended: "pricing",
          confidence: 0.7,
          reasoning: "Priskalkylator är ofta det mest efterfrågade verktyget.",
          opportunities: [
            {
              type: "pricing",
              title: "Priskalkylator",
              description: "Beräkna kostnader direkt.",
              potentialValue: "Högt",
              businessValuePercent: 35,
              fit: 0.85
            }
          ]
        };
      }
      
      return new Response(
        JSON.stringify({ success: true, analysis: fallbackAnalysis, step: step || "full", hasScrapedContent: hasContent, fallback: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI response for step", step || "full", ":", content.substring(0, 200));

    // Parse JSON from response
    let analysis;
    try {
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return step-specific fallback
      if (step === "audience") {
        analysis = {
          isB2B: true,
          businessType: "tjänst",
          targetAudience: "B2B-företag",
          buyerRoles: ["VD", "Marknadschef"]
        };
      } else if (step === "questions") {
        analysis = {
          buyerQuestions: ["Vad kostar det?", "Passar detta för oss?"],
          painPoints: ["Svårt att jämföra alternativ"],
          concerns: ["ROI osäkerhet"]
        };
      } else if (step === "opportunities") {
        analysis = {
          recommended: "assessment",
          reasoning: "Ett självtest hjälper köparen förstå sitt behov.",
          opportunities: [
            {
              type: "assessment",
              title: "Behovsanalys",
              description: "Hjälp besökare förstå sina behov.",
              potentialValue: "Högt",
              businessValuePercent: 30,
              fit: 0.8
            }
          ]
        };
      } else {
        analysis = {
          isB2B: true,
          businessType: "tjänst",
          targetAudience: "B2B-företag som vill effektivisera sin verksamhet",
          buyerRoles: ["VD", "Marknadschef"],
          painPoints: ["Svårt att jämföra alternativ"],
          buyerQuestions: ["Vad kostar det?"],
          concerns: ["ROI osäkerhet"],
          recommended: "pricing",
          confidence: 0.7,
          reasoning: "En priskalkylator verkar passa.",
          opportunities: [
            {
              type: "pricing",
              title: "Priskalkylator",
              description: "Beräkna kostnader direkt.",
              potentialValue: "Högt",
              businessValuePercent: 35,
              fit: 0.8
            }
          ]
        };
      }
    }

    return new Response(
      JSON.stringify({ success: true, analysis, step: step || "full", hasScrapedContent: hasContent }),
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

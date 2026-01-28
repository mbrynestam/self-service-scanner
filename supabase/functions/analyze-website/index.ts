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

    // Different prompts for different steps - optimized for GPT models
    let systemPrompt: string;
    let expectedFields: string[];
    
    if (step === "audience") {
      // Step 1: Quick audience & roles analysis
      systemPrompt = `<role>Du är en erfaren B2B-strateg på företaget Buyr, specialiserad på att analysera företag och deras målgrupper.</role>

<task>Analysera webbplatsen och identifiera företagets kärnverksamhet och målgrupp.</task>

<critical_rules>
1. KÄRNVERKSAMHET FÖRST: Identifiera den primära tjänsten/produkten som genererar huvuddelen av intäkterna.
2. IGNORERA sidotjänster, sekundära erbjudanden och bi-sysslor.
3. Alla svar ska vara på SVENSKA.
</critical_rules>

<analysis_steps>
1. Läs webbplatsinnehållet noggrant
2. Identifiera huvuderbjudandet (inte allt företaget gör)
3. Avgör om det primärt är B2B eller B2C
4. Kategorisera verksamhetstypen
5. Beskriv målgruppen kortfattat
6. Lista de viktigaste köprollerna (max 4)
</analysis_steps>

<output_format>
Returnera ENDAST valid JSON enligt detta schema:
{
  "coreOffering": "string (max 10 ord, företagets huvuderbjudande)",
  "isB2B": boolean,
  "businessType": "tjänst" | "produkt/tillverkning" | "SaaS" | "konsult/byrå" | "B2C",
  "targetAudience": "string (max 15 ord)",
  "buyerRoles": ["string", "string"] (max 4 roller)
}
</output_format>

<example>
{
  "coreOffering": "Enterprise CRM-system för säljteam",
  "isB2B": true,
  "businessType": "SaaS",
  "targetAudience": "Medelstora till stora B2B-företag med säljorganisationer",
  "buyerRoles": ["Säljchef", "CTO", "VD", "IT-chef"]
}
</example>`;
      expectedFields = ["coreOffering", "isB2B", "businessType", "targetAudience", "buyerRoles"];
      
    } else if (step === "questions") {
      // Step 2: Pain points and questions
      systemPrompt = `<role>Du är en erfaren B2B-strateg på företaget Buyr, expert på att förstå köpares beslutprocess.</role>

<task>Analysera webbplatsen och identifiera köparnas viktigaste frågor, utmaningar och oro.</task>

<critical_rules>
1. FOKUSERA PÅ KÄRNVERKSAMHETEN - den primära tjänsten/produkten.
2. IGNORERA sekundära erbjudanden och sidotjänster.
3. Tänk som en potentiell köpare - vad undrar de INNAN de kontaktar sälj?
4. Alla svar ska vara på SVENSKA.
</critical_rules>

<analysis_steps>
1. Sätt dig in i köparens situation
2. Identifiera vanliga frågor före köpbeslut
3. Lista de största utmaningarna/pain points
4. Identifiera oro och risker köparen känner
</analysis_steps>

<output_format>
Returnera ENDAST valid JSON enligt detta schema:
{
  "buyerQuestions": ["string", "string"] (max 4 frågor),
  "painPoints": ["string", "string"] (max 3 utmaningar),
  "concerns": ["string", "string"] (max 3 orosmoment)
}
</output_format>

<example>
{
  "buyerQuestions": ["Vad kostar det egentligen?", "Hur lång är implementationstiden?", "Fungerar det med vårt befintliga CRM?", "Vilken ROI kan vi förvänta oss?"],
  "painPoints": ["Svårt att jämföra leverantörer", "Otydlig prisbild", "Osäkerhet om lösningen passar"],
  "concerns": ["Risk för misslyckad implementation", "Beroende av en leverantör", "Dold kostnad över tid"]
}
</example>`;
      expectedFields = ["buyerQuestions", "painPoints", "concerns"];
      
    } else if (step === "opportunities") {
      // Step 3: Self-service opportunities
      systemPrompt = `<role>Du är en senior strateg på B2B-företaget Buyr, världsledande expert på self-service som säljstrategi.</role>

<task>Rekommendera 5-10 konkreta self-service-verktyg som skulle skapa affärsvärde för detta företag.</task>

<critical_rules>
1. KÄRNVERKSAMHET: Identifiera FÖRST företagets huvudsakliga affärsområde. ALLA rekommendationer måste relatera till denna kärnverksamhet.
2. IGNORERA sekundära erbjudanden, sidotjänster och bi-sysslor HELT.
3. PRISKALKYLATOR FÖRST: En priskalkylator (pricing) ska ALLTID inkluderas som första alternativ om företaget inte har synlig prissättning.
4. GE MINST 5 FÖRSLAG, max 10.
5. INGA AVHUGGNA TEXTER: Varje title ska vara 3-6 ord (komplett). Varje description ska vara en fullständig mening på 10-20 ord.
6. Alla svar ska vara på SVENSKA.
</critical_rules>

<self_service_types>
- pricing: Priskalkylator, ROI-kalkylator, budgetverktyg
- assessment: Självtest, behovsanalys, mognadsbedömning, riskanalys
- selector: Lösningsväljare, produktguide, jämförelseverktyg
- configurator: Produktkonfigurator, paketbyggare, lösningsdesigner
- scheduling: Bokningsverktyg, demo-bokning, mötesschemaläggare
- other: Annat relevant verktyg
</self_service_types>

<analysis_steps>
1. Identifiera kärnverksamheten (skriv ner den i coreOffering)
2. Tänk: "Vilka frågor har köpare som de vill kunna besvara själva?"
3. Matcha varje fråga mot lämplig self-service-typ
4. Prioritera efter affärsvärde (pricing ofta högst)
5. Skriv tydliga, kompletta titlar och beskrivningar
</analysis_steps>

<output_format>
Returnera ENDAST valid JSON enligt detta schema:
{
  "coreOffering": "string (kärnverksamheten, max 10 ord)",
  "recommended": "pricing" | "assessment" | "selector" | "configurator" | "scheduling" | "other",
  "reasoning": "string (max 30 ord, varför detta verktyg passar bäst)",
  "opportunities": [
    {
      "type": "pricing" | "assessment" | "selector" | "configurator" | "scheduling" | "other",
      "title": "string (3-6 ord, komplett titel)",
      "description": "string (10-20 ord, en fullständig mening)",
      "potentialValue": "high" | "medium" | "low",
      "fit": 0.0-1.0
    }
  ]
}
</output_format>

<example>
{
  "coreOffering": "IT-säkerhetstjänster för medelstora företag",
  "recommended": "pricing",
  "reasoning": "Köpare vill förstå investeringen innan de kontaktar sälj, men priser saknas på sajten.",
  "opportunities": [
    {
      "type": "pricing",
      "title": "Priskalkylator för säkerhetspaket",
      "description": "Beräkna månadskostnaden baserat på antal användare, enheter och önskade tjänster.",
      "potentialValue": "high",
      "fit": 0.95
    },
    {
      "type": "assessment",
      "title": "IT-säkerhetsmognadstest",
      "description": "Självtest som visar var företaget står och vilka risker som bör adresseras först.",
      "potentialValue": "high",
      "fit": 0.9
    },
    {
      "type": "selector",
      "title": "Hitta rätt säkerhetspaket",
      "description": "Guidad väljare som matchar företagets storlek och bransch med lämpligt tjänstepaket.",
      "potentialValue": "medium",
      "fit": 0.85
    }
  ]
}
</example>`;
      expectedFields = ["coreOffering", "recommended", "reasoning", "opportunities"];
      
    } else {
      // Full analysis (fallback)
      systemPrompt = `<role>Du är en senior strateg på B2B-företaget Buyr, expert på self-service som säljstrategi.</role>

<task>Gör en komplett analys av webbplatsen och rekommendera self-service-verktyg.</task>

<critical_rules>
1. Avgör FÖRST om detta är ett B2B-företag. Om B2C: sätt isB2B till false och avsluta.
2. Identifiera KÄRNVERKSAMHETEN - ignorera sidotjänster.
3. Alla svar ska vara på SVENSKA.
</critical_rules>

<analysis_steps>
1. Kategorisera företaget (B2B/B2C, verksamhetstyp)
2. Identifiera målgrupp och köproller
3. Lista pain points, frågor och oro
4. Matcha mot self-service-typer
5. Prioritera 1-4 bästa idéerna efter affärsvärde
</analysis_steps>

<self_service_types>
- assessment: Självtest, behovsanalys
- selector: Lösningsväljare, produktguide
- configurator: Produktkonfigurator
- pricing: Priskalkylator, ROI-kalkylator
- scheduling: Bokningsverktyg
</self_service_types>

<output_format>
Returnera ENDAST valid JSON:
{
  "isB2B": boolean,
  "businessType": "tjänst" | "produkt/tillverkning" | "SaaS" | "konsult/byrå" | "B2C",
  "targetAudience": "string",
  "buyerRoles": ["string"],
  "painPoints": ["string"],
  "buyerQuestions": ["string"],
  "concerns": ["string"],
  "recommended": "assessment" | "selector" | "configurator" | "pricing" | "scheduling",
  "confidence": 0.0-1.0,
  "reasoning": "string (kort förklaring)",
  "opportunities": [
    {
      "type": "string",
      "title": "string",
      "description": "string",
      "potentialValue": "Högt" | "Mycket högt" | "Medium",
      "businessValuePercent": 10-50,
      "fit": 0.0-1.0
    }
  ]
}
</output_format>`;
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
            model: "openai/gpt-5-mini",
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

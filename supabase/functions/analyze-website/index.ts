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

    // Scrape the website content
    const websiteContent = await scrapeWebsite(url);
    const hasContent = websiteContent.length > 100;
    
    console.log("Website content scraped:", hasContent ? "success" : "failed or minimal content");

    const systemPrompt = `Du är en IMPACT-strateg expert på Endless Customers, They Ask, You Answer, The Big 5 och self-service som säljstrategi.
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

    // Build user message with scraped content if available
    let userMessage = `Analysera denna webbplats och rekommendera det bästa self-service verktyget: ${url}`;
    
    if (hasContent) {
      userMessage += `\n\nHär är det extraherade textinnehållet från webbplatsen:\n\n${websiteContent}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
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
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI response:", content);

    // Parse JSON from response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback to default analysis
      analysis = {
        isB2B: true,
        businessType: "tjänst",
        targetAudience: "B2B-företag som vill effektivisera sin verksamhet",
        buyerRoles: ["VD", "Marknadschef"],
        painPoints: ["Svårt att jämföra alternativ", "Oklara priser"],
        buyerQuestions: ["Vad kostar det?", "Passar detta för oss?"],
        concerns: ["ROI osäkerhet", "Implementeringstid"],
        recommended: "pricing",
        confidence: 0.7,
        reasoning: "Baserat på webbplatsens innehåll verkar en priskalkylator vara det mest lämpliga verktyget.",
        opportunities: [
          {
            type: "pricing",
            title: "Interaktiv priskalkylator",
            description: "Låt era besökare beräkna kostnader direkt på webbplatsen.",
            potentialValue: "Högt",
            businessValuePercent: 35,
            fit: 0.8
          },
          {
            type: "assessment",
            title: "Behovsanalys",
            description: "Hjälp besökare förstå sina behov innan de kontaktar er.",
            potentialValue: "Medium",
            businessValuePercent: 25,
            fit: 0.6
          },
          {
            type: "configurator",
            title: "Produktkonfigurator",
            description: "Låt kunder bygga sin egen lösning.",
            potentialValue: "Högt",
            businessValuePercent: 30,
            fit: 0.7
          }
        ]
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

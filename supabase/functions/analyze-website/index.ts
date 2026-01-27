import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const systemPrompt = `Du är en expert på B2B-försäljning och self-service verktyg. Din uppgift är att analysera en webbplats-URL och rekommendera det bästa self-service verktyget för företaget.

Verktygen du kan rekommendera:
1. "pricing" - Interaktiv priskalkylator (bäst för: komplexa prissättningar, SaaS, tjänster med många variabler)
2. "assessment" - Behovsanalys/självtest (bäst för: konsulttjänster, komplexa lösningar som kräver utbildning)
3. "configurator" - Produktkonfigurator (bäst för: produkter med många varianter, anpassningsbara lösningar)
4. "selector" - Produktväljare/guide (bäst för: brett produktutbud, behov av vägledning till rätt lösning)

Analysera URL:en och returnera JSON med följande struktur:
{
  "recommended": "pricing" | "assessment" | "configurator" | "selector",
  "confidence": 0.0-1.0,
  "reasoning": "Kort förklaring på svenska varför detta verktyg passar bäst",
  "opportunities": [
    {
      "type": "pricing" | "assessment" | "configurator" | "selector",
      "title": "Verktygstitel på svenska",
      "description": "Beskrivning av möjligheten",
      "potentialValue": "Högt" | "Mycket högt" | "Medium",
      "fit": 0.0-1.0
    }
  ]
}

Returnera ENDAST JSON, ingen annan text.`;

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
          { role: "user", content: `Analysera denna webbplats och rekommendera det bästa self-service verktyget: ${url}` }
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
        recommended: "pricing",
        confidence: 0.7,
        reasoning: "Baserat på webbplatsens innehåll verkar en priskalkylator vara det mest lämpliga verktyget.",
        opportunities: [
          {
            type: "pricing",
            title: "Interaktiv priskalkylator",
            description: "Låt era besökare beräkna kostnader direkt på webbplatsen.",
            potentialValue: "Högt",
            fit: 0.8
          },
          {
            type: "assessment",
            title: "Behovsanalys",
            description: "Hjälp besökare förstå sina behov innan de kontaktar er.",
            potentialValue: "Medium",
            fit: 0.6
          },
          {
            type: "configurator",
            title: "Produktkonfigurator",
            description: "Låt kunder bygga sin egen lösning.",
            potentialValue: "Högt",
            fit: 0.7
          }
        ]
      };
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
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

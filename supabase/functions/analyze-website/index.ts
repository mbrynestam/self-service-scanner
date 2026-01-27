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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5",
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

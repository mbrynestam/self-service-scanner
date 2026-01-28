import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const TALLY_WEBHOOK_URL = Deno.env.get("TALLY_WEBHOOK_URL");
    
    if (!TALLY_WEBHOOK_URL) {
      console.error("TALLY_WEBHOOK_URL is not configured");
      return new Response(
        JSON.stringify({ error: "Tally webhook not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { 
      name, 
      email, 
      role, 
      websiteUrl, 
      opportunities, 
      selectedTool,
      submissionType 
    } = body;

    console.log("Submitting to Tally webhook:", { 
      name, 
      email, 
      role,
      websiteUrl, 
      selectedTool, 
      submissionType,
      opportunitiesLength: opportunities?.length 
    });

    // Send data to Tally webhook
    const tallyResponse = await fetch(TALLY_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        role,
        analyzed_url: websiteUrl,
        opportunities: opportunities,
        selected_tool: selectedTool,
        submission_type: submissionType === "meeting" ? "Boka genomgång" : "Skicka prototyp",
        submitted_at: new Date().toISOString(),
        source: "buyr-opportunity-scanner"
      }),
    });

    if (!tallyResponse.ok) {
      const errorText = await tallyResponse.text();
      console.error("Tally webhook error:", tallyResponse.status, errorText);
      // Return success anyway to not block user experience
      return new Response(
        JSON.stringify({ success: true, warning: "Data may not have been saved" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Successfully submitted to Tally");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in submit function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Failed to submit", details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

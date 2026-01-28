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
    const HUBSPOT_PORTAL_ID = Deno.env.get("HUBSPOT_PORTAL_ID");
    const HUBSPOT_FORM_ID = Deno.env.get("HUBSPOT_FORM_ID");
    
    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
      console.error("HubSpot Portal ID or Form ID is not configured");
      return new Response(
        JSON.stringify({ error: "HubSpot integration not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { 
      name,
      firstName,
      lastName,
      company, 
      email, 
      role, 
      phone,
      message,
      websiteUrl, 
      opportunities, 
      selectedTool,
      submissionType,
      buyr_source 
    } = body;

    console.log("Submitting to HubSpot Forms API:", { email, company, submissionType });

    // Handle both combined name and separate first/last name
    let firstname = firstName || "";
    let lastname = lastName || "";
    
    // If name is provided (from Kontakt page), split it
    if (name && !firstName) {
      const nameParts = name.trim().split(" ");
      firstname = nameParts[0] || "";
      lastname = nameParts.slice(1).join(" ") || "";
    }

    // Determine submission type label
    let submissionLabel = "";
    if (submissionType === "meeting") {
      submissionLabel = "Boka genomgång";
    } else if (submissionType === "email") {
      submissionLabel = "Skicka prototyp";
    } else if (submissionType === "contact") {
      submissionLabel = "Kontaktformulär";
    }

    // Build form fields array for HubSpot Forms API
    const fields = [
      { name: "email", value: email || "" },
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "company", value: company || "" },
      { name: "jobtitle", value: role || "" },
      { name: "phone", value: phone || "" },
      { name: "message", value: message || "" },
      { name: "website", value: websiteUrl || "" },
    ];

    // Add custom fields if they exist in your HubSpot form
    if (opportunities) {
      fields.push({ name: "buyr_opportunities", value: opportunities });
    }
    if (selectedTool) {
      fields.push({ name: "buyr_selected_tool", value: selectedTool });
    }
    if (submissionLabel) {
      fields.push({ name: "buyr_submission_type", value: submissionLabel });
    }
    if (buyr_source) {
      fields.push({ name: "buyr_source", value: buyr_source });
    }
    if (websiteUrl) {
      fields.push({ name: "buyr_analyzed_url", value: websiteUrl });
    }

    // HubSpot Forms API v3 endpoint
    const formUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const formPayload = {
      fields,
      context: {
        pageUri: websiteUrl || "https://buyr.studio",
        pageName: buyr_source || "Buyr Form Submission",
      },
    };

    console.log("Sending to HubSpot:", JSON.stringify(formPayload, null, 2));

    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HubSpot Forms API error:", response.status, errorText);
      
      // Return success anyway to not block user experience
      return new Response(
        JSON.stringify({ success: true, warning: "Form submission may have failed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    console.log("HubSpot form submitted successfully:", result);

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error submitting to HubSpot:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Failed to submit to HubSpot", details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

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
    const HUBSPOT_ACCESS_TOKEN = Deno.env.get("HUBSPOT_ACCESS_TOKEN");
    
    if (!HUBSPOT_ACCESS_TOKEN) {
      console.error("HUBSPOT_ACCESS_TOKEN is not configured");
      return new Response(
        JSON.stringify({ error: "HubSpot integration not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { 
      name, 
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

    console.log("Submitting to HubSpot:", { email, company, websiteUrl, submissionType });

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    // Determine submission type label
    let submissionLabel = "";
    if (submissionType === "meeting") {
      submissionLabel = "Boka genomgång";
    } else if (submissionType === "email") {
      submissionLabel = "Skicka prototyp";
    } else if (submissionType === "contact") {
      submissionLabel = "Kontaktformulär";
    }

    // Create or update contact in HubSpot
    const contactPayload = {
      properties: {
        email,
        firstname,
        lastname,
        company: company || "",
        jobtitle: role || "",
        phone: phone || "",
        website: websiteUrl || "",
        message: message || "",
        // Custom properties for scanner data
        buyr_analyzed_url: websiteUrl || "",
        buyr_opportunities: opportunities || "",
        buyr_selected_tool: selectedTool || "",
        buyr_submission_type: submissionLabel,
        buyr_source: buyr_source || "Opportunity Scanner",
        hs_lead_status: "NEW",
      },
    };

    // First, try to create the contact
    let response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    // If contact already exists, update it
    if (response.status === 409) {
      console.log("Contact exists, updating...");
      
      // Search for existing contact
      const searchResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: "email",
              operator: "EQ",
              value: email,
            }],
          }],
        }),
      });

      const searchData = await searchResponse.json();
      
      if (searchData.results && searchData.results.length > 0) {
        const contactId = searchData.results[0].id;
        
        // Update existing contact
        response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ properties: contactPayload.properties }),
        });
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HubSpot API error:", response.status, errorText);
      
      // Return success anyway to not block user experience
      // Log the error for debugging
      return new Response(
        JSON.stringify({ success: true, warning: "Contact may not have been saved to CRM" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    console.log("HubSpot contact created/updated:", result.id);

    return new Response(
      JSON.stringify({ success: true, contactId: result.id }),
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

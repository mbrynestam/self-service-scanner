import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
  // Scanner-specific fields
  analyzedUrl?: string;
  selectedTool?: string;
  opportunities?: string[];
  // Contact page fields
  phone?: string;
  message?: string;
  source?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const HUBSPOT_ACCESS_TOKEN = Deno.env.get('HUBSPOT_ACCESS_TOKEN');
    
    if (!HUBSPOT_ACCESS_TOKEN) {
      console.error('HUBSPOT_ACCESS_TOKEN is not configured');
      throw new Error('HubSpot integration not configured');
    }

    const contactData: ContactData = await req.json();
    console.log('Received contact data:', JSON.stringify(contactData, null, 2));

    // Validate required fields
    if (!contactData.email || !contactData.firstName || !contactData.lastName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, firstName, lastName' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build HubSpot contact properties
    const properties: Record<string, string> = {
      email: contactData.email,
      firstname: contactData.firstName,
      lastname: contactData.lastName,
    };

    if (contactData.company) {
      properties.company = contactData.company;
    }

    if (contactData.role) {
      properties.jobtitle = contactData.role;
    }

    if (contactData.phone) {
      properties.phone = contactData.phone;
    }

    // Build notes/message content
    const notes: string[] = [];
    
    if (contactData.source) {
      notes.push(`Källa: ${contactData.source}`);
    }

    if (contactData.message) {
      notes.push(`Meddelande: ${contactData.message}`);
    }

    if (contactData.analyzedUrl) {
      notes.push(`Analyserad URL: ${contactData.analyzedUrl}`);
    }

    if (contactData.selectedTool) {
      notes.push(`Valt verktyg: ${contactData.selectedTool}`);
    }

    if (contactData.opportunities && contactData.opportunities.length > 0) {
      notes.push(`Identifierade möjligheter: ${contactData.opportunities.join(', ')}`);
    }

    // Store notes in a custom property or message field
    if (notes.length > 0) {
      properties.message = notes.join('\n\n');
    }

    console.log('Creating HubSpot contact with properties:', JSON.stringify(properties, null, 2));

    // Create or update contact in HubSpot
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    const responseText = await response.text();
    console.log('HubSpot API response status:', response.status);
    console.log('HubSpot API response:', responseText);

    if (!response.ok) {
      // Check if it's a duplicate contact error
      if (response.status === 409) {
        console.log('Contact already exists, attempting to update...');
        
        // Parse the error to get the existing contact ID
        const errorData = JSON.parse(responseText);
        const existingId = errorData.message?.match(/Existing ID: (\d+)/)?.[1];
        
        if (existingId) {
          // Update the existing contact
          const updateResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ properties }),
          });

          const updateText = await updateResponse.text();
          console.log('HubSpot update response:', updateText);

          if (updateResponse.ok) {
            return new Response(
              JSON.stringify({ success: true, updated: true, id: existingId }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      }

      throw new Error(`HubSpot API error: ${response.status} - ${responseText}`);
    }

    const result = JSON.parse(responseText);
    console.log('Contact created successfully with ID:', result.id);

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error submitting to HubSpot:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

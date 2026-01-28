import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  message?: string;
  role?: string;
  source: 'contact_form' | 'opportunity_scanner';
  // Scanner-specific metadata
  analyzedUrl?: string;
  selectedTool?: string;
  opportunities?: string[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('HUBSPOT_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('HUBSPOT_ACCESS_TOKEN is not configured');
    }

    const data: ContactData = await req.json();
    console.log('Creating HubSpot contact:', { email: data.email, source: data.source });

    // Build properties object for HubSpot
    const properties: Record<string, string> = {
      email: data.email,
      firstname: data.firstName,
      lastname: data.lastName,
    };

    if (data.company) {
      properties.company = data.company;
    }

    if (data.phone) {
      properties.phone = data.phone;
    }

    // Store message and metadata in notes or custom properties
    // Using hs_content_membership_notes for general notes
    const notes: string[] = [];
    
    if (data.message) {
      notes.push(`Meddelande: ${data.message}`);
    }

    if (data.role) {
      properties.jobtitle = data.role;
    }

    if (data.analyzedUrl) {
      notes.push(`Analyserad URL: ${data.analyzedUrl}`);
    }

    if (data.selectedTool) {
      notes.push(`Valt verktyg: ${data.selectedTool}`);
    }

    if (data.opportunities && data.opportunities.length > 0) {
      notes.push(`Identifierade möjligheter: ${data.opportunities.join(', ')}`);
    }

    notes.push(`Källa: ${data.source === 'contact_form' ? 'Kontaktformulär' : 'Opportunity Scanner'}`);

    // Store notes in a property - using message field
    if (notes.length > 0) {
      properties.message = notes.join('\n\n');
    }

    // First, try to create the contact
    let response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    let result = await response.json();

    // If contact exists (409 conflict), update instead
    if (response.status === 409) {
      console.log('Contact exists, updating instead');
      
      // Search for existing contact
      const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: data.email,
            }]
          }]
        }),
      });

      const searchResult = await searchResponse.json();
      
      if (searchResult.results && searchResult.results.length > 0) {
        const contactId = searchResult.results[0].id;
        
        // Update existing contact
        response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties }),
        });
        
        result = await response.json();
      }
    }

    if (!response.ok && response.status !== 409) {
      console.error('HubSpot API error:', result);
      throw new Error(result.message || 'Failed to create/update contact in HubSpot');
    }

    console.log('HubSpot contact created/updated successfully:', result.id);

    return new Response(
      JSON.stringify({ success: true, contactId: result.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in hubspot-contact function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple in-memory rate limiter (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  return false;
}

// Input validation helpers
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 255) return false;
  // Basic email regex that catches most invalid formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function sanitizeString(input: string | undefined, maxLength: number): string {
  if (!input || typeof input !== 'string') return '';
  // Remove control characters and trim
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim().substring(0, maxLength);
}

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
    // Rate limiting by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIp)) {
      console.warn("Rate limit exceeded for IP:", clientIp);
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please wait a moment and try again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const HUBSPOT_ACCESS_TOKEN = Deno.env.get('HUBSPOT_ACCESS_TOKEN');
    
    if (!HUBSPOT_ACCESS_TOKEN) {
      console.error('HUBSPOT_ACCESS_TOKEN is not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const rawData = await req.json();

    // Validate and sanitize input
    const contactData: ContactData = {
      firstName: sanitizeString(rawData.firstName, 100),
      lastName: sanitizeString(rawData.lastName, 100),
      email: sanitizeString(rawData.email, 255),
      company: sanitizeString(rawData.company, 200),
      role: sanitizeString(rawData.role, 100),
      analyzedUrl: sanitizeString(rawData.analyzedUrl, 2048),
      selectedTool: sanitizeString(rawData.selectedTool, 200),
      opportunities: Array.isArray(rawData.opportunities) 
        ? rawData.opportunities.slice(0, 20).map((o: unknown) => sanitizeString(String(o), 200))
        : undefined,
      phone: sanitizeString(rawData.phone, 50),
      message: sanitizeString(rawData.message, 2000),
      source: sanitizeString(rawData.source, 100),
    };

    console.log('Processing contact submission');

    // Validate required fields
    if (!contactData.email || !contactData.firstName || !contactData.lastName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, firstName, lastName' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!isValidEmail(contactData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
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
      JSON.stringify({ error: 'Submission failed. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

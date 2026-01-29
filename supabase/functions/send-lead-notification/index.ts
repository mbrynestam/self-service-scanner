import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// Suspicious user agent patterns
const SUSPICIOUS_USER_AGENTS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java(?!script)/i,
  /go-http/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
];

function isSuspiciousUserAgent(ua: string | null): boolean {
  if (!ua) return true;
  if (ua.length < 20) return true;
  return SUSPICIOUS_USER_AGENTS.some(pattern => pattern.test(ua));
}

// Input validation
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string' || email.length > 255) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(input: string | undefined, maxLength: number): string {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[\x00-\x1F\x7F<>]/g, '').trim().substring(0, maxLength);
}

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  message?: string;
  source?: string;
  // Scanner fields
  analyzedUrl?: string;
  selectedTool?: string;
  opportunities?: string[];
}

const NOTIFICATION_EMAIL = "magnus@grown.se";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || "unknown";
    
    if (isRateLimited(clientIp)) {
      console.warn("Rate limit exceeded for IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Bot detection: Check user agent
    const userAgent = req.headers.get("user-agent");
    if (isSuspiciousUserAgent(userAgent)) {
      console.warn("Suspicious user agent blocked:", userAgent, "IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Request blocked" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(resendApiKey);
    const rawData = await req.json();

    // Sanitize input
    const data: LeadData = {
      firstName: sanitize(rawData.firstName, 100),
      lastName: sanitize(rawData.lastName, 100),
      email: sanitize(rawData.email, 255),
      company: sanitize(rawData.company, 200),
      role: sanitize(rawData.role, 100),
      phone: sanitize(rawData.phone, 50),
      message: sanitize(rawData.message, 2000),
      source: sanitize(rawData.source, 100),
      analyzedUrl: sanitize(rawData.analyzedUrl, 2048),
      selectedTool: sanitize(rawData.selectedTool, 200),
      opportunities: Array.isArray(rawData.opportunities) 
        ? rawData.opportunities.slice(0, 20).map((o: unknown) => sanitize(String(o), 200))
        : undefined,
    };

    // Validate required fields
    if (!data.email || !data.firstName || !data.lastName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending lead notification for:", data.email);

    // Build email content
    const sourceLabel = data.source === "scanner" ? "Opportunity Scanner" : 
                       data.source === "contact" ? "Kontaktformulär" : 
                       data.source || "Okänd";

    let detailsHtml = "";
    
    if (data.analyzedUrl) {
      detailsHtml += `<p><strong>Analyserad webbplats:</strong> ${data.analyzedUrl}</p>`;
    }
    
    if (data.selectedTool) {
      detailsHtml += `<p><strong>Valt verktyg:</strong> ${data.selectedTool}</p>`;
    }
    
    if (data.opportunities && data.opportunities.length > 0) {
      detailsHtml += `<p><strong>Identifierade möjligheter:</strong></p><ul>${data.opportunities.map(o => `<li>${o}</li>`).join('')}</ul>`;
    }
    
    if (data.message) {
      detailsHtml += `<p><strong>Meddelande:</strong></p><p style="background: #f5f5f5; padding: 12px; border-radius: 4px;">${data.message}</p>`;
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Ny lead från Buyr</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Ny lead från ${sourceLabel}</h1>
          </div>
          
          <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <h2 style="margin-top: 0; color: #111;">Kontaktuppgifter</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Namn:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>E-post:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              ${data.company ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Företag:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.company}</td></tr>` : ''}
              ${data.role ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Roll:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.role}</td></tr>` : ''}
              ${data.phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ''}
            </table>
            
            ${detailsHtml ? `<h2 style="margin-top: 24px; color: #111;">Detaljer</h2>${detailsHtml}` : ''}
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            
            <p style="color: #666; font-size: 12px; margin: 0;">
              Detta mail skickades automatiskt från buyr.se
            </p>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: "Buyr <onboarding@resend.dev>", // Use verified domain in production
      to: [NOTIFICATION_EMAIL],
      subject: `Ny lead: ${data.firstName} ${data.lastName} - ${sourceLabel}`,
      html: emailHtml,
      reply_to: data.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send notification" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Lead notification sent successfully");
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in send-lead-notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

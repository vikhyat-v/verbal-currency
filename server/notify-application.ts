// ═══════════════════════════════════════════════════════
// SUPABASE EDGE FUNCTION: notify-application
// ═══════════════════════════════════════════════════════
//
// This sends an email to YOU when someone applies,
// and a confirmation email to the APPLICANT.
//
// Setup:
//   1. Install Supabase CLI: npm i -g supabase
//   2. supabase functions new notify-application
//   3. Replace the function code with this file
//   4. Set secret: supabase secrets set RESEND_API_KEY=re_xxxxx
//   5. Deploy: supabase functions deploy notify-application
//   6. Create Database Webhook in Supabase Dashboard:
//      - Table: applications
//      - Event: INSERT  
//      - Function: notify-application
//
// ═══════════════════════════════════════════════════════

// @ts-nocheck — Deno runtime
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const YOUR_EMAIL = 'vikhyat@truthovertactics.in'; // Change to your email
const FROM_EMAIL = 'Verbal Currency <noreply@truthovertactics.in>'; // Needs Resend domain verification

serve(async (req: Request) => {
  try {
    const { record } = await req.json();
    
    if (!record) {
      return new Response('No record', { status: 400 });
    }

    const { name, email, phone, experience, message } = record;

    // ── Email to YOU (notification) ──
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: YOUR_EMAIL,
        subject: `🔔 New Application: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; color: #333;">
            <h2 style="margin-bottom: 4px;">New Application Received</h2>
            <p style="color: #888; font-size: 13px;">Verbal Currency — Truth Over Tactics</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Experience:</strong> ${experience || 'Not specified'}</p>
            <p><strong>Why they want to join:</strong></p>
            <p style="background: #f8f8f8; padding: 12px; border-left: 3px solid #333; font-style: italic;">${message || 'No message'}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="font-size: 12px; color: #999;">Reply to this email to contact them directly.</p>
          </div>
        `,
        reply_to: email,
      }),
    });

    // ── Email to APPLICANT (confirmation) ──
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your application has been received — Verbal Currency',
        html: `
          <div style="font-family: sans-serif; max-width: 500px; color: #333;">
            <h2 style="margin-bottom: 4px;">Application Received</h2>
            <p>Hi ${name},</p>
            <p>Thank you for applying to Verbal Currency — Truth Over Tactics.</p>
            <p>We review every application personally. You'll hear from us within 24 hours.</p>
            <p>In the meantime, here's what we believe:</p>
            <blockquote style="border-left: 2px solid #333; padding-left: 12px; margin: 16px 0; color: #555; font-style: italic;">
              "The sale happens when you let go. Freedom is the highest sales skill."
            </blockquote>
            <p>If you have the sensibility DNA, you'll hear from us soon.</p>
            <p style="margin-top: 24px;">— The Verbal Currency Team</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="font-size: 11px; color: #999;">truthovertactics.in • Truth Over Tactics</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

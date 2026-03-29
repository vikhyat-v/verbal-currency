// ═══════════════════════════════════════════════════════
// SUPABASE EDGE FUNCTION: send-notification
// ═══════════════════════════════════════════════════════
//
// Deploy this as a Supabase Edge Function:
//   1. Install Supabase CLI: npm i -g supabase
//   2. supabase functions new send-notification
//   3. Paste this code into the function
//   4. Set secret: supabase secrets set RESEND_API_KEY=re_your_key
//   5. Deploy: supabase functions deploy send-notification
//
// OR just use the Supabase dashboard → Edge Functions → Create

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFY_EMAIL = 'your-email@domain.com'; // ← Change to your email

serve(async (req) => {
  try {
    const { type, applicant } = await req.json();

    if (type === 'new_application') {
      // 1. Notify you (the team)
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Verbal Currency <noreply@truthovertactics.in>',
          to: [NOTIFY_EMAIL],
          subject: `🔔 New Application: ${applicant.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ccc; padding: 40px;">
              <h1 style="color: white; font-size: 24px; margin-bottom: 20px;">New Application Received</h1>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; color: white;">${applicant.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; color: white;">${applicant.email}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0; color: white;">${applicant.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Experience</td><td style="padding: 8px 0; color: white;">${applicant.experience}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 8px 0; color: white;">${applicant.message}</td></tr>
              </table>
              <hr style="border-color: #222; margin: 24px 0;" />
              <p style="color: #444; font-size: 12px;">Truth Over Tactics — Verbal Currency</p>
            </div>
          `,
        }),
      });

      // 2. Confirmation email to applicant
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Verbal Currency <noreply@truthovertactics.in>',
          to: [applicant.email],
          subject: 'Application Received — Verbal Currency',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ccc; padding: 40px;">
              <h1 style="color: white; font-size: 28px; letter-spacing: 4px; margin-bottom: 8px;">VERBAL CURRENCY</h1>
              <p style="color: #444; font-size: 11px; letter-spacing: 3px; margin-bottom: 30px;">TRUTH OVER TACTICS</p>

              <p style="color: #aaa; line-height: 1.8;">Hi ${applicant.name},</p>
              <p style="color: #aaa; line-height: 1.8;">We've received your application for Verbal Currency. Our team will review it and get back to you within 24 hours.</p>
              <p style="color: #aaa; line-height: 1.8;">If you have the sensibility DNA, you'll hear from us soon.</p>

              <hr style="border-color: #222; margin: 24px 0;" />

              <p style="color: #666; font-size: 12px;">This is an automated confirmation. Do not reply to this email.</p>
              <p style="color: #333; font-size: 11px; letter-spacing: 2px; margin-top: 20px;">CLOSE WITHOUT NEEDING TO.</p>
            </div>
          `,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

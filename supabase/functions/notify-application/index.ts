import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFY_EMAIL = 'your-email@domain.com'; // ← YAHAN APNI EMAIL DAALEIN

serve(async (req) => {
  try {
    // Webhook payload me "record" hota hai (new row)
    const payload = await req.json();
    const applicant = payload.record;  // 👈 Ye important hai

    // 1. Admin ko notification
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Verbal Currency <noreply@truthovertactics.in>', // Badme domain verify karna
        to: [NOTIFY_EMAIL],
        subject: `🔔 New Application: ${applicant.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ccc; padding: 40px;">
            <h1 style="color: white;">New Application Received</h1>
            <table>
              <tr><td>Name</td><td>${applicant.name}</td></tr>
              <tr><td>Email</td><td>${applicant.email}</td></tr>
              <tr><td>Phone</td><td>${applicant.phone || 'Not provided'}</td></tr>
              <tr><td>Experience</td><td>${applicant.experience}</td></tr>
              <tr><td>Message</td><td>${applicant.message}</td></tr>
            </table>
            <hr />
            <p style="color: #444;">Truth Over Tactics — Verbal Currency</p>
          </div>
        `,
      }),
    });

    // 2. Applicant ko confirmation
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
            <h1>VERBAL CURRENCY</h1>
            <p>Hi ${applicant.name},</p>
            <p>We've received your application. Our team will review it and get back to you within 24 hours.</p>
            <hr />
            <p style="color: #666;">This is an automated confirmation. Do not reply.</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
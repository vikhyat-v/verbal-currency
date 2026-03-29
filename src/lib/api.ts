import { supabase } from './supabase';
import type { Application, BookingLead } from './supabase';

/* ═══════ SUBMIT APPLICATION ═══════ */
export async function submitApplication(data: Omit<Application, 'id' | 'status' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  // If Supabase is configured, store in DB
  if (supabase) {
    const { error } = await supabase
      .from('applications')
      .insert([{ ...data, status: 'pending' }]);

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: error.message };
    }

    // Trigger email notification via Supabase Edge Function
    try {
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'new_application',
          applicant: data,
        },
      });
    } catch (e) {
      // Email is non-blocking — application still saved
      console.warn('Email notification failed:', e);
    }

    return { success: true };
  }

  // Fallback: no Supabase — use Web3Forms (free, no signup needed for basic)
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '-- ADD YOUR WEB3FORMS KEY AS FALLBACK --',
        subject: `New Verbal Currency Application: ${data.name}`,
        from_name: 'Verbal Currency Website',
        ...data,
      }),
    });
    if (res.ok) return { success: true };
    return { success: false, error: 'Submission failed' };
  } catch {
    // Final fallback: just log
    console.log('📋 Application (no backend):', data);
    return { success: true }; // Don't block user experience
  }
}

/* ═══════ TRACK BOOKING LEAD ═══════ */
export async function trackBookingLead(data: Omit<BookingLead, 'id' | 'created_at'>): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('booking_leads').insert([data]);
    if (error) console.error(error);
  }
}

/* ═══════ RAZORPAY PAYMENT ═══════ */
interface RazorpayOptions {
  amount: number; // in paise (150000 * 100)
  currency?: string;
  name: string;
  email: string;
  phone?: string;
  applicationId?: string;
}

export function initiatePayment(options: RazorpayOptions): Promise<{ success: boolean; paymentId?: string }> {
  return new Promise((resolve) => {
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!keyId || !(window as any).Razorpay) {
      // Razorpay not configured yet — show message
      resolve({ success: false });
      return;
    }

    const rzp = new (window as any).Razorpay({
      key: keyId,
      amount: options.amount,
      currency: options.currency || 'INR',
      name: 'Verbal Currency',
      description: 'Truth Over Tactics — Premium Program',
      image: '/images/filmscape.png',
      prefill: {
        name: options.name,
        email: options.email,
        contact: options.phone || '',
      },
      theme: {
        color: '#ffffff',
        backdrop_color: 'rgba(0,0,0,0.9)',
      },
      handler: async function (response: any) {
        // Payment successful — store in DB
        if (supabase && options.applicationId) {
          await supabase.from('payments').insert([{
            application_id: options.applicationId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || null,
            amount: options.amount / 100,
            currency: options.currency || 'INR',
            status: 'paid',
          }]);
        }
        resolve({ success: true, paymentId: response.razorpay_payment_id });
      },
      modal: {
        ondismiss: () => resolve({ success: false }),
      },
    });

    rzp.open();
  });
}

/* ═══════ CALENDLY HELPERS ═══════ */
export function getCalendlyUrl(): string {
  return import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/vikhyatvibhubalodi/30min';
}

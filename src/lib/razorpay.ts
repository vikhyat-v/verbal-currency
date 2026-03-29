const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

export const isRazorpayReady = !!RAZORPAY_KEY;

function loadScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

interface PaymentOptions {
  amount: number;        // in paise (150000 * 100 = 15000000)
  name: string;
  email: string;
  phone?: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

export async function openPayment({ amount, name, email, phone, onSuccess, onFailure }: PaymentOptions) {
  if (!RAZORPAY_KEY) {
    onFailure('Payment gateway not configured yet');
    return;
  }

  const loaded = await loadScript();
  if (!loaded) { onFailure('Failed to load payment gateway'); return; }

  const options = {
    key: RAZORPAY_KEY,
    amount,
    currency: 'INR',
    name: 'Verbal Currency',
    description: 'Truth Over Tactics — Sales & Communication Mastery',
    image: '/images/filmscape.png',
    prefill: { name, email, contact: phone || '' },
    theme: { color: '#ffffff', backdrop_color: '#000000' },
    handler: (response: any) => {
      if (response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      } else {
        onFailure('Payment failed');
      }
    },
    modal: {
      ondismiss: () => onFailure('Payment cancelled'),
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}

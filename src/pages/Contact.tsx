import { useState } from 'react';
import { PageLayout, SectionHead, Divider } from '../components/Shared';
import { submitApplication, markPaid } from '../lib/supabase';
import { openPayment, isRazorpayReady } from '../lib/razorpay';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/vikhyatvibhubalodi/30min';

/* ═══ CALENDLY EMBED ═══ */
function CalendlyEmbed() {
  return (
    <div className="animate-fadeIn pb-20">
      <div className="text-center py-20 px-6">
        <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl text-white tracking-[0.05em] mb-4">PAYMENT SUCCESSFUL</h2>
        <p className="text-white/50 text-sm max-w-lg mx-auto">Your transaction was secure. The next step is to lock in your onboarding/consultation call below.</p>
      </div>
      <div className="h-[700px] w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
        <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" title="Book your call" className="absolute top-0 left-0" />
      </div>
    </div>
  );
}

/* ═══ CHECKOUT MODAL ═══ */
function CheckoutModal({ title, amount, onClose, onSuccess }: { title: string, amount: number, onClose: () => void, onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [paying, setPaying] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRazorpayReady) {
      setErrMsg("Payment gateway coming soon. We'll contact you manually.");
      return;
    }
    setPaying(true);
    setErrMsg('');

    // Pre-log the checkout attempt in applications
    await submitApplication({ name: form.name, email: form.email, phone: form.phone, experience: title, message: 'Fast Checkout Initiated' });

    openPayment({
      amount: amount * 100, // convert to paise
      name: form.name, email: form.email, phone: form.phone,
      onSuccess: async (paymentId) => {
        await markPaid(form.email, paymentId, amount);
        onSuccess();
      },
      onFailure: (err) => {
        setErrMsg(err);
        setPaying(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-center p-6 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#050505] border border-white/10 p-8 sm:p-10 relative">
        <button onClick={onClose} className="absolute top-5 right-6 text-white/40 hover:text-white text-2xl transition-colors">&times;</button>
        <span className="text-[10px] tracking-widest uppercase text-[#C41E1E]">Fast Checkout</span>
        <h3 className="font-['Bebas_Neue'] text-4xl text-white mt-2">{title}</h3>
        <p className="text-white/40 text-sm mb-8 mt-1 border-b border-white/10 pb-6">Secure your spot for ₹{amount.toLocaleString('en-IN')}</p>

        <form onSubmit={handlePay} className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Full Name *</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Email Address *</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Phone Number *</label>
            <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10" placeholder="+91 ..." />
          </div>

          {errMsg && <div className="text-[#C41E1E] text-xs p-3 bg-[#C41E1E]/10 border border-[#C41E1E]/20">{errMsg}</div>}

          <button type="submit" disabled={paying} className={`w-full py-4 tracking-widest text-xs font-bold uppercase transition-all duration-300 ${paying ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}>
            {paying ? 'Processing...' : 'Proceed to Payment →'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══ FEEDBACK / AUDIT FORM (SECONDARY PATH) ═══ */
function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const res = await submitApplication(form);
    if (res.ok) setStatus('success');
    else { setErrMsg(res.error || 'Failed to submit feedback.'); setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center border border-white/10 p-12 bg-black">
        <h3 className="font-['Bebas_Neue'] text-4xl text-white">RECEIVED</h3>
        <p className="text-white/40 text-sm mt-4">Your audit request has been logged. We will review your profile and reach out if there is alignment.</p>
        <button onClick={() => setStatus('idle')} className="mt-8 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white">Submit Another Request ↺</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleAudit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Full Name *</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Email *</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Sales Experience *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['0–2 yrs', '3–5 yrs', '5–10 yrs', '10+ yrs'].map(opt => (
              <button type="button" key={opt} onClick={() => setForm({ ...form, experience: opt })} className={`py-3 text-xs tracking-wider border transition-all ${form.experience === opt ? 'bg-white text-black border-white' : 'border-white/10 text-white/40 hover:border-white/30'}`}>{opt}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Current Bottleneck / Feedback Request *</label>
          <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors resize-none placeholder:text-white/20" placeholder="Describe your exact communication challenge..." />
        </div>

        {errMsg && <div className="text-[#C41E1E] text-xs p-3 bg-[#C41E1E]/10 border border-[#C41E1E]/20">{errMsg}</div>}

        <button type="submit" disabled={status === 'submitting'} className="w-full border border-white/20 py-4 text-xs tracking-widest uppercase text-white/70 hover:bg-white/5 hover:text-white transition-all">
          {status === 'submitting' ? 'Submitting...' : 'Request Feedback'}
        </button>
      </form>
    </div>
  );
}


/* ═══ MAIN CONTACT PAGE ═══ */
export default function Contact() {
  const [step, setStep] = useState<'checkout' | 'paid'>('checkout');
  const [modal, setModal] = useState<{ title: string, amount: number } | null>(null);

  if (step === 'paid') {
    return <PageLayout><CalendlyEmbed /></PageLayout>;
  }

  return (
    <PageLayout>
      {modal && <CheckoutModal title={modal.title} amount={modal.amount} onClose={() => setModal(null)} onSuccess={() => setStep('paid')} />}

      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <SectionHead eyebrow="Enrollment" title="SECURE YOUR SPOT" titleAccent="NO FRICTION." vis={true} />

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">

          {/* Option 1: The Masterclass */}
          <div className="border border-white/10 bg-[#050505] p-10 flex flex-col justify-between group hover:border-[#C41E1E]/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#C41E1E] transition-all duration-700" />
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Complete Transformation</span>
              <h3 className="font-['Bebas_Neue'] text-4xl text-white mt-4 mb-2">THE MASTERCLASS</h3>
              <div className="font-['Playfair_Display'] italic text-5xl text-white/90 mb-8">₹1,50,000</div>
              <ul className="space-y-4 text-sm text-white/60 font-sans mb-12">
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> 8-week intensive coaching</li>
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> Complete framework teardown</li>
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> Elite network access</li>
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> Direct 1-on-1 feedback blocks</li>
              </ul>
            </div>
            <button onClick={() => setModal({ title: "The Masterclass Curriculum", amount: 150000 })} className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-300 transition-colors">
              Enroll Now
            </button>
          </div>

          {/* Option 2: 1on1 Consultation */}
          <div className="border border-white/10 bg-black p-10 flex flex-col justify-between group hover:border-white/30 transition-all duration-500 relative">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Strategic Alignment</span>
              <h3 className="font-['Bebas_Neue'] text-4xl text-white mt-4 mb-2">1-ON-1 CONSULTATION</h3>
              <div className="font-['Playfair_Display'] italic text-5xl text-white/90 mb-8">₹25,000</div>
              <ul className="space-y-4 text-sm text-white/60 font-sans mb-12">
                <li className="flex items-start gap-3"><span className="text-white/50">✓</span> 60-Minute deep dive session</li>
                <li className="flex items-start gap-3"><span className="text-white/50">✓</span> High-level bottlenecks identified</li>
                <li className="flex items-start gap-3"><span className="text-white/50">✓</span> Immediate actionable frameworks</li>
                <li className="flex items-start gap-3"><span className="text-white/50">✓</span> No long-term commitment</li>
              </ul>
            </div>
            <button onClick={() => setModal({ title: "Strategic Consultation", amount: 25000 })} className="w-full border border-white/20 text-white/80 py-4 uppercase tracking-[0.2em] text-xs hover:border-white hover:text-white transition-colors">
              Book Consultation
            </button>
          </div>

        </div>
      </section>

      <div className="my-10"><Divider /></div>

      <section className="py-24 px-6 bg-[#030303] min-h-[50vh]">
        <div className="text-center mb-16">
          <SectionHead eyebrow="Not Ready?" title="THE SENSIBILITY AUDIT" titleAccent="FEEDBACK." vis={true} />
          <p className="text-white/30 text-sm max-w-xl mx-auto -mt-6">Submit your current bottlenecks. If we see potential, we will reach out with feedback or an invitation.</p>
        </div>
        <FeedbackForm />
      </section>

    </PageLayout>
  );
}

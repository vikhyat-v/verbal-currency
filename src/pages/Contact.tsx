import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { PageLayout, FogCanvas, Divider, useInView } from '../components/Shared';
import { submitApplication } from '../lib/supabase';
import { openPayment, isRazorpayReady } from '../lib/razorpay';
import { markPaid } from '../lib/supabase';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/vikhyatvibhubalodi/30min';
const PROGRAM_PRICE = 150000; // ₹1,50,000

/* ═══ APPLICATION FORM ═══ */
function ApplicationForm() {
  const [ref, vis] = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', message: '' });
  const [step, setStep] = useState<'form' | 'submitted' | 'paying' | 'paid' | 'error'>('form');
  const [errMsg, setErrMsg] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitted');
    const res = await submitApplication(form);
    if (!res.ok) {
      setErrMsg(res.error || 'Something went wrong');
      setStep('error');
    }
  };

  const handlePay = () => {
    if (!isRazorpayReady) {
      setErrMsg('Payment gateway coming soon. We\'ll contact you with payment details.');
      setStep('error');
      return;
    }
    setStep('paying');
    openPayment({
      amount: PROGRAM_PRICE * 100, // paise
      name: form.name,
      email: form.email,
      phone: form.phone,
      onSuccess: async (paymentId) => {
        await markPaid(form.email, paymentId, PROGRAM_PRICE);
        setStep('paid');
      },
      onFailure: (err) => {
        setErrMsg(err);
        setStep('submitted'); // back to post-submit state
      },
    });
  };

  // FORM STATE
  if (step === 'form') {
    return (
      <div ref={ref} className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-10">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-[0.06em] text-white/90">APPLICATION FORM</h2>
          <p className="mt-2 text-white/20 text-sm">Not a checkout. A conversation starter.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Full Name *</label>
            <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
              placeholder="Your name" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Email *</label>
              <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Phone</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                placeholder="+91 ..." />
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Experience in Sales / Communication *</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['0–2 yrs', '3–5 yrs', '5–10 yrs', '10+ yrs'].map(opt => (
                <button key={opt} type="button" onClick={() => set('experience', opt)}
                  className={`py-2.5 text-xs tracking-wider border transition-all duration-300
                    ${form.experience === opt ? 'bg-white text-black border-white' : 'border-white/10 text-white/30 hover:border-white/20'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Why do you want to join? *</label>
            <textarea required rows={4} value={form.message} onChange={e => set('message', e.target.value)}
              className="w-full bg-transparent border border-white/10 px-4 py-3 text-white/70 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/10 resize-none"
              placeholder="Be honest. There are no right answers." />
          </div>
          <button type="submit"
            className="w-full bg-white text-black font-semibold uppercase tracking-[0.2em] py-4 text-sm hover:bg-gray-200 transition-all duration-300">
            Submit Application
          </button>
          <p className="text-center text-white/10 text-[10px] tracking-wider">We review every application personally.</p>
        </form>
      </div>
    );
  }

  // SUBMITTED — show payment option
  if (step === 'submitted') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✓</span>
        </div>
        <div className="font-['Bebas_Neue'] text-4xl text-white tracking-[0.06em] mb-3">APPLICATION RECEIVED.</div>
        <p className="text-white/30 text-sm leading-relaxed max-w-md mx-auto mb-8">
          We'll review and get back within 24 hours. Want to secure your seat right now?
        </p>

        <div className="max-w-sm mx-auto border border-white/10 p-6">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Secure Your Seat</span>
          <div className="mt-2 font-['Bebas_Neue'] text-4xl text-white tracking-[0.05em]">₹1,50,000</div>
          <p className="mt-1 text-white/15 text-[10px] mb-6">One-time. Lifetime access.</p>

          {isRazorpayReady ? (
            <button onClick={handlePay}
              className="w-full bg-white text-black font-semibold uppercase tracking-[0.2em] py-3.5 text-sm hover:bg-gray-200 transition-all duration-300">
              Pay Now
            </button>
          ) : (
            <div>
              <div className="w-full border border-white/10 text-white/25 py-3.5 text-xs tracking-[0.2em] uppercase text-center mb-3">
                Payment Gateway — Coming Soon
              </div>
              <p className="text-white/15 text-[10px]">We'll share payment details over email/call once your application is accepted.</p>
            </div>
          )}
        </div>

        <p className="mt-6 text-white/15 text-xs">
          Or <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 underline">book a call first</a> to discuss.
        </p>
      </div>
    );
  }

  // PAID
  if (step === 'paid') {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">★</span>
        </div>
        <div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-[0.06em] mb-3">YOU'RE IN.</div>
        <p className="text-white/30 text-sm leading-relaxed max-w-md mx-auto mb-4">
          Payment confirmed. Welcome to Verbal Currency. You'll receive onboarding details at <span className="text-white/50">{form.email}</span> within 24 hours.
        </p>
        <div className="w-12 h-px bg-white/10 mx-auto my-6" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/15">Truth Over Tactics</span>
      </div>
    );
  }

  // ERROR
  return (
    <div className="text-center py-12">
      <div className="font-['Bebas_Neue'] text-3xl text-white/80 tracking-[0.06em] mb-3">NOTED.</div>
      <p className="text-white/30 text-sm leading-relaxed max-w-md mx-auto mb-6">{errMsg}</p>
      <button onClick={() => setStep('form')} className="border border-white/20 text-white/50 px-6 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
        Try Again
      </button>
    </div>
  );
}

/* ═══ CALENDLY EMBED ═══ */
function CalendlyEmbed() {
  const [ref, vis] = useInView(0.1);
  useEffect(() => {
    // Load Calendly widget CSS/JS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
      <div className="text-center mb-8">
        <h2 className="font-['Bebas_Neue'] text-3xl tracking-[0.06em] text-white/90">BOOK A CALL</h2>
        <p className="mt-2 text-white/20 text-sm">30 minutes. No pitch. Just a conversation.</p>
      </div>

      {/* Calendly inline widget */}
      <div
        className="calendly-inline-widget border border-white/[0.05] bg-black/50"
        data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=cccccc&primary_color=ffffff`}
        style={{ minWidth: '280px', height: '650px' }}
      />

      <p className="mt-4 text-center text-white/10 text-[10px] tracking-wider">
        Prefer to apply first? Switch to the Application tab above.
      </p>
    </div>
  );
}

/* ═══ CONTACT PAGE ═══ */
export default function Contact() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden pt-20">
        <FogCanvas opacity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-[1]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 border border-white/10 px-5 py-2 inline-block mb-8">Your Move</span>
          <h1 className="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-[0.04em] text-white">
            LET'S TALK.
          </h1>
          <p className="mt-4 font-['Cormorant_Garamond'] italic text-lg text-white/30">
            Apply for the program or book a discovery call.
          </p>
        </div>
      </section>

      {/* Tabbed section: Apply / Book a Call */}
      <section className="py-16 sm:py-24 bg-[#050505]">
        <div className="max-w-2xl mx-auto px-6">
          <Tab.Group>
            <Tab.List className="flex gap-2 mb-12 justify-center">
              <Tab className={({ selected }) =>
                `px-8 py-3 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 outline-none
                ${selected ? 'bg-white text-black' : 'border border-white/10 text-white/40 hover:text-white/70'}`
              }>Apply Now</Tab>
              <Tab className={({ selected }) =>
                `px-8 py-3 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 outline-none
                ${selected ? 'bg-white text-black' : 'border border-white/10 text-white/40 hover:text-white/70'}`
              }>Book a Call</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel><ApplicationForm /></Tab.Panel>
              <Tab.Panel><CalendlyEmbed /></Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>

      {/* Quick info */}
      <section className="pb-20 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6">
          <Divider />
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {[
              { label: 'Response Time', value: '< 24 hours', sub: 'Every application reviewed personally' },
              { label: 'Cohort Size', value: 'Max 20', sub: 'Small groups for deep work' },
              { label: 'Next Cohort', value: 'Starting Soon', sub: 'Apply to secure your spot' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-2">{item.label}</div>
                <div className="font-['Bebas_Neue'] text-2xl text-white/80 tracking-wider">{item.value}</div>
                <p className="text-[10px] text-white/15 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

import { useState } from 'react';
import { PageLayout, SectionHead, Divider } from '../components/Shared';
import { submitApplication } from '../lib/supabase';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/vikhyatvibhubalodi/30min';

/* ═══ CALENDLY EMBED ═══ */
function CalendlyEmbed() {
  return (
    <div className="animate-fadeIn pb-20">
      <div className="text-center py-20 px-6">
        <h2 className="font-['Bebas_Neue'] text-5xl sm:text-7xl text-white tracking-[0.05em] mb-4">APPLICATION RECEIVED</h2>
        <p className="text-white/50 text-sm max-w-lg mx-auto">Your details have been securely logged. The final step is to lock in your Clarity Call below.</p>
      </div>
      <div className="h-[700px] w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
        <iframe src={CALENDLY_URL} width="100%" height="100%" frameBorder="0" title="Book your call" className="absolute top-0 left-0" />
      </div>
    </div>
  );
}

/* ═══ APPLICATION MODAL ═══ */
function ApplicationModal({ title, onClose, onSuccess }: { title: string, onClose: () => void, onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrMsg('');

    // Log the application
    const res = await submitApplication({ name: form.name, email: form.email, phone: form.phone, experience: title, message: 'Clarity Call Application' });

    if (!res.ok) {
      setErrMsg(res.error || 'Failed to submit. Please try again.');
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex justify-center items-center p-6 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#050505] border border-white/10 p-8 sm:p-10 relative">
        <button onClick={onClose} className="absolute top-5 right-6 text-white/40 hover:text-white text-2xl transition-colors">&times;</button>
        <span className="text-[10px] tracking-widest uppercase text-[#C41E1E]">Free Application</span>
        <h3 className="font-['Bebas_Neue'] text-4xl text-white mt-2">{title}</h3>
        <p className="text-white/40 text-sm mb-8 mt-1 border-b border-white/10 pb-6">Secure your spot for a free 45-minute diagnostic.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Full Name *</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border border-[#C41E1E]/30 px-4 py-3 text-white/90 text-sm outline-none focus:border-[#C41E1E] transition-colors placeholder:text-white/20" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Email Address *</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border border-[#C41E1E]/30 px-4 py-3 text-white/90 text-sm outline-none focus:border-[#C41E1E] transition-colors placeholder:text-white/20" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Phone Number *</label>
            <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent border border-[#C41E1E]/30 px-4 py-3 text-white/90 text-sm outline-none focus:border-[#C41E1E] transition-colors placeholder:text-white/20" placeholder="+91 ..." />
          </div>

          {errMsg && <div className="text-[#C41E1E] text-xs p-3 bg-[#C41E1E]/10 border border-[#C41E1E]/20">{errMsg}</div>}

          <button type="submit" disabled={submitting} className={`w-full py-4 tracking-[0.2em] text-xs font-bold uppercase transition-all duration-300 ${submitting ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-[#C41E1E] text-white hover:bg-red-700 shadow-[0_0_20px_rgba(196,30,30,0.2)] hover:shadow-[0_0_30px_rgba(196,30,30,0.4)]'}`}>
            {submitting ? 'Processing...' : 'Proceed to Booking →'}
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
  const [modal, setModal] = useState<{ title: string } | null>(null);

  if (step === 'paid') {
    return <PageLayout><CalendlyEmbed /></PageLayout>;
  }

  return (
    <PageLayout>
      {modal && <ApplicationModal title={modal.title} onClose={() => setModal(null)} onSuccess={() => setStep('paid')} />}

      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <SectionHead eyebrow="Enrollment" title="STRATEGIC ALIGNMENT." titleAccent="NO FRICTION." vis={true} />

        {/* Pricing Cards */}
        <div className="mt-16 max-w-2xl mx-auto">

          {/* Book A Call Card */}
          <div className="border border-white/10 bg-[#050505] p-10 flex flex-col justify-between group hover:border-[#C41E1E]/50 transition-all duration-500 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#C41E1E] transition-all duration-700" />
            <div className="mb-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C41E1E]">Free Diagnostic</span>
              <h3 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white mt-4 mb-2 tracking-[0.05em]">BOOK A CALL</h3>
              <div className="font-['Playfair_Display'] italic text-2xl text-white/60 mb-8 mt-4">Free. No long-term commitment.</div>
              <ul className="space-y-4 text-sm text-white/60 font-sans max-w-sm mx-auto text-left">
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> 45-Minute deep diagnostic</li>
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> Root cause identification</li>
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> Sales block dismantling</li>
                <li className="flex items-start gap-3"><span className="text-[#C41E1E]">✓</span> No-pitch conversation</li>
              </ul>
            </div>
            <p className="text-white/40 text-sm max-w-lg mx-auto italic font-['Cormorant_Garamond'] mb-8">
              For the service professional whose only real competitor has never been the market. It has been the version of himself that apologises before the client even objects.
            </p>
            <button onClick={() => setModal({ title: "Clarity Call Application" })} className="w-full max-w-sm mx-auto bg-[#C41E1E] text-white py-5 uppercase tracking-[0.2em] text-[13px] font-bold hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(196,30,30,0.2)] hover:shadow-[0_0_30px_rgba(196,30,30,0.4)]">
              Book Your Clarity Call
            </button>
            <p className="mt-4 text-white/20 text-[10px] tracking-widest uppercase">Application reviewed before acceptance.</p>
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

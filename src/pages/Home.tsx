import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Tab, Disclosure } from '@headlessui/react';
import { PageLayout, FogCanvas, BookBtn, Divider, SectionHead, useInView, useCountUp } from '../components/Shared';
import { IMG, VIDEO } from '../data/images';

/* ═══ HERO ═══ */
function Hero() {
  const [ld, setLd] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { const timer = setTimeout(() => setLd(true), 300); return () => clearTimeout(timer); }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-40' : 'opacity-0'}`}
        src={VIDEO.reel1Bg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoLoaded(true)}
        style={{ WebkitPlaysinline: true } as React.CSSProperties}
      />
      {/* Fallback fog while video loads */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-30' : 'opacity-100'}`}>
        <FogCanvas />
      </div>
      {/* Overlay gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-[1]" />
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[70vh] pointer-events-none z-[2]"
        style={{ background: 'conic-gradient(from 180deg, transparent 30%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 70%)', animation: 'flickerLight 8s ease-in-out infinite' }} />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${ld ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block text-[11px] font-bold tracking-[0.5em] uppercase text-[#C41E1E] mb-8 border border-[#C41E1E]/30 bg-[#C41E1E]/5 px-6 py-2">Sales &amp; Communication Diagnostics</span>
        </div>
        <h1 className={`transition-all duration-1000 delay-200 ${ld ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <span className="block font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-[100px] xl:text-[120px] leading-[0.85] tracking-[0.04em] text-white">YOU'RE NOT BAD AT SALES.</span>
          <span className="block font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-[80px] xl:text-[100px] leading-[0.85] tracking-[0.04em] text-[#C41E1E]">YOU'VE JUST NEVER BEEN SEEN.</span>
        </h1>
        <div className={`mt-4 h-px w-32 sm:w-48 mx-auto bg-[#C41E1E]/50 transition-all duration-1000 delay-500 origin-center ${ld ? 'scale-x-100' : 'scale-x-0'}`} />
        <p className={`mt-8 font-serif text-lg sm:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${ld ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          A 45-minute deep diagnostic to dismantle your sales blocks and uncover your true verbal currency. No scripts. No tactics. Just truth.
        </p>
        <div className={`mt-5 transition-all duration-1000 delay-700 ${ld ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-['Bebas_Neue'] text-sm tracking-[0.5em] text-white/15">TRUTH OVER TACTICS</span>
        </div>
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-1000 delay-900 ${ld ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <BookBtn text="Book Your Clarity Call" size="lg" href="/contact" />
          <Link to="/about" className="text-white/25 hover:text-white/60 text-xs tracking-[0.2em] uppercase transition-colors">Learn More →</Link>
        </div>
      </div>
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 [transition-delay:1200ms] ${ld ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-4 h-7 border border-white/15 rounded-full flex justify-center pt-1">
          <div className="w-0.5 h-1.5 bg-white/30 rounded-full" style={{ animation: 'fadeInUp 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}

/* ═══ MARQUEE ═══ */
function Marquee() {
  const items = ['FREEDOM CLOSES', 'TACTICS CHASE', 'TRUTH OVER TACTICS', 'CLOSE WITHOUT NEEDING TO', 'VERBAL CURRENCY', 'STOP TRYING · START CLOSING'];
  const r = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-white py-3 z-10">
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 35s linear infinite' }}>
        {r.map((x, i) => <span key={i} className="mx-8 text-[11px] font-bold tracking-[0.35em] uppercase text-black">{x}<span className="mx-8 text-black/20">◆</span></span>)}
      </div>
    </div>
  );
}

/* ═══ GALLERY ═══ */
function Gallery() {
  const [ref, vis] = useInView(0.05);
  const [sel, setSel] = useState<string | null>(null);
  const imgs = [
    { src: IMG.poster, label: 'THE POSTER', desc: 'Two voices. One truth.', span: 'sm:row-span-2' },
    { src: IMG.stage, label: 'THE STAGE', desc: 'A crowd ready to listen.', span: 'md:col-span-2' },
    { src: IMG.spotlight, label: 'THE SPOTLIGHT', desc: 'Under the light, nothing hides.', span: '' },
    { src: IMG.window, label: 'THE WINDOW', desc: 'Beyond the skyline.', span: '' },

  ];
  return (
    <section className="py-20 sm:py-28 bg-[#050505]">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="The Visual World" title="A FILMSCAPE," titleAccent="NOT A COURSE." vis={vis} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] sm:auto-rows-[240px] md:auto-rows-[280px]">
          {imgs.map((img, i) => (
            <div key={i} onClick={() => setSel(img.src)}
              className={`relative overflow-hidden cursor-pointer group border border-white/[0.04] hover:border-white/15 transition-all duration-700 ${img.span}
                ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}>
              <img src={img.src} alt={img.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-['Bebas_Neue'] text-lg tracking-[0.15em] text-white/80">{img.label}</span>
                <p className="text-[10px] text-white/30 mt-1">{img.desc}</p>
              </div>
              {(i === 2 || i === 3) && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 border-2 border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="w-0 h-0 border-l-[10px] border-l-white/80 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Transition show={!!sel} as={Fragment}>
        <Dialog onClose={() => setSel(null)} className="relative z-50">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="relative max-w-4xl max-h-[85vh]">
                <button onClick={() => setSel(null)} className="absolute -top-10 right-0 text-white/50 hover:text-white text-sm tracking-widest uppercase">Close ✕</button>
                {sel && <img src={sel} alt="" className="max-h-[85vh] object-contain border border-white/10" />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <div className="mt-16"><Divider /></div>
    </section>
  );
}

/* ═══ PHILOSOPHY ═══ */
function Philosophy() {
  const [ref, vis] = useInView(0.1);
  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-[0.06]">
        <img src={IMG.spotlight} alt="" className="w-full h-full object-cover" />
      </div>
      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <span className={`text-[10px] tracking-[0.5em] uppercase text-white/20 transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0'}`}>The Philosophy</span>
        <div className="mt-8 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className={`font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl tracking-[0.04em] leading-[0.95] transition-all duration-700 delay-200 ${vis ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              IF YOU <span className="font-['Playfair_Display'] italic text-[0.85em]">NEED</span> TO CLOSE,<br />YOU'VE ALREADY <span className="font-['Playfair_Display'] italic text-[0.85em]">LOST.</span>
            </h2>
            <div className={`mt-8 flex gap-4 transition-all duration-700 delay-500 ${vis ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
              <BookBtn text="Join" variant="outline" href="/contact" />
              <BookBtn text="Learn More" variant="outline" href="/about" />
            </div>
          </div>
          <div className="space-y-6">
            {[
              { q: 'Were you talking to a friend?', d: 'When you treat the call like a conversation with a friend — your authenticity becomes your weapon.' },
              { q: 'Did you have nothing to prove?', d: 'Carry the identity of an expert and you stop listening. Your insecurity speaks louder than your words.' },
              { q: 'Did you use zero tactics?', d: 'If tactic is the king, you cannot dance in your truest form. Freedom from structure IS the structure.' },
              { q: 'Did you charge what you\'re worth?', d: 'The service professional who discounts does not have a pricing problem. He has a belief problem. And belief does not respond to better proposals. It responds only to truth.' },
            ].map((x, i) => (
              <div key={i} className={`border border-white/10 bg-[#050505]/60 backdrop-blur-md p-6 hover:border-[#C41E1E]/50 transition-all duration-700 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: `${400 + i * 150}ms` }}>
                <h3 className="font-['Playfair_Display'] text-xl text-white font-semibold">"{x.q}"</h3>
                <p className="mt-3 text-white/50 text-sm leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ PROGRAM ═══ */
function ProgramSection() {
  const [ref, vis] = useInView(0.05);
  const cats: Record<string, Array<{ n: string; t: string; s: string; pts: string[] }>> = {
    'Foundation': [
      { n: '01', t: 'The Unseen Game', s: 'Inner Landscape', pts: ['80% mindset, 20% mechanics', 'Karmic account in selling', 'Transactional → Transformational'] },
      { n: '02', t: 'Sales Athletics', s: 'Train Like an Athlete', pts: ['Daily conditioning', 'Emotional stamina', 'Peak state mastery'] },
      { n: '03', t: 'Verbal Alchemy', s: 'Ethical Persuasion', pts: ['Language, tone & intent', 'Self-selling mode', 'Meta-verbal magic'] },
      { n: '04', t: 'Crucial Conversations', s: 'Negotiation', pts: ['Emotional intelligence', 'Conflict → Trust', 'Command with compassion'] },
    ],
    'Implementation': [
      { n: '05', t: 'Finding YOUR Voice', s: 'Vocal Mastery', pts: ['Pitch, volume, pace', 'Resonance', 'Strategic pausing'] },
      { n: '06', t: 'Pitchcraft', s: 'Magnetic Pitches', pts: ['Psychology framework', 'Buyer types', 'Storytelling arcs'] },
      { n: '07', t: 'Objection Alchemy', s: 'Resistance → Rapport', pts: ['Real vs smokescreen', 'Pre-framing', 'Deadliest objections'] },
    ],
    'Mastery': [
      { n: '08', t: 'Sales Medicine', s: 'Diagnosis-Based', pts: ['Problem first', 'Empathy diagnostic', 'Truth in solutions'] },
      { n: '09', t: 'Command Presence', s: 'Leadership', pts: ['Lead without force', 'Power of pause', 'Multi-modality'] },
      { n: '10', t: 'Follow-Up Renaissance', s: 'Reviving Deals', pts: ['Trust-centric', 'The long game', 'Reframing'] },
    ],
  };
  return (
    <section id="program" className="py-24 sm:py-32 bg-[#080808]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="The Program" title="10 MODULES." titleAccent="ONE TRANSFORMATION." vis={vis} />
        <p className={`text-center text-white/40 text-sm mb-12 max-w-2xl mx-auto transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          Not a library of content to consume.<br />
          A structured dismantling of everything that has been getting in your way — followed by the construction of something that actually holds.
        </p>
        <Tab.Group>
          <Tab.List className={`flex flex-wrap gap-2 mb-8 justify-center transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0'}`}>
            {Object.keys(cats).map(c => <Tab key={c} className={({ selected }) => `px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 outline-none touch-manipulation ${selected ? 'bg-white text-black' : 'border border-white/10 text-white/40 hover:text-white/70'}`}>{c}</Tab>)}
          </Tab.List>
          <Tab.Panels>
            {Object.values(cats).map((mods, ci) => (
              <Tab.Panel key={ci}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {mods.map((m, i) => (
                    <Disclosure key={i}>
                      {({ open }) => (
                        <div className={`border border-white/[0.05] bg-[#050505]/40 backdrop-blur-md transition-all duration-500 hover:border-[#C41E1E]/40 ${open ? 'border-[#C41E1E]/50 bg-black/60' : ''} ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${400 + i * 100}ms` }}>
                          <Disclosure.Button className="w-full p-6 text-left relative overflow-hidden group">
                            <span className={`absolute top-0 left-0 w-1 h-full transition-all duration-500 ${open ? 'bg-[#C41E1E]' : 'bg-transparent group-hover:bg-[#C41E1E]/50'}`} />
                            <span className={`text-[11px] tracking-widest font-mono font-bold transition-colors ${open ? 'text-[#C41E1E]' : 'text-white/30'}`}>{m.n}</span>
                            <h3 className="mt-2 font-['Playfair_Display'] text-lg font-bold text-white/90">{m.t}</h3>
                            <p className="mt-1 text-[11px] text-white/40 tracking-wider uppercase font-semibold">{m.s}</p>
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-6 pb-6 pt-2">
                            <div className="w-12 h-px bg-[#C41E1E]/50 mb-4" />
                            {m.pts.map((p, j) => <div key={j} className="flex items-start gap-3 mb-2"><span className="text-[#C41E1E] text-[10px] mt-1 pr-1">✓</span><span className="text-white/60 text-sm leading-relaxed">{p}</span></div>)}
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <div className={`mt-14 text-center transition-all duration-700 [transition-delay:800ms] ${vis ? 'opacity-100' : 'opacity-0'}`}>
          <BookBtn text="Enroll Now" size="lg" href="/contact" />
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ MENTORS ═══ */
function Mentors() {
  const [ref, vis] = useInView(0.1);
  const m = [
    {
      name: 'RISHABH', role: 'Sales Philosophy & Inner Game', tag: 'Truth Over Tactics', img: IMG.spotlight,
      bio: "Doesn't teach scripts — creates the ambience for you to find your own truth. 10+ years in high-ticket sales. 500+ pros trained. He has sat across from every version of the person this program is for. The one who over-prepares. The one who under-charges. The one who delivers brilliantly — and then apologises for existing when it is time to ask for the sale.",
      quote: '"If you have the sensibility DNA, I will give you the ambience which no one could."', accent: '#C41E1E'
    },
    {
      name: 'BRIAN', role: 'Communication & Vocal Mastery', tag: 'Verbal Currency', img: IMG.window,
      bio: "The voice architect behind Verbal Currency. Pitch, resonance, emotional intelligence, storytelling — transforms how you show up. Because the invisible service business owner is often invisible not because of what they say — but because of how little space they take up when they say it.",
      quote: '"It\'s not what you say. It\'s how you say it."', accent: '#fff'
    },
  ];
  return (
    <section id="mentors" className="py-24 sm:py-32 bg-[#050505]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Your Mentors" title="TWO MINDS." titleAccent="ONE MISSION." vis={vis} />
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {m.map((p, i) => (
            <div key={i} className={`relative overflow-hidden border border-white/10 bg-[#050505]/60 backdrop-blur-xl group transition-all duration-700 hover:border-[#C41E1E] ${vis ? 'opacity-100' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${400 + i * 250}ms` }}>
              <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.25] transition-opacity duration-700"><img src={p.img} alt="" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000" /></div>
              <div className="relative z-10 p-8 sm:p-12">
                <div className="absolute top-0 left-0 w-24 h-[3px]" style={{ background: p.accent }} />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C41E1E] font-bold">{p.tag}</span>
                <h3 className="mt-4 font-['Bebas_Neue'] text-5xl sm:text-6xl tracking-[0.05em] text-white">{p.name}</h3>
                <p className="text-xs text-white/40 tracking-[0.2em] uppercase mt-2">{p.role}</p>
                <div className="w-12 h-px bg-white/20 mt-8" />
                <p className="mt-6 text-white/60 text-sm leading-10">{p.bio}</p>
                <blockquote className="mt-8 border-l-2 border-[#C41E1E]/50 pl-5">
                  <p className="font-['Cormorant_Garamond'] italic text-white/80 text-xl leading-relaxed">{p.quote}</p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ RESULTS ═══ */
function Results() {
  const [ref, vis] = useInView(0.1);
  const c1 = useCountUp(500, 2000, vis), c2 = useCountUp(97, 2000, vis), c3 = useCountUp(3, 1500, vis);
  return (
    <section id="results" className="py-24 sm:py-32 bg-[#050505]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Results" title="WHAT HAPPENS WHEN THE RIGHT PERSON FINDS THE RIGHT ENVIRONMENT." vis={vis} />
        <p className={`text-center text-white/40 text-sm mb-12 max-w-3xl mx-auto transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          Across agencies, consulting practices, and service businesses — the pattern is always identical. The work is exceptional. The person behind it has simply decided, somewhere quietly, that they are negotiable.
        </p>
        <div className={`grid grid-cols-3 gap-3 sm:gap-8 max-w-2xl mx-auto mb-16 sm:mb-20 transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          {[{ v: `${c1}+`, l: 'Pros Trained' }, { v: `${c2}%`, l: 'Breakthrough' }, { v: `${c3}x`, l: 'Revenue Growth' }].map((s, i) =>
            <div key={i} className="text-center p-4 sm:p-6 border border-white/5 bg-[#050505]/60 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]"><div className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl text-[#C41E1E] tracking-wider">{s.v}</div><div className="text-[9px] sm:text-[11px] font-bold text-white/40 tracking-widest uppercase mt-1 sm:mt-2">{s.l}</div></div>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {[
            { t: "Before this I was chasing every deal. Now I close more by caring less about the close.", n: 'Sales Director', r: '18% → 42%' },
            { t: "'Your insecurities speak louder than your words.' That changed everything.", n: 'Founder, Ed-Tech', r: '3x revenue' },
            { t: "Brian's vocal mastery alone was worth it. I command every room now.", n: 'VP Sales', r: '+65% performance' },
          ].map((t, i) => (
            <div key={i} className={`border border-white/10 bg-[#050505]/70 backdrop-blur-lg p-8 transition-all duration-700 hover:border-[#C41E1E]/50 ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${500 + i * 150}ms` }}>
              <p className="font-serif text-white/80 text-lg leading-relaxed mb-6">"{t.t}"</p>
              <div className="mt-auto pt-4 border-t border-white/10"><p className="text-[#C41E1E] text-xs font-bold tracking-wider uppercase mb-1">{t.n}</p><p className="text-white/60 text-sm font-semibold">{t.r}</p></div>
            </div>
          ))}
        </div>
        <div className={`mt-14 text-center transition-all duration-700 [transition-delay:900ms] ${vis ? 'opacity-100' : 'opacity-0'}`}><BookBtn text="Start Now" href="/contact" /></div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ MANIFESTO ═══ */
function Manifesto() {
  const [ref, vis] = useInView(0.15);
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <FogCanvas opacity={0.35} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"><img src={IMG.poster} alt="" className="h-full object-contain opacity-[0.06]" /></div>
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className={`font-['Playfair_Display'] text-[100px] sm:text-[160px] text-white/[0.04] leading-none block -mb-12 sm:-mb-20 transition-all duration-1000 ${vis ? 'opacity-100' : 'opacity-0 scale-75'}`}>"</span>
        <blockquote className={`font-['Cormorant_Garamond'] text-xl sm:text-2xl lg:text-3xl text-white/50 leading-relaxed italic transition-all duration-1000 delay-300 ${vis ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          The body heals itself. The person becomes a great salesperson themselves. It's just that you're giving them the right environment. <span className="text-white/80">This is also a possibility.</span>
        </blockquote>
        <div className={`mt-6 transition-all duration-700 delay-600 ${vis ? 'opacity-100' : 'opacity-0'}`}><span className="text-[10px] tracking-[0.4em] uppercase text-white/15">— Rishabh</span></div>
        <div className={`mt-10 transition-all duration-700 delay-800 ${vis ? 'opacity-100' : 'opacity-0'}`}><BookBtn text="Begin" variant="outline" size="lg" href="/contact" /></div>
      </div>
    </section>
  );
}

/* ═══ THE CLARITY CALL ═══ */
function ClarityCall() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.04]">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <span className={`text-[10px] tracking-[0.5em] uppercase text-[#C41E1E] transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0'}`}>The Clarity Call</span>
        <h2 className={`mt-6 font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl tracking-[0.04em] text-white/90 transition-all duration-700 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          THIS IS WHERE IT STARTS.
        </h2>

        <div className={`mt-12 space-y-2 text-white/40 text-base sm:text-lg font-['Cormorant_Garamond'] italic transition-all duration-700 delay-300 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p>Not with a module.</p>
          <p>Not with a framework.</p>
          <p>Not with a technique you practise in the mirror.</p>
          <p className="text-white/80 not-italic font-['DM_Sans'] text-sm tracking-widest uppercase mt-6 mb-8 pt-4">With a conversation.</p>
        </div>

        <div className={`mt-12 space-y-6 text-white/40 text-sm sm:text-base leading-relaxed text-left max-w-2xl mx-auto transition-all duration-700 delay-400 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          <p>
            The Clarity Call is a 45-minute deep diagnostic — designed for the service business owner who knows something is getting in the way, but hasn't been able to name it precisely.
          </p>
          <p>On this call, we go to the root.</p>
          <p className="pl-4 border-l border-[#C41E1E]/50">
            Not "what's your sales process" — but what is actually happening in the room when the conversation turns to money?
          </p>
          <p className="pl-4 border-l border-[#C41E1E]/50">
            Not "how do you handle objections" — but what do you believe, underneath the objection, about whether you deserve the yes?
          </p>
          <p>
            By the end of the call — regardless of what comes next — you will leave with something most sales conversations never give you.<br /><br />
            <span className="text-white inset-0 font-['Bebas_Neue'] text-4xl tracking-widest">CLARITY.</span>
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3"><span className="text-[#C41E1E]">—</span> About where the gap actually is.</li>
            <li className="flex gap-3"><span className="text-[#C41E1E]">—</span> About what has been running the room without your permission.</li>
            <li className="flex gap-3"><span className="text-[#C41E1E]">—</span> About what changes when it stops.</li>
          </ul>
          <div className="w-12 h-px bg-[#C41E1E]/50 my-8 mx-auto" />
          <p className="text-center">If there is a fit, we will discuss what working together looks like.<br />If there isn't — you leave with more than you came with.</p>
          <p className="text-center font-['Playfair_Display'] italic text-[#C41E1E] text-xl mt-6">There is no pitch on this call.<br />Only truth.</p>
        </div>

        <div className={`mt-16 transition-all duration-700 delay-600 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          <BookBtn text="Book Your Clarity Call" size="lg" href="/contact" />
          <p className="mt-4 text-[10px] tracking-wider text-white/20 uppercase">The Clarity Call is reviewed before booking is confirmed.<br />Not every application is accepted.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
function Pricing() {
  const [ref, vis] = useInView(0.1);
  const inc = ['45-Minute Deep Diagnostic', 'Root Cause Identification', 'Sales Block Dismantling', 'No-Pitch Conversation', 'Immediate Actionable Clarity'];
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#080808]">
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        <SectionHead eyebrow="Investment" title="NOT A COURSE." titleAccent="LIBERATION." sub="The program begins on a call. One honest conversation about where you actually are." vis={vis} />
        <div className={`relative border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 sm:p-12 transition-all duration-700 delay-400 ${vis ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C41E1E]/50" /><div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#C41E1E]/50" /><div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#C41E1E]/50" /><div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C41E1E]/50" />
          <div className="text-center">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#C41E1E]">Strategic Alignment</span>
            <div className="mt-3 font-['Bebas_Neue'] text-5xl sm:text-6xl text-white tracking-[0.05em] uppercase">Book A Call</div>
            <p className="mt-1 text-white/30 text-[10px] tracking-wider uppercase">Free. No long-term commitment.</p>
          </div>
          <div className="w-full h-px bg-white/[0.06] my-8" />
          <div className="space-y-3">{inc.map((x, i) => <div key={i} className="flex items-start gap-3"><span className="text-[#C41E1E] text-[10px] mt-0.5">✓</span><span className="text-white/50 text-sm">{x}</span></div>)}</div>
          <div className="w-full h-px bg-white/[0.06] my-8" />
          <p className="text-center text-white/50 text-sm mb-6 max-w-xl mx-auto italic font-['Cormorant_Garamond']">For the service professional whose only real competitor has never been the market. It has been the version of himself that apologises before the client even objects.</p>
          <div className="text-center"><BookBtn text="Book Your Clarity Call" size="lg" href="/contact" /><p className="mt-3 text-white/10 text-[10px]">Application reviewed before acceptance.</p></div>
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ CTA ═══ */
function FinalCTA() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <FogCanvas opacity={0.25} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.05]"><img src={IMG.stage} alt="" className="w-full h-full object-cover" /></div>
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className={`font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl tracking-[0.04em] leading-[0.95] transition-all duration-700 delay-200 ${vis ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          FREEDOM IS THE HIGHEST<br /><span className="font-['Playfair_Display'] italic font-normal text-[0.85em] text-[#C41E1E]">SALES SKILL.</span>
        </h2>
        <p className={`mt-6 text-white/50 text-xl font-['Cormorant_Garamond'] italic transition-all duration-700 delay-400 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          You've been seen here.<br />Come be heard.
        </p>
        <div className={`mt-10 transition-all duration-700 delay-600 ${vis ? 'opacity-100' : 'opacity-0'}`}><BookBtn text="Book Your Clarity Call" size="lg" href="/contact" /></div>
      </div>
    </section>
  );
}

/* ═══ OBJECTION ALCHEMY ═══ */
function ObjectionAlchemy() {
  const [ref, vis] = useInView(0.1);
  const [flipped, setFlipped] = useState<number | null>(null);
  const cards = [
    {
      obj: `"It's too expensive."`,
      tactic: "Defend the ROI. Try to prove the value mathematically. Offer a payment plan or a discount to save the deal.",
      truth: "Agree and detach. Diagnose why they don't see the value. If it's truly out of budget, let them walk with dignity."
    },
    {
      obj: `"I need to think about it."`,
      tactic: "Corner them. 'What exactly do you need to think about?' Try to handle the objection before letting them off the phone.",
      truth: "Give them space. 'Of course. What's a good timeline for you?' Pressure creates resistance; freedom creates trust."
    },
    {
      obj: `"Send me a proposal."`,
      tactic: "Spend hours making a 20-page PDF. Follow up endlessly until they ghost you completely.",
      truth: "Clarify intent. 'Happy to. What specifically are you looking to see that we haven't covered today?'"
    },
    {
      obj: `"We've worked with cheaper options before."`,
      tactic: "Justify why you are better. Pull out case studies. Offer a starter package so they can test you first.",
      truth: "Premium does not explain itself. The moment you prove you are not cheap — you have accepted the frame that you might be. Your silence on this comparison is the answer."
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#050505] overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Interactive" title="OBJECTION ALCHEMY." titleAccent="PLAY THE GAME." vis={vis} />
        <p className={`text-center text-white/40 text-sm mb-16 max-w-xl mx-auto transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          <span className="hidden sm:inline">Hover over</span><span className="sm:hidden">Tap</span> the common client objections below to reveal the difference between a scripted tactic and the ultimate truth.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`group perspective-1000 h-[300px] sm:h-[320px] cursor-pointer touch-manipulation transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 ${flipped === i ? 'rotate-y-180' : ''}`}>

                {/* Front */}
                <div className="absolute inset-0 backface-hidden border border-white/[0.05] bg-black/50 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-6">The Client Says:</span>
                  <h3 className="font-['Playfair_Display'] italic text-xl sm:text-2xl text-white/90">
                    {c.obj}
                  </h3>
                  <div className="mt-8 text-white/20 text-[10px] tracking-widest uppercase animate-pulse">
                    <span className="hidden sm:inline">Hover</span><span className="sm:hidden">Tap</span> to Flip →
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 border border-white/[0.1] bg-[#0a0a0a] p-6 sm:p-8 flex flex-col justify-center text-left">
                  <div className="mb-5">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C41E1E]">The Tactic</span>
                    <p className="mt-2 text-white/40 text-[12px] sm:text-[13px] leading-relaxed">{c.tactic}</p>
                  </div>
                  <div className="w-8 h-px bg-white/10 mb-5" />
                  <div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white">The Truth</span>
                    <p className="mt-2 text-white/80 text-[12px] sm:text-[13px] leading-relaxed font-medium">{c.truth}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ ECOSYSTEM / EXPLORE ═══ */
function EcosystemExplore() {
  const [ref, vis] = useInView(0.1);
  const pages = [
    { title: "THE SIMULATOR", desc: "Interactive roleplay to test your responses in real-time.", href: "/simulator", tag: "Practice", img: IMG.stage },
    { title: "PRODUCTS", desc: "Targeted deep dives into specific communication bottlenecks.", href: "/products", tag: "Self-Paced", img: IMG.poster },
    { title: "THE PHILOSOPHY", desc: "Understand the origin of Truth Over Tactics.", href: "/about", tag: "About", img: IMG.window },
    { title: "FAQ", desc: "Every question, answered with absolute clarity.", href: "/faq", tag: "Details", img: IMG.spotlight },
  ];
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.02]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="The Ecosystem" title="EXPLORE." titleAccent="GO DEEPER." vis={vis} />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 relative z-10">
          {pages.map((p, i) => (
            <Link key={i} to={p.href} className={`group relative h-[220px] sm:h-[280px] lg:h-[300px] border border-white/10 bg-[#050505]/80 backdrop-blur-md overflow-hidden transition-all duration-700 hover:border-[#C41E1E]/50 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${300 + i * 150}ms` }}>
              <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700"><img src={p.img} alt="" loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" /></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 z-10">
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#C41E1E] font-bold mb-2 sm:mb-3">{p.tag}</span>
                <h3 className="font-['Bebas_Neue'] text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide leading-tight">{p.title}</h3>
                <p className="mt-2 sm:mt-3 text-white/50 text-xs sm:text-sm leading-relaxed group-hover:text-white/90 transition-colors line-clamp-2 sm:line-clamp-none">{p.desc}</p>
                <div className="mt-6 flex items-center text-[#C41E1E] text-xs tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FEATURED REELS ═══ */
function FeaturedReels() {
  const [ref, vis] = useInView(0.05);
  const reels = [
    {
      src: VIDEO.reel1,
      title: 'REEL ONE',
      subtitle: 'The Unseen Game',
      desc: 'A glimpse into the world of Verbal Currency — where truth becomes your most powerful closing tool.',
    },
    {
      src: VIDEO.reel2,
      title: 'REEL TWO',
      subtitle: 'Freedom Over Tactics',
      desc: 'Watch what happens when you stop performing and start being. Sales mastery, redefined.',
    },
  ];
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#050505]">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead eyebrow="Watch" title="FEATURED" titleAccent="REELS." vis={vis} />
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 mt-10 sm:mt-12">
          {reels.map((reel, i) => (
            <div
              key={i}
              className={`group relative border border-white/[0.06] bg-[#080808] overflow-hidden transition-all duration-700 hover:border-[#C41E1E]/40 hover:shadow-[0_0_40px_rgba(196,30,30,0.08)] ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${300 + i * 200}ms` }}
            >
              {/* Video player */}
              <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
                <video
                  className="absolute inset-0 w-full h-full object-contain"
                  src={reel.src}
                  controls
                  preload="metadata"
                  playsInline
                  controlsList="nodownload"
                  style={{ WebkitPlaysinline: true } as React.CSSProperties}
                />
              </div>
              {/* Info */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="w-2 h-2 bg-[#C41E1E] rounded-full animate-pulse" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#C41E1E] font-bold">{reel.subtitle}</span>
                </div>
                <h3 className="font-['Bebas_Neue'] text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.06em] text-white/90 group-hover:text-white transition-colors">{reel.title}</h3>
                <p className="mt-2 text-white/40 text-xs sm:text-sm leading-relaxed group-hover:text-white/60 transition-colors">{reel.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 sm:mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ HOME PAGE ═══ */
export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Marquee />
      <FeaturedReels />
      <Philosophy />
      <Gallery />
      <ProgramSection />
      <Mentors />
      <Results />
      <Manifesto />
      <ObjectionAlchemy />
      <Pricing />
      <EcosystemExplore />
      <ClarityCall />
      <FinalCTA />
      <Marquee />
    </PageLayout>
  );
}

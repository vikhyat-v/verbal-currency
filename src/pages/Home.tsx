import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Tab, Disclosure } from '@headlessui/react';
import { PageLayout, FogCanvas, BookBtn, Divider, SectionHead, useInView, useCountUp } from '../components/Shared';
import { IMG } from '../data/images';

/* ═══ HERO ═══ */
function Hero() {
  const [ld, setLd] = useState(false);
  useState(() => { setTimeout(() => setLd(true), 300); });
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FogCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-[1]" />
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <img src={IMG.filmscape} alt="" className="h-full max-h-[80vh] object-contain opacity-[0.12] mix-blend-lighten" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[70vh] pointer-events-none z-[1]"
        style={{ background: 'conic-gradient(from 180deg, transparent 30%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 70%)', animation: 'flickerLight 8s ease-in-out infinite' }} />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${ld ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-white/30 mb-8 border border-white/10 px-5 py-2">Sales &amp; Communication Mastery</span>
        </div>
        <h1 className={`transition-all duration-1000 delay-200 ${ld ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <span className="block font-['Bebas_Neue'] text-6xl sm:text-8xl lg:text-[120px] xl:text-[140px] leading-[0.85] tracking-[0.04em] text-white">CLOSE WITHOUT</span>
          <span className="block font-['Bebas_Neue'] text-6xl sm:text-8xl lg:text-[120px] xl:text-[140px] leading-[0.85] tracking-[0.04em] text-white">NEEDING TO.</span>
        </h1>
        <div className={`mt-2 h-px w-32 sm:w-48 mx-auto bg-white/20 transition-all duration-1000 delay-500 origin-center ${ld ? 'scale-x-100' : 'scale-x-0'}`} />
        <p className={`mt-8 font-['Cormorant_Garamond'] italic text-lg sm:text-2xl text-white/35 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${ld ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
          The sale happens when you let go. Master the inner game through freedom, not force.
        </p>
        <div className={`mt-5 transition-all duration-1000 delay-700 ${ld ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-['Bebas_Neue'] text-sm tracking-[0.5em] text-white/15">TRUTH OVER TACTICS</span>
        </div>
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-1000 delay-900 ${ld ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <BookBtn text="Reserve Your Seat" size="lg" href="/contact" />
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
    { src: IMG.poster, label: 'THE POSTER', desc: 'Two voices. One truth.', span: 'row-span-2' },
    { src: IMG.stage, label: 'THE STAGE', desc: 'A crowd ready to listen.', span: 'md:col-span-2' },
    { src: IMG.spotlight, label: 'THE SPOTLIGHT', desc: 'Under the light, nothing hides.', span: '' },
    { src: IMG.window, label: 'THE WINDOW', desc: 'Beyond the skyline.', span: '' },
    { src: IMG.filmscape, label: 'THE FILMSCAPE', desc: 'No games. Just truth.', span: 'row-span-2' },
  ];
  return (
    <section className="py-20 sm:py-28 bg-[#050505]">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="The Visual World" title="A FILMSCAPE," titleAccent="NOT A COURSE." vis={vis} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] sm:auto-rows-[280px]">
          {imgs.map((img, i) => (
            <div key={i} onClick={() => setSel(img.src)}
              className={`relative overflow-hidden cursor-pointer group border border-white/[0.04] hover:border-white/15 transition-all duration-700 ${img.span}
                ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}>
              <img src={img.src} alt={img.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
          <div className="space-y-8">
            {[
              { q: 'Were you talking to a friend?', d: 'When you treat the call like a conversation with a friend — your authenticity becomes your weapon.' },
              { q: 'Did you have nothing to prove?', d: 'Carry the identity of an expert and you stop listening. Your insecurity speaks louder than your words.' },
              { q: 'Did you use zero tactics?', d: 'If tactic is the king, you cannot dance in your truest form. Freedom from structure IS the structure.' },
            ].map((x, i) => (
              <div key={i} className={`border-l border-white/10 pl-6 transition-all duration-700 ${vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: `${400 + i * 200}ms` }}>
                <h3 className="font-['Playfair_Display'] text-lg text-white/70 italic">"{x.q}"</h3>
                <p className="mt-2 text-white/25 text-sm leading-relaxed">{x.d}</p>
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
        <Tab.Group>
          <Tab.List className={`flex gap-2 mb-8 justify-center transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0'}`}>
            {Object.keys(cats).map(c => <Tab key={c} className={({ selected }) => `px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase transition-all duration-300 outline-none ${selected ? 'bg-white text-black' : 'border border-white/10 text-white/40 hover:text-white/70'}`}>{c}</Tab>)}
          </Tab.List>
          <Tab.Panels>
            {Object.values(cats).map((mods, ci) => (
              <Tab.Panel key={ci}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {mods.map((m, i) => (
                    <Disclosure key={i}>
                      {({ open }) => (
                        <div className={`border border-white/[0.05] bg-black/50 transition-all duration-500 hover:border-white/10 ${open ? 'border-white/15 bg-black/80' : ''} ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${400 + i * 100}ms` }}>
                          <Disclosure.Button className="w-full p-5 text-left">
                            <span className="text-white/15 text-[10px] tracking-widest font-mono">{m.n}</span>
                            <h3 className="mt-1 font-['Playfair_Display'] text-base font-semibold text-white/70">{m.t}</h3>
                            <p className="mt-0.5 text-[10px] text-white/20 tracking-wider uppercase">{m.s}</p>
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-5 pb-5">
                            <div className="w-6 h-px bg-white/10 mb-3" />
                            {m.pts.map((p, j) => <div key={j} className="flex items-start gap-2 mb-1.5"><span className="text-white/15 text-[8px] mt-0.5">—</span><span className="text-white/30 text-xs leading-relaxed">{p}</span></div>)}
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
      name: 'RISHAB', role: 'Sales Philosophy & Inner Game', tag: 'Truth Over Tactics', img: IMG.spotlight,
      bio: "Doesn't teach scripts — creates the ambience for you to find your own truth. 10+ years in high-ticket sales. 500+ pros trained.",
      quote: '"If you have the sensibility DNA, I will give you the ambience which no one could."', accent: '#C41E1E'
    },
    {
      name: 'BRIAN', role: 'Communication & Vocal Mastery', tag: 'Verbal Currency', img: IMG.window,
      bio: "The voice architect behind Verbal Currency. Pitch, resonance, emotional intelligence, storytelling — transforms how you show up.",
      quote: '"It\'s not what you say. It\'s how you say it."', accent: '#fff'
    },
  ];
  return (
    <section id="mentors" className="py-24 sm:py-32 bg-[#050505]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Your Mentors" title="TWO MINDS." titleAccent="ONE MISSION." vis={vis} />
        <div className="grid md:grid-cols-2 gap-6">
          {m.map((p, i) => (
            <div key={i} className={`relative overflow-hidden border border-white/[0.05] bg-black group transition-all duration-700 hover:border-white/10 ${vis ? 'opacity-100' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${400 + i * 250}ms` }}>
              <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity"><img src={p.img} alt="" className="w-full h-full object-cover" /></div>
              <div className="relative z-10 p-8 sm:p-10">
                <div className="absolute top-0 left-0 w-12 h-[2px]" style={{ background: p.accent }} />
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">{p.tag}</span>
                <h3 className="mt-4 font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[0.1em] text-white/90">{p.name}</h3>
                <p className="text-[11px] text-white/30 tracking-[0.2em] uppercase mt-1">{p.role}</p>
                <div className="w-8 h-px bg-white/10 mt-6" />
                <p className="mt-5 text-white/30 text-sm leading-relaxed">{p.bio}</p>
                <blockquote className="mt-5 border-l border-white/10 pl-4">
                  <p className="font-['Cormorant_Garamond'] italic text-white/20 text-base leading-relaxed">{p.quote}</p>
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
        <SectionHead eyebrow="Results" title="NUMBERS DON'T NEED TACTICS." vis={vis} />
        <div className={`grid grid-cols-3 gap-8 max-w-xl mx-auto mb-16 transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          {[{ v: `${c1}+`, l: 'Pros Trained' }, { v: `${c2}%`, l: 'Breakthrough' }, { v: `${c3}x`, l: 'Revenue Growth' }].map((s, i) =>
            <div key={i} className="text-center"><div className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider">{s.v}</div><div className="text-[10px] text-white/25 tracking-wider uppercase mt-1">{s.l}</div></div>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Before this I was chasing every deal. Now I close more by caring less about the close.", n: 'Sales Director', r: '18% → 42%' },
            { t: "'Your insecurities speak louder than your words.' That changed everything.", n: 'Founder, Ed-Tech', r: '3x revenue' },
            { t: "Brian's vocal mastery alone was worth it. I command every room now.", n: 'VP Sales', r: '+65% performance' },
          ].map((t, i) => (
            <div key={i} className={`border border-white/[0.04] bg-black/40 p-6 transition-all duration-700 hover:border-white/10 ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${500 + i * 150}ms` }}>
              <p className="font-['Cormorant_Garamond'] italic text-white/30 text-base leading-relaxed">"{t.t}"</p>
              <div className="mt-5 pt-4 border-t border-white/[0.05]"><p className="text-white/20 text-[10px] tracking-wider uppercase">{t.n}</p><p className="text-white/50 text-xs font-semibold mt-1">{t.r}</p></div>
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
        <div className={`mt-6 transition-all duration-700 delay-600 ${vis ? 'opacity-100' : 'opacity-0'}`}><span className="text-[10px] tracking-[0.4em] uppercase text-white/15">— Rishab</span></div>
        <div className={`mt-10 transition-all duration-700 delay-800 ${vis ? 'opacity-100' : 'opacity-0'}`}><BookBtn text="Begin" variant="outline" size="lg" href="/contact" /></div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
function Pricing() {
  const [ref, vis] = useInView(0.1);
  const inc = ['10 Core Modules', 'Live cohort with Rishab & Brian', 'Vocal Mastery Workshop', 'EI & Mindfulness Training', 'Pitchcraft Frameworks', 'Objection Alchemy Playbook', 'Lifetime community', '1-on-1 hot seats', 'Bonus Philosophy Module', 'All recordings'];
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#080808]">
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        <SectionHead eyebrow="Investment" title="NOT A COURSE." titleAccent="LIBERATION." vis={vis} />
        <div className={`relative border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 sm:p-12 transition-all duration-700 delay-400 ${vis ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20" /><div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20" /><div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20" /><div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20" />
          <div className="text-center">
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Verbal Currency Premium</span>
            <div className="mt-3 font-['Bebas_Neue'] text-6xl sm:text-7xl text-white tracking-[0.05em]">₹1,50,000</div>
            <p className="mt-1 text-white/15 text-[10px] tracking-wider">One-time. Lifetime transformation.</p>
          </div>
          <div className="w-full h-px bg-white/[0.06] my-8" />
          <div className="space-y-3">{inc.map((x, i) => <div key={i} className="flex items-start gap-3"><span className="text-white/20 text-[10px] mt-0.5">—</span><span className="text-white/35 text-sm">{x}</span></div>)}</div>
          <div className="w-full h-px bg-white/[0.06] my-8" />
          <div className="text-center"><BookBtn text="Apply Now" size="lg" href="/contact" /><p className="mt-3 text-white/10 text-[10px]">Application reviewed before acceptance.</p></div>
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
          FREEDOM IS THE HIGHEST<br /><span className="font-['Playfair_Display'] italic font-normal text-[0.85em] text-white/60">SALES SKILL.</span>
        </h2>
        <div className={`mt-10 transition-all duration-700 delay-600 ${vis ? 'opacity-100' : 'opacity-0'}`}><BookBtn text="Apply for Verbal Currency" size="lg" href="/contact" /></div>
      </div>
    </section>
  );
}

/* ═══ HOME PAGE ═══ */
export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Marquee />
      <Philosophy />
      <Gallery />
      <ProgramSection />
      <Mentors />
      <Results />
      <Manifesto />
      <Pricing />
      <FinalCTA />
      <Marquee />
    </PageLayout>
  );
}

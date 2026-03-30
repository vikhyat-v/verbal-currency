import { PageLayout, FogCanvas, BookBtn, Divider, SectionHead, useInView } from '../components/Shared';
import { IMG } from '../data/images';

function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <FogCanvas opacity={0.5} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-[1]" />
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.1]">
        <img src={IMG.poster} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <span className="inline-block text-[11px] font-bold tracking-[0.5em] uppercase text-[#C41E1E] mb-8 border border-[#C41E1E]/30 bg-[#C41E1E]/5 px-6 py-2">Our Story</span>
        <h1 className="font-['Bebas_Neue'] text-5xl sm:text-7xl lg:text-8xl tracking-[0.04em] text-white leading-[0.9]">
          TRUTH OVER<br />TACTICS.
        </h1>
        <p className="mt-6 font-['Cormorant_Garamond'] italic text-lg sm:text-xl text-white/35 max-w-lg mx-auto leading-relaxed">
          We didn't build a course. We built a philosophy that happens to teach sales.
        </p>
      </div>
    </section>
  );
}

function Story() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="py-24 sm:py-32 bg-[#050505]">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <div className={`grid md:grid-cols-5 gap-12 transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="md:col-span-2">
            <img src={IMG.filmscape} alt="Truth Over Tactics" className="w-full aspect-[3/4] object-cover border border-white/[0.05] grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="md:col-span-3">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#C41E1E] font-bold">The Origin</span>
            <h2 className="mt-3 font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[0.06em] text-white">WHY WE EXIST</h2>
            <div className="w-12 h-px bg-[#C41E1E]/50 mt-5 mb-8" />
            <div className="space-y-6 text-white/60 text-sm leading-relaxed">
              <p>Most sales training teaches you what to say. We teach you how to be free enough that the right thing to say comes naturally.</p>
              <p>The name "Truth Over Tactics" isn't a marketing angle — it's the entire operating system. When Rishabh ran his first raw, unscripted sales training session, the room was confused. No slides. No frameworks. No "repeat after me."</p>
              <p>Instead, he asked three questions: Were you talking to a friend? Did you have nothing to prove? Did you use zero tactics? If the answer to all three isn't yes, you're not free. And if you're not free, your insecurities speak louder than your words.</p>
              <p>Brian brought the science of voice — how your pitch, your pause, your resonance can transform a conversation before you even say anything meaningful. Together they created Verbal Currency: the idea that your words, your voice, your presence are currency. And the richest people on a call aren't the ones with the best script — they're the ones with the most freedom.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

function Values() {
  const [ref, vis] = useInView(0.1);
  const vals = [
    { title: 'Freedom Over Force', desc: 'Peak performance comes from accessing your skills freely — not from chasing conversion.' },
    { title: 'Diagnosis Before Prescription', desc: 'We understand problems before offering solutions. Empathy is our diagnostic tool.' },
    { title: 'Identity Kills Performance', desc: 'The more identity you carry, the more crippled your performance. We teach detachment.' },
    { title: 'Ambience Over Advice', desc: "We don't tell you what to do. We create the environment where you discover it yourself." },
    { title: 'Sensibility DNA', desc: "This isn't for everyone. It's for those who already sense that something deeper drives sales." },
    { title: 'Anti-Shiny Object', desc: "No 10-step protocols. No persuasion mechanisms. No game. Just truth." },
  ];
  return (
    <section className="py-24 sm:py-32 bg-[#080808]">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <SectionHead eyebrow="What We Believe" title="OUR VALUES." vis={vis} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vals.map((v, i) => (
            <div key={i} className={`border border-white/10 bg-[#080808] p-8 transition-all duration-700 hover:border-[#C41E1E]/50 ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}>
              <div className="w-8 h-[2px] bg-[#C41E1E]/80 mb-6" />
              <h3 className="font-['Playfair_Display'] text-xl text-white font-semibold">{v.title}</h3>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

function BuiltBy() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="py-24 sm:py-32 bg-[#050505]">
      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <div className={`grid md:grid-cols-5 gap-12 items-center transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="md:col-span-2">
            <a href="https://www.instagram.com/vikhyat.v/" target="_blank" rel="noreferrer" className="block relative group">
              <img src={IMG.vikhyat} alt="Vikhyat" className="w-full aspect-[3/4] object-cover border border-white/[0.05] grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-['Bebas_Neue'] text-xl tracking-[0.1em] text-white/80 group-hover:text-white transition-colors">VIKHYAT ↗</span>
                <p className="text-[10px] text-white/40 tracking-wider">Tech & AI/ML Consultant</p>
              </div>
            </a>
          </div>
          <div className="md:col-span-3">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#C41E1E] font-bold">Built By</span>
            <h2 className="mt-3 font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[0.06em] text-white">THE MIND BEHIND THE SCREEN</h2>
            <div className="w-12 h-px bg-[#C41E1E]/50 mt-5 mb-8" />
            <div className="space-y-6 text-white/60 text-sm leading-relaxed">
              <p>This website wasn't outsourced to an agency. It was built by <a href="https://www.instagram.com/vikhyat.v/" target="_blank" rel="noreferrer" className="text-white font-semibold hover:text-[#C41E1E] underline decoration-[#C41E1E]/50 transition-colors">Vikhyat</a> — Tech & AI/ML Consultant, performance marketer, and the silent architect behind Truth Over Tactics' digital presence.</p>
              <p>From custom WordPress themes to high-converting sales funnels, Meta ad systems, and now this cinematic React experience — every pixel serves the philosophy: communicate simply, sell authentically, and never play the shiny object game.</p>
              <p>The same principles that drive the Verbal Currency program drove the design of this site: no unnecessary noise, no visual tactics, just clarity and presence.</p>
            </div>
            <div className="mt-6 flex gap-4">
              <BookBtn text="Get in Touch" size="sm" variant="outline" href="/contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <PageLayout>
      <AboutHero />
      <Story />
      <Values />
      <BuiltBy />
    </PageLayout>
  );
}

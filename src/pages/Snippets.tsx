import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout, FogCanvas, BookBtn, Divider, SectionHead, useInView } from '../components/Shared';
import { VIDEO } from '../data/images';

/* ═══ SNIPPETS HERO ═══ */
function SnippetsHero() {
  const [ld, setLd] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setLd(true), 200); return () => clearTimeout(timer); }, []);
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden flex items-center justify-center">
      <FogCanvas opacity={0.3} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${ld ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-[#C41E1E] mb-6 border border-[#C41E1E]/30 bg-[#C41E1E]/5 px-5 py-1.5">The Collection</span>
        </div>
        <h1 className={`font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-[100px] tracking-[0.06em] leading-[0.85] text-white transition-all duration-1000 delay-200 ${ld ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          SNIPPETS
        </h1>
        <div className={`mt-4 h-px w-24 sm:w-36 mx-auto bg-[#C41E1E]/50 transition-all duration-1000 delay-400 origin-center ${ld ? 'scale-x-100' : 'scale-x-0'}`} />
        <p className={`mt-6 font-['Cormorant_Garamond'] text-lg sm:text-xl text-white/50 italic max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-500 ${ld ? 'opacity-100' : 'opacity-0'}`}>
          Raw moments. Real conversations. The unfiltered truth behind Verbal Currency.
        </p>
        <div className={`mt-10 flex items-center justify-center gap-6 transition-all duration-700 delay-700 ${ld ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/" className="text-white/20 hover:text-white/60 text-xs tracking-[0.2em] uppercase transition-colors">← Home</Link>
          <span className="text-white/10">|</span>
          <Link to="/about" className="text-white/20 hover:text-white/60 text-xs tracking-[0.2em] uppercase transition-colors">About →</Link>
        </div>
      </div>
    </section>
  );
}

/* ═══ VIDEO GRID ═══ */
function VideoGrid() {
  const [ref, vis] = useInView(0.05);
  const snippets = [
    {
      src: VIDEO.reel1,
      number: '01',
      title: 'THE UNSEEN GAME',
      tag: 'Philosophy · Sales Psychology',
      desc: 'A deep look into what separates the ones who close from the ones who chase. This is not about scripts — it\'s about the invisible architecture of trust, the unspoken currency of authenticity, and the art of letting truth do the heavy lifting.',
      quote: '"The moment you stop needing the yes, you start deserving it."',
    },
    {
      src: VIDEO.reel2,
      number: '02',
      title: 'FREEDOM OVER TACTICS',
      tag: 'Communication · Presence',
      desc: 'Watch the shift that happens when you stop performing and start being present. True sales mastery isn\'t about control — it\'s about freedom. This reel captures the philosophy that has transformed how hundreds of service professionals show up.',
      quote: '"Freedom is the highest sales skill."',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#050505]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Featured Content" title="ALL SNIPPETS." titleAccent="WATCH & LEARN." vis={vis} />

        <div className="space-y-10 sm:space-y-16 mt-10 sm:mt-12">
          {snippets.map((s, i) => (
            <div
              key={i}
              className={`group relative border border-white/[0.05] bg-[#080808]/80 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:border-[#C41E1E]/30 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: `${300 + i * 250}ms` }}
            >
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Video — takes 3/5 on desktop */}
                <div className="lg:col-span-3 relative bg-black">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '75vw' }}>
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={s.src}
                      controls
                      preload="metadata"
                      playsInline
                      controlsList="nodownload"
                      style={{ WebkitPlaysinline: true } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Info panel — takes 2/5 on desktop */}
                <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative">
                  {/* Decorative accent line */}
                  <div className="absolute top-0 left-0 w-full lg:w-[3px] h-[3px] lg:h-full bg-gradient-to-r lg:bg-gradient-to-b from-[#C41E1E]/60 via-[#C41E1E]/20 to-transparent" />

                  <span className="font-mono text-[11px] tracking-widest text-white/20 font-bold">{s.number}</span>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#C41E1E] rounded-full snippet-pulse" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#C41E1E] font-bold">{s.tag}</span>
                  </div>
                  <h3 className="mt-4 font-['Bebas_Neue'] text-3xl sm:text-4xl lg:text-5xl tracking-[0.05em] text-white/90 group-hover:text-white transition-colors leading-[0.95]">
                    {s.title}
                  </h3>
                  <div className="w-10 h-px bg-white/10 my-5 sm:my-6" />
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    {s.desc}
                  </p>
                  <blockquote className="mt-6 sm:mt-8 border-l-2 border-[#C41E1E]/40 pl-4">
                    <p className="font-['Cormorant_Garamond'] italic text-white/60 text-base sm:text-lg leading-relaxed">{s.quote}</p>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20"><Divider /></div>
    </section>
  );
}

/* ═══ CTA SECTION ═══ */
function SnippetsCTA() {
  const [ref, vis] = useInView(0.15);
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <FogCanvas opacity={0.2} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className={`font-['Bebas_Neue'] text-5xl sm:text-6xl lg:text-7xl tracking-[0.04em] leading-[0.95] transition-all duration-700 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          SEEN ENOUGH?<br /><span className="font-['Playfair_Display'] italic font-normal text-[0.85em] text-[#C41E1E]">LET'S TALK.</span>
        </h2>
        <p className={`mt-6 text-white/40 text-lg font-['Cormorant_Garamond'] italic transition-all duration-700 delay-400 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          The next reel could be your transformation story.
        </p>
        <div className={`mt-10 transition-all duration-700 delay-600 ${vis ? 'opacity-100' : 'opacity-0'}`}>
          <BookBtn text="Book Your Clarity Call" size="lg" href="/contact" />
        </div>
      </div>
    </section>
  );
}

/* ═══ SNIPPETS PAGE ═══ */
export default function Snippets() {
  return (
    <PageLayout>
      <SnippetsHero />
      <VideoGrid />
      <SnippetsCTA />
    </PageLayout>
  );
}

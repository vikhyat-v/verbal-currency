import { useState, useEffect, useRef } from 'react';
import type { RefObject, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ═══════ HOOKS ═══════ */
export function useInView(threshold = 0.12): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => { const h = () => setY(window.scrollY); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  return y;
}

export function useCountUp(end: number, dur = 2000, go = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!go) return; let st: number;
    const step = (ts: number) => { if (!st) st = ts; const p = Math.min((ts - st) / dur, 1); setVal(Math.floor(p * end)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [end, dur, go]);
  return val;
}

/* ═══════ FOG CANVAS ═══════ */
export function FogCanvas({ opacity = 1 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    let id: number, t = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const fog = Array.from({ length: 18 }, () => ({
      bx: Math.random() * 2000, by: Math.random() * 1200, r: 200 + Math.random() * 500,
      sp: 0.2 + Math.random() * 0.4, ph: Math.random() * Math.PI * 2,
      a: 0.01 + Math.random() * 0.02, dr: 30 + Math.random() * 60,
    }));
    const draw = () => {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, c.width, c.height);
      fog.forEach(f => {
        const x = f.bx + Math.sin(t * 0.002 * f.sp + f.ph) * f.dr + t * 0.02 * f.sp;
        const y = f.by + Math.cos(t * 0.0015 * f.sp + f.ph) * f.dr * 0.4;
        const g = ctx.createRadialGradient(x, y, 0, x, y, f.r);
        g.addColorStop(0, `rgba(255,255,255,${f.a})`); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, f.r, 0, Math.PI * 2); ctx.fill();
      });
      const pulse = 0.12 + Math.sin(t * 0.01) * 0.05;
      const sg = ctx.createRadialGradient(c.width / 2, 0, 0, c.width / 2, c.height * 0.6, c.width * 0.6);
      sg.addColorStop(0, `rgba(255,255,255,${pulse})`); sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, 0, c.width, c.height);
      const vg = ctx.createRadialGradient(c.width / 2, c.height / 2, c.width * 0.2, c.width / 2, c.height / 2, c.width * 0.85);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, c.width, c.height);
      t++; id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }} />;
}

/* ═══════ BOOK BUTTON ═══════ */
export function BookBtn({ text = 'Book Your Seat', size = 'md', variant = 'solid', className = '', href }: {
  text?: string; size?: 'sm' | 'md' | 'lg'; variant?: 'solid' | 'outline'; className?: string; href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const mm = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };
  const ml = () => setPos({ x: 0, y: 0 });

  const sz = { sm: 'px-5 py-2.5 text-xs', md: 'px-8 py-3.5 text-sm', lg: 'px-10 py-4 text-base' }[size];
  const base = variant === 'solid'
    ? 'bg-[#C41E1E] text-white hover:bg-red-700'
    : 'border border-[#C41E1E] text-white/80 hover:bg-[#C41E1E] hover:text-white';
  const cls = `magnetic inline-block font-semibold uppercase tracking-[0.2em] transition-colors duration-500 relative overflow-hidden group font-['DM_Sans'] ${base} ${sz} ${className}`;
  const wrapperCls = 'inline-block transition-transform duration-200 ease-out';
  const inner = (<><span className="relative z-10">{text}</span>{variant === 'solid' && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />}</>);

  if (href?.startsWith('/')) {
    return (
      <div className={wrapperCls} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}>
        <Link to={href} className={cls} ref={ref as any} onMouseMove={mm} onMouseLeave={ml}>{inner}</Link>
      </div>
    );
  }
  return (
    <div className={wrapperCls} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}>
      <a href={href || '#book'} className={cls} ref={ref} onMouseMove={mm} onMouseLeave={ml}>{inner}</a>
    </div>
  );
}

/* ═══════ DIVIDER ═══════ */
export function Divider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

/* ═══════ SECTION HEADING ═══════ */
export function SectionHead({ eyebrow, title, titleAccent, sub, vis }: {
  eyebrow: string; title: string; titleAccent?: string; sub?: string; vis: boolean;
}) {
  return (
    <div className="text-center mb-14">
      <span className={`text-[10px] tracking-[0.5em] uppercase text-white/20 transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0'}`}>{eyebrow}</span>
      <h2 className={`mt-3 font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl tracking-[0.06em] text-white/90 transition-all duration-700 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {title} {titleAccent && <span className="font-['Playfair_Display'] italic font-normal text-[0.8em] text-white/50">{titleAccent}</span>}
      </h2>
      {sub && <p className={`mt-3 text-white/25 max-w-lg mx-auto text-sm transition-all duration-700 delay-300 ${vis ? 'opacity-100' : 'opacity-0'}`}>{sub}</p>}
    </div>
  );
}

/* ═══════ NAVBAR ═══════ */
export function Navbar() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const [vis, setVis] = useState(true);
  const lastRef = useRef(0);
  const loc = useLocation();
  useEffect(() => { setVis(scrollY <= lastRef.current || scrollY < 100); lastRef.current = scrollY; }, [scrollY]);
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [loc.pathname]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Simulator', to: '/simulator' },
    { label: 'Products', to: '/products' },
    { label: 'Program', to: '/#program' },
    { label: 'Mentors', to: '/#mentors' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${vis ? '' : '-translate-y-full'} ${scrollY > 60 ? 'bg-black/95 backdrop-blur-md border-b border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-['Bebas_Neue'] text-2xl text-white tracking-[0.15em]">VERBAL CURRENCY</span>
          <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Truth Over Tactics</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {loc.pathname !== '/' && navLinks.map(l => (
            l.to.includes('#') ?
              <a key={l.label} href={l.to} className="text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-[#C41E1E] transition-colors">{l.label}</a> :
              <Link key={l.label} to={l.to} className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${loc.pathname === l.to ? 'text-white' : 'text-white/40 hover:text-[#C41E1E]'}`}>{l.label}</Link>
          ))}
          <BookBtn text="Book Your Clarity Call" size="sm" href="/contact" />
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5 p-2">
          <span className={`w-6 h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>
      <div className={`lg:hidden overflow-hidden transition-all duration-400 bg-black/98 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 py-6 flex flex-col gap-4">
          {loc.pathname !== '/' && navLinks.map(l => (
            l.to.includes('#') ?
              <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-white/50">{l.label}</a> :
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-white/50 hover:text-white">{l.label}</Link>
          ))}
          <BookBtn text="Book Your Clarity Call" size="sm" href="/contact" className="text-center mt-2" />
        </div>
      </div>
    </nav>
  );
}

/* ═══════ FOOTER ═══════ */
export function Footer() {
  const vikhyat = '/images/vikhyat.jpg';
  return (
    <footer className="bg-black border-t border-white/[0.04] py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-4 gap-10">
          <div>
            <div className="font-['Bebas_Neue'] text-2xl tracking-[0.15em] text-white/80">VERBAL CURRENCY</div>
            <div className="text-[9px] tracking-[0.4em] text-white/20 uppercase mt-0.5">Truth Over Tactics</div>
            <p className="mt-3 text-white/15 text-sm leading-relaxed">Sales & communication mastery rooted in freedom.</p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3">Pages</h4>
            {[{ l: 'Home', t: '/' }, { l: 'About', t: '/about' }, { l: 'Simulator', t: '/simulator' }, { l: 'Products', t: '/products' }, { l: 'FAQ', t: '/faq' }, { l: 'Contact', t: '/contact' }].map(x =>
              <Link key={x.l} to={x.t} className="block text-sm text-white/15 hover:text-white/50 transition-colors mb-1.5">{x.l}</Link>
            )}
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3">Connect</h4>
            <p className="text-sm text-white/15 mb-1">truthovertactics.in</p>
            <p className="text-sm text-white/15 mb-1">@truthovertactics</p>
            <p className="text-sm text-white/15 mb-1">@verbalcurrency</p>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3">Built By</h4>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/vikhyat.v/" target="_blank" rel="noreferrer">
                <img src={vikhyat} alt="Vikhyat" className="w-10 h-10 object-cover rounded-full border border-white/10 grayscale hover:grayscale-0 transition-all duration-500" />
              </a>
              <div>
                <a href="https://www.instagram.com/vikhyat.v/" target="_blank" rel="noreferrer" className="text-sm text-white/40 font-medium hover:text-white transition-colors">Vikhyat</a>
                <p className="text-[10px] text-white/15">Tech & AI/ML Consultant</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] text-white/10 tracking-wider">© 2026 VERBAL CURRENCY. ALL RIGHTS RESERVED. TRUTH OVER TACTICS.</p>
          <p className="text-[9px] text-white/6 tracking-wider">FOR THOSE WITH THE SENSIBILITY DNA.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ PAGE LAYOUT ═══════ */
export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white/70">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

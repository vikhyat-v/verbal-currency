import { useEffect } from 'react';
import { PageLayout, SectionHead, Divider } from '../components/Shared';

export default function Products() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <PageLayout>
            <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />

                <SectionHead eyebrow="Next Generation" title="TECH & AI/ML PRODUCTS" titleAccent="" vis={true} />
                <p className="-mt-6 mb-16 font-['Cormorant_Garamond'] italic text-2xl text-white/40 max-w-2xl mx-auto">
                    Consultation & Custom Architecture.
                </p>

                <div className="relative max-w-lg mx-auto p-1 border border-white/10 bg-white/5 backdrop-blur-sm group">
                    <div className="absolute inset-0 border border-white/20 animate-pulse pointer-events-none group-hover:border-[#C41E1E]/50 transition-colors duration-1000" />
                    <div className="bg-[#050505] p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C41E1E]/50 to-transparent opacity-50" />

                        <span className="font-['Bebas_Neue'] text-5xl sm:text-7xl text-white tracking-[0.15em] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">COMING SOON</span>

                        <p className="mt-8 font-mono text-xs tracking-widest uppercase text-white/40 leading-loose">
                            High-leverage artificial intelligence systems, custom internal tooling, and elite technical architectures are being forged.
                        </p>

                        <div className="mt-12 w-16 h-px bg-white/10 mx-auto" />

                        <p className="mt-8 text-[10px] text-[#C41E1E] tracking-[0.4em] uppercase animate-pulse duration-1000">
                            [ Deployment Pending ]
                        </p>
                    </div>
                </div>
            </section>

            <div className="my-10"><Divider /></div>

            <section className="py-24 max-w-4xl mx-auto px-6 text-center">
                <span className="text-[10px] tracking-widest text-white/30 uppercase">Enterprise Only</span>
                <h2 className="font-['Playfair_Display'] italic text-3xl sm:text-4xl text-white mt-4 mb-8">Looking to automate your sales or operations right now?</h2>
                <p className="text-white/50 text-sm max-w-xl mx-auto mb-12 leading-relaxed">
                    While public products are under construction, Vikhyat is available for private Tech & AI/ML Consultation to build bespoke conversational agents, scalable CRM pipelines, and custom web applications.
                </p>
                <a href="https://www.instagram.com/vikhyat.v/" target="_blank" rel="noreferrer" className="inline-block border border-white/20 text-white/80 py-4 px-8 uppercase tracking-[0.2em] text-xs hover:border-white hover:text-black hover:bg-white transition-all duration-300">
                    DM to Discuss Scope ↗
                </a>
            </section>
        </PageLayout>
    );
}

import { PageLayout } from '../components/Shared';

export default function Testing() {
  const versions = [...Array.from({ length: 14 }, (_, i) => `version-${i + 1}`), 'normal'];

  return (
    <PageLayout>
      <section className="py-32 bg-[#050505] min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white tracking-[0.05em] uppercase mb-4">
            Testing Pages
          </h1>
          <p className="text-white/40 text-sm mb-12">
            Standalone variations for testing purposes.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {versions.map((v) => (
              <a 
                key={v}
                href={`/testing-pages/${v}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-white/10 bg-[#050505]/80 backdrop-blur-md p-8 transition-all duration-500 hover:border-[#C41E1E]/50 flex flex-col items-center justify-center text-center h-[200px]"
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C41E1E]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C41E1E]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <h3 className="font-['Playfair_Display'] text-2xl text-white/90 group-hover:text-white transition-colors capitalize">
                  {v.replace('-', ' ')}
                </h3>
                <span className="mt-4 text-[10px] tracking-[0.3em] uppercase text-[#C41E1E] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Page →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

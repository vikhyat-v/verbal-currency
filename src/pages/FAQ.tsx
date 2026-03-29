import { Disclosure } from '@headlessui/react';
import { PageLayout, FogCanvas, BookBtn, useInView } from '../components/Shared';

const faqs = [
  {
    cat: 'About the Program', qs: [
      { q: 'Is this just another sales course?', a: "No. This is anti-course. We don't teach scripts or 10-step formulas. We give you freedom to access the skills you already possess. The goal of our structure is to make you free of that structure." },
      { q: 'What is Verbal Currency exactly?', a: "Verbal Currency is the idea that your words, voice, and presence are currency. The program combines Rishab's inner-game sales philosophy (Truth Over Tactics) with Brian's vocal and communication mastery. It's a complete transformation of how you sell and communicate." },
      { q: 'How is this different from other sales training?', a: "Most training teaches you what to say. We teach you how to be free enough that the right thing comes naturally. We don't add more tactics to your toolkit — we remove the barriers that prevent you from accessing what you already know." },
      { q: 'Is this only for salespeople?', a: "No. Anyone who communicates for a living benefits — founders, consultants, coaches, managers, therapists, speakers. If you need to connect with people and move them to action, this is for you." },
    ]
  },
  {
    cat: 'Investment & Logistics', qs: [
      { q: 'What makes this worth ₹1,50,000?', a: "We sell liberation from dependency on tactics. One breakthrough on a high-ticket call returns this 10x. This is not a weekend workshop — it's a permanent upgrade to how you show up in every conversation." },
      { q: 'Are there payment plans?', a: 'Yes. Structured payment options are shared after your application is reviewed and accepted.' },
      { q: 'How is the program delivered?', a: 'Live cohort sessions with Rishab and Brian, recorded for replay. Includes 1-on-1 hot seat coaching, vocal mastery workshops, and lifetime community access. We work with small cohorts (max 20) to maintain depth.' },
      { q: 'How long is the program?', a: 'The core program runs over 10 weeks, one module per week. But the community, recordings, and support are lifetime.' },
    ]
  },
  {
    cat: 'Fit & Expectations', qs: [
      { q: "What if it doesn't work for me?", a: "Rishab says it openly: 'Probably it will not help you.' If you don't have the sensibility DNA — the latent understanding that something deeper drives sales — no course will help. But if you do, we give you the ambience no one else can." },
      { q: 'Do I need any prerequisites?', a: 'For the communication modules, a minimum CEFR A2/B1 level in English is recommended. For the sales philosophy modules, the only prerequisite is openness to unlearning what you think you know.' },
      { q: 'I already have 10+ years of experience. Is this too basic?', a: "The opposite. The more experience you have, the more identity and tactics you've accumulated. This program strips that away. Senior professionals often have the biggest breakthroughs because they have the most to let go of." },
      { q: 'Can my company sponsor multiple seats?', a: 'Yes. Reach out through the contact page for corporate cohort pricing.' },
    ]
  },
];

export default function FAQPage() {
  const [ref, vis] = useInView(0.05);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <FogCanvas opacity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-[1]" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 border border-white/10 px-5 py-2 inline-block mb-8">FAQ</span>
          <h1 className="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-[0.04em] text-white">
            EVERY QUESTION. <span className="font-['Playfair_Display'] italic font-normal text-[0.85em] text-white/50">ANSWERED.</span>
          </h1>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 sm:py-28 bg-[#050505]">
        <div ref={ref} className="max-w-3xl mx-auto px-6">
          {faqs.map((section, si) => (
            <div key={si} className="mb-16">
              <h2 className={`font-['Bebas_Neue'] text-2xl tracking-[0.1em] text-white/60 mb-6 transition-all duration-700 ${vis ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${si * 200}ms` }}>
                {section.cat}
              </h2>
              <div className="space-y-2">
                {section.qs.map((faq, i) => (
                  <Disclosure key={i}>
                    {({ open }) => (
                      <div className={`border border-white/[0.04] transition-all duration-500 hover:border-white/8 ${open ? 'border-white/10 bg-white/[0.01]' : ''}
                        ${vis ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${si * 200 + i * 80}ms` }}>
                        <Disclosure.Button className="w-full px-5 py-4 flex items-center justify-between text-left">
                          <span className="text-white/50 text-sm pr-4">{faq.q}</span>
                          <span className={`text-white/30 text-lg transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-5 pb-4">
                          <div className="w-6 h-px bg-white/10 mb-3" />
                          <p className="text-white/25 text-sm leading-relaxed">{faq.a}</p>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div className="text-center mt-12">
            <p className="text-white/20 text-sm mb-4">Still have questions?</p>
            <BookBtn text="Get in Touch" href="/contact" />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

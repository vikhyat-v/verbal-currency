import { useState, useEffect } from 'react';
import { PageLayout, SectionHead, Divider } from '../components/Shared';

/* ═══ 1. SENSIBILITY QUIZ ═══ */
function SensibilityQuiz() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "A prospect says they need to talk to their partner. You:", a: [
                { t: "Push for a small deposit to secure commitment.", s: 0 },
                { t: "Agree, validate, and ask what the partner usually focuses on.", s: 10 },
                { t: "Tell them to take their time.", s: 5 }
            ]
        },
        {
            q: "You give the price (₹1,50,000) and the prospect goes dead silent. You:", a: [
                { t: "Immediately explain payment plans.", s: 0 },
                { t: "Ask, 'Is that out of your budget?'", s: 5 },
                { t: "Hold the silence until they speak.", s: 10 }
            ]
        },
        {
            q: "They say: 'I found a cheaper alternative.' You:", a: [
                { t: "Defend your ROI and list your features.", s: 0 },
                { t: "Ask, 'Why haven't you gone with them yet?'", s: 10 },
                { t: "Offer to match the price.", s: 0 }
            ]
        }
    ];

    const handleRes = (pts: number) => {
        setScore(s => s + pts);
        setStep(s => s + 1);
    };

    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-3xl mx-auto px-6">
                <SectionHead eyebrow="Game 1" title="SENSIBILITY ASSESSMENT" vis={true} />
                <div className="border border-white/10 bg-black p-8 sm:p-12 relative overflow-hidden">
                    {step < questions.length ? (
                        <div className="animate-fadeIn">
                            <span className="text-[10px] tracking-widest text-[#C41E1E] uppercase">Scenario {step + 1}</span>
                            <h3 className="font-['Playfair_Display'] text-2xl text-white/90 mt-4 mb-8">{questions[step].q}</h3>
                            <div className="space-y-3">
                                {questions[step].a.map((opt, i) => (
                                    <button key={i} onClick={() => handleRes(opt.s)} className="block w-full text-left p-4 border border-white/5 bg-white/[0.02] hover:bg-white/10 hover:border-white/20 transition-all text-sm text-white/70">
                                        {opt.t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-fadeIn">
                            <span className="text-[10px] tracking-widest text-white/50 uppercase">Your Freedom Score</span>
                            <div className="font-['Bebas_Neue'] text-6xl text-white mt-4">{Math.round((score / 30) * 100)}%</div>
                            <p className="mt-4 text-white/40 text-sm max-w-sm mx-auto">
                                {score === 30 ? "Perfect Truth Seeker. You possess the sensibility DNA." : score >= 15 ? "You're getting there, but tactical habits remain." : "Tactician. You need to let go to win."}
                            </p>
                            <button onClick={() => { setStep(0); setScore(0); }} className="mt-8 text-[10px] uppercase tracking-widest text-white/30 hover:text-white">Restart Assessment ↺</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-20"><Divider /></div>
        </section>
    );
}

/* ═══ 2. SILENCE RESTRAINT GAME ═══ */
function SilenceGame() {
    const [time, setTime] = useState(7);
    const [status, setStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');

    useEffect(() => {
        if (status !== 'playing') return;

        // Mouse movement failure logic
        let prevX = 0, prevY = 0, dist = 0;
        const thresh = 100; // pixels of movement allowed
        const startMm = (e: MouseEvent) => { prevX = e.clientX; prevY = e.clientY; };
        const onMm = (e: MouseEvent) => {
            dist += Math.abs(e.clientX - prevX) + Math.abs(e.clientY - prevY);
            prevX = e.clientX; prevY = e.clientY;
            if (dist > thresh) setStatus('lost');
        };

        document.addEventListener('mouseenter', startMm);
        document.addEventListener('mousemove', onMm);

        // Timer victory logic
        const iv = setInterval(() => {
            setTime(t => {
                if (t <= 1) { setStatus('won'); return 0; }
                return t - 1;
            });
        }, 1000);

        return () => {
            document.removeEventListener('mouseenter', startMm);
            document.removeEventListener('mousemove', onMm);
            clearInterval(iv);
        };
    }, [status]);

    return (
        <section className="py-24 bg-[#080808]">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <SectionHead eyebrow="Game 2" title="THE SILENCE RESTRAINT" vis={true} />
                <p className="text-sm text-white/40 mb-10 max-w-lg mx-auto">
                    "The price is ₹1,50,000."<br />Now hold the silence. If you move your mouse or click before 7 seconds, you broke the frame.
                </p>

                {status === 'idle' && (
                    <button onClick={() => { setStatus('playing'); setTime(7); }} className="bg-white text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-gray-300 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Drop the Price
                    </button>
                )}

                {status === 'playing' && (
                    <div className="w-32 h-32 mx-auto border-2 border-[#C41E1E] rounded-full flex items-center justify-center animate-pulse">
                        <span className="font-['Bebas_Neue'] text-5xl text-white">{time}</span>
                    </div>
                )}

                {(status === 'won' || status === 'lost') && (
                    <div className="animate-fadeIn">
                        <div className={`font-['Bebas_Neue'] text-5xl ${status === 'won' ? 'text-white' : 'text-[#C41E1E]'}`}>
                            {status === 'won' ? 'SILENCE HELD.' : 'YOU CRACKED.'}
                        </div>
                        <p className="text-sm text-white/30 mt-4 max-w-sm mx-auto">
                            {status === 'won' ? "You let them process. Freedom creates trust." : "You got nervous and filled the void. You lost the frame."}
                        </p>
                        <button onClick={() => setStatus('idle')} className="mt-8 text-[10px] uppercase tracking-widest text-white/30 hover:text-white">Try Again ↺</button>
                    </div>
                )}
            </div>
            <div className="mt-20"><Divider /></div>
        </section>
    );
}

/* ═══ 3. PITCH DECONSTRUCTION ═══ */
function PitchDeconstruction() {
    const [found, setFound] = useState<number[]>([]);
    const words = [
        { t: "Hey there,", f: false },
        { t: "just following up", f: true, tip: "Needy. Shows you're chasing." },
        { t: "on the proposal I sent.", f: false },
        { t: "To be honest,", f: true, tip: "Implies you weren't honest before." },
        { t: "I'd love to jump on a quick call.", f: false },
        { t: "I can offer a 10% discount", f: true, tip: "Destroyed your margin instantly out of fear." },
        { t: "if you sign today.", f: false }
    ];

    const handle = (w: any, i: number) => {
        if (w.f && !found.includes(i)) setFound([...found, i]);
    };

    const won = found.length === 3;

    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHead eyebrow="Game 3" title="PITCH DECONSTRUCTION" vis={true} />
                <p className="text-center text-sm text-white/40 mb-10 max-w-md mx-auto">
                    Find and click the 3 "desperate" trigger phrases hidden inside this email pitch.
                </p>

                <div className={`cursor-default p-8 sm:p-12 border ${won ? 'border-white/30 bg-black' : 'border-white/5 bg-white/[0.02]'} transition-all duration-700 font-['Cormorant_Garamond'] text-2xl leading-relaxed`}>
                    {words.map((w, i) => (
                        <span key={i} onClick={() => handle(w, i)} className={`mr-2 px-1 rounded transition-all duration-300 ${w.f && found.includes(i) ? 'bg-[#C41E1E]/20 text-[#C41E1E] line-through decoration-[#C41E1E]' : w.f ? 'cursor-pointer hover:bg-white/10' : ''}`}>
                            {w.t}
                        </span>
                    ))}
                </div>

                <div className="mt-8 min-h-[40px] text-center">
                    {won && <span className="text-[10px] tracking-widest text-white/60 uppercase animate-fadeIn">Excellent. You spot the desperation.</span>}
                </div>
            </div>
            <div className="mt-20"><Divider /></div>
        </section>
    );
}

/* ═══ 4. OBJECTION ALCHEMY (ENDLESS DECK) ═══ */
function ObjectionAlchemy() {
    const objections = [
        { obj: "I need to speak to my co-founder.", truth: "Agree. 'Makes sense. Are they generally on board with this direction?'" },
        { obj: "Can you guarantee results?", truth: "Detach. 'No. I guarantee the system, but I can't guarantee your execution.'" },
        { obj: "It's not the right time.", truth: "Clarify. 'Fair enough. Is it a timing issue, or are you just not sold on this yet?'" }
    ];
    return (
        <section className="py-24 bg-[#080808]">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <SectionHead eyebrow="Game 4" title="OBJECTION ALCHEMY" vis={true} />
                <div className="grid md:grid-cols-3 gap-6 text-left">
                    {objections.map((c, i) => (
                        <div key={i} className="group perspective-1000 h-[250px]">
                            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                                <div className="absolute inset-0 backface-hidden border border-white/[0.05] bg-black/50 p-6 flex flex-col justify-center text-center cursor-pointer">
                                    <h3 className="font-['Playfair_Display'] italic text-xl text-white/90">"{c.obj}"</h3>
                                    <div className="mt-6 text-[9px] tracking-widest uppercase text-white/20">Hover to reveal Truth</div>
                                </div>
                                <div className="absolute inset-0 backface-hidden rotate-y-180 border border-[#C41E1E]/20 bg-[#0a0a0a] p-6 flex flex-col justify-center">
                                    <span className="text-[10px] tracking-widest uppercase text-white/50 mb-3">The Truth</span>
                                    <p className="text-sm text-white/80 leading-relaxed font-medium">{c.truth}</p>
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

/* ═══ 5. DIAGNOSIS SIMULATOR ═══ */
function DiagnosisSimulator() {
    const [log, setLog] = useState<{ agent: string, text: string }[]>([{ agent: 'Prospect', text: 'We just need more leads right now.' }]);
    const [options, setOptions] = useState([
        { t: 'We can generate 200 leads a month for you.', nxt: 'C1' },
        { t: 'Why do you feel leads are the bottleneck?', nxt: 'T1' }
    ]);
    const [done, setDone] = useState(false);

    const act = (opt: any) => {
        const newLog = [...log, { agent: 'You', text: opt.t }];

        if (opt.nxt === 'C1') {
            newLog.push({ agent: 'System', text: '[Trust Damaged: You pitched without diagnosing. Prospect lost interest.]' });
            setOptions([]); setDone(true);
        } else if (opt.nxt === 'T1') {
            newLog.push({ agent: 'Prospect', text: 'Well, our current leads aren\'t converting.' });
            setOptions([
                { t: 'Our leads are much higher quality. Want to see pricing?', nxt: 'C2' },
                { t: 'So it\'s a conversion problem, not a volume problem. Tell me about your sales process.', nxt: 'T2' }
            ]);
        } else if (opt.nxt === 'C2') {
            newLog.push({ agent: 'System', text: '[Trust Damaged: You ignored their true pain and went for the close. Deal lost.]' });
            setOptions([]); setDone(true);
        } else if (opt.nxt === 'T2') {
            newLog.push({ agent: 'Prospect', text: 'Honestly, I think my sales team just lacks confidence on the phone...' });
            newLog.push({ agent: 'System', text: '[Deep Diagnosis Achieved: They trust you. You now control the frame.]' });
            setOptions([]); setDone(true);
        }
        setLog(newLog);
    };

    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-2xl mx-auto px-6">
                <SectionHead eyebrow="Game 5" title="THE DIAGNOSIS SIMULATOR" vis={true} />
                <div className="border border-white/5 bg-black p-6 sm:p-10 font-mono text-sm max-w-xl mx-auto shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5" />
                    <div className="space-y-6 mb-8">
                        {log.map((l, i) => (
                            <div key={i} className={`flex flex-col gap-1 ${l.agent === 'You' ? 'text-white/60 items-end' : l.agent === 'System' ? 'text-[#C41E1E] text-center italic py-4' : 'text-white items-start'}`}>
                                {l.agent !== 'System' && <span className="text-[10px] tracking-widest text-white/20 uppercase">{l.agent}</span>}
                                <span className={l.agent === 'System' ? 'text-xs uppercase tracking-wider' : ''}>{l.text}</span>
                            </div>
                        ))}
                    </div>
                    {!done ? (
                        <div className="space-y-3 pt-6 border-t border-white/10">
                            {options.map((o, i) => (
                                <button key={i} onClick={() => act(o)} className="block w-full text-left p-4 bg-white/[0.03] hover:bg-white/10 text-white/50 hover:text-white transition-all text-xs focus:outline-none">
                                    &gt; {o.t}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="pt-6 border-t border-white/10 text-center">
                            <span className="text-white/40 tracking-widest uppercase text-[10px]">Simulation Concluded.</span>
                            <button onClick={() => { setLog([{ agent: 'Prospect', text: 'We just need more leads right now.' }]); setOptions([{ t: 'We can generate 200 leads a month for you.', nxt: 'C1' }, { t: 'Why do you feel leads are the bottleneck?', nxt: 'T1' }]); setDone(false); }} className="block mx-auto mt-4 text-[10px] uppercase text-white/30 hover:text-white">Restart Simulation ↺</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-20"><Divider /></div>
        </section>
    );
}

/* ═══ 6. THE TONE CALIBRATOR ═══ */
function ToneCalibrator() {
    const [pick, setPick] = useState<number | null>(null);
    const opts = [
        { t: 'Defensive & Trying to Prove Value', r: false },
        { t: 'Empathetic but Detached', r: true },
        { t: 'Aggressively Closing', r: false }
    ];

    return (
        <section className="py-24 bg-[#080808]">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <SectionHead eyebrow="Game 6" title="THE TONE CALIBRATOR" vis={true} />
                <p className="text-white/40 text-sm mb-4">Read the statement and identify the underlying intent you MUST project.</p>

                <div className="my-10 p-8 sm:p-12 border border-white/10 bg-black relative max-w-lg mx-auto">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C41E1E]/50" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C41E1E]/50" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-6">Prospect: "I think we can do this cheaper in-house."</span>
                    <h3 className="font-['Cormorant_Garamond'] italic text-3xl text-white">"You might be right. What's holding you back from doing it?"</h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
                    {opts.map((o, i) => (
                        <button key={i} onClick={() => setPick(i)} className={`p-5 flex flex-col justify-center text-xs tracking-widest uppercase transition-all border ${pick === i ? (o.r ? 'bg-white/10 border-white text-white shadow-lg' : 'bg-[#C41E1E]/10 border-[#C41E1E]/50 text-white/50') : 'border-white/10 text-white/40 hover:bg-white/5 hover:text-white/70'}`}>
                            {o.t}
                        </button>
                    ))}
                </div>
                <div className="min-h-[30px] mt-8 text-center text-sm font-medium tracking-wide">
                    {pick !== null && (
                        <span className={`animate-fadeIn ${opts[pick].r ? 'text-white/80' : 'text-[#C41E1E]/80'}`}>
                            {opts[pick].r ? "Correct. Complete detachment removes their defensive barrier." : "Incorrect. If you project this tone, they will put up their guard."}
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-20"><Divider /></div>
        </section>
    );
}

/* ═══ 7. POST-CALL AUDIT ═══ */
function PostCallAudit() {
    const [s1, setS1] = useState(5);
    const [s2, setS2] = useState(5);
    const [s3, setS3] = useState(5);

    const vcs = Math.round(((s1 + s2 + s3) / 30) * 100);

    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-3xl mx-auto px-6">
                <SectionHead eyebrow="Game 7" title="POST-CALL AUDIT" vis={true} />
                <p className="text-center text-sm text-white/40 mb-16">Grade yourself on your last sales call. Be brutally honest.</p>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-10">
                        {[
                            { l: 'Detachment from Outcome', v: s1, set: setS1 },
                            { l: 'Diagnostic Listening', v: s2, set: setS2 },
                            { l: 'Vocal Resonance', v: s3, set: setS3 },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs text-white/50 uppercase tracking-widest mb-4">
                                    <span>{s.l}</span><span className="text-white">{s.v}/10</span>
                                </div>
                                <input type="range" min="0" max="10" value={s.v} onChange={(e) => s.set(parseInt(e.target.value))} className="w-full h-1 bg-white/10 appearance-none outline-none focus:outline-none cursor-pointer" />
                            </div>
                        ))}
                    </div>
                    <div className="text-center p-12 border border-white/10 bg-black/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
                        <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Your Verbal Currency Score</span>
                        <div className={`font-['Bebas_Neue'] text-8xl mt-6 mb-2 tracking-wider ${vcs > 80 ? 'text-white' : 'text-white/40'}`}>{vcs}</div>
                        <p className="text-[11px] text-[#C41E1E] tracking-widest uppercase mt-4 animate-pulse duration-1000">
                            {vcs > 80 ? 'Masterful Execution' : vcs > 50 ? 'Needs Calibration' : 'Scripted & Tactical'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Simulator() {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return (
        <PageLayout>
            <section className="relative pt-32 pb-20 px-6 text-center max-w-4xl mx-auto overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                    <div className="w-[800px] h-[800px] border border-white rounded-full"></div>
                    <div className="w-[600px] h-[600px] border border-white rounded-full absolute"></div>
                </div>
                <span className="relative z-10 text-[10px] tracking-[0.5em] uppercase text-white/30 border border-white/10 px-5 py-2 inline-block">Interactive Training</span>
                <h1 className="relative z-10 mt-10 font-['Bebas_Neue'] text-6xl sm:text-8xl tracking-widest text-white leading-[0.9]">THE SIMULATOR</h1>
                <p className="relative z-10 mt-6 font-['Cormorant_Garamond'] italic text-2xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                    Seven rites of passage. Test your detachment, your vocal resonance, and your ability to diagnose under pressure.
                </p>
            </section>

            <SensibilityQuiz />
            <SilenceGame />
            <PitchDeconstruction />
            <ObjectionAlchemy />
            <DiagnosisSimulator />
            <ToneCalibrator />
            <PostCallAudit />

        </PageLayout>
    );
}

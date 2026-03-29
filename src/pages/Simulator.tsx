import { useState, useEffect, useRef } from 'react';
import { PageLayout } from '../components/Shared';

/* ═════════════════════════════════════════
   GAMES
   ═════════════════════════════════════════ */

/* ─── 1. THE CALL SIMULATOR (RPG) ─── */
function TheCallSimulator({ onExit }: { onExit: () => void }) {
    const [trust, setTrust] = useState(100);
    const [frame, setFrame] = useState(100);
    const [log, setLog] = useState<{ agent: string, text: string }[]>([]);
    const [options, setOptions] = useState<{ t: string, tr: number, fr: number, nxt: string }[]>([]);
    const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const script: Record<string, any> = {
        start: {
            text: "Yeah, so we're just looking for someone to run our ads and get us some leads. What's your pricing?",
            opts: [
                { t: "We usually charge ₹1.5L for 3 months, but I can do a discount.", tr: -40, fr: -50, nxt: "lose_pitch" },
                { t: "I can definitely help with leads. Our system generates high quality appointments.", tr: -10, fr: -20, nxt: "pitch_early" },
                { t: "Why do you feel ads are the answer right now?", tr: +10, fr: +20, nxt: "diag_1" }
            ]
        },
        lose_pitch: { text: "Look, I'm just looking for prices. Send me a proposal and I'll think about it. [Prospect HUNG UP]", end: 'lost' },
        pitch_early: {
            text: "Everyone says they have high quality appointments. Look, we have a strict budget. How much does it cost?",
            opts: [
                { t: "It depends on exactly what you need. Can I ask a few more questions?", tr: +0, fr: -10, nxt: "diag_1" },
                { t: "Our packages start at ₹50,000.", tr: -30, fr: -40, nxt: "lose_price" }
            ]
        },
        lose_price: { text: "Okay, that's way out of our budget. Thanks for your time. [Prospect HUNG UP]", end: 'lost' },
        diag_1: {
            text: "Well, our current agency is barely getting us 10 leads a month. We're starving for volume.",
            opts: [
                { t: "We can easily double that volume within 30 days.", tr: -20, fr: -10, nxt: "lose_features" },
                { t: "Is it a volume problem, or are the 10 leads just not converting?", tr: +20, fr: +10, nxt: "diag_2" }
            ]
        },
        lose_features: { text: "I've heard that pitch a hundred times. We're going to keep looking around. [Prospect HUNG UP]", end: 'lost' },
        diag_2: {
            text: "Actually, you're right... The leads we get are mostly junk. My sales guys are getting frustrated.",
            opts: [
                { t: "So your real problem isn't marketing, it's sales alignment.", tr: +20, fr: +20, nxt: "win" },
                { t: "Our leads are pre-qualified so your sales guys will love them.", tr: -20, fr: -20, nxt: "lose_pitch" }
            ]
        },
        win: { text: "Exactly... I've been saying this for months. Can you guys help fix that? [Trust Established. Frame Secured.]", end: 'won' }
    };

    useEffect(() => {
        runNode('start');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const runNode = (id: string) => {
        const node = script[id];
        setTyping(true);
        setOptions([]);
        setTimeout(() => {
            setLog(prev => [...prev, { agent: 'Prospect', text: node.text }]);
            setTyping(false);
            if (node.end) {
                setStatus(node.end);
            } else {
                setOptions(node.opts);
            }
            setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, 100);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5s typing simulation
    };

    const handleOpt = (opt: any) => {
        setLog(prev => [...prev, { agent: 'You', text: opt.t }]);
        const nt = Math.min(100, Math.max(0, trust + opt.tr));
        const nf = Math.min(100, Math.max(0, frame + opt.fr));
        setTrust(nt); setFrame(nf);
        if (nt <= 0 || nf <= 0) {
            setTimeout(() => {
                setLog(prev => [...prev, { agent: 'System', text: 'You lost control. The prospect disconnected.' }]);
                setStatus('lost');
            }, 1000);
        } else {
            runNode(opt.nxt);
        }
        setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, 100);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col sm:flex-row font-mono text-sm">
            {/* Left panel: Meters */}
            <div className="w-full sm:w-80 bg-black border-r border-white/10 p-8 flex flex-col justify-between">
                <div>
                    <button onClick={onExit} className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white mb-12 flex items-center gap-2">
                        <span>←</span> Abort Mission
                    </button>
                    <h2 className="text-xl font-bold tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Mission 01:</h2>
                    <h3 className="text-xs tracking-widest text-[#C41E1E] uppercase mt-1">Diagnosis over Prescription</h3>
                    <p className="mt-8 text-white/40 text-xs leading-relaxed">
                        Your objective: Diagnose the true pain. Do not validate their smokescreens. Do not pitch until trust is secured.
                    </p>

                    <div className="mt-12 space-y-8">
                        <div>
                            <div className="flex justify-between text-xs tracking-widest uppercase mb-2">
                                <span className="text-white/60">Trust Meter</span>
                                <span className={trust < 30 ? 'text-[#C41E1E]' : 'text-white'}>{trust}%</span>
                            </div>
                            <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                                <div className="h-full bg-white transition-all duration-500" style={{ width: `${trust}%`, backgroundColor: trust < 30 ? '#C41E1E' : 'white' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs tracking-widest uppercase mb-2">
                                <span className="text-white/60">Frame Control</span>
                                <span className={frame < 30 ? 'text-[#C41E1E]' : 'text-white'}>{frame}%</span>
                            </div>
                            <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                                <div className="h-full bg-white transition-all duration-500" style={{ width: `${frame}%`, backgroundColor: frame < 30 ? '#C41E1E' : 'white' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel: Chat */}
            <div className="flex-1 flex flex-col h-full bg-[#080808] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
                <div ref={scrollRef} className="flex-1 p-8 sm:p-12 overflow-y-auto space-y-8 scroll-smooth pb-40">
                    {log.map((l, i) => (
                        <div key={i} className={`flex flex-col max-w-2xl ${l.agent === 'You' ? 'ml-auto items-end text-white/50' : l.agent === 'System' ? 'mx-auto items-center text-[#C41E1E] my-10' : 'items-start text-white/90'}`}>
                            {l.agent !== 'System' && <span className="text-[9px] tracking-[0.2em] uppercase mb-1 opacity-50">{l.agent}</span>}
                            <div className={`p-4 ${l.agent === 'You' ? 'bg-white/[0.03] border border-white/5' : l.agent === 'System' ? 'bg-transparent text-center tracking-widest uppercase text-xs' : 'bg-white/10 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]'}`}>
                                {l.text}
                            </div>
                        </div>
                    ))}
                    {typing && (
                        <div className="flex items-start">
                            <span className="text-[9px] tracking-[0.2em] uppercase mb-1 opacity-50 mr-4">Prospect</span>
                            <div className="p-4 bg-white/5 border border-white/10 flex gap-2 w-16 items-center justify-center">
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 sm:p-8 bg-[#0a0a0a] border-t border-white/5">
                    {status === 'playing' ? (
                        <div className="space-y-3 max-w-3xl mx-auto">
                            {!typing && options.map((o, i) => (
                                <button key={i} onClick={() => handleOpt(o)} className="block w-full text-left p-4 bg-black border border-white/10 text-white/70 hover:bg-white hover:text-black hover:border-white transition-all text-xs tracking-wide">
                                    {'>'} {o.t}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className={`font-['Bebas_Neue'] text-5xl tracking-widest ${status === 'won' ? 'text-white' : 'text-[#C41E1E]'}`}>
                                {status === 'won' ? 'MISSION SUCCESS' : 'MISSION FAILED'}
                            </h2>
                            <button onClick={() => { setTrust(100); setFrame(100); setLog([]); setStatus('playing'); runNode('start'); }} className="mt-6 text-[10px] tracking-widest uppercase text-white/40 hover:text-white border border-white/20 px-6 py-2">
                                Restart Simulation
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── 2. THE SILENCE CHAMBER ─── */
function TheSilenceChamber({ onExit }: { onExit: () => void }) {
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [lost, setLost] = useState(false);
    const [won, setWon] = useState(false);
    const requiredTime = 15;

    useEffect(() => {
        if (!playing || won || lost) return;

        let prevX = -1, prevY = -1, dist = 0;
        const limit = 250; // threshold for movement

        const onMm = (e: MouseEvent) => {
            if (prevX === -1) { prevX = e.clientX; prevY = e.clientY; return; }
            dist += Math.abs(e.clientX - prevX) + Math.abs(e.clientY - prevY);
            prevX = e.clientX; prevY = e.clientY;
            if (dist > limit) setLost(true);
        };
        const onClick = () => setLost(true);

        document.addEventListener('mousemove', onMm);
        document.addEventListener('mousedown', onClick);

        const iv = setInterval(() => {
            setTime(t => {
                if (t >= requiredTime - 1) { setWon(true); return requiredTime; }
                return t + 1;
            });
        }, 1000);

        return () => {
            document.removeEventListener('mousemove', onMm);
            document.removeEventListener('mousedown', onClick);
            clearInterval(iv);
        };
    }, [playing, won, lost]);

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-1000 ${lost ? 'bg-[#900000]' : won ? 'bg-[#050505]' : playing ? 'bg-black' : 'bg-[#0a0a0a]'}`}>
            <button onClick={onExit} className={`absolute top-8 left-8 text-[10px] tracking-widest uppercase transition-opacity ${playing && !won && !lost ? 'opacity-0 pointer-events-none' : 'opacity-100 text-white/40 hover:text-white'}`}>
                ← Abort Mission
            </button>

            <div className="text-center pointer-events-none relative z-10 w-full px-6">
                {!playing && !lost && !won && (
                    <div className="animate-fadeIn">
                        <h2 className="font-['Bebas_Neue'] text-7xl tracking-widest text-[#C41E1E]">THE SILENCE</h2>
                        <p className="mt-8 text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
                            When the prospect objects, anxiety will convince you to fill the void. To defend your price. To offer a discount.<br /><br />
                            A master delivers the truth, and holds frame. Can you hold completely still for 15 seconds? <br />No clicking. No erratic mouse movement. Total detachment.
                        </p>
                        <button onClick={() => setPlaying(true)} className="mt-12 bg-white text-black px-12 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-300 transition-all pointer-events-auto">
                            Initiate
                        </button>
                    </div>
                )}

                {playing && !lost && !won && (
                    <div className="animate-breathe">
                        <span className="text-[#C41E1E] tracking-widest uppercase text-[10px] block mb-6">Prospect: "That's a lot of money."</span>
                        <div className="font-['Playfair_Display'] italic text-4xl sm:text-6xl text-white">
                            "It's ₹1,50,000 for the year."
                        </div>
                        <div className="mt-20 flex justify-center items-center gap-1">
                            {[...Array(requiredTime)].map((_, i) => (
                                <div key={i} className={`h-1 w-8 transition-colors duration-500 ${i < time ? 'bg-white' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <p className="mt-12 text-[#C41E1E]/50 uppercase tracking-[0.4em] text-[10px] animate-pulse">
                            Hold Your Frame. Do Not Move.
                        </p>
                    </div>
                )}

                {lost && (
                    <div className="animate-scaleIn pointer-events-auto">
                        <h2 className="font-['Bebas_Neue'] text-8xl tracking-widest text-black drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">FRAME BROKEN</h2>
                        <p className="mt-6 text-black/80 font-bold uppercase tracking-widest text-sm">You panicked and filled the void.</p>
                        <button onClick={() => { setPlaying(false); setTime(0); setLost(false); }} className="mt-12 border border-black text-black px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-[#900000] transition-colors">
                            Restart
                        </button>
                    </div>
                )}

                {won && (
                    <div className="animate-fadeIn pointer-events-auto">
                        <h2 className="font-['Bebas_Neue'] text-7xl tracking-widest text-white shadow-white">SILENCE NEGOTIATED</h2>
                        <p className="mt-6 text-white/50 uppercase tracking-widest text-sm max-w-sm mx-auto">
                            The prospect processed the reality. You let them speak first. You kept your leverage.
                        </p>
                        <button onClick={onExit} className="mt-12 border border-white text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors">
                            Return to Hub
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── 3. THE RED PEN (PITCH DECONST.) ─── */
function TheRedPen({ onExit }: { onExit: () => void }) {
    const [found, setFound] = useState<number[]>([]);
    // 7 bad phrases to find
    const emailLines = [
        { t: "Hey Vikram,", bad: false, id: -1 },
        { t: "Just following up on the proposal I sent last Thursday.", bad: true, id: 0, why: "Implies you have nothing better to do. Chasing lowers status." },
        { t: "I'd love to circle back and see if you have any feedback.", bad: true, id: 1, why: "'Looping back' shows you are waiting on them. Highly needy." },
        { t: "To be completely honest with you,", bad: true, id: 2, why: "Wait, so were you lying before this? Never use this filler." },
        { t: "this is exactly the solution you need to scale.", bad: false, id: -1 },
        { t: "I can even throw in a 15% discount if we sign by Friday.", bad: true, id: 3, why: "Discounting without being asked instantly destroys your value." },
        { t: "Does that make sense?", bad: true, id: 4, why: "Subconsciously seeking validation and approval." },
        { t: "If not, I completely understand and don't want to be a bother.", bad: true, id: 5, why: "Apologizing for your own existence. Devastating to your frame." },
        { t: "Just let me know your thoughts.", bad: false, id: -1 },
        { t: "Looking forward to hearing from you!", bad: true, id: 6, why: "A generic, hopeful close is entirely dependent on outcome." }
    ];

    const handleClick = (w: any) => {
        if (w.bad && !found.includes(w.id)) setFound(p => [...p, w.id]);
    };

    const won = found.length === 7;

    return (
        <div className="fixed inset-0 z-[100] bg-[#111] flex flex-col items-center justify-center p-6 text-left">
            <button onClick={onExit} className="absolute top-8 left-8 text-[10px] tracking-widest uppercase text-white/40 hover:text-white">
                ← Abort Mission
            </button>

            <div className="w-full max-w-4xl bg-[#fff] text-[#222] rounded shadow-2xl overflow-hidden font-sans">
                {/* Email Header */}
                <div className="bg-[#f5f5f5] border-b border-[#ddd] p-6 flex flex-col gap-3">
                    <div className="flex gap-2 items-center text-sm">
                        <span className="font-semibold text-gray-400 w-16">From:</span>
                        <span>you@yourbusiness.com</span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        <span className="font-semibold text-gray-400 w-16">To:</span>
                        <span>vikram.sales@enterprise.io</span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                        <span className="font-semibold text-gray-400 w-16">Subject:</span>
                        <span className="font-bold">Following up on our call</span>
                    </div>
                </div>

                {/* Email Body */}
                <div className="p-8 sm:p-12 text-lg leading-loose">
                    {won && <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 text-sm font-bold uppercase tracking-widest rounded text-center">Audit Complete. Frame Protected.</div>}
                    <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-bold">Mission: Click to redline the 7 desperate phrases.</p>
                    <div className="space-y-4">
                        <p>
                            {emailLines.slice(0, 1).map((l, i) => <span key={i}>{l.t} </span>)}<br />
                            {emailLines.slice(1, 3).map((l, i) => (
                                <span key={i} onClick={() => handleClick(l)} className={`cursor-pointer transition-colors px-1 rounded ${found.includes(l.id) ? 'bg-red-100 text-red-600 line-through decoration-2 decoration-red-600' : 'hover:bg-gray-100'}`}>{l.t} </span>
                            ))}
                        </p>
                        <p>
                            {emailLines.slice(3, 5).map((l, i) => (
                                <span key={i} onClick={() => handleClick(l)} className={`cursor-pointer transition-colors px-1 rounded ${found.includes(l.id) ? 'bg-red-100 text-red-600 line-through decoration-2 decoration-red-600' : 'hover:bg-gray-100'}`}>{l.t} </span>
                            ))}
                        </p>
                        <p>
                            {emailLines.slice(5, 8).map((l, i) => (
                                <span key={i} onClick={() => handleClick(l)} className={`cursor-pointer transition-colors px-1 rounded ${found.includes(l.id) ? 'bg-red-100 text-red-600 line-through decoration-2 decoration-red-600' : 'hover:bg-gray-100'}`}>{l.t} </span>
                            ))}
                        </p>
                        <p>
                            {emailLines.slice(8, 10).map((l, i) => (
                                <span key={i} onClick={() => handleClick(l)} className={`cursor-pointer transition-colors px-1 rounded ${found.includes(l.id) ? 'bg-red-100 text-red-600 line-through decoration-2 decoration-red-600' : 'hover:bg-gray-100'}`}>{l.t} </span>
                            ))}
                        </p>
                    </div>

                    <div className="mt-12 h-[120px]">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#C41E1E] mb-3">Redline Feedback ({found.length}/7):</h4>
                        <div className="flex flex-col gap-2 overflow-y-auto max-h-[100px] text-sm text-gray-500">
                            {found.map(fid => (
                                <div key={fid} className="flex gap-3">
                                    <span className="text-red-600 font-bold">×</span>
                                    <span>"{emailLines.find(x => x.id === fid)?.t}" — <strong>{emailLines.find(x => x.id === fid)?.why}</strong></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── 4. OBJECTION ALCHEMY (GAUNTLET) ─── */
function ObjectionGauntlet({ onExit }: { onExit: () => void }) {
    const [time, setTime] = useState(45);
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [lost, setLost] = useState(false);
    const [won, setWon] = useState(false);

    const objs = [
        { o: "I need to think about it.", r: "What specifically is holding you back?", w: ["Just let me know by Friday.", "I can offer a discount if you sign today.", "What exactly do you need to think about?"] },
        { o: "It's too expensive.", r: "Is it a budget issue or a value issue?", w: ["Let me explain the ROI again.", "We can drop the price by 10%.", "It's an investment, not a cost."] },
        { o: "Send me some more information.", r: "Happy to. What specifically are you looking to see?", w: ["Sure, I'll send a 20-page PDF.", "I really think a call is better.", "I'll shoot that over right now."] },
        { o: "We're going to use someone cheaper.", r: "Makes sense. Why haven't you hired them yet?", w: ["But they don't have our quality.", "I can match their price.", "That's a mistake, let me tell you why."] },
        { o: "I'll get back to you next month.", r: "Understood. Should I close your file for now?", w: ["Okay, I'll calendar a follow up.", "Can we just set a firm date?", "Please don't forget!"] }
    ];

    useEffect(() => {
        if (lost || won) return;
        const iv = setInterval(() => {
            setTime(t => {
                if (t <= 1) { setLost(true); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(iv);
    }, [lost, won]);

    const handlePick = (isRight: boolean) => {
        if (isRight) {
            setScore(s => s + 1);
            if (idx === objs.length - 1) setWon(true);
            else setIdx(i => i + 1);
        } else {
            setTime(t => Math.max(0, t - 5));
        }
    };

    if (lost || won) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-6">
                <h2 className={`font-['Bebas_Neue'] text-7xl tracking-widest ${won ? 'text-white' : 'text-[#C41E1E]'}`}>
                    {won ? 'GAUNTLET CLEARED' : 'TIME EXPIRED'}
                </h2>
                <p className="mt-6 text-white/50 text-sm tracking-widest uppercase">
                    {won ? `Perfect execution. 5 Objections handled in ${45 - time} seconds.` : 'You hesitated. The prospect vanished.'}
                </p>
                <button onClick={onExit} className="mt-12 text-[10px] uppercase tracking-widest text-white/40 hover:text-white border border-white/20 px-6 py-2">
                    Return to Hub
                </button>
            </div>
        );
    }

    const cur = objs[idx];
    // Shuffle options
    const opts = [{ t: cur.r, r: true }, ...cur.w.map(x => ({ t: x, r: false }))].sort(() => Math.random() - 0.5);

    return (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6">
            <button onClick={onExit} className="absolute top-8 left-8 text-[10px] tracking-widest uppercase text-white/40 hover:text-white">
                ← Abort Mission
            </button>

            <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 sm:p-12 text-center rounded-xl shadow-[0_0_50px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                    <div className="text-left">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-1">Score</span>
                        <span className="font-['Bebas_Neue'] text-3xl text-white">{score} <span className="text-white/20">/ 5</span></span>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C41E1E]/50 block mb-1">Time Limit</span>
                        <span className={`font-['Bebas_Neue'] text-4xl ${time < 10 ? 'text-[#C41E1E] animate-pulse' : 'text-white'}`}>00:{time.toString().padStart(2, '0')}</span>
                    </div>
                </div>

                <h3 className="font-['Playfair_Display'] italic text-3xl text-white mb-10">"{cur.o}"</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {opts.map((opt, i) => (
                        <button key={i} onClick={() => handlePick(opt.r)} className="p-4 bg-white/[0.02] border border-white/5 hover:border-white/30 hover:bg-white/5 transition-all text-xs tracking-wider text-white/70">
                            {opt.t}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ═════════════════════════════════════════
   THE HUB (ROOT)
   ═════════════════════════════════════════ */
export default function Simulator() {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const missions = [
        { id: 'm1', name: '01: The Diagnosis Simulator', desc: 'A 3-minute RPG text-simulator testing your ability to diagnose pain without pitching prematurely.', icon: '🎯' },
        { id: 'm2', name: '02: The Silence Chamber', desc: 'A psychological pressure test. Drop the price, hold frame, and survive 15 seconds of silence.', icon: '⬛' },
        { id: 'm3', name: '03: The Red Pen', desc: 'Audit a disastrous cold pitch. Find and red-line 7 needy triggers before they destroy value.', icon: '🖊️' },
        { id: 'm4', name: '04: Objection Gauntlet', desc: 'A rapid-fire timed survival mode against the 5 most vicious sales objections.', icon: '⏱️' }
    ];

    return (
        <>
            {active === 'm1' && <TheCallSimulator onExit={() => setActive(null)} />}
            {active === 'm2' && <TheSilenceChamber onExit={() => setActive(null)} />}
            {active === 'm3' && <TheRedPen onExit={() => setActive(null)} />}
            {active === 'm4' && <ObjectionGauntlet onExit={() => setActive(null)} />}

            <PageLayout>
                <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto overflow-hidden min-h-[80vh]">
                    {/* Background grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    <div className="relative z-10 text-center mb-16">
                        <span className="text-[10px] tracking-[0.5em] uppercase text-white/30 border border-white/10 px-6 py-2 inline-block bg-black">The Dojo</span>
                        <h1 className="mt-8 font-['Bebas_Neue'] text-6xl sm:text-8xl tracking-[0.1em] text-white">INTELLIGENCE HUB</h1>
                        <p className="mt-6 font-['Cormorant_Garamond'] italic text-2xl text-white/40 max-w-2xl mx-auto">
                            Select a mission. Each protocol requires deep focus and complete detachment from outcome.
                        </p>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-6">
                        {missions.map(m => (
                            <div key={m.id} onClick={() => setActive(m.id)} className="group relative border border-white/10 bg-black/50 p-8 sm:p-10 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/[0.02] hover:border-white/30">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C41E1E]/0 to-transparent group-hover:via-[#C41E1E] transition-all duration-1000" />
                                <div className="text-3xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{m.icon}</div>
                                <h3 className="font-['Bebas_Neue'] text-3xl tracking-widest text-white/90 group-hover:text-white transition-colors">{m.name}</h3>
                                <p className="mt-4 text-sm text-white/40 leading-relaxed font-sans">{m.desc}</p>
                                <div className="mt-8 flex items-center text-[10px] uppercase tracking-widest text-[#C41E1E] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 font-bold">
                                    Initiate Mission →
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </PageLayout>
        </>
    );
}

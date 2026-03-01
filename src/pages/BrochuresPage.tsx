// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { InteractiveBackground } from '../components/InteractiveBackground';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AppModule } from '../types';
import { ArrowLeft, Download, Eye } from 'lucide-react';

interface Brochure {
    id: string;
    title: string;
    category: string;
    description: string;
    pdfUrl: string;
    fileSize: string;
    isFeatured?: boolean;
    imageUrl?: string;
}

// Brochures metadata matched to public/brochures/pdfs/ directory
const BROCHURES: Brochure[] = [
    {
        id: 'os3-dash',
        title: 'OS³ Dash',
        category: 'Enterprise Operations',
        description: 'The modular AI operating system designed for enterprise-scale integration and real-time operational efficiency.',
        pdfUrl: '/documents/pdfs/jb3ai-dash-the-operating-system.pdf',
        fileSize: '23.8 MB',
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 'investigator-ai',
        title: 'InvestigatorAi',
        category: 'Legal & Compliance',
        description: 'Advanced forensic intelligence platform for deep-dive investigations and automated evidence synthesis.',
        pdfUrl: '/documents/pdfs/jb3ai-investigatorai-app-dash-v1.pdf',
        fileSize: '9.3 MB',
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 'shield-ai',
        title: 'ShieldAi',
        category: 'Cybersecurity Teams',
        description: 'Silent, proactive protection layering that neutralizes threats before they reach your core infrastructure.',
        pdfUrl: '/documents/pdfs/jb3ai-shieldai-silent-protection.pdf',
        fileSize: '21.5 MB',
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 'voice-grid',
        title: 'OS³ Voice Grid',
        category: 'Communications',
        description: 'Intelligent, ultra-low latency voice architecture seamlessly integrating natural language processing at the edge.',
        pdfUrl: '/documents/pdfs/jb3ai-os3-voice-grid.pdf',
        fileSize: '22.3 MB',
        imageUrl: "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: 'mindcare-ai',
        title: 'MindCareAi',
        category: 'Healthcare & Wellness',
        description: 'A sophisticated personal growth framework powered by adaptive neural networks for emotional intelligence.',
        pdfUrl: '/documents/pdfs/jb3ai-mindcareai-personal-support-and-growth.pdf',
        fileSize: '22.7 MB',
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
    },
    {
        id: 'intelligence-managed',
        title: 'Intelligence Managed',
        category: 'Managed Services',
        description: 'Discover how our fully managed intelligence services seamlessly adapt to power your most critical business operations.',
        pdfUrl: '/documents/pdfs/jb3ai-intelligence-managed.pdf',
        fileSize: '7.8 MB',
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 'consulting',
        title: 'Consulting & Accelerator',
        category: 'Innovation Leaders',
        description: 'Accelerating AI transformation through strategic roadmaps and high-impact deployment frameworks.',
        pdfUrl: '/documents/pdfs/jb3ai-consulting-and-accelerator.pdf',
        fileSize: '12.3 MB',
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 'executive-deck',
        title: 'Executive Deck',
        category: 'Strategic Partners',
        description: 'A comprehensive high-level overview of the OS³ platform capabilities for executive leadership and strategic planning.',
        pdfUrl: '/documents/pdfs/jb3ai-executive-deck-os.pdf',
        fileSize: '7.6 MB',
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 'investment-deck',
        title: 'Investment Deck',
        category: 'Qualified Investors',
        description: "A comprehensive overview of JB³Ai's trajectory, valuation, and market-disrupting technology stack.",
        pdfUrl: '/documents/pdfs/jb3ai-investment-deck-intelligence-in-motion.pdf',
        fileSize: '27.2 MB',
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 'intel-motion',
        title: 'Intelligence in Motion',
        category: 'Strategic Partners',
        description: 'A strategic profile exploring the convergence of kinetic motion and artificial intelligence.',
        pdfUrl: '/documents/pdfs/jb3ai-intelligence-info-ai.pdf',
        fileSize: '13.1 MB',
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
    }
];

interface BrochuresPageProps {
    onNavigate: (module: AppModule) => void;
}

export const BrochuresPage: React.FC<BrochuresPageProps> = ({ onNavigate }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Background Customization State
    const [bgConfig, setBgConfig] = useState({
        hue: 120,
        saturation: 70,
        density: 1.05,
        maxStroke: 5,
        forceStrength: 27,
        spacing: 17,
        magnifierRadius: 600
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const updateConfig = (key: keyof typeof bgConfig, value: number) => {
        setBgConfig(prev => ({ ...prev, [key]: value }));
    };

    const randomizeConfig = () => {
        setBgConfig({
            hue: Math.floor(Math.random() * 360),
            saturation: Math.floor(Math.random() * 50) + 50,
            density: Number((Math.random() * 0.5 + 0.5).toFixed(2)),
            maxStroke: Math.floor(Math.random() * 4) + 1,
            forceStrength: Math.floor(Math.random() * 40) + 10,
            spacing: Math.floor(Math.random() * 10) + 4,
            magnifierRadius: Math.floor(Math.random() * 200) + 200
        });
    };

    const applyPreset = (preset: 'cyber' | 'deep' | 'matrix') => {
        switch (preset) {
            case 'cyber':
                setBgConfig({ hue: 280, saturation: 100, density: 0.9, maxStroke: 3, forceStrength: 45, spacing: 5, magnifierRadius: 400 });
                break;
            case 'deep':
                setBgConfig({ hue: 220, saturation: 60, density: 0.5, maxStroke: 1.5, forceStrength: 15, spacing: 8, magnifierRadius: 300 });
                break;
            case 'matrix':
                setBgConfig({ hue: 120, saturation: 100, density: 0.95, maxStroke: 2, forceStrength: 25, spacing: 6, magnifierRadius: 350 });
                break;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-[#66FF66] selection:text-black">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <InteractiveBackground
                    hue={bgConfig.hue}
                    saturation={bgConfig.saturation}
                    density={bgConfig.density}
                    maxStroke={bgConfig.maxStroke}
                    forceStrength={bgConfig.forceStrength}
                    spacing={bgConfig.spacing}
                    magnifierRadius={bgConfig.magnifierRadius}
                />
            </div>
            <div className="noise-bg" />

            <div className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#9AA3AD] hover:text-white transition-colors uppercase">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#66FF66] group-hover:bg-[#66FF66] transition-all duration-300">
                            <ArrowLeft className="w-3 h-3 text-[#9AA3AD] group-hover:text-black transition-colors" />
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Back to OS³</span>
                    </button>
                </div>
            </div>

            <div className="relative z-10 pt-32 pb-20 flex flex-col items-center text-center">
                <h1 className="font-orbitron font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl text-white mb-4">
                    DOWNLOAD JB³Ai BROCHURES
                </h1>
                <p className="inline-block mt-4 px-4 py-2 bg-white/95 text-black text-xs tracking-[0.2em] uppercase rounded-md shadow-sm">Enterprise Intelligence Documentation</p>
            </div>

            <section className="relative z-10 -mt-10 px-6 pb-10">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto w-full glass rounded-xl p-5 md:p-6 border border-white/5 bg-black/70 backdrop-blur-xl relative overflow-hidden group hover:border-[#66FF66]/30 transition-all duration-700 shadow-xl shadow-black/30">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-4 pb-4 border-b border-white/5 relative z-10 gap-4 flex-wrap">
                            <div>
                                <h3 className="text-lg md:text-xl font-display font-light text-white mb-2">Real-time <span className="font-bold text-white">Background Tuning</span></h3>
                                <p className="text-[#9AA3AD] text-[10px] tracking-wide max-w-sm">Interact with the sliders below to modify the neural grid simulation in real-time.</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => applyPreset('cyber')} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#66FF66]/20 border border-white/10 hover:border-[#66FF66]/50 text-[9px] uppercase tracking-widest transition-all duration-300">Cyber</button>
                                <button onClick={() => applyPreset('deep')} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#66FF66]/20 border border-white/10 hover:border-[#66FF66]/50 text-[9px] uppercase tracking-widest transition-all duration-300">Deep</button>
                                <button onClick={() => applyPreset('matrix')} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#66FF66]/20 border border-white/10 hover:border-[#66FF66]/50 text-[9px] uppercase tracking-widest transition-all duration-300">Matrix</button>
                                <button onClick={randomizeConfig} className="px-3 py-1.5 rounded-full bg-[#66FF66] text-black hover:bg-white hover:scale-105 border-0 text-[9px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(102,255,102,0.3)] transition-all duration-300">Randomize</button>
                            </div>
                        </div>

                        {/* Controls Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">HUE</label><input type="range" min="0" max="360" value={bgConfig.hue} onChange={(e) => updateConfig('hue', parseInt(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" /></div>
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">SATURATION</label><input type="range" min="0" max="100" value={bgConfig.saturation} onChange={(e) => updateConfig('saturation', parseInt(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" /></div>
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">DENSITY</label><input type="range" min="0.1" max="2.0" step="0.1" value={bgConfig.density} onChange={(e) => updateConfig('density', parseFloat(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" /></div>
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">STROKE</label><input type="range" min="1" max="10" value={bgConfig.maxStroke} onChange={(e) => updateConfig('maxStroke', parseInt(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" /></div>
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">FORCE</label><input type="range" min="5" max="50" value={bgConfig.forceStrength} onChange={(e) => updateConfig('forceStrength', parseInt(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" /></div>
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">RADIUS</label><input type="range" min="50" max="1200" value={bgConfig.magnifierRadius} onChange={(e) => updateConfig('magnifierRadius', parseInt(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" /></div>
                            <div className="space-y-2 text-left"><label className="text-[9px] tracking-widest text-[#9AA3AD] block font-bold">GRID</label><input type="range" min="4" max="30" step="1" value={bgConfig.spacing} onChange={(e) => updateConfig('spacing', parseInt(e.target.value))} className="w-full accent-[#66FF66] h-1 bg-white/10 rounded-full cursor-pointer" style={{ direction: 'rtl' }} /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brochure Grid */}
            <section className={`relative z-10 py-10 border-t border-white/5 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {BROCHURES.map((brochure, idx) => (
                            <div
                                key={brochure.id}
                                className="glass rounded-3xl h-full group hover:shadow-2xl hover:shadow-[#66FF66]/10 transition-all duration-700 hover:border-[#66FF66]/40 relative overflow-hidden"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                {/* Background Image with Gradient Overlay */}
                                {brochure.imageUrl && (
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-10" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 pointer-events-none z-10" />
                                        <img
                                            src={brochure.imageUrl}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover opacity-55 md:opacity-65 contrast-110 brightness-110 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-col h-full p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                                alt="PDF"
                                                className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#66FF66] mb-1">{brochure.fileSize}</span>
                                            <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/20">Ref: {brochure.id.slice(0, 4)}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-display font-semibold mb-2 tracking-wide text-white group-hover:text-[#66FF66] transition-colors">{brochure.title}</h3>
                                    <div className="w-10 h-px bg-[#66FF66] mb-3 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                    <p className="text-white/80 leading-relaxed mb-5 flex-grow text-[11px] font-medium max-w-[95%] group-hover:text-white transition-colors duration-500">
                                        {brochure.description}
                                    </p>
                                    <div className="flex gap-2 mt-auto">
                                        <a
                                            href={brochure.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-2 flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-white/5 text-[#9AA3AD] hover:text-white"
                                        >
                                            <Eye className="w-3.5 h-3.5" /> Preview
                                        </a>
                                        <a
                                            href={brochure.pdfUrl}
                                            download
                                            className="flex-1 py-2 flex items-center justify-center gap-1.5 rounded-lg bg-[#66FF66] hover:brightness-110 text-black text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#66FF66]/10 hover:shadow-[#66FF66]/30 hover:-translate-y-1"
                                        >
                                            <Download className="w-3.5 h-3.5" /> Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="border-t border-white/5 mt-24" />

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(102, 255, 102, 0.4);
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                
                .font-display { font-family: 'Poppins', sans-serif; }
                
                .glass {
                    background: #121620;
                    border: 1px solid rgba(192, 192, 192, 0.12);
                    transition: border-color 0.3s ease, transform 0.3s ease;
                }

                .glass:hover {
                    border-color: #66FF66;
                    transform: translateY(-4px);
                }
                
                .noise-bg {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    pointer-events: none;
                    position: fixed;
                    inset: 0;
                    z-index: 50;
                }
            `}</style>
        </div>
    );
};

// Simple icon component to avoid extra imports if not needed, using Lucide for main ones
const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
);

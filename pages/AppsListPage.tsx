
import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Brain, ArrowUpRight } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { FadeIn } from '../components/ui/FadeIn';
import { SHARED_TRUST_LINE } from '../data/content';

interface AppsListPageProps {
    onNavigate: (m: AppModule) => void;
}

export const AppsListPage: React.FC<AppsListPageProps> = ({ onNavigate }) => {
    const apps = [
        { id: AppModule.INVESTIGATOR_AI, icon: <Search className="w-6 h-6" />, title: "Investigator AI", desc: "Forensic data discovery and cross-silo synthesis." },
        { id: AppModule.SHIELD_AI, icon: <ShieldAlert className="w-6 h-6" />, title: "Shield AI", desc: "Governance monitoring and automated compliance reporting." },
        { id: AppModule.MINDCARE_AI, icon: <Brain className="w-6 h-6" />, title: "MindCare AI", desc: "Cognitive load optimization and team wellness support." }
    ];

    return (
        <div className="w-full bg-[#050505] min-h-[80vh] py-32 px-10 relative overflow-hidden">
            <DashboardBackdrop opacity={0.04} />
            <div className="max-w-6xl mx-auto space-y-24 relative z-10">
                <header className="space-y-6 text-center">
                    <FadeIn>
                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">Applications</h1>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">A specialized suite of intelligent modules designed for institutional scale and precision.</p>
                    </FadeIn>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-900/40 border border-gray-900">
                    {apps.map((app, idx) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#050505] p-16 space-y-10 group cursor-pointer hover:bg-white/5 transition-all"
                            onClick={() => onNavigate(app.id)}
                        >
                            <div className="text-gray-600 group-hover:text-cyan-500 transition-colors transform group-hover:scale-110 origin-left duration-500">
                                {app.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-white uppercase tracking-[0.2em] text-sm font-bold">{app.title}</h3>
                                <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wider">{app.desc}</p>
                            </div>
                            <div className="pt-4">
                                <div className="text-cyan-500 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 group-hover:text-white transition-colors">
                                    Initialize <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <section className="pt-20 space-y-20">
                    <FadeIn className="p-16 border border-gray-900 bg-gray-900/10 space-y-8">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Module Framework Expansion</h3>
                        <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest max-w-3xl">
                            Additional modules for financial forensics, creative asset orchestration, and supply-chain intelligence are currently in briefing. Custom module development is available via the Accelerator Program.
                        </p>
                        <button onClick={() => onNavigate(AppModule.ACCELERATOR)} className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-colors">Learn more about custom development</button>
                    </FadeIn>

                    <FadeIn delay={0.2} className="text-center opacity-60">
                        <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] leading-relaxed italic max-w-2xl mx-auto">
                            {SHARED_TRUST_LINE}
                        </p>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Target, Layers, ArrowUpRight } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { CtaBlock } from '../components/ui/CtaBlock';
import { FadeIn } from '../components/ui/FadeIn';
import BrochureButton from '../src/components/BrochureButton';

interface ServicesHubPageProps {
    onNavigate: (m: AppModule) => void;
}

export const ServicesHubPage: React.FC<ServicesHubPageProps> = ({ onNavigate }) => {
    const services = [
        { id: AppModule.CONSULTING, icon: <Target className="w-6 h-6" />, title: "Strategy & Consulting", desc: "Advisory services for intelligent system design and deployment." },
        { id: AppModule.ACCELERATOR, icon: <Layers className="w-6 h-6" />, title: "Accelerator Program", desc: "High-speed development framework for custom internal extensions." }
    ];

    return (
        <div className="w-full bg-[#050505] min-h-[80vh] py-32 px-10 relative overflow-hidden">
            <DashboardBackdrop opacity={0.04} />
            <div className="max-w-6xl mx-auto space-y-24 relative z-10">
                <header className="space-y-6 text-center">
                    <FadeIn>
                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">Technical Services</h1>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">Managed services to design, deploy, and govern intelligent operating systems for institutional scale.</p>
                    </FadeIn>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-gray-900/40 border border-gray-900">
                    {services.map((svc, idx) => (
                        <motion.div
                            key={svc.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-[#050505] p-20 space-y-10 group cursor-pointer hover:bg-white/5 transition-all"
                            onClick={() => onNavigate(svc.id)}
                        >
                            <div className="text-gray-600 group-hover:text-purple-500 transition-colors transform group-hover:scale-110 origin-left duration-500">
                                {svc.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-white uppercase tracking-[0.2em] text-base font-bold">{svc.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">{svc.desc}</p>
                            </div>
                            <div className="pt-4">
                                <div className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 group-hover:text-white transition-colors">
                                    Briefing <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <section className="pt-20">
                    <FadeIn className="p-16 border border-gray-900 bg-gray-900/10 grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-6">
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm">Global Deployment Capacity</h3>
                            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
                                Our engineering team provides end-to-end deployment support across on-premise, hybrid, and private-cloud environments.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center gap-6">
                            <CtaBlock onNavigate={onNavigate} align="left" />
                            <BrochureButton k="consulting" label="Service Guide (PDF)" />
                        </div>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
};

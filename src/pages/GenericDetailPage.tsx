
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { CtaBlock } from '../components/ui/CtaBlock';
import { FadeIn } from '../components/ui/FadeIn';
import BrochureButton from '../components/BrochureButton';
import { BrochureKey } from '../content/brochures';
import { Divider } from '../components/ui/Divider';
import { PRODUCT_CONTENT, PAGE_METADATA, SHARED_TRUST_LINE } from '../data/content';

interface GenericDetailPageProps {
    module: AppModule;
    onNavigate: (m: AppModule) => void;
}

export const GenericDetailPage: React.FC<GenericDetailPageProps> = ({ module, onNavigate }) => {
    const content = PRODUCT_CONTENT[module];
    const meta = PAGE_METADATA[module] || { title: "Technical Briefing", description: "Operational details for this module are currently in preparation." };

    if (!content) {
        return (
            <div className="w-full bg-[#050505] min-h-screen relative overflow-hidden">
                <DashboardBackdrop />
                <div className="max-w-4xl mx-auto py-32 px-10 space-y-24 relative z-10">
                    <motion.button
                        whileHover={{ x: -5 }}
                        onClick={() => onNavigate(AppModule.HOME)}
                        className="text-[10px] text-gray-600 uppercase tracking-[0.4em] flex items-center gap-4 hover:text-white transition-colors group"
                    >
                        <ArrowRight className="w-3 h-3 rotate-180" /> Return to Terminal
                    </motion.button>

                    <FadeIn className="space-y-12">
                        <div className="w-16 h-[1px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">
                            {meta.title.split(' | ')[0]}
                        </h1>
                        <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl uppercase tracking-tight">
                            {meta.description}
                        </p>
                    </FadeIn>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-24 border-t border-gray-900">
                        <FadeIn className="space-y-8">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Operational Framework</h3>
                            <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest">
                                This module is fully integrated into the OS³ Dash unified kernel, ensuring seamless intelligence synchronization and secure data governance across all institutional silos. Deployment is verified via private neural enclave protocol.
                            </p>
                            <ul className="space-y-4 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-800" /> End-to-end Encryption</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-800" /> Identity Provider Sync</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-800" /> Zero-knowledge Architecture</li>
                            </ul>
                        </FadeIn>
                        <FadeIn className="flex flex-col justify-end pt-8">
                            <CtaBlock onNavigate={onNavigate} />
                        </FadeIn>
                    </section>

                    <section className="pt-20 border-t border-gray-900/50">
                        <FadeIn>
                            <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] leading-relaxed italic max-w-2xl">
                                {SHARED_TRUST_LINE}
                            </p>
                        </FadeIn>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#050505] min-h-screen relative overflow-hidden text-gray-400">
            <DashboardBackdrop />
            <div className="max-w-4xl mx-auto py-32 px-10 space-y-32 relative z-10">
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={() => onNavigate(AppModule.APPS_LIST)}
                    className="text-[10px] text-gray-600 uppercase tracking-[0.4em] flex items-center gap-4 hover:text-white transition-colors group"
                >
                    <ArrowRight className="w-3 h-3 rotate-180" /> Back to Applications
                </motion.button>

                <div className="space-y-16">
                    <FadeIn className="space-y-4">
                        <div className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.5em]">{content.label}</div>
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-none">
                            {content.headline}
                        </h1>
                    </FadeIn>
                    <FadeIn className="space-y-12">
                        <h2 className="section-heading text-2xl font-semibold uppercase tracking-tight leading-tight max-w-2xl">
                            {content.subheading}
                        </h2>
                        <p className="text-base md:text-lg font-light leading-relaxed max-w-3xl uppercase tracking-tight whitespace-pre-line">
                            {content.description}
                        </p>
                        <div className="pt-8">
                            {(() => {
                                let bKey: BrochureKey | undefined;
                                if (module === AppModule.MINDCARE_AI) bKey = 'mindcare';
                                if (module === AppModule.SHIELD_AI) bKey = 'shield';
                                if (module === AppModule.INVESTIGATOR_AI) bKey = 'investigator';
                                if (module === AppModule.PHONE_SYSTEM) bKey = 'voicegrid';
                                if (module === AppModule.ACCELERATOR || module === AppModule.CONSULTING) bKey = 'consulting';
                                return <BrochureButton k={bKey} />;
                            })()}
                        </div>
                    </FadeIn>
                </div>

                <Divider />

                <section className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-32 border-t border-gray-900">
                    <FadeIn className="space-y-10">
                        <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">{content.capabilitiesTitle}</h3>
                        <ul className="space-y-6 text-xs md:text-sm text-gray-400 uppercase tracking-widest leading-relaxed">
                            {content.capabilities.map((cap: string, i: number) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <span className="text-cyan-500 font-bold mt-1">&bull;</span>
                                    <span>{cap}</span>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                    <FadeIn className="space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">Who It’s For</h3>
                            <p className="text-xs md:text-sm leading-relaxed uppercase tracking-widest">
                                {content.whoItIsFor}
                            </p>
                        </div>
                        <div className="space-y-6 p-8 border border-gray-900 bg-white/5 rounded-sm">
                            <h3 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.3em]">{content.governanceLabel || "Governance Note"}</h3>
                            <p className="text-[11px] leading-relaxed uppercase tracking-widest text-gray-300">
                                {content.governanceNote}
                            </p>
                        </div>
                    </FadeIn>
                </section>

                <section className="pt-20 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <FadeIn>
                        <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em] leading-relaxed italic max-w-md">
                            {SHARED_TRUST_LINE}
                        </p>
                    </FadeIn>
                    <FadeIn className="flex flex-col gap-6 w-full md:w-auto">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onNavigate(AppModule.WORKSPACE)}
                                className="bg-white text-black text-[10px] font-bold px-10 py-4 uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all shadow-xl whitespace-nowrap"
                            >
                                {content.ctaPrimary}
                            </motion.button>

                            {(() => {
                                let bKey: BrochureKey | undefined;
                                if (module === AppModule.MINDCARE_AI) bKey = 'mindcare';
                                if (module === AppModule.SHIELD_AI) bKey = 'shield';
                                if (module === AppModule.INVESTIGATOR_AI) bKey = 'investigator';
                                if (module === AppModule.PHONE_SYSTEM) bKey = 'voicegrid';
                                if (module === AppModule.ACCELERATOR || module === AppModule.CONSULTING) bKey = 'consulting';
                                return <BrochureButton k={bKey} />;
                            })()}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate(AppModule.CONTACT)}
                            className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-colors whitespace-nowrap"
                        >
                            {content.ctaSecondary}
                        </motion.button>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
};

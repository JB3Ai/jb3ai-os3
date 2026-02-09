
import React from 'react';
import { motion } from 'framer-motion';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CtaBlock } from '../components/ui/CtaBlock';
import { CredibilityStrip } from '../components/ui/CredibilityStrip';
import { FadeIn } from '../components/ui/FadeIn';

interface AdvisoryPageProps {
    onNavigate: (m: AppModule) => void;
}

export const AdvisoryPage: React.FC<AdvisoryPageProps> = ({ onNavigate }) => {
    return (
        <div className="w-full relative overflow-hidden bg-[#050505]">
            <DashboardBackdrop opacity={0.06} />

            {/* Section 1. Advisory Hero - Full-width, Left-aligned */}
            <section className="w-full py-40 px-10 border-b border-gray-900 relative z-10">
                <div className="max-w-6xl mx-auto space-y-12">
                    <FadeIn className="space-y-6">
                        <h1 className="text-3xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
                            Consulting <br /> & Advisory
                        </h1>
                        <p className="text-sm md:text-lg text-cyan-500 font-bold tracking-[0.4em] uppercase">(The 40/40/20 Method)</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <FadeIn delay={0.1}>
                            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter uppercase leading-tight">
                                Structure <br /> <span className="text-gray-500">Before Software.</span>
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.2} className="space-y-10">
                            <p className="text-lg md:text-xl text-white font-light leading-relaxed uppercase tracking-tight">
                                We believe that AI is not the product; structure is the product. Through our 40/40/20 Systems Model, we dedicate 40% of our focus to Advisory and Design to ensure your business architecture is optimized before any technology is deployed.
                            </p>
                            <p className="text-sm md:text-base text-gray-400 uppercase tracking-[0.15em] leading-relaxed">
                                Our master tune-up service includes business diagnostics and systems alignment sessions to ensure the OS³ Dashboard and its AI Agents serve a coherent, high-performance strategy.
                            </p>

                            <div className="pt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onNavigate(AppModule.CONTACT)}
                                    className="bg-white text-black px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
                                >
                                    Book Expert Advisor
                                </motion.button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <div className="max-w-5xl mx-auto py-32 px-10 space-y-40 relative z-10">
                {/* Section 2. How Engagement Works - Standard width, Narrative paragraphs */}
                <section className="space-y-16">
                    <SectionHeader num="01" title="HOW ENGAGEMENT WORKS" />
                    <div className="max-w-3xl space-y-12">
                        <FadeIn className="space-y-8">
                            <h3 className="text-white uppercase tracking-widest text-base font-bold leading-tight">
                                Structured, Outcome-Driven, <span className="text-gray-500">and Controlled</span>
                            </h3>
                            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                                Engagements typically begin with an advisory conversation to assess suitability and scope. This is followed by a guided demonstration and a structured discovery process focused on operational reality, not theoretical use cases.
                            </p>
                            <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium">
                                Once alignment is confirmed, we define a deployment approach that may include OS³ Dash configuration, module selection, governance design, and phased rollout.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2} className="space-y-8 border-t border-gray-900 pt-12">
                            <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                                Implementations are supported by advisory oversight to ensure adoption, clarity, and long-term operational integrity.
                            </p>
                            <p className="text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-bold">
                                For organizations requiring deeper involvement, JB³Ai provides ongoing advisory, optimization, and acceleration services. This ensures the system evolves alongside the organization, rather than becoming static or misaligned over time.
                            </p>
                            <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                                No two engagements are identical. OS³ is flexible by design, but never deployed without structure.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                <section className="space-y-16">
                    <SectionHeader num="02" title="WHO IT'S FOR" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                        <FadeIn className="space-y-10">
                            <h3 className="text-white uppercase tracking-widest text-base font-bold leading-tight">
                                Organizations That Require <br /> <span className="text-gray-500">Control, Not Experiments</span>
                            </h3>
                            <p className="text-lg text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                                JB³Ai Advisory is designed for leaders and organizations operating in complex, high-trust, or high-risk environments.
                            </p>
                            <p className="text-base text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                                We work with CEOs, founders, business owners, executives, operators, IT and security leaders, legal professionals, and advisory teams.
                            </p>
                            <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium">
                                Our clients range from SMEs scaling operations to enterprises managing distributed intelligence, automation, and governance across teams or regions.
                            </p>
                            <p className="text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                                If your organization values accountability, clarity, and long-term operational resilience, advisory-led engagement ensures that technology remains a strategic asset.
                            </p>
                        </FadeIn>

                        {/* Subtle divider/neutral visual for Section 3 */}
                        <FadeIn delay={0.2} className="hidden md:flex h-full min-h-[400px] items-center justify-center border-l border-gray-900 pl-20 pointer-events-none">
                            <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-900 to-transparent opacity-50" />
                            <div className="absolute opacity-[0.03] rotate-90 whitespace-nowrap text-[6vw] font-bold uppercase tracking-[1em] text-white">
                                INTEGRITY STANDARDS
                            </div>
                        </FadeIn>
                    </div>
                </section>

                <CredibilityStrip label="OPERATING STANDARD" />

                {/* Section 5. Final CTA Block - Centered */}
                <section className="py-24 text-center space-y-20 relative z-10">
                    <FadeIn className="space-y-8">
                        <h2 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
                            Begin the <br /> <span className="text-gray-500">Advisory Conversation</span>
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium max-w-xl mx-auto">
                            Discuss your organization’s objectives, challenges, and whether OS³ is the right operational fit.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2} className="space-y-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate(AppModule.CONTACT)}
                            className="bg-white text-black px-20 py-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
                        >
                            Book Expert Advisor
                        </motion.button>
                        <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-mono leading-relaxed">
                            Sandboxed demonstrations. Advisory-led access.
                        </p>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
};

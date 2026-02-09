
import React from 'react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { SectionHeader } from '../components/ui/SectionHeader';
import { CtaBlock } from '../components/ui/CtaBlock';
import { FadeIn } from '../components/ui/FadeIn';

interface OS3DashInfoPageProps {
    onNavigate: (m: AppModule) => void;
}

export const OS3DashInfoPage: React.FC<OS3DashInfoPageProps> = ({ onNavigate }) => {
    return (
        <div className="w-full relative overflow-hidden">
            <DashboardBackdrop opacity={0.06} />
            <div className="max-w-5xl mx-auto py-32 px-10 space-y-40 text-gray-400 leading-relaxed text-sm relative z-10">
                <header className="space-y-16 pb-24 border-b border-gray-900">
                    <FadeIn className="space-y-6">
                        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">OS³ Dash</h1>
                        <p className="text-sm md:text-base text-cyan-500 font-bold tracking-[0.3em] uppercase">The governed operating system for intelligence, operations, and decision-making.</p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <FadeIn delay={0.1} className="space-y-8">
                            <p className="text-base md:text-lg text-white font-light leading-relaxed uppercase tracking-tight whitespace-pre-line">
                                OS³ Dash is the unified control layer of the JB³Ai platform. It brings intelligence systems, operational tools, and governance into a single managed environment designed for organisations operating at scale, complexity, and risk.
                                {"\n\n"}
                                Rather than deploying disconnected AI tools, OS³ Dash provides a structured operating framework where every capability runs within defined boundaries. Access is controlled, activity is auditable, and outputs remain explainable. This allows organisations to move faster without losing oversight, accountability, or trust.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.2} className="space-y-8 flex flex-col justify-end">
                            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                                “OS³ Dash is not a dashboard. It is an operating system for modern organisations that require intelligence to be reliable, defensible, and aligned with real-world governance.”
                            </p>
                        </FadeIn>
                    </div>
                </header>

                <section className="space-y-16">
                    <SectionHeader num="01" title="WHAT OS³ DASH ENABLES" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <FadeIn className="space-y-8">
                            <ul className="space-y-6 text-xs md:text-sm text-gray-400 uppercase tracking-widest leading-relaxed">
                                {[
                                    "Unified access to all JB³Ai applications and services",
                                    "Centralised governance, permissions, and audit controls",
                                    "Secure orchestration of intelligence workflows",
                                    "Clear separation between experimentation, production, and live operations",
                                    "Human-in-the-loop decision architecture by default"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <span className="text-cyan-500 font-bold mt-1">&bull;</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn delay={0.2} className="flex flex-col justify-center gap-12">
                            <div className="space-y-4">
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs">Core Architecture</h4>
                                <p className="text-[11px] leading-relaxed uppercase tracking-widest text-gray-500">
                                    OS³ Dash operates through a private unified kernel that enforces system-wide rules across all applications. Intelligence modules do not operate independently. They inherit governance, security, and access policies at the system level, ensuring consistency and control across every workflow.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                <section className="space-y-16">
                    <SectionHeader num="02" title="INTEGRATED MODULES" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: "Investigator AI", sub: "Forensic intelligence and due diligence" },
                            { title: "Shield AI", sub: "Governance, monitoring, and operational control" },
                            { title: "MindCare AI", sub: "Human sustainability and decision quality" },
                            { title: "Media Lab", sub: "Intelligence-driven content and production workflows" },
                            { title: "Communications Layer", sub: "Secure messaging and system interaction" }
                        ].map((mod, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} className="space-y-4 p-8 border border-gray-900 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs group-hover:text-cyan-400 transition-colors">{mod.title}</h4>
                                <p className="text-[10px] leading-relaxed uppercase tracking-widest text-gray-500">{mod.sub}</p>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                <section className="space-y-16 pt-24 border-t border-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                        <div className="space-y-12">
                            <SectionHeader num="03" title="DESIGNED FOR" />
                            <FadeIn>
                                <p className="text-base md:text-lg text-white font-light leading-relaxed uppercase tracking-tight">
                                    OS³ Dash is used by executives, founders, legal teams, compliance leaders, IT leadership, and organisations that require intelligence systems they can trust, explain, and defend.
                                </p>
                            </FadeIn>
                        </div>
                        <div className="space-y-12">
                            <SectionHeader num="04" title="DEMO & ACCESS" />
                            <FadeIn delay={0.1} className="space-y-8 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                                <p>
                                    The OS³ Dash demo operates within a controlled sandbox environment. No live client data is exposed. Capabilities are intentionally scoped to demonstrate system behaviour, governance enforcement, and operational flow.
                                </p>
                                <div className="pt-8">
                                    <CtaBlock
                                        onNavigate={onNavigate}
                                        align="left"
                                        type="alternative"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight } from 'lucide-react';
import { AppModule } from '../types';
import { CtaBlock } from '../components/ui/CtaBlock';
import { Divider } from '../components/ui/Divider';
import SectionVisual from '../components/sections/SectionVisual';
import { FadeIn } from '../components/ui/FadeIn';
import BrochureButton from '../src/components/BrochureButton';

interface HomePageProps {
    onNavigate: (m: AppModule) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setShouldAnimate(!prefersReducedMotion);
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section with proper layering */}
            <section className="os3-hero relative min-h-[85vh] flex flex-col items-center justify-center text-center px-10 overflow-hidden">
                <div className="hero-bg absolute inset-0 z-0 pointer-events-none">
                    {/* Background Visual Layer */}
                    {!shouldAnimate ? (
                        <img
                            src="/media/hero/os3-core-static-v2.webp"
                            className="cube-static absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                            alt="System Backdrop"
                        />
                    ) : (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            poster="/media/hero/os3-hero-still-v1.jpg"
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        >
                            <source src="/media/hero/os3-hero-motion-v1.mp4" type="video/mp4" />
                            <source src="/media/hero/os3-hero-motion-v1.webm" type="video/webm" />
                        </video>
                    )}

                    {/* Dark Overlay Layer */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(25,25,25,0.4)_0%,_rgba(5,5,5,1)_70%)] z-[5] pointer-events-none" />
                </div>

                <div className="hero-fg hero-content relative z-10 pointer-events-auto">
                    <FadeIn className="space-y-12" duration={0.8}>
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">
                            <Zap className="w-4 h-4 text-cyan-400" /> OS³ Stable v2.0
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="hero-title text-jb3-light text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] max-w-4xl mx-auto drop-shadow-2xl"
                        >
                            INTELLIGENCE <br /> MANAGED.
                        </motion.h1>
                        <p className="hero-subtitle text-jb3-coolgray text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg mt-4">
                            The central operating layer for professional teams requiring high-fidelity intelligence, security, and asset production.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 items-center pt-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate(AppModule.WORKSPACE)}
                                className="btn-primary px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
                            >
                                INITIALIZE LIVE DEMO
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate(AppModule.CONTACT)}
                                className="border border-jb3-light text-jb3-light px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-jb3-divider transition-all"
                            >
                                BOOK TECHNICAL BRIEFING
                            </motion.button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Divider />

            <div className="max-w-6xl mx-auto px-10">
                <FadeIn delay={0.2}>
                    <SectionVisual
                        videoSrc="/media/hero/os3-hero-motion-v1.mp4"
                        imageSrc="/media/hero/os3-core-static-v2.webp"
                        label="OS³ SYSTEM CORE INTEGRITY v2.0"
                    />
                </FadeIn>
            </div>

            <Divider />

            <section className="w-full py-40 flex justify-center">
                <div className="max-w-4xl w-full px-10 space-y-16">
                    <FadeIn direction="left" className="w-12 h-[1px] bg-gray-800" />
                    <FadeIn>
                        <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                            WHY OS³ EXISTS
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <FadeIn delay={0.1} className="space-y-8 text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                            <p>
                                Most businesses today operate across dozens of disconnected systems. Data lives in silos. AI tools act independently. Automation runs without shared oversight. As organisations scale, this fragmentation introduces risk, inefficiency, and loss of institutional memory.
                            </p>
                            <p className="text-white">
                                OS³ Dash exists to solve this structural problem.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.2} className="space-y-8 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                            <p>
                                Instead of adding more tools, OS³ unifies them under a governed operating layer. Intelligence is no longer scattered across apps, emails, bots, and scripts. It is centralised, auditable, and aligned with business intent.
                            </p>
                            <p className="text-gray-400">
                                This is what allows organisations to scale AI and automation safely, without chaos.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <Divider />

            <section className="w-full pb-40 flex justify-center">
                <div className="max-w-4xl w-full px-10 space-y-16">
                    <FadeIn direction="left" className="w-12 h-[1px] bg-gray-800" />
                    <FadeIn>
                        <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                            WHAT OS³ DASH REPLACES
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <FadeIn delay={0.1} className="space-y-8">
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                                OS³ Dash replaces the need for:
                            </p>
                            <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium">
                                {['Multiple unconnected dashboards', 'Standalone AI tools operating without governance', 'Manual oversight of automated workflows', 'Fragmented reporting across departments', 'Ad-hoc security and compliance controls'].map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="text-cyan-500 mt-1">&bull;</span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn delay={0.2} className="flex flex-col justify-end">
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                                Rather than stitching systems together after the fact, OS³ provides a single environment where intelligence, production, and security are coordinated from the start.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#050505] py-40 flex justify-center border-t border-gray-900/50">
                <div className="max-w-6xl w-full px-10 space-y-24">
                    <div className="space-y-6">
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                CORE CAPABILITIES
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1} className="space-y-4 max-w-3xl">
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed">
                                At the core of OS³ Dash is a unified kernel that synchronises data, intelligence, and execution across all connected modules. From this kernel, organisations can deploy and manage specialised applications without losing central control.
                            </p>
                            <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">Key Platform Capabilities</p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-900/50 border border-gray-900">
                        {[
                            {
                                title: "Unified Intelligence Kernel",
                                desc: "All AI activity, automation, and decision flows operate through a single governed layer, ensuring consistency and visibility."
                            },
                            {
                                title: "Application Modules",
                                desc: "OS³ Dash supports modular applications including Investigator AI, Shield AI, Media Lab, MindCare AI, and Phone & Voice AI systems. Each module operates independently."
                            },
                            {
                                title: "Governance and Policy Control",
                                desc: "Identity, permissions, audit trails, and risk controls are enforced at the system level, not left to individual tools."
                            },
                            {
                                title: "Real-Time Operational Visibility",
                                desc: "Executives and operators can see what is running, what decisions are being made, and where intervention is required."
                            },
                            {
                                title: "Secure Deployment Architecture",
                                desc: "Designed to support enterprise-grade security models, including encrypted environments and controlled access zones."
                            },
                            {
                                title: "Institutional Scaling",
                                desc: "Expand system capabilities via custom extensions and advisor-led enclave deployments tailored to business logic."
                            }
                        ].map((outcome, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#050505] p-12 space-y-6 hover:bg-white/[0.02] transition-all group"
                            >
                                <div className="w-8 h-[1px] bg-cyan-500/50 transition-all group-hover:w-16" />
                                <div className="space-y-4">
                                    <h3 className="text-white text-xs md:text-sm uppercase font-bold tracking-widest leading-tight">
                                        {outcome.title}
                                    </h3>
                                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                                        {outcome.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            <section className="w-full bg-[#080808] py-40 flex justify-center">
                <div className="max-w-6xl w-full px-10 space-y-24">
                    <div className="space-y-6 text-center md:text-left">
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                PRODUCTS & CAPABILITIES
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-xs text-gray-600 uppercase tracking-[0.4em] font-bold">Modular Intelligence Enclaves</p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-900/40 border border-gray-900">
                        {[
                            { id: AppModule.INVESTIGATOR_AI, title: "Investigator AI", sub: "Structured Intelligence for Complex Decisions", color: "cyan", desc: "Investigator AI is designed for organisations that need to understand complex situations quickly, accurately, and defensibly. It brings together fragmented data, documents, communications, and signals into a structured intelligence environment where analysis can be trusted." },
                            { id: AppModule.SHIELD_AI, title: "Shield AI", sub: "Active Governance & Risk Management", color: "purple", desc: "Shield AI monitors activity, enforces policy, and highlights risk before it becomes a problem. It allows organisations to deploy AI and automation with confidence, knowing that guardrails are always in place." },
                            { id: AppModule.MINDCARE_AI, title: "MindCare AI", sub: "Human-Centric Intelligence Support", color: "emerald", desc: "MindCare AI is designed to support people, not replace them. It provides structured, ethical, and human-aware assistance within the OS³ environment." }
                        ].map((prod, idx) => (
                            <motion.div
                                key={prod.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="bg-[#050505] p-16 space-y-8 group hover:bg-white/[0.03] transition-all"
                            >
                                <div className="space-y-2">
                                    <h3
                                        onClick={() => onNavigate(prod.id)}
                                        className={`text-white text-base md:text-lg uppercase font-bold tracking-widest cursor-pointer hover:text-${prod.color}-400 transition-colors`}
                                    >
                                        {prod.title}
                                    </h3>
                                    <p className={`text-[10px] text-${prod.color}-500/60 uppercase tracking-[0.2em] font-bold`}>
                                        {prod.sub}
                                    </p>
                                </div>
                                <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                                    {prod.desc}
                                </p>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <button
                                        onClick={() => onNavigate(prod.id)}
                                        className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] hover:text-white flex items-center gap-2 group-hover:gap-4 transition-all"
                                    >
                                        Access Module <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                    {(() => {
                                        const kMap: any = {
                                            [AppModule.INVESTIGATOR_AI]: 'investigator',
                                            [AppModule.SHIELD_AI]: 'shield',
                                            [AppModule.MINDCARE_AI]: 'mindcare'
                                        };
                                        return <BrochureButton k={kMap[prod.id]} label="PDF" className="px-3 py-2 text-[10px]" />;
                                    })()}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#050505] py-40 flex justify-center border-t border-gray-900/50">
                <div className="max-w-4xl w-full px-10 space-y-16 text-center">
                    <div className="flex flex-col items-center space-y-6">
                        <FadeIn direction="up" className="w-12 h-[1px] bg-gray-800" />
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                DEMONSTRATION ACCESS
                            </h2>
                        </FadeIn>
                    </div>
                    <FadeIn delay={0.1} className="space-y-10">
                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-3xl mx-auto">
                            The OS³ Demo provides a guided view of the platform’s core capabilities using sandboxed data. It illustrates how intelligence flows, how controls are applied, and how decisions are supported across the system.
                        </p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] italic">
                            Live operational access is provided by request and subject to advisory review.
                        </p>
                    </FadeIn>
                    <CtaBlock onNavigate={onNavigate} type="alternative" className="pt-12" />
                </div>
            </section>

            <Divider />

            <section className="w-full bg-[#050505] py-40 flex justify-center border-t border-gray-900/50">
                <div className="max-w-4xl w-full px-10 space-y-16">
                    <div className="space-y-6">
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                WHO THE DEMO IS FOR
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                                The OS³ Demo is designed for decision-makers evaluating serious operational systems.
                                <br /> It is most relevant for:
                            </p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <FadeIn className="space-y-8">
                            <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium">
                                {['CEOs and founders', 'Business and operations leaders', 'IT, security, and compliance executives', 'Legal and risk professionals', 'Organizations scaling AI, automation, or intelligence initiatives'].map((target, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="text-cyan-500 mt-1">&bull;</span>
                                        <span>{target}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn delay={0.2} className="flex flex-col justify-end">
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                                If you are exploring OS³ as a strategic platform rather than a curiosity, the demo will give you the context you need.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <Divider />

            <section className="w-full bg-[#080808] py-40 flex justify-center border-t border-gray-900/50">
                <div className="max-w-4xl w-full px-10 space-y-16">
                    <div className="space-y-6">
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                ENGAGEMENT MODEL
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                                OS³ Dash is available as a commercial platform, with optional modules and services depending on organisational needs.
                                <br /> Companies typically engage in one or more of the following ways:
                            </p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <FadeIn className="space-y-8">
                            <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium">
                                {[
                                    'Deploy OS³ Dash as a core operating platform',
                                    'Add specialised AI and automation modules',
                                    'Engage JB³Ai for system architecture and governance design',
                                    'Book advisory sessions for strategy, compliance, or deployment',
                                    'Participate in accelerator programs to build custom internal systems'
                                ].map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="text-purple-500 mt-1">&bull;</span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn delay={0.2} className="flex flex-col justify-end">
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                                Every deployment is structured to balance capability with control, ensuring OS³ grows alongside the organisation it supports.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            <Divider />

            <section className="w-full bg-[#080808] py-40 flex justify-center border-t border-gray-900/50">
                <div className="max-w-4xl w-full px-10 space-y-12">
                    <div className="space-y-6">
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                TRUST, GOVERNANCE & RESPONSIBLE ACCESS
                            </h2>
                        </FadeIn>
                    </div>
                    <FadeIn delay={0.1}>
                        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
                            OS³ is designed for environments where data sensitivity, operational risk, and accountability matter. All demonstrations operate within controlled, sandboxed environments and follow strict governance principles. No live client data is exposed. Access, capabilities, and integrations are intentionally scoped and delivered through advisory review. This approach ensures that intelligence, automation, and decision systems are deployed responsibly, securely, and in alignment with organizational and regulatory expectations.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <Divider />

            <section className="w-full bg-[#050505] py-60 flex justify-center border-t border-gray-900/50 relative overflow-hidden">
                <div className="max-w-4xl w-full px-10 space-y-24 relative z-10">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <FadeIn>
                                <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                    HOW TO ENGAGE
                                </h2>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                                    JB³Ai is both a platform provider and a strategic partner. <br /> Organisations can:
                                </p>
                            </FadeIn>
                        </div>

                        <FadeIn delay={0.2}>
                            <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium border-l border-gray-900 pl-8">
                                {[
                                    'Explore OS³ through a sandbox demo',
                                    'Deploy OS³ Dash as a core operating platform',
                                    'Add specialised AI and automation modules',
                                    'Book advisory sessions for architecture, governance, or compliance',
                                    'Engage in accelerator programs to build custom internal systems'
                                ].map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="text-white/20 mt-1">&bull;</span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic">
                                Every engagement is designed to align technology with accountability.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="pt-24 border-t border-gray-900/50 space-y-16 text-center">
                        <FadeIn>
                            <h2 className="section-heading text-2xl font-semibold uppercase tracking-tighter leading-tight">
                                EXPERIENCE <span className="text-gray-500">OS³</span>
                            </h2>
                        </FadeIn>

                        <CtaBlock onNavigate={onNavigate} className="pt-8" />
                    </div>
                </div>

                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"
                />
            </section>
        </div>
    );
};

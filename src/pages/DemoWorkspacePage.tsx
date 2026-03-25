
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Disc, Box, LogOut, ArrowRight, PhoneCall } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { CredibilityStrip } from '../components/ui/CredibilityStrip';
import { CtaBlock } from '../components/ui/CtaBlock';
import { FadeIn } from '../components/ui/FadeIn';

interface DemoWorkspacePageProps {
    onNavigate: (m: AppModule) => void;
    onClearData: (e: React.MouseEvent) => void;
}

export const DemoWorkspacePage: React.FC<DemoWorkspacePageProps> = ({ onNavigate, onClearData }) => {
    return (
        <div className="h-full overflow-y-auto px-8 md:px-20 py-20 space-y-32 relative">
            <DashboardBackdrop />

            <div className="text-center space-y-12 relative z-10 max-w-4xl mx-auto">
                <FadeIn className="inline-flex items-center justify-center gap-4 text-[9px] text-emerald-500 font-mono uppercase tracking-[0.4em] bg-emerald-500/5 py-2 px-8 border border-emerald-500/20 rounded-full mb-4">
                    <ShieldCheck className="w-4 h-4" /> System Integrity Validated
                </FadeIn>
                <div className="space-y-8">
                    <FadeIn>
                        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Demonstration <span className="text-gray-500">Access</span></h1>
                    </FadeIn>
                    <div className="max-w-2xl mx-auto space-y-10">
                        <FadeIn>
                            <p className="text-sm md:text-base text-white font-bold leading-relaxed uppercase tracking-widest border-y border-white/5 py-10">
                                “This demo is not a prototype. It is a governed operational environment designed to show how intelligence behaves under real constraints.”
                            </p>
                        </FadeIn>
                        <FadeIn>
                            <p className="text-[11px] text-gray-400 font-light leading-relaxed uppercase tracking-[0.15em]">
                                Experience the OS³ Dash unified kernel. Witness how multi-source intelligence is consolidated, governed, and localized into actionable decision loops without compromising security.
                            </p>
                        </FadeIn>
                    </div>
                </div>
                <FadeIn className="pt-8">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onNavigate(AppModule.DEMO_SIGNUP)}
                        className="bg-white text-black px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all shadow-2xl active:scale-95"
                    >
                        Initialize Live Demo
                    </motion.button>
                </FadeIn>
            </div>

            <div id="governance" className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 max-w-4xl mx-auto pt-16 border-t border-gray-900/50">
                <FadeIn className="space-y-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                        What it <span className="text-gray-500">Shows</span>
                    </h2>
                    <div className="space-y-6">
                        <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                            During the demo, you will see how OS³ functions as an operational control layer rather than a traditional dashboard.
                        </p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-medium leading-relaxed italic border-l border-gray-900 pl-8">
                            The demo uses sandboxed data to illustrate system behavior, flows, and controls without exposing sensitive or proprietary information.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn className="space-y-8">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">You will explore:</p>
                    <ul className="space-y-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                        {[
                            { label: 'Consolidation of multi-source intelligence', id: 'governance' },
                            { label: 'Governance boundaries for AI agents & automation', id: 'security' },
                            { label: 'Identity, access, and decision accountability', id: 'compliance' },
                            { label: 'Integration of human oversight & automated execution' },
                            { label: 'Core kernel sync across all specialized modules' }
                        ].map((item: any, idx) => (
                            <li key={idx} id={item.id} className="flex items-start gap-4">
                                <span className="text-cyan-500">&bull;</span>
                                <span className="text-wrap">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </FadeIn>
            </div>

            <div id="demo-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 relative z-10 max-w-6xl mx-auto bg-gray-900/20 border border-gray-900">
                <motion.button
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    onClick={() => onNavigate(AppModule.NEURAL_CORE)}
                    className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 md:last:border-r-0 lg:border-r"
                >
                    <div className="icon-plate"><Cpu /></div>
                    <div className="space-y-4">
                        <h3 className="text-white text-xs uppercase font-bold tracking-widest">Neural Core</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Intelligence Sync — Level 01 Access</p>
                    </div>
                </motion.button>
                <motion.button
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    onClick={() => onNavigate(AppModule.VOICE_GRID)}
                    className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 lg:border-r"
                >
                    <div className="icon-plate"><PhoneCall /></div>
                    <div className="space-y-4">
                        <h3 className="text-white text-xs uppercase font-bold tracking-widest">Voice Grid</h3>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">Call Execution - Level 01 Access</p>
                    </div>
                </motion.button>
                <motion.button
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    onClick={() => onNavigate(AppModule.MEDIA_LAB)}
                    className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 lg:border-r"
                >
                    <div className="icon-plate"><Disc /></div>
                    <div className="space-y-4">
                        <h3 className="text-white text-xs uppercase font-bold tracking-widest">Media Lab</h3>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">Asset Rendering — Level 01 Access</p>
                    </div>
                </motion.button>
                <motion.button
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    onClick={() => onNavigate(AppModule.MOTION_LAB)}
                    className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-b border-gray-900 lg:border-r-0"
                >
                    <div className="icon-plate"><Box /></div>
                    <div className="space-y-4">
                        <h3 className="text-white text-xs uppercase font-bold tracking-widest">Motion Lab</h3>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">VEO Loop Synth — Level 01 Access</p>
                    </div>
                </motion.button>
            </div>

            <div id="security" className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 max-w-4xl mx-auto pt-16 border-t border-gray-900/50">
                <FadeIn className="space-y-8">
                    <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-4">DEMO BOUNDARIES</div>
                    <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                        What it <span className="text-gray-500">Does Not Show</span>
                    </h2>
                    <div className="space-y-6">
                        <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                            The OS³ Demo is intentionally controlled to ensure operational integrity and system security.
                        </p>
                        <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-medium leading-relaxed italic border-l border-gray-900 pl-8">
                            This ensures the platform is presented responsibly and that operational integrity is maintained.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn className="space-y-8">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Excluded Attributes:</p>
                    <ul className="space-y-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                        {[
                            'Live institutional or customer data',
                            'Open-ended or unrestricted system access',
                            'Unrestricted configuration of core models',
                            'Commercial pricing or contract terms'
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <span className="text-red-500/50">&bull;</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </FadeIn>
            </div>

            <div id="compliance" className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 max-w-4xl mx-auto pt-16 border-t border-gray-900/50">
                <FadeIn className="space-y-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                        Who the <span className="text-gray-500">Demo Is For</span>
                    </h2>
                    <div className="space-y-6">
                        <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                            The OS³ demo is designed for decision-makers evaluating serious operational systems.
                        </p>
                        <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-medium leading-relaxed italic border-l border-gray-900 pl-8">
                            For leadership evaluating OS³ as a strategic operating layer, this demonstration provides critical context for governance and scale.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn className="space-y-8">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Strategic Stakeholders:</p>
                    <ul className="space-y-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                        {[
                            'CEOs & Enterprise Founders',
                            'Operations & Strategy Leadership',
                            'IT, Security & Compliance Officers',
                            'Legal Counsel & Risk Architects',
                            'Organizations requiring governed intelligence'
                        ].map((target, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <span className="text-purple-500">&bull;</span>
                                <span>{target}</span>
                            </li>
                        ))}
                    </ul>
                </FadeIn>
            </div>

            {/* Optional Extensions - Subtle Divider Band */}
            <div className="max-w-4xl mx-auto pt-16 pb-16 border-t border-gray-900/50 relative z-10">
                <FadeIn className="flex flex-col md:flex-row gap-12 items-baseline">
                    <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em] whitespace-nowrap">
                        CAPABILITY DISCLOSURE
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-[0.3em]">
                            Optional Live Demo Extensions
                        </h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed max-w-2xl">
                            These specialized modules are available for advisor-led briefings. They demonstrate deep-layer OS³ capabilities and are not included in the standard sandboxed environment.
                        </p>
                    </div>
                </FadeIn>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16">
                    {[
                        { label: 'Neural Tuning', sub: 'Model Refinement' },
                        { label: 'Voice Clone', sub: 'Identity Synth' },
                        { label: 'Audit Vault', sub: 'Deep Compliance' },
                        { label: 'Hardware Key', sub: 'Physical Auth' }
                    ].map((ext, idx) => (
                        <FadeIn key={idx} className="space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="text-[10px] text-white font-bold uppercase tracking-wider">{ext.label}</div>
                            <div className="text-[9px] text-cyan-500/60 uppercase tracking-widest font-mono">{ext.sub}</div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            <div id="trust" className="max-w-4xl mx-auto pt-16 border-t border-gray-900/50 space-y-12 relative z-10">
                <FadeIn className="flex flex-col md:flex-row gap-12 items-baseline">
                    <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em] whitespace-nowrap">
                        CONTROLLED ENVIRONMENT
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                            Trust, Governance <span className="text-gray-500">& Responsible Access</span>
                        </h2>
                    </div>
                </FadeIn>
                <FadeIn className="space-y-16">
                    <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
                        OS³ is designed for environments where data sensitivity, operational risk, and accountability matter. All demonstrations operate within controlled, sandboxed environments and follow strict governance principles. No live client data is exposed. Access, capabilities, and integrations are intentionally scoped and delivered through advisory review. This approach ensures that intelligence, automation, and decision systems are deployed responsibly, securely, and in alignment with organizational and regulatory expectations.
                    </p>

                    <CtaBlock onNavigate={onNavigate} className="pt-8" />
                </FadeIn>
            </div>
            <CredibilityStrip label="CONTROLLED ENVIRONMENT" className="mt-20" />

            <FadeIn className="flex flex-col items-center gap-12 pt-20 border-t border-gray-900 relative z-10 max-w-4xl mx-auto">
                <button onClick={() => onNavigate(AppModule.OS3_INFO)} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> Return to Primary Enclave
                </button>
                <button onClick={onClearData} className="text-[9px] font-mono text-gray-700 hover:text-red-500 uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                    <LogOut className="w-3 h-3" /> Clear Demo Data
                </button>
            </FadeIn>
        </div >
    );
};

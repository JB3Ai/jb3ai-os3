
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Scale } from 'lucide-react';
import { AppModule } from '../types';
import { FadeIn } from '../components/ui/FadeIn';

interface PolicyPageProps {
    module: AppModule;
}

const POLICY_CONTENT: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
    [AppModule.TRUST]: {
        title: "Trust & Integrity",
        icon: Shield,
        content: (
            <div className="space-y-6 text-gray-400">
                <p>JB³Ai operates on a fundamental principle of verifiable trust. Our systems are designed not just to perform, but to explain their performance, ensuring that every automated action can be traced back to a specific policy, data source, or human authorization.</p>
                <p>In high-stakes environments, trust is not assumed; it is engineered. We build architectures that enforce integrity at the code level, preventing unauthorized data access or unmonitored decision-making.</p>
            </div>
        )
    },
    [AppModule.GOVERNANCE]: {
        title: "System Governance",
        icon: Scale,
        content: (
            <div className="space-y-6 text-gray-400">
                <p>Governance is the operating system of the modern enterprise. JB³Ai embeds governance directly into the workflow, ensuring that compliance is not an afterthought but a constraint within which all intelligence operates.</p>
                <p>Our OS³ platform enforces policy-based access controls, automated audit logging, and role-based permissions, creating a seamless environment where innovation meets regulation without friction.</p>
            </div>
        )
    },
    [AppModule.SECURITY]: {
        title: "Security Architecture",
        icon: Lock,
        content: (
            <div className="space-y-6 text-gray-400">
                <p>Security is foundational to every layer of the JB³Ai stack. We employ zero-trust principles, ensuring that identity is verified strictly and continuously. Data is encrypted at rest and in transit, with granular controls over who can access specific intelligence assets.</p>
                <p>Our security model extends beyond technology to include operational security (OpSec) practices, protecting not just your data, but your strategic intent and decision-making processes.</p>
            </div>
        )
    },
    [AppModule.COMPLIANCE]: {
        title: "Compliance & Standards",
        icon: FileText,
        content: (
            <div className="space-y-6 text-gray-400">
                <p>JB³Ai systems are built to align with rigorous international compliance standards. From GDPR and CCPA to industry-specific regulations in finance and healthcare, our platform provided the tools needed to maintain and demonstrate compliance.</p>
                <p>Automated reporting and real-time monitoring capabilities allow compliance teams to move from reactive auditing to proactive risk management.</p>
            </div>
        )
    }
};

export const PolicyPage: React.FC<PolicyPageProps> = ({ module }) => {
    const data = POLICY_CONTENT[module];
    const Icon = data?.icon || FileText;

    if (!data) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10">
            <div className="max-w-4xl mx-auto space-y-16">
                <FadeIn>
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                            <Icon className="w-3 h-3" />
                            <span>Statement of Practice</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase">{data.title}</h1>
                        <div className="h-px w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
                    </div>
                </FadeIn>

                <FadeIn className="prose prose-invert prose-lg max-w-none">
                    {data.content}
                </FadeIn>

                <FadeIn className="pt-10 border-t border-white/10">
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </FadeIn>
            </div>
        </div>
    );
};

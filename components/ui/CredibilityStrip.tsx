
import React from 'react';
import { motion } from 'framer-motion';

interface CredibilityStripProps {
    className?: string;
    label?: string;
}

export const CredibilityStrip: React.FC<CredibilityStripProps> = ({ className = "", label = "OPERATING STANDARD" }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className={`max-w-4xl mx-auto py-10 px-12 border border-gray-900 bg-white/[0.01] relative z-10 ${className}`}
    >
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="hidden md:block border-r border-gray-900 pr-8">
                <div className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 whitespace-nowrap opacity-40">
                    {label}
                </div>
            </div>
            <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.4em]">Experience, Posture & Operating Standard</h4>
                <p className="text-xs md:text-[13px] text-gray-500 uppercase tracking-[0.2em] leading-relaxed font-medium">
                    JB³Ai operates at the intersection of intelligence, operations, and governance. Our work spans SMEs, enterprises, regulated industries, advisory firms, and high-trust environments where data sensitivity, accountability, and operational clarity are critical. We approach AI as infrastructure, not experimentation. Every system is designed with governance, auditability, and long-term resilience in mind. This posture allows organizations to adopt advanced intelligence capabilities with confidence, control, and measurable outcomes.
                </p>
            </div>
        </div>
    </motion.div>
);

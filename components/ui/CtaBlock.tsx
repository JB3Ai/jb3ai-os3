
import React from 'react';
import { AppModule } from '../../types';
import { motion } from 'framer-motion';

interface CtaBlockProps {
    onNavigate: (m: AppModule) => void;
    type?: 'primary' | 'alternative' | 'minimal';
    className?: string;
    align?: 'center' | 'left';
    hideMain?: boolean;
}

export const CtaBlock: React.FC<CtaBlockProps> = ({
    onNavigate,
    type = 'primary',
    className = "",
    align = 'center',
    hideMain = false
}) => {
    const alignmentClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
    const flexAlignment = align === 'center' ? 'justify-center' : 'justify-start';

    if (type === 'minimal') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col sm:flex-row items-center gap-6 ${flexAlignment} ${className}`}
            >
                <button onClick={() => onNavigate(AppModule.WORKSPACE)} className="bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Initialize Demo</button>
                <button onClick={() => onNavigate(AppModule.CONTACT)} className="border border-white/10 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Book Advisor</button>
            </motion.div>
        );
    }

    const config = {
        primary: {
            main: { label: "Initialize Live Demo", sub: "Enter the governed operating environment." },
            sec: { label: "Book Technical Briefing", sub: "Architecture, risk, and deployment guidance." },
            trust: "This is a governed operational environment. System integrity is verified."
        },
        alternative: {
            main: { label: "Explore OS³ Demo", sub: "Experience the operating layer behind governed intelligence." },
            sec: { label: "Speak With an Advisor", sub: "Architecture, risk, and deployment guidance." },
            trust: "Demonstrations use sandboxed data. Live access provided by request."
        }
    }[type === 'alternative' ? 'alternative' : 'primary'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: 0.1 }}
            className={`space-y-12 ${alignmentClass} ${className}`}
        >
            <div className={`flex flex-col md:flex-row items-start ${flexAlignment} gap-12 w-full`}>
                {!hideMain && (
                    <div className={`space-y-4 flex flex-col ${alignmentClass} group w-full md:w-auto md:max-w-[320px]`}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate(AppModule.WORKSPACE)}
                            className="w-full bg-white text-black px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
                        >
                            {config.main.label}
                        </motion.button>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium">
                            {config.main.sub}
                        </p>
                    </div>
                )}

                <div className={`space-y-4 flex flex-col ${alignmentClass} group w-full md:w-auto md:max-w-[320px]`}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onNavigate(AppModule.CONTACT)}
                        className="w-full border border-white/10 text-white px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-all active:scale-[0.98]"
                    >
                        {config.sec.label}
                    </motion.button>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                        {config.sec.sub}
                    </p>
                </div>
            </div>
            <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-mono">
                {config.trust}
            </p>
        </motion.div>
    );
};


import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    num: string;
    title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ num, title }) => (
    <motion.h2
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-4 pt-12 relative z-10"
    >
        <div className="w-12 h-[1px] bg-gray-800" /> {num} — {title}
    </motion.h2>
);

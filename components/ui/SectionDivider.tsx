
import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
    height?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ height = "140px md:h-[240px] lg:h-[320px]" }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1 }}
        className={`w-full bg-cover bg-center ${height.includes('px') ? '' : height}`}
        style={{
            backgroundColor: 'transparent',
            backgroundImage: "url('/media/hero/os3-core-static-v2.webp')",
            height: height.includes('px') ? height : undefined
        }}
    />
);

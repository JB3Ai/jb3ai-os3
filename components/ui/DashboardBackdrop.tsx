
import React from 'react';
import { motion } from 'framer-motion';

interface DashboardBackdropProps {
    opacity?: number;
}

export const DashboardBackdrop: React.FC<DashboardBackdropProps> = ({ opacity = 0.08 }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none grayscale brightness-[0.2]"
        style={{
            backgroundImage: "url('/media/hero/os3-core-static-v2.webp')",
            mixBlendMode: 'luminosity'
        }}
    />
);


import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    viewport?: { once?: boolean; margin?: string };
}

export const FadeIn: React.FC<FadeInProps> = ({
    children,
    className = "",
    delay = 0,
    direction = 'up',
    duration = 0.6,
    viewport = { once: true, margin: "-10%" }
}) => {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 }
    };

    const initial = {
        opacity: 0,
        ...directions[direction]
    };

    return (
        <motion.div
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={viewport}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

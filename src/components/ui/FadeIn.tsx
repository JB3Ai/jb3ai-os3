import React from 'react';

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <div className={`animate-fadeIn opacity-100 ${className}`} style={{ animationDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

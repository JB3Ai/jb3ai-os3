import React from 'react';

export function CredibilityStrip({ className = "", label }: { className?: string; label?: string }) {
    return (
        <div className={`py-6 text-xs text-white/30 tracking-[0.3em] font-mono text-center uppercase border-b border-white/5 ${className}`}>
            {label || "System Integrity Level: High • Enterprise Grade Security • SOC2 Type II Certified Process"}
        </div>
    );
}

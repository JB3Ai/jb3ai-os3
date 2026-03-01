import React from 'react';

interface SectionHeaderProps {
    num: string;
    title: string;
    className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ num, title, className = '' }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <span className="text-[10px] text-cyan-500 font-mono tracking-widest uppercase">
                REF {num} //
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-white">
                {title}
            </h2>
            <div className="w-12 h-1 bg-cyan-500/50 mt-2" />
        </div>
    );
};

import React from 'react';

export function Divider({ className = "" }: { className?: string }) {
    return (
        <div className={`w-screen relative left-1/2 -translate-x-1/2 flex justify-center py-4 ${className}`}>
            <img
                src="/media/dividers/section-divider-dark-v1.jpg"
                alt="System Divider"
                className="w-full opacity-100 select-none pointer-events-none mix-blend-screen"
            />
        </div>
    );
}

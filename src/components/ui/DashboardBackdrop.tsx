import React from 'react';

export function DashboardBackdrop({ children }: { children?: React.ReactNode }) {
    return (
        <div className="absolute inset-0 bg-[#0A0C10] text-white">
            {children}
        </div>
    );
}

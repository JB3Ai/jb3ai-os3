import React from 'react';
import { AppModule } from '../../types';

interface CtaBlockProps {
    onNavigate: (module: AppModule) => void;
    type?: string;
    className?: string;
}

export function CtaBlock({ onNavigate, type = 'default', className = '' }: CtaBlockProps) {
    return (
        <div className={`border border-white/10 p-8 rounded-xl bg-black/40 text-center space-y-4 ${className}`}>
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">Ready to Deploy?</h3>
            <p className="text-sm text-gray-400">Initialize a workspace or schedule a consultation with our advisory team.</p>
            <div className="flex justify-center gap-4 pt-4">
                <button
                    onClick={() => onNavigate(AppModule.WORKSPACE)}
                    className="bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                    Initialize Workspace
                </button>
                <button
                    onClick={() => onNavigate(AppModule.CONSULTING)}
                    className="border border-white/20 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                    Consulting
                </button>
            </div>
        </div>
    );
}

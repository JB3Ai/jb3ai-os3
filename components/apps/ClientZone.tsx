import React from 'react';
import { Lock } from 'lucide-react';

export const ClientZone: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md space-y-8 bg-black border border-gray-800 p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-800" />
                
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-light text-white">Client Zone</h2>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">Client Portal Access</p>
                </div>

                <div className="space-y-4 pt-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase">Client ID</label>
                        <input type="text" disabled placeholder="JB3-AUTH-001" className="w-full bg-gray-900 border border-gray-800 p-3 text-sm text-gray-400 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase">Security Key</label>
                        <input type="password" disabled placeholder="••••••••••••" className="w-full bg-gray-900 border border-gray-800 p-3 text-sm text-gray-400 cursor-not-allowed" />
                    </div>
                </div>

                <div className="pt-4">
                    <button disabled className="w-full border border-gray-700 text-gray-500 py-3 text-xs uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" /> Access Restricted
                    </button>
                    <p className="text-center text-[10px] text-gray-600 mt-4 leading-relaxed">
                        Demo Environment: Access is currently restricted to internal administrators.
                    </p>
                </div>
            </div>
        </div>
    );
};
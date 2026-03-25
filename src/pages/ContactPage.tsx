
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// ... existing imports ...
import { User, Mail, Building, MessageSquare, ArrowRight } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { FadeIn } from '../components/ui/FadeIn';
import { DIRECT_LEADS_EMAIL, openDirectEmailDraft } from '../utils/directEmail';

interface ContactPageProps {
    onNavigate: (m: AppModule) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            openDirectEmailDraft({
                subject: `JB3Ai Advisory Request - ${String(data.organization || 'Website Contact')}`,
                lines: [
                    'New JB3Ai advisory request.',
                    '',
                    `Name: ${String(data.name || '')}`,
                    `Email: ${String(data.email || '')}`,
                    `Organization: ${String(data.organization || '')}`,
                    '',
                    'Project Brief:',
                    String(data.message || ''),
                    '',
                    `Source: https://jb3ai.com/contact`,
                    `Submitted: ${new Date().toISOString()}`
                ]
            });
            setStatus('success');
            form.reset();
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="w-full bg-[#050505] min-h-screen relative overflow-hidden">
            <DashboardBackdrop />
            <div className="max-w-4xl mx-auto py-32 px-10 space-y-24 relative z-10">
                <header className="space-y-8">
                    <FadeIn>
                        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Contact Advisory</h1>
                    </FadeIn>
                    <FadeIn>
                        <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl uppercase tracking-tight">
                            Engage with our strategic team for institutional implementation briefings.
                        </p>
                    </FadeIn>
                </header>

                {status === 'success' ? (
                    <FadeIn className="p-12 border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Email Draft Opened</h3>
                        <p className="text-xs uppercase tracking-widest leading-relaxed">Your mail app should now be ready with the advisory request addressed to hi@jb3ai.com. Send the draft to complete the briefing request.</p>
                        <button onClick={() => { setStatus('idle'); onNavigate(AppModule.HOME); }} className="text-[10px] font-bold uppercase tracking-[0.4em] mt-8 hover:text-white transition-colors flex items-center gap-4">
                            <ArrowRight className="w-3 h-3 rotate-180" /> Return to Terminal
                        </button>
                    </FadeIn>
                ) : (
                    <FadeIn className="space-y-10">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {status === 'error' && (
                                <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-500 text-xs uppercase tracking-widest">
                                    Direct email handoff failed. Please email {DIRECT_LEADS_EMAIL} manually.
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                        <User className="w-3 h-3" /> Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                        <Mail className="w-3 h-3" /> Professional Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono text-white"
                                        placeholder="john@enterprise.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="organization" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                    <Building className="w-3 h-3" /> Organization
                                </label>
                                <input
                                    id="organization"
                                    name="organization"
                                    type="text"
                                    required
                                    className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono text-white"
                                    placeholder="Enterprise Corp"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" /> Project Brief
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono text-white h-40 resize-none"
                                    placeholder="Describe your institutional requirements..."
                                />
                            </div>

                            <div className="pt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className={`w-full md:w-auto px-20 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] ${status === 'submitting' ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    {status === 'submitting' ? 'Transmitting...' : 'Transmit Briefing Request'}
                                </motion.button>
                            </div>
                        </form>
                    </FadeIn>
                )}

                <section className="pt-20 opacity-40">
                    <FadeIn className="p-12 border-l border-gray-900 space-y-6">
                        <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest font-mono">Enclave Communications</h4>
                        <p className="text-[10px] text-gray-700 leading-relaxed uppercase tracking-[0.2em] font-mono">
                            Direct engagement is conducted via secure email. Advisory requests route to hi@jb3ai.com and are prioritized by organizational alignment and security clearance.
                        </p>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
};

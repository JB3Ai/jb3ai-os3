
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building, MessageSquare, ArrowRight } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { FadeIn } from '../components/ui/FadeIn';

interface ContactPageProps {
    onNavigate: (m: AppModule) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        message: ''
    });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Contact submission:", formData);
        setIsSent(true);
    };

    return (
        <div className="w-full bg-[#050505] min-h-screen relative overflow-hidden">
            <DashboardBackdrop opacity={0.06} />
            <div className="max-w-4xl mx-auto py-32 px-10 space-y-24 relative z-10">
                <header className="space-y-8">
                    <FadeIn>
                        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Contact Advisory</h1>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl uppercase tracking-tight">
                            Engage with our strategic team for institutional implementation briefings.
                        </p>
                    </FadeIn>
                </header>

                {isSent ? (
                    <FadeIn className="p-12 border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Briefing Requested</h3>
                        <p className="text-xs uppercase tracking-widest leading-relaxed">Your request has been logged. An advisory officer will contact you within one business cycle.</p>
                        <button onClick={() => onNavigate(AppModule.HOME)} className="text-[10px] font-bold uppercase tracking-[0.4em] mt-8 hover:text-white transition-colors flex items-center gap-4">
                            <ArrowRight className="w-3 h-3 rotate-180" /> Return to Terminal
                        </button>
                    </FadeIn>
                ) : (
                    <FadeIn delay={0.2} className="space-y-10">
                        <form onSubmit={handleSubmit} className="space-y-10">
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
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="contact_email" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                        <Mail className="w-3 h-3" /> Professional Email
                                    </label>
                                    <input
                                        id="contact_email"
                                        name="contact_email"
                                        type="email"
                                        required
                                        className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono text-white"
                                        placeholder="john@enterprise.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                                    value={formData.organization}
                                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="brief" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" /> Project Brief
                                </label>
                                <textarea
                                    id="brief"
                                    name="brief"
                                    required
                                    className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-800 font-mono text-white h-40 resize-none"
                                    placeholder="Describe your institutional requirements..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <div className="pt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full md:w-auto px-20 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98]"
                                >
                                    Transmit Briefing Request
                                </motion.button>
                            </div>
                        </form>
                    </FadeIn>
                )}

                <section className="pt-20 opacity-40">
                    <FadeIn delay={0.3} className="p-12 border-l border-gray-900 space-y-6">
                        <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest font-mono">Enclave Communications</h4>
                        <p className="text-[10px] text-gray-700 leading-relaxed uppercase tracking-[0.2em] font-mono">
                            Direct engagement is conducted via secure lines. Briefing requests are prioritized by organizational alignment and security clearance.
                        </p>
                    </FadeIn>
                </section>
            </div>
        </div>
    );
};

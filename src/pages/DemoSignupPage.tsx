import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck, UserPlus } from 'lucide-react';
import { AppModule } from '../types';
import { DashboardBackdrop } from '../components/ui/DashboardBackdrop';
import { FadeIn } from '../components/ui/FadeIn';
import { openDirectEmailDraft } from '../utils/directEmail';

interface DemoSignupPageProps {
  destination: AppModule;
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export const DemoSignupPage: React.FC<DemoSignupPageProps> = ({ destination, onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    area: '',
    consent: false,
  });
  const [errors, setErrors] = useState<{ email?: string; phone?: string; area?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVoiceGridFlow = destination === AppModule.VOICE_GRID || destination === AppModule.PHONE_SYSTEM;
  const destinationLabel = isVoiceGridFlow ? 'Mazanzani Voice Grid / OS3Grid' : 'Clipboard Workspace';
  const destinationPath = isVoiceGridFlow ? '/os3grid' : '/clipboard';

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: { email?: string; phone?: string; area?: string; consent?: string } = {};

    if (!formData.email || !validateEmail(formData.email)) {
      nextErrors.email = 'A valid email address is required.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'A contact number is required.';
    }

    if (!formData.area.trim()) {
      nextErrors.area = 'Your area is required.';
    }

    if (!formData.consent) {
      nextErrors.consent = 'Consent is required to continue.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        area: formData.area.trim(),
        lead_type: isVoiceGridFlow ? 'os3grid_access' : 'clipboard_access',
        requested_module: destination,
        requested_destination: destinationPath,
        access_status: 'pending_manual_provisioning',
        timestamp: new Date().toISOString(),
      };

      openDirectEmailDraft({
        subject: `JB3Ai Demo Access Request - ${destinationLabel}`,
        lines: [
          'New JB3Ai demo access request.',
          '',
          `Destination: ${destinationLabel}`,
          `Requested Path: ${destinationPath}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Area: ${payload.area}`,
          `Lead Type: ${payload.lead_type}`,
          `Access Status: ${payload.access_status}`,
          '',
          `Source: ${window.location.pathname}`,
          `Referrer: ${document.referrer || 'Direct'}`,
          `Submitted: ${payload.timestamp}`,
        ],
      });

      localStorage.setItem('jb3ai_lead', JSON.stringify(payload));
      onSubmit(payload);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full overflow-y-auto px-8 md:px-20 py-20 relative">
      <DashboardBackdrop />

      <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_420px] gap-8 relative z-10">
        <section className="border border-gray-900 bg-black/40 p-8 md:p-12 space-y-12">
          <FadeIn className="inline-flex items-center gap-3 text-[9px] text-cyan-400 font-mono uppercase tracking-[0.35em] bg-cyan-500/5 py-2 px-6 border border-cyan-500/20 rounded-full">
            <ShieldCheck className="w-4 h-4" /> Access Request Flow
          </FadeIn>

          <div className="space-y-8">
            <FadeIn>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">
                Request <span className="text-gray-500">Demonstration Access</span>
              </h1>
            </FadeIn>
            <FadeIn>
              <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.18em] leading-relaxed max-w-3xl">
                Submit your contact details to register for guided access. This request does not create an instant
                self-service login. JB3Ai provisions Clipboard and demo accounts manually before full workspace access
                is activated.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn className="border border-gray-900 bg-black/30 p-6 space-y-3">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">Destination</div>
              <div className="text-sm text-white font-semibold uppercase tracking-[0.18em]">{destinationLabel}</div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                After registration you will continue to <span className="text-cyan-400">{destinationPath}</span>.
              </p>
            </FadeIn>

            <FadeIn className="border border-gray-900 bg-black/30 p-6 space-y-3">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">Provisioning</div>
              <div className="text-sm text-white font-semibold uppercase tracking-[0.18em]">Manual Account Review</div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                A direct email draft to hi@jb3ai.com will open at submit. Clipboard credentials are issued
                by JB3Ai after review, so the destination workspace may remain restricted until activation.
              </p>
            </FadeIn>
          </div>

          <FadeIn className="border border-gray-900 bg-white/[0.03] p-8 space-y-6">
            <div className="flex items-center gap-3 text-white text-xs uppercase tracking-[0.25em]">
              <UserPlus className="w-4 h-4 text-cyan-400" /> Access Flow
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'Review the demo access briefing and submit your registration details.',
                'JB3Ai validates the request and provisions the correct workspace permissions.',
                `Continue to ${destinationPath} and wait for account activation if sign-in is not yet available.`,
              ].map((step, index) => (
                <div key={step} className="border border-gray-900 bg-black/30 p-5 space-y-3">
                  <div className="text-[10px] text-cyan-400 uppercase tracking-[0.3em]">Step 0{index + 1}</div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.14em] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="border border-gray-900 bg-[#050505]/90 p-8 md:p-10 space-y-8">
          <div className="space-y-3">
            <div className="text-[9px] text-gray-600 uppercase tracking-[0.35em]">Registration Capture</div>
            <h2 className="text-xl text-white font-bold uppercase tracking-[0.18em]">Clipboard Access Request</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
              Provide the core details required for manual account staging and regional routing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="demo-email" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                id="demo-email"
                type="email"
                disabled={isSubmitting}
                value={formData.email}
                onChange={event => {
                  setFormData(prev => ({ ...prev, email: event.target.value }));
                  setErrors(prev => ({ ...prev, email: undefined }));
                }}
                placeholder="name@organization.com"
                className={`w-full bg-black border ${errors.email ? 'border-red-500/50' : 'border-gray-800'} p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white`}
              />
              {errors.email && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="demo-phone" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <input
                id="demo-phone"
                type="tel"
                disabled={isSubmitting}
                value={formData.phone}
                onChange={event => {
                  setFormData(prev => ({ ...prev, phone: event.target.value }));
                  setErrors(prev => ({ ...prev, phone: undefined }));
                }}
                placeholder="+27 00 000 0000"
                className={`w-full bg-black border ${errors.phone ? 'border-red-500/50' : 'border-gray-800'} p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white`}
              />
              {errors.phone && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="demo-area" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Area
              </label>
              <input
                id="demo-area"
                type="text"
                disabled={isSubmitting}
                value={formData.area}
                onChange={event => {
                  setFormData(prev => ({ ...prev, area: event.target.value }));
                  setErrors(prev => ({ ...prev, area: undefined }));
                }}
                placeholder="Johannesburg / Gauteng / Region"
                className={`w-full bg-black border ${errors.area ? 'border-red-500/50' : 'border-gray-800'} p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white`}
              />
              {errors.area && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.area}</p>}
            </div>

            <div className="space-y-3 border border-gray-900 bg-black/30 p-5">
              <label htmlFor="demo-consent" className="flex items-start gap-3 cursor-pointer group">
                <input
                  id="demo-consent"
                  type="checkbox"
                  disabled={isSubmitting}
                  checked={formData.consent}
                  onChange={event => {
                    setFormData(prev => ({ ...prev, consent: event.target.checked }));
                    setErrors(prev => ({ ...prev, consent: undefined }));
                  }}
                  className={`mt-1 w-4 h-4 bg-black border ${errors.consent ? 'border-red-500/50' : 'border-gray-800'} rounded checked:bg-cyan-500 transition-all appearance-none border checked:border-transparent cursor-pointer`}
                />
                <span className="text-[9px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors uppercase tracking-widest font-mono">
                  I consent to JB3Ai capturing these details for demo qualification, account provisioning review, and
                  controlled follow-up.
                </span>
              </label>
              {errors.consent && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.consent}</p>}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Access Request...' : 'Submit And Continue'}
              </motion.button>
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="w-full py-4 border border-gray-800 text-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-white/5 transition-all disabled:opacity-50"
              >
                Return To Demo Briefing
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-gray-900 space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-[0.25em]">
              <ArrowRight className="w-3 h-3" /> Login Note
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.14em] leading-relaxed">
              If you reach the destination workspace before your account is activated, sign-in may remain unavailable.
              JB3Ai completes Clipboard access creation separately from this request form.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Briefcase, Building2, Mail, Phone, MapPin, User, X } from 'lucide-react';

interface DemoGateModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export const DemoGateModal: React.FC<DemoGateModalProps> = ({ isOpen, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    interestType: 'Voice Grid Demo',
    preferredLanguage: 'English',
    country: 'International',
    consent: false
  });
  const [errors, setErrors] = useState<{ fullName?: string; company?: string; email?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAction = async (type: 'demo' | 'callback') => {
    const newErrors: { fullName?: string; company?: string; email?: string; consent?: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required.";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company is required.";
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Valid professional email required.";
    }
    if (!formData.consent) {
      newErrors.consent = "Consent is required to proceed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { 
        ...formData, 
        lead_type: type, 
        timestamp: new Date().toISOString() 
      };

      try {
        await fetch("https://script.google.com/macros/s/AKfycbxrgsjAnByZPCuQGvtlLTHvmDzEKY3lx4-jCMTOQnIogseLOgPM3Tsjv9EHysH84WFr/exec", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            sourcePath: window.location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer || ""
          })
        });
      } catch (e) {
        console.warn("Lead transmission skipped or failed", e);
      }

      localStorage.setItem('jb3ai_lead', JSON.stringify(payload));
      onSubmit(payload);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-gray-800 p-8 md:p-12 space-y-8 rounded shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">System Access Registry</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Protocol v1.0 — Managed Enclave</p>
          </div>
          <button onClick={onCancel} className="text-gray-600 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <User className="w-3 h-3" /> Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              disabled={isSubmitting}
              className={`w-full bg-black border ${errors.fullName ? 'border-red-500/50' : 'border-gray-800'} p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white`}
              placeholder="Your name"
              value={formData.fullName}
              onChange={e => {
                setFormData({ ...formData, fullName: e.target.value });
                setErrors({ ...errors, fullName: undefined });
              }}
            />
            {errors.fullName && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <Building2 className="w-3 h-3" /> Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              disabled={isSubmitting}
              className={`w-full bg-black border ${errors.company ? 'border-red-500/50' : 'border-gray-800'} p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white`}
              placeholder="Organization"
              value={formData.company}
              onChange={e => {
                setFormData({ ...formData, company: e.target.value });
                setErrors({ ...errors, company: undefined });
              }}
            />
            {errors.company && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <Mail className="w-3 h-3" /> Professional Email
            </label>
            <input 
              id="email"
              name="email"
              type="email" 
              disabled={isSubmitting}
              className={`w-full bg-black border ${errors.email ? 'border-red-500/50' : 'border-gray-800'} p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white`} 
              placeholder="name@organization.com" 
              value={formData.email} 
              onChange={e => {
                setFormData({...formData, email: e.target.value});
                setErrors({...errors, email: undefined});
              }} 
            />
            {errors.email && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="interestType" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <Briefcase className="w-3 h-3" /> Business Interest
            </label>
            <select
              id="interestType"
              name="interestType"
              disabled={isSubmitting}
              className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all font-mono text-white appearance-none cursor-pointer"
              value={formData.interestType}
              onChange={e => setFormData({ ...formData, interestType: e.target.value })}
            >
              <option value="Voice Grid Demo">Voice Grid Demo</option>
              <option value="AI Receptionist">AI Receptionist</option>
              <option value="Lead Qualification">Lead Qualification</option>
              <option value="Outbound Campaigns">Outbound Campaigns</option>
              <option value="Advisor Callback">Advisor Callback</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredLanguage" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <Building2 className="w-3 h-3" /> Preferred Language
            </label>
            <select
              id="preferredLanguage"
              name="preferredLanguage"
              disabled={isSubmitting}
              className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all font-mono text-white appearance-none cursor-pointer"
              value={formData.preferredLanguage}
              onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
            >
              <option value="English">English</option>
              <option value="Afrikaans">Afrikaans</option>
              <option value="isiZulu">isiZulu</option>
              <option value="isiXhosa">isiXhosa</option>
              <option value="Sepedi">Sepedi</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <Phone className="w-3 h-3" /> Contact Number (Optional)
            </label>
            <input 
              id="phone"
              name="phone"
              type="tel" 
              disabled={isSubmitting}
              className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 font-mono text-white" 
              placeholder="+00 00 000 0000" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Region
            </label>
            <select 
              id="country"
              name="country"
              disabled={isSubmitting}
              className="w-full bg-black border border-gray-800 p-4 text-sm focus:border-cyan-500 outline-none transition-all font-mono text-white appearance-none cursor-pointer"
              value={formData.country}
              onChange={e => setFormData({...formData, country: e.target.value})}
            >
              <option value="International">International</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="Africa">Africa</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>

          <div className="space-y-4 pt-2">
            <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer group">
              <input 
                id="consent"
                name="consent"
                type="checkbox" 
                disabled={isSubmitting}
                className={`mt-1 w-4 h-4 bg-black border ${errors.consent ? 'border-red-500/50' : 'border-gray-800'} rounded checked:bg-cyan-500 transition-all appearance-none border checked:border-transparent cursor-pointer`} 
                checked={formData.consent} 
                onChange={e => {
                  setFormData({...formData, consent: e.target.checked});
                  setErrors({...errors, consent: undefined});
                }} 
              />
              <span className="text-[9px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors uppercase tracking-widest font-mono">
                I acknowledge that this session is monitored and I agree to the JB³Ai Data Governance policy.
              </span>
            </label>
            {errors.consent && <p className="text-[9px] text-red-500 font-mono uppercase">{errors.consent}</p>}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              disabled={isSubmitting}
              onClick={() => handleAction('demo')}
              className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? 'Synchronizing...' : 'Enter Demo'}
            </button>
            <button 
              disabled={isSubmitting}
              onClick={() => handleAction('callback')}
              className="w-full py-4 border border-gray-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all disabled:opacity-50"
            >
              Request a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

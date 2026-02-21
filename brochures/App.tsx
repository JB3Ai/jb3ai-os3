
import React, { useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import { Brochure } from './types';

// Fix: Expand JSX namespace to include the 'iconify-icon' custom element properly for the compiler.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 
        icon?: string; 
        class?: string;
        className?: string;
      }, HTMLElement>;
    }
  }
}

const BROCHURES: Brochure[] = [
  {
    id: 'os3-dash',
    title: 'OS³ Dash',
    category: 'Enterprise Operations',
    description: 'The modular AI operating system designed for enterprise-scale integration and real-time operational efficiency.',
    pdfUrl: 'pdfs/jb3ai-os3-dash-the-operating-system.pdf'
  },
  {
    id: 'investigator-ai',
    title: 'InvestigatorAi',
    category: 'Legal & Compliance',
    description: 'Advanced forensic intelligence platform for deep-dive investigations and automated evidence synthesis.',
    pdfUrl: 'pdfs/jb3ai-investigatorai-app-dash-v1.pdf'
  },
  {
    id: 'shield-ai',
    title: 'ShieldAi',
    category: 'Cybersecurity Teams',
    description: 'Silent, proactive protection layering that neutralizes threats before they reach your core infrastructure.',
    pdfUrl: 'pdfs/jb3ai-shieldai-silent-protection.pdf'
  },
  {
    id: 'mindcare-ai',
    title: 'MindCareAi',
    category: 'Healthcare & Wellness',
    description: 'A sophisticated personal growth framework powered by adaptive neural networks for emotional intelligence.',
    pdfUrl: 'pdfs/jb3ai-mindcareai-personal-support-and-growth.pdf'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    category: 'Innovation Leaders',
    description: 'Accelerating AI transformation through strategic roadmaps and high-impact deployment frameworks.',
    pdfUrl: 'pdfs/jb3ai-consulting-and-accelerator.pdf'
  },
  {
    id: 'investment-deck',
    title: 'Investment Deck',
    category: 'Qualified Investors',
    description: "A comprehensive overview of JB³Ai's trajectory, valuation, and market-disrupting technology stack.",
    pdfUrl: 'pdfs/jb3ai-investment-deck-intelligence-in-motion.pdf'
  },
  {
    id: 'intel-motion',
    title: 'Intelligence in Motion',
    category: 'Strategic Partners',
    description: 'A strategic profile exploring the convergence of kinetic motion and artificial intelligence.',
    pdfUrl: 'pdfs/jb3ai-intelligence-info-ai.pdf'
  }
];

const App: React.FC = () => {
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert(`Thank you! The brochure "${selectedBrochure?.title}" has been sent to ${email}.`);
    
    setIsSubmitting(false);
    setSelectedBrochure(null);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen bg-[#0A0C10] text-[#E6E6E6] selection:bg-[#66FF66]/30">
      <div className="noise-bg"></div>
      
      {/* Advanced Force Field Background */}
      <InteractiveBackground 
        hue={120} // Lime Green Brand Color
        saturation={100}
        spacing={12}
        forceStrength={15}
        magnifierRadius={220}
      />

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-[#0A0C10]/90 border-b border-white/5 px-6 md:px-12 h-20 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#66FF66] rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xs">JB³</span>
          </div>
          <span className="text-xl font-display font-black tracking-tighter">JB³Ai</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://jb3ai.com" className="hidden md:block text-[10px] uppercase tracking-widest text-[#9AA3AD] hover:text-[#66FF66] transition-colors font-bold">Visit Website</a>
          <a 
            href="mailto:jono@jb3ai.com" 
            className="text-[10px] font-bold uppercase tracking-widest border border-white/10 px-6 py-3 hover:bg-white/5 transition-all text-[#9AA3AD] hover:text-white rounded-none no-underline flex items-center"
          >
            Book Expert Advisor
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-16 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-4 uppercase">
          JB³Ai BROCHURES
        </h1>
        <p className="max-w-2xl mx-auto text-[#9AA3AD] text-sm md:text-lg uppercase tracking-[0.2em] font-light">
          Strategic documentation and technical specifications for the future of intelligence.
        </p>
      </header>

      {/* Brochure Grid */}
      <section className="relative z-10 pb-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BROCHURES.map((brochure) => (
            <div key={brochure.id} className="glass p-8 rounded-3xl flex flex-col h-full group">
              <h3 className="text-2xl font-display font-bold mb-3">{brochure.title}</h3>
              <p className="text-[#9AA3AD] leading-relaxed mb-8 flex-grow text-sm">
                {brochure.description}
              </p>
              <div className="flex gap-3">
                <a 
                  href={brochure.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Preview
                </a>
                <button 
                  onClick={() => setSelectedBrochure(brochure)}
                  className="flex-1 py-3 rounded-xl bg-[#66FF66] hover:brightness-110 text-black text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-white/5 bg-[#0A0C10]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-[#66FF66] rounded flex items-center justify-center">
                  <span className="text-black text-[10px] font-black">JB³</span>
                </div>
                <span className="text-lg font-display font-black tracking-tighter">JB³Ai</span>
              </div>
              <p className="text-[#9AA3AD] text-sm leading-relaxed">
                Pioneering the next generation of autonomous intelligence and enterprise operating systems.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Connect</h4>
              <ul className="space-y-3 text-sm text-[#9AA3AD]">
                <li><a href="mailto:jono@jb3ai.com" className="hover:text-[#66FF66] transition-colors">jono@jb3ai.com</a></li>
                <li><a href="https://jb3ai.com" className="hover:text-[#66FF66] transition-colors">www.jb3ai.com</a></li>
              </ul>
            </div>
            <div className="flex md:justify-end gap-6">
              <a href="#" className="text-2xl text-[#9AA3AD] hover:text-[#66FF66] transition-all duration-300 hover:scale-125 inline-block">
                <iconify-icon icon="ri:twitter-x-fill"></iconify-icon>
              </a>
              <a href="https://linkedin.com/company/jb3ai" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#9AA3AD] hover:text-[#66FF66] transition-all duration-300 hover:scale-125 inline-block">
                <iconify-icon icon="ri:linkedin-box-fill"></iconify-icon>
              </a>
              <a href="https://github.com/jb3ai" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#9AA3AD] hover:text-[#66FF66] transition-all duration-300 hover:scale-125 inline-block">
                <iconify-icon icon="ri:github-fill"></iconify-icon>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-[#9AA3AD]/40">
            <p>&copy; {new Date().getFullYear()} JB³Ai. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="https://jb3ai.com/privacy" className="hover:text-[#66FF66]/40 transition-colors">Privacy Policy</a>
              <a href="https://jb3ai.com/terms" className="hover:text-[#66FF66]/40 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Download Modal */}
      {selectedBrochure && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-lg" 
            onClick={() => !isSubmitting && setSelectedBrochure(null)}
          ></div>
          <div className="relative bg-[#121620] w-full max-w-md rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
            <button 
              onClick={() => !isSubmitting && setSelectedBrochure(null)} 
              className={`absolute top-6 right-6 text-[#9AA3AD] hover:text-white transition-colors ${isSubmitting ? 'opacity-0 pointer-events-none' : ''}`}
              disabled={isSubmitting}
            >
              <iconify-icon icon="lucide:x" className="text-2xl"></iconify-icon>
            </button>
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-[#66FF66]/10 text-[#66FF66] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <iconify-icon icon={isSubmitting ? "svg-spinners:ring-resize" : "lucide:download"} className="text-2xl"></iconify-icon>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Download Brochure</h3>
              <p className="text-[#9AA3AD] text-sm">
                Enter your email to receive <span className="text-white font-bold">{selectedBrochure.title}</span>.
              </p>
            </div>

            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  required 
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#66FF66] transition-colors disabled:opacity-50"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" disabled={isSubmitting} />
                  <div className="w-5 h-5 border-2 border-white/20 rounded peer-checked:bg-[#66FF66] peer-checked:border-[#66FF66] transition-all peer-disabled:opacity-50"></div>
                  <iconify-icon icon="lucide:check" className="absolute inset-0 text-black text-xs hidden peer-checked:block m-auto"></iconify-icon>
                </div>
                <span className="text-[11px] text-[#9AA3AD] group-hover:text-white transition-colors">Send me updates occasionally</span>
              </label>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#66FF66] text-black font-bold uppercase tracking-widest text-sm mt-4 hover:brightness-110 transition-all shadow-lg shadow-[#66FF66]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && <iconify-icon icon="svg-spinners:180-ring" className="text-lg"></iconify-icon>}
                {isSubmitting ? 'Processing...' : 'Confirm Download'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

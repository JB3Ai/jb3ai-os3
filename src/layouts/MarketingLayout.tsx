
import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppModule } from '../types';
import { BROCHURES } from '../content/brochures';

interface MarketingLayoutProps {
  children: React.ReactNode;
  activeModule: AppModule;
  navigate: (m: AppModule) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (o: boolean) => void;
  fontSize: 's' | 'l';
  setFontSize: (f: 's' | 'l') => void;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({
  children, activeModule, navigate, isMenuOpen, setIsMenuOpen, fontSize, setFontSize
}) => {
  // Simple mobile detection for loading appropriate attributes if needed later
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  return (
    <div className={`w-full min-h-screen text-gray-300 flex flex-col font-sans selection:bg-white selection:text-black relative font-${fontSize}`}>

      {/* 
        HERO BACKGROUND LAYER 
        - Fixed position to cover viewport
        - Low z-index to stay behind everything
        - pointer-events-none to ensures clicks PASS THROUGH to content
      */}
      <div className="hero-bg absolute inset-0 overflow-hidden pointer-events-none z-0">

        {/* Base Background Color */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Visual Media Layer - Static Image Only for Ambient Background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/media/hero/new_hero2_static.webp"
            className="w-full h-full object-cover grayscale pointer-events-none"
            alt="System Backdrop"
          />
        </div>

        {/* Vignette / Overlay Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(25,25,25,0.4)_0%,_rgba(5,5,5,1)_70%)] pointer-events-none" />
      </div>

      {/* 
        CONTENT LAYER 
        - Relative position + Higher z-index to sit ON TOP of hero
        - pointer-events-auto to ensure INTERACTIVITY
      */}
      <div className="hero-fg relative z-10 flex flex-col min-h-screen">

        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="h-24 border-b border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-50 pointer-events-auto"
        >
          <div className="flex items-center gap-16">
            <h1 onClick={() => navigate(AppModule.HOME)} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 border border-[#66FF66] flex items-center justify-center transition-transform group-hover:rotate-45">
                <div className="w-1.5 h-1.5 bg-[#66FF66]"></div>
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-white/60 group-hover:text-white uppercase transition-colors">JB³Ai</span>
            </h1>
            <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium tracking-[0.12em] text-white/78">
              <button
                onClick={() => navigate(AppModule.OS3_INFO)}
                className={`px-[10px] py-[12px] hover:text-white/95 hover:drop-shadow-[0_0_12px_rgba(102,255,102,0.18)] transition-all uppercase ${activeModule === AppModule.OS3_INFO ? 'text-white/95 drop-shadow-[0_0_12px_rgba(102,255,102,0.18)]' : ''}`}
              >
                OS³ Dash
              </button>
              <button
                onClick={() => navigate(AppModule.APPS_LIST)}
                className={`px-[10px] py-[12px] hover:text-white/95 hover:drop-shadow-[0_0_12px_rgba(102,255,102,0.18)] transition-all uppercase ${activeModule === AppModule.APPS_LIST ? 'text-white/95 drop-shadow-[0_0_12px_rgba(102,255,102,0.18)]' : ''}`}
              >
                Products
              </button>
              <button
                onClick={() => navigate(AppModule.BROCHURES)}
                className={`px-[10px] py-[12px] hover:text-white/95 hover:drop-shadow-[0_0_12px_rgba(102,255,102,0.18)] transition-all uppercase ${activeModule === AppModule.BROCHURES ? 'text-white/95 drop-shadow-[0_0_12px_rgba(102,255,102,0.18)]' : ''}`}
              >
                Library
              </button>
              <button
                onClick={() => navigate(AppModule.VIDEO_VAULT)}
                className={`px-[10px] py-[12px] hover:text-white/95 hover:drop-shadow-[0_0_12px_rgba(102,255,102,0.18)] transition-all uppercase ${activeModule === AppModule.VIDEO_VAULT ? 'text-white/95 drop-shadow-[0_0_12px_rgba(102,255,102,0.18)]' : ''}`}
              >
                VVault
              </button>
              <button
                onClick={() => navigate(AppModule.CONSULTING)}
                className={`px-[10px] py-[12px] hover:text-white/95 hover:drop-shadow-[0_0_12px_rgba(102,255,102,0.18)] transition-all uppercase ${activeModule === AppModule.CONSULTING ? 'text-white/95 drop-shadow-[0_0_12px_rgba(102,255,102,0.18)]' : ''}`}
              >
                Advisory
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4 border border-gray-800 rounded p-1 bg-black/50">
              {(['s', 'l'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFontSize(f)}
                  className={`px-4 py-1 text-[10px] font-bold uppercase transition-all ${fontSize === f ? 'bg-white text-black' : 'text-gray-600 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(AppModule.CONSULTING)}
                className={`text-[10px] font-bold uppercase tracking-widest border border-gray-800 px-6 py-3 hover:bg-white/5 transition-all text-gray-400 hover:text-white`}
              >
                Book Expert Advisor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(AppModule.WORKSPACE)}
                className="btn-primary bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                View OS³ Demo
              </motion.button>
            </div>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-black z-40 flex flex-col p-16 space-y-10 pt-40 pointer-events-auto"
            >
              {[
                { id: AppModule.HOME, label: "Home" },
                { id: AppModule.OS3_INFO, label: "OS³ Dash" },
                { id: AppModule.APPS_LIST, label: "Products" },
                { id: AppModule.BROCHURES, label: "Library" },
                { id: AppModule.VIDEO_VAULT, label: "VVault" },
                { id: AppModule.CONSULTING, label: "Advisory" },
                { id: AppModule.CONTACT, label: "Contact" }
              ].map((m, idx) => (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => {
                    navigate(m.id);
                    setIsMenuOpen(false);
                  }}
                  className="text-xl font-bold text-white text-left uppercase tracking-widest"
                >
                  {m.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 min-h-screen relative z-10 pointer-events-auto">
          {children}
        </main>

        <footer className="border-t border-gray-900 bg-black py-32 px-10 pointer-events-auto z-10 relative">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <img src="/media/ui/jb3ai-mark.svg" alt="JB³Ai" className="h-[18px] w-auto" />
                <h5 className="text-white text-xs font-bold tracking-[0.3em] uppercase">JB³Ai Corporation</h5>
              </div>
              <p className="text-[10px] text-gray-600 max-w-sm leading-relaxed uppercase tracking-[0.2em]">JB³Ai builds governed intelligence systems for organizations operating at scale, complexity, and risk. We unify AI, operations, security, and decision-making into controlled, auditable environments.</p>
              <div className="pt-4">
                <button
                  onClick={() => navigate(AppModule.CONSULTING)}
                  className="btn-primary bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Book Expert Advisor
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-24">
              <div className="space-y-6">
                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Products</h6>
                <p className="text-[9px] text-gray-700 leading-relaxed max-w-[200px]">All products operate within the OS³ governed kernel unless deployed standalone.</p>
                <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                  <button onClick={() => navigate(AppModule.OS3_INFO)} className="hover:text-white transition-colors text-left uppercase">OS³ Dash</button>
                  <button onClick={() => navigate(AppModule.MEDIA_LAB)} className="hover:text-white transition-colors text-left uppercase">Media Lab</button>
                  <button onClick={() => navigate(AppModule.PHONE_SYSTEM)} className="hover:text-white transition-colors text-left uppercase">OS³ Voice Grid</button>
                  <button onClick={() => navigate(AppModule.INVESTIGATOR_AI)} className="hover:text-white transition-colors text-left uppercase">Investigator AI</button>
                  <button onClick={() => navigate(AppModule.SHIELD_AI)} className="hover:text-white transition-colors text-left uppercase">Shield AI</button>
                  <button onClick={() => navigate(AppModule.MINDCARE_AI)} className="hover:text-white transition-colors text-left uppercase">MindCare AI</button>
                  <button onClick={() => navigate(AppModule.CONSULTING)} className="hover:text-white transition-colors text-left uppercase">Consulting & Accelerator</button>
                </div>
              </div>
              <div className="space-y-6">
                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Engagement</h6>
                <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                  <button onClick={() => navigate(AppModule.CONSULTING)} className="hover:text-white transition-colors text-left uppercase">Advisory</button>
                  <button onClick={() => navigate(AppModule.CONTACT)} className="hover:text-white transition-colors text-left uppercase">Contact</button>
                  <button onClick={() => navigate(AppModule.WORKSPACE)} className="hover:text-white transition-colors text-left uppercase">Briefings</button>
                </div>
              </div>
              <div className="space-y-6">
                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Trust & Governance</h6>
                <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                  <button onClick={() => navigate(AppModule.GOVERNANCE)} className="hover:text-white transition-colors text-left uppercase">Governance Framework</button>
                  <button onClick={() => navigate(AppModule.SECURITY)} className="hover:text-white transition-colors text-left uppercase">Security Architecture</button>
                  <button onClick={() => navigate(AppModule.COMPLIANCE)} className="hover:text-white transition-colors text-left uppercase">Compliance & Risk</button>
                  <button onClick={() => navigate(AppModule.TRUST)} className="hover:text-white transition-colors text-left uppercase">Ethical Use Policy</button>
                </div>
              </div>
              <div className="space-y-6">
                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Library</h6>
                <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                  <a href={BROCHURES.os3dash} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-left uppercase">OS³ Dash PDF</a>
                  <a href={BROCHURES.investigator} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-left uppercase">InvestigatorAi PDF</a>
                  <a href={BROCHURES.investment} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-left uppercase">Investment Deck</a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto pt-32 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-900 mt-20">
            <div className="text-[10px] text-gray-700 font-mono uppercase tracking-[0.2em]">
              All demonstrations use sandboxed data. Deployments are governed, auditable, and subject to NDA. No client, institutional, or sensitive data is exposed in public environments.
            </div>
            <div className="flex items-center gap-12 text-[10px] text-gray-700 font-mono uppercase tracking-[0.2em]">
              <span>&copy; {new Date().getFullYear()} JB³Ai Corporation</span>
              <span>S-L MODES ENABLED</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
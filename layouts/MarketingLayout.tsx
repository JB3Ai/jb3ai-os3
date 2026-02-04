import React from 'react';
import { Menu, X, Github } from 'lucide-react';
import { AppModule } from '../types';

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
  const GITHUB_URL = "https://github.com/JB3Ai/jb3ai-os3";

  return (
    <div className="w-full min-h-screen bg-[#050505] text-gray-300 flex flex-col font-sans selection:bg-white selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(25,25,25,0.4)_0%,_rgba(5,5,5,1)_70%)] pointer-events-none -z-10" />

      <header className="fixed top-0 left-0 right-0 h-24 border-b border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-10 z-50">
        <div className="flex items-center gap-16">
          <h1 onClick={() => navigate(AppModule.HOME)} className="text-xs font-bold tracking-[0.3em] text-white flex items-center gap-4 cursor-pointer group uppercase">
            <div className="w-3 h-3 bg-white transition-all group-hover:shadow-[0_0_10px_white]" /> JB³Ai
          </h1>
          <nav className="hidden lg:flex items-center gap-12 text-xs font-bold uppercase tracking-widest text-gray-500">
            <button onClick={() => navigate(AppModule.OS3_INFO)} className={`hover:text-white transition-colors ${activeModule === AppModule.OS3_INFO ? 'text-white' : ''}`}>OS³ Dash</button>
            <button onClick={() => navigate(AppModule.APPS_LIST)} className={`hover:text-white transition-colors ${activeModule === AppModule.APPS_LIST ? 'text-white' : ''}`}>Apps</button>
            <button onClick={() => navigate(AppModule.SERVICES_HUB)} className={`hover:text-white transition-colors ${activeModule === AppModule.SERVICES_HUB ? 'text-white' : ''}`}>Services</button>
          </nav>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4 border border-gray-800 rounded p-1 bg-black/50">
            {(['s', 'l'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFontSize(f)}
                className={`px-4 py-1 text-xs font-bold uppercase transition-all ${fontSize === f ? 'bg-white text-black' : 'text-gray-600 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <a 
              href={GITHUB_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
            <button onClick={() => navigate(AppModule.CONTACT)} className={`text-xs font-bold uppercase tracking-widest hover:text-white transition-colors ${activeModule === AppModule.CONTACT ? 'text-white' : 'text-gray-500'}`}>
              Contact
            </button>
            <button onClick={() => navigate(AppModule.WORKSPACE)} className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Demo
            </button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col p-16 space-y-10 pt-40 animate-fade-in">
          {[
            { id: AppModule.HOME, label: "Home" },
            { id: AppModule.OS3_INFO, label: "OS³ Dash" },
            { id: AppModule.APPS_LIST, label: "Apps" },
            { id: AppModule.SERVICES_HUB, label: "Services" },
            { id: AppModule.WORKSPACE, label: "Demo" },
            { id: AppModule.CONTACT, label: "Contact" }
          ].map(m => (
            <button key={m.id} onClick={() => navigate(m.id)} className="text-xl font-bold text-white text-left uppercase tracking-widest">{m.label}</button>
          ))}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-gray-500 uppercase tracking-widest flex items-center gap-4">
            <Github className="w-6 h-6" /> GitHub
          </a>
        </div>
      )}

      <main className="flex-1 pt-24 min-h-screen">
        {children}
      </main>

      <footer className="border-t border-gray-900 bg-black py-32 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6">
            <h5 className="text-white text-xs font-bold tracking-[0.3em] uppercase">JB³Ai Corp</h5>
            <p className="text-xs text-gray-600 max-w-sm leading-relaxed uppercase tracking-wider">The central operating layer for professional business intelligence and asset management.</p>
          </div>
          <div className="flex gap-24">
             <div className="space-y-6">
               <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Platform</h6>
               <div className="flex flex-col gap-4 text-xs text-gray-600 font-bold uppercase tracking-widest">
                 <button onClick={() => navigate(AppModule.OS3_INFO)} className="hover:text-white transition-colors text-left">OS³ Dash</button>
                 <button onClick={() => navigate(AppModule.APPS_LIST)} className="hover:text-white transition-colors text-left">Apps</button>
                 <button onClick={() => navigate(AppModule.SERVICES_HUB)} className="hover:text-white transition-colors text-left">Services</button>
                 <button onClick={() => navigate(AppModule.WORKSPACE)} className="hover:text-white transition-colors text-left">Demo</button>
               </div>
             </div>
             <div className="space-y-6">
               <h6 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resources</h6>
               <div className="flex flex-col gap-4 text-xs text-gray-600 font-bold uppercase tracking-widest">
                 <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                   <Github className="w-3 h-3" /> GitHub Repo
                 </a>
                 <button onClick={() => navigate(AppModule.CONTACT)} className="hover:text-white transition-colors text-left">Advisory Portal</button>
               </div>
             </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-32 flex justify-between items-center text-xs text-gray-700 font-mono uppercase tracking-[0.2em]">
          <span>&copy; {new Date().getFullYear()} JB³Ai Corporation</span>
          <span>S-L MODES ENABLED</span>
        </div>
      </footer>
    </div>
  );
};
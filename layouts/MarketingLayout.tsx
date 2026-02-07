import React from 'react';
import { Menu, X } from 'lucide-react';
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
  const [shouldAnimate, setShouldAnimate] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Autoplay failed:", err);
      });
    }
  }, []);

  React.useEffect(() => {
    // Only render video if user has NOT requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;

    setIsMobile(isMobileDevice);
    setShouldAnimate(!prefersReducedMotion);
  }, []);

  return (
    <div className="w-full min-h-screen text-gray-300 flex flex-col font-sans selection:bg-white selection:text-black relative">
      {/* Background Stack */}
      <div className="fixed inset-0 bg-[#050505] pointer-events-none -z-30" />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-20"
        style={{ opacity: 0.3 }}
      >
        <source src="/media/hero/os3-hero-motion-v1.mp4" type="video/mp4" />
        <source src="/media/hero/os3-hero-motion-v1.webm" type="video/webm" />
      </video>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(25,25,25,0.4)_0%,_rgba(5,5,5,1)_70%)] pointer-events-none -z-10" />

      <header className="fixed top-0 left-0 right-0 h-24 border-b border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-10 z-50">
        <div className="flex items-center gap-16">
          <h1 onClick={() => navigate(AppModule.HOME)} className="flex items-center gap-3 cursor-pointer group">
            <img src="/media/ui/jb3ai-mark.svg" alt="JB³Ai" className="h-[18px] w-auto transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            <span className="text-xs font-bold tracking-[0.3em] text-white/60 group-hover:text-white uppercase transition-colors">JB³Ai</span>
          </h1>
          <nav className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <button onClick={() => navigate(AppModule.OS3_INFO)} className={`hover:text-white transition-colors ${activeModule === AppModule.OS3_INFO ? 'text-white' : ''}`}>OS³ Dash</button>
            <button onClick={() => navigate(AppModule.APPS_LIST)} className={`hover:text-white transition-colors ${activeModule === AppModule.APPS_LIST ? 'text-white' : ''}`}>Products</button>
            <button onClick={() => navigate(AppModule.WORKSPACE)} className={`hover:text-white transition-colors ${activeModule === AppModule.WORKSPACE ? 'text-white' : ''}`}>Demo</button>
            <button onClick={() => navigate(AppModule.SERVICES_HUB)} className={`hover:text-white transition-colors ${activeModule === AppModule.SERVICES_HUB ? 'text-white' : ''}`}>Advisory</button>
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
            <button
              onClick={() => navigate(AppModule.CONTACT)}
              className={`text-[10px] font-bold uppercase tracking-widest border border-gray-800 px-6 py-3 hover:bg-white/5 transition-all text-gray-400 hover:text-white`}
            >
              Book Expert Advisor
            </button>
            <button
              onClick={() => navigate(AppModule.WORKSPACE)}
              className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              View OS³ Demo
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
            { id: AppModule.APPS_LIST, label: "Products" },
            { id: AppModule.WORKSPACE, label: "Demo" },
            { id: AppModule.SERVICES_HUB, label: "Advisory" },
            { id: AppModule.CONTACT, label: "Contact" }
          ].map(m => (
            <button key={m.id} onClick={() => navigate(m.id)} className="text-xl font-bold text-white text-left uppercase tracking-widest">{m.label}</button>
          ))}

        </div>
      )}

      <main className="flex-1 pt-24 min-h-screen">
        {children}
      </main>

      <footer className="border-t border-gray-900 bg-black py-32 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img src="/media/ui/jb3ai-mark.svg" alt="JB³Ai" className="h-[18px] w-auto" />
              <h5 className="text-white text-xs font-bold tracking-[0.3em] uppercase">JB³Ai Corporation</h5>
            </div>
            <p className="text-[10px] text-gray-600 max-w-sm leading-relaxed uppercase tracking-[0.2em]">The central operating layer for professional business intelligence and asset management.</p>
            <div className="pt-4">
              <button
                onClick={() => navigate(AppModule.CONTACT)}
                className="bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Book Expert Advisor
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-24">
            <div className="space-y-6">
              <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Platform</h6>
              <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <button onClick={() => navigate(AppModule.OS3_INFO)} className="hover:text-white transition-colors text-left uppercase">OS³ Dash</button>
                <button onClick={() => navigate(AppModule.APPS_LIST)} className="hover:text-white transition-colors text-left uppercase">Products</button>
                <button onClick={() => navigate(AppModule.WORKSPACE)} className="hover:text-white transition-colors text-left uppercase">Demo</button>
              </div>
            </div>
            <div className="space-y-6">
              <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Engagement</h6>
              <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <button onClick={() => navigate(AppModule.SERVICES_HUB)} className="hover:text-white transition-colors text-left uppercase">Advisory</button>
                <button onClick={() => navigate(AppModule.CONTACT)} className="hover:text-white transition-colors text-left uppercase">Contact</button>
                <button onClick={() => navigate(AppModule.WORKSPACE)} className="hover:text-white transition-colors text-left uppercase">Briefings</button>
              </div>
            </div>
            <div className="space-y-6">
              <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Trust</h6>
              <div className="flex flex-col gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <button className="hover:text-white transition-colors text-left uppercase">Governance</button>
                <button className="hover:text-white transition-colors text-left uppercase">Security</button>
                <button className="hover:text-white transition-colors text-left uppercase">Compliance</button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-32 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-900 mt-20">
          <div className="text-[10px] text-gray-700 font-mono uppercase tracking-[0.2em]">
            Sandboxed demonstrations. Advisory-led access.
          </div>
          <div className="flex items-center gap-12 text-[10px] text-gray-700 font-mono uppercase tracking-[0.2em]">
            <span>&copy; {new Date().getFullYear()} JB³Ai Corporation</span>
            <span>S-L MODES ENABLED</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
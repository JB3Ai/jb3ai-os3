import React, { useState, useEffect } from 'react';
import { AppModule } from './types';
import { NeuralCore } from './components/apps/NeuralCore';
import { MediaLab } from './components/apps/MediaLab';
import { MotionLab } from './components/apps/MotionLab';
import { ClientZone } from './components/apps/ClientZone';
import { MarketingLayout } from './layouts/MarketingLayout';
import { DemoLayout } from './layouts/DemoLayout';
import { DemoGateModal } from './components/apps/DemoGateModal';
import SectionVisual from './components/sections/SectionVisual';
import { 
  Cpu, Disc, ShieldCheck, Activity, ArrowRight, Zap, Target, Layers, Box, LogOut, ShieldAlert, Fingerprint, Search, Brain, ExternalLink, ArrowUpRight, Shield, Database, Globe, Mail, User, Building, MessageSquare
} from 'lucide-react';

// --- SEO and Metadata Configuration ---
const PAGE_METADATA: Record<AppModule, { title: string; description: string; robots?: string; path?: string }> = {
  [AppModule.HOME]: {
    title: "JB³Ai | OS³ Dash — Managed Intelligence for Business",
    description: "A unified operating environment for intelligence, production, and security. OS³ Dash brings clarity, control, and governed access to modern work.",
    path: ""
  },
  [AppModule.OS3_INFO]: {
    title: "OS³ Dash | A Managed Operating Environment",
    description: "OS³ Dash is a unified system for business intelligence, media production, and secure access. Designed for clarity, governance, and scale.",
    path: "os3"
  },
  [AppModule.APPS_LIST]: {
    title: "Applications | JB³Ai",
    description: "Explore JB³Ai applications integrated into OS³ Dash, including Investigator AI, Shield AI, and MindCare AI.",
    path: "apps"
  },
  [AppModule.SERVICES_HUB]: {
    title: "Services | JB³Ai",
    description: "Consulting, automation, and advisory services to design, deploy, and govern intelligent systems.",
    path: "services"
  },
  [AppModule.INVESTIGATOR_AI]: {
    title: "Investigator AI | JB³Ai Application",
    description: "Deep-search forensic tool for internal data discovery and trend synthesis across silos.",
    path: "apps/investigator-ai"
  },
  [AppModule.SHIELD_AI]: {
    title: "Shield AI | JB³Ai Application",
    description: "Real-time governance monitoring and automated compliance reporting for all AI outputs.",
    path: "apps/shield-ai"
  },
  [AppModule.MINDCARE_AI]: {
    title: "MindCare AI | JB³Ai Application",
    description: "Supportive intelligence layer for team wellness and cognitive load optimization in high-stakes environments.",
    path: "apps/mindcare-ai"
  },
  [AppModule.CONSULTING]: {
    title: "Consulting | JB³Ai Services",
    description: "Strategic advisory services to design, deploy, and govern intelligent systems.",
    path: "services/consulting"
  },
  [AppModule.ACCELERATOR]: {
    title: "Accelerator | JB³Ai Services",
    description: "A high-speed development framework for building and deploying custom internal OS extensions.",
    path: "services/accelerator"
  },
  [AppModule.CONTACT]: {
    title: "Contact | JB³Ai",
    description: "Request technical briefings and engage with the JB³Ai advisory team.",
    path: "contact"
  },
  [AppModule.WORKSPACE]: {
    title: "OS³ Dash Demo | JB³Ai",
    description: "Demonstration environment for OS³ Dash. Access is gated and governed.",
    path: "demo",
    robots: "noindex, nofollow"
  },
  [AppModule.NEURAL_CORE]: {
    title: "Neural Core | JB³Ai",
    description: "Central intelligence sync and neural processing unit for OS³ Dash.",
    robots: "noindex, nofollow"
  },
  [AppModule.MEDIA_LAB]: {
    title: "Media Lab | JB³Ai",
    description: "High-fidelity institutional asset rendering and media synthesis.",
    robots: "noindex, nofollow"
  },
  [AppModule.MOTION_LAB]: {
    title: "Motion Lab | JB³Ai",
    description: "VEO Loop Engine for institutional motion asset synthesis.",
    robots: "noindex, nofollow"
  },
  [AppModule.CLIENT_ZONE]: {
    title: "Client Zone | JB³Ai",
    description: "Secure client portal for institutional workspace management.",
    robots: "noindex, nofollow"
  }
};

// --- Structured Data Generators ---
const getStructuredData = (module: AppModule) => {
  const baseData = {
    "@context": "https://schema.org",
  };

  const breadcrumb = (items: { name: string; item: string }[]) => ({
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": `https://jb3ai.com/${it.item}`
    }))
  });

  const schemas: any[] = [];

  if (module === AppModule.HOME) {
    schemas.push({
      ...baseData,
      "@type": "Organization",
      "name": "JB³Ai",
      "url": "https://jb3ai.com",
      "description": PAGE_METADATA[AppModule.HOME].description
    });
  }

  if (module === AppModule.OS3_INFO) {
    schemas.push({
      ...baseData,
      "@type": "Product",
      "name": "OS³ Dash",
      "description": PAGE_METADATA[AppModule.OS3_INFO].description,
      "brand": { "@type": "Brand", "name": "JB³Ai" }
    });
    schemas.push(breadcrumb([{ name: "Home", item: "" }, { name: "OS³ Dash", item: "os3" }]));
  }

  if (module === AppModule.APPS_LIST) {
    schemas.push(breadcrumb([{ name: "Home", item: "" }, { name: "Applications", item: "apps" }]));
  }

  if (module === AppModule.SERVICES_HUB) {
    schemas.push(breadcrumb([{ name: "Home", item: "" }, { name: "Services", item: "services" }]));
  }

  const appModules = [AppModule.INVESTIGATOR_AI, AppModule.SHIELD_AI, AppModule.MINDCARE_AI];
  if (appModules.includes(module)) {
    const meta = PAGE_METADATA[module];
    schemas.push({
      ...baseData,
      "@type": "SoftwareApplication",
      "name": meta.title.split(' | ')[0],
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": meta.description
    });
    schemas.push(breadcrumb([
      { name: "Home", item: "" },
      { name: "Applications", item: "apps" },
      { name: meta.title.split(' | ')[0], item: meta.path || "" }
    ]));
  }

  const svcModules = [AppModule.CONSULTING, AppModule.ACCELERATOR];
  if (svcModules.includes(module)) {
    const meta = PAGE_METADATA[module];
    schemas.push(breadcrumb([
      { name: "Home", item: "" },
      { name: "Services", item: "services" },
      { name: meta.title.split(' | ')[0], item: meta.path || "" }
    ]));
  }

  return schemas;
};

// --- Intersection Observer Hook ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- UI Components ---
const DashboardBackdrop: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => (
  <div 
    className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none grayscale brightness-[0.2]"
    style={{ 
      backgroundImage: "url('/media/hero/os3-core-static-v2.webp')",
      opacity: opacity,
      mixBlendMode: 'luminosity'
    }}
  />
);

const SectionHeader: React.FC<{ num: string; title: string }> = ({ num, title }) => (
  <h2 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-4 scroll-reveal pt-12 relative z-10">
    <div className="w-12 h-[1px] bg-gray-800" /> {num} — {title}
  </h2>
);

const SectionDivider: React.FC<{ height?: string }> = ({ height = "140px md:h-[240px] lg:h-[320px]" }) => (
  <div 
    className={`w-full bg-cover bg-center ${height.includes('px') ? '' : height}`}
    style={{ 
      backgroundColor: 'transparent',
      backgroundImage: "url('/media/hero/os3-core-static-v2.webp')",
      height: height.includes('px') ? height : undefined,
      opacity: 0.2
    }}
  />
);

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>(AppModule.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'s' | 'l'>('s');
  const [leadData, setLeadData] = useState<any>(() => {
    const saved = localStorage.getItem('jb3ai_lead');
    return saved ? JSON.parse(saved) : null;
  });
  const [showGateModal, setShowGateModal] = useState(false);

  useEffect(() => { document.documentElement.className = `font-${fontSize}`; }, [fontSize]);

  // --- Dynamic Metadata Handling ---
  useEffect(() => {
    const metadata = PAGE_METADATA[activeModule];
    if (metadata) {
      document.title = metadata.title;
      
      // Update Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', metadata.description);

      // Update Robots Meta Tag
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (metadata.robots) {
        if (!metaRobots) {
          metaRobots = document.createElement('meta');
          metaRobots.setAttribute('name', 'robots');
          document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', metadata.robots);
      } else if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }

      // Update Canonical Link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (metadata.path !== undefined) {
        if (!canonicalLink) {
          canonicalLink = document.createElement('link');
          canonicalLink.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalLink);
        }
        const fullUrl = `https://jb3ai.com/${metadata.path}`;
        canonicalLink.setAttribute('href', fullUrl);
      } else if (canonicalLink) {
        canonicalLink.remove();
      }

      // --- Structured Data (JSON-LD) ---
      document.querySelectorAll('script[data-schema="jb3-schema"]').forEach(s => s.remove());
      const schemas = getStructuredData(activeModule);
      schemas.forEach(schemaObj => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', 'jb3-schema');
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [activeModule]);

  const navigate = (m: AppModule) => {
    if ([AppModule.WORKSPACE, AppModule.NEURAL_CORE, AppModule.MEDIA_LAB, AppModule.MOTION_LAB].includes(m) && !leadData) {
      setShowGateModal(true);
      return;
    }
    setActiveModule(m);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const clearDemoData = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('jb3ai_lead');
    setLeadData(null);
    setActiveModule(AppModule.HOME);
  };

  const handleGateSubmit = (data: any) => {
    setLeadData(data);
    setShowGateModal(false);
    setActiveModule(AppModule.WORKSPACE);
    window.scrollTo(0, 0);
  };

  const isDemoLayout = [AppModule.WORKSPACE, AppModule.NEURAL_CORE, AppModule.MEDIA_LAB, AppModule.MOTION_LAB, AppModule.CLIENT_ZONE].includes(activeModule);

  const renderContent = () => {
    switch (activeModule) {
      case AppModule.HOME: return <HomePage onNavigate={navigate} />;
      case AppModule.OS3_INFO: return <OS3DashInfoPage onNavigate={navigate} />;
      case AppModule.APPS_LIST: return <AppsListPage onNavigate={navigate} />;
      case AppModule.SERVICES_HUB: return <ServicesHubPage onNavigate={navigate} />;
      case AppModule.CONTACT: return <ContactPage onNavigate={navigate} />;
      case AppModule.INVESTIGATOR_AI:
      case AppModule.SHIELD_AI:
      case AppModule.MINDCARE_AI:
      case AppModule.CONSULTING:
      case AppModule.ACCELERATOR:
        return <GenericDetailPage module={activeModule} onNavigate={navigate} />;
      case AppModule.NEURAL_CORE: return <NeuralCore />;
      case AppModule.MEDIA_LAB: return <MediaLab />;
      case AppModule.MOTION_LAB: return <MotionLab />;
      case AppModule.CLIENT_ZONE: return <ClientZone />;
      case AppModule.WORKSPACE: return (
        <div className="h-full overflow-y-auto px-8 md:px-20 py-20 space-y-32 relative">
          <DashboardBackdrop opacity={0.06} />
          
          <div className="text-center space-y-6 relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-4 text-[10px] text-cyan-500 font-mono uppercase tracking-[0.3em] bg-cyan-500/5 py-2 px-8 border border-cyan-500/20 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4" /> System Integrity Validated
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">OS³ Dash Demo Mode</h1>
            <p className="text-sm text-gray-500 font-light leading-relaxed max-w-2xl mx-auto uppercase tracking-wider">
              Simulation environment initialized. Internal metadata and governance protocols are active.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 relative z-10 max-w-6xl mx-auto bg-gray-900/20 border border-gray-900">
            <button onClick={() => navigate(AppModule.NEURAL_CORE)} className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 last:border-0">
              <div className="icon-plate"><Cpu /></div>
              <div className="space-y-4">
                <h3 className="text-white text-xs uppercase font-bold tracking-widest">Neural Core</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Intelligence Sync — Level 01 Access</p>
              </div>
            </button>
            <button onClick={() => navigate(AppModule.MEDIA_LAB)} className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 last:border-0">
              <div className="icon-plate"><Disc /></div>
              <div className="space-y-4">
                <h3 className="text-white text-xs uppercase font-bold tracking-widest">Media Lab</h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">Asset Rendering — Level 01 Access</p>
              </div>
            </button>
            <button onClick={() => navigate(AppModule.MOTION_LAB)} className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-b border-gray-900 last:border-0 lg:border-r-0">
              <div className="icon-plate"><Box /></div>
              <div className="space-y-4">
                <h3 className="text-white text-xs uppercase font-bold tracking-widest">Motion Lab</h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">VEO Loop Synth — Level 01 Access</p>
              </div>
            </button>
          </div>

          <div className="flex flex-col items-center gap-12 pt-20 border-t border-gray-900 relative z-10 max-w-4xl mx-auto">
             <button onClick={() => navigate(AppModule.OS3_INFO)} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group">
                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> Return to Primary Enclave
              </button>
              <button onClick={clearDemoData} className="text-[9px] font-mono text-gray-700 hover:text-red-500 uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                <LogOut className="w-3 h-3" /> Clear Demo Data
              </button>
          </div>
        </div>
      );
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <>
      <DemoGateModal 
        isOpen={showGateModal} 
        onCancel={() => setShowGateModal(false)} 
        onSubmit={handleGateSubmit}
      />
      {isDemoLayout ? (
        <DemoLayout activeModule={activeModule} navigate={navigate}>
          {renderContent()}
        </DemoLayout>
      ) : (
        <MarketingLayout 
          activeModule={activeModule} 
          navigate={navigate} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          fontSize={fontSize} 
          setFontSize={setFontSize}
        >
          {renderContent()}
        </MarketingLayout>
      )}
    </>
  );
};

// Internal Page Components
const HomePage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  useScrollReveal();
  const USE_MOTION = false;

  return (
    <div className="w-full">
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-10 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {USE_MOTION ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
              <source src="/media/sections/os3-core-loop-v1.mp4" type="video/mp4" />
            </video>
          ) : (
            <img 
              src="/media/hero/os3-core-static-v2.webp" 
              alt="JB³Ai OS³ Monolith Core" 
              className="w-full h-full object-cover opacity-30" 
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] animate-pulse z-[2] pointer-events-none" />

        <div className="space-y-12 scroll-reveal relative z-[10]">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">
            <Zap className="w-4 h-4 text-cyan-400" /> OS³ Stable v2.0
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-[0.9] max-w-4xl mx-auto drop-shadow-2xl">
            Intelligence <br /> <span className="text-gray-500">Managed.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            The central operating layer for professional teams requiring high-fidelity intelligence, security, and asset production.
          </p>
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
            <button onClick={() => onNavigate(AppModule.WORKSPACE)} className="bg-white text-black px-16 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl">
              Launch Demo
            </button>
            <button onClick={() => onNavigate(AppModule.OS3_INFO)} className="border border-gray-100/20 text-white px-16 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all backdrop-blur-sm">
              Explore OS³
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-10">
        <SectionVisual 
          videoSrc="/media/sections/os3-core-loop-v1.mp4" 
          imageSrc="/media/hero/os3-core-static-v2.webp" 
          label="OS³ SYSTEM CORE INTEGRITY v2.0" 
        />
      </div>

      <SectionDivider height="200px" />

      <section className="w-full bg-[#050505] py-32 flex justify-center">
        <div className="max-w-6xl w-full px-10 space-y-16">
          <SectionHeader num="01" title="CORE PHILOSOPHY" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-sm leading-relaxed text-gray-400">
            <div className="space-y-8 scroll-reveal">
              <h3 className="text-white uppercase tracking-widest text-base font-bold">Unified Governance</h3>
              <p>
                Fragmentation is the primary cause of operational friction. JB³Ai unifies your strategic tools into a single, governed kernel, ensuring every interaction adheres to institutional policy.
              </p>
              <button onClick={() => onNavigate(AppModule.SHIELD_AI)} className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                Explore Shield AI <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-8 scroll-reveal">
              <h3 className="text-white uppercase tracking-widest text-base font-bold">Technical Integrity</h3>
              <p>
                High-fidelity output requires high-fidelity input. Our systems are built on specialized AI models that go beyond standard general-purpose reasoning to deliver forensic precision.
              </p>
              <button onClick={() => onNavigate(AppModule.INVESTIGATOR_AI)} className="text-cyan-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                Explore Investigator AI <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      <section className="w-full bg-[#080808] py-1 flex justify-center">
        <div className="max-w-7xl w-full px-10 grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-900/50">
          {[
            { icon: <Target />, title: "Precision", desc: "Atomic synthesis via the Neural Core. Every response is verified." },
            { icon: <ShieldCheck />, title: "Security", desc: "Policy-governed with Shield AI. Real-time threat detection." },
            { icon: <Layers />, title: "Scaling", desc: "Growth via the Accelerator. Modular OS components that expand." }
          ].map((feat, i) => (
            <div key={i} className="bg-[#050505] p-20 space-y-8 scroll-reveal text-center md:text-left border-gray-900 border">
              <div className="text-gray-500 scale-150 origin-left">{feat.icon}</div>
              <h4 className="text-white uppercase tracking-widest text-base font-bold">{feat.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const OS3DashInfoPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  useScrollReveal();
  return (
    <div className="w-full relative overflow-hidden">
      <DashboardBackdrop opacity={0.06} />
      <div className="max-w-5xl mx-auto py-32 px-10 space-y-40 text-gray-400 leading-relaxed text-sm relative z-10">
        <header className="space-y-10 pb-20 border-b border-gray-900 scroll-reveal text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">OS³ Dash</h1>
          <p className="text-base text-gray-500 font-light tracking-tight max-w-2xl mx-auto leading-snug uppercase tracking-widest">
            The central operating system for professional work. Unifying intelligence, production, and security into a single, controlled environment.
          </p>
        </header>

        <section className="space-y-16 scroll-reveal">
          <SectionHeader num="01" title="UNIFIED KERNEL" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h3 className="text-white uppercase tracking-widest text-base font-bold">Central Intelligence Sync</h3>
              <p>
                OS³ Dash represents the culmination of years of technical research into high-fidelity business systems. It centralizes your AI stack into a single interface governed by Shield AI.
              </p>
              <ul className="space-y-4 text-xs font-mono uppercase tracking-widest text-gray-500">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-cyan-500" /> Private Neural Enclaves</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-cyan-500" /> Private Private Data Silos</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-cyan-500" /> Automated Audit Logging</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <button onClick={() => onNavigate(AppModule.WORKSPACE)} className="bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-widest shadow-2xl transition-all hover:bg-gray-200">Request Access</button>
              <button onClick={() => onNavigate(AppModule.APPS_LIST)} className="border border-gray-800 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Explore Modules</button>
            </div>
          </div>
        </section>

        <section className="space-y-16 scroll-reveal">
           <SectionHeader num="02" title="MANAGED GOVERNANCE" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <Shield className="w-8 h-8 text-cyan-500" />
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">Real-time Policy</h4>
                <p className="text-xs leading-relaxed">Continuous monitoring of all intelligence outputs against institutional safety protocols.</p>
              </div>
              <div className="space-y-6">
                <Database className="w-8 h-8 text-cyan-500" />
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">Data Sovereignty</h4>
                <p className="text-xs leading-relaxed">Private-cloud deployments ensuring that your institutional data never leaves your defined perimeter.</p>
              </div>
              <div className="space-y-6">
                <Globe className="w-8 h-8 text-cyan-500" />
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">Global Audit</h4>
                <p className="text-xs leading-relaxed">Centralized oversight for multi-region teams with granular access controls and identity management.</p>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

const AppsListPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  useScrollReveal();
  const apps = [
    { id: AppModule.INVESTIGATOR_AI, icon: <Search className="w-6 h-6" />, title: "Investigator AI", desc: "Forensic data discovery and cross-silo synthesis." },
    { id: AppModule.SHIELD_AI, icon: <ShieldAlert className="w-6 h-6" />, title: "Shield AI", desc: "Governance monitoring and automated compliance reporting." },
    { id: AppModule.MINDCARE_AI, icon: <Brain className="w-6 h-6" />, title: "MindCare AI", desc: "Cognitive load optimization and team wellness support." }
  ];

  return (
    <div className="w-full bg-[#050505] min-h-[80vh] py-32 px-10 relative overflow-hidden">
      <DashboardBackdrop opacity={0.04} />
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        <header className="space-y-6 scroll-reveal text-center">
           <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">Applications</h1>
           <p className="text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">A specialized suite of intelligent modules designed for institutional scale and precision.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-gray-900/40 border border-gray-900">
          {apps.map((app) => (
            <div 
              key={app.id} 
              className="bg-[#050505] p-16 space-y-10 scroll-reveal group cursor-pointer hover:bg-white/5 transition-all" 
              onClick={() => onNavigate(app.id)}
            >
              <div className="text-gray-600 group-hover:text-cyan-500 transition-colors transform group-hover:scale-110 origin-left duration-500">
                {app.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-white uppercase tracking-[0.2em] text-sm font-bold">{app.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wider">{app.desc}</p>
              </div>
              <div className="pt-4">
                <div className="text-cyan-500 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 group-hover:text-white transition-colors">
                  Initialize <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="pt-20 scroll-reveal">
           <div className="p-16 border border-gray-900 bg-gray-900/10 space-y-8">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">Module Framework Expansion</h3>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest max-w-3xl">
                Additional modules for financial forensics, creative asset orchestration, and supply-chain intelligence are currently in briefing. Custom module development is available via the Accelerator Program.
              </p>
              <button onClick={() => onNavigate(AppModule.ACCELERATOR)} className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-colors">Learn more about custom development</button>
           </div>
        </section>
      </div>
    </div>
  );
};

const ServicesHubPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  useScrollReveal();
  const services = [
    { id: AppModule.CONSULTING, icon: <Target className="w-6 h-6" />, title: "Strategy & Consulting", desc: "Advisory services for intelligent system design and deployment." },
    { id: AppModule.ACCELERATOR, icon: <Layers className="w-6 h-6" />, title: "Accelerator Program", desc: "High-speed development framework for custom internal extensions." }
  ];

  return (
    <div className="w-full bg-[#050505] min-h-[80vh] py-32 px-10 relative overflow-hidden">
      <DashboardBackdrop opacity={0.04} />
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        <header className="space-y-6 scroll-reveal text-center">
           <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">Technical Services</h1>
           <p className="text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">Managed services to design, deploy, and govern intelligent operating systems for institutional scale.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-gray-900/40 border border-gray-900">
          {services.map((svc) => (
            <div 
              key={svc.id} 
              className="bg-[#050505] p-20 space-y-10 scroll-reveal group cursor-pointer hover:bg-white/5 transition-all" 
              onClick={() => onNavigate(svc.id)}
            >
              <div className="text-gray-600 group-hover:text-purple-500 transition-colors transform group-hover:scale-110 origin-left duration-500">
                {svc.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-white uppercase tracking-[0.2em] text-base font-bold">{svc.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">{svc.desc}</p>
              </div>
              <div className="pt-4">
                <div className="text-purple-500 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 group-hover:text-white transition-colors">
                  Briefing <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="pt-20 scroll-reveal">
           <div className="p-16 border border-gray-900 bg-gray-900/10 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">Global Deployment Capacity</h3>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
                  Our engineering team provides end-to-end deployment support across on-premise, hybrid, and private-cloud environments.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <button onClick={() => onNavigate(AppModule.CONTACT)} className="bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all">Engage Advisory Team</button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

const ContactPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Contact submission:", formData);
    setIsSent(true);
  };

  return (
    <div className="w-full bg-[#050505] min-h-screen relative overflow-hidden">
      <DashboardBackdrop opacity={0.06} />
      <div className="max-w-4xl mx-auto py-32 px-10 space-y-24 relative z-10">
        <header className="space-y-8 scroll-reveal">
          <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Contact Advisory</h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl uppercase tracking-tight">
            Engage with our strategic team for institutional implementation briefings.
          </p>
        </header>

        {isSent ? (
          <div className="p-12 border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 space-y-4 scroll-reveal">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em]">Briefing Requested</h3>
            <p className="text-xs uppercase tracking-widest leading-relaxed">Your request has been logged. An advisory officer will contact you within one business cycle.</p>
            <button onClick={() => onNavigate(AppModule.HOME)} className="text-[10px] font-bold uppercase tracking-[0.4em] mt-8 hover:text-white transition-colors flex items-center gap-4">
              <ArrowRight className="w-3 h-3 rotate-180" /> Return to Terminal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10 scroll-reveal">
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
                  onChange={e => setFormData({...formData, name: e.target.value})}
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
                  onChange={e => setFormData({...formData, email: e.target.value})}
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
                onChange={e => setFormData({...formData, organization: e.target.value})}
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
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="pt-8">
              <button 
                type="submit"
                className="w-full md:w-auto px-20 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98]"
              >
                Transmit Briefing Request
              </button>
            </div>
          </form>
        )}

        <section className="pt-20 scroll-reveal opacity-40">
           <div className="p-12 border-l border-gray-900 space-y-6">
              <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest font-mono">Enclave Communications</h4>
              <p className="text-[10px] text-gray-700 leading-relaxed uppercase tracking-[0.2em] font-mono">
                Direct engagement is conducted via secure lines. Briefing requests are prioritized by organizational alignment and security clearance.
              </p>
           </div>
        </section>
      </div>
    </div>
  );
};

const GenericDetailPage: React.FC<{ module: AppModule; onNavigate: (m: AppModule) => void }> = ({ module, onNavigate }) => {
  useScrollReveal();
  const meta = PAGE_METADATA[module] || { title: "Technical Briefing", description: "Operational details for this module are currently in preparation." };
  
  return (
    <div className="w-full bg-[#050505] min-h-screen relative overflow-hidden">
      <DashboardBackdrop opacity={0.06} />
      <div className="max-w-4xl mx-auto py-32 px-10 space-y-24 relative z-10">
        <button 
          onClick={() => onNavigate(AppModule.HOME)} 
          className="text-[10px] text-gray-600 uppercase tracking-[0.4em] flex items-center gap-4 hover:text-white transition-colors group"
        >
          <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-2 transition-transform" /> Return to Terminal
        </button>
        
        <div className="space-y-12 scroll-reveal">
          <div className="w-16 h-[1px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">
            {meta.title.split(' | ')[0]}
          </h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl uppercase tracking-tight">
            {meta.description}
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-24 border-t border-gray-900 scroll-reveal">
           <div className="space-y-8">
             <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Operational Framework</h3>
             <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
               This module is fully integrated into the OS³ Dash unified kernel, ensuring seamless intelligence synchronization and secure data governance across all institutional silos. Deployment is verified via private neural enclave protocol.
             </p>
             <ul className="space-y-4 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-800" /> End-to-end Encryption</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-800" /> Identity Provider Sync</li>
               <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-800" /> Zero-knowledge Architecture</li>
             </ul>
           </div>
           <div className="flex flex-col justify-end gap-6">
             <button 
               onClick={() => onNavigate(AppModule.WORKSPACE)} 
               className="bg-white text-black px-12 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
             >
               Initialize Live Demo
             </button>
             <button 
               onClick={() => onNavigate(AppModule.CONTACT)} 
               className="border border-gray-800 text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
             >
               Request White Paper
             </button>
           </div>
        </section>

        {/* Calm Placeholder for missing specific content */}
        <section className="pt-20 scroll-reveal opacity-40">
           <div className="p-12 border-l border-gray-900 space-y-6">
              <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Technical Specifications</h4>
              <p className="text-[10px] text-gray-700 leading-relaxed uppercase tracking-[0.2em] font-mono">
                Full API documentation and governance parameters for the {meta.title.split(' | ')[0]} module are available upon request through the advisory portal. Technical briefings are conducted under NDA.
              </p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default App;
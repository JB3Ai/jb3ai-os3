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

const CtaBlock: React.FC<{
  onNavigate: (m: AppModule) => void;
  type?: 'primary' | 'alternative' | 'minimal';
  className?: string;
  align?: 'center' | 'left';
  hideMain?: boolean;
}> = ({ onNavigate, type = 'primary', className = "", align = 'center', hideMain = false }) => {
  const alignmentClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const flexAlignment = align === 'center' ? 'justify-center' : 'justify-start';

  if (type === 'minimal') {
    return (
      <div className={`flex flex-col sm:flex-row items-center gap-6 ${flexAlignment} ${className}`}>
        <button onClick={() => onNavigate(AppModule.WORKSPACE)} className="bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Initialize Demo</button>
        <button onClick={() => onNavigate(AppModule.CONTACT)} className="border border-white/10 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Book Advisor</button>
      </div>
    );
  }

  const config = {
    primary: {
      main: { label: "Initialize Live Demo", sub: "Enter the governed operating environment." },
      sec: { label: "Book Technical Briefing", sub: "Architecture, risk, and deployment guidance." },
      trust: "This is a governed operational environment. System integrity is verified."
    },
    alternative: {
      main: { label: "Explore OS³ Demo", sub: "Experience the operating layer behind governed intelligence." },
      sec: { label: "Speak With an Advisor", sub: "Architecture, risk, and deployment guidance." },
      trust: "Demonstrations use sandboxed data. Live access provided by request."
    }
  }[type === 'alternative' ? 'alternative' : 'primary'];

  return (
    <div className={`space-y-12 ${alignmentClass} ${className}`}>
      <div className={`flex flex-col md:flex-row items-start ${flexAlignment} gap-12 w-full`}>
        {!hideMain && (
          <div className={`space-y-4 flex flex-col ${alignmentClass} group w-full md:w-auto md:max-w-[320px]`}>
            <button
              onClick={() => onNavigate(AppModule.WORKSPACE)}
              className="w-full bg-white text-black px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
            >
              {config.main.label}
            </button>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium">
              {config.main.sub}
            </p>
          </div>
        )}

        <div className={`space-y-4 flex flex-col ${alignmentClass} group w-full md:w-auto md:max-w-[320px]`}>
          <button
            onClick={() => onNavigate(AppModule.CONTACT)}
            className="w-full border border-white/10 text-white px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-all active:scale-[0.98]"
          >
            {config.sec.label}
          </button>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
            {config.sec.sub}
          </p>
        </div>
      </div>
      <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-mono">
        {config.trust}
      </p>
    </div>
  );
};

const CredibilityStrip: React.FC<{ className?: string; label?: string }> = ({ className = "", label = "OPERATING STANDARD" }) => (
  <div className={`max-w-4xl mx-auto py-10 px-12 border border-gray-900 bg-white/[0.01] relative z-10 scroll-reveal ${className}`}>
    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
      <div className="hidden md:block border-r border-gray-900 pr-8">
        <div className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180 whitespace-nowrap opacity-40">
          {label}
        </div>
      </div>
      <div className="space-y-6">
        <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.4em]">Experience, Posture & Operating Standard</h4>
        <p className="text-xs md:text-[13px] text-gray-500 uppercase tracking-[0.2em] leading-relaxed font-medium">
          JB³Ai operates at the intersection of intelligence, operations, and governance. Our work spans SMEs, enterprises, regulated industries, advisory firms, and high-trust environments where data sensitivity, accountability, and operational clarity are critical. We approach AI as infrastructure, not experimentation. Every system is designed with governance, auditability, and long-term resilience in mind. This posture allows organizations to adopt advanced intelligence capabilities with confidence, control, and measurable outcomes.
        </p>
      </div>
    </div>
  </div>
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
      case AppModule.CONSULTING: return <AdvisoryPage onNavigate={navigate} />;
      case AppModule.INVESTIGATOR_AI:
      case AppModule.SHIELD_AI:
      case AppModule.MINDCARE_AI:
      case AppModule.ACCELERATOR:
        return <GenericDetailPage module={activeModule} onNavigate={navigate} />;
      case AppModule.NEURAL_CORE: return <NeuralCore />;
      case AppModule.MEDIA_LAB: return <MediaLab />;
      case AppModule.MOTION_LAB: return <MotionLab />;
      case AppModule.CLIENT_ZONE: return <ClientZone />;
      case AppModule.WORKSPACE: return (
        <div className="h-full overflow-y-auto px-8 md:px-20 py-20 space-y-32 relative">
          <DashboardBackdrop opacity={0.06} />

          <div className="text-center space-y-12 relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-4 text-[9px] text-emerald-500 font-mono uppercase tracking-[0.4em] bg-emerald-500/5 py-2 px-8 border border-emerald-500/20 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4" /> System Integrity Validated
            </div>
            <div className="space-y-8">
              <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Demonstration <span className="text-gray-500">Access</span></h1>
              <div className="max-w-2xl mx-auto space-y-10">
                <p className="text-sm md:text-base text-white font-bold leading-relaxed uppercase tracking-widest border-y border-white/5 py-10">
                  “This demo is not a prototype. It is a governed operational environment designed to show how intelligence behaves under real constraints.”
                </p>
                <p className="text-[11px] text-gray-400 font-light leading-relaxed uppercase tracking-[0.15em]">
                  Experience the OS³ Dash unified kernel. Witness how multi-source intelligence is consolidated, governed, and localized into actionable decision loops without compromising security.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => {
                  const el = document.getElementById('demo-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all shadow-2xl active:scale-95"
              >
                Initialize Live Demo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 max-w-4xl mx-auto pt-16 border-t border-gray-900/50">
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                What it <span className="text-gray-500">Shows</span>
              </h2>
              <div className="space-y-6">
                <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                  During the demo, you will see how OS³ functions as an operational control layer rather than a traditional dashboard.
                </p>
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-medium leading-relaxed italic border-l border-gray-900 pl-8">
                  The demo uses sandboxed data to illustrate system behavior, flows, and controls without exposing sensitive or proprietary information.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">You will explore:</p>
              <ul className="space-y-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                {[
                  'Consolidation of multi-source intelligence',
                  'Governance boundaries for AI agents & automation',
                  'Identity, access, and decision accountability',
                  'Integration of human oversight & automated execution',
                  'Core kernel sync across all specialized modules'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-cyan-500">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="demo-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 relative z-10 max-w-6xl mx-auto bg-gray-900/20 border border-gray-900">
            <button onClick={() => navigate(AppModule.NEURAL_CORE)} className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 md:last:border-r-0 lg:border-r">
              <div className="icon-plate"><Cpu /></div>
              <div className="space-y-4">
                <h3 className="text-white text-xs uppercase font-bold tracking-widest">Neural Core</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Intelligence Sync — Level 01 Access</p>
              </div>
            </button>
            <button onClick={() => navigate(AppModule.MEDIA_LAB)} className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-r border-b border-gray-900 lg:border-r">
              <div className="icon-plate"><Disc /></div>
              <div className="space-y-4">
                <h3 className="text-white text-xs uppercase font-bold tracking-widest">Media Lab</h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">Asset Rendering — Level 01 Access</p>
              </div>
            </button>
            <button onClick={() => navigate(AppModule.MOTION_LAB)} className="group p-12 bg-black/40 hover:bg-white/5 transition-all space-y-8 text-left border-b border-gray-900 lg:border-r-0">
              <div className="icon-plate"><Box /></div>
              <div className="space-y-4">
                <h3 className="text-white text-xs uppercase font-bold tracking-widest">Motion Lab</h3>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">VEO Loop Synth — Level 01 Access</p>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 max-w-4xl mx-auto pt-16 border-t border-gray-900/50">
            <div className="space-y-8">
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-4">DEMO BOUNDARIES</div>
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                What it <span className="text-gray-500">Does Not Show</span>
              </h2>
              <div className="space-y-6">
                <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                  The OS³ Demo is intentionally controlled to ensure operational integrity and system security.
                </p>
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-medium leading-relaxed italic border-l border-gray-900 pl-8">
                  This ensures the platform is presented responsibly and that operational integrity is maintained.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Excluded Attributes:</p>
              <ul className="space-y-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                {[
                  'Live institutional or customer data',
                  'Open-ended or unrestricted system access',
                  'Unrestricted configuration of core models',
                  'Commercial pricing or contract terms'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-red-500/50">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 max-w-4xl mx-auto pt-16 border-t border-gray-900/50">
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                Who the <span className="text-gray-500">Demo Is For</span>
              </h2>
              <div className="space-y-6">
                <p className="text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                  The OS³ demo is designed for decision-makers evaluating serious operational systems.
                </p>
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-medium leading-relaxed italic border-l border-gray-900 pl-8">
                  For leadership evaluating OS³ as a strategic operating layer, this demonstration provides critical context for governance and scale.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Strategic Stakeholders:</p>
              <ul className="space-y-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                {[
                  'CEOs & Enterprise Founders',
                  'Operations & Strategy Leadership',
                  'IT, Security & Compliance Officers',
                  'Legal Counsel & Risk Architects',
                  'Organizations requiring governed intelligence'
                ].map((target, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-purple-500">&bull;</span>
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Extensions - Subtle Divider Band */}
          <div className="max-w-4xl mx-auto pt-16 pb-16 border-t border-gray-900/50 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-baseline">
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em] whitespace-nowrap">
                CAPABILITY DISCLOSURE
              </div>
              <div className="space-y-4">
                <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-[0.3em]">
                  Optional Live Demo Extensions
                </h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed max-w-2xl">
                  These specialized modules are available for advisor-led briefings. They demonstrate deep-layer OS³ capabilities and are not included in the standard sandboxed environment.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16">
              {[
                { label: 'Neural Tuning', sub: 'Model Refinement' },
                { label: 'Voice Clone', sub: 'Identity Synth' },
                { label: 'Audit Vault', sub: 'Deep Compliance' },
                { label: 'Hardware Key', sub: 'Physical Auth' }
              ].map((ext, idx) => (
                <div key={idx} className="space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="text-[10px] text-white font-bold uppercase tracking-wider">{ext.label}</div>
                  <div className="text-[9px] text-cyan-500/60 uppercase tracking-widest font-mono">{ext.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto pt-16 border-t border-gray-900/50 space-y-12 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-baseline">
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em] whitespace-nowrap">
                CONTROLLED ENVIRONMENT
              </div>
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest leading-none">
                  Trust, Governance <span className="text-gray-500">& Responsible Access</span>
                </h2>
              </div>
            </div>
            <div className="space-y-16">
              <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
                OS³ is designed for environments where data sensitivity, operational risk, and accountability matter. All demonstrations operate within controlled, sandboxed environments and follow strict governance principles. No live client data is exposed. Access, capabilities, and integrations are intentionally scoped and delivered through advisory review. This approach ensures that intelligence, automation, and decision systems are deployed responsibly, securely, and in alignment with organizational and regulatory expectations.
              </p>

              <CtaBlock onNavigate={navigate} hideMain className="pt-8" />
            </div>
          </div>
          <CredibilityStrip label="CONTROLLED ENVIRONMENT" className="mt-20" />

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
          f-
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
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimateValue = !prefersReducedMotion;
    setShouldAnimate(shouldAnimateValue);

    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <div className="w-full">
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-10 relative overflow-hidden">
        <div className="space-y-12 scroll-reveal relative z-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">
            <Zap className="w-4 h-4 text-cyan-400" /> OS³ Stable v2.0
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-[0.9] max-w-4xl mx-auto drop-shadow-2xl">
            Intelligence <br /> <span className="text-gray-500">Managed.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            The central operating layer for professional teams requiring high-fidelity intelligence, security, and asset production.
          </p>
          <CtaBlock onNavigate={onNavigate} className="pt-12" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-10">
        <SectionVisual
          videoSrc="/media/sections/os3-core-loop-v1.mp4"
          imageSrc="/media/hero/os3-core-static-v2.webp"
          label="OS³ SYSTEM CORE INTEGRITY v2.0"
        />
      </div>

      <section className="w-full py-40 flex justify-center">
        <div className="max-w-4xl w-full px-10 space-y-16">
          <div className="w-12 h-[1px] bg-gray-800 scroll-reveal" />
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
            Why <span className="text-gray-500">OS³ Exists</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 scroll-reveal">
            <div className="space-y-8 text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
              <p>
                Most businesses today operate across dozens of disconnected systems. Data lives in silos. AI tools act independently. Automation runs without shared oversight. As organisations scale, this fragmentation introduces risk, inefficiency, and loss of institutional memory.
              </p>
              <p className="text-white">
                OS³ Dash exists to solve this structural problem.
              </p>
            </div>
            <div className="space-y-8 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
              <p>
                Instead of adding more tools, OS³ unifies them under a governed operating layer. Intelligence is no longer scattered across apps, emails, bots, and scripts. It is centralised, auditable, and aligned with business intent.
              </p>
              <p className="text-gray-400">
                This is what allows organisations to scale AI and automation safely, without chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-40 flex justify-center">
        <div className="max-w-4xl w-full px-10 space-y-16">
          <div className="w-12 h-[1px] bg-gray-800 scroll-reveal" />
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
            What <span className="text-gray-500">OS³ Dash Replaces</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 scroll-reveal">
            <div className="space-y-8">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium">
                OS³ Dash replaces the need for:
              </p>
              <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium">
                {['Multiple unconnected dashboards', 'Standalone AI tools operating without governance', 'Manual oversight of automated workflows', 'Fragmented reporting across departments', 'Ad-hoc security and compliance controls'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-cyan-500 mt-1">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                Rather than stitching systems together after the fact, OS³ provides a single environment where intelligence, production, and security are coordinated from the start.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#050505] py-40 flex justify-center border-t border-gray-900/50">
        <div className="max-w-6xl w-full px-10 space-y-24">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
              Core <span className="text-gray-500">Capabilities</span>
            </h2>
            <div className="space-y-4 max-w-3xl scroll-reveal">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed">
                At the core of OS³ Dash is a unified kernel that synchronises data, intelligence, and execution across all connected modules. From this kernel, organisations can deploy and manage specialised applications without losing central control.
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">Key Platform Capabilities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-900/50 border border-gray-900 scroll-reveal">
            {[
              {
                title: "Unified Intelligence Kernel",
                desc: "All AI activity, automation, and decision flows operate through a single governed layer, ensuring consistency and visibility."
              },
              {
                title: "Application Modules",
                desc: "OS³ Dash supports modular applications including Investigator AI, Shield AI, Media Lab, MindCare AI, and Phone & Voice AI systems. Each module operates independently."
              },
              {
                title: "Governance and Policy Control",
                desc: "Identity, permissions, audit trails, and risk controls are enforced at the system level, not left to individual tools."
              },
              {
                title: "Real-Time Operational Visibility",
                desc: "Executives and operators can see what is running, what decisions are being made, and where intervention is required."
              },
              {
                title: "Secure Deployment Architecture",
                desc: "Designed to support enterprise-grade security models, including encrypted environments and controlled access zones."
              },
              {
                title: "Institutional Scaling",
                desc: "Expand system capabilities via custom extensions and advisor-led enclave deployments tailored to business logic."
              }
            ].map((outcome, idx) => (
              <div key={idx} className="bg-[#050505] p-12 space-y-6 hover:bg-white/[0.02] transition-all group">
                <div className="w-8 h-[1px] bg-cyan-500/50 transition-all group-hover:w-16" />
                <div className="space-y-4">
                  <h3 className="text-white text-xs md:text-sm uppercase font-bold tracking-widest leading-tight">
                    {outcome.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                    {outcome.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#080808] py-40 flex justify-center">
        <div className="max-w-6xl w-full px-10 space-y-24">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
              Products <br /><span className="text-gray-500">& Capabilities</span>
            </h2>
            <p className="text-xs text-gray-600 uppercase tracking-[0.4em] font-bold scroll-reveal">Modular Intelligence Enclaves</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-gray-900/40 border border-gray-900 scroll-reveal">
            {[
              { id: AppModule.INVESTIGATOR_AI, title: "Investigator AI", sub: "Structured Intelligence for Complex Decisions", color: "cyan", desc: "Investigator AI is designed for organisations that need to understand complex situations quickly, accurately, and defensibly. It brings together fragmented data, documents, communications, and signals into a structured intelligence environment where analysis can be trusted." },
              { id: AppModule.SHIELD_AI, title: "Shield AI", sub: "Active Governance & Risk Management", color: "purple", desc: "Shield AI monitors activity, enforces policy, and highlights risk before it becomes a problem. It allows organisations to deploy AI and automation with confidence, knowing that guardrails are always in place." },
              { id: AppModule.MINDCARE_AI, title: "MindCare AI", sub: "Human-Centric Intelligence Support", color: "emerald", desc: "MindCare AI is designed to support people, not replace them. It provides structured, ethical, and human-aware assistance within the OS³ environment." }
            ].map((prod) => (
              <div key={prod.id} className="bg-[#050505] p-16 space-y-8 group hover:bg-white/[0.03] transition-all">
                <div className="space-y-2">
                  <h3
                    onClick={() => onNavigate(prod.id)}
                    className={`text-white text-base md:text-lg uppercase font-bold tracking-widest cursor-pointer hover:text-${prod.color}-400 transition-colors`}
                  >
                    {prod.title}
                  </h3>
                  <p className={`text-[10px] text-${prod.color}-500/60 uppercase tracking-[0.2em] font-bold`}>
                    {prod.sub}
                  </p>
                </div>
                <p className="text-[11px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                  {prod.desc}
                </p>
                <button
                  onClick={() => onNavigate(prod.id)}
                  className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] hover:text-white flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Access Module <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demonstration Access Section - Step 8 */}
      <section className="w-full bg-[#050505] py-40 flex justify-center border-t border-gray-900/50">
        <div className="max-w-4xl w-full px-10 space-y-16 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-12 h-[1px] bg-gray-800 scroll-reveal" />
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
              Demonstration <span className="text-gray-500">Access</span>
            </h2>
          </div>
          <div className="space-y-10 scroll-reveal">
            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-3xl mx-auto">
              The OS³ Demo provides a guided view of the platform’s core capabilities using sandboxed data. It illustrates how intelligence flows, how controls are applied, and how decisions are supported across the system.
            </p>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] italic">
              Live operational access is provided by request and subject to advisory review.
            </p>
          </div>
          <CtaBlock onNavigate={onNavigate} type="alternative" className="pt-12" />
        </div>
      </section>

      {/* Who the Demo Is For - Step 12 */}
      <section className="w-full bg-[#050505] py-40 flex justify-center border-t border-gray-900/50">
        <div className="max-w-4xl w-full px-10 space-y-16">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
              Who the <span className="text-gray-500">Demo Is For</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium scroll-reveal">
              The OS³ Demo is designed for decision-makers evaluating serious operational systems.
              <br /> It is most relevant for:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 scroll-reveal">
            <div className="space-y-8">
              <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium">
                {['CEOs and founders', 'Business and operations leaders', 'IT, security, and compliance executives', 'Legal and risk professionals', 'Organizations scaling AI, automation, or intelligence initiatives'].map((target, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-cyan-500 mt-1">&bull;</span>
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                If you are exploring OS³ as a strategic platform rather than a curiosity, the demo will give you the context you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Model - Step 14 */}
      <section className="w-full bg-[#080808] py-40 flex justify-center border-t border-gray-900/50">
        <div className="max-w-4xl w-full px-10 space-y-16">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
              Engagement <span className="text-gray-500">Model</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium scroll-reveal">
              OS³ Dash is available as a commercial platform, with optional modules and services depending on organisational needs.
              <br /> Companies typically engage in one or more of the following ways:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 scroll-reveal">
            <div className="space-y-8">
              <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium">
                {[
                  'Deploy OS³ Dash as a core operating platform',
                  'Add specialised AI and automation modules',
                  'Engage JB³Ai for system architecture and governance design',
                  'Book advisory sessions for strategy, compliance, or deployment',
                  'Participate in accelerator programs to build custom internal systems'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-purple-500 mt-1">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                Every deployment is structured to balance capability with control, ensuring OS³ grows alongside the organisation it supports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Layer - Step 9 */}
      <section className="w-full bg-[#080808] py-40 flex justify-center border-t border-gray-900/50">
        <div className="max-w-4xl w-full px-10 space-y-12">
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest scroll-reveal leading-none">
              Trust, Governance <span className="text-gray-500">& Responsible Access</span>
            </h2>
          </div>
          <div className="scroll-reveal">
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
              OS³ is designed for environments where data sensitivity, operational risk, and accountability matter. All demonstrations operate within controlled, sandboxed environments and follow strict governance principles. No live client data is exposed. Access, capabilities, and integrations are intentionally scoped and delivered through advisory review. This approach ensures that intelligence, automation, and decision systems are deployed responsibly, securely, and in alignment with organizational and regulatory expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Final Home CTA Block - Step 10 */}
      <section className="w-full bg-[#050505] py-60 flex justify-center border-t border-gray-900/50 relative overflow-hidden">
        <div className="max-w-4xl w-full px-10 space-y-24 relative z-10">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
                How to <span className="text-gray-500">Engage</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-medium scroll-reveal">
                JB³Ai is both a platform provider and a strategic partner. <br /> Organisations can:
              </p>
            </div>

            <div className="scroll-reveal">
              <ul className="space-y-4 text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] font-medium border-l border-gray-900 pl-8">
                {[
                  'Explore OS³ through a sandbox demo',
                  'Deploy OS³ Dash as a core operating platform',
                  'Add specialised AI and automation modules',
                  'Book advisory sessions for architecture, governance, or compliance',
                  'Engage in accelerator programs to build custom internal systems'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-white/20 mt-1">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic scroll-reveal">
              Every engagement is designed to align technology with accountability.
            </p>
          </div>

          <div className="pt-24 border-t border-gray-900/50 space-y-16 text-center">
            <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter scroll-reveal leading-none">
              Experience <span className="text-gray-500">OS³</span>
            </h3>

            <CtaBlock onNavigate={onNavigate} className="pt-8" />
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
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
        <header className="space-y-16 pb-24 border-b border-gray-900 scroll-reveal">
          <div className="space-y-6 text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">OS³ Dash</h1>
            <p className="text-sm md:text-base text-cyan-500 font-bold tracking-[0.3em] uppercase">The Operating System for Governed Intelligence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <p className="text-base md:text-lg text-white font-light leading-relaxed uppercase tracking-tight">
              OS³ Dash is a unified operating environment designed for modern businesses that need intelligence, automation, and security to work together without losing control. It is not another dashboard layered on top of tools. It is the system that governs how those tools, data sources, AI models, and people interact inside your organisation.
            </p>
            <div className="space-y-8">
              <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                Built by JB³Ai, OS³ Dash provides a single command center where intelligence is generated, decisions are executed, and risk is managed in real time. Everything operates through a controlled kernel that enforces policy, visibility, and accountability by design.
              </p>
              <div className="w-12 h-[1px] bg-gray-800" />
            </div>
          </div>
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
            <div className="flex flex-col justify-center">
              <CtaBlock onNavigate={onNavigate} align="left" />
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

        <section className="space-y-16 scroll-reveal pt-24 border-t border-gray-900">
          <SectionHeader num="03" title="SANDBOX ACCESS" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-white uppercase tracking-widest text-base font-bold">The OS³ Sandbox Demo</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                  When you click View OS³ Demo, you are entering a sandbox clone of the OS³ Dash environment.
                </p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
                This demo is a guided, read-only experience designed to show how the system operates in practice. It includes pre-configured modules, simulated data, and example workflows that reflect real-world use cases.
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] italic">
                The sandbox resets automatically and does not affect live systems. It is intended to demonstrate capability, not replace a tailored deployment.
              </p>
            </div>

            <div className="space-y-10">
              <div className="space-y-6">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Within the demo, you can explore:</p>
                <ul className="space-y-4 text-xs font-medium uppercase tracking-widest text-gray-500 border-l border-gray-900 pl-8">
                  {['The OS³ Dash interface and navigation', 'Media Lab production workflows', 'Intelligence and investigation scenarios', 'Automated system interactions'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-1.5 h-[1px] bg-cyan-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10">
                <CtaBlock onNavigate={onNavigate} align="left" />
              </div>
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
              <CtaBlock onNavigate={onNavigate} align="left" />
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
          <div className="flex flex-col justify-end pt-8">
            <CtaBlock onNavigate={onNavigate} align="left" />
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

const AdvisoryPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  useScrollReveal();
  return (
    <div className="w-full relative overflow-hidden bg-[#050505]">
      <DashboardBackdrop opacity={0.06} />

      {/* Section 1. Advisory Hero - Full-width, Left-aligned */}
      <section className="w-full py-40 px-10 border-b border-gray-900 scroll-reveal relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
              Consulting <br /> & Advisory
            </h1>
            <p className="text-sm md:text-lg text-cyan-500 font-bold tracking-[0.4em] uppercase">(The 40/40/20 Method)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter uppercase leading-tight">
              Structure <br /> <span className="text-gray-500">Before Software.</span>
            </h2>
            <div className="space-y-10">
              <p className="text-lg md:text-xl text-white font-light leading-relaxed uppercase tracking-tight">
                We believe that AI is not the product; structure is the product. Through our 40/40/20 Systems Model, we dedicate 40% of our focus to Advisory and Design to ensure your business architecture is optimized before any technology is deployed.
              </p>
              <p className="text-sm md:text-base text-gray-400 uppercase tracking-[0.15em] leading-relaxed">
                Our master tune-up service includes business diagnostics and systems alignment sessions to ensure the OS³ Dashboard and its AI Agents serve a coherent, high-performance strategy.
              </p>

              <div className="pt-8">
                <button
                  onClick={() => onNavigate(AppModule.CONTACT)}
                  className="bg-white text-black px-16 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
                >
                  Book Expert Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto py-32 px-10 space-y-40 relative z-10">
        {/* Section 2. How Engagement Works - Standard width, Narrative paragraphs */}
        <section className="space-y-16 scroll-reveal">
          <SectionHeader num="01" title="HOW ENGAGEMENT WORKS" />
          <div className="max-w-3xl space-y-12">
            <div className="space-y-8">
              <h3 className="text-white uppercase tracking-widest text-base font-bold leading-tight">
                Structured, Outcome-Driven, <span className="text-gray-500">and Controlled</span>
              </h3>
              <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                Engagements typically begin with an advisory conversation to assess suitability and scope. This is followed by a guided demonstration and a structured discovery process focused on operational reality, not theoretical use cases.
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium">
                Once alignment is confirmed, we define a deployment approach that may include OS³ Dash configuration, module selection, governance design, and phased rollout.
              </p>
            </div>

            <div className="space-y-8 border-t border-gray-900 pt-12">
              <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                Implementations are supported by advisory oversight to ensure adoption, clarity, and long-term operational integrity.
              </p>
              <p className="text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed font-bold">
                For organizations requiring deeper involvement, JB³Ai provides ongoing advisory, optimization, and acceleration services. This ensures the system evolves alongside the organization, rather than becoming static or misaligned over time.
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                No two engagements are identical. OS³ is flexible by design, but never deployed without structure.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-16 scroll-reveal">
          <SectionHeader num="02" title="WHO IT'S FOR" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="space-y-10">
              <h3 className="text-white uppercase tracking-widest text-base font-bold leading-tight">
                Organizations That Require <br /> <span className="text-gray-500">Control, Not Experiments</span>
              </h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                JB³Ai Advisory is designed for leaders and organizations operating in complex, high-trust, or high-risk environments.
              </p>
              <p className="text-base text-gray-400 font-light leading-relaxed uppercase tracking-tight">
                We work with CEOs, founders, business owners, executives, operators, IT and security leaders, legal professionals, and advisory teams.
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium">
                Our clients range from SMEs scaling operations to enterprises managing distributed intelligence, automation, and governance across teams or regions.
              </p>
              <p className="text-sm text-gray-400 uppercase tracking-[0.15em] leading-relaxed italic border-l border-gray-900 pl-8">
                If your organization values accountability, clarity, and long-term operational resilience, advisory-led engagement ensures that technology remains a strategic asset.
              </p>
            </div>

            {/* Subtle divider/neutral visual for Section 3 */}
            <div className="hidden md:flex h-full min-h-[400px] items-center justify-center border-l border-gray-900 pl-20 pointer-events-none">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-900 to-transparent opacity-50" />
              <div className="absolute opacity-[0.03] rotate-90 whitespace-nowrap text-[6vw] font-bold uppercase tracking-[1em] text-white">
                INTEGRITY STANDARDS
              </div>
            </div>
          </div>
        </section>

        <CredibilityStrip label="OPERATING STANDARD" />

        {/* Section 5. Final CTA Block - Centered */}
        <section className="py-24 text-center space-y-20 scroll-reveal relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
              Begin the <br /> <span className="text-gray-500">Advisory Conversation</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.15em] leading-relaxed font-medium max-w-xl mx-auto">
              Discuss your organization’s objectives, challenges, and whether OS³ is the right operational fit.
            </p>
          </div>

          <div className="space-y-8">
            <button
              onClick={() => onNavigate(AppModule.CONTACT)}
              className="bg-white text-black px-20 py-8 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all active:scale-[0.98] shadow-2xl"
            >
              Book Expert Advisor
            </button>
            <p className="text-[9px] text-gray-700 uppercase tracking-[0.4em] font-mono leading-relaxed">
              Sandboxed demonstrations. Advisory-led access.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
import React, { Suspense, useEffect, useState } from 'react';
import { AppModule } from './types';
import { HomePage } from './pages/HomePage';
import { MarketingLayout } from './layouts/MarketingLayout';
import { DemoLayout } from './layouts/DemoLayout';
import { PAGE_METADATA, getStructuredData } from './data/content';
import { DemoSignupPage } from './pages/DemoSignupPage';

const NeuralCore = React.lazy(() => import('./components/apps/NeuralCore').then(m => ({ default: m.NeuralCore })));
const VoiceGrid = React.lazy(() => import('./components/apps/VoiceGrid').then(m => ({ default: m.VoiceGrid })));
const MediaLab = React.lazy(() => import('./components/apps/MediaLab').then(m => ({ default: m.MediaLab })));
const MotionLab = React.lazy(() => import('./components/apps/MotionLab').then(m => ({ default: m.MotionLab })));
const ClientZone = React.lazy(() => import('./components/apps/ClientZone').then(m => ({ default: m.ClientZone })));
const OS3DashInfoPage = React.lazy(() => import('./pages/OS3DashInfoPage').then(m => ({ default: m.OS3DashInfoPage })));
const AppsListPage = React.lazy(() => import('./pages/AppsListPage').then(m => ({ default: m.AppsListPage })));
const ServicesHubPage = React.lazy(() => import('./pages/ServicesHubPage').then(m => ({ default: m.ServicesHubPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const GenericDetailPage = React.lazy(() => import('./pages/GenericDetailPage').then(m => ({ default: m.GenericDetailPage })));
const AdvisoryPage = React.lazy(() => import('./pages/AdvisoryPage').then(m => ({ default: m.AdvisoryPage })));
const DemoWorkspacePage = React.lazy(() => import('./pages/DemoWorkspacePage').then(m => ({ default: m.DemoWorkspacePage })));
const PolicyPage = React.lazy(() => import('./pages/PolicyPage').then(m => ({ default: m.PolicyPage })));
const BrochuresPage = React.lazy(() => import('./pages/BrochuresPage').then(m => ({ default: m.BrochuresPage })));
const VideoVaultPage = React.lazy(() => import('./pages/VideoVaultPage').then(m => ({ default: m.VideoVaultPage })));

const LoadingFallback = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-white/10 border-t-[#66FF66] rounded-full animate-spin"></div>
  </div>
);

const CLIPBOARD_PATH = '/clipboard';
const OS3GRID_PATH = '/os3grid';
const BROCHURES_PATH = '/brochures/';
const DEMO_REDIRECT_MODULES: AppModule[] = [
  AppModule.NEURAL_CORE,
  AppModule.MEDIA_LAB,
  AppModule.VOICE_GRID,
  AppModule.MOTION_LAB,
];
const DEMO_DESTINATION_KEY = 'jb3ai_demo_destination';

const getModuleFromPath = (pathname: string): AppModule => {
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const normalizedPath = cleanPath.endsWith('/') && cleanPath.length > 0 ? cleanPath.slice(0, -1) : cleanPath;

  for (const [module, metadata] of Object.entries(PAGE_METADATA)) {
    if (metadata.path === normalizedPath) {
      return module as AppModule;
    }
  }

  return AppModule.HOME;
};

const readLeadData = () => {
  const saved = localStorage.getItem('jb3ai_lead');
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn('Failed to parse jb3ai_lead from localStorage, clearing corrupted value.', error);
    localStorage.removeItem('jb3ai_lead');
    return null;
  }
};

const readPendingModule = (): AppModule => {
  const saved = sessionStorage.getItem(DEMO_DESTINATION_KEY);
  if (saved && Object.values(AppModule).includes(saved as AppModule)) {
    return saved as AppModule;
  }

  return AppModule.WORKSPACE;
};

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>(() => getModuleFromPath(window.location.pathname));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'s' | 'l'>('s');
  const [leadData, setLeadData] = useState<any>(readLeadData);
  const [pendingModule, setPendingModule] = useState<AppModule>(readPendingModule);

  useEffect(() => {
    const handlePopState = () => {
      setActiveModule(getModuleFromPath(window.location.pathname));
      setPendingModule(readPendingModule());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.className = `font-${fontSize}`;
  }, [fontSize]);

  const getDemoRedirectPath = (module: AppModule) => {
    if (module === AppModule.VOICE_GRID || module === AppModule.PHONE_SYSTEM) {
      return OS3GRID_PATH;
    }

    return CLIPBOARD_PATH;
  };

  const redirectToDemoDestination = (module: AppModule) => {
    window.location.assign(getDemoRedirectPath(module));
  };

  const updatePendingModule = (module: AppModule) => {
    setPendingModule(module);
    sessionStorage.setItem(DEMO_DESTINATION_KEY, module);
  };

  const openModule = (module: AppModule) => {
    setActiveModule(module);

    const meta = PAGE_METADATA[module];
    const path = meta?.path !== undefined ? `/${meta.path}` : '/';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const openSignupPage = (module: AppModule) => {
    updatePendingModule(module);
    openModule(AppModule.DEMO_SIGNUP);
  };

  useEffect(() => {
    if (!DEMO_REDIRECT_MODULES.includes(activeModule)) {
      return;
    }

    openSignupPage(activeModule);
  }, [activeModule]);

  useEffect(() => {
    const metadata = PAGE_METADATA[activeModule];
    if (!metadata) return;

    document.title = metadata.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metadata.description);

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

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (metadata.path !== undefined) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://jb3ai.com/${metadata.path}`);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    document.querySelectorAll('script[data-schema="jb3-schema"]').forEach(script => script.remove());
    const schemas = getStructuredData(activeModule);
    schemas.forEach(schemaObj => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'jb3-schema');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }, [activeModule]);

  const navigate = (module: AppModule) => {
    if (module === AppModule.BROCHURES) {
      window.location.assign(BROCHURES_PATH);
      return;
    }

    if (module === AppModule.DEMO_SIGNUP) {
      openSignupPage(AppModule.WORKSPACE);
      return;
    }

    if (DEMO_REDIRECT_MODULES.includes(module)) {
      openSignupPage(module);
      return;
    }

    openModule(module);
  };

  const clearDemoData = (event: React.MouseEvent) => {
    event.preventDefault();
    localStorage.removeItem('jb3ai_lead');
    sessionStorage.removeItem(DEMO_DESTINATION_KEY);
    setLeadData(null);
    setPendingModule(AppModule.WORKSPACE);
    openModule(AppModule.HOME);
  };

  const handleSignupSubmit = (data: any) => {
    setLeadData(data);
    redirectToDemoDestination(pendingModule);
  };

  const handleSignupBack = () => {
    updatePendingModule(AppModule.WORKSPACE);
    openModule(AppModule.WORKSPACE);
  };

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [activeModule]);

  const isDemoLayout = [
    AppModule.WORKSPACE,
    AppModule.DEMO_SIGNUP,
    AppModule.NEURAL_CORE,
    AppModule.MEDIA_LAB,
    AppModule.VOICE_GRID,
    AppModule.MOTION_LAB,
    AppModule.CLIENT_ZONE,
  ].includes(activeModule);

  const renderContent = () => {
    switch (activeModule) {
      case AppModule.HOME:
        return <HomePage onNavigate={navigate} />;
      case AppModule.OS3_INFO:
        return <OS3DashInfoPage onNavigate={navigate} />;
      case AppModule.APPS_LIST:
        return <AppsListPage onNavigate={navigate} />;
      case AppModule.SERVICES_HUB:
        return <ServicesHubPage onNavigate={navigate} />;
      case AppModule.CONTACT:
        return <ContactPage onNavigate={navigate} />;
      case AppModule.CONSULTING:
        return <AdvisoryPage onNavigate={navigate} />;
      case AppModule.BROCHURES:
        return <BrochuresPage onNavigate={navigate} />;
      case AppModule.VIDEO_VAULT:
        return <VideoVaultPage onNavigate={navigate} />;
      case AppModule.INVESTIGATOR_AI:
      case AppModule.MINDCARE_AI:
      case AppModule.PHONE_SYSTEM:
      case AppModule.ACCELERATOR:
        return <GenericDetailPage module={activeModule} onNavigate={navigate} />;
      case AppModule.TRUST:
      case AppModule.GOVERNANCE:
      case AppModule.SECURITY:
      case AppModule.COMPLIANCE:
        return <PolicyPage module={activeModule} />;
      case AppModule.DEMO_SIGNUP:
        return <DemoSignupPage destination={pendingModule} onBack={handleSignupBack} onSubmit={handleSignupSubmit} />;
      case AppModule.NEURAL_CORE:
        return <NeuralCore />;
      case AppModule.VOICE_GRID:
        return <VoiceGrid leadData={leadData} />;
      case AppModule.MEDIA_LAB:
        return <MediaLab />;
      case AppModule.MOTION_LAB:
        return <MotionLab />;
      case AppModule.CLIENT_ZONE:
        return <ClientZone />;
      case AppModule.WORKSPACE:
        return <DemoWorkspacePage onNavigate={navigate} onClearData={clearDemoData} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return isDemoLayout ? (
    <DemoLayout activeModule={activeModule} navigate={navigate}>
      <Suspense fallback={<LoadingFallback />}>{renderContent()}</Suspense>
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
      <Suspense fallback={<LoadingFallback />}>{renderContent()}</Suspense>
    </MarketingLayout>
  );
};

export default App;

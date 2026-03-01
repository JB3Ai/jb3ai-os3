
import React, { useState, useEffect } from 'react';
import { AppModule } from './types';
import { Suspense } from 'react';
import { HomePage } from './pages/HomePage'; // Keep home eager for fast LCP
import { MarketingLayout } from './layouts/MarketingLayout';
import { DemoLayout } from './layouts/DemoLayout';
import { DemoGateModal } from './components/apps/DemoGateModal';
import { PAGE_METADATA, getStructuredData } from './data/content';

const NeuralCore = React.lazy(() => import('./components/apps/NeuralCore').then(m => ({ default: m.NeuralCore })));
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

const LoadingFallback = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-white/10 border-t-[#66FF66] rounded-full animate-spin"></div>
  </div>
);

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

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>(() => getModuleFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setActiveModule(getModuleFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
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

    const meta = PAGE_METADATA[m];
    const path = meta?.path !== undefined ? `/${meta.path}` : '/';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

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

  // --- Smooth Anchor Scroll Handling ---
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          // Small delay for SPA render cycle
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [activeModule]);

  const isDemoLayout = [AppModule.WORKSPACE, AppModule.NEURAL_CORE, AppModule.MEDIA_LAB, AppModule.MOTION_LAB, AppModule.CLIENT_ZONE].includes(activeModule);

  const renderContent = () => {
    switch (activeModule) {
      case AppModule.HOME: return <HomePage onNavigate={navigate} />;
      case AppModule.OS3_INFO: return <OS3DashInfoPage onNavigate={navigate} />;
      case AppModule.APPS_LIST: return <AppsListPage onNavigate={navigate} />;
      case AppModule.SERVICES_HUB: return <ServicesHubPage onNavigate={navigate} />;
      case AppModule.CONTACT: return <ContactPage onNavigate={navigate} />;
      case AppModule.CONSULTING: return <AdvisoryPage onNavigate={navigate} />;

      case AppModule.BROCHURES: return <BrochuresPage onNavigate={navigate} />;
      case AppModule.INVESTIGATOR_AI:
      case AppModule.SHIELD_AI:
      case AppModule.MINDCARE_AI:
      case AppModule.PHONE_SYSTEM:
      case AppModule.ACCELERATOR:
        return <GenericDetailPage module={activeModule} onNavigate={navigate} />;
      case AppModule.TRUST:
      case AppModule.GOVERNANCE:
      case AppModule.SECURITY:
      case AppModule.COMPLIANCE:
        return <PolicyPage module={activeModule} />;
      case AppModule.NEURAL_CORE: return <NeuralCore />;
      case AppModule.MEDIA_LAB: return <MediaLab />;
      case AppModule.MOTION_LAB: return <MotionLab />;
      case AppModule.CLIENT_ZONE: return <ClientZone />;
      case AppModule.WORKSPACE: return <DemoWorkspacePage onNavigate={navigate} onClearData={clearDemoData} />;
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
          <Suspense fallback={<LoadingFallback />}>
            {renderContent()}
          </Suspense>
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
          <Suspense fallback={<LoadingFallback />}>
            {renderContent()}
          </Suspense>
        </MarketingLayout>
      )}
    </>
  );
};

export default App;
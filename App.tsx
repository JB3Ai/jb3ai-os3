
import React, { useState, useEffect } from 'react';
import { AppModule } from './types';
import { NeuralCore } from './components/apps/NeuralCore';
import { MediaLab } from './components/apps/MediaLab';
import { MotionLab } from './components/apps/MotionLab';
import { ClientZone } from './components/apps/ClientZone';
import { MarketingLayout } from './layouts/MarketingLayout';
import { DemoLayout } from './layouts/DemoLayout';
import { DemoGateModal } from './components/apps/DemoGateModal';

// Moved content to data/content.ts
import { PAGE_METADATA, getStructuredData } from './data/content';

// Imported Pages
import { HomePage } from './pages/HomePage';
import { OS3DashInfoPage } from './pages/OS3DashInfoPage';
import { AppsListPage } from './pages/AppsListPage';
import { ServicesHubPage } from './pages/ServicesHubPage';
import { ContactPage } from './pages/ContactPage';
import { GenericDetailPage } from './pages/GenericDetailPage';
import { AdvisoryPage } from './pages/AdvisoryPage';
import { DemoWorkspacePage } from './pages/DemoWorkspacePage';
import { PolicyPage } from './pages/PolicyPage';

const readLeadData = () => {
  const saved = localStorage.getItem('jb3ai_lead');
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn('Failed to parse jb3ai_lead from localStorage, clearing corrupted value.', error);
    localStorage.removeItem('jb3ai_lead');
    return null;
  }
};

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>(AppModule.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'s' | 'l'>('s');
  const [leadData, setLeadData] = useState<any>(readLeadData);
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
      case AppModule.INVESTIGATOR_AI:
      case AppModule.SHIELD_AI:
      case AppModule.MINDCARE_AI:
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

export default App;

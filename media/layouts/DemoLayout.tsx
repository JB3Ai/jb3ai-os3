import React from 'react';
import { LayoutGrid, Cpu, Disc, ShieldCheck } from 'lucide-react';
import { AppModule } from '../../types';

interface DemoLayoutProps {
  children: React.ReactNode;
  activeModule: AppModule;
  navigate: (m: AppModule) => void;
}

export const DemoLayout: React.FC<DemoLayoutProps> = ({ children, activeModule, navigate }) => {
  return (
    <div className="w-full h-screen bg-[#050505] text-gray-300 flex flex-col font-sans overflow-hidden p-6">
      {/* Main Workspace Panel */}
      <div className="flex-1 os-panel rounded-sm h-full flex flex-col overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] relative">

        {/* Dashboard Backdrop Layer - High Static Stability */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: "url('/media/dividers/dashboard-backdrop-v1.jpg')",
            opacity: 0.1,
            mixBlendMode: 'luminosity'
          }}
        />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="h-10 border-b border-gray-900 flex items-center px-4 justify-between bg-black/60 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                Workspace Instance — {activeModule.replace('_', ' ')}
              </span>
            </div>
            <button onClick={() => navigate(AppModule.HOME)} className="text-[9px] text-gray-600 hover:text-white transition-colors uppercase font-bold tracking-widest">
              Exit to Home
            </button>
          </div>

          <div className="flex-1 overflow-hidden h-full relative">
            {children}
          </div>
        </div>
      </div>

      <footer className="h-20 flex items-center justify-center z-20 pb-4 shrink-0">
        <div className="flex items-center gap-2 bg-[#0a0a0a] px-4 py-2 rounded-lg border border-gray-800 shadow-2xl">
          <DockItem
            icon={<LayoutGrid className="w-5 h-5" />}
            label="Hub"
            isActive={activeModule === AppModule.WORKSPACE}
            onClick={() => navigate(AppModule.WORKSPACE)}
          />
          <div className="w-[1px] h-6 bg-gray-800 mx-2" />
          <DockItem
            icon={<Cpu className="w-5 h-5" />}
            label="Neural Core"
            isActive={activeModule === AppModule.NEURAL_CORE}
            onClick={() => navigate(AppModule.NEURAL_CORE)}
          />
          <DockItem
            icon={<Disc className="w-5 h-5" />}
            label="Media Lab"
            isActive={activeModule === AppModule.MEDIA_LAB}
            onClick={() => navigate(AppModule.MEDIA_LAB)}
          />
          <DockItem
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Client Zone"
            isActive={activeModule === AppModule.CLIENT_ZONE}
            onClick={() => navigate(AppModule.CLIENT_ZONE)}
          />
        </div>
      </footer>
    </div>
  );
};

const DockItem: React.FC<{ icon: React.ReactNode, label: string, isActive?: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative p-3 rounded-md transition-all duration-200 ${isActive ? 'bg-gray-800 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]' : 'text-gray-500 hover:bg-gray-900 hover:text-gray-300'}`}
  >
    {icon}
    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800 font-os uppercase tracking-widest">
      {label}
    </span>
  </button>
);
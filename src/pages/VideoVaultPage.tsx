// @ts-nocheck
import React, { useState } from 'react';
import { InteractiveBackground } from '../components/InteractiveBackground';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AppModule } from '../types';
import { Play, ExternalLink, Film, Monitor, BookOpen, Rocket, ChevronDown } from 'lucide-react';

interface VaultVideo {
  id: string;
  title: string;
  description: string;
  category: 'product' | 'instructional' | 'showcase';
  source: 'local' | 'youtube';
  url: string;        // Local path or YouTube embed URL
  thumbnail?: string;
  duration?: string;
}

const CATEGORIES = [
  { key: 'all', label: 'All Videos', icon: <Film size={14} /> },
  { key: 'product', label: 'Product Demos', icon: <Monitor size={14} /> },
  { key: 'instructional', label: 'Instructional', icon: <BookOpen size={14} /> },
  { key: 'showcase', label: 'Showcases', icon: <Rocket size={14} /> },
];

// ──────────────────────────────────────────────────────────────
// VIDEO CATALOGUE — add entries here as the vault grows
// ──────────────────────────────────────────────────────────────
const VIDEOS: VaultVideo[] = [
  {
    id: 'os3-dash-overview',
    title: 'OS³ Dash — Platform Overview',
    description: 'Full walkthrough of the OS³ Dash managed AI operating environment, its modules, and governed workspace.',
    category: 'product',
    source: 'local',
    url: '/media/vault/os3-dash-overview.mp4',
    duration: '4:32'
  },
  {
    id: 'shield-ai-intro',
    title: 'Shield AI — Silent Protection Layer',
    description: 'How Shield AI provides real-time governance monitoring and automated compliance across all AI outputs.',
    category: 'product',
    source: 'local',
    url: '/media/vault/shield-ai-intro.mp4',
    duration: '3:18'
  },
  {
    id: 'investigator-deep-dive',
    title: 'Investigator AI — Deep Dive',
    description: 'Forensic intelligence walkthrough: cross-silo data correlation, timeline reconstruction, and audit trails.',
    category: 'product',
    source: 'local',
    url: '/media/vault/investigator-deep-dive.mp4',
    duration: '6:05'
  },
  {
    id: 'getting-started',
    title: 'Getting Started with OS³',
    description: 'Step-by-step onboarding guide for new OS³ Dash users — workspace setup, module access, and first-run configuration.',
    category: 'instructional',
    source: 'local',
    url: '/media/vault/getting-started-os3.mp4',
    duration: '5:42'
  },
  {
    id: 'neural-core-tutorial',
    title: 'Neural Core — Prompt Engineering',
    description: 'How to use Neural Core effectively: prompt patterns, context windows, and governed output control.',
    category: 'instructional',
    source: 'local',
    url: '/media/vault/neural-core-tutorial.mp4',
    duration: '8:15'
  },
  {
    id: 'media-lab-walkthrough',
    title: 'Media Lab — Asset Production',
    description: 'Generate institutional-grade visuals, documents, and branded assets using Media Lab inside OS³.',
    category: 'instructional',
    source: 'local',
    url: '/media/vault/media-lab-walkthrough.mp4',
    duration: '7:20'
  },
  {
    id: 'client-showcase-2026',
    title: 'JB³Ai — 2026 Client Showcase',
    description: 'Highlights from live client deployments across legal, finance, and enterprise operations sectors.',
    category: 'showcase',
    source: 'local',
    url: '/media/vault/client-showcase-2026.mp4',
    duration: '10:30'
  },
  {
    id: 'os3-architecture',
    title: 'OS³ Architecture — Technical Deep Dive',
    description: 'System architecture overview: kernel, modules, security layers, and deployment topology.',
    category: 'showcase',
    source: 'local',
    url: '/media/vault/os3-architecture.mp4',
    duration: '12:00'
  },
];

const categoryLabel = (cat: string) =>
  cat === 'product' ? 'Product Demo' : cat === 'instructional' ? 'Instructional' : 'Showcase';

const categoryColor = (cat: string) =>
  cat === 'product' ? 'text-[#66FF66]' : cat === 'instructional' ? 'text-blue-400' : 'text-amber-400';

const categoryBorder = (cat: string) =>
  cat === 'product' ? 'border-[#66FF66]/20' : cat === 'instructional' ? 'border-blue-400/20' : 'border-amber-400/20';

export const VideoVaultPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filtered = activeCategory === 'all' ? VIDEOS : VIDEOS.filter(v => v.category === activeCategory);

  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : url;
  };

  return (
    <InteractiveBackground>
      <section className="relative min-h-screen py-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <SectionHeader
            label="VIDEO VAULT"
            title="VVault"
            subtitle="Product demos, instructional walkthroughs, and project showcases. Local and YouTube content in one governed library."
          />

          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-3 mt-16 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setPlayingVideoId(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-white/10 border-[#66FF66]/40 text-white'
                    : 'border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Video Count */}
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold mb-8">
            {filtered.length} video{filtered.length !== 1 ? 's' : ''} in vault
          </p>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((video) => (
              <div
                key={video.id}
                className="group relative flex flex-col bg-[#0a0a0a] border border-gray-900 hover:border-gray-700 transition-all duration-500 overflow-hidden"
              >
                {/* Video Player / Thumbnail Area */}
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {playingVideoId === video.id ? (
                    isYouTube(video.url) ? (
                      <iframe
                        src={getYouTubeEmbedUrl(video.url)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      />
                    ) : (
                      <video
                        src={video.url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        onError={() => setPlayingVideoId(null)}
                      />
                    )
                  ) : (
                    <>
                      {/* Thumbnail or placeholder */}
                      {video.thumbnail ? (
                        <img src={video.thumbnail} className="w-full h-full object-cover opacity-60" alt={video.title} />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                          <Film size={40} className="text-gray-800" />
                        </div>
                      )}
                      {/* Duration Badge */}
                      {video.duration && (
                        <span className="absolute bottom-3 right-3 bg-black/80 text-[10px] text-gray-300 font-mono px-2 py-1 tracking-wider">
                          {video.duration}
                        </span>
                      )}
                      {/* Play Overlay */}
                      <button
                        onClick={() => setPlayingVideoId(video.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#66FF66]/20 border border-[#66FF66]/40 flex items-center justify-center backdrop-blur-sm">
                          <Play size={24} className="text-[#66FF66] ml-1" fill="currentColor" />
                        </div>
                      </button>
                    </>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${categoryColor(video.category)} border ${categoryBorder(video.category)} px-2.5 py-1`}>
                      {categoryLabel(video.category)}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                      {video.source === 'youtube' ? 'YouTube' : 'Local'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white/90 tracking-wide mb-2 group-hover:text-white transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed flex-1">
                    {video.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-900 flex items-center justify-between">
                    <button
                      onClick={() => setPlayingVideoId(video.id === playingVideoId ? null : video.id)}
                      className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#66FF66]/60 hover:text-[#66FF66] transition-colors flex items-center gap-2"
                    >
                      <Play size={10} />
                      {playingVideoId === video.id ? 'Close' : 'Play'}
                    </button>
                    {video.source === 'youtube' && (
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <ExternalLink size={10} /> YouTube
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-32 space-y-4">
              <Film size={48} className="mx-auto text-gray-800" />
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">No videos in this category yet</p>
            </div>
          )}

        </div>
      </section>
    </InteractiveBackground>
  );
};

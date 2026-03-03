// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppModule } from '../types';

/* ─────────────────── TYPES ─────────────────── */
type VaultCategory = 's' | 'd' | 'b';

interface VaultVideo {
  id: string;
  ref: string;
  title: string;
  description: string;
  category: VaultCategory;
  source: 'local' | 'youtube';
  url: string;
  thumbnail?: string;
  duration: string;
}

/* ─────────────────── CONSTANTS ─────────────────── */
const CATEGORY_META: Record<VaultCategory, { label: string; tagClass: string; bgClass: string }> = {
  s: {
    label: 'Transmissions',
    tagClass: 'text-[#39FF88] border-[#39FF88]/30 bg-[#39FF88]/[.06]',
    bgClass: 'bg-[radial-gradient(ellipse_at_35%_50%,rgba(57,255,136,.1)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(0,217,255,.06)_0%,transparent_50%)] bg-[#090d18]',
  },
  d: {
    label: 'Deployments',
    tagClass: 'text-[#00D9FF] border-[#00D9FF]/30 bg-[#00D9FF]/[.06]',
    bgClass: 'bg-[radial-gradient(ellipse_at_65%_45%,rgba(0,217,255,.1)_0%,transparent_60%),radial-gradient(ellipse_at_30%_70%,rgba(57,255,136,.06)_0%,transparent_50%)] bg-[#090d18]',
  },
  b: {
    label: 'Briefings',
    tagClass: 'text-[#8B5CFF] border-[#8B5CFF]/30 bg-[#8B5CFF]/[.06]',
    bgClass: 'bg-[radial-gradient(ellipse_at_50%_55%,rgba(139,92,255,.1)_0%,transparent_60%),radial-gradient(ellipse_at_70%_25%,rgba(0,217,255,.06)_0%,transparent_50%)] bg-[#090d18]',
  },
};

const TABS: { key: string; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: 13 },
  { key: 's', label: 'Transmissions', count: 3 },
  { key: 'd', label: 'Deployments', count: 3 },
  { key: 'b', label: 'Briefings', count: 7 },
];

// ──────────────────────────────────────────────────────────────
// VIDEO CATALOGUE — add entries here as the vault grows
// ──────────────────────────────────────────────────────────────
const VIDEOS: VaultVideo[] = [
  // TRANSMISSIONS
  { id: 'trn-001', ref: 'TRN-001', title: 'OS³ Platform — 60s Broadcast', description: 'High-impact social cut introducing the OS³ governed intelligence kernel to enterprise decision-makers.', category: 's', source: 'youtube', url: 'https://youtu.be/tEnyEt0iiSY', duration: '0:58' },
  { id: 'trn-002', ref: 'TRN-002', title: 'ShieldAi — Threat Reel', description: 'Rapid-cut social asset showcasing proactive threat neutralization across enterprise infrastructure layers.', category: 's', source: 'youtube', url: 'https://youtu.be/n3i-k--ALiU', duration: '0:32' },
  { id: 'trn-003', ref: 'TRN-003', title: 'InvestigatorAi — Signal Cut', description: "Social-first visual profile of JB³Ai's forensic intelligence platform built for high-stakes investigations.", category: 's', source: 'youtube', url: 'https://youtu.be/LQXoyAzxNJ0', duration: '1:05' },
  // DEPLOYMENTS
  { id: 'dep-001', ref: 'DEP-001', title: 'OS³ Dash — Full Walkthrough', description: 'Complete product demonstration of the modular AI operating system. Real-time operational efficiency at enterprise scale.', category: 'd', source: 'youtube', url: 'https://youtu.be/luTYqcmwWL0', duration: '4:22' },
  { id: 'dep-002', ref: 'DEP-002', title: 'OS³ Voice Grid — Live Demo', description: 'Ultra-low latency voice architecture in action. NLP deployed at the edge in real-time.', category: 'd', source: 'youtube', url: 'https://youtu.be/y5oILVOfHK0', duration: '3:48' },
  { id: 'dep-003', ref: 'DEP-003', title: 'MindCareAi — Platform Overview', description: 'Adaptive neural network framework for personal growth and emotional intelligence, demonstrated live.', category: 'd', source: 'youtube', url: 'https://youtu.be/r257344f95k', duration: '5:10' },
  // BRIEFINGS
  { id: 'brf-001', ref: 'BRF-001', title: 'OS³ Kernel — Architecture Deep Dive', description: 'Executive-level technical briefing on the governed intelligence kernel. Auditable, controlled, enterprise-ready.', category: 'b', source: 'youtube', url: 'https://youtu.be/ADj33oWqv7g', duration: '12:34' },
  { id: 'brf-002', ref: 'BRF-002', title: 'Intelligence Managed — Onboarding', description: 'Structured onboarding briefing for enterprise clients deploying fully managed JB³Ai intelligence services.', category: 'b', source: 'youtube', url: 'https://youtu.be/1cVZU5uBae8', duration: '08:17' },
  { id: 'brf-003', ref: 'BRF-003', title: 'AI Governance — Masterclass', description: 'In-depth learning on compliance architecture, ethical deployment, and risk management within OS³.', category: 'b', source: 'youtube', url: 'https://youtu.be/M5r9ao-zjHo', duration: '15:02' },
  // EXTENDED
  { id: 'ext-001', ref: 'EXT-001', title: 'JB³Ai — Extended Briefing I', description: 'Extended intelligence briefing covering advanced OS³ capabilities and enterprise deployment scenarios.', category: 'b', source: 'youtube', url: 'https://youtu.be/qlcn6eoWUf8', duration: '10:00' },
  { id: 'ext-002', ref: 'EXT-002', title: 'JB³Ai — Extended Briefing II', description: 'Continuation briefing on governed AI integration, operational architecture, and real-world deployment impact.', category: 'b', source: 'youtube', url: 'https://youtu.be/-A-Jecn_snw', duration: '10:00' },
  { id: 'ext-003', ref: 'EXT-003', title: 'JB³Ai — Extended Briefing III', description: 'Strategic overview of JB³Ai intelligence operations and platform evolution across enterprise verticals.', category: 'b', source: 'youtube', url: 'https://youtu.be/ZhoKerlOmsM', duration: '10:00' },
  { id: 'ext-004', ref: 'EXT-004', title: 'JB³Ai — Extended Briefing IV', description: 'Advanced briefing on next-generation AI deployment frameworks and enterprise integration pathways.', category: 'b', source: 'youtube', url: 'https://youtu.be/OB4EOujdvws', duration: '10:00' },
];

/* ─────────────────── CURSOR EFFECTS HOOK ─────────────────── */
function useCursorEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });
  const orb = useRef({ x: -9999, y: -9999 });
  const ring = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = e.clientX;
      mouse.current.ty = e.clientY;
      if (spotlightRef.current) spotlightRef.current.style.opacity = '1';
      if (orbRef.current) orbRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const animate = () => {
      const { tx, ty } = mouse.current;
      // Orb — tight follow
      orb.current.x += (tx - orb.current.x) * 0.18;
      orb.current.y += (ty - orb.current.y) * 0.18;
      // Ring — lazy follow
      ring.current.x += (tx - ring.current.x) * 0.09;
      ring.current.y += (ty - ring.current.y) * 0.09;

      if (orbRef.current) {
        orbRef.current.style.left = `${orb.current.x}px`;
        orbRef.current.style.top = `${orb.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(700px circle at ${tx}px ${ty}px, rgba(57,255,136,0.07) 0%, rgba(139,92,255,0.05) 35%, transparent 70%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const expandRing = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.width = '52px';
      ringRef.current.style.height = '52px';
      ringRef.current.style.borderColor = 'rgba(57,255,136,0.5)';
    }
  }, []);
  const shrinkRing = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.width = '40px';
      ringRef.current.style.height = '40px';
      ringRef.current.style.borderColor = 'rgba(57,255,136,0.3)';
    }
  }, []);
  const expandOrbForCard = useCallback(() => {
    if (orbRef.current) { orbRef.current.style.width = '20px'; orbRef.current.style.height = '20px'; }
    if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; ringRef.current.style.borderColor = 'rgba(139,92,255,0.45)'; }
  }, []);
  const resetOrbForCard = useCallback(() => {
    if (orbRef.current) { orbRef.current.style.width = '12px'; orbRef.current.style.height = '12px'; }
    if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px'; ringRef.current.style.borderColor = 'rgba(57,255,136,0.3)'; }
  }, []);

  return { spotlightRef, orbRef, ringRef, expandRing, shrinkRing, expandOrbForCard, resetOrbForCard };
}

/* ─────────────────── HERO CANVAS ─────────────────── */
const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ptsRef = useRef<{ x: number; y: number; vx: number; vy: number; p: number; hue: number }[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const lerp = useCallback((t: number) => {
    const r = Math.round(57 + (139 - 57) * t);
    const g = Math.round(255 + (92 - 255) * t);
    const b = Math.round(136 + (255 - 136) * t);
    return `${r},${g},${b}`;
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = cv.width = cv.parentElement!.clientWidth;
      H = cv.height = cv.parentElement!.clientHeight;
      const n = Math.floor((W * H) / 14000);
      ptsRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        p: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.6 ? 0 : 1,
      }));
    };

    const draw = () => {
      cx.clearRect(0, 0, W, H);
      // grid
      cx.lineWidth = 1;
      cx.strokeStyle = 'rgba(20,28,44,0.9)';
      for (let x = 0; x < W; x += 80) { cx.beginPath(); cx.moveTo(x, 0); cx.lineTo(x, H); cx.stroke(); }
      for (let y = 0; y < H; y += 80) { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }
      // connections
      const pts = ptsRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const t = (pts[i].hue + pts[j].hue) / 2;
            cx.strokeStyle = `rgba(${lerp(t)},${(1 - d / 150) * 0.35})`;
            cx.lineWidth = 1.2;
            cx.beginPath(); cx.moveTo(pts[i].x, pts[i].y); cx.lineTo(pts[j].x, pts[j].y); cx.stroke();
          }
        }
      }
      // nodes
      pts.forEach(p => {
        const g = (Math.sin(p.p + frameRef.current * 0.016) + 1) / 2;
        const col = lerp(p.hue);
        cx.shadowBlur = 10;
        cx.shadowColor = `rgba(${col},0.8)`;
        cx.fillStyle = `rgba(${col},${0.3 + g * 0.6})`;
        cx.beginPath(); cx.arc(p.x, p.y, 1.8 + g * 1.2, 0, Math.PI * 2); cx.fill();
        cx.shadowBlur = 0;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      frameRef.current++;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current); };
  }, [lerp]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ─────────────────── CARD ─────────────────── */
const VaultCard: React.FC<{
  video: VaultVideo;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
  onCardEnter: () => void;
  onCardLeave: () => void;
}> = ({ video, index, isPlaying, onPlay, onCardEnter, onCardLeave }) => {
  const meta = CATEGORY_META[video.category];
  const cardRef = useRef<HTMLDivElement>(null);

  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  };
  const getYouTubeEmbedUrl = (url: string) => {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : url;
  };
  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    const lx = ((e.clientX - r.left) / r.width) * 100;
    const ly = ((e.clientY - r.top) / r.height) * 100;
    el.style.transform = `translateY(-4px) perspective(900px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg)`;
    el.style.boxShadow = '0 20px 50px rgba(57,255,136,0.12), 0 0 0 1px rgba(57,255,136,0.22), inset 0 0 60px rgba(57,255,136,0.03)';
    el.style.background = `radial-gradient(circle at ${lx}% ${ly}%, rgba(57,255,136,0.05) 0%, rgba(139,92,255,0.03) 30%, transparent 60%), #0d1120`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'translateY(0) perspective(900px) rotateX(0) rotateY(0)';
    el.style.boxShadow = '';
    el.style.background = '';
    onCardLeave();
  }, [onCardLeave]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
      onClick={onPlay}
      onTouchEnd={(e) => { e.preventDefault(); onPlay(); }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onCardEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transition: 'border-color .25s, box-shadow .25s, transform .15s' }}
      className="group relative cursor-pointer rounded-[20px] overflow-hidden border border-white/[.07] bg-[#0d1120] backdrop-blur-sm"
    >
      {/* Glass sheen */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]" />

      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-[20px] bg-[#090d18]">
        {isPlaying ? (
          isYouTube(video.url) ? (
            <iframe
              src={getYouTubeEmbedUrl(video.url)}
              className="w-full h-full absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              playsInline
              title={video.title}
              style={{ border: 0 }}
            />
          ) : (
            <video src={video.url} className="w-full h-full object-cover" controls autoPlay />
          )
        ) : (
          <>
            {isYouTube(video.url) && getYouTubeThumbnail(video.url) ? (
              <img
                src={getYouTubeThumbnail(video.url)!}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                loading="lazy"
              />
            ) : (
              <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06] ${meta.bgClass}`} />
            )}
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-[#090d18]/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ backgroundImage: 'linear-gradient(rgba(57,255,136,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,136,.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            {/* Scan sweep */}
            <div className="absolute left-0 right-0 h-[60px] bg-gradient-to-b from-transparent via-[#39FF88]/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanDown_1.4s_linear_infinite] pointer-events-none" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center z-[5]">
              <div className="w-14 h-14 rounded-full border-[1.5px] border-white/20 flex items-center justify-center bg-[#0b0f1a]/40 backdrop-blur-sm transition-all duration-300 group-hover:border-[#39FF88] group-hover:bg-[#39FF88]/[.12] group-hover:shadow-[0_0_24px_rgba(57,255,136,.25)]">
                <div className="w-0 h-0 ml-1 border-solid border-y-[8px] border-y-transparent border-l-[16px] border-l-white/70 transition-colors duration-300 group-hover:border-l-[#39FF88]" />
              </div>
            </div>
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39FF88] rounded-tl-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[6]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39FF88] rounded-tr-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[6]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[6]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[6]" />
            {/* Lock label */}
            <span className="absolute top-3 left-3 font-mono text-[8px] tracking-[.15em] uppercase text-white/20 group-hover:text-[#39FF88] transition-colors duration-300 z-[6]">● LOCKED</span>
            {/* Duration */}
            <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[.1em] text-white/60 bg-[#0b0f1a]/60 px-2.5 py-1 border border-white/10 rounded-md backdrop-blur-sm group-hover:text-[#39FF88] group-hover:border-[#39FF88]/30 transition-all duration-300 z-[6]">
              {video.duration}
            </span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="relative px-6 py-5 z-[2]">
        {/* Neural gradient left bar on hover */}
        <div className="absolute left-0 top-[20%] bottom-[20%] w-[2px] rounded-full bg-gradient-to-b from-[#39FF88] to-[#8B5CFF] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-350 shadow-[0_0_8px_rgba(57,255,136,.3)]" />

        <p className="font-mono text-[9px] tracking-[.22em] uppercase text-white/18 mb-2.5">
          Ref: <span className="bg-gradient-to-r from-[#39FF88] to-[#8B5CFF] bg-clip-text text-transparent">{video.ref}</span>
        </p>
        <h3 className="font-['Orbitron',monospace] text-[13px] font-bold tracking-[.04em] uppercase text-white/90 leading-tight mb-2.5">
          {video.title}
        </h3>
        <p className="text-[12px] leading-[1.7] text-white/38 mb-4">
          {video.description}
        </p>
        <div className="flex items-center justify-between">
          <span className={`font-['Orbitron',monospace] text-[8px] font-bold tracking-[.18em] uppercase px-3.5 py-1.5 rounded-full border ${meta.tagClass}`}>
            {meta.label}
          </span>
          <span className="font-mono text-[9px] tracking-[.2em] uppercase bg-gradient-to-r from-[#39FF88] to-[#8B5CFF] bg-clip-text text-transparent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            ▶ PLAY
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────── PAGE ─────────────────── */
export const VideoVaultPage: React.FC<{ onNavigate: (m: AppModule) => void }> = ({ onNavigate }) => {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { spotlightRef, orbRef, ringRef, expandRing, shrinkRing, expandOrbForCard, resetOrbForCard } = useCursorEffects();

  const filtered = activeCat === 'all' ? VIDEOS : VIDEOS.filter(v => v.category === activeCat);

  // Update tab counts dynamically
  const counts: Record<string, number> = {
    all: VIDEOS.length,
    s: VIDEOS.filter(v => v.category === 's').length,
    d: VIDEOS.filter(v => v.category === 'd').length,
    b: VIDEOS.filter(v => v.category === 'b').length,
  };

  return (
    <div className="relative bg-[#050609] min-h-screen md:cursor-none">

      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-40"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      {/* Spotlight overlay */}
      <div ref={spotlightRef} className="fixed inset-0 pointer-events-none z-[9997] opacity-0 transition-opacity duration-400" />

      {/* Cursor orb (tight follow) */}
      <div
        ref={orbRef}
        className="fixed pointer-events-none z-[99999] opacity-0 transition-[width,height,opacity] duration-200"
        style={{
          width: 12, height: 12, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(57,255,136,0.9) 0%, rgba(139,92,255,0.4) 60%, transparent 100%)',
          transform: 'translate(-50%, -50%)', mixBlendMode: 'screen',
        }}
      />

      {/* Cursor ring (lazy follow) */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[99998] opacity-0 transition-[width,height,opacity,border-color] duration-150"
        style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '1px solid rgba(57,255,136,0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── HERO ── */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroCanvas />

        {/* Radial vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(11,15,26,.92)_100%)]" />

        {/* Glow blobs */}
        <div className="absolute top-[12%] left-[8%] w-[650px] h-[380px] rounded-full bg-[#39FF88] blur-[80px] opacity-[.16] pointer-events-none z-[1] animate-[blobDrift_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-[18%] right-[8%] w-[550px] h-[320px] rounded-full bg-[#8B5CFF] blur-[80px] opacity-[.16] pointer-events-none z-[1] animate-[blobDrift_10s_ease-in-out_infinite_alternate-reverse]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-[2] px-5"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#39FF88]/25 bg-[#39FF88]/[.06] px-5 py-2 mb-7 rounded-full backdrop-blur-sm">
            <span className="w-[5px] h-[5px] bg-[#39FF88] rounded-full shadow-[0_0_6px_#39FF88] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[.25em] uppercase text-[#39FF88]">
              Visual Intelligence Archive &nbsp;·&nbsp; {String(VIDEOS.length).padStart(2, '0')} Records
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Orbitron',monospace] text-[clamp(72px,14vw,180px)] font-black leading-[0.9] uppercase relative inline-block">
            <span className="bg-gradient-to-br from-white via-[#E8EEF6] via-40% to-[#00D9FF] to-75% bg-clip-text text-transparent">
              <span className="bg-gradient-to-br from-[#39FF88] to-[#8B5CFF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(57,255,136,.4)]">VV</span>
              AULT
            </span>
            {/* Glitch overlay */}
            <span className="absolute inset-0 text-[#00D9FF] opacity-0 animate-[hGlitch_8s_infinite] pointer-events-none" aria-hidden="true">
              <span className="text-transparent bg-gradient-to-br from-[#39FF88] to-[#8B5CFF] bg-clip-text">VV</span>
              AULT
            </span>
          </h1>

          {/* Sub-title word */}
          <p className="font-['Orbitron',monospace] text-[clamp(18px,3vw,32px)] font-bold tracking-[.35em] uppercase text-white/18 mt-2">
            VIDEO
          </p>

          {/* Neural line */}
          <div className="w-20 h-0.5 mx-auto mt-6 bg-gradient-to-r from-[#39FF88] to-[#8B5CFF] rounded-full shadow-[0_0_12px_rgba(57,255,136,.4)]" />

          {/* Subtitle */}
          <p className="mt-5 text-[15px] font-light text-white/38 max-w-[500px] mx-auto leading-[1.7] tracking-[.03em]">
            Enterprise media intelligence. Products, transmissions, and tactical briefings — all in one governed vault.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
          <div className="w-px h-9 bg-gradient-to-b from-[#39FF88] to-[#8B5CFF] animate-pulse" />
          <span className="font-mono text-[9px] tracking-[.25em] uppercase text-white/18">Scroll</span>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="relative z-10 bg-[#050609]">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10">

          {/* Section Header */}
          <div className="pt-[72px] pb-11 flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#39FF88]/10 mb-10">
            <div>
              <p className="font-mono text-[10px] tracking-[.3em] uppercase mb-3.5 bg-gradient-to-r from-[#39FF88] to-[#8B5CFF] bg-clip-text text-transparent">
                // JB³Ai Visual Repository
              </p>
              <h2 className="font-['Orbitron',monospace] text-[clamp(28px,4vw,52px)] font-black tracking-[.03em] uppercase leading-[1.1] text-white">
                Intelligence<br />In Motion
              </h2>
            </div>
            <div className="text-right mt-6 md:mt-0">
              <p className="font-mono text-[9px] tracking-[.2em] uppercase text-white/18">Displaying</p>
              <p className="font-['Orbitron',monospace] text-5xl font-black leading-none bg-gradient-to-r from-[#39FF88] to-[#8B5CFF] bg-clip-text text-transparent">
                {String(filtered.length).padStart(2, '0')}
              </p>
              <p className="font-mono text-[9px] tracking-[.2em] uppercase text-white/18">Records</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-10">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveCat(tab.key); setPlayingId(null); }}
                onMouseEnter={expandRing}
                onMouseLeave={shrinkRing}
                className={`font-['Orbitron',monospace] text-[9px] font-bold tracking-[.18em] uppercase px-6 py-2.5 rounded-full border backdrop-blur-sm transition-all duration-250 ${
                  activeCat === tab.key
                    ? 'bg-gradient-to-br from-[#39FF88] to-[#8B5CFF] border-transparent text-black'
                    : 'border-white/10 bg-[#1a2333]/50 text-white/38 hover:text-white hover:border-[#39FF88]/25'
                }`}
              >
                {tab.label} <span className="text-[8px] opacity-60 ml-1">{String(counts[tab.key]).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-24"
            >
              {filtered.map((video, i) => (
                <VaultCard
                  key={video.id}
                  video={video}
                  index={i}
                  isPlaying={playingId === video.id}
                  onPlay={() => setPlayingId(playingId === video.id ? null : video.id)}
                  onCardEnter={expandOrbForCard}
                  onCardLeave={resetOrbForCard}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-32 space-y-4">
              <p className="text-[10px] text-white/18 uppercase tracking-[.3em] font-bold">No records in this category yet</p>
            </div>
          )}

          {/* Inline footer */}
          <div className="border-t border-[#39FF88]/10 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <span className="font-['Orbitron',monospace] text-[9px] font-bold tracking-[.2em] uppercase text-white/18">
              JB³Ai Corporation — VVault v1.0
            </span>
            <span className="font-mono text-[9px] tracking-[.15em] text-white/18">
              {new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC
            </span>
          </div>

        </div>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes scanDown {
          0% { top: -60px; }
          100% { top: 100%; }
        }
        @keyframes blobDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 20px); }
        }
        @keyframes hGlitch {
          0%,92%,100% { opacity:0; transform:none; clip-path:none; }
          93% { opacity:0.6; transform:translate(-3px,0) skewX(-2deg); clip-path:inset(15% 0 60% 0); }
          94% { opacity:0; }
          95% { opacity:0.4; transform:translate(3px,0); clip-path:inset(65% 0 5% 0); }
          96% { opacity:0; }
        }
      `}</style>
    </div>
  );
};

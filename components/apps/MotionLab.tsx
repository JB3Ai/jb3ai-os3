import React, { useState, useEffect, useRef } from 'react';
import { generateVideo, waitForVideoOperation, checkApiKeySelection, openApiKeySelection } from '../../services/gemini';
import { Button } from '../ui/Button';
import { Box, Play, Download, Lock, RefreshCw, Zap, ShieldCheck, Cpu, Terminal, Activity, Sliders } from 'lucide-react';
import { VideoGenerationConfig } from '../../types';

type Preset = 'Standard Monolith' | 'Data Flux' | 'Neural Pulse' | 'Forensic Void';

export const MotionLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  
  // v2.0 Parameters
  const [preset, setPreset] = useState<Preset>('Standard Monolith');
  const [speed, setSpeed] = useState<'Steady' | 'Rapid'>('Steady');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkApiKeySelection().then(setHasAccess);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleUnlock = async () => {
    try {
      addLog("Initializing secure handshake...");
      await openApiKeySelection();
      setHasAccess(true);
      addLog("Handshake verified. Access granted.");
    } catch (e) {
      setError("Authorization failed.");
      addLog("Error: Security clearance denied.");
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage('Syncing quantum clusters...');
    addLog(`Initiating v2.0 Synthesis: ${preset} @ ${resolution}`);

    const basePrompt = preset === 'Standard Monolith' 
      ? "A heavy, monolithic black industrial cube. Inset glowing emerald green panels. Dark tech background."
      : preset === 'Data Flux'
      ? "An OS3 core monolith dissolving into vertical emerald data streams. Deep space tech environment."
      : preset === 'Neural Pulse'
      ? "The OS3 monolith core pulsing with emerald energy waves. High contrast cinematic lighting."
      : "A minimalist black cube in a forensic white void. Faint emerald technical lines tracing the edges.";

    const motionPrompt = speed === 'Steady' 
      ? "Extremely slow and steady rotation. Smooth camera push-in."
      : "Rapid geometric rotation with dynamic lighting shifts. High energy motion.";

    const fullPrompt = `${basePrompt} ${motionPrompt} Minimalist, industrial, high-end institutional asset. Seamless background loop. No text, no symbols.`.trim();

    try {
      const config: VideoGenerationConfig = { 
        prompt: fullPrompt, 
        aspectRatio: '16:9', 
        resolution: resolution 
      };

      addLog("Transmitting synthesis parameters...");
      const operation = await generateVideo(config);
      
      if (!operation) throw new Error("Operation initialization failed.");

      addLog("Render sequence active. Allocating GPU clusters...");
      setStatusMessage('Rendering high-fidelity loop...');
      const completedOp = await waitForVideoOperation(operation);
      
      const uri = completedOp.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        setVideoUrl(`${uri}&key=${process.env.API_KEY}`);
        setStatusMessage('Render successful.');
        addLog("Asset synthesis complete. Integrity validated.");
      } else {
        throw new Error("Render completed but no payload detected.");
      }
    } catch (err: any) {
      if (err.message && err.message.includes("Requested entity was not found")) {
          setHasAccess(false);
          setError("Billing authentication required.");
          addLog("Fatal: Billing project session expired.");
      } else {
          setError("Render failed. System cluster busy.");
          addLog("Error: Synthesis interrupted by cluster timeout.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (hasAccess === false) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-8 bg-black/40 backdrop-blur-3xl">
        <div className="p-6 rounded-full bg-gray-900 border border-gray-800 shadow-2xl">
          <Lock className="w-10 h-10 text-gray-500" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Secure Motion Terminal</h2>
          <p className="text-gray-500 max-w-md text-sm leading-relaxed">
            The Motion Lab requires a verified high-throughput API key for 1080p institutional rendering.
          </p>
        </div>
        <Button onClick={handleUnlock} className="px-12 py-4">
          Authenticate Session
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-1 px-1 bg-gray-900/20">
      {/* Control Surface */}
      <div className="lg:col-span-4 bg-[#0a0a0a] border-r border-gray-900 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
              <Box className="w-5 h-5 text-emerald-500" /> Motion Lab v2.0
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-mono">System Integrity Valid</span>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Synthesis Presets
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {(['Standard Monolith', 'Data Flux', 'Neural Pulse', 'Forensic Void'] as Preset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className={`p-4 text-left border transition-all text-[10px] font-bold uppercase tracking-widest ${preset === p ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-black/40 border-gray-800 text-gray-600 hover:border-gray-500'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Sliders className="w-3 h-3" /> Parameters
            </h3>
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[9px] text-gray-600 uppercase font-mono">Motion Cadence</label>
                  <div className="flex bg-black border border-gray-800 p-1">
                    {(['Steady', 'Rapid'] as const).map(s => (
                      <button key={s} onClick={() => setSpeed(s)} className={`flex-1 py-2 text-[9px] font-bold uppercase ${speed === s ? 'bg-white text-black' : 'text-gray-500'}`}>{s}</button>
                    ))}
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] text-gray-600 uppercase font-mono">Precision Layer</label>
                  <div className="flex bg-black border border-gray-800 p-1">
                    {(['720p', '1080p'] as const).map(r => (
                      <button key={r} onClick={() => setResolution(r)} className={`flex-1 py-2 text-[9px] font-bold uppercase ${resolution === r ? 'bg-white text-black' : 'text-gray-500'}`}>{r}</button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6 border-t border-gray-900 bg-black/40">
          {error && <div className="text-[10px] text-red-500 font-mono uppercase bg-red-500/5 p-4 border border-red-500/20">{error}</div>}
          
          <Button 
            onClick={handleGenerate} 
            isLoading={isGenerating}
            className="w-full bg-white text-black h-16 text-[10px] font-bold tracking-[0.3em] hover:bg-gray-200"
          >
            {isGenerating ? 'PROCESSING...' : 'INITIALIZE SYNTHESIS'}
          </Button>

          {/* Diagnostics Console */}
          <div className="h-24 bg-black border border-gray-800 rounded p-3 font-mono text-[9px] text-emerald-500/70 overflow-y-auto overflow-x-hidden scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Rendering Viewport */}
      <div className="lg:col-span-8 bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%] z-0" />

        {isGenerating && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 space-y-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border border-emerald-500/20 animate-ping absolute inset-0" />
              <div className="w-24 h-24 rounded-full border border-emerald-500/40 animate-pulse relative flex items-center justify-center">
                <Zap className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <div className="space-y-4 text-center">
               <h4 className="text-white text-xs font-bold uppercase tracking-[0.4em]">Rendering Asset Data</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono flex items-center justify-center gap-2">
                 <Activity className="w-3 h-3 animate-bounce" /> Status: {statusMessage}
               </p>
            </div>
          </div>
        )}
        
        {videoUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 md:p-20 animate-fade-in relative z-10">
            <div className="w-full aspect-video shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-gray-900 bg-black overflow-hidden relative group">
               <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
               <div className="absolute top-4 right-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <a href={videoUrl.replace('.mp4', '.webm')} download="os3_monolith_loop.webm" className="bg-black/80 hover:bg-white hover:text-black p-4 transition-colors">
                    <Download className="w-5 h-5" />
                 </a>
               </div>
            </div>
            <div className="mt-12 flex items-center gap-10 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
               <span className="flex items-center gap-2 text-emerald-500"><ShieldCheck className="w-3 h-3" /> Integrity: Validated</span>
               <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> Core Sync: Active</span>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-10 opacity-20 relative z-10 scale-110">
            <Box className="w-20 h-20 mx-auto text-gray-600" />
            <p className="text-xs font-mono uppercase tracking-[0.5em] text-gray-600">Awaiting Signal</p>
          </div>
        )}
      </div>
    </div>
  );
};
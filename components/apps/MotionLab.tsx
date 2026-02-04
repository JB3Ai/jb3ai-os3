import React, { useState, useEffect } from 'react';
import { generateVideo, waitForVideoOperation, checkApiKeySelection, openApiKeySelection } from '../../services/gemini';
import { Button } from '../ui/Button';
import { Box, Play, Download, Lock, RefreshCw, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { VideoGenerationConfig } from '../../types';

export const MotionLab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    checkApiKeySelection().then(setHasAccess);
  }, []);

  const handleUnlock = async () => {
    try {
      await openApiKeySelection();
      setHasAccess(true);
    } catch (e) {
      setError("Authorization failed.");
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage('Synchronizing with Veo quantum clusters...');

    // Prompt refined to match the monolithic cube with emerald green panels
    const prompt = `
      A heavy, monolithic black industrial cube representing the OS³ Dash core.
      The lateral faces feature inset glowing emerald green panels that emit a steady, high-fidelity light.
      The top face is a matte dark plate with micro-etched technical circuitry patterns.
      No logos, no text, no symbols. 
      The cube hovers in a vast, dark, infinite tech space.
      The background has muted AI-purple and deep indigo atmospheric depth lighting.
      Subtle atmospheric tech-haze and very thin, faint cyan data lines occasionally trace through the depth.
      Motion: The cube rotates extremely slowly and steadily on its vertical axis.
      The lighting is cinematic and high-contrast, emphasizing the green glow on the surrounding dark surfaces.
      A steady, slow camera push-in towards the monolith.
      Style: Minimalist, industrial, high-end institutional asset.
      Ending: Perfectly centered and stable for a seamless background loop.
    `.trim();

    try {
      const config: VideoGenerationConfig = { 
        prompt, 
        aspectRatio: '16:9', 
        resolution: '1080p' 
      };

      setStatusMessage('Initializing render sequence...');
      const operation = await generateVideo(config);
      
      if (!operation) throw new Error("Operation initialization failed.");

      setStatusMessage('Rendering high-fidelity loop... (8-12s)');
      const completedOp = await waitForVideoOperation(operation);
      
      const uri = completedOp.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        setVideoUrl(`${uri}&key=${process.env.API_KEY}`);
        setStatusMessage('Render successful. Asset ready for deployment.');
      } else {
        throw new Error("Render completed but no payload detected.");
      }
    } catch (err: any) {
      if (err.message && err.message.includes("Requested entity was not found")) {
          setHasAccess(false);
          setError("Billing authentication required.");
      } else {
          setError("Render failed. System cluster busy.");
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
      <div className="lg:col-span-4 bg-[#0a0a0a] border-r border-gray-900 p-10 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
              <Box className="w-5 h-5 text-emerald-500" /> Motion Lab v2.0
            </h2>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-mono">Managed Asset Synthesis</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Brief: OS³ Monolith</h3>
              <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-wider">
                Seamless 1080p rendering of the OS³ Dash monolithic core. Optimized for high-contrast professional environments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-gray-900 space-y-2">
                <span className="text-[9px] text-gray-700 uppercase font-mono">Precision</span>
                <p className="text-[10px] text-white font-bold uppercase">1080p Ultra</p>
              </div>
              <div className="p-4 bg-black/40 border border-gray-900 space-y-2">
                <span className="text-[9px] text-gray-700 uppercase font-mono">Output</span>
                <p className="text-[10px] text-emerald-500 font-bold uppercase">Ready</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-12 border-t border-gray-900">
          {error && <div className="text-[10px] text-red-500 font-mono uppercase bg-red-500/5 p-4 border border-red-500/20">{error}</div>}
          
          <Button 
            onClick={handleGenerate} 
            isLoading={isGenerating}
            className="w-full bg-white text-black h-16 text-[10px] font-bold tracking-[0.3em] hover:bg-gray-200"
          >
            {isGenerating ? 'PROCESSING RENDERS' : 'INITIALIZE SYNTHESIS'}
          </Button>

          {statusMessage && (
            <div className="flex items-center justify-center gap-3 animate-pulse">
              <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin" />
              <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">{statusMessage}</span>
            </div>
          )}
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
               <h4 className="text-white text-xs font-bold uppercase tracking-[0.4em]">Rendering Monolith Data</h4>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">PHASE: EMERALD_LUMINESCENCE</p>
            </div>
          </div>
        )}
        
        {videoUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-20 animate-fade-in relative z-10">
            <div className="w-full aspect-video shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-gray-900 bg-black overflow-hidden relative group">
               <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
               <div className="absolute top-4 right-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <a href={videoUrl} download="os3_monolith_loop.mp4" className="bg-black/80 hover:bg-white hover:text-black p-4 transition-colors">
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
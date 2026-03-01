
import React, { useState, useRef } from 'react';
import { VideoGenerationConfig } from '../../types';
import { generateVideo, waitForVideoOperation, checkApiKeySelection, openApiKeySelection } from '../../services/gemini';
import { Button } from '../ui/Button';
import { Upload, Film, Play, Download, Lock } from 'lucide-react';
import { blobToBase64 } from '../../services/audioUtils';

export const VeoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // Check initial access
    checkApiKeySelection().then(setHasAccess);
  }, []);

  const handleUnlock = async () => {
    try {
      await openApiKeySelection();
      // Assume success and re-check, or just set true based on guidance to avoid race condition
      setHasAccess(true);
    } catch (e) {
      console.error("Unlock failed", e);
      setError("Failed to verify API Key selection.");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !selectedImage) {
      setError("Please provide a prompt or an image.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage('Initializing Veo quantum core...');

    try {
      // 1. Prepare Config
      const config: VideoGenerationConfig = {
        prompt,
        aspectRatio,
        resolution
      };

      if (selectedImage) {
        const base64 = await blobToBase64(selectedImage);
        config.imageBytes = base64;
        config.imageMimeType = selectedImage.type;
      }

      // 2. Start Generation
      setStatusMessage('Transmitting data to Veo-3.1...');
      const operation = await generateVideo(config);

      if (!operation) {
        throw new Error("Failed to start operation.");
      }

      // 3. Poll
      setStatusMessage('Rendering frames... This may take a moment.');
      const completedOp = await waitForVideoOperation(operation);

      const uri = completedOp.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        // Phase 1: Security fix - API Key removed from client bundle.
        setVideoUrl(uri);
        setStatusMessage('Generation complete.');
      } else {
        throw new Error("No video URI returned.");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        setHasAccess(false);
        setError("Session expired or key invalid. Please unlock again.");
      } else {
        setError(err.message || "An unexpected error occurred during generation.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (hasAccess === false) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="p-6 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          <Lock className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-os text-white">Access Restricted</h2>
        <p className="text-gray-400 max-w-md">
          Veo Studio requires a verified Billing Project API key. Please select a paid key to access high-fidelity video generation.
        </p>
        <Button onClick={handleUnlock}>
          Initialize Secure Connection
        </Button>
        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-cyan-500/70 hover:text-cyan-400 underline">
          Documentation: Billing & API Keys
        </a>
      </div>
    );
  }

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto">
      {/* Control Panel */}
      <div className="lg:col-span-4 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-os text-cyan-400 flex items-center gap-2">
            <Film className="w-5 h-5" /> Veo Configuration
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Parameter Setup</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-tech text-gray-300">Text Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the motion, lighting, and subject..."
              className="w-full bg-black/40 border border-gray-700 rounded p-3 text-sm text-gray-200 focus:border-cyan-500 focus:outline-none min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-tech text-gray-300">Reference Image (Optional)</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-colors group"
            >
              {selectedImage ? (
                <div className="relative w-full aspect-video bg-black rounded overflow-hidden">
                  <img src={URL.createObjectURL(selectedImage)} alt="Ref" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white">Change Image</span>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-cyan-400" />
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">Upload Source Frame</span>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-tech text-gray-300">Aspect Ratio</label>
              <div className="flex bg-black/40 rounded p-1 border border-gray-700">
                {['16:9', '9:16'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setAspectRatio(r as any)}
                    className={`flex-1 py-1 text-xs rounded transition-colors ${aspectRatio === r ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-tech text-gray-300">Resolution</label>
              <div className="flex bg-black/40 rounded p-1 border border-gray-700">
                {['720p', '1080p'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setResolution(r as any)}
                    className={`flex-1 py-1 text-xs rounded transition-colors ${resolution === r ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs">
              {error}
            </div>
          )}

          <Button onClick={handleGenerate} isLoading={isGenerating} className="w-full h-12">
            {isGenerating ? 'PROCESSING...' : 'INITIATE GENERATION'}
          </Button>

          {statusMessage && isGenerating && (
            <div className="text-xs text-cyan-500/70 text-center animate-pulse">
              {statusMessage}
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-8 flex flex-col h-full bg-black/60 rounded-lg border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 p-4 z-10">
          <h3 className="text-sm font-os text-gray-500 tracking-widest">OUTPUT_MONITOR</h3>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          {videoUrl ? (
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded border border-gray-800 shadow-2xl overflow-hidden group">
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={videoUrl} download="veo_generation.mp4" className="bg-black/80 hover:bg-cyan-500 text-white p-2 rounded-full inline-flex">
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-700 space-y-4">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-800 flex items-center justify-center">
                <Play className="w-8 h-8 opacity-20" />
              </div>
              <p className="font-tech uppercase tracking-widest text-sm opacity-50">Awaiting Generation Output</p>
            </div>
          )}
        </div>

        {/* Decorative Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat z-0" />
      </div>
    </div>
  );
};

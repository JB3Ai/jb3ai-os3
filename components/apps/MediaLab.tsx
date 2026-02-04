
import React, { useState, useRef } from 'react';
import { VideoGenerationConfig } from '../../types';
import { generateVideo, waitForVideoOperation, checkApiKeySelection, openApiKeySelection } from '../../services/gemini';
import { Upload, Film, Download, Lock, Loader2 } from 'lucide-react';
import { blobToBase64 } from '../../services/audioUtils';

export const MediaLab: React.FC = () => {
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
    checkApiKeySelection().then(setHasAccess);
  }, []);

  const handleUnlock = async () => {
    try {
      await openApiKeySelection();
      setHasAccess(true);
    } catch (e) {
      setError("Verification failed.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !selectedImage) return;

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatusMessage('Queueing render job...');

    try {
      const config: VideoGenerationConfig = { prompt, aspectRatio, resolution };

      if (selectedImage) {
        const base64 = await blobToBase64(selectedImage);
        config.imageBytes = base64;
        config.imageMimeType = selectedImage.type;
      }

      setStatusMessage('Processing model request...');
      const operation = await generateVideo(config);
      
      if (!operation) throw new Error("Operation failed start.");

      setStatusMessage('Rendering asset...');
      const completedOp = await waitForVideoOperation(operation);
      
      const uri = completedOp.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        setVideoUrl(`${uri}&key=${process.env.API_KEY}`);
        setStatusMessage('Asset ready.');
      } else {
        throw new Error("No output received.");
      }

    } catch (err: any) {
      if (err.message && err.message.includes("Requested entity was not found")) {
          setHasAccess(false);
          setError("Session expired. Re-authentication required.");
      } else {
          setError("Generation failed. Please retry.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (hasAccess === false) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="p-4 rounded-full bg-gray-800">
            <Lock className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-light text-white">Restricted Area</h2>
        <p className="text-gray-500 max-w-sm text-sm">
          Media Lab requires an active billing session for high-fidelity rendering.
        </p>
        <button onClick={handleUnlock} className="bg-white text-black px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 overflow-y-auto">
      {/* Parameters */}
      <div className="lg:col-span-4 space-y-8 border-r border-gray-800 pr-8">
        <div>
            <h2 className="text-xl font-light text-white mb-1">Media Lab</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Enterprise Asset Generation</p>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase">Input Prompt</label>
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the desired video output..."
                    className="w-full bg-black border border-gray-800 text-gray-300 p-4 text-sm focus:border-gray-500 outline-none h-32 resize-none"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase">Source File</label>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-gray-800 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors"
                >
                    {selectedImage ? (
                        <span className="text-sm text-white">{selectedImage.name}</span>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="w-5 h-5 text-gray-600" />
                            <span className="text-xs text-gray-600">Upload Reference Frame</span>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && setSelectedImage(e.target.files[0])} className="hidden" accept="image/*" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 uppercase">Ratio</label>
                    <div className="flex border border-gray-800">
                        {['16:9', '9:16'].map((r) => (
                            <button key={r} onClick={() => setAspectRatio(r as any)} className={`flex-1 py-2 text-xs ${aspectRatio === r ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-500 uppercase">Resolution</label>
                    <div className="flex border border-gray-800">
                        {['720p', '1080p'].map((r) => (
                            <button key={r} onClick={() => setResolution(r as any)} className={`flex-1 py-2 text-xs ${resolution === r ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {error && <div className="text-red-500 text-xs py-2">{error}</div>}

            <button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="w-full bg-white text-black h-12 text-sm font-medium tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
            >
                {isGenerating ? 'Processing...' : 'Generate Asset'}
            </button>
            
            {statusMessage && (
                <div className="text-xs text-gray-500 font-mono text-center pt-2">
                    {statusMessage}
                </div>
            )}
        </div>
      </div>

      {/* Viewport */}
      <div className="lg:col-span-8 bg-black border border-gray-800 flex items-center justify-center relative min-h-[400px]">
            {isGenerating && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                    <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
                    <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">Rendering in progress</span>
                </div>
            )}
            
            {videoUrl ? (
                <div className="w-full h-full p-4 flex flex-col items-center">
                    <video src={videoUrl} controls autoPlay loop className="max-h-full max-w-full shadow-2xl" />
                    <a href={videoUrl} download className="mt-4 flex items-center gap-2 text-xs text-white hover:underline uppercase tracking-wide">
                        <Download className="w-4 h-4" /> Download MP4
                    </a>
                </div>
            ) : (
                <div className="text-center space-y-4 opacity-30">
                    <Film className="w-16 h-16 mx-auto" />
                    <p className="text-sm font-mono uppercase tracking-widest">Viewport Empty</p>
                </div>
            )}
      </div>
    </div>
  );
};

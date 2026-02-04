import React, { useEffect, useRef, useState } from 'react';
import { getGenAiInstance } from '../../services/gemini';
import { Mic, MicOff, Activity, XCircle, Terminal } from 'lucide-react';
import { createPcmBlob, decode, decodeAudioData, blobToBase64 } from '../../services/audioUtils';
import { LiveServerMessage, Modality } from '@google/genai';

export const NeuralCore: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'IDLE' | 'LISTENING' | 'PROCESSING'>('IDLE');

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const logEndRef = useRef<HTMLDivElement>(null);
  
  // Visualizer
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-6), msg]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const initAudio = () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
    }
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isConnected) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw idle line
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }
      requestAnimationFrame(draw);

      analyserRef.current!.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1; // Thinner for more precision/professional look
      ctx.strokeStyle = '#e5e5e5'; // Silver/White for business look
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  };

  const connect = async () => {
    initAudio();
    const ai = getGenAiInstance();
    const config = {
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: async () => {
            addLog("System: Neural Core initialized.");
            setIsConnected(true);
            setStatus('IDLE');
            drawVisualizer();

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;
                
                const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
                const source = inputCtx.createMediaStreamSource(stream);
                
                const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
                scriptProcessor.onaudioprocess = (e) => {
                    if (isMuted) return;
                    const inputData = e.inputBuffer.getChannelData(0);
                    const pcmBlob = createPcmBlob(inputData);
                    
                    sessionRef.current.then((session: any) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                };
                source.connect(scriptProcessor);
                scriptProcessor.connect(inputCtx.destination);
            } catch (err) {
                console.error(err);
                addLog("Error: Audio input inaccessible.");
            }
        },
        onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
                setStatus('PROCESSING');
                const ctx = audioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(
                    decode(base64Audio),
                    ctx,
                    24000,
                    1
                );
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                
                if (analyserRef.current) {
                    source.connect(analyserRef.current);
                    analyserRef.current.connect(ctx.destination);
                } else {
                    source.connect(ctx.destination);
                }

                source.addEventListener('ended', () => {
                    sourcesRef.current.delete(source);
                    if (sourcesRef.current.size === 0) setStatus('IDLE');
                });
                
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
                addLog("User interrupted.");
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
            }
        },
        onclose: () => {
            addLog("System: Session ended.");
            setIsConnected(false);
            setStatus('IDLE');
        },
        onerror: (e: any) => {
            addLog("Error: " + e.message);
        }
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
        },
        systemInstruction: "You are OS-3, the central intelligence of the JB³Ai workspace. You are calm, authoritative, and helpful. You do not use slang. You assist with business tasks, scheduling, and information retrieval. You do not provide medical, legal, or financial advice."
      }
    };

    try {
        const sessionPromise = ai.live.connect(config);
        sessionRef.current = sessionPromise;
    } catch (e) {
        addLog("Error: Connection failed.");
    }
  };

  const disconnect = () => {
    if (sessionRef.current) {
        sessionRef.current.then((s: any) => s.close && s.close());
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsConnected(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="h-full flex flex-col p-8 gap-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
                <h2 className="text-xl font-light tracking-tight text-white flex items-center gap-3">
                    <Activity className="w-5 h-5 text-gray-400" /> Neural Core
                </h2>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Business Intelligence Unit</p>
            </div>
            <div className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${isConnected ? 'text-emerald-500' : 'text-gray-600'}`}>
                {isConnected ? 'System Online' : 'Offline'}
            </div>
        </div>

        {/* Visualization */}
        <div className="flex-1 bg-black/50 border border-gray-800 rounded-sm relative flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width={800} height={300} className="w-full h-full opacity-80" />
            
            {!isConnected && (
                <button 
                    onClick={connect}
                    className="absolute z-10 bg-white text-black px-6 py-2.5 font-medium text-xs tracking-wide hover:bg-gray-200 transition-colors uppercase"
                >
                    Initialize Core
                </button>
            )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleMute}
                    disabled={!isConnected}
                    className={`p-3 rounded-full border transition-all ${isMuted ? 'bg-red-900/20 border-red-800 text-red-400' : 'bg-gray-900 border-gray-700 text-white hover:border-gray-500'}`}
                >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <div className="text-[10px] font-mono text-gray-500 uppercase">
                    Status: <span className="text-gray-300">{status}</span>
                </div>
            </div>

            {isConnected && (
                <button 
                    onClick={disconnect}
                    className="flex items-center gap-2 text-[10px] text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider"
                >
                    <XCircle className="w-3 h-3" /> Terminate Session
                </button>
            )}
        </div>

        {/* Terminal Log */}
        <div className="h-32 bg-black border border-gray-800 p-4 font-mono text-[10px] text-gray-400 overflow-y-auto">
            <div className="flex items-center gap-2 text-gray-600 mb-2 pb-2 border-b border-gray-900 uppercase tracking-wider">
                <Terminal className="w-3 h-3" /> System Log
            </div>
            {logs.map((log, i) => (
                <div key={i} className="mb-1">
                    <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                </div>
            ))}
            <div ref={logEndRef} />
        </div>
    </div>
  );
};
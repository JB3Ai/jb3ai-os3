import React, { useEffect, useRef, useState } from 'react';
import { getGenAiInstance } from '../../services/gemini';
import { Button } from '../ui/Button';
import { Mic, Video, StopCircle, Zap, Activity } from 'lucide-react';
import { createPcmBlob, decode, decodeAudioData, encode, blobToBase64 } from '../../services/audioUtils';
import { LiveServerMessage, Modality } from '@google/genai';

export const LiveNexus: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    // Refs for Audio/Video handling
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const sessionRef = useRef<any>(null); // To store session object
    const frameIntervalRef = useRef<number | null>(null);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef<number>(0);
    const logEndRef = useRef<HTMLDivElement>(null);

    // Visualization
    const canvasVizRef = useRef<HTMLCanvasElement>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);

    const addLog = (msg: string) => {
        setLogs((prev: string[]) => [...prev.slice(-4), msg]); // Keep last 5
    };

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    useEffect(() => {
        return () => {
            disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (!canvasVizRef.current || !analyserRef.current) return;

        const canvas = canvasVizRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!isConnected) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            requestAnimationFrame(draw);

            analyserRef.current!.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // fade effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                // Cyan to Purple gradient simulation
                const r = 0;
                const g = 240 - (i * 2);
                const b = 255;

                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
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
                    addLog("Connection Established.");
                    setIsConnected(true);
                    drawVisualizer();

                    // Setup Microphone Stream
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: isVideoEnabled });
                        streamRef.current = stream;

                        // If video enabled, attach to video element
                        if (isVideoEnabled && videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.play();
                        }

                        // Audio Processing
                        const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
                        const source = inputCtx.createMediaStreamSource(stream);
                        // Connect mic to visualizer for local feedback (optional, but good for UI)
                        // Note: We use output context for visualizer mainly, but could mix here.

                        const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
                        scriptProcessor.onaudioprocess = (e) => {
                            if (isMuted) return;
                            const inputData = e.inputBuffer.getChannelData(0);
                            const pcmBlob = createPcmBlob(inputData);

                            // Send Audio
                            sessionRef.current.then((session: any) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputCtx.destination);

                        // Video Processing Loop
                        if (isVideoEnabled) {
                            startVideoStreaming();
                        }

                    } catch (err) {
                        console.error("Media Error", err);
                        addLog("Error accessing media devices.");
                    }
                },
                onmessage: async (message: LiveServerMessage) => {
                    // Handle Audio Output
                    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (base64Audio && audioContextRef.current) {
                        const ctx = audioContextRef.current;
                        // Sync timing
                        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

                        const audioBuffer = await decodeAudioData(
                            decode(base64Audio),
                            ctx,
                            24000,
                            1
                        );

                        const source = ctx.createBufferSource();
                        source.buffer = audioBuffer;

                        // Connect to visualizer
                        if (analyserRef.current) {
                            source.connect(analyserRef.current);
                            analyserRef.current.connect(ctx.destination);
                        } else {
                            source.connect(ctx.destination);
                        }

                        source.addEventListener('ended', () => {
                            sourcesRef.current.delete(source);
                        });

                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current += audioBuffer.duration;
                        sourcesRef.current.add(source);
                    }

                    // Handle Interruptions
                    if (message.serverContent?.interrupted) {
                        addLog("Interrupted by user.");
                        sourcesRef.current.forEach((s: AudioBufferSourceNode) => s.stop());
                        sourcesRef.current.clear();
                        nextStartTimeRef.current = 0;
                    }
                },
                onclose: () => {
                    addLog("Connection Closed.");
                    setIsConnected(false);
                },
                onerror: (e: any) => {
                    console.error(e);
                    addLog("Error: " + e.message);
                }
            },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                },
                systemInstruction: "You are JB-3, an advanced AI assistant in a futuristic motion lab. You are concise, helpful, and have a slightly robotic but friendly personality."
            }
        };

        try {
            const sessionPromise = ai.live.connect(config);
            sessionRef.current = sessionPromise;
        } catch (e) {
            addLog("Failed to connect to Live API.");
        }
    };

    const startVideoStreaming = () => {
        if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);

        frameIntervalRef.current = window.setInterval(() => {
            if (!canvasRef.current || !videoRef.current) return;

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            ctx.drawImage(videoRef.current, 0, 0);

            canvasRef.current.toBlob(async (blob: Blob | null) => {
                if (blob && sessionRef.current) {
                    const base64 = await blobToBase64(blob);
                    sessionRef.current.then((session: any) => {
                        session.sendRealtimeInput({
                            media: { data: base64, mimeType: 'image/jpeg' }
                        });
                    });
                }
            }, 'image/jpeg', 0.8);

        }, 1000); // 1 FPS to save bandwidth/tokens
    };

    const disconnect = () => {
        if (sessionRef.current) {
            // There isn't a direct .close() on the promise, but usually the session object has it.
            // The SDK implies we close by just stopping interaction or if supported.
            // Actually, the example says: "When the conversation is finished, use session.close()"
            sessionRef.current.then((s: any) => s.close && s.close());
        }

        // Stop local media
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop());
        }
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
        }
        sourcesRef.current.forEach((s: AudioBufferSourceNode) => s.stop());
        sourcesRef.current.clear();
        setIsConnected(false);
        setLogs((prev: string[]) => [...prev, "Disconnected."]);
    };

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <div className="flex flex-col h-full p-6 gap-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between z-10">
                <div>
                    <h2 className="text-xl font-os text-purple-400 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> Live Nexus
                    </h2>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Realtime Multimodal Link</p>
                </div>
                <div className={`px-3 py-1 rounded border ${isConnected ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'} text-xs font-bold font-tech uppercase`}>
                    {isConnected ? 'LINK ACTIVE' : 'OFFLINE'}
                </div>
            </div>

            {/* Main Visualizer Area */}
            <div className="flex-1 relative bg-black/40 rounded-lg border border-gray-800 overflow-hidden group">
                <canvas
                    ref={canvasVizRef}
                    className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
                    width={800}
                    height={400}
                />

                {/* Video Overlay */}
                <div className={`absolute top-4 right-4 w-64 aspect-video bg-black rounded border border-gray-700 overflow-hidden transition-all duration-500 ${isVideoEnabled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                    <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
                </div>

                {/* Center Status */}
                {!isConnected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button onClick={connect} className="scale-125">
                            INITIALIZE CONNECTION
                        </Button>
                    </div>
                )}

                {/* Controls Bottom */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-gray-700">
                    <button
                        onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                        className={`p-3 rounded-full transition-colors ${isVideoEnabled ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                        <Video className="w-5 h-5" />
                    </button>
                    <button
                        onClick={toggleMute}
                        className={`p-4 rounded-full transition-colors ${!isMuted ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-red-500/20 text-red-400'}`}
                    >
                        <Mic className="w-6 h-6" />
                    </button>
                    <button
                        onClick={disconnect}
                        className="p-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                        <StopCircle className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Log Output */}
            <div className="flex-1 overflow-y-auto min-h-0 space-y-4 p-4 bg-black/80 rounded border border-gray-800 font-tech text-xs text-gray-400 font-mono">
                {logs.map((log: string, i: number) => (
                    <div key={i}>
                        <span className="text-cyan-500/50">[{new Date().toLocaleTimeString()}]</span> {log}
                    </div>
                ))}
                <div ref={logEndRef} />
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

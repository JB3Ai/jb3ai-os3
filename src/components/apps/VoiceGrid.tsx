import React, { useEffect, useRef, useState } from 'react';
import { Activity, ClipboardList, Languages, Mic, MicOff, PhoneCall, PhoneOff, ShieldCheck, Timer } from 'lucide-react';
import { LiveServerMessage, Modality } from '@google/genai';
import { getGenAiInstance } from '../../services/gemini';
import { createPcmBlob, decode, decodeAudioData } from '../../services/audioUtils';
import { buildVoiceGridSystemPrompt, VoiceGridLeadContext } from '../../content/voiceGridDemo';

type CallState = 'STANDBY' | 'DIALING' | 'LIVE' | 'PROCESSING';

type LeadRecord = VoiceGridLeadContext;

interface VoiceGridProps {
  leadData?: {
    fullName?: string;
    company?: string;
    email?: string;
    phone?: string;
    interestType?: string;
    preferredLanguage?: string;
    country?: string;
    lead_type?: 'demo' | 'callback';
  } | null;
}

const LEADS: LeadRecord[] = [
  {
    id: 'VG-041',
    company: 'Mabena Logistics',
    contact: 'Thabo M.',
    language: 'English / Zulu',
    intent: 'Fleet expansion inquiry',
    priority: 'HIGH',
    window: '09:30 SAST'
  },
  {
    id: 'VG-052',
    company: 'Karoo Retail Group',
    contact: 'Anika V.',
    language: 'Afrikaans / English',
    intent: 'Multi-site automation review',
    priority: 'MEDIUM',
    window: '11:15 SAST'
  },
  {
    id: 'VG-067',
    company: 'Ubuntu Health Systems',
    contact: 'Lerato N.',
    language: 'English / Sepedi',
    intent: 'Advisor callback qualification',
    priority: 'HIGH',
    window: '14:00 SAST'
  }
];

const buildLeadFromGate = (leadData: VoiceGridProps['leadData']): LeadRecord | null => {
  if (!leadData) return null;

  const company = leadData.company?.trim();
  const contact = leadData.fullName?.trim();
  if (!company && !contact) return null;

  const intent =
    leadData.interestType?.trim() ||
    (leadData.lead_type === 'callback' ? 'Advisor callback request' : 'Voice Grid business demo');

  return {
    id: 'VG-LIVE',
    company: company || 'Prospective Client',
    contact: contact || leadData.email?.split('@')[0] || 'Prospect',
    language: leadData.preferredLanguage || 'English',
    intent,
    priority: leadData.lead_type === 'callback' || !!leadData.phone ? 'HIGH' : 'MEDIUM',
    window: leadData.country === 'Africa' ? 'Business hours SAST' : 'Business hours local'
  };
};

export const VoiceGrid: React.FC<VoiceGridProps> = ({ leadData }) => {
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callState, setCallState] = useState<CallState>('STANDBY');
  const [logs, setLogs] = useState<string[]>([
    'Voice Grid console initialized.',
    'Sandbox mode active. Browser audio is enabled; PSTN bridge is not yet connected.'
  ]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const logEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const isConnectedRef = useRef(false);
  const isMutedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const customLead = buildLeadFromGate(leadData);
  const leadQueue = customLead ? [customLead, ...LEADS] : LEADS;
  const activeLead = leadQueue[activeLeadIndex] || leadQueue[0];

  useEffect(() => {
    setActiveLeadIndex(0);
  }, [leadData?.fullName, leadData?.company, leadData?.interestType, leadData?.preferredLanguage, leadData?.country, leadData?.lead_type]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-7), message]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    isConnectedRef.current = isConnected;
  }, [isConnected]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

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
      analyser.connect(audioContextRef.current.destination);
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
      if (!isConnectedRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#1f2937';
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
      analyserRef.current!.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#22d3ee');
      gradient.addColorStop(1, '#f8fafc');

      ctx.lineWidth = 2;
      ctx.strokeStyle = gradient;
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

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
    if (isConnectedRef.current) return;

    initAudio();
    await audioContextRef.current?.resume();
    setCallState('DIALING');
    addLog(`Dialing ${activeLead.contact} at ${activeLead.company}.`);

    const ai = getGenAiInstance();
    const config = {
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: async () => {
          setIsConnected(true);
          setCallState('LIVE');
          addLog(`Voice bridge active for lead ${activeLead.id}.`);
          drawVisualizer();

          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            inputContextRef.current = inputCtx;
            await inputCtx.resume();
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(2048, 1, 1);

            scriptProcessor.onaudioprocess = event => {
              if (isMutedRef.current) return;
              const inputData = event.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);

              if (!sessionRef.current) return;
              sessionRef.current.then((session: any) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          } catch (error) {
            console.error(error);
            addLog('Audio capture unavailable. Voice Grid requires microphone access.');
          }
        },
        onmessage: async (message: LiveServerMessage) => {
          const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

          if (base64Audio && audioContextRef.current) {
            setCallState('PROCESSING');
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
            } else {
              source.connect(ctx.destination);
            }

            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
              if (sourcesRef.current.size === 0) {
                setCallState('LIVE');
              }
            });

            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }

          if (message.serverContent?.interrupted) {
            addLog('Caller interruption detected. Resynchronizing voice state.');
            sourcesRef.current.forEach(source => source.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            setCallState('LIVE');
          }
        },
        onclose: () => {
          addLog(`Voice bridge closed for lead ${activeLead.id}.`);
          setIsConnected(false);
          setCallState('STANDBY');
        },
        onerror: (error: any) => {
          console.error(error);
          addLog(`Connection error: ${error.message}`);
          setCallState('STANDBY');
        }
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
        },
        systemInstruction: buildVoiceGridSystemPrompt(activeLead)
      }
    };

    try {
      const sessionPromise = ai.live.connect(config);
      sessionRef.current = sessionPromise;
    } catch (error) {
      console.error(error);
      addLog('Voice Grid failed to initialize the live session.');
      setCallState('STANDBY');
    }
  };

  const disconnect = () => {
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => session.close && session.close());
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (inputContextRef.current) {
      inputContextRef.current.close().catch(() => undefined);
      inputContextRef.current = null;
    }

    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    nextStartTimeRef.current = 0;
    setIsConnected(false);
    setCallState('STANDBY');
  };

  const statusTone =
    callState === 'LIVE'
      ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
      : callState === 'PROCESSING'
        ? 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10'
        : callState === 'DIALING'
          ? 'text-amber-300 border-amber-500/40 bg-amber-500/10'
          : 'text-gray-500 border-gray-800 bg-black/40';

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between border-b border-gray-900 pb-4">
        <div className="space-y-2">
          <h2 className="text-xl text-white tracking-tight uppercase flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-cyan-400" /> Voice Grid
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Enterprise Voice Execution Console</p>
        </div>
        <div className={`px-3 py-2 border text-[10px] font-mono uppercase tracking-[0.25em] ${statusTone}`}>
          {callState}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_320px] gap-6 flex-1 min-h-0">
        <section className="border border-gray-900 bg-black/40 p-5 space-y-5">
          <div className="flex items-center gap-3 text-white text-xs uppercase tracking-[0.25em]">
            <ClipboardList className="w-4 h-4 text-cyan-400" /> Active Queue
          </div>
          <div className="space-y-3">
            {leadQueue.map((lead, index) => (
              <button
                key={lead.id}
                disabled={isConnected}
                onClick={() => setActiveLeadIndex(index)}
                className={`w-full text-left p-4 border transition-colors ${index === activeLeadIndex ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-gray-900 bg-black/30 hover:border-gray-700'} ${isConnected ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">{lead.company}</span>
                  <span className={`text-[9px] uppercase tracking-[0.25em] ${lead.priority === 'HIGH' ? 'text-amber-300' : 'text-gray-500'}`}>{lead.priority}</span>
                </div>
                <div className="pt-3 space-y-2 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  <div>{lead.contact}</div>
                  <div>{lead.intent}</div>
                  <div>{lead.window}</div>
                  {lead.id === 'VG-LIVE' && <div className="text-cyan-400">Startup gate context</div>}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="border border-gray-900 bg-black/50 p-6 flex flex-col gap-6 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Lead ID</div>
              <div className="pt-2 text-white text-sm font-semibold uppercase tracking-[0.18em]">{activeLead.id}</div>
            </div>
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Contact</div>
              <div className="pt-2 text-white text-sm font-semibold uppercase tracking-[0.18em]">{activeLead.contact}</div>
            </div>
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Language</div>
              <div className="pt-2 text-white text-sm font-semibold uppercase tracking-[0.18em]">{activeLead.language}</div>
            </div>
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Window</div>
              <div className="pt-2 text-white text-sm font-semibold uppercase tracking-[0.18em]">{activeLead.window}</div>
            </div>
          </div>

          <div className="relative flex-1 min-h-[240px] border border-gray-900 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_rgba(0,0,0,0.02)_45%,_rgba(0,0,0,0.8)_100%)] overflow-hidden">
            <canvas ref={canvasRef} width={1000} height={320} className="absolute inset-0 w-full h-full opacity-90" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 gap-5">
              <div className="text-[10px] text-cyan-400 uppercase tracking-[0.35em]">Sandbox Voice Session</div>
              <div className="text-3xl md:text-5xl font-semibold text-white uppercase tracking-tight">
                {isConnected ? activeLead.company : 'Ready To Dial'}
              </div>
              <p className="max-w-2xl text-[11px] text-gray-400 uppercase tracking-[0.18em] leading-relaxed">
                Voice Grid is currently running in browser-audio mode. This demo shows the operator console and AI conversation layer before PSTN or Azure telephony routing is connected.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-900 bg-black/30 p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={isConnected ? disconnect : connect}
                className={`flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${isConnected ? 'bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25' : 'bg-white text-black hover:bg-cyan-300'}`}
              >
                {isConnected ? <PhoneOff className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                {isConnected ? 'End Session' : 'Launch Session'}
              </button>
              <button
                onClick={() => setIsMuted(prev => !prev)}
                disabled={!isConnected}
                className={`flex items-center gap-2 px-4 py-3 border text-[10px] uppercase tracking-[0.25em] transition-colors ${isMuted ? 'border-red-500/30 text-red-300 bg-red-500/10' : 'border-gray-800 text-gray-300 hover:border-gray-600'} ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isMuted ? 'Muted' : 'Mic Live'}
              </button>
            </div>
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.22em] text-gray-500">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-cyan-400" /> POPIA Gate Enabled</div>
              <div className="flex items-center gap-2"><Languages className="w-4 h-4 text-cyan-400" /> {activeLead.language}</div>
              <div className="flex items-center gap-2"><Timer className="w-4 h-4 text-cyan-400" /> SLA Window {activeLead.window}</div>
            </div>
          </div>
        </section>

        <section className="border border-gray-900 bg-black/40 p-5 flex flex-col min-h-0">
          <div className="flex items-center gap-3 text-white text-xs uppercase tracking-[0.25em]">
            <Activity className="w-4 h-4 text-cyan-400" /> Structured Signals
          </div>
          <div className="pt-5 grid grid-cols-1 gap-3">
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Buying Intent</div>
              <div className="pt-2 text-sm text-white uppercase tracking-[0.18em]">{activeLead.intent}</div>
            </div>
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Suggested Outcome</div>
              <div className="pt-2 text-sm text-white uppercase tracking-[0.18em]">
                {activeLead.priority === 'HIGH' ? 'Escalate To Advisor' : 'Continue Qualification'}
              </div>
            </div>
            <div className="border border-gray-900 bg-black/30 p-4">
              <div className="text-[9px] text-gray-600 uppercase tracking-[0.25em]">Compliance State</div>
              <div className="pt-2 text-sm text-white uppercase tracking-[0.18em]">Consent Required Before Export</div>
            </div>
          </div>

          <div className="pt-6 flex-1 min-h-0 flex flex-col">
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mb-3">Operations Log</div>
            <div className="flex-1 overflow-y-auto border border-gray-900 bg-black p-4 font-mono text-[10px] text-gray-400 space-y-3">
              {logs.map((log, index) => (
                <div key={`${log}-${index}`}>
                  <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

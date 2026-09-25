'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  ExternalLink, 
  Github, 
  Layers, 
  Maximize2, 
  MessageSquare, 
  Mic, 
  Radio, 
  Sparkles, 
  Tv, 
  Users, 
  Video, 
  Volume2, 
  Database, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Globe2,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for R3F canvas to ensure clean SSR
const EduConnectArchitectureCanvas = dynamic(
  () => import('./EduConnectArchitectureCanvas'),
  { ssr: false }
);

interface ChatMessage {
  sender: 'lex' | 'user';
  text: string;
}

export function EduConnectShowcase() {
  const [viewMode, setViewMode] = useState<'product' | 'system'>('product');
  const [activeTier, setActiveTier] = useState<number | null>(null);
  const [selectedLang, setSelectedLang] = useState<'English' | 'Hindi' | 'Spanish'>('English');

  // Interactive Lex Assistant queries
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'lex', text: 'Tracking live lecture on Distributed Cloud Systems. How can I assist your session?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuery = (query: string, response: string) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'lex', text: response }]);
      setIsTyping(false);
    }, 600);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="project-educonnect" 
      ref={containerRef}
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 border-b border-zinc-200/80 overflow-hidden bg-[#FAFAF8]"
    >
      {/* Background 3D Particle & Data Canvas */}
      <EduConnectArchitectureCanvas isDeconstructed={viewMode === 'system'} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Project Header & Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                01 / CLOUD INFRASTRUCTURE & AI
              </span>
              <span className="text-xs font-mono text-zinc-400">Jan – May 2025</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-950 tracking-tight">
              Cloud-Native E-Learning Platform
            </h2>

            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
              Full-stack serverless web application supporting up to 250 concurrent users with live WebRTC video broadcast, 
              interactive Lex conversational AI, and multi-language translation.
            </p>
          </div>

          {/* SIGNATURE INTERACTIVE TOGGLE: PRODUCT <-> SYSTEM */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-1 rounded-2xl bg-zinc-200/80 backdrop-blur-md border border-zinc-300/80 shadow-inner flex items-center gap-1">
              <button
                onClick={() => setViewMode('product')}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'product'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Tv className="w-3.5 h-3.5 text-indigo-600" />
                <span>PRODUCT VIEW</span>
              </button>

              <button
                onClick={() => setViewMode('system')}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'system'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-white" />
                <span>SYSTEM (DECONSTRUCT)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </button>
            </div>
          </div>
        </div>

        {/* INTERACTION CALLOUT BANNER */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-zinc-500 bg-white/70 border border-zinc-200/80 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>
              {viewMode === 'product' 
                ? 'Displaying sharp frontend product interface. Click [SYSTEM] to deconstruct into the AWS serverless pipeline.' 
                : 'Deconstructed 3D perspective active. Revealing 5 sequential AWS architectural tiers and live service roles.'}
            </span>
          </div>

          {viewMode === 'system' && (
            <button
              onClick={() => setViewMode('product')}
              className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reconstruct Product</span>
            </button>
          )}
        </div>

        {/* STAGE CONTAINER WITH CSS 3D PERSPECTIVE */}
        <div 
          className="relative w-full rounded-2xl transition-all duration-700 ease-out"
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* THE PRODUCT INTERFACE (Sharp HTML/CSS Browser Frame) */}
          <div
            className={`w-full rounded-2xl bg-white border border-zinc-200/90 shadow-2xl transition-all duration-700 ease-out overflow-hidden ${
              viewMode === 'system'
                ? 'opacity-25 pointer-events-none scale-[0.94] -translate-y-6 brightness-95 rotate-x-[14deg]'
                : 'opacity-100 scale-100 translate-y-0 shadow-zinc-900/10'
            }`}
          >
            {/* macOS Chrome Header */}
            <div className="px-4 py-3 bg-zinc-100/90 border-b border-zinc-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 border border-red-500/40 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/40 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/40 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-mono text-zinc-600 shadow-2xs">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span className="text-zinc-400">https://</span>
                <span className="text-zinc-900 font-medium">educonnect.cloud</span>
                <span className="text-zinc-400">/classroom/live/cs-402</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  CHIME WebRTC
                </span>
              </div>
            </div>

            {/* In-Browser Application Body */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAFAF8]">
              {/* Main Classroom Stage (8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {/* Classroom Status Bar */}
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white border border-zinc-200/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-zinc-900">CS-402: DISTRIBUTED SYSTEMS</span>
                    <span className="text-zinc-300">|</span>
                    <span className="text-xs font-mono text-zinc-500">Session ID: AWS-CHIME-78B</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>214 / 250 Active</span>
                  </div>
                </div>

                {/* Primary Presenter Stage (AWS Chime Video Stream Simulation) */}
                <div className="relative aspect-video rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between p-4 shadow-md">
                  {/* Subtle Video Grid Overlay Texture */}
                  <div 
                    aria-hidden="true" 
                    className="absolute inset-0 opacity-15 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" 
                  />

                  {/* Top Presenter Pill */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Prof. A. Kumar — Distributed Architecture</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-mono">
                      <span>1080p60 · AWS Chime SDK</span>
                    </div>
                  </div>

                  {/* Central Presentation Canvas / Slides */}
                  <div className="relative z-10 my-auto text-center px-6 py-4 rounded-xl bg-black/40 backdrop-blur-xs border border-white/5 max-w-lg mx-auto">
                    <p className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-1">
                      Live Lecture Topic
                    </p>
                    <h3 className="text-lg sm:text-xl font-display font-semibold text-white">
                      Event-Driven Microservices & Cloud State Synchronization
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 font-mono">
                      Lambda Fan-Out → DynamoDB Session Tables → KMS Key Rotation
                    </p>
                  </div>

                  {/* Bottom Presenter Audio Waveform */}
                  <div className="relative z-10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <div className="flex items-center gap-0.5 h-3">
                        <span className="w-1 bg-emerald-400 h-2 animate-pulse rounded-full" />
                        <span className="w-1 bg-emerald-400 h-3 animate-pulse delay-75 rounded-full" />
                        <span className="w-1 bg-emerald-400 h-1.5 animate-pulse delay-150 rounded-full" />
                        <span className="w-1 bg-emerald-400 h-2.5 animate-pulse delay-100 rounded-full" />
                      </div>
                      <span className="text-[11px] text-zinc-300 ml-1">Live Audio Clear</span>
                    </div>

                    <div className="text-[11px] text-zinc-400">
                      Subtitles: <span className="text-white font-semibold">{selectedLang}</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Student Participant Video Tiles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-300">Priya Sharma</span>
                      <Mic className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">Student #104 · Gurugram</div>
                  </div>

                  <div className="h-24 rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-300">Rahul Verma</span>
                      <span className="text-[10px] font-mono text-zinc-500">Muted</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500">Student #105 · Bengaluru</div>
                  </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Multi-language Translation Selector (Amazon Translate) */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-zinc-500 hidden sm:inline">Translate:</span>
                    {(['English', 'Hindi', 'Spanish'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLang(lang)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                          selectedLang === lang
                            ? 'bg-indigo-600 text-white'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel: Interactive AI Learning Companion (Amazon Lex) (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-xl bg-white border border-zinc-200/80 p-4 shadow-2xs min-h-[460px]">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-zinc-900">Amazon Lex AI</h4>
                        <p className="text-[10px] font-mono text-zinc-400">Classroom Companion</p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  {/* Chat Stream */}
                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                          m.sender === 'lex'
                            ? 'bg-indigo-50/80 border border-indigo-100 text-zinc-800'
                            : 'bg-zinc-900 text-white ml-4'
                        }`}
                      >
                        <div className="text-[9px] font-mono uppercase tracking-wider mb-1 opacity-60">
                          {m.sender === 'lex' ? 'Amazon Lex' : 'You'}
                        </div>
                        {m.text}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="p-2 rounded-lg bg-zinc-100 text-zinc-500 text-xs font-mono animate-pulse">
                        Lex is synthesizing answer...
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Query Pills */}
                <div className="pt-3 border-t border-zinc-100">
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Try Asking the Lex Bot:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleQuery(
                        'Summarize the core distributed lecture takeaways.',
                        'Summary: Focus is on decoupled event streams using AWS Lambda to process session heartbeats asynchronously.'
                      )}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-zinc-50 hover:bg-indigo-50 border border-zinc-200/60 hover:border-indigo-200 text-xs font-mono text-zinc-700 transition-colors"
                    >
                      → Summarize lecture points
                    </button>
                    <button
                      onClick={() => handleQuery(
                        'How does DynamoDB manage session data?',
                        'DynamoDB maintains lightweight session records and attendee heartbeat tables with fast partitioned lookups.'
                      )}
                      className="text-left px-2.5 py-1.5 rounded-lg bg-zinc-50 hover:bg-indigo-50 border border-zinc-200/60 hover:border-indigo-200 text-xs font-mono text-zinc-700 transition-colors"
                    >
                      → DynamoDB session architecture
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THE DECONSTRUCTED ARCHITECTURE SYSTEM (Foreground Reveal in SYSTEM Mode) */}
          <AnimatePresence>
            {viewMode === 'system' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-30 p-6 sm:p-10 rounded-2xl bg-zinc-950/95 text-white border border-indigo-500/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* System View Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold">
                      <Cpu className="w-4 h-4" />
                      <span>SEQUENTIAL AWS SERVERLESS PIPELINE</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold mt-1 text-white">
                      EduConnect Architectural Deconstruction
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                      Hover tiers to trace data flow
                    </span>
                    <button
                      onClick={() => setViewMode('product')}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 font-mono text-xs font-semibold hover:bg-indigo-100 transition-colors"
                    >
                      Reconstruct UI ↺
                    </button>
                  </div>
                </div>

                {/* SEQUENTIAL 5-TIER AWS DISCOVERY GRAPH */}
                <div className="py-6 space-y-4">
                  {/* Tier 1: CloudFront & Route 53 */}
                  <div
                    onMouseEnter={() => setActiveTier(1)}
                    onMouseLeave={() => setActiveTier(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeTier === 1
                        ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          TIER 01 · EDGE ENTRY
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white">Amazon CloudFront & Route 53</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">Global CDN & TLS Termination</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                      Delivers single-page application assets with edge-cached low latency; routes incoming WebRTC signaling traffic to the API Gateway.
                    </p>
                  </div>

                  {/* Tier 2: AWS Lambda */}
                  <div
                    onMouseEnter={() => setActiveTier(2)}
                    onMouseLeave={() => setActiveTier(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeTier === 2
                        ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          TIER 02 · SERVERLESS COMPUTE
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white">AWS Lambda</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">Event-Driven Microservices</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                      Executes stateless business logic: WebRTC room token generation, Lex conversational webhook dispatches, and student permission verification.
                    </p>
                  </div>

                  {/* Tier 3: Lex & DynamoDB */}
                  <div
                    onMouseEnter={() => setActiveTier(3)}
                    onMouseLeave={() => setActiveTier(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeTier === 3
                        ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          TIER 03 · AI & DATA
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white">Amazon Lex & Amazon DynamoDB</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">Conversational AI & Session Store</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                      <strong>Amazon Lex:</strong> Handles classroom companion intent parsing and Q&A dialogue. 
                      <strong className="ml-2">Amazon DynamoDB:</strong> Stores session and application data, attendee roster states, and room lifecycles.
                    </p>
                  </div>

                  {/* Tier 4: S3 & KMS */}
                  <div
                    onMouseEnter={() => setActiveTier(4)}
                    onMouseLeave={() => setActiveTier(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeTier === 4
                        ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          TIER 04 · PERSISTENCE & KEYS
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white">Amazon S3 & AWS KMS</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">Object Storage & Encryption</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                      <strong>Amazon S3:</strong> Durable object store for recorded classroom streams and lecture resources. 
                      <strong className="ml-2">AWS KMS:</strong> Encryption key management securing session data in transit and at rest.
                    </p>
                  </div>

                  {/* Tier 5: Chime SDK, Translate & CloudWatch */}
                  <div
                    onMouseEnter={() => setActiveTier(5)}
                    onMouseLeave={() => setActiveTier(null)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      activeTier === 5
                        ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          TIER 05 · MEDIA & TELEMETRY
                        </span>
                        <h4 className="text-sm font-mono font-bold text-white">AWS Chime SDK · Translate · CloudWatch</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">WebRTC Pipelines & Monitoring</span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                      WebRTC multi-participant media orchestration, real-time subtitle translation via Amazon Translate, and live CloudWatch telemetry for infrastructure health.
                    </p>
                  </div>
                </div>

                {/* System Telemetry Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400">
                  <span>DEPLOYMENT: AWS SERVERLESS FRAMEWORK</span>
                  <span>CAPACITY: UP TO 250 CONCURRENT USERS</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Stack Chips & GitHub Action */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-1">STACK:</span>
            {[
              'React',
              'TypeScript',
              'AWS Chime SDK',
              'Lambda',
              'DynamoDB',
              'S3',
              'Amazon Lex',
              'Amazon Translate',
              'AWS KMS',
              'CloudWatch'
            ].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-700 shadow-2xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/ObsureBat"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-800 hover:text-indigo-600 transition-colors"
          >
            <span>View GitHub Repository</span>
            <Github className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default EduConnectShowcase;

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  ExternalLink, 
  Github, 
  Layers, 
  Maximize2, 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Globe, 
  ShoppingBag, 
  Laptop, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  ChevronRight, 
  ChevronDown, 
  ArrowDown, 
  Check, 
  CheckCircle2, 
  Flame, 
  FileText, 
  Lock, 
  X,
  Database
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { EduConnectShowcase } from './EduConnectShowcase';
import { GpiStorefrontShowcase } from './GpiStorefrontShowcase';
import { SmartGallaShowcase } from './SmartGallaShowcase';

// Project Deck Specification
interface ProjectCardData {
  id: string;
  num: string;
  tag: string;
  title: string;
  subTitle: string;
  oneSentence: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  accentColor: string;
  accentBorder: string;
  accentGlow: string;
  githubUrl?: string;
  liveUrl?: string;
}

const DECK_PROJECTS: ProjectCardData[] = [
  {
    id: 'agesify',
    num: '01',
    tag: 'PROJECT 01 // AI & CLOUD SECURITY',
    title: 'AGESIFY Adaptive Cloud Firewall',
    subTitle: 'Presented at IC3SE 2025 · Amity University',
    oneSentence: 'Self-optimizing AI defense engine fusing Transformer, BiLSTM, and CNN architectures directly into AWS WAF & GuardDuty with 97.1% threat detection accuracy.',
    metrics: [
      { label: 'THREAT ACCURACY', value: '97.1%' },
      { label: 'ARCHITECTURES FUSED', value: '3 DEEP MODELS' },
      { label: 'CLOUD DEFENSE', value: 'AWS WAF NATIVE' },
    ],
    stack: ['AWS WAF', 'GuardDuty', 'TensorFlow', 'Transformer', 'BiLSTM', 'CloudWatch'],
    accentColor: 'indigo',
    accentBorder: 'border-indigo-500/30',
    accentGlow: 'from-indigo-500/10 via-sky-500/5 to-transparent',
    githubUrl: PORTFOLIO_DATA.personal.github,
  },
  {
    id: 'educonnect',
    num: '02',
    tag: 'PROJECT 02 // AWS SERVERLESS & WEBRTC',
    title: 'Cloud-Native E-Learning Platform',
    subTitle: 'Enterprise Serverless Infrastructure',
    oneSentence: 'Full-stack serverless platform supporting 250 concurrent WebRTC video streams, interactive Amazon Lex conversational AI, and multi-language translation.',
    metrics: [
      { label: 'CONCURRENT STREAMS', value: '250 USERS' },
      { label: 'SERVERLESS LATENCY', value: '< 120MS P99' },
      { label: 'HIPAA & KMS ENCRYPTED', value: '100% AUDITABLE' },
    ],
    stack: ['AWS Chime SDK', 'Lambda', 'DynamoDB', 'Amazon Lex', 'S3 / KMS', 'TypeScript'],
    accentColor: 'blue',
    accentBorder: 'border-sky-500/30',
    accentGlow: 'from-sky-500/10 via-indigo-500/5 to-transparent',
    githubUrl: 'https://github.com/ObsureBat',
  },
  {
    id: 'gpi-storefront',
    num: '03',
    tag: 'PROJECT 03 // FULL-STACK COMMERCE & SSR',
    title: 'GPI Industries E-Commerce Storefront',
    subTitle: 'Live Production Web Platform (gpipvtltd.com)',
    oneSentence: 'Production commerce storefront featuring secure JWT administrative inventory portal, automated catalog management, and SSR tuned for Google Search ranking.',
    metrics: [
      { label: 'PRODUCTION UPTIME', value: '99.98%' },
      { label: 'FCP SPEED INDEX', value: '< 850MS' },
      { label: 'STORE CATALOGUE', value: 'POSTGRESQL' },
    ],
    stack: ['React', 'Node.js', 'Express', 'JWT Auth', 'PostgreSQL', 'Tailwind CSS'],
    accentColor: 'pink',
    accentBorder: 'border-pink-500/30',
    accentGlow: 'from-pink-500/10 via-rose-500/5 to-transparent',
    liveUrl: 'https://gpipvtltd.com',
  },
  {
    id: 'smartgalla',
    num: '04',
    tag: 'PROJECT 04 // DESKTOP SYSTEMS & OFFLINE ERP',
    title: 'SmartGalla POS & Accounting Ledger',
    subTitle: 'Zero-Latency Offline-First Retail Suite',
    oneSentence: 'Electron desktop retail ledger enabling uninterrupted offline sales billing with automated SQLite queueing and double-entry cloud synchronization.',
    metrics: [
      { label: 'OFFLINE CONTINUITY', value: 'ZERO DOWNTIME' },
      { label: 'ACCOUNTING ENGINE', value: 'DOUBLE-ENTRY' },
      { label: 'INVOICING ENGINE', value: 'THERMAL / GST' },
    ],
    stack: ['Electron', 'React', 'TypeScript', 'SQLite Queue', 'PostgreSQL', 'Node.js'],
    accentColor: 'emerald',
    accentBorder: 'border-emerald-500/30',
    accentGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    githubUrl: 'https://github.com/ObsureBat',
  },
];

export function CinematicProjectsDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and pause Lenis whenever the deep dive modal is open
  useEffect(() => {
    if (modalProject) {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setModalProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        if (typeof window !== 'undefined' && (window as any).__lenis) {
          (window as any).__lenis.start();
        }
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [modalProject]);

  // Measure scroll progression through the calibrated 380vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active project card based on scroll progression
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v < 0.25) {
        setActiveIndex(0);
      } else if (v < 0.50) {
        setActiveIndex(1);
      } else if (v < 0.75) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Smooth scroll directly to a specific project card
  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    const targets = [0.08, 0.35, 0.62, 0.90];
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = rect.height;
    const targetScrollY = containerTop + targets[index] * (containerHeight - window.innerHeight);

    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScrollY, { immediate: false, duration: 1.1 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Card 1 transforms: starts dominant, then scales down and recesses backward into z-space
  const card1Scale = useTransform(scrollYProgress, [0, 0.22, 0.32, 0.6, 1], [1, 1, 0.92, 0.85, 0.78]);
  const card1Y = useTransform(scrollYProgress, [0, 0.22, 0.32, 0.6, 1], [0, 0, -32, -56, -76]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.32, 0.6, 0.75], [1, 1, 0.55, 0.25, 0]);

  // Card 2 transforms: rises from underneath Card 1, becomes dominant, then scales down behind Card 3
  const card2Y = useTransform(scrollYProgress, [0.18, 0.30, 0.50, 0.58, 0.85], [420, 0, 0, -32, -58]);
  const card2Scale = useTransform(scrollYProgress, [0.18, 0.30, 0.50, 0.58, 0.85], [0.94, 1, 1, 0.92, 0.85]);
  const card2Opacity = useTransform(scrollYProgress, [0.18, 0.28, 0.50, 0.58, 0.85], [0, 1, 1, 0.55, 0]);

  // Card 3 transforms: rises from underneath Card 2, becomes dominant, then scales down behind Card 4
  const card3Y = useTransform(scrollYProgress, [0.45, 0.56, 0.74, 0.82, 1], [420, 0, 0, -32, -56]);
  const card3Scale = useTransform(scrollYProgress, [0.45, 0.56, 0.74, 0.82, 1], [0.94, 1, 1, 0.92, 0.86]);
  const card3Opacity = useTransform(scrollYProgress, [0.45, 0.54, 0.74, 0.82, 1], [0, 1, 1, 0.55, 0.25]);

  // Card 4 transforms: rises from underneath Card 3 and stays dominant through end
  const card4Y = useTransform(scrollYProgress, [0.70, 0.80, 1], [420, 0, 0]);
  const card4Scale = useTransform(scrollYProgress, [0.70, 0.80, 1], [0.94, 1, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0.70, 0.78, 1], [0, 1, 1]);

  const cardMotionSettings = [
    { y: card1Y, scale: card1Scale, opacity: card1Opacity, zIndex: 10 },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity, zIndex: 20 },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity, zIndex: 30 },
    { y: card4Y, scale: card4Scale, opacity: card4Opacity, zIndex: 40 },
  ];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[380vh] bg-[#FAFAF8] text-zinc-900 select-none"
    >
      {/* ------------------------------------------------------------- */}
      {/* Ambient Visual Atmosphere (Grid & Warm Radial Glows)          */}
      {/* ------------------------------------------------------------- */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/[0.04] via-sky-400/[0.03] to-transparent blur-3xl"
      />

      {/* ------------------------------------------------------------- */}
      {/* CINEMATIC STICKY VIEWPORT STAGE (h-screen with breathing room) */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 lg:px-14 overflow-hidden z-20">
        
        {/* Top Section Telemetry & Tiny Interactive Project Navigator */}
        <div className="relative z-30 max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pt-1">
          
          {/* Left: Section Header Pill */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-zinc-200/90 shadow-2xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider text-zinc-900 uppercase">
                04 / SELECTED PROJECTS
              </span>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-zinc-400">
              Interactive System Deck
            </span>
          </div>

          {/* Right: Tiny Project Navigator (● 01  ○ 02  ○ 03  ○ 04) */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/90 border border-zinc-200/90 shadow-2xs backdrop-blur-md">
            {DECK_PROJECTS.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => scrollToProject(idx)}
                  className={`group relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-950 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80 font-medium'
                  }`}
                  title={`Jump to ${proj.num} ${proj.title}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-indigo-400' : 'bg-zinc-300 group-hover:bg-zinc-500'
                    }`}
                  />
                  <span>{proj.num}</span>
                  {isActive && (
                    <span className="hidden md:inline text-[11px] text-zinc-300 font-normal">
                      {proj.id === 'agesify' ? 'AGESIFY' : proj.id === 'educonnect' ? 'EduConnect' : proj.id === 'gpi-storefront' ? 'Storefront' : 'SmartGalla'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* CENTER STAGE: 3D CINEMATIC STACKING CARDS                  */}
        {/* ----------------------------------------------------------- */}
        <div 
          className="relative z-20 max-w-6xl w-full mx-auto h-[74vh] sm:h-[76vh] flex items-center justify-center my-auto"
          style={{ perspective: '1400px' }}
        >
          {DECK_PROJECTS.map((project, idx) => {
            const motionStyle = cardMotionSettings[idx];
            const isTopActive = activeIndex === idx;

            return (
              <motion.div
                key={project.id}
                style={{
                  y: motionStyle.y,
                  scale: motionStyle.scale,
                  opacity: motionStyle.opacity,
                  zIndex: motionStyle.zIndex,
                  transformOrigin: 'top center',
                  pointerEvents: isTopActive ? 'auto' : 'none',
                  willChange: 'transform, opacity',
                }}
                className={`absolute inset-0 rounded-3xl bg-white border border-zinc-200/90 shadow-2xl shadow-zinc-950/8 flex flex-col justify-between overflow-hidden transition-shadow duration-300 ${
                  isTopActive ? 'ring-1 ring-zinc-900/5' : ''
                }`}
              >
                {/* Subtle Card Ambient Background Tint */}
                <div 
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accentGlow}`}
                />

                {/* Card Header Bar */}
                <div className="relative z-10 px-6 sm:px-8 pt-5 pb-3 border-b border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-white font-mono text-[11px] font-bold tracking-wider">
                      {project.num}
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-600">
                      {project.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-medium transition-colors"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Card Body (Two Columns: Editorial Punch + Visual Scene) */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 flex-1 items-center overflow-hidden">
                  
                  {/* Left Column: Editorial Summary & Architectural Metrics */}
                  <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 mb-1">
                        {project.subTitle}
                      </p>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-zinc-950 tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
                        {project.oneSentence}
                      </p>
                    </div>

                    {/* Architectural KPI Metrics */}
                    <div className="grid grid-cols-3 gap-2.5 pt-2">
                      {project.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 shadow-2xs"
                        >
                          <div className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider uppercase">
                            {metric.label}
                          </div>
                          <div className="text-xs sm:text-sm font-mono font-extrabold text-zinc-900 mt-0.5 truncate">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                        ENGINEERING STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 text-[11px] font-mono font-medium shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand Case Study & Action Button */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setModalProject(project.id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Interactive Deep Dive</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                      </button>

                      <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                        Click to explore sandbox
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Custom Visual Scene Representation */}
                  <div className="lg:col-span-6 h-full min-h-[220px] sm:min-h-[280px] flex items-center justify-center rounded-2xl bg-zinc-50/80 border border-zinc-200/80 p-4 sm:p-5 relative overflow-hidden shadow-inner">
                    {project.id === 'agesify' && <AgesifyScenePreview />}
                    {project.id === 'educonnect' && <EduConnectScenePreview onOpenModal={() => setModalProject('educonnect')} />}
                    {project.id === 'gpi-storefront' && <GpiStorefrontScenePreview onOpenModal={() => setModalProject('gpi-storefront')} />}
                    {project.id === 'smartgalla' && <SmartGallaScenePreview onOpenModal={() => setModalProject('smartgalla')} />}
                  </div>
                </div>

                {/* Card Bottom Strip */}
                <div className="relative z-10 px-6 sm:px-8 py-3 bg-zinc-50/60 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>SYSTEM STATUS // ONLINE & PRODUCTION TESTED</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>CARD</span>
                    <strong className="text-zinc-900">{project.num}</strong>
                    <span>/ 04</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ----------------------------------------------------------- */}
        {/* BOTTOM TELEMETRY BAR & SCROLL MOTION CUE                    */}
        {/* ----------------------------------------------------------- */}
        <div className="relative z-30 max-w-6xl w-full mx-auto flex items-center justify-between pt-2 text-xs font-mono text-zinc-400">
          
          {/* Active Card Counter */}
          <div className="flex items-center gap-3">
            <span className="text-zinc-900 font-bold">
              0{activeIndex + 1}
            </span>
            <span className="text-zinc-300">/</span>
            <span>04 SYSTEMS</span>
            <span className="hidden sm:inline text-zinc-300">|</span>
            <span className="hidden sm:inline">CINEMATIC SCENE STACK</span>
          </div>

          {/* Scroll Down Motion Cue */}
          <div className="flex items-center gap-3">
            {activeIndex < 3 ? (
              <button
                onClick={() => scrollToProject(activeIndex + 1)}
                className="group inline-flex items-center gap-1.5 text-zinc-700 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <span className="font-semibold tracking-wider uppercase text-[11px]">
                  Next System Scene
                </span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <span className="text-emerald-600 font-semibold text-[11px] uppercase tracking-wider">
                All 4 Systems Explored · Scroll to Skills ↓
              </span>
            )}
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* FULL-FEATURED INTERACTIVE SYSTEM DEEP DIVE MODAL               */}
      {/* ------------------------------------------------------------- */}
      {/* ------------------------------------------------------------- */}
      {/* FULL-FEATURED INTERACTIVE SYSTEM DEEP DIVE MODAL (PORTAL)      */}
      {/* ------------------------------------------------------------- */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {modalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setModalProject(null);
                }
              }}
              className="fixed inset-0 z-[99999] bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                className="relative w-full max-w-7xl h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col cursor-default border border-zinc-200"
              >
                {/* Modal Top Bar */}
                <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/95 backdrop-blur-sm z-30 shrink-0 select-none">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                    <h3 className="font-mono text-sm font-bold text-zinc-900 uppercase">
                      Interactive System Architecture Deep Dive
                    </h3>
                    <span className="hidden sm:inline px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-700 font-mono text-[11px] font-semibold uppercase">
                      {modalProject}
                    </span>
                  </div>

                  {/* High-Visibility, Bulletproof Close Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setModalProject(null);
                    }}
                    className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-950 text-zinc-700 hover:text-white transition-all duration-200 cursor-pointer border border-zinc-200 hover:border-zinc-950 shadow-2xs z-50"
                    title="Close modal (Esc)"
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Close</span>
                    <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div 
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8 bg-[#FAFAF8]"
                >
                  {modalProject === 'agesify' && <AgesifyDeepDive />}
                  {modalProject === 'educonnect' && <EduConnectShowcase />}
                  {modalProject === 'gpi-storefront' && <GpiStorefrontShowcase />}
                  {modalProject === 'smartgalla' && <SmartGallaShowcase />}

                  {/* Bottom Close Button for Convenience */}
                  <div className="mt-12 pt-6 border-t border-zinc-200 flex justify-center pb-8">
                    <button
                      type="button"
                      onClick={() => setModalProject(null)}
                      className="px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Return to Project Deck</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// =====================================================================
// SCENE PREVIEW: AGESIFY (Real-time Threat Mitigation Simulation)
// =====================================================================
function AgesifyScenePreview() {
  const [selectedAttack, setSelectedAttack] = useState<'ddos' | 'sqli' | 'benign'>('ddos');

  const attackData = {
    ddos: {
      type: 'SYN Flood Anomaly (Layer 4)',
      volume: '14,200 req/sec',
      modelOutput: 'Transformer + CNN payload score: 0.994',
      wafAction: 'BLOCK_IP (AWS WAF Rate-Limit Triggered)',
      color: 'text-rose-600',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    sqli: {
      type: 'Tautology Pattern Injection (Layer 7)',
      volume: '1 req/payload',
      modelOutput: 'BiLSTM sequence parser: 0.988 confidence',
      wafAction: 'DROP_PACKET & CLOUDWATCH_ALERT',
      color: 'text-amber-600',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    benign: {
      type: 'Standard User HTTPS Session',
      volume: '32 req/min',
      modelOutput: 'Latent feature distance: Normal (< 0.05)',
      wafAction: 'ALLOW_TRAFFIC (Zero Latency Overhead)',
      color: 'text-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  };

  const current = attackData[selectedAttack];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono">
      {/* Top Threat Controller */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-xs font-bold text-zinc-900 uppercase">Live Pipeline Telemetry</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60">
          IC3SE 2025 Model
        </span>
      </div>

      {/* Simulator Switch Buttons */}
      <div className="my-3">
        <span className="text-[10px] text-zinc-400 block mb-1.5 uppercase tracking-wider font-semibold">
          Select Traffic Stream Simulation:
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setSelectedAttack('ddos')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              selectedAttack === 'ddos'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            DDoS Flood
          </button>
          <button
            onClick={() => setSelectedAttack('sqli')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              selectedAttack === 'sqli'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            SQL Injection
          </button>
          <button
            onClick={() => setSelectedAttack('benign')}
            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              selectedAttack === 'benign'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Benign Flow
          </button>
        </div>
      </div>

      {/* Real-Time Detection Output Card */}
      <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/70 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-[10px]">VECTOR:</span>
          <span className="font-bold text-zinc-900 text-[11px]">{current.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-[10px]">INGEST RATE:</span>
          <span className="font-bold text-zinc-800 text-[11px]">{current.volume}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 text-[10px]">AI DECISION:</span>
          <span className="font-mono text-[10.5px] text-indigo-600 font-bold">{current.modelOutput}</span>
        </div>
        <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
          <span className="text-[10px] text-zinc-400">AWS WAF ACTION:</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${current.badge}`}>
            {current.wafAction}
          </span>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// SCENE PREVIEW: EDUCONNECT (WebRTC Classroom & Amazon Lex AI)
// =====================================================================
function EduConnectScenePreview({ onOpenModal }: { onOpenModal: () => void }) {
  const [lexMessage, setLexMessage] = useState('How does AWS Lambda manage connection pooling with DynamoDB?');
  const [lexResponse, setLexResponse] = useState('Lambda keeps TCP connections alive across warm invocations using AWS SDK connection re-use settings.');

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono">
      {/* Top WebRTC Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
          <span className="text-xs font-bold text-zinc-900 uppercase">Live Classroom Stream</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          250 CONCURRENT
        </div>
      </div>

      {/* Interactive Lex AI Dialogue Snippet */}
      <div className="my-3 space-y-2">
        <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 text-xs">
          <div className="flex items-center gap-1 text-[10px] text-sky-700 font-bold mb-1">
            <Sparkles className="w-3 h-3 text-sky-600" />
            <span>STUDENT QUERY</span>
          </div>
          <p className="text-zinc-800 text-[11px]">{lexMessage}</p>
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs">
          <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold mb-1">
            <span>AMAZON LEX ASSISTANT</span>
          </div>
          <p className="text-zinc-700 text-[11px] leading-relaxed">{lexResponse}</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
        <span className="text-zinc-400">AWS Chime SDK + KMS</span>
        <button
          onClick={onOpenModal}
          className="text-sky-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Deconstruct Architecture</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// SCENE PREVIEW: GPI STOREFRONT (Live E-Commerce & Product Catalog)
// =====================================================================
function GpiStorefrontScenePreview({ onOpenModal }: { onOpenModal: () => void }) {
  const [cartCount, setCartCount] = useState(2);
  const [hasAdded, setHasAdded] = useState(false);

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    setHasAdded(true);
    setTimeout(() => setHasAdded(false), 1200);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono">
      {/* Storefront Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-pink-600" />
          <span className="text-xs font-bold text-zinc-900 uppercase">Production Storefront</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200/60">
          <span>CART:</span>
          <span>{cartCount} ITEMS</span>
        </div>
      </div>

      {/* Featured Production Item */}
      <div className="my-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
              IN STOCK (140)
            </span>
            <span className="text-[10px] text-zinc-400">SKU: GTM-RS-1KG</span>
          </div>
          <h4 className="text-xs font-bold text-zinc-900">GTM Rock Salt 1kg</h4>
          <p className="text-[10px] text-zinc-500">100% Pure Himalayan Crystals</p>
          <div className="text-xs font-extrabold text-zinc-900 pt-0.5">₹99.00</div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            hasAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs'
          }`}
        >
          {hasAdded ? 'Added ✓' : '+ Add to Cart'}
        </button>
      </div>

      {/* Database & Production Status */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Database className="w-3 h-3 text-pink-500" />
          <span>PostgreSQL Active</span>
        </div>
        <button
          onClick={onOpenModal}
          className="text-pink-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Admin Portal View</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// SCENE PREVIEW: SMARTGALLA (Offline-First Sync & Ledger)
// =====================================================================
function SmartGallaScenePreview({ onOpenModal }: { onOpenModal: () => void }) {
  const [isOnline, setIsOnline] = useState(false);
  const [queuedSales, setQueuedSales] = useState(3);

  const toggleConnection = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      setTimeout(() => setQueuedSales(0), 1000);
    } else {
      setQueuedSales(3);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-white rounded-xl border border-zinc-200/90 shadow-2xs font-mono">
      {/* Top Bar with Online/Offline Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Laptop className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-zinc-900 uppercase">Desktop POS Ledger</span>
        </div>

        <button
          onClick={toggleConnection}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
            isOnline
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}
        >
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          <span>{isOnline ? 'Online (Synced)' : 'Offline (Simulate)'}</span>
        </button>
      </div>

      {/* POS Queue & Double Entry Preview */}
      <div className="my-3 space-y-2">
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-zinc-400">LOCAL QUEUE (SQLITE)</div>
            <div className="font-bold text-zinc-900">
              {queuedSales === 0 ? 'Queue Cleared (All Synced)' : `${queuedSales} Pending Offline Invoices`}
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-700 text-[10px] font-bold">
            TI/009 · ₹ 3,450
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-emerald-700 font-semibold">DOUBLE-ENTRY LEDGER</div>
            <div className="font-bold text-emerald-950">Debit Cash · Credit Revenue</div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800">Balanced ✓</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
        <span className="text-zinc-500">Thermal GST Slip Engine</span>
        <button
          onClick={onOpenModal}
          className="text-emerald-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Open Full Terminal</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// AGESIFY DEEP DIVE MODAL CONTENT
// =====================================================================
function AgesifyDeepDive() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      <div className="space-y-3">
        <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-mono font-bold">
          IC3SE 2025 RESEARCH PUBLICATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-950">
          AI-Driven Network Intrusion Detection & Adaptive Cloud Firewall System
        </h2>
        <p className="text-base text-zinc-600 leading-relaxed font-sans max-w-3xl">
          A hybrid deep-learning architecture fusing self-attention (Transformer), temporal sequence recurrence (BiLSTM), 
          and spatial convolutional feature extraction (CNN) into a unified intrusion detection manifold. Deployed as AGESIFY, 
          an AI-native adaptive cloud firewall orchestrated with AWS WAF, GuardDuty, and CloudWatch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <div className="text-xs text-indigo-600 font-bold">DETECTION ACCURACY</div>
          <div className="text-3xl font-extrabold text-zinc-950 mt-1">97.1%</div>
          <p className="text-xs text-zinc-500 mt-2">Tested against multi-vector attack datasets (CICIDS2017 & custom pcaps).</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <div className="text-xs text-sky-600 font-bold">DEEP MODELS FUSED</div>
          <div className="text-3xl font-extrabold text-zinc-950 mt-1">3 Models</div>
          <p className="text-xs text-zinc-500 mt-2">Transformer self-attention + BiLSTM recurrence + Spatial CNN extraction.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <div className="text-xs text-emerald-600 font-bold">CLOUD MITIGATION</div>
          <div className="text-3xl font-extrabold text-zinc-950 mt-1">AWS WAF</div>
          <p className="text-xs text-zinc-500 mt-2">Automated real-time IP block rules pushed in sub-millisecond cycles.</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900 text-white space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
            System Architecture Flow
          </h4>
          <span className="text-xs font-mono text-emerald-400">Pipeline Verified</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700">
            <span className="text-zinc-400">01 / INGEST</span>
            <p className="text-zinc-200 mt-1 font-bold">Raw PCAP & NetFlow Packet Streams</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700">
            <span className="text-zinc-400">02 / EXTRACT</span>
            <p className="text-zinc-200 mt-1 font-bold">Header & Payload Byte Tensorization</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700">
            <span className="text-indigo-400">03 / INFERENCE</span>
            <p className="text-zinc-200 mt-1 font-bold">Deep Hybrid Neural Classification</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700">
            <span className="text-emerald-400">04 / MITIGATION</span>
            <p className="text-zinc-200 mt-1 font-bold">AWS WAF Dynamic Rule Deployment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CinematicProjectsDeck;

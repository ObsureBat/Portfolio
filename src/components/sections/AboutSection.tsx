'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { 
  GraduationCap, 
  MapPin, 
  Cloud, 
  ShieldCheck, 
  ChevronDown,
  Award
} from 'lucide-react';
import { FramerIconBadge } from '@/components/ui/FramerIconBadge';
import { PillarCard } from '@/components/ui/PillarCard';
import { fadeInUp, smoothTransition } from '@/lib/animations';

// Architectural "ENGINEERING SYSTEM / AYUSH" Visualization (Zero images/portraits)
function EngineeringSystemVisual() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[380px] sm:h-[400px] lg:h-[420px] rounded-2xl bg-gradient-to-b from-white/90 via-neutral-50/80 to-white/95 dark:from-neutral-900/90 dark:via-neutral-950/80 dark:to-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800/90 shadow-md p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none group">
      
      {/* Dynamic Ambient Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-[radial-gradient(350px_circle_at_50%_50%,rgba(99,102,241,0.06),transparent_75%)]" />

      {/* Top HUD Header Bar */}
      <div className="relative z-20 flex items-center justify-between border-b border-neutral-200/80 dark:border-neutral-800 pb-2 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-800 dark:text-zinc-200 font-semibold tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>
            <span className="hidden sm:inline">ENGINEERING SYSTEM // </span>AYUSH
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-400 dark:text-neutral-500">
          <span className="hidden sm:inline">SYSTEM.TYPE // SWE</span>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">AVAILABLE</span>
        </div>
      </div>

      {/* Corner Bracket Accents */}
      <div className="absolute top-10 left-2 w-2 h-2 border-t-2 border-l-2 border-indigo-500/40 pointer-events-none z-10" />
      <div className="absolute top-10 right-2 w-2 h-2 border-t-2 border-r-2 border-indigo-500/40 pointer-events-none z-10" />
      <div className="absolute bottom-10 left-2 w-2 h-2 border-b-2 border-l-2 border-indigo-500/40 pointer-events-none z-10" />
      <div className="absolute bottom-10 right-2 w-2 h-2 border-b-2 border-r-2 border-indigo-500/40 pointer-events-none z-10" />

      {/* Crosshairs */}
      <span className="absolute top-11 left-4 text-[10px] font-mono text-neutral-400/60 dark:text-neutral-600/60 pointer-events-none z-10">+</span>
      <span className="absolute top-11 right-4 text-[10px] font-mono text-neutral-400/60 dark:text-neutral-600/60 pointer-events-none z-10">+</span>
      <span className="absolute bottom-11 left-4 text-[10px] font-mono text-neutral-400/60 dark:text-neutral-600/60 pointer-events-none z-10">+</span>
      <span className="absolute bottom-11 right-4 text-[10px] font-mono text-neutral-400/60 dark:text-neutral-600/60 pointer-events-none z-10">+</span>

      {/* Diagram Canvas: SVG Lines + HTML Interactive Nodes */}
      <div className="relative w-full flex-1 my-1 flex items-center justify-center">
        
        {/* Subtle Background Dot Grid */}
        <div className="absolute inset-0 opacity-[0.22] dark:opacity-[0.14] bg-[radial-gradient(#6366F1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* SVG Architectural Connecting Schematics */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradSoftware" x1="50%" y1="50%" x2="22%" y2="24%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradCloud" x1="50%" y1="50%" x2="78%" y2="24%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradSecurity" x1="50%" y1="50%" x2="22%" y2="76%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradAI" x1="50%" y1="50%" x2="78%" y2="76%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Central Coordinate Axes */}
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="text-neutral-300 dark:text-neutral-700" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="text-neutral-300 dark:text-neutral-700" />

          {/* Outer Dashed Concentric Circles */}
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" fill="none" className="text-neutral-300/80 dark:text-neutral-700/80" />
          <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 3" fill="none" className="text-indigo-500/20 dark:text-indigo-400/20" />

          {/* 4 Architectural Connector Lines from Center to Nodes */}
          {/* Line 01: To Software (Top-Left) */}
          <line 
            x1="50" y1="50" x2="24" y2="24" 
            stroke={hoveredNode === 'software' ? 'url(#lineGradSoftware)' : 'currentColor'}
            strokeWidth={hoveredNode === 'software' ? '1.5' : '0.8'}
            strokeDasharray={hoveredNode === 'software' ? 'none' : '2 2'}
            className={hoveredNode === 'software' ? 'transition-all duration-300' : 'text-neutral-300 dark:text-neutral-700 transition-all duration-300'}
          />
          {/* Line 02: To Cloud (Top-Right) */}
          <line 
            x1="50" y1="50" x2="76" y2="24" 
            stroke={hoveredNode === 'cloud' ? 'url(#lineGradCloud)' : 'currentColor'}
            strokeWidth={hoveredNode === 'cloud' ? '1.5' : '0.8'}
            strokeDasharray={hoveredNode === 'cloud' ? 'none' : '2 2'}
            className={hoveredNode === 'cloud' ? 'transition-all duration-300' : 'text-neutral-300 dark:text-neutral-700 transition-all duration-300'}
          />
          {/* Line 03: To Security (Bottom-Left) */}
          <line 
            x1="50" y1="50" x2="24" y2="76" 
            stroke={hoveredNode === 'security' ? 'url(#lineGradSecurity)' : 'currentColor'}
            strokeWidth={hoveredNode === 'security' ? '1.5' : '0.8'}
            strokeDasharray={hoveredNode === 'security' ? 'none' : '2 2'}
            className={hoveredNode === 'security' ? 'transition-all duration-300' : 'text-neutral-300 dark:text-neutral-700 transition-all duration-300'}
          />
          {/* Line 04: To AI/ML (Bottom-Right) */}
          <line 
            x1="50" y1="50" x2="76" y2="76" 
            stroke={hoveredNode === 'ai' ? 'url(#lineGradAI)' : 'currentColor'}
            strokeWidth={hoveredNode === 'ai' ? '1.5' : '0.8'}
            strokeDasharray={hoveredNode === 'ai' ? 'none' : '2 2'}
            className={hoveredNode === 'ai' ? 'transition-all duration-300' : 'text-neutral-300 dark:text-neutral-700 transition-all duration-300'}
          />

          {/* Coordinate Intersection Points */}
          <circle cx="37" cy="37" r="0.8" fill="#6366F1" className="opacity-60" />
          <circle cx="63" cy="37" r="0.8" fill="#0EA5E9" className="opacity-60" />
          <circle cx="37" cy="63" r="0.8" fill="#8B5CF6" className="opacity-60" />
          <circle cx="63" cy="63" r="0.8" fill="#10B981" className="opacity-60" />
        </svg>

        {/* Center Architecture Core Chip: "AYUSH / ENGINEERING PROFILE" */}
        <div className="relative z-20 flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-white/95 dark:bg-neutral-900/95 border border-neutral-300/90 dark:border-neutral-700/90 shadow-sm text-center">
          <div className="relative flex items-center justify-center mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
          </div>
          <span className="font-display font-extrabold text-xs sm:text-[13px] tracking-wider text-zinc-950 dark:text-white uppercase leading-tight">
            AYUSH
          </span>
          <span className="font-mono text-[9px] sm:text-[9.5px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-0.5 whitespace-nowrap">
            ENGINEERING PROFILE
          </span>
          {/* Subtle pulse ring around center core */}
          <div className="absolute -inset-2.5 rounded-2xl border border-indigo-500/20 pointer-events-none" />
        </div>

        {/* Node 01: Top-Left // SOFTWARE */}
        <div 
          onMouseEnter={() => setHoveredNode('software')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute top-2 left-2 sm:top-3 sm:left-3 z-20 p-2 sm:p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
            hoveredNode === 'software'
              ? 'bg-white dark:bg-neutral-850 border-indigo-500 shadow-sm scale-[1.03]'
              : 'bg-white/85 dark:bg-neutral-900/85 border-neutral-200/90 dark:border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
              01 // SOFTWARE
            </span>
          </div>
          <div className="font-display font-semibold text-[11px] sm:text-xs text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">
            Full-Stack Systems
          </div>
        </div>

        {/* Node 02: Top-Right // CLOUD */}
        <div 
          onMouseEnter={() => setHoveredNode('cloud')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-20 p-2 sm:p-2.5 rounded-lg border transition-all duration-200 cursor-pointer text-right ${
            hoveredNode === 'cloud'
              ? 'bg-white dark:bg-neutral-850 border-sky-500 shadow-sm scale-[1.03]'
              : 'bg-white/85 dark:bg-neutral-900/85 border-neutral-200/90 dark:border-neutral-800'
          }`}
        >
          <div className="flex items-center justify-end gap-1.5">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-sky-600 dark:text-sky-400 tracking-wider">
              02 // CLOUD
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          </div>
          <div className="font-display font-semibold text-[11px] sm:text-xs text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">
            AWS Infrastructure
          </div>
        </div>

        {/* Node 03: Bottom-Left // SECURITY */}
        <div 
          onMouseEnter={() => setHoveredNode('security')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-20 p-2 sm:p-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
            hoveredNode === 'security'
              ? 'bg-white dark:bg-neutral-850 border-violet-500 shadow-sm scale-[1.03]'
              : 'bg-white/85 dark:bg-neutral-900/85 border-neutral-200/90 dark:border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-violet-600 dark:text-violet-400 tracking-wider">
              03 // SECURITY
            </span>
          </div>
          <div className="font-display font-semibold text-[11px] sm:text-xs text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">
            Defensive Engineering
          </div>
        </div>

        {/* Node 04: Bottom-Right // AI / ML */}
        <div 
          onMouseEnter={() => setHoveredNode('ai')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 p-2 sm:p-2.5 rounded-lg border transition-all duration-200 cursor-pointer text-right ${
            hoveredNode === 'ai'
              ? 'bg-white dark:bg-neutral-850 border-emerald-500 shadow-sm scale-[1.03]'
              : 'bg-white/85 dark:bg-neutral-900/85 border-neutral-200/90 dark:border-neutral-800'
          }`}
        >
          <div className="flex items-center justify-end gap-1.5">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
              04 // AI / ML
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="font-display font-semibold text-[11px] sm:text-xs text-zinc-900 dark:text-white mt-0.5 whitespace-nowrap">
            Applied Research
          </div>
        </div>

      </div>

      {/* Bottom HUD Annotations Bar */}
      <div className="relative z-20 flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800 pt-2 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
        <span className="tracking-wider">
          <span className="hidden sm:inline">STACK // WEB • CLOUD • SECURITY</span>
          <span className="sm:hidden">STACK // FULL-STACK • CLOUD</span>
        </span>
        <span className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider">
          FOCUS // BUILD • DEPLOY • SECURE
        </span>
      </div>

    </div>
  );
}

export function AboutSection() {
  const { about } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState<number>(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgDotsY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const textY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen flex flex-col justify-start px-6 sm:px-10 lg:px-14 xl:px-16 pt-28 sm:pt-28 lg:pt-24 pb-8 lg:pb-10 z-10 overflow-visible bg-transparent scroll-mt-20"
    >
      {/* Layer 0 Parallax: Subtle Tactile Dot Grid Background */}
      <motion.div
        style={{ y: bgDotsY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22] dark:opacity-[0.14] bg-[radial-gradient(#94A3B8_1.2px,transparent_1.2px)] [background-size:22px_22px]"
      />

      {/* Soft Ambient Floating Light Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-indigo-500/[0.03] via-slate-500/[0.02] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-bl from-blue-500/[0.03] via-indigo-500/[0.02] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col justify-start space-y-6 lg:space-y-7">
        
        {/* Top Eyebrow Section Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={smoothTransition}
          className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 pt-2"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
            <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 tracking-widest uppercase">
              01 / ABOUT ME
            </span>
          </div>

          <div className="hidden lg:block h-px bg-neutral-200/80 dark:bg-neutral-800 flex-1 mx-2" />

          {/* Top-Right Technical Status Line */}
          <div className="flex items-center gap-2 sm:gap-2.5 font-mono text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 tracking-wider">
            <span>SYS.ID // AYUSH.DEV</span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
            <span className="hidden sm:inline">SWE / CLOUD / SEC</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: ACTIVE
            </span>
          </div>
        </motion.div>

        {/* ROW 1: Asymmetric Split Hero (~60% Left / ~40% Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Headline, Concise Bio, Technical Tags & Metrics */}
          <motion.div 
            style={{ y: textY }}
            className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5 will-change-transform"
          >
            <div className="space-y-3.5 sm:space-y-4">
              {/* Monospace Sub-Eyebrow */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-semibold tracking-wider w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>THE ENGINEER BEHIND THE SYSTEMS</span>
              </div>

              {/* Main Typographic Headline: 3 Lines Tightly Stacked */}
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[clamp(2.4rem,3.4vw,3.5rem)] text-zinc-950 dark:text-white tracking-tight leading-[1.06] uppercase">
                <span>ENGINEERING</span><br />
                <span>SYSTEMS</span><br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 dark:from-indigo-400 dark:via-indigo-300 dark:to-sky-300">
                  THAT SHIP.
                </span>
              </h2>

              {/* Concise Copy (Two clean paragraphs) */}
              <div className="space-y-2 max-w-xl">
                <p className="font-sans text-neutral-600 dark:text-neutral-300 text-sm sm:text-[14.5px] lg:text-[15px] leading-relaxed font-normal">
                  Computer Science graduate building software across full-stack engineering, cloud infrastructure, and cybersecurity — from production web platforms and offline-first systems to serverless applications and AI-assisted security research.
                </p>
                <p className="font-sans text-neutral-500 dark:text-neutral-400 text-xs sm:text-[13px] leading-relaxed font-normal">
                  I focus on building reliable systems that are practical to ship, scalable to operate, and secure by design.
                </p>
              </div>
            </div>

            {/* Technical Identity Tags (3 Refined Pill Labels) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: 0.6 }}
              className="flex flex-wrap items-center gap-2 pt-0.5"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>FULL-STACK ENGINEERING</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>AWS CLOUD</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>CYBERSECURITY + AI</span>
              </motion.div>
            </motion.div>

            {/* Editorial Profile Metrics Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: 0.7 }}
              className="pt-2 border-t border-neutral-200/70 dark:border-neutral-800/80"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 dark:text-white tracking-tight">
                    02+
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-0.5 leading-snug">
                    Production Systems
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 dark:text-white tracking-tight">
                    04
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-0.5 leading-snug">
                    Core Domains
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 dark:text-white tracking-tight">
                    01
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-0.5 leading-snug">
                    IC3SE Publication
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Architectural Engineering System Visualization (~40%) */}
          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ ...smoothTransition, delay: 0.3 }}
            className="lg:col-span-5 relative flex flex-col justify-center"
          >
            <EngineeringSystemVisual />
          </motion.div>

        </div>

        {/* Bottom Information Rail: Compact 3-Column Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ ...smoothTransition, delay: 0.4 }}
          className="w-full rounded-xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 shadow-2xs overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80 dark:divide-neutral-800">
            
            {/* Column 1: EDUCATION */}
            <motion.div 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.02)' }}
              className="p-3.5 sm:p-4 flex flex-col justify-between space-y-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  EDUCATION
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                  B.Tech Computer Science Engineering
                </div>
                <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                  Bennett University · 2022–2026
                </div>
              </div>
            </motion.div>

            {/* Column 2: CURRENTLY */}
            <motion.div 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.02)' }}
              className="p-3.5 sm:p-4 flex flex-col justify-between space-y-1 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    CURRENTLY
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Available
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                  Gurugram, India
                </div>
                <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                  Available for opportunities
                </div>
              </div>
            </motion.div>

            {/* Column 3: CERTIFICATION */}
            <motion.div 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.02)' }}
              className="p-3.5 sm:p-4 flex flex-col justify-between space-y-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  CERTIFICATION
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                  AWS Certified Cloud Practitioner
                </div>
                <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                  Valid through May 2027
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Visual Bridge: Technical Connector from Upper Engineering Profile to Core Pillars Monolith */}
        <div className="relative flex flex-col items-center justify-center pt-3 pb-1 select-none">
          {/* Hairline Line down */}
          <div className="w-px h-7 bg-gradient-to-b from-neutral-300 dark:from-neutral-700 via-indigo-500/50 to-indigo-500" />
          
          {/* Bridge Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-neutral-600 dark:text-neutral-300 font-semibold uppercase">
              ARCHITECTURE // 3 PILLARS ↓
            </span>
          </div>

          {/* Hairline Line continuing directly to the Monolith Header Tablet */}
          <div className="w-px h-5 bg-gradient-to-b from-indigo-500 to-indigo-500/30" />
        </div>

        {/* ROW 2: Architectural 3D Monolith Pillars Stage */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ...smoothTransition, delay: 0.5 }}
          className="relative w-full pt-1 lg:pt-0"
        >
          
          {/* Centered Floating Monolith Tablet Header (matches image slab) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...smoothTransition, delay: 0.6 }}
            className="relative flex flex-col items-center justify-center mb-1"
          >
            <div className="relative px-7 sm:px-9 py-2.5 sm:py-3 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700 shadow-md flex flex-col items-center select-none text-center">
              <span className="text-[10px] font-mono font-bold tracking-[0.28em] text-neutral-500 uppercase">
                CORE PILLARS
              </span>
              <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-zinc-950 dark:text-white uppercase mt-0.5">
                WHAT I BUILD
              </span>
              {/* Monolith Corner Notch Trims */}
              <div className="absolute top-1.5 left-2 w-1.5 h-1.5 border-t border-l border-indigo-500/50" />
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 border-t border-r border-indigo-500/50" />
              <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 border-b border-l border-indigo-500/50" />
              <div className="absolute bottom-1.5 right-2 w-1.5 h-1.5 border-b border-r border-indigo-500/50" />
            </div>
          </motion.div>

          {/* 3D Semicircular Stage with Connective Waveform Wall */}
          <div className="relative w-full h-[540px] sm:h-[570px] flex items-center justify-center [perspective:1400px] overflow-visible">
            
            {/* Ambient Connective Waveform Wall behind Monolith Pillars */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-0 top-[42%] -translate-y-1/2 h-10 pointer-events-none z-0 flex items-center select-none"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              }}
            >
              {/* Flowing dashed waveform line */}
              <div 
                className="w-full h-[2px] opacity-30 dark:opacity-20 animate-connective-wall"
                style={{
                  background: 'repeating-linear-gradient(90deg, #6366F1 0px, #6366F1 16px, transparent 16px, transparent 32px)',
                  backgroundSize: '32px 2px',
                }}
              />
              {/* Center Acoustic / Energy Guideline */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-indigo-500/20 dark:bg-indigo-400/20" />
            </div>

            {/* 3 Monolith Pillars in Semicircular Arc Motion (Center lowered, flanks shadowed) */}
            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] pointer-events-none">
              {about.pillars.map((pillar, idx) => {
                const slot = (idx - activePillarIndex + 3) % 3;
                const isActive = slot === 0;
                const accent = idx === 0 ? 'orange' : idx === 1 ? 'blue' : 'violet';
                return (
                  <PillarCard
                    key={pillar.title}
                    slot={slot}
                    isActive={isActive}
                    onActivate={() => {
                      setActivePillarIndex(idx);
                    }}
                    accentColor={accent}
                  >
                    {/* Pillar Top: Glowing Rune/Circuit Medallion & Title */}
                    <div className="flex flex-col items-center text-center pt-1">
                      <div className="mb-2.5">
                        <FramerIconBadge accentColor={accent} size="md">
                          {idx === 0 && (
                            <span className="font-mono font-bold text-xs tracking-tighter text-zinc-900 dark:text-white">&lt;/&gt;</span>
                          )}
                          {idx === 1 && (
                            <Cloud className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          )}
                          {idx === 2 && (
                            <ShieldCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                          )}
                        </FramerIconBadge>
                      </div>
                      <h3 className="font-display font-extrabold text-zinc-950 dark:text-white text-[17px] sm:text-lg leading-snug uppercase tracking-tight">
                        {pillar.title}
                      </h3>
                      <span className="text-[10.5px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mt-1">
                        {idx === 0 ? 'INTEGRITY PILLAR' : idx === 1 ? 'NEXUS PILLAR' : 'SECURITY PILLAR'}
                      </span>
                    </div>

                    {/* Tech Stack Pills in Centered Alignment */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 my-3.5">
                      {pillar.tech.split('•').map((item, i) => (
                        <span
                          key={i}
                          className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 shadow-2xs font-medium"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Body Highlight at bottom of Monolith */}
                    <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-center pb-1">
                      {pillar.highlight}
                    </p>
                  </PillarCard>
                );
              })}
            </div>

          </div>

        </motion.div>

        {/* Section Transition Pill Anchor Leading to 02 / EXPERIENCE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center pt-6 sm:pt-8"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 text-xs font-mono font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
          >
            <span>02 / EXPERIENCE</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default AboutSection;
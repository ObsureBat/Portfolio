'use client';

import React, { useMemo } from 'react';
import { 
  CHAPTER_LIST, 
  getActiveChapter, 
  getSubProgress,
  smootherStep
} from './ResearchTimelineController';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

interface OverlayProps {
  progress: number;
}

export function ResearchCaseStudyOverlay({ progress }: OverlayProps) {
  const { research } = PORTFOLIO_DATA;
  const activeChapter = useMemo(() => getActiveChapter(progress), [progress]);

  // Chapter 01 progress (0.00 -> 0.12)
  const ch1Fade = useMemo(() => {
    if (progress < 0.08) return 1.0;
    if (progress < 0.15) return 1.0 - smootherStep(getSubProgress(progress, [0.08, 0.15]));
    return 0.0;
  }, [progress]);

  // Chapter 02 progress (0.12 -> 0.25) - smooth overlap with Ch 01
  const ch2Fade = useMemo(() => {
    if (progress < 0.10) return 0.0;
    if (progress < 0.15) return smootherStep(getSubProgress(progress, [0.10, 0.15]));
    if (progress < 0.22) return 1.0;
    if (progress < 0.27) return 1.0 - smootherStep(getSubProgress(progress, [0.22, 0.27]));
    return 0.0;
  }, [progress]);

  // Chapter 03 progress (0.25 -> 0.40) - smooth overlap with Ch 02
  const ch3Fade = useMemo(() => {
    if (progress < 0.23) return 0.0;
    if (progress < 0.28) return smootherStep(getSubProgress(progress, [0.23, 0.28]));
    if (progress < 0.36) return 1.0;
    if (progress < 0.42) return 1.0 - smootherStep(getSubProgress(progress, [0.36, 0.42]));
    return 0.0;
  }, [progress]);

  // Chapter 04 progress (0.40 -> 0.52) - smooth overlap with Ch 03
  const ch4Fade = useMemo(() => {
    if (progress < 0.38) return 0.0;
    if (progress < 0.43) return smootherStep(getSubProgress(progress, [0.38, 0.43]));
    if (progress < 0.49) return 1.0;
    if (progress < 0.54) return 1.0 - smootherStep(getSubProgress(progress, [0.49, 0.54]));
    return 0.0;
  }, [progress]);

  // Chapter 05 progress (0.52 -> 0.65, 97.1% stat) - smooth overlap with Ch 04
  const ch5Fade = useMemo(() => {
    if (progress < 0.50) return 0.0;
    if (progress < 0.55) return smootherStep(getSubProgress(progress, [0.50, 0.55]));
    if (progress < 0.62) return 1.0;
    if (progress < 0.67) return 1.0 - smootherStep(getSubProgress(progress, [0.62, 0.67]));
    return 0.0;
  }, [progress]);

  // 97.1% count-up interpolation in Chapter 05 (smooth quartic ease-out)
  const countUpVal = useMemo(() => {
    if (progress < 0.51) return '0.0';
    if (progress >= 0.60) return '97.1';
    const t = getSubProgress(progress, [0.51, 0.60]);
    const ease = 1 - Math.pow(1 - t, 4);
    return (ease * 97.1).toFixed(1);
  }, [progress]);

  // Chapter 06 progress (0.65 -> 0.78, AGESIFY) - smooth overlap with Ch 05
  const ch6Fade = useMemo(() => {
    if (progress < 0.63) return 0.0;
    if (progress < 0.68) return smootherStep(getSubProgress(progress, [0.63, 0.68]));
    if (progress < 0.74) return 1.0;
    if (progress < 0.80) return 1.0 - smootherStep(getSubProgress(progress, [0.74, 0.80]));
    return 0.0;
  }, [progress]);

  // Chapter 07 progress (0.78 -> 0.90, Cloud Infrastructure) - continuous overlap with Ch 06 (no gaps)
  const ch7Fade = useMemo(() => {
    if (progress < 0.76) return 0.0;
    if (progress < 0.81) return smootherStep(getSubProgress(progress, [0.76, 0.81]));
    if (progress < 0.87) return 1.0;
    if (progress < 0.92) return 1.0 - smootherStep(getSubProgress(progress, [0.87, 0.92]));
    return 0.0;
  }, [progress]);

  // Chapter 08 progress (0.90 -> 1.00, Synthesis & Summary) - smooth overlap with Ch 07
  const ch8Fade = useMemo(() => {
    if (progress < 0.88) return 0.0;
    if (progress < 0.93) return smootherStep(getSubProgress(progress, [0.88, 0.93]));
    if (progress < 0.98) return 1.0;
    if (progress < 1.05) return 1.0 - smootherStep(getSubProgress(progress, [0.98, 1.05]));
    return 0.0;
  }, [progress]);

  const handleChapterClick = (rangeStart: number) => {
    if (typeof window === 'undefined') return;
    const st = (window as any).ScrollTrigger?.getAll().find((s: any) => s.trigger?.id === 'research');
    if (st) {
      const target = st.start + (rangeStart + 0.02) * (st.end - st.start);
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
      return;
    }
    
    // Fallback if ScrollTrigger not yet registered
    const researchEl = document.getElementById('research');
    if (!researchEl) return;
    const totalTrack = window.innerHeight * 7;
    const researchTop = window.scrollY + researchEl.getBoundingClientRect().top;
    const targetScrollY = researchTop + (rangeStart + 0.02) * totalTrack;
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden">
      
      {/* ----------------------------------------------------------- */}
      {/* 1. FIXED TOP CHROME NAVIGATION BAR                          */}
      {/* ----------------------------------------------------------- */}
      <div className="w-full flex items-center justify-between text-neutral-900 pointer-events-auto">
        {/* Top-Left: Case Study Context Badge (Avoids duplicate name collision with global Navbar) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-neutral-300/70 shadow-2xs backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-800 uppercase">
              03 / RESEARCH CASE STUDY
            </span>
          </div>
        </div>

        {/* Top-Right: Active Chapter Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1 rounded-full bg-neutral-900 text-white text-[11px] font-mono font-semibold tracking-wider shadow-xs">
            {activeChapter.numStr} — {activeChapter.title}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* 2. DYNAMIC SPATIAL CHAPTER LAYERS                           */}
      {/* ----------------------------------------------------------- */}
      <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center pointer-events-none">

        {/* === CHAPTER 01 — SIGNAL (Asymmetrical Spatial Editorial) === */}
        <div 
          style={{ 
            opacity: ch1Fade, 
            transform: `translate3d(0, ${(1 - ch1Fade) * -16}px, 0) scale(${0.98 + ch1Fade * 0.02})`,
            visibility: ch1Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch1Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center max-w-2xl will-change-[transform,opacity] transition-none"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono font-semibold">
              <span>{research.role}</span>
              <span>·</span>
              <span>{research.period}</span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[0.92] text-neutral-950 uppercase">
              AI-DRIVEN<br />
              NETWORK<br />
              DEFENSE.
            </h1>

            <p className="font-mono text-xs sm:text-sm text-neutral-600 tracking-wider max-w-lg uppercase">
              FROM DETECTION TO ADAPTIVE DEFENSE.
            </p>

            <div className="pt-4 border-t border-neutral-300/80 max-w-md">
              <span className="text-[11px] font-mono text-neutral-500 block mb-0.5">Advisors:</span>
              <span className="text-xs font-medium text-neutral-800">
                Wg Cdr (Dr.) Ajay Kumar · Dr. Pradeep Kumar Arya
              </span>
            </div>
          </div>
        </div>

        {/* === CHAPTER 02 — SIGNAL → TRAFFIC === */}
        <div 
          style={{ 
            opacity: ch2Fade, 
            transform: `translate3d(0, ${(1 - ch2Fade) * 14}px, 0) scale(${0.98 + ch2Fade * 0.02})`,
            visibility: ch2Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch2Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center max-w-xl will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-2">
            01 / SIGNAL
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
            Every connection leaves a signal.
          </h2>
          <p className="text-sm font-sans text-neutral-600 mt-3 leading-relaxed max-w-md">
            High-throughput packet streams parsed in real time. Benign traffic flows seamlessly, while anomalies form structured statistical signatures across TCP/IP headers.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {['DDoS Floods', 'SQL Injection', 'Path Traversal'].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-white/90 border border-neutral-300/80 text-neutral-800 font-mono text-[11px]">
                • {tag}
              </span>
            ))}
          </div>
        </div>

        {/* === CHAPTER 03 — DETECTION === */}
        <div 
          style={{ 
            opacity: ch3Fade, 
            transform: `translate3d(0, ${(1 - ch3Fade) * 14}px, 0) scale(${0.98 + ch3Fade * 0.02})`,
            visibility: ch3Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch3Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center max-w-2xl mx-auto will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-2">
            02 / DETECTION
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight">
            THREE ARCHITECTURES.<br />ONE DECISION.
          </h2>
          <div className="flex items-center gap-3 my-4 text-xs font-mono font-bold text-neutral-700">
            <span>TRANSFORMER</span>
            <span className="text-indigo-500">+</span>
            <span>BiLSTM</span>
            <span className="text-indigo-500">+</span>
            <span>CNN</span>
          </div>
          <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
            Self-attention resolves global context, bidirectional LSTM captures temporal recurrence, and spatial CNN layers isolate payload byte patterns.
          </p>
        </div>

        {/* === CHAPTER 04 — FUSION === */}
        <div 
          style={{ 
            opacity: ch4Fade, 
            transform: `translate3d(0, ${(1 - ch4Fade) * 14}px, 0) scale(${0.98 + ch4Fade * 0.02})`,
            visibility: ch4Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch4Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center max-w-lg will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-2">
            03 / FUSION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-950 tracking-tight">
            Deep Feature Fusion Core.
          </h2>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            Three feature vectors concatenate and project into a unified latent manifold. Decision boundaries separate clean packets from malicious vectors in sub-millisecond execution.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono text-neutral-700">
            <div className="p-2 rounded bg-white/80 border border-neutral-200">✓ Volumetric DDoS</div>
            <div className="p-2 rounded bg-white/80 border border-neutral-200">✓ Payload SQLi</div>
            <div className="p-2 rounded bg-white/80 border border-neutral-200">✓ Path Traversal</div>
            <div className="p-2 rounded bg-white/80 border border-neutral-200">✓ Port Scan &amp; Overflow</div>
          </div>
        </div>

        {/* === CHAPTER 05 — DETECTION RESULT (Editorial Data Visualization) === */}
        <div 
          style={{ 
            opacity: ch5Fade, 
            transform: `translate3d(0, ${(1 - ch5Fade) * 10}px, 0) scale(${0.96 + ch5Fade * 0.04})`,
            visibility: ch5Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch5Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-1">
            BENCHMARK VERIFIED
          </span>
          
          {/* Monumental Editorial Number */}
          <div className="font-display font-black text-7xl sm:text-8xl lg:text-9xl text-neutral-950 tracking-tighter leading-none my-1">
            {countUpVal}%
          </div>

          <span className="text-base sm:text-lg font-mono font-medium text-neutral-700">
            Detection Accuracy
          </span>

          {/* Horizontal Precision Measurement Line (Strict 1:1 scroll fidelity without CSS transition jitter) */}
          <div className="w-48 sm:w-64 h-0.5 bg-neutral-300 relative my-4 overflow-hidden rounded-full">
            <div 
              className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full" 
              style={{ width: `${countUpVal}%` }}
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>CICIDS2017 Benchmark Dataset Verified</span>
          </div>
        </div>

        {/* === CHAPTER 06 — AGESIFY (Adaptive Cloud Defense) === */}
        <div 
          style={{ 
            opacity: ch6Fade, 
            transform: `translate3d(0, ${(1 - ch6Fade) * 14}px, 0) scale(${0.98 + ch6Fade * 0.02})`,
            visibility: ch6Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch6Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center max-w-xl will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-2">
            04 / AGESIFY
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-neutral-950 tracking-tight leading-tight">
            DETECTION BECOMES DEFENSE.
          </h2>
          <p className="text-sm text-neutral-600 mt-3 leading-relaxed max-w-md">
            AGESIFY converts intrusion classifications into live, self-optimizing perimeter firewall rules. The adaptive membrane evaluates anomalous traffic, verifies threat certainty, and enforces instant IP quarantine.
          </p>
          <div className="flex items-center gap-3 mt-5 font-mono text-xs text-neutral-800">
            <span className="font-bold text-indigo-600">DETECT</span>
            <span>→</span>
            <span className="font-bold text-indigo-600">DECIDE</span>
            <span>→</span>
            <span className="font-bold text-emerald-600">BLOCK</span>
          </div>
        </div>

        {/* === CHAPTER 07 — CLOUD INFRASTRUCTURE === */}
        <div 
          style={{ 
            opacity: ch7Fade, 
            transform: `translate3d(0, ${(1 - ch7Fade) * 14}px, 0) scale(${0.98 + ch7Fade * 0.02})`,
            visibility: ch7Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch7Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center max-w-md will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-2">
            05 / INFRASTRUCTURE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-950 tracking-tight">
            Distributed Cloud Fabric.
          </h2>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            Native AWS orchestration linking edge WAF filtering, GuardDuty continuous threat feeds, and sub-second Lambda enforcement routines.
          </p>
          <div className="mt-4 p-3 rounded-xl bg-white/90 border border-neutral-200/80 shadow-2xs space-y-1.5 font-mono text-xs text-neutral-700">
            <div className="flex justify-between">
              <span>Mitigation Latency:</span>
              <span className="font-bold text-neutral-900">12ms</span>
            </div>
            <div className="flex justify-between">
              <span>Feedback Updates:</span>
              <span className="font-bold text-neutral-900">Automated</span>
            </div>
          </div>
        </div>

        {/* === CHAPTER 08 — FINAL RESULT & METRICS === */}
        <div 
          style={{ 
            opacity: ch8Fade, 
            transform: `translate3d(0, ${(1 - ch8Fade) * 14}px, 0) scale(${0.98 + ch8Fade * 0.02})`,
            visibility: ch8Fade > 0.001 ? 'visible' : 'hidden',
            pointerEvents: ch8Fade > 0.6 ? 'auto' : 'none',
          }}
          className="absolute inset-0 flex flex-col justify-center max-w-4xl mx-auto text-center will-change-[transform,opacity] transition-none"
        >
          <span className="text-xs font-mono text-indigo-600 font-bold tracking-widest uppercase mb-1.5">
            06 / SUMMARY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight">
            FROM SIGNAL TO DEFENSE.
          </h2>

          {/* 4 Floating Editorial Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-6 w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-white/80 border border-neutral-200/90 shadow-2xs backdrop-blur-sm">
              <span className="font-display font-black text-3xl sm:text-4xl text-neutral-950">97.1%</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 mt-1.5 text-center">Detection Accuracy</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-white/80 border border-neutral-200/90 shadow-2xs backdrop-blur-sm">
              <span className="font-display font-black text-3xl sm:text-4xl text-neutral-950">23+</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 mt-1.5 text-center">Attack Types</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-white/80 border border-neutral-200/90 shadow-2xs backdrop-blur-sm">
              <span className="font-display font-black text-3xl sm:text-4xl text-neutral-950">3</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 mt-1.5 text-center">Models Fused</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-white/80 border border-neutral-200/90 shadow-2xs backdrop-blur-sm">
              <span className="font-display font-black text-3xl sm:text-4xl text-neutral-950">&lt;15ms</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 mt-1.5 text-center">Mitigation Latency</span>
            </div>
          </div>

          {/* Academic Attribution & Presentation */}
          <div className="mt-6 pt-5 border-t border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
            <div className="text-xs font-mono text-neutral-600 text-left">
              {research.conference}
            </div>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore Research &amp; Code</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

      {/* ----------------------------------------------------------- */}
      {/* 3. FIXED BOTTOM CONTROLS & CHAPTER TRACKER                  */}
      {/* ----------------------------------------------------------- */}
      <div className="w-full flex items-end justify-between pointer-events-auto">
        
        {/* Bottom-Left: Scroll Prompt (visible only in Chapter 01) */}
        <div 
          style={{ 
            opacity: ch1Fade, 
            transform: `translate3d(0, ${(1 - ch1Fade) * 6}px, 0)`,
            visibility: ch1Fade > 0.001 ? 'visible' : 'hidden',
          }} 
          className="flex items-center gap-2 text-[11px] font-mono font-medium text-neutral-500 will-change-[transform,opacity] transition-none"
        >
          <span className="animate-bounce">↓</span>
          <span>SCROLL TO EXPLORE CASE STUDY</span>
        </div>

        {/* Bottom-Right: Vertical / Horizontal Chapter Progression (Clickable Quick-Jump Navigation) */}
        <div className="flex items-center gap-2 bg-white/90 border border-neutral-200/80 px-3.5 py-1.5 rounded-full shadow-2xs backdrop-blur-sm">
          {CHAPTER_LIST.map((ch) => {
            const isActive = ch.id === activeChapter.id;
            return (
              <button
                key={ch.id} 
                onClick={() => handleChapterClick(ch.range[0])}
                className="flex items-center gap-1 group cursor-pointer focus:outline-none transition-transform hover:scale-105"
                title={`Jump to ${ch.numStr} — ${ch.title}`}
              >
                <span className={`text-[10px] font-mono font-bold transition-colors ${
                  isActive ? 'text-indigo-600 font-extrabold' : 'text-neutral-400 group-hover:text-neutral-700'
                }`}>
                  {ch.numStr}
                </span>
                {isActive && (
                  <span className="hidden md:inline text-[9px] font-mono text-neutral-800 font-medium tracking-wider">
                    {ch.title}
                  </span>
                )}
                {ch.index < CHAPTER_LIST.length && (
                  <span className="text-neutral-300 text-[10px] mx-0.5 pointer-events-none">·</span>
                )}
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}

export default ResearchCaseStudyOverlay;

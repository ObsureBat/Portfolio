'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cloud, Cpu, ArrowUpRight, ShieldAlert, Zap, Lock, Terminal, Activity } from 'lucide-react';

export function DefenseArchitectureVisual() {
  const [pipelineStep, setPipelineStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Subtle cyclic step for threat mitigation animation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPipelineStep((prev) => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const defensePipeline = [
    { label: 'NETWORK TRAFFIC', sub: 'PCAP / VPC Flow', icon: Activity },
    { label: 'DETECTION MODEL', sub: 'Deep Learning NIDS', icon: Cpu },
    { label: 'CLASSIFICATION', sub: 'Multi-Vector Vectorizer', icon: Zap },
    { label: 'AWS DEFENSE', sub: 'WAF Rule Automation', icon: Cloud },
    { label: 'MITIGATION', sub: 'Edge Rule Enforced', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Network Defense Pipeline Bar (Centerpiece) */}
      <div className="w-full rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800/80 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase">
              DEFENSE PIPELINE // REAL-TIME THREAT MITIGATION
            </span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
            ZERO-TOUCH · ADAPTIVE CLOUD FIREWALL
          </span>
        </div>

        {/* 5-Stage Network Defense Pipeline Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
          {defensePipeline.map((stage, i) => {
            const Icon = stage.icon;
            const isCurrent = pipelineStep === i;
            return (
              <div 
                key={stage.label}
                className={`relative p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-all duration-300 ${
                  isCurrent
                    ? 'bg-violet-500/10 dark:bg-violet-500/15 border-violet-500/60 shadow-xs'
                    : 'bg-neutral-50/80 dark:bg-neutral-850/80 border-neutral-200/70 dark:border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    isCurrent
                      ? 'bg-violet-500 text-white'
                      : 'bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-400 font-semibold">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-[13px] text-zinc-900 dark:text-white tracking-tight">
                    {stage.label}
                  </div>
                  <div className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {stage.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Dual Research Branches Grid with 97.1% Visual Anchor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Branch A: Deep Learning Intrusion Detection (NIDS) with 97.1% Anchor (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden">
          
          <div>
            {/* Header / Metric Display */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-violet-500/10 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400 font-mono text-[10.5px] font-semibold border border-violet-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span>RESEARCH 01 // NIDS ENGINE</span>
              </div>

              {/* 97.1% Visual Metric Anchor */}
              <div className="flex items-baseline gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700 shadow-2xs">
                <span className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight">
                  97.1%
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase font-semibold">
                  Accuracy
                </span>
              </div>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight leading-tight">
              DEEP LEARNING INTRUSION DETECTION (NIDS)
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 my-3.5">
              {['TensorFlow', 'Keras', 'Transformer', 'BiLSTM', 'CNN'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 font-medium shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Concise Bullet Highlights */}
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5" />
                <span>
                  Built a multi-model deep learning pipeline to detect DDoS, SQL injection, and buffer-overflow attacks.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5" />
                <span>
                  Decreased false positives via continuous network payload parsing and feedback-driven model re-weighting.
                </span>
              </div>
            </div>
          </div>

          {/* Neural Network SVG Topology Graphic */}
          <div className="mt-6 pt-5 border-t border-neutral-200/70 dark:border-neutral-800/80">
            <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              <span className="font-semibold uppercase tracking-wider">NEURAL TOPOLOGY // MULTI-HEAD ATTENTION</span>
              <span>IC3SE BENCHMARK</span>
            </div>

            <div className="h-14 w-full rounded-lg bg-neutral-50/70 dark:bg-neutral-850/60 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-around px-4 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 pointer-events-none" viewBox="0 0 400 60">
                <path d="M 20 30 Q 100 10, 200 30 T 380 30" fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 20 30 Q 100 50, 200 30 T 380 30" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="2 4" />
              </svg>
              <div className="relative z-10 flex items-center justify-between w-full font-mono text-[10px] text-zinc-800 dark:text-zinc-200">
                <span className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 shadow-2xs border border-neutral-200/70 dark:border-neutral-700">DDoS Payload</span>
                <span className="text-violet-500">→</span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 shadow-2xs border border-neutral-200/70 dark:border-neutral-700">BiLSTM + CNN</span>
                <span className="text-violet-500">→</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">97.1% Accurate</span>
              </div>
            </div>
          </div>

        </div>

        {/* Branch B: AGESIFY Cloud Firewall Integration (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden">
          
          <div>
            {/* Header / System Identifier */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 font-mono text-[10.5px] font-semibold border border-indigo-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>RESEARCH 02 // CLOUD DEFENSE</span>
              </div>
              <div className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                SYS / AGESIFY · MODE / FIREWALL
              </div>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight leading-tight">
              AGESIFY — CLOUD FIREWALL INTEGRATION
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 my-3.5">
              {['AWS WAF', 'GuardDuty', 'CloudWatch', 'AWS Lambda'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 font-medium shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Concise Bullet Highlights */}
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                <span>
                  Deployed trained detection models into an adaptive firewall on AWS WAF, dynamically generating blocking rules in real time.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                <span>
                  Automated mitigation logic for zero-day port scans and path-traversal exploits at the cloud edge.
                </span>
              </div>
            </div>
          </div>

          {/* Cloud Defense Mitigation Flow Widget */}
          <div className="mt-6 pt-5 border-t border-neutral-200/70 dark:border-neutral-800/80">
            <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              <span className="font-semibold uppercase tracking-wider">CLOUD DEFENSE FLOW</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ZERO-TOUCH BLOCK</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-850/60 border border-neutral-200/70 dark:border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">THREAT INGRESS</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold">Port Scan / SQLi</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">LAMBDA RULE DISPATCH</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">AWS WAF Rule Set</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60">
                <span className="text-neutral-700 dark:text-neutral-300 font-bold">CLOUD EDGE STATE</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-[10.5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  MITIGATED
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Research Publication Strip Footnote */}
      <div className="w-full rounded-xl bg-neutral-50/90 dark:bg-neutral-850/90 border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 dark:bg-violet-500/15 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-semibold">
              IC3SE 2025 · AMITY UNIVERSITY INTERNATIONAL CONFERENCE
            </div>
            <div className="font-display font-bold text-xs sm:text-sm text-zinc-950 dark:text-white mt-0.5">
              Presented &amp; Published Research Paper on Adaptive Cloud Defense
            </div>
          </div>
        </div>

        <a
          href="#research"
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:text-zinc-950 dark:hover:text-white shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-600 transition-all shrink-0 w-fit"
        >
          <span>EXPLORE RESEARCH</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

    </div>
  );
}

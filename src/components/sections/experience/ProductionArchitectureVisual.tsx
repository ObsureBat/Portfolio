'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Laptop, Database, Globe, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight, Layers, Cpu } from 'lucide-react';

export function ProductionArchitectureVisual() {
  const [syncStep, setSyncStep] = useState(0);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Subtle cyclic step animation for offline sync simulation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setSyncStep((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const pipelineStages = [
    { label: 'CLIENT', sub: 'Desktop / Web', icon: Laptop },
    { label: 'APPLICATION', sub: 'Electron / React', icon: Layers },
    { label: 'API LAYER', sub: 'Node.js / Express', icon: Cpu },
    { label: 'DATA STORE', sub: 'PostgreSQL / SQLite', icon: Database },
    { label: 'DEPLOYMENT', sub: 'Production Server', icon: Globe },
  ];

  const ecommerceRoutes = [
    { id: 'storefront', label: 'STOREFRONT', desc: 'Next.js SSR / SEO' },
    { id: 'api', label: 'REST API', desc: 'Secure Endpoint Gateway' },
    { id: 'auth', label: 'JWT AUTH', desc: 'Role-Based Sessions' },
    { id: 'admin', label: 'ADMIN PORTAL', desc: 'Order & Catalog Control' },
    { id: 'inventory', label: 'LIVE INVENTORY', desc: 'Real-Time Stock State' },
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Horizontal Software Architecture Pipeline Bar */}
      <div className="w-full rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800/80 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-900 dark:text-zinc-100 uppercase">
              PRODUCTION PIPELINE // FULL-STACK RUNTIME
            </span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
            ARCH // EVENT-DRIVEN &amp; CACHED
          </span>
        </div>

        {/* Pipeline Nodes Flow (Desktop Horizontal / Mobile Compact Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
          {pipelineStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div 
                key={stage.label}
                className="relative group p-3 sm:p-3.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-850/80 border border-neutral-200/70 dark:border-neutral-800 flex flex-col justify-between transition-all duration-200 hover:border-sky-500/50 hover:bg-white dark:hover:bg-neutral-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-md bg-sky-500/10 dark:bg-sky-500/15 flex items-center justify-center text-sky-600 dark:text-sky-400">
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

                {/* Connecting arrow indicator for stages except last */}
                {i < pipelineStages.length - 1 && (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-neutral-400 dark:text-neutral-600 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Dual Project Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Branch A: Offline Desktop POS & ERP Engine (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden">
          
          <div>
            {/* Header / System Identifier */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 font-mono text-[10.5px] font-semibold border border-orange-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>BRANCH A // OFFLINE POS &amp; ERP</span>
              </div>
              <div className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                SYS / POS-ERP · MODE / OFFLINE-FIRST
              </div>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight leading-tight">
              OFFLINE DESKTOP POS &amp; ERP ENGINE
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 my-3.5">
              {['Electron', 'TypeScript', 'React', 'PostgreSQL', 'Node.js'].map((tech) => (
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
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                <span>
                  Engineered a double-entry accounting engine posting automatic journal entries for tax, receivables, and inventory from invoices.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                <span>
                  Built local SQLite/PostgreSQL caching with bidirectional offline-to-cloud automatic data sync upon reconnection.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                <span>
                  Integrated GST/HSN calculation with thermal-printer PDF generation for hardware terminals.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Offline/Online Sync Visualizer Widget */}
          <div className="mt-6 pt-5 border-t border-neutral-200/70 dark:border-neutral-800/80">
            <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
              <span className="text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">
                SYNC ENGINE PIPELINE SIMULATION
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AUTO-RECONNECT ACTIVE
              </span>
            </div>

            {/* 4-Stage Horizontal Sync Circuit */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'LOCAL CACHE', sub: 'SQLite Write', state: 'Committed' },
                { label: 'OFFLINE QUEUE', sub: 'Journal Buffer', state: 'Queued' },
                { label: 'SYNC ENGINE', sub: 'Diff Engine', state: 'Synchronizing' },
                { label: 'CLOUD REPLICA', sub: 'PostgreSQL Sync', state: 'Consistent' },
              ].map((node, idx) => {
                const isActive = syncStep === idx;
                return (
                  <div
                    key={node.label}
                    className={`p-2 sm:p-2.5 rounded-lg border text-center transition-all duration-300 ${
                      isActive
                        ? 'bg-orange-500/10 dark:bg-orange-500/15 border-orange-500/60 shadow-xs'
                        : 'bg-neutral-50/70 dark:bg-neutral-850/60 border-neutral-200/70 dark:border-neutral-800'
                    }`}
                  >
                    <div className="font-mono text-[9px] sm:text-[9.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {node.label}
                    </div>
                    <div className="text-[8.5px] sm:text-[9px] font-mono text-neutral-400 truncate mt-0.5">
                      {node.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Branch B: E-Commerce Storefront & Admin Portal (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden">
          
          <div>
            {/* Header / System Identifier */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/10 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 font-mono text-[10.5px] font-semibold border border-sky-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>BRANCH B // WEB PLATFORM</span>
              </div>
              <div className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                SYS / COMMERCE · MODE / WEB
              </div>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white tracking-tight leading-tight">
              E-COMMERCE STOREFRONT &amp; ADMIN PORTAL
            </h3>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 my-3.5">
              {['React', 'Node.js', 'JWT Auth', 'SSR / SEO', 'REST API'].map((tech) => (
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
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                <span>
                  Architected storefront at <code className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">gpipvtltd.com</code> with server-side rendering optimized for Google Search indexing.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                <span>
                  Built an authenticated administrative dashboard for live inventory management and customer order routing.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Routing Architecture Visualizer Widget */}
          <div className="mt-6 pt-5 border-t border-neutral-200/70 dark:border-neutral-800/80">
            <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              <span className="font-semibold uppercase tracking-wider">PLATFORM DATA ROUTING</span>
              <span>REST GATEWAY</span>
            </div>

            {/* Interactive Vertical / Staggered Route Tree */}
            <div className="space-y-1.5">
              {ecommerceRoutes.map((route) => {
                const isHovered = hoveredRoute === route.id;
                return (
                  <div
                    key={route.id}
                    onMouseEnter={() => setHoveredRoute(route.id)}
                    onMouseLeave={() => setHoveredRoute(null)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? 'bg-sky-500/10 dark:bg-sky-500/15 border-sky-500/60 shadow-2xs'
                        : 'bg-neutral-50/60 dark:bg-neutral-850/60 border-neutral-200/60 dark:border-neutral-800'
                    }`}
                  >
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 text-[10.5px]">
                      {route.label}
                    </span>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      {route.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 3. Production Summary Footnote */}
      <div className="pt-2 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          FROM OFFLINE-FIRST DESKTOP SYSTEMS TO CUSTOMER-FACING WEB PLATFORMS.
        </span>
        <div className="flex items-center gap-3 font-display font-extrabold text-xs sm:text-sm tracking-widest text-zinc-950 dark:text-white uppercase mt-1">
          <span>BUILD</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span>DEPLOY</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span>SYNC</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span>OPERATE</span>
        </div>
      </div>

    </div>
  );
}

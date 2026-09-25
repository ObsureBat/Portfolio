'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Globe, Laptop, Terminal } from 'lucide-react';
import { fadeInUp, smoothTransition } from '@/lib/animations';

export function ProjectsIntro() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between pt-24 pb-16 px-6 sm:px-12 lg:px-20 border-b border-zinc-200/80">
      {/* Subtle Background Ambient Technical Grid */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Top Telemetry Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ ...smoothTransition, delay: 0.1 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/[0.04] border border-zinc-900/[0.08] backdrop-blur-xs"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider text-zinc-800 uppercase">
            04 / SELECTED PROJECTS
          </span>
        </motion.div>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            3 Production & Enterprise Systems
          </span>
          <span className="text-zinc-300">/</span>
          <span>Full-Stack · Cloud · Offline</span>
        </div>
      </motion.div>

      {/* Hero Headline Area */}
      <div className="relative z-10 max-w-7xl my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-indigo-600 font-bold mb-4">
            Production Software & Infrastructure
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold text-zinc-950 tracking-tight leading-[0.92] uppercase select-none">
            Building<br />
            Digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-600">
              Systems.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col xl:flex-row xl:items-end justify-between gap-6"
        >
          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-xl">
            Software, cloud systems, and security tools built from architectural idea to working code. 
            Each project below represents a distinct engineering challenge—from AWS serverless orchestration 
            and production e-commerce to offline-first enterprise accounting ledgers.
          </p>

          {/* Quick Jump Buttons — Guaranteed single continuous horizontal line */}
          <div className="flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar py-1 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects-deck')}
              className="shrink-0 whitespace-nowrap group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition-all text-xs font-mono font-medium text-zinc-800"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>01 AGESIFY</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects-deck')}
              className="shrink-0 whitespace-nowrap group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all text-xs font-mono font-medium text-zinc-800"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-600" />
              <span>02 EduConnect</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects-deck')}
              className="shrink-0 whitespace-nowrap group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:border-pink-400 hover:shadow-xs transition-all text-xs font-mono font-medium text-zinc-800"
            >
              <Globe className="w-3.5 h-3.5 text-pink-600" />
              <span>03 Storefront</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects-deck')}
              className="shrink-0 whitespace-nowrap group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all text-xs font-mono font-medium text-zinc-800"
            >
              <Laptop className="w-3.5 h-3.5 text-emerald-600" />
              <span>04 SmartGalla</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Technical Coordinates & Scroll Cue */}
      <div className="relative z-10 flex items-center justify-between pt-6 border-t border-zinc-200/70 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-4">
          <span>LAT 28.4595° N · LON 77.0266° E</span>
          <span className="hidden sm:inline text-zinc-300">|</span>
          <span className="hidden sm:inline">EXPLORE 4 INTERACTIVE SYSTEM SCENES</span>
        </div>

        <button
          onClick={() => scrollTo('projects-deck')}
          className="group inline-flex items-center gap-2 text-zinc-700 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <span className="text-xs font-semibold tracking-wider uppercase">Scroll to Explore Deck</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export default ProjectsIntro;

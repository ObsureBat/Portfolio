'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { RailwayTrack } from './experience/RailwayTrack';
import { StationPlaque, STATIONS } from './experience/StationPlaque';
import { JourneyNav } from './experience/JourneyNav';
import { MobileRailway } from './experience/MobileRailway';
import { fadeInUp, smoothTransition } from '@/lib/animations';

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [hoveredStationIndex, setHoveredStationIndex] = useState<number | null>(null);
  const [trainProgress, setTrainProgress] = useState(0.08); // 0 to 1

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Background subtle parallax dots
  const bgDotsY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Update train progress and active station as user scrolls
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const normalized = Math.min(Math.max(latest, 0), 1);
    setTrainProgress(normalized);

    if (normalized < 0.35) {
      setActiveStationIndex(0);
    } else if (normalized < 0.72) {
      setActiveStationIndex(1);
    } else {
      setActiveStationIndex(2);
    }
  });

  // Station selection via click / keyboard
  const handleSelectStation = (index: number) => {
    setActiveStationIndex(index);

    const targets = [0.08, 0.52, 0.92];
    setTrainProgress(targets[index]);

    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;

    // Calculate corresponding scroll point within the section
    const targetScrollY = sectionTop + targets[index] * (sectionHeight - window.innerHeight);

    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScrollY, { immediate: false });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-[160vh] lg:min-h-[175vh] bg-transparent scroll-mt-10 select-none"
    >
      {/* Subtle Tactile Dot Grid Background */}
      <motion.div
        style={{ y: bgDotsY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22] dark:opacity-[0.14] bg-[radial-gradient(#94A3B8_1.2px,transparent_1.2px)] [background-size:22px_22px]"
      />

      {/* Ambient Radial Floating Light Glows */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-bl from-sky-500/[0.04] via-indigo-500/[0.02] to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-500/[0.04] via-indigo-500/[0.02] to-transparent blur-3xl pointer-events-none" />

      {/* ======================================================== */}
      {/* 1. DESKTOP CINEMATIC STICKY RAILWAY VIEWPORT (≥ md) */}
      {/* ======================================================== */}
      <div className="hidden md:flex sticky top-0 h-screen w-full flex-col justify-between py-5 lg:py-7 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden z-10">
        <div className="max-w-7xl w-full mx-auto flex flex-col justify-between h-full space-y-3">
          
          {/* Top Bar: Editorial Intro & Floating Journey Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="flex items-start justify-between gap-6 pt-1"
          >
            {/* Editorial Headline & Index */}
            <div className="space-y-1.5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...smoothTransition, delay: 0.3 }}
                className="flex items-center gap-2 font-mono text-[11px] font-bold text-violet-600 dark:text-violet-400 tracking-widest uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
                <span>02 / EXPERIENCE &amp; APPLIED WORK</span>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                  ENGINEERING ROUTE MAP
                </span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 0.4 }}
                className="flex items-baseline gap-4"
              >
                <h2 className="font-display font-black text-3xl lg:text-4xl xl:text-5xl text-zinc-950 dark:text-white tracking-tight uppercase leading-none">
                  THE WORK{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 dark:from-violet-400 dark:via-indigo-400 dark:to-sky-400">
                    THAT SHIPPED.
                  </span>
                </h2>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 0.5 }}
                className="font-sans text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm max-w-xl leading-relaxed"
              >
                A journey through applied AI research, published cloud defense, and production software.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTransition, delay: 0.6 }}
                className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500 pt-0.5"
              >
                <span>BOARD THE JOURNEY</span>
                <ArrowDown className="w-3 h-3 text-violet-500 animate-bounce" />
              </motion.div>
            </div>

            {/* Floating Compact Journey Route Navigator */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...smoothTransition, delay: 0.5 }}
              className="shrink-0"
            >
              <JourneyNav
                activeIndex={activeStationIndex}
                onSelectStation={handleSelectStation}
              />
            </motion.div>
          </motion.div>

          {/* Center Stage: The Architectural SVG Railway Track */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...smoothTransition, delay: 0.7 }}
            className="w-full my-auto py-1"
          >
            <RailwayTrack
              progress={trainProgress}
              activeStationIndex={activeStationIndex}
              hoveredStationIndex={hoveredStationIndex}
              onSelectStation={handleSelectStation}
            />
          </motion.div>

          {/* Lower Stage: 3 Tactile Station Plaque Cards (Col 1: Research Lead, Col 2: Presented Paper, Col 3: Freelance Dev) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.8 }}
            className="grid grid-cols-12 gap-5 items-stretch"
          >
            {/* Station 01 Plaque (Research Lead) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="col-span-5 flex flex-col"
            >
              <StationPlaque
                station={STATIONS[0]}
                isActive={activeStationIndex === 0}
                onHover={(h) => setHoveredStationIndex(h ? 0 : null)}
                onSelect={() => handleSelectStation(0)}
                className="h-full"
              />
            </motion.div>

            {/* Station 02 Plaque (Presented Paper - IC3SE 2025) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="col-span-3 flex flex-col"
            >
              <StationPlaque
                station={STATIONS[1]}
                isActive={activeStationIndex === 1}
                onHover={(h) => setHoveredStationIndex(h ? 1 : null)}
                onSelect={() => handleSelectStation(1)}
                className="h-full"
              />
            </motion.div>

            {/* Station 03 Plaque (Freelance Developer - GPI Industries) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="col-span-4 flex flex-col"
            >
              <StationPlaque
                station={STATIONS[2]}
                isActive={activeStationIndex === 2}
                onHover={(h) => setHoveredStationIndex(h ? 2 : null)}
                onSelect={() => handleSelectStation(2)}
                className="h-full"
              />
            </motion.div>
          </motion.div>

          {/* Bottom Telemetry Strip & Downward Link */}
          <div className="flex items-center justify-between border-t border-neutral-200/80 dark:border-neutral-800 pt-2.5 pb-1 font-mono text-[10.5px] text-neutral-400 dark:text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                ROUTE // RESEARCH → PUBLICATION → PRODUCTION
              </span>
              <span className="hidden lg:inline text-neutral-300 dark:text-neutral-700">|</span>
              <span className="hidden lg:inline">TRAIN // AYUSH-02</span>
              <span className="hidden lg:inline text-neutral-300 dark:text-neutral-700">|</span>
              <span className="hidden lg:inline text-violet-600 dark:text-violet-400">STATUS // NOMINAL</span>
            </div>

            <a
              href="#research"
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-2xs"
            >
              <span>03 / RESEARCH SPOTLIGHT</span>
              <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MOBILE RESPONSIVE VERTICAL RAILWAY (< md) */}
      {/* ======================================================== */}
      <div className="block md:hidden px-6 pt-20 pb-16 z-10 relative">
        <div className="space-y-6">
          {/* Mobile Intro Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-violet-600 dark:text-violet-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
              <span>02 / EXPERIENCE</span>
            </div>

            <h2 className="font-display font-black text-3xl text-zinc-950 dark:text-white tracking-tight uppercase leading-tight">
              THE WORK<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-sky-600 dark:from-violet-400 dark:to-sky-400">
                THAT SHIPPED.
              </span>
            </h2>

            <p className="font-sans text-neutral-600 dark:text-neutral-300 text-xs leading-relaxed">
              A journey through applied AI research, published cloud defense, and production software.
            </p>

            <div className="flex items-center gap-2 font-mono text-[10.5px] text-neutral-400 pt-1">
              <span>BOARD THE JOURNEY</span>
              <ArrowDown className="w-3 h-3 text-violet-500 animate-bounce" />
            </div>
          </div>

          {/* Vertical Mobile Railway Track */}
          <MobileRailway />
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;

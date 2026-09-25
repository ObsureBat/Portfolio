'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { ResearchCaseStudyOverlay } from './research/ResearchCaseStudyOverlay';
import { useAppStore } from '@/lib/store';
import { fadeInUp, smoothTransition } from '@/lib/animations';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  (window as any).ScrollTrigger = ScrollTrigger;
}

// Dynamically import Three.js canvas with SSR disabled
const ResearchSceneCanvas = dynamic(
  () => import('@/components/canvas/ResearchSceneCanvas'),
  { ssr: false }
);

export function ResearchSpotlightSection() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const isReducedMotion = useAppStore((s) => s.isReducedMotion);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Pinning the section over a calibrated 700% (~800vh) scroll track
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=700%',
      pin: true,
      pinSpacing: true,
      scrub: 0.15, // Responsive 1:1 locked tracking with Lenis smooth scroll
      anticipatePin: 1, // Prevents hitching on pin start
      onUpdate: (self) => {
        setTimelineProgress(self.progress);
      },
      onEnter: (self) => {
        setTimelineProgress(self.progress);
      },
      onEnterBack: (self) => {
        setTimelineProgress(self.progress);
      },
      onRefresh: (self) => {
        setTimelineProgress(self.progress);
      },
      onLeave: (self) => {
        // Ensure final chapter is fully faded out when leaving section
        setTimelineProgress(1.05);
      },
      onLeaveBack: (self) => {
        setTimelineProgress(0);
      },
    });

    // Synchronize initial progress accurately
    setTimelineProgress(st.progress);

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="research"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#F8F8F6] select-none"
      style={{
        backgroundColor: '#F8F8F6',
      }}
    >
      {/* ----------------------------------------------------------- */}
      {/* 1. Subtle Technical Dot Grid Background (Warm Editorial)    */}
      {/* ----------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22] bg-[radial-gradient(#94A3B8_1.2px,transparent_1.2px)] [background-size:24px_24px]"
      />

      {/* Ambient warm lighting aura */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/[0.04] via-sky-400/[0.02] to-transparent blur-3xl -z-10"
      />

      {/* ----------------------------------------------------------- */}
      {/* 2. Interactive 3D Cinematic Scene (Desktop & Tablet)        */}
      {/* ----------------------------------------------------------- */}
      {!isMobile && !isReducedMotion ? (
        <ResearchSceneCanvas progress={timelineProgress} />
      ) : (
        /* Mobile 2.5D Fallback: Lightweight, Performant, Zero Overlap */
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
          <div className="w-72 h-72 rounded-full border border-indigo-400/40 animate-pulse flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-dashed border-indigo-400/50 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-indigo-600/10 border border-indigo-500" />
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* 3. Editorial Typography & Chapter Storytelling Overlay      */}
      {/* ----------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ResearchCaseStudyOverlay progress={timelineProgress} />
      </motion.div>
    </section>
  );
}

export default ResearchSpotlightSection;
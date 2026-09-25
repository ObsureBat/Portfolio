'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PillarCardProps {
  children: React.ReactNode;
  isActive: boolean;
  onActivate: () => void;
  slot: number; // 0: Center, 1: Right, 2: Left
  className?: string;
  accentColor?: 'orange' | 'blue' | 'violet';
}

export function PillarCard({
  children,
  isActive,
  onActivate,
  slot,
  className = '',
  accentColor = 'blue',
}: PillarCardProps) {
  const prefersReduced = useReducedMotion();
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const spacing = isMobile ? 160 : isTablet ? 285 : 340;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  };

  // Smooth physical spring physics for semicircular carousel rotation
  const springTransition = prefersReduced
    ? { duration: 0 }
    : {
        type: 'spring' as const,
        stiffness: 220,
        damping: 24,
        mass: 1.0,
      };

  // 3D Semicircular Slot Coordinates:
  // Slot 0 (Center): Placed noticeably lower down in foreground (+36px), forward in Z (+55px), scale 1.07, fully lit with floor reflection
  // Slot 2 (Left): Placed higher up in background (-18px), left (-spacing), angled inward (+16deg), scale 0.88, shadowed
  // Slot 1 (Right): Placed higher up in background (-18px), right (+spacing), angled inward (-16deg), scale 0.88, shadowed
  // Keeping all Z >= 0 prevents browser 3D negative plane clipping from intercepting clicks!
  let targetX = 0;
  let targetY = isMobile ? 16 : 36;
  let targetZ = isMobile ? 25 : 55;
  let targetRotateY = 0;
  let targetScale = isMobile ? 1.02 : 1.07;
  let targetOpacity = 1.0;
  let targetZIndex = 30;

  if (slot === 2) {
    // Left slot (higher up, angled inward to face viewer along semicircle)
    targetX = -spacing;
    targetY = isMobile ? -10 : -18;
    targetZ = 0;
    targetRotateY = isMobile ? 9 : 16;
    targetScale = isMobile ? 0.85 : 0.88;
    targetOpacity = 0.68;
    targetZIndex = 10;
  } else if (slot === 1) {
    // Right slot (higher up, angled inward to face viewer along semicircle)
    targetX = spacing;
    targetY = isMobile ? -10 : -18;
    targetZ = 0;
    targetRotateY = isMobile ? -9 : -16;
    targetScale = isMobile ? 0.85 : 0.88;
    targetOpacity = 0.68;
    targetZIndex = 10;
  }

  // Exact card dimensions for rock-solid center anchoring
  const cardWidth = isMobile ? 236 : 280;
  const cardHeight = isMobile ? 410 : 440;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      onKeyDown={handleKeyDown}
      whileHover={!isActive ? { scale: targetScale * 1.03, opacity: 0.86 } : undefined}
      whileTap={{ scale: targetScale * 0.98 }}
      animate={{
        x: targetX,
        y: targetY,
        z: targetZ,
        rotateY: targetRotateY,
        scale: targetScale,
        opacity: targetOpacity,
        zIndex: targetZIndex,
      }}
      transition={springTransition}
      style={{
        transformStyle: 'preserve-3d',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        width: cardWidth,
        zIndex: targetZIndex,
      }}
      className="group cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-4 flex flex-col items-center pointer-events-auto"
    >
      {/* Monolith Architectural Pillar Hull */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onActivate();
        }}
        style={{ minHeight: cardHeight }}
        className={`relative w-full rounded-t-[34px] rounded-b-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between p-5 sm:p-6 border ${
          isActive
            ? 'bg-white dark:bg-neutral-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18),0_16px_28px_-6px_rgba(0,0,0,0.08)] ring-1 ring-indigo-500/40 dark:ring-indigo-400/50 border-neutral-300 dark:border-neutral-700'
            : 'bg-white/90 dark:bg-neutral-900/90 shadow-sm border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300'
        } ${className}`}
      >
        {/* Background Shadowing Overlay (Shadows the other 2 pillars when inactive) */}
        {!isActive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-t-[34px] rounded-b-2xl bg-neutral-950/[0.18] dark:bg-black/[0.42] transition-opacity duration-300"
          />
        )}

        {/* Hover Cue Tag on Inactive Flank Monoliths */}
        {!isActive && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 dark:bg-neutral-800/95 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-xs whitespace-nowrap">
              Click to Center
            </span>
          </div>
        )}

        {/* Pillar Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>

      {/* Glowing Floor Pedestal Dais Ring (Seen at the base of every monolith in the image) */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-2 w-36 sm:w-42 h-4.5 rounded-full border border-indigo-500/40 bg-indigo-500/5 relative flex items-center justify-center shadow-[0_0_14px_rgba(99,102,241,0.22)]"
      >
        {/* Inner concentric ring */}
        <div
          className={`w-28 sm:w-34 h-2.5 rounded-full border transition-all duration-300 ${
            isActive
              ? 'border-indigo-500/70 shadow-[0_0_10px_rgba(99,102,241,0.5)] bg-indigo-500/10'
              : 'border-indigo-500/20 bg-transparent'
          }`}
        />
        {/* Center glowing focal point */}
        {isActive && (
          <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.9)] animate-pulse" />
        )}
      </div>

      {/* Polished Floor Reflection Effect ("come up reflected" beneath center active monolith) */}
      {isActive && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-14 rounded-full blur-[2px] opacity-40 bg-gradient-to-b from-indigo-500/30 via-indigo-400/15 to-transparent [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 inset-x-8 h-5 rounded-b-xl opacity-20 bg-gradient-to-b from-indigo-900/30 to-transparent blur-[1px]"
          />
        </>
      )}
    </motion.div>
  );
}

export default PillarCard;

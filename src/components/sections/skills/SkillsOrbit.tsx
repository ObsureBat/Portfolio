'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DOMAINS } from '@/data/skillsData';
import { SkillCategory } from './SkillCategory';
import { ChevronDown, Cpu, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function SkillsOrbit() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);
  const [focusedDomain, setFocusedDomain] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>('cybersecurity');

  const containerRef = useRef<HTMLDivElement>(null!);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const isReducedMotion = useAppStore((s) => s.isReducedMotion);

  // Subtle interactive 3D tilt on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / (rect.height / 2)) * 3.5; // Max 3.5 deg
    const rotateY = (x / (rect.width / 2)) * 3.5; // Max 3.5 deg

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHoveredDomain(null);
  };

  const handleCategoryClick = (id: string) => {
    setFocusedDomain((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP & TABLET: SPATIAL 3D ORBIT CONSTELLATION (>= 768px)    */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
        }}
        className="hidden md:block relative w-full max-w-6xl mx-auto py-2"
      >
        <motion.div
          animate={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative grid grid-cols-2 gap-x-10 gap-y-6 items-center justify-center p-2"
        >
          {/* Central Spatial Anchor: TECHNICAL STACK */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="relative w-32 h-32 rounded-full bg-white/95 border border-zinc-300 shadow-xl shadow-zinc-900/10 backdrop-blur-md flex flex-col items-center justify-center text-center p-3">
              {/* Outer Pulsing Reticle Ring */}
              <div className="absolute -inset-2 rounded-full border border-indigo-400/30 animate-pulse pointer-events-none" />
              <div className="absolute -inset-3.5 rounded-full border border-dashed border-zinc-200 pointer-events-none animate-[spin_30s_linear_infinite]" />

              <span className="w-2 h-2 rounded-full bg-indigo-600 mb-1.5" />
              <span className="font-display font-extrabold text-xs text-zinc-950 uppercase tracking-wider leading-tight">
                TECHNICAL<br />STACK
              </span>
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                Core Axis
              </span>
            </div>
          </div>

          {/* SVG Connection Hairlines */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          >
            {/* Top-Left Line */}
            <line
              x1="50%"
              y1="50%"
              x2="28%"
              y2="28%"
              stroke={hoveredDomain === 'cybersecurity' || focusedDomain === 'cybersecurity' ? '#6366F1' : '#E4E4E7'}
              strokeWidth={hoveredDomain === 'cybersecurity' ? 2 : 1}
              strokeDasharray={hoveredDomain === 'cybersecurity' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Top-Right Line */}
            <line
              x1="50%"
              y1="50%"
              x2="72%"
              y2="28%"
              stroke={hoveredDomain === 'cloud-tools' || focusedDomain === 'cloud-tools' ? '#6366F1' : '#E4E4E7'}
              strokeWidth={hoveredDomain === 'cloud-tools' ? 2 : 1}
              strokeDasharray={hoveredDomain === 'cloud-tools' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Bottom-Left Line */}
            <line
              x1="50%"
              y1="50%"
              x2="28%"
              y2="72%"
              stroke={hoveredDomain === 'systems-os' || focusedDomain === 'systems-os' ? '#6366F1' : '#E4E4E7'}
              strokeWidth={hoveredDomain === 'systems-os' ? 2 : 1}
              strokeDasharray={hoveredDomain === 'systems-os' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Bottom-Right Line */}
            <line
              x1="50%"
              y1="50%"
              x2="72%"
              y2="72%"
              stroke={hoveredDomain === 'programming-ml' || focusedDomain === 'programming-ml' ? '#6366F1' : '#E4E4E7'}
              strokeWidth={hoveredDomain === 'programming-ml' ? 2 : 1}
              strokeDasharray={hoveredDomain === 'programming-ml' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
          </svg>

          {/* 1. TOP-LEFT: CYBERSECURITY */}
          <div className="z-10">
            <SkillCategory
              domain={SKILLS_DOMAINS[0]}
              position="top-left"
              isHovered={hoveredDomain === 'cybersecurity'}
              isOtherHovered={hoveredDomain !== null && hoveredDomain !== 'cybersecurity'}
              isFocused={focusedDomain === 'cybersecurity'}
              onHover={setHoveredDomain}
              onClick={handleCategoryClick}
              onCloseFocus={() => setFocusedDomain(null)}
            />
          </div>

          {/* 2. TOP-RIGHT: CLOUD & TOOLS */}
          <div className="z-10">
            <SkillCategory
              domain={SKILLS_DOMAINS[1]}
              position="top-right"
              isHovered={hoveredDomain === 'cloud-tools'}
              isOtherHovered={hoveredDomain !== null && hoveredDomain !== 'cloud-tools'}
              isFocused={focusedDomain === 'cloud-tools'}
              onHover={setHoveredDomain}
              onClick={handleCategoryClick}
              onCloseFocus={() => setFocusedDomain(null)}
            />
          </div>

          {/* 3. BOTTOM-LEFT: SYSTEMS & SECURITY OS */}
          <div className="z-10">
            <SkillCategory
              domain={SKILLS_DOMAINS[2]}
              position="bottom-left"
              isHovered={hoveredDomain === 'systems-os'}
              isOtherHovered={hoveredDomain !== null && hoveredDomain !== 'systems-os'}
              isFocused={focusedDomain === 'systems-os'}
              onHover={setHoveredDomain}
              onClick={handleCategoryClick}
              onCloseFocus={() => setFocusedDomain(null)}
            />
          </div>

          {/* 4. BOTTOM-RIGHT: PROGRAMMING & MACHINE LEARNING */}
          <div className="z-10">
            <SkillCategory
              domain={SKILLS_DOMAINS[3]}
              position="bottom-right"
              isHovered={hoveredDomain === 'programming-ml'}
              isOtherHovered={hoveredDomain !== null && hoveredDomain !== 'programming-ml'}
              isFocused={focusedDomain === 'programming-ml'}
              onHover={setHoveredDomain}
              onClick={handleCategoryClick}
              onCloseFocus={() => setFocusedDomain(null)}
            />
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE: COMPACT EXPANDABLE DRAWERS (< 768px)                  */}
      {/* ------------------------------------------------------------- */}
      <div className="block md:hidden space-y-3">
        {SKILLS_DOMAINS.map((domain) => {
          const isOpen = mobileExpanded === domain.id;
          return (
            <div
              key={domain.id}
              className="rounded-2xl bg-white border border-zinc-200/90 overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setMobileExpanded(isOpen ? null : domain.id)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {domain.number}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-zinc-950">
                      {domain.title}
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-500">
                      {domain.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-zinc-950' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 pt-1 border-t border-zinc-100"
                  >
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {domain.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200/70 text-zinc-800"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsOrbit;

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FramerIconBadgeProps {
  children: React.ReactNode;
  accentColor?: 'orange' | 'violet' | 'blue' | 'emerald' | 'amber' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FramerIconBadge({
  children,
  accentColor = 'neutral',
  size = 'md',
  className = '',
}: FramerIconBadgeProps) {
  // Accent aura colors
  const auraGradients = {
    orange: 'from-orange-500/25 via-amber-500/20 to-orange-600/10',
    violet: 'from-violet-500/25 via-purple-500/20 to-indigo-600/10',
    blue: 'from-sky-500/25 via-blue-500/20 to-cyan-600/10',
    emerald: 'from-emerald-500/25 via-teal-500/20 to-green-600/10',
    amber: 'from-amber-500/25 via-yellow-500/20 to-orange-600/10',
    neutral: 'from-zinc-400/20 via-neutral-300/15 to-transparent',
  };

  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg text-xs',
    md: 'w-9 h-9 rounded-xl text-sm',
    lg: 'w-11 h-11 rounded-2xl text-base',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Ambient Breathing Glowing Aura on Card/Icon Hover */}
      <div
        className={`absolute -inset-1.5 rounded-[inherit] bg-gradient-to-tr ${auraGradients[accentColor]} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90 group-hover:scale-110`}
      />

      {/* Glassmorphic Squircle Container */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: -2 }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className={`relative ${sizeClasses[size]} bg-white/90 dark:bg-neutral-800/90 border border-neutral-200/90 dark:border-neutral-700/80 shadow-2xs group-hover:shadow-md flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-all duration-300 overflow-hidden ring-1 ring-black/[0.03] dark:ring-white/[0.06]`}
      >
        {/* Subtle glass reflection sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

        {/* Dynamic Icon with spring micro-interaction */}
        <div className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default FramerIconBadge;

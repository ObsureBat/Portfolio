'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CinematicTrainProps {
  orientation?: 'horizontal' | 'vertical';
  isHovered?: boolean;
  className?: string;
}

export function CinematicTrain({
  orientation = 'horizontal',
  isHovered = false,
  className = '',
}: CinematicTrainProps) {
  if (orientation === 'vertical') {
    return (
      <div className={`relative select-none pointer-events-none ${className}`}>
        {/* Ambient Underglow */}
        <div 
          className={`absolute -inset-2 rounded-xl blur-md transition-opacity duration-300 ${
            isHovered 
              ? 'bg-sky-500/25 opacity-100' 
              : 'bg-sky-500/15 opacity-70'
          }`} 
        />

        {/* Vertical Miniature Train */}
        <svg
          width="26"
          height="62"
          viewBox="0 0 26 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-sm"
        >
          <defs>
            <linearGradient id="trainVertBodyGrad" x1="0" y1="0" x2="26" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#f4f4f5" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="trainVertDarkGrad" x1="0" y1="0" x2="26" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#18181b" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="downwardHeadlight" x1="13" y1="56" x2="13" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#818cf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Downward Headlight Beam */}
          <polygon
            points="13,58 2,86 24,86"
            fill="url(#downwardHeadlight)"
            className="transition-opacity duration-300"
            opacity={isHovered ? 0.9 : 0.65}
          />

          {/* Wheels / Couplers (Left & Right Rails) */}
          <rect x="1" y="10" width="3" height="8" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
          <rect x="22" y="10" width="3" height="8" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
          <rect x="1" y="44" width="3" height="8" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
          <rect x="22" y="44" width="3" height="8" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />

          {/* Main Aerodynamic Chassis */}
          <path
            d="M 6 4 C 6 2 20 2 20 4 L 21 50 C 21 56 16 58 13 58 C 10 58 5 56 5 50 Z"
            className="fill-white dark:fill-zinc-900 stroke-zinc-300 dark:stroke-zinc-700"
            strokeWidth="1.2"
          />

          {/* Center Speed Stripe */}
          <line
            x1="13"
            y1="8"
            x2="13"
            y2="46"
            stroke="url(#trainVertStripe)"
            className="stroke-sky-500/70"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />

          {/* Front Light Core */}
          <circle cx="13" cy="54" r="2.2" className="fill-sky-400 animate-pulse" />
          <circle cx="13" cy="54" r="1" className="fill-white" />

          {/* Rear Signal LED */}
          <circle cx="13" cy="7" r="1.2" className="fill-emerald-500" />
        </svg>
      </div>
    );
  }

  // Horizontal Desktop Train
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      {/* Ambient Radial Underglow */}
      <div 
        className={`absolute -inset-3 rounded-full blur-md transition-opacity duration-300 ${
          isHovered 
            ? 'bg-sky-500/30 opacity-100' 
            : 'bg-sky-500/18 opacity-75'
        }`} 
      />

      <svg
        width="82"
        height="32"
        viewBox="0 0 82 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible drop-shadow-md"
      >
        <defs>
          <linearGradient id="trainBodyGradLight" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="85%" stopColor="#f8fafc" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="trainBodyGradDark" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#18181b" stopOpacity="0.98" />
            <stop offset="85%" stopColor="#18181b" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="headlightBeam" x1="68" y1="16" x2="130" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#818cf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cabinGlassGrad" x1="44" y1="8" x2="62" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Forward Conic Headlight Projection */}
        <polygon
          points="66,16 118,4 118,28"
          fill="url(#headlightBeam)"
          className="transition-opacity duration-300"
          opacity={isHovered ? 0.95 : 0.7}
        />

        {/* Top & Bottom Wheel Bogies / Rail Magnetic Couplers */}
        {/* Top Rail Gliders */}
        <rect x="14" y="2" width="10" height="3" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
        <rect x="46" y="2" width="10" height="3" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
        {/* Bottom Rail Gliders */}
        <rect x="14" y="27" width="10" height="3" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />
        <rect x="46" y="27" width="10" height="3" rx="1.5" className="fill-neutral-400 dark:fill-neutral-600" />

        {/* Main Aerodynamic Train Chassis */}
        <path
          d="M 6 5 L 52 5 C 60 5 66 10 68 16 C 66 22 60 27 52 27 L 6 27 C 4 27 3 25 3 23 L 3 9 C 3 7 4 5 6 5 Z"
          className="fill-white dark:fill-zinc-900 stroke-zinc-300 dark:stroke-zinc-700"
          strokeWidth="1.2"
        />

        {/* Upper Accent Racing Stripe */}
        <path
          d="M 7 9 L 52 9 Q 58 9 62 13"
          fill="none"
          stroke="url(#stripeGrad)"
          className="stroke-sky-500/80"
          strokeWidth="1.2"
        />

        {/* Aerodynamic Cockpit Glass / Sensor Strip */}
        <path
          d="M 44 10 L 53 10 C 58 10 62 13 63 16 C 62 19 58 22 53 22 L 44 22 Z"
          fill="url(#cabinGlassGrad)"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />

        {/* Technical Monospace Train Label */}
        <text
          x="12"
          y="18.5"
          fill="currentColor"
          className="text-zinc-800 dark:text-zinc-200 fill-zinc-800 dark:fill-zinc-200"
          fontSize="5.5"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          AYUSH // 02
        </text>

        {/* Rear Status LED */}
        <circle cx="7" cy="16" r="1.4" className="fill-emerald-500" />
        <circle cx="7" cy="16" r="0.6" className="fill-white" />

        {/* Front High-Intensity Headlight Core */}
        <circle cx="66" cy="16" r="2.2" className="fill-sky-400 animate-pulse" />
        <circle cx="66" cy="16" r="1.1" className="fill-white" />
      </svg>
    </div>
  );
}

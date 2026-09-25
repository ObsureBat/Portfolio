'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface JourneyNavProps {
  activeIndex: number;
  onSelectStation: (index: number) => void;
  className?: string;
}

const STOPS = [
  { id: 'research', number: '01', title: 'RESEARCH LEAD', short: 'RESEARCH' },
  { id: 'ic3se', number: '02', title: 'PRESENTED PAPER', short: 'IC3SE 2025' },
  { id: 'gpi', number: '03', title: 'FREELANCE DEV', short: 'GPI DEV' },
];

export function JourneyNav({
  activeIndex,
  onSelectStation,
  className = '',
}: JourneyNavProps) {
  return (
    <div
      role="navigation"
      aria-label="Engineering Journey Navigation"
      className={`rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-2.5 sm:p-3 shadow-xs select-none ${className}`}
    >
      <div className="flex items-center justify-between gap-3 px-1 mb-2">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          <span>JOURNEY</span>
        </div>
        <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500">
          0{activeIndex + 1} / 03
        </span>
      </div>

      <div className="flex flex-row sm:flex-col gap-1" role="tablist">
        {STOPS.map((stop, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={stop.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => onSelectStation(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectStation(index);
                }
              }}
              className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200 text-left font-mono text-[11px] ${
                isActive
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
              }`}
            >
              {/* Dot Indicator */}
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                  isActive
                    ? index === 0
                      ? 'bg-violet-400'
                      : index === 1
                      ? 'bg-emerald-400'
                      : 'bg-sky-400'
                    : 'bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400'
                }`}
              />

              {/* Station Label */}
              <span className="hidden sm:inline tracking-wider">
                <span className="opacity-60 mr-1.5">{stop.number}</span>
                <span>{stop.title}</span>
              </span>

              {/* Mobile Short Label */}
              <span className="inline sm:hidden tracking-wider">
                <span className="opacity-60 mr-1">{stop.number}</span>
                <span>{stop.short}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { STATIONS, StationPlaque } from './StationPlaque';
import { CinematicTrain } from './CinematicTrain';

interface MobileRailwayProps {
  className?: string;
}

export function MobileRailway({ className = '' }: MobileRailwayProps) {
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Route Header Info */}
      <div className="flex items-center justify-between gap-2 px-1 mb-6 border-b border-neutral-200/80 dark:border-neutral-800 pb-3 font-mono text-[11px]">
        <div className="flex items-center gap-1.5 text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>VERTICAL ROUTE // SOUTHBOUND</span>
        </div>
        <span className="text-neutral-400">STATIONS: 03</span>
      </div>

      <div className="relative pl-10 pr-1 space-y-10">
        {/* ======================================================== */}
        {/* VERTICAL STEEL RAILWAY TRACK */}
        {/* ======================================================== */}
        <div className="absolute left-3 top-2 bottom-6 w-5 select-none pointer-events-none">
          {/* Dual Vertical Rails */}
          <div className="absolute left-1 top-0 bottom-0 w-[1.5px] bg-neutral-300 dark:bg-neutral-700" />
          <div className="absolute left-4 top-0 bottom-0 w-[1.5px] bg-neutral-300 dark:bg-neutral-700" />
          
          {/* Cross Ties (Sleepers) */}
          <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-35 dark:opacity-25">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-5 h-[1.5px] bg-neutral-400 dark:bg-neutral-600 rounded-full" />
            ))}
          </div>

          {/* Central Guideline */}
          <div className="absolute left-2.5 top-0 bottom-0 w-px border-l border-dashed border-sky-500/40" />
        </div>

        {/* ======================================================== */}
        {/* STATIONS LIST WITH CARDS & NODES */}
        {/* ======================================================== */}
        {STATIONS.map((station, index) => {
          const isActive = activeStationIndex === index;
          const isGPI = station.id === 'gpi';
          const isResearch = station.id === 'research';

          const accentColor = isGPI ? '#38bdf8' : isResearch ? '#818cf8' : '#34d399';

          return (
            <div key={station.id} className="relative group">
              {/* Station Node on Vertical Track */}
              <div className="absolute -left-10 top-6 -translate-x-[1px] flex items-center justify-center">
                <button
                  onClick={() => setActiveStationIndex(index)}
                  aria-label={`Select Station ${station.number}: ${station.name}`}
                  className="relative flex items-center justify-center focus:outline-hidden"
                >
                  {/* Glowing Node */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-xs transition-all ${
                      isActive ? 'scale-110 shadow-md' : 'scale-90 border-neutral-300 dark:border-neutral-700'
                    }`}
                    style={{ borderColor: isActive ? accentColor : undefined }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'animate-pulse' : 'bg-neutral-400 dark:bg-neutral-600'
                      }`}
                      style={{ backgroundColor: isActive ? accentColor : undefined }}
                    />
                  </div>
                </button>
              </div>

              {/* Station Plaque Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
              >
                <StationPlaque
                  station={station}
                  isActive={isActive}
                  onSelect={() => setActiveStationIndex(index)}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Downward Transition Anchor to Section 03 */}
      <div className="pt-8 flex justify-center">
        <a
          href="#research"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 text-xs font-mono font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
        >
          <span>03 / RESEARCH SPOTLIGHT</span>
          <span className="text-neutral-400 group-hover:translate-y-0.5 transition-transform">↓</span>
        </a>
      </div>
    </div>
  );
}

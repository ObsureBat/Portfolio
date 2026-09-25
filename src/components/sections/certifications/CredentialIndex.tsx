'use client';

import React from 'react';
import { CredentialItem } from '@/data/certificationsData';

interface CredentialIndexProps {
  items: CredentialItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function CredentialIndex({
  items,
  activeIndex,
  onSelect,
}: CredentialIndexProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200/80">
        <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
          ARCHIVAL INDEX
        </span>
        <span className="text-[11px] font-mono text-zinc-400">
          06 RECORDS
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(idx)}
              onMouseEnter={() => onSelect(idx)}
              className={`group relative p-3 sm:p-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 border ${
                isActive
                  ? 'bg-white border-zinc-300 shadow-sm text-zinc-950 ring-1 ring-zinc-900/5'
                  : 'bg-white/60 border-zinc-200/60 hover:bg-white hover:border-zinc-300 text-zinc-600'
              }`}
            >
              {/* Left: Number + Thumbnail + Title + Subtitle */}
              <div className="flex items-center gap-3 overflow-hidden">
                <span
                  className={`text-xs font-mono font-bold shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-zinc-950 text-white'
                      : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-800'
                  }`}
                >
                  {item.number}
                </span>

                {/* Micro Thumbnail */}
                <div className="relative w-11 h-8 rounded-lg overflow-hidden shrink-0 border border-zinc-200/80 bg-zinc-100 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="overflow-hidden">
                  <h4
                    className={`text-xs sm:text-sm font-display font-bold truncate transition-colors ${
                      isActive ? 'text-zinc-950' : 'text-zinc-800 group-hover:text-zinc-950'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                    {item.organization} · <span className="text-zinc-500">{item.date}</span>
                  </p>
                </div>
              </div>

              {/* Right: Active Indicator Bar */}
              <div className="shrink-0 flex items-center gap-2">
                {isActive ? (
                  <span className="w-1.5 h-6 rounded-full bg-indigo-600" />
                ) : (
                  <span className="w-1.5 h-6 rounded-full bg-transparent group-hover:bg-zinc-200 transition-colors" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CredentialIndex;

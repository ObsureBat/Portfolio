'use client';

import React from 'react';

interface GpiEmblemProps {
  className?: string;
}

export function GpiEmblem({ className = 'w-10 h-10' }: GpiEmblemProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-900 border border-zinc-700/60 shadow-md ${className}`}
    >
      <span className="font-display font-black text-xs sm:text-sm tracking-wider text-white">
        GPI
      </span>
      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
    </div>
  );
}

export default GpiEmblem;

'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Menu } from 'lucide-react';
import { FullMenuOverlay } from './FullMenuOverlay';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-auto max-w-full">
        {/* Brand / Logo (Matching Dribbble Damian Watracz Header) */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-xs font-bold font-mono text-zinc-900">
            AS
          </div>
          <a href="#hero" className="flex flex-col min-w-0">
            <span className="font-display font-bold text-sm tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors whitespace-nowrap">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-500 whitespace-nowrap">
              {PORTFOLIO_DATA.personal.title}
            </span>
          </a>
        </div>

        {/* Right Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-2.5 text-xs font-mono font-bold text-zinc-900 hover:text-white tracking-widest uppercase transition-all duration-300 px-5 py-2.5 rounded-full bg-white/70 hover:bg-zinc-900 border border-zinc-900/15 hover:border-zinc-900 shadow-sm backdrop-blur-md"
          >
            <span>MENU</span>
            <Menu className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </header>

      {/* Full-Screen Dark Overlay Menu */}
      <FullMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Navbar;

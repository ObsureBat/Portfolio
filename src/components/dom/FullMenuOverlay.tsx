'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { X, ArrowUpRight } from 'lucide-react';

interface FullMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: '01', label: 'Home', href: '#hero', subtitle: 'Welcome & Introduction' },
  { id: '02', label: 'About Me', href: '#about', subtitle: 'Background & Engineering Bio' },
  { id: '03', label: 'Experience', href: '#experience', subtitle: 'Work History & Roles' },
  { id: '04', label: 'Research', href: '#research', subtitle: 'AI NIDS & Cloud Firewall' },
  { id: '05', label: 'Selected Projects', href: '#selected-projects', subtitle: 'Featured Case Studies' },
  { id: '06', label: 'Skills', href: '#skills', subtitle: 'Cloud, Security & Tooling' },
  { id: '07', label: 'Certifications', href: '#certifications', subtitle: 'TryHackMe & AWS Credentials' },
  { id: '08', label: 'Contact', href: '#contact', subtitle: 'Initiate Conversation' },
];

export function FullMenuOverlay({ isOpen, onClose }: FullMenuOverlayProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  };

  const activeLabel = hoveredIdx !== null ? MENU_ITEMS[hoveredIdx].label : 'NAVIGATION';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="full-menu-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#0B0D13]/95 backdrop-blur-3xl text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

          {/* Background Ghost Watermark — Dynamically Reacts to Hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
            <motion.span
              key={activeLabel}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 0.04, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -15 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="font-display font-extrabold text-[15vw] tracking-tighter text-white uppercase whitespace-nowrap"
            >
              {activeLabel}
            </motion.span>
          </div>

          {/* Top Bar Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-between z-20 w-full max-w-7xl mx-auto"
          >
            {/* Identity Badge */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-9 h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-xs font-mono font-bold tracking-wider text-white shadow-inner">
                AS
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-white">
                  {PORTFOLIO_DATA.personal.name}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
                  {PORTFOLIO_DATA.personal.title}
                </span>
              </div>
            </div>

            {/* Availability Pill Indicator (Desktop) */}
            <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for Cyber &amp; Cloud Roles</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="group flex items-center gap-2.5 text-xs font-mono text-zinc-300 hover:text-white uppercase tracking-widest transition-all duration-300 py-2.5 px-5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-white/40"
            >
              <span className="text-[11px]">CLOSE</span>
              <X className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90 text-zinc-400 group-hover:text-white" />
            </button>
          </motion.div>

          {/* Centered Main Navigation Menu Links */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 sm:py-8 z-20 w-full max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.35em] mb-4 sm:mb-6"
            >
              — INDEX NAVIGATION —
            </motion.span>

            <nav className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 w-full">
              {MENU_ITEMS.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                const isDimmed = isAnyHovered && !isHovered;

                return (
                  <div key={item.id} className="overflow-hidden w-full flex justify-center">
                    <motion.button
                      initial={{ y: 70, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 70, opacity: 0 }}
                      transition={{
                        duration: 0.55,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.12 + idx * 0.05,
                      }}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => handleNavClick(item.href)}
                      className={`group relative flex items-center justify-center gap-3 sm:gap-6 py-1 sm:py-2 transition-all duration-300 ${
                        isDimmed ? 'opacity-25 blur-[1px]' : 'opacity-100'
                      }`}
                    >
                      {/* Numeric Index Tag */}
                      <span className={`text-[10px] sm:text-xs font-mono transition-colors duration-300 ${
                        isHovered ? 'text-emerald-400' : 'text-zinc-600'
                      }`}>
                        {item.id}
                      </span>

                      {/* Main Label Title */}
                      <span className={`font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[clamp(32px,4vw,56px)] tracking-tight uppercase transition-all duration-300 ${
                        isHovered
                          ? 'text-white translate-x-1.5'
                          : 'text-zinc-300'
                      }`}>
                        {item.label}
                      </span>

                      {/* Hover Arrow Reveal & Subtitle Pill (Tablet/Desktop) */}
                      <span
                        className={`hidden sm:inline-flex items-center gap-2 text-xs font-mono text-zinc-400 transition-all duration-300 overflow-hidden ${
                          isHovered ? 'max-w-[240px] opacity-100 pl-2' : 'max-w-0 opacity-0 pl-0'
                        }`}
                      >
                        <span className="text-[11px] text-zinc-400 tracking-wider">/ {item.subtitle}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </motion.button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Footer Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 sm:pt-6 text-xs font-mono text-zinc-400 z-20 w-full max-w-7xl mx-auto"
          >
            {/* Location & Copyright */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span>Gurugram, Haryana, IN</span>
              <span>•</span>
              <span>© {new Date().getFullYear()} Ayush Sharma</span>
            </div>

            {/* Quick Contact & Social Links */}
            <div className="flex items-center gap-6 sm:gap-8 text-[11px]">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-white after:transition-all after:duration-300"
              >
                LinkedIn ↗
              </a>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-white after:transition-all after:duration-300"
              >
                GitHub ↗
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="hover:text-emerald-400 transition-colors relative py-1 text-zinc-300 font-semibold"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FullMenuOverlay;

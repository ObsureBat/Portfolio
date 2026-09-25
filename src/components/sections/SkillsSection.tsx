'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillsOrbit } from './skills/SkillsOrbit';
import { SkillIndex } from './skills/SkillIndex';
import { fadeInUp, smoothTransition } from '@/lib/animations';

export function SkillsSection() {
  const [viewMode, setViewMode] = useState<'explore' | 'index'>('explore');

  return (
    <section
      id="skills"
      className="relative w-full pt-14 sm:pt-20 pb-8 sm:pb-10 px-6 sm:px-12 lg:px-20 bg-[#F5F5F3] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      {/* Background Decorative Ambient Radial Dot Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* ========================================================================= */}
        {/* TOP HERO HEADER AREA                                                      */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-3 border-b border-zinc-200/80"
        >
          <div className="space-y-2.5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-mono font-bold text-zinc-400 tracking-widest uppercase">
                05 / SKILLS & TECHNICAL STACK
              </span>
              <div className="h-px w-8 bg-zinc-300" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-zinc-950 uppercase tracking-tight leading-[0.95]"
            >
              I BUILD<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-800">
                ACROSS THE STACK.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: 0.4 }}
              className="text-xs sm:text-sm font-mono text-zinc-600 max-w-xl"
            >
              Software engineering · Cloud infrastructure · Cybersecurity · Machine learning
            </motion.p>
          </div>

          {/* Recruiter Mode Switcher: EXPLORE | INDEX */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...smoothTransition, delay: 0.5 }}
            className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-zinc-200/90 shadow-2xs self-start md:self-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('explore')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'explore'
                  ? 'bg-zinc-950 text-white font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 font-medium'
              }`}
            >
              EXPLORE
            </motion.button>
            <div className="h-3 w-px bg-zinc-200" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('index')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'index'
                  ? 'bg-zinc-950 text-white font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 font-medium'
              }`}
            >
              INDEX
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN BODY: TECHNICAL ORBIT CONSTELLATION OR FAST RECRUITER INDEX         */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center">
          {viewMode === 'explore' ? (
            <div className="w-full animate-fade-in">
              <SkillsOrbit />
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <SkillIndex />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;

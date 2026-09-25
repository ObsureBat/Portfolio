'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CredentialArchive } from './certifications/CredentialArchive';
import { ArrowDown } from 'lucide-react';
import { fadeInUp, smoothTransition } from '@/lib/animations';

export function CertificationsSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { immediate: false, offset: -20 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="certifications"
      className="relative w-full pt-10 sm:pt-14 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20 bg-[#F5F5F3] text-zinc-900 border-t border-zinc-200/80 overflow-hidden"
    >
      {/* Background Decorative Ambient Radial Dot Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Very soft ambient indigo glow behind the archive */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.03] blur-3xl"
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
                06 / CERTIFICATIONS & ACTIVITIES
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
              PROOF<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-indigo-800">
                BEHIND THE WORK.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...smoothTransition, delay: 0.4 }}
              className="text-xs sm:text-sm font-mono text-zinc-600 max-w-xl"
            >
              Certifications · Research · Technical Activities
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...smoothTransition, delay: 0.5 }}
            className="text-left md:text-right"
          >
            <span className="text-xs font-mono text-zinc-400 block">ARCHIVE FORMAT</span>
            <span className="text-xs font-mono font-bold text-zinc-800 uppercase tracking-wider">
              Documented Proof Wall
            </span>
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN BODY: THE PROOF ARCHIVE COMPOSITION                                  */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.6 }}
          className="min-h-[440px]"
        >
          <CredentialArchive />
        </motion.div>

        {/* ========================================================================= */}
        {/* CLOSING STATEMENT & NATURAL TRANSITION TO SECTION 07 (CONTACT)            */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.7 }}
          className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
        >
          <div className="space-y-1">
            <div className="font-display font-bold text-zinc-950 tracking-wider text-sm uppercase">
              CERTIFIED. PRESENTED. LEARNING. BUILDING.
            </div>
            <p className="text-zinc-500 text-[11px]">
              Software · Cloud · Cybersecurity · AI
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-950 transition-colors uppercase font-bold tracking-wider self-start sm:self-auto"
          >
            <span>PRODUCTION DISPATCH</span>
            <ArrowDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default CertificationsSection;

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactHero } from './contact/ContactHero';
import { ContactSignalCore } from './contact/ContactSignalCore';
import { ContactDetails } from './contact/ContactDetails';
import { ContactForm } from './contact/ContactForm';
import { ContactFooter } from './contact/ContactFooter';
import { fadeInUp, smoothTransition } from '@/lib/animations';

export function ContactSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          const formEl = document.getElementById('contact-form-container');
          if (formEl) {
            if ((window as any).__lenis) {
              (window as any).__lenis.scrollTo(formEl, { immediate: false, offset: -80 });
            } else {
              formEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }, 180);
      }
      return nextState;
    });
  };

  return (
    <section
      id="contact"
      className="relative w-full pt-16 sm:pt-24 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-20 bg-[#F5F5F3] text-zinc-900 overflow-hidden border-t border-zinc-200/80"
    >
      {/* Background Decorative Ambient Radial Dot Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Atmospheric Soft Ambient Indigo Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* ========================================================================= */}
        {/* 1. HERO COMPOSITION: EDITORIAL TYPOGRAPHY & 3D COMMUNICATION CORE         */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          {/* Left Column: Massive Editorial Typography & Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...smoothTransition, delay: 0.2 }}
            className="lg:col-span-8 order-1 overflow-visible"
          >
            <ContactHero
              onOpenForm={handleToggleForm}
              isFormOpen={isFormOpen}
              onHoverChange={setIsCtaHovered}
            />
          </motion.div>

          {/* Right Column: Abstract 3D Signal Communication Core */}
          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...smoothTransition, delay: 0.3 }}
            className="lg:col-span-4 order-2"
          >
            <ContactSignalCore isCtaHovered={isCtaHovered} />
          </motion.div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. EXPANDABLE CONTACT CONSOLE (REVEALED ON CTA CLICK)                     */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.4 }}
        >
          <ContactForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. DIRECT CONTACT DETAILS, EMAIL COPY & REAL CAPABILITIES                */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.5 }}
        >
          <ContactDetails />
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. FINAL CLOSING STATEMENT, EDITORIAL COLOPHON & TELEMETRY COORDINATES    */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ ...smoothTransition, delay: 0.6 }}
        >
          <ContactFooter />
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;

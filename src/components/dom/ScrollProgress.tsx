'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: '01' },
  { id: 'about', label: '02' },
  { id: 'experience', label: '03' },
  { id: 'research', label: '04' },
  { id: 'selected-projects', label: '05' },
  { id: 'skills', label: '06' },
  { id: 'certifications', label: '07' },
  { id: 'contact', label: '08' },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // High-performance IntersectionObserver eliminates layout thrashing during scroll
    const sectionElements = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex(s => s.id === entry.target.id);
            if (idx !== -1) {
              setActiveSection((prev) => (prev === idx ? prev : idx));
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(SECTIONS[index].id);
    if (section) {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(section, { duration: 1.2 });
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {/* Scroll Progress Bar */}
      <motion.div
        className="w-1 h-48 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"
          style={{
            scaleY: scrollYProgress,
            originY: 0
          }}
        />
      </motion.div>

      {/* Section Indicators */}
      <div className="flex flex-col gap-2 items-center">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === index
                ? 'bg-indigo-600 scale-125'
                : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
            }`}
            aria-label={`Scroll to ${section.label}`}
          />
        ))}
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </motion.button>

      <motion.div
        className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 writing-vertical-rl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        SCROLL
      </motion.div>
    </div>
  );
}
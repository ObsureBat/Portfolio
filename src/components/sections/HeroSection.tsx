'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { useAppStore } from '@/lib/store';
import { smoothTransition } from '@/lib/animations';

export function HeroSection() {
  const isReducedMotion = useAppStore((s) => s.isReducedMotion);
  const imageRef = useRef<HTMLImageElement>(null!);
  const watermarkRef = useRef<HTMLDivElement>(null!);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    if (isReducedMotion) return;

    let animationFrameId: number;

    const animateParallax = () => {
      const mousePos = useAppStore.getState().mousePos;

      if (imageRef.current) {
        const tiltX = mousePos.y * -6;
        const tiltY = mousePos.x * 8;
        const translateX = mousePos.x * 12;
        const translateY = mousePos.y * 8;
        imageRef.current.style.transform = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      if (watermarkRef.current) {
        const watermarkX = mousePos.x * -18;
        const watermarkY = mousePos.y * -10;
        watermarkRef.current.style.transform = `translate3d(${watermarkX}px, ${watermarkY}px, 0px)`;
      }

      animationFrameId = requestAnimationFrame(animateParallax);
    };

    animationFrameId = requestAnimationFrame(animateParallax);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isReducedMotion]);

  return (
    <motion.section 
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[720px] max-h-[1100px] flex items-center px-6 sm:px-12 lg:px-16 z-10 overflow-hidden bg-[#FAFAF7]"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      
      {/* Giant Background Watermark Typography — Shifted Leftward */}
      <motion.div
        ref={watermarkRef}
        className="absolute top-[20%] sm:top-[23%] left-0 right-0 pointer-events-none select-none z-0 transition-transform duration-300 ease-out w-full flex justify-center lg:justify-start lg:pl-[4vw] items-center px-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="font-display font-extrabold text-[clamp(120px,12.5vw,290px)] tracking-tighter text-[#DCE1EA] leading-none whitespace-nowrap select-none">
          BUILDER.
        </span>
      </motion.div>

      {/* Main Container — Desktop Absolute Asymmetrical Geometry / Mobile Fluid Stack */}
      <div className="w-full max-w-7xl mx-auto h-full relative z-10 flex flex-col justify-between pt-24 pb-12 lg:py-0">
        
        {/* Left Editorial Content Column — Positioned LOWER & SHIFTED LEFT (z-30) */}
        <motion.div 
          style={{ y: textY }}
          className="flex flex-col items-start text-left lg:absolute lg:left-[1%] lg:top-[60%] lg:-translate-y-1/2 lg:w-[min(68vw,1020px)] lg:max-w-5xl z-30 relative space-y-6 pt-16 sm:pt-20 lg:pt-0"
        >
          
          {/* Eyebrow Line */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.3 }}
            className="text-[10px] font-mono font-medium uppercase tracking-[0.28em] text-zinc-400"
          >
            WELCOME TO MY WEBSITE
          </motion.span>

          {/* Main Editorial Headline — Exactly 3 Lines, Overlays Portrait Image */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.4 }}
            className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[clamp(32px,3.3vw,54px)] tracking-tight text-zinc-900 leading-[1.06] lg:leading-[1.02] drop-shadow-[0_1px_16px_rgba(250,250,247,0.85)]"
          >
            <span className="block font-extrabold animate-title-shimmer sm:whitespace-nowrap transition-all duration-300 hover:tracking-[0.01em]">
              AYUSH SHARMA —
            </span>
            <span className="block font-bold text-zinc-900 sm:whitespace-nowrap">
              Cloud &amp; Cybersecurity Engineer
            </span>
            <span className="block font-semibold text-zinc-800 sm:whitespace-nowrap">
              building intelligent, secure software.
            </span>
          </motion.h1>

          {/* Supporting Subline Copy — Strictly 2 Lines */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.5 }}
            className="font-sans text-zinc-600 text-xs sm:text-sm md:text-[15px] max-w-[680px] leading-relaxed font-normal pt-1 drop-shadow-[0_1px_8px_rgba(250,250,247,0.7)]"
          >
            <span className="block sm:whitespace-nowrap">
              From AI-driven intrusion detection and adaptive AWS firewalls to production software
            </span>
            <span className="block sm:whitespace-nowrap">
              and cloud-native platforms, I turn complex problems into working systems.
            </span>
          </motion.p>

          {/* Minimalist Dribbble Action Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.6 }}
            className="flex items-center gap-8 pt-2"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              <span>View Projects</span>
              <span className="text-zinc-900 group-hover:translate-x-1 transition-transform"> —</span>
            </a>

            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <span>Read About Me</span>
            </a>
          </motion.div>

        </motion.div>

        {/* Right Viewport Space — PORTRAIT POSITIONED UPPER-MIDDLE RIGHT (z-10) — ABOVE BACKGROUND TEXT WITH SHADOW */}
        <motion.div 
          style={{ y: imageY }}
          className="w-full lg:w-auto lg:absolute lg:right-[2%] lg:top-[3%] lg:h-[88vh] flex items-end justify-center lg:justify-end z-10 mt-6 lg:mt-0 pointer-events-none"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ ...smoothTransition, delay: 0.7 }}
            className="relative w-full lg:w-[clamp(440px,46vw,860px)] h-[520px] sm:h-[680px] lg:h-full flex items-end justify-center lg:justify-end filter drop-shadow-[-34px_24px_48px_rgba(0,0,0,0.36)] drop-shadow-[-16px_14px_22px_rgba(0,0,0,0.22)] drop-shadow-[-4px_4px_8px_rgba(0,0,0,0.16)] drop-shadow-[14px_18px_32px_rgba(0,0,0,0.12)]"
          >
            
            {/* Authentic Natural Color Portrait Cutout with Bottom Merge Gradient & 3D Depth */}
            <img
              ref={imageRef}
              src="/assets/face-photo-v2.png?v=8"
              alt="Ayush Sharma — Cloud & Cybersecurity Engineer"
              className="w-auto h-full max-h-[880px] object-contain object-bottom transition-transform duration-200 ease-out select-none pointer-events-none contrast-[1.04]"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.75) 82%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.75) 82%, rgba(0,0,0,0) 100%)',
              }}
            />

          </motion.div>
        </motion.div>

      </div>

      {/* Down Scroll Arrow Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ ...smoothTransition, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-3.5 h-3.5 border-b-2 border-r-2 border-zinc-700 rotate-45"
        />
      </motion.div>

    </motion.section>
  );
}

export default HeroSection;

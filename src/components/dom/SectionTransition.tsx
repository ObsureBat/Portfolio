'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function SectionTransition({ 
  children, 
  className = '',
  intensity = 'medium'
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Pure GPU-accelerated opacity fades without expensive texture re-rasterization
  const opacity = useTransform(
    scrollYProgress, 
    intensity === 'subtle' ? [0, 0.12, 0.88, 1] : [0, 0.18, 0.82, 1], 
    [0.2, 1, 1, 0.2]
  );

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{
        opacity,
        willChange: 'opacity',
      }}
    >
      {children}
    </motion.section>
  );
}

// Parallax layer component for depth effects
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5,
  className = ''
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 60]);

  return (
    <motion.div ref={ref} className={className} style={{ y, willChange: 'transform' }}>
      {children}
    </motion.div>
  );
}
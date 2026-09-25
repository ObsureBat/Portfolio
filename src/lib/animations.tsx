import React from 'react';
import { motion, Variants } from 'framer-motion';

// Shared animation variants for consistent motion across the site
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const slideInFromBottom: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
};

// Transition presets for consistent timing
export const smoothTransition = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 100,
  mass: 0.8
};

export const quickTransition = {
  type: 'spring' as const,
  damping: 20,
  stiffness: 150,
  mass: 0.5
};

export const slowTransition = {
  type: 'spring' as const,
  damping: 30,
  stiffness: 80,
  mass: 1
};

// Scroll-triggered animation defaults
export const scrollTriggerDefaults = {
  viewport: { once: true, margin: '-100px' },
  transition: smoothTransition
};

// Stagger children helper
export const staggerChildren = (delay: number = 0.1) => ({
  transition: {
    staggerChildren: delay,
    delayChildren: 0.2
  }
});

// Reusable animated section wrapper
export const AnimatedSection = ({ 
  children, 
  className = '',
  variants = fadeInUp 
}: { 
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) => (
  <motion.section
    initial="initial"
    whileInView="animate"
    exit="exit"
    viewport={{ once: true, margin: '-50px' }}
    variants={variants}
    transition={smoothTransition}
    className={className}
  >
    {children}
  </motion.section>
);

// Reusable animated div wrapper
export const AnimatedDiv = ({ 
  children, 
  className = '',
  variants = fadeInUp,
  delay = 0 
}: { 
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: '-100px' }}
    variants={variants}
    transition={{ ...smoothTransition, delay }}
    className={className}
  >
    {children}
  </motion.div>
);
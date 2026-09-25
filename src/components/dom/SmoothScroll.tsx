'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '@/lib/store';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);
  const setMousePos = useAppStore((s) => s.setMousePos);
  const setHardwareTier = useAppStore((s) => s.setHardwareTier);
  const setIsReducedMotion = useAppStore((s) => s.setIsReducedMotion);

  useEffect(() => {
    // Hardware tier detection & reduced motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReduced);

    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 1;
    if (isMobile) {
      setHardwareTier('low');
    }

    // Initialize Lenis smooth scroll tuned for high-refresh 60/120Hz displays
    const lenis = new Lenis({
      lerp: 0.085, // Silky smooth inertia interpolation without sudden stops
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    (window as any).__lenis = lenis;

    // Connect Lenis to ScrollTrigger with immediate synchronization
    lenis.on('scroll', (e: { progress: number }) => {
      setScrollProgress(e.progress);
      ScrollTrigger.update();
    });

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    // Smooth compensation for micro-frame drops instead of abrupt jumps
    gsap.ticker.lagSmoothing(500, 33);

    // RAF-throttled mouse listener to prevent high-DPI mouse polling thrashing
    let mouseRafId: number | null = null;
    let latestNormX = 0;
    let latestNormY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      latestNormX = (e.clientX / window.innerWidth) * 2 - 1;
      latestNormY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (mouseRafId === null) {
        mouseRafId = requestAnimationFrame(() => {
          setMousePos(latestNormX, latestNormY);
          mouseRafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (mouseRafId !== null) cancelAnimationFrame(mouseRafId);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setScrollProgress, setMousePos, setHardwareTier, setIsReducedMotion]);

  return <>{children}</>;
}

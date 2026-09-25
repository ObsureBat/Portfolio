'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, type HTMLMotionProps } from 'framer-motion';

interface FramerCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  spotlightColor?: string;
}

export function FramerCard({
  children,
  className = '',
  enableTilt = true,
  spotlightColor = 'rgba(120, 120, 120, 0.08)',
  ...props
}: FramerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);

  // Detect hover capability (disable on touch devices to conserve CPU & avoid touch drag issues)
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(media.matches);
    const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Smooth spring physics for Apple/Stripe-grade 3D card tilt & lift
  const springConfig = { stiffness: 280, damping: 22 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const zLift = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    if (enableTilt) {
      // Normalize from -0.5 to 0.5
      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;
      // Controlled, restrained tilt (max 5 deg)
      rotateX.set(-normY * 5.5);
      rotateY.set(normX * 5.5);
    }
  };

  const handleMouseEnter = () => {
    if (!canHover) return;
    setIsHovered(true);
    if (enableTilt) {
      zLift.set(16); // Lift card along translateZ
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enableTilt) {
      rotateX.set(0);
      rotateY.set(0);
      zLift.set(0);
    }
  };

  return (
    <div className="relative w-full h-full [perspective:1200px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: enableTilt && canHover ? rotateX : 0,
          rotateY: enableTilt && canHover ? rotateY : 0,
          z: enableTilt && canHover ? zLift : 0,
        }}
        className={`group relative overflow-hidden transition-shadow duration-300 will-change-transform ${
          isHovered
            ? 'shadow-[0_24px_38px_-8px_rgba(0,0,0,0.10),0_10px_16px_-4px_rgba(0,0,0,0.05)] border-neutral-300 dark:border-neutral-700'
            : 'shadow-xs border-neutral-200/90 dark:border-neutral-800'
        } ${className}`}
        {...props}
      >
        {/* Dynamic Cursor-Following Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[inherit] z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />

        {/* Subtle Border Illumination Highlight on Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0 ring-1 ring-inset ring-black/[0.03] group-hover:ring-black/[0.08]"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.4), transparent 60%)`,
          }}
        />

        {/* Content wrapper elevated with 3D depth */}
        <div
          className="relative z-10 h-full flex flex-col justify-between"
          style={{
            transform: enableTilt && canHover && isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
            transition: 'transform 0.25s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default FramerCard;

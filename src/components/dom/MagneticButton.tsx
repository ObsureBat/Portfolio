'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '@/lib/store';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null!);
  const setIsHovering = useAppStore((s) => s.setIsHoveringInteractive);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    gsap.to(btn, {
      x: deltaX * 0.35,
      y: deltaY * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    setIsHovering(false);

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={btnRef as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-shadow duration-300 ${className}`}
    >
      {children}
    </Component>
  );
}

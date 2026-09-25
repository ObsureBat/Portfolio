'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillDomain } from '@/data/skillsData';
import { Shield, Cloud, Terminal, Code2, ArrowUpRight, X } from 'lucide-react';

interface SkillCategoryProps {
  domain: SkillDomain;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  isHovered: boolean;
  isOtherHovered: boolean;
  isFocused: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  onCloseFocus: () => void;
}

const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  cybersecurity: Shield,
  'cloud-tools': Cloud,
  'systems-os': Terminal,
  'programming-ml': Code2,
};

export function SkillCategory({
  domain,
  position,
  isHovered,
  isOtherHovered,
  isFocused,
  onHover,
  onClick,
  onCloseFocus,
}: SkillCategoryProps) {
  const Icon = DOMAIN_ICONS[domain.id] || Shield;

  // Determine spatial translate class based on position
  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'lg:origin-bottom-right';
      case 'top-right':
        return 'lg:origin-bottom-left';
      case 'bottom-left':
        return 'lg:origin-top-right';
      case 'bottom-right':
        return 'lg:origin-top-left';
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(domain.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(domain.id)}
      animate={{
        opacity: isOtherHovered ? 0.78 : 1.0,
        scale: isFocused ? 1.05 : isHovered ? 1.02 : 1.0,
        z: isFocused ? 30 : isHovered ? 16 : 0,
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-full p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer ${getPositionStyles()} ${
        isFocused
          ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-950/10 ring-4 ring-indigo-500/10 z-30'
          : isHovered
          ? 'bg-white border border-indigo-300 shadow-lg shadow-zinc-900/5 z-20'
          : 'bg-white/80 border border-zinc-200/90 shadow-2xs hover:border-zinc-300'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
            {domain.number}
          </span>
          <h4 className="font-display font-bold text-sm sm:text-base text-zinc-950 tracking-tight">
            {domain.title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          {isFocused ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseFocus();
              }}
              title="Close focus view"
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:text-indigo-600 transition-colors">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      <p className="text-[11px] font-mono text-zinc-500 mb-4">{domain.subtitle}</p>

      {/* Domain-Specific Interactive Skills Rendering */}
      {/* 1. CYBERSECURITY */}
      {domain.id === 'cybersecurity' && (
        <div className="flex flex-wrap gap-1.5">
          {domain.skills.map((skill) => (
            <span
              key={skill.name}
              className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all ${
                isHovered || isFocused
                  ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium shadow-2xs'
                  : 'bg-zinc-100/90 border border-zinc-200/60 text-zinc-700'
              }`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}

      {/* 2. CLOUD & TOOLS (AWS Connected Cluster + Supporting Toolchain) */}
      {domain.id === 'cloud-tools' && (
        <div className="space-y-2.5">
          {/* AWS Connected Cluster */}
          <div>
            <span className="block text-[10px] font-mono text-indigo-600 font-semibold uppercase tracking-wider mb-1.5">
              ● AWS Cloud Cluster
            </span>
            <div className="flex flex-wrap gap-1.5">
              {domain.skills
                .filter((s) => s.isPrimary)
                .map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all ${
                      isHovered || isFocused
                        ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : 'bg-zinc-900 text-white'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>

          {/* Supporting Tools */}
          <div className="pt-1.5 border-t border-zinc-100">
            <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
              Supporting Toolchain
            </span>
            <div className="flex flex-wrap gap-1.5">
              {domain.skills
                .filter((s) => !s.isPrimary)
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/80 text-zinc-600"
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. SYSTEMS & SECURITY OS (Layered Depth Layout) */}
      {domain.id === 'systems-os' && (
        <div className="space-y-1.5 relative">
          <div className="flex flex-wrap gap-1.5">
            {domain.skills.map((skill) => {
              const isKali = skill.name === 'Kali Linux';
              return (
                <span
                  key={skill.name}
                  style={{
                    transform:
                      isHovered || isFocused
                        ? `translateZ(${20 - (skill.depth ?? 0) * 4}px)`
                        : 'none',
                  }}
                  className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all ${
                    isKali
                      ? 'bg-zinc-950 text-white font-bold shadow-xs border border-zinc-800'
                      : isHovered || isFocused
                      ? 'bg-zinc-100 border border-zinc-300 text-zinc-800'
                      : 'bg-zinc-50 border border-zinc-200/60 text-zinc-600'
                  }`}
                >
                  {isKali && <span className="text-indigo-400 mr-1.5">★</span>}
                  {skill.name}
                </span>
              );
            })}
          </div>
          <span className="block text-[10px] font-mono text-zinc-400 pt-1">
            Layered OS: Primary offensive Linux to dual-boot staging
          </span>
        </div>
      )}

      {/* 4. PROGRAMMING & MACHINE LEARNING (Split Display) */}
      {domain.id === 'programming-ml' && (
        <div className="space-y-2.5">
          {/* Programming */}
          <div>
            <span className="block text-[10px] font-mono text-zinc-500 font-semibold uppercase tracking-wider mb-1">
              Programming
            </span>
            <div className="flex flex-wrap gap-1.5">
              {domain.skills
                .filter((s) => s.group === 'Programming')
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/80 text-zinc-800 font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>

          {/* Machine Learning */}
          <div className="pt-1.5 border-t border-zinc-100">
            <span className="block text-[10px] font-mono text-indigo-600 font-semibold uppercase tracking-wider mb-1">
              Machine Learning
            </span>
            <div className="flex flex-wrap gap-1.5">
              {domain.skills
                .filter((s) => s.group === 'Machine Learning')
                .map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-md transition-all ${
                      isHovered || isFocused
                        ? 'bg-indigo-50 border border-indigo-300 text-indigo-900 font-semibold shadow-2xs'
                        : 'bg-indigo-50/60 border border-indigo-200/60 text-indigo-800'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Hint on hover */}
      <div className="mt-3 pt-2 border-t border-zinc-100/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span>{domain.skills.length} technical capabilities</span>
        <span className="group-hover:text-indigo-600 flex items-center gap-0.5">
          {isFocused ? 'Active View' : 'Click to Focus'}
          <ArrowUpRight className="w-2.5 h-2.5" />
        </span>
      </div>
    </motion.div>
  );
}

export default SkillCategory;

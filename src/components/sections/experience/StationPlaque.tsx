'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Cpu, Radio, Sparkles } from 'lucide-react';

export interface StationData {
  id: 'research' | 'ic3se' | 'gpi';
  number: string;
  name: string;
  badge: string;
  statusBadge: string;
  role: string;
  subtitle: string;
  date: string;
  advisors?: string;
  stat?: {
    value: string;
    label: string;
  };
  highlights: Array<{
    title: string;
    tags: string[];
  }>;
  actionText?: string;
  actionHref?: string;
}

export const STATIONS: StationData[] = [
  {
    id: 'research',
    number: '01',
    name: 'RESEARCH LEAD',
    badge: 'RESEARCH STOP',
    statusBadge: 'BENNETT UNIVERSITY',
    role: 'Research Lead — AI & Defense',
    subtitle: 'Bennett University',
    advisors: 'Advisors: Wg Cdr (Dr.) Ajay Kumar · Dr. Pradeep Kumar Arya',
    date: 'JUL 2024 — JAN 2026',
    stat: {
      value: '97.1%',
      label: 'DETECTION ACCURACY',
    },
    highlights: [
      {
        title: 'NIDS · DEEP LEARNING',
        tags: ['TensorFlow', 'Keras', 'Transformer', 'BiLSTM', 'CNN'],
      },
      {
        title: 'AGESIFY · CLOUD FIREWALL',
        tags: ['AWS WAF', 'GuardDuty', 'CloudWatch', 'AWS Lambda'],
      },
    ],
    actionText: 'EXPLORE RESEARCH →',
    actionHref: '#research',
  },
  {
    id: 'ic3se',
    number: '02',
    name: 'IC3SE 2025',
    badge: 'PUBLISHED PAPER',
    statusBadge: 'CONFERENCE PUBLICATION',
    role: 'Presented & Published Paper',
    subtitle: 'Amity University International Conference',
    date: 'IC3SE 2025',
    highlights: [
      {
        title: 'ADAPTIVE CLOUD DEFENSE',
        tags: ['NIDS', 'Deep Learning', 'Edge WAF', 'Mitigation'],
      },
    ],
    actionText: 'EXPLORE RESEARCH →',
    actionHref: '#research',
  },
  {
    id: 'gpi',
    number: '03',
    name: 'GPI INDUSTRIES',
    badge: 'PRODUCTION STOP',
    statusBadge: 'ACTIVE CONTRACT',
    role: 'Freelance Software Developer',
    subtitle: 'GPI Industries Pvt Ltd · Desktop & Web',
    date: 'MAY 2026 — PRESENT',
    highlights: [
      {
        title: 'OFFLINE POS / ERP',
        tags: ['Electron', 'React', 'TypeScript', 'PostgreSQL', 'SQLite'],
      },
      {
        title: 'E-COMMERCE',
        tags: ['React', 'Node.js', 'JWT', 'SSR / SEO', 'REST API'],
      },
    ],
    actionText: 'EXPLORE STOP →',
    actionHref: '#gpi',
  },
];

interface StationPlaqueProps {
  station: StationData;
  isActive: boolean;
  onHover?: (isHovered: boolean) => void;
  onSelect?: () => void;
  className?: string;
}

export function StationPlaque({
  station,
  isActive,
  onHover,
  onSelect,
  className = '',
}: StationPlaqueProps) {
  const isResearch = station.id === 'research';
  const isPaper = station.id === 'ic3se';
  const isGPI = station.id === 'gpi';

  return (
    <motion.div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      onClick={onSelect}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`relative rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border transition-all duration-300 p-4 sm:p-5 select-none cursor-pointer flex flex-col justify-between ${
        isActive
          ? isResearch
            ? 'border-violet-500/60 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/30 opacity-100'
            : isPaper
            ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30 opacity-100'
            : 'border-sky-500/60 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/30 opacity-100'
          : 'border-neutral-200/80 dark:border-neutral-800 opacity-75 hover:opacity-100 hover:border-neutral-300 dark:hover:border-neutral-700'
      } ${className}`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                isActive
                  ? isResearch
                    ? 'bg-violet-500 animate-pulse'
                    : isPaper
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-sky-500 animate-pulse'
                  : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
            />
            <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-500 dark:text-neutral-400">
              {station.number} // {station.badge}
            </span>
          </div>

          <span className="font-mono text-[9.5px] text-neutral-400 dark:text-neutral-500 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 shrink-0">
            {station.date}
          </span>
        </div>

        {/* Role & Subtitle */}
        <div className="space-y-0.5 mb-3">
          <h3 className="font-display font-black text-lg sm:text-xl text-zinc-950 dark:text-white tracking-tight leading-tight">
            {station.role}
          </h3>
          <p className="font-sans text-xs text-neutral-600 dark:text-neutral-300 font-medium">
            {station.subtitle}
          </p>
          {station.advisors && (
            <p className="font-mono text-[9.5px] text-neutral-400 dark:text-neutral-500 truncate pt-0.5">
              {station.advisors}
            </p>
          )}
        </div>

        {/* 97.1% Stat Badge for Research */}
        {station.stat && (
          <div className="mb-3 px-3 py-1.5 rounded-lg bg-violet-500/[0.08] dark:bg-violet-500/[0.12] border border-violet-500/20 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-violet-700 dark:text-violet-300 tracking-wider">
              {station.stat.label}
            </span>
            <span className="font-display font-black text-base text-violet-600 dark:text-violet-400">
              {station.stat.value}
            </span>
          </div>
        )}

        {/* Micro Technical Tags */}
        <div className="space-y-2 mb-3">
          {station.highlights.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="font-mono text-[10px] font-bold text-neutral-700 dark:text-neutral-300 tracking-wider">
                {h.title}
              </div>
              <div className="flex flex-wrap gap-1">
                {h.tags.map((t, ti) => (
                  <span
                    key={ti}
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Animated Data Packet Flow for Research Station */}
        {isResearch && (
          <div className="mb-3 px-2 py-1.5 rounded-md bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[9px] font-mono">
            <span className="font-bold text-neutral-700 dark:text-neutral-300">NIDS</span>
            <span className="text-violet-400">→</span>
            <span className="font-bold text-neutral-700 dark:text-neutral-300">AI DETECT</span>
            <span className="text-violet-400">→</span>
            <span className="font-bold text-neutral-700 dark:text-neutral-300">AWS WAF</span>
            <span className="text-emerald-500">→</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">DEFENSE</span>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 font-mono text-[9.5px] text-emerald-600 dark:text-emerald-400 font-medium">
          <span className="w-1.2 h-1.2 rounded-full bg-emerald-500" />
          {station.statusBadge}
        </span>

        {station.actionHref ? (
          <a
            href={station.actionHref}
            onClick={(e) => {
              if (station.actionHref?.startsWith('#')) {
                e.stopPropagation();
              }
            }}
            className="group/btn inline-flex items-center gap-1 font-mono text-[11px] font-bold text-zinc-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <span>{station.actionText}</span>
            <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span className="font-mono text-[11px] font-bold text-neutral-400">
            {station.actionText}
          </span>
        )}
      </div>
    </motion.div>
  );
}

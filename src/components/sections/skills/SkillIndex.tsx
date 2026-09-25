'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DOMAINS } from '@/data/skillsData';

export function SkillIndex() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="w-full max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 border border-zinc-200/90 shadow-lg shadow-zinc-900/5 backdrop-blur-md space-y-6"
    >
      {/* Top Scannable Recruiter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80">
        <div>
          <span className="text-[11px] font-mono font-bold text-indigo-600 tracking-wider uppercase">
            RECRUITER & TECHNICAL INDEX MODE
          </span>
          <h4 className="text-xl sm:text-2xl font-display font-bold text-zinc-950">
            Complete Technical Matrix
          </h4>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          Fast-Scan Layout
        </span>
      </div>

      {/* 4 Categorized Rows */}
      <div className="divide-y divide-zinc-200/80 space-y-4">
        {SKILLS_DOMAINS.map((domain) => (
          <div key={domain.id} className="pt-4 first:pt-0 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-zinc-400">
                {domain.number}
              </span>
              <h5 className="font-display font-bold text-sm text-zinc-950 tracking-tight uppercase">
                {domain.title}
              </h5>
            </div>

            <p className="text-sm font-mono text-zinc-700 leading-relaxed pl-7">
              {domain.skills.map((s, idx) => (
                <span key={s.name}>
                  <span className="font-medium text-zinc-900">{s.name}</span>
                  {idx < domain.skills.length - 1 && (
                    <span className="mx-2 text-indigo-400 font-bold">·</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillIndex;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CinematicTrain } from './CinematicTrain';

interface RailwayTrackProps {
  progress: number; // 0 to 1
  activeStationIndex: number;
  hoveredStationIndex: number | null;
  onSelectStation: (index: number) => void;
  className?: string;
}

export function RailwayTrack({
  progress,
  activeStationIndex,
  hoveredStationIndex,
  onSelectStation,
  className = '',
}: RailwayTrackProps) {
  // Station anchor points on 1000px coordinate system (aligned with 5-3-4 grid columns)
  const STATIONS_X = [210, 540, 835];

  // Train position clamped within track margins
  // 0% -> 150, 100% -> 890
  const trainX = 150 + progress * (890 - 150);

  // Generate sleepers (ties) every 20px from 40 to 980
  const sleepers = [];
  for (let x = 40; x <= 980; x += 20) {
    sleepers.push(x);
  }

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* SVG Railway Track System */}
      <svg
        viewBox="0 0 1000 130"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Signal Glow Gradients */}
          <radialGradient id="signalGlowSky" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="signalGlowViolet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="signalGlowEmerald" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>

          {/* Track Rail Gradient */}
          <linearGradient id="railGrad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="8%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="92%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* 1. RAILWAY SLEEPERS / TIES */}
        {/* ======================================================== */}
        <g className="text-neutral-200 dark:text-neutral-800">
          {sleepers.map((x) => (
            <line
              key={x}
              x1={x}
              y1={72}
              x2={x}
              y2={98}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* ======================================================== */}
        {/* 2. DUAL STEEL RAILS */}
        {/* ======================================================== */}
        {/* Top Rail */}
        <line
          x1={20}
          y1={76}
          x2={980}
          y2={76}
          stroke="url(#railGrad)"
          strokeWidth="2.2"
          className="text-neutral-400 dark:text-neutral-600"
        />

        {/* Bottom Rail */}
        <line
          x1={20}
          y1={94}
          x2={980}
          y2={94}
          stroke="url(#railGrad)"
          strokeWidth="2.2"
          className="text-neutral-400 dark:text-neutral-600"
        />

        {/* Central Monorail Guide / Signal Pulse Wire */}
        <line
          x1={40}
          y1={85}
          x2={960}
          y2={85}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="text-sky-500/40 dark:text-sky-400/30"
        />

        {/* ======================================================== */}
        {/* 3. JUNCTION SWITCH / SIDING (BETWEEN STN 1 & 2) */}
        {/* ======================================================== */}
        <g className="text-neutral-300 dark:text-neutral-700">
          <path
            d="M 290 76 C 330 76 345 56 385 56 L 435 56 C 475 56 490 76 525 76"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          {/* Junction telemetry label */}
          <text
            x="410"
            y="50"
            textAnchor="middle"
            fill="currentColor"
            fontSize="7"
            fontFamily="monospace"
            className="text-neutral-400 dark:text-neutral-500 fill-neutral-400 dark:fill-neutral-500"
          >
            SYS.JCT // KM 02.4
          </text>
        </g>

        {/* ======================================================== */}
        {/* 4. STATION MASTS & ARCHITECTURAL SIGNBOARDS */}
        {/* ======================================================== */}
        {[
          { idx: 0, x: STATIONS_X[0], name: '01 // RESEARCH LEAD', role: 'AI & DEFENSE · 97.1%', color: '#818cf8' },
          { idx: 1, x: STATIONS_X[1], name: '02 // PRESENTED PAPER', role: 'IC3SE 2025 · PUBLISHED', color: '#34d399' },
          { idx: 2, x: STATIONS_X[2], name: '03 // FREELANCE DEV', role: 'GPI INDUSTRIES · FULL-STACK', color: '#38bdf8' },
        ].map((stn) => {
          const isAct = activeStationIndex === stn.idx;
          const isHov = hoveredStationIndex === stn.idx;

          return (
            <g
              key={stn.idx}
              className="cursor-pointer transition-all duration-200"
              onClick={() => onSelectStation(stn.idx)}
            >
              {/* Vertical Station Mast Post */}
              <line
                x1={stn.x}
                y1={85}
                x2={stn.x}
                y2={24}
                stroke={isAct ? stn.color : 'currentColor'}
                strokeWidth={isAct ? '2' : '1.2'}
                className="text-neutral-300 dark:text-neutral-700 transition-colors"
              />

              {/* Station Node On Rail (Concentric circles) */}
              <circle
                cx={stn.x}
                cy={85}
                r={isAct ? '6' : '4.5'}
                fill="white"
                className="dark:fill-zinc-900 transition-all"
                stroke={isAct ? stn.color : '#71717a'}
                strokeWidth={isAct ? '2.5' : '1.5'}
              />
              <circle
                cx={stn.x}
                cy={85}
                r={isAct ? '3' : '2'}
                fill={isAct ? stn.color : '#a1a1aa'}
              />

              {/* Signboard Post Arm */}
              <rect
                x={stn.x - 72}
                y={8}
                width={144}
                height={26}
                rx={6}
                fill="white"
                className="dark:fill-zinc-900 shadow-sm transition-all"
                stroke={isAct || isHov ? stn.color : 'currentColor'}
                strokeWidth={isAct ? '1.5' : '1'}
                strokeOpacity={isAct ? 1 : 0.4}
              />

              {/* Signboard Top Bar */}
              <line
                x1={stn.x - 68}
                y1={12}
                x2={stn.x + 68}
                y2={12}
                stroke={stn.color}
                strokeWidth={isAct ? '2' : '1.2'}
                strokeOpacity={isAct ? 0.9 : 0.4}
              />

              {/* Station Name */}
              <text
                x={stn.x}
                y={22}
                textAnchor="middle"
                fill="currentColor"
                fontSize="7.5"
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                letterSpacing="0.06em"
                className="text-zinc-900 dark:text-white fill-zinc-900 dark:fill-white"
              >
                {stn.name}
              </text>

              {/* Station Role Tagline */}
              <text
                x={stn.x}
                y={30}
                textAnchor="middle"
                fill="currentColor"
                fontSize="6"
                fontFamily="monospace"
                className="text-neutral-400 dark:text-neutral-500 fill-neutral-400 dark:fill-neutral-500"
              >
                {stn.role}
              </text>

              {/* Active Beacon LED */}
              {isAct && (
                <circle
                  cx={stn.x + 62}
                  cy={15}
                  r="2"
                  fill={stn.color}
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}

        {/* ======================================================== */}
        {/* 5. DYNAMIC TRAIN ON TRACK (SVG POSITIONED) */}
        {/* ======================================================== */}
        <g
          transform={`translate(${trainX - 41}, 69)`}
          className="transition-transform duration-100 ease-out"
        >
          <foreignObject width="140" height="34" x="0" y="0">
            <CinematicTrain
              orientation="horizontal"
              isHovered={hoveredStationIndex !== null}
            />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

'use client';

import React from 'react';
import { ProjectsIntro } from './projects/ProjectsIntro';
import { CinematicProjectsDeck } from './projects/CinematicProjectsDeck';

export function ProjectsSection() {
  return (
    <div id="selected-projects" className="relative w-full z-10 bg-[#FAFAF8] text-zinc-900">
      {/* 1. Viewport Intro: BUILDING DIGITAL SYSTEMS */}
      <ProjectsIntro />

      {/* 2. Cinematic 3D Sticky Stacking Deck */}
      <div id="projects-deck">
        <CinematicProjectsDeck />
      </div>
    </div>
  );
}

export default ProjectsSection;

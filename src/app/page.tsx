'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ResearchSpotlightSection } from '@/components/sections/ResearchSpotlightSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ScrollProgress, ScrollIndicator } from '@/components/dom/ScrollProgress';
import { SectionTransition } from '@/components/dom/SectionTransition';

export default function Home() {
  return (
    <div className="relative z-10 w-full">
      <ScrollProgress />
      <ScrollIndicator />
      
      <HeroSection />
      
      <SectionTransition intensity="subtle">
        <AboutSection />
      </SectionTransition>
      
      {/* ExperienceSection contains sticky railway stage — unnested for hardware compositor acceleration */}
      <ExperienceSection />
      
      <ResearchSpotlightSection />
      
      {/* ProjectsSection contains sticky 3D deck — unnested for hardware compositor acceleration */}
      <div id="selected-projects">
        <ProjectsSection />
      </div>
      
      <SectionTransition intensity="subtle">
        <SkillsSection />
      </SectionTransition>
      
      <SectionTransition intensity="subtle">
        <CertificationsSection />
      </SectionTransition>
      
      <SectionTransition intensity="medium">
        <ContactSection />
      </SectionTransition>
    </div>
  );
}

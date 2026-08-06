import React from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import PillTechStack from './PillTechStack';

export default function StackSection() {
  return (
    <div className="section-stack" style={{ position: 'relative', zIndex: 10 }}>
      {/* 1. Scroll-Driven 3-Column Experience Timeline */}
      <ExperienceTimeline />

      {/* 2. Front-End / Back-End Pill Tech Stack directly below timeline */}
      <PillTechStack />
    </div>
  );
}

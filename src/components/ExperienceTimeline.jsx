import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, Calendar, Briefcase, Award, Rocket, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXPERIENCE_ITEMS = [
  {
    id: 1,
    title: 'Senior Full-Stack & AI Systems Lead',
    date: '2024 - PRESENT',
    clientTag: 'Independent / AI Solutions',
    icon: Rocket,
    color: '#38bdf8',
    review: 'Architected scalable AI-driven web applications, high-performance RAG pipelines, and interactive user interfaces with precision, speed, and maintainable code.',
    responsibilities: [
      'Engineered end-to-end RAG pipelines and custom LLM agentic workflows using Supabase pgvector & OpenAI API.',
      'Architected responsive React 19 web applications with GSAP interactive scroll animations, improving user engagement by 40%.',
      'Optimized token context management and database query indexing, reducing prompt response latency by 35%.'
    ]
  },
  {
    id: 2,
    title: 'Full-Stack Web Developer',
    date: '2023 - 2024',
    clientTag: 'Najib Mohammed Tech Solutions',
    icon: Briefcase,
    color: '#818cf8',
    review: 'Reliable, thorough, and highly efficient. Built robust REST APIs, custom React dashboards, and Supabase database integrations with rock-solid security.',
    responsibilities: [
      'Developed modern dashboard applications using React, TypeScript, and Tailwind CSS with 99.9% uptime.',
      'Configured Supabase Row Level Security (RLS) policies and authentication flows for multi-tenant data safety.',
      'Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect, accessible web interfaces.'
    ]
  },
  {
    id: 3,
    title: 'Process Optimization & Data Analyst',
    date: '2022 - 2023',
    clientTag: 'Financial & Business Analytics',
    icon: Award,
    color: '#c084fc',
    review: 'Brought analytical financial rigor and structured problem-solving to process optimization, delivering 60% time savings on automated reporting scripts.',
    responsibilities: [
      'Automated financial data processing scripts, reducing weekly manual report preparation time by 60%.',
      'Designed interactive executive reporting dashboards with custom data visualization charts.',
      'Applied structured financial modeling techniques to streamline cross-departmental operations and resource allocation.'
    ]
  }
];

export default function ExperienceTimeline() {
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);
  const itemRefs = useRef([]);

  useGSAP(() => {
    const section = sectionRef.current;
    const timelineLine = timelineLineRef.current;
    if (!section) return;

    // 1. Center vertical progress line animation tied strictly to scroll
    if (timelineLine) {
      gsap.set(timelineLine, { scaleY: 0, transformOrigin: 'top center' });
      gsap.to(timelineLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 85%',
          scrub: 0.5,
        },
      });
    }

    // 2. Sequential reveal for each experience item row (One at a time)
    const rows = itemRefs.current.filter(Boolean);
    rows.forEach((row) => {
      const leftSide = row.querySelector('.exp-transparent-left');
      const centerNode = row.querySelector('.exp-transparent-node');
      const rightSide = row.querySelector('.exp-transparent-right');

      // Initial hidden states using autoAlpha
      gsap.set([leftSide, rightSide], { autoAlpha: 0, y: 40 });
      gsap.set(centerNode, { scale: 0, autoAlpha: 0 });

      // ScrollTrigger sequence timeline per experience item
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 0.8,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.to(centerNode, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(1.7)' })
        .to(leftSide, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2')
        .to(rightSide, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.4');
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="experience" className="experience-timeline-section">
      {/* Title Header */}
      <div className="experience-title-header">
        <div className="title-sub-pill">
          <span className="emoji-icon">💼</span>
          <span className="sub-text">MY CAREER OVERVIEW</span>
        </div>
        <h2 className="experience-main-title">
          Professional Work <span className="highlight-gradient">Experience</span>
        </h2>
      </div>

      {/* 3-Column Timeline Layout (Transparent - No Cards) */}
      <div className="experience-timeline-wrapper">
        {/* Center Line Track */}
        <div className="timeline-center-track">
          <div className="timeline-track-bg" />
          <div ref={timelineLineRef} className="timeline-fill-line" />
        </div>

        {/* Sequential Experience Items */}
        <div className="experience-items-list">
          {EXPERIENCE_ITEMS.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className="experience-item-row transparent-item"
              >
                {/* Left Side: Client Review & Rating (No Card Wrapper) */}
                <div className="experience-left-col exp-transparent-left">
                  <div className="exp-review-block">
                    {/* Star Rating */}
                    <div className="stars-row">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <blockquote className="exp-review-text">
                      "{item.review}"
                    </blockquote>

                    {/* Client Tag */}
                    <div className="exp-client-tag" style={{ color: item.color }}>
                      <div className="tag-icon-ring" style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}15` }}>
                        <IconComponent size={14} color={item.color} />
                      </div>
                      <span className="tag-name">{item.clientTag}</span>
                    </div>
                  </div>
                </div>

                {/* Center Node Indicator */}
                <div className="experience-center-node exp-transparent-node">
                  <div className="node-outer-ring" style={{ borderColor: item.color }}>
                    <div className="node-inner-dot" style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}` }} />
                  </div>
                </div>

                {/* Right Side: Job Title & Responsibilities (No Card Wrapper) */}
                <div className="experience-right-col exp-transparent-right">
                  <div className="exp-details-block">
                    {/* Job Header */}
                    <div className="exp-job-meta">
                      <h3 className="exp-job-title">{item.title}</h3>
                      <div className="exp-date-badge">
                        <Calendar size={13} className="mr-1.5 inline" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Responsibilities Subtitle */}
                    <div className="exp-responsibilities-tag">
                      <em>Responsibilities</em>
                    </div>

                    {/* Bullet Points */}
                    <ul className="exp-bullet-list">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="exp-bullet-item">
                          <CheckCircle2 size={15} style={{ color: item.color, flexShrink: 0, marginTop: '3px' }} />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


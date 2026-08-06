import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SVG3D } from '3dsvg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRONTEND_SKILLS = [
  {
    name: 'React',
    percent: 88,
    liq: '#00d8ff',
    liqDark: '#0088b3',
    color: '#00d8ff',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="12" fill="#00d8ff"/><g stroke="#00d8ff" stroke-width="4.5" fill="none"><ellipse cx="50" cy="50" rx="42" ry="16"/><ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/></g></svg>`,
  },
  {
    name: 'TypeScript',
    percent: 85,
    liq: '#3178c6',
    liqDark: '#1e4b85',
    color: '#3178c6',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#3178c6" x="5" y="5" width="90" height="90" rx="14"/><path fill="#ffffff" d="M 60 76 v 8 c 2 1 4 1.5 6 1.8 2 0.4 4.5 0.6 7 0.6 2.5 0 4.8 -0.3 6.8 -0.8 2 -0.5 3.8 -1.3 5.3 -2.3 1.5 -1 2.6 -2.4 3.4 -4.1 0.8 -1.7 1.2 -3.7 1.2 -6 0 -1.8 -0.3 -3.3 -0.8 -4.6 -0.5 -1.3 -1.3 -2.5 -2.3 -3.5 -1 -1 -2.3 -2 -3.7 -2.8 -1.4 -0.8 -3 -1.6 -4.8 -2.3 -1.3 -0.5 -2.5 -1 -3.4 -1.6 -1 -0.5 -1.8 -1.1 -2.5 -1.7 -0.7 -0.6 -1.2 -1.2 -1.5 -1.8 -0.3 -0.6 -0.5 -1.3 -0.5 -2.1 0 -0.7 0.2 -1.3 0.5 -1.8 0.4 -0.5 0.9 -1 1.5 -1.4 0.6 -0.4 1.4 -0.7 2.4 -0.9 1 -0.2 2 -0.3 3.2 -0.3 0.9 0 1.8 0.1 2.7 0.2 0.9 0.1 1.9 0.3 2.8 0.6 0.9 0.3 1.9 0.7 2.7 1.1 0.8 0.4 1.7 0.9 2.4 1.4 v -9 c -1.7 -0.7 -3.4 -1.2 -5 -1.5 -1.6 -0.3 -3.6 -0.5 -5.8 -0.5 -2.4 0 -4.6 0.3 -6.6 0.8 -2 0.5 -3.8 1.3 -5.3 2.3 -1.5 1 -2.6 2.4 -3.4 4 -0.8 1.6 -1.2 3.5 -1.2 5.8 0 2.8 0.8 5.3 2.5 7.4 1.7 2.1 4.2 3.8 7.6 5.2 1.3 0.6 2.6 1.1 3.7 1.6 1.1 0.5 2.1 1 3 1.6 0.9 0.6 1.6 1.3 2.1 2 0.5 0.7 0.8 1.5 0.8 2.4 0 0.7 -0.2 1.3 -0.5 1.8 -0.4 0.5 -0.9 1 -1.5 1.4 -0.6 0.4 -1.4 0.7 -2.4 0.9 -1 0.2 -2.1 0.3 -3.3 0.3 -2.2 0 -4.3 -0.4 -6.3 -1.1 -2 -0.7 -3.9 -1.8 -5.6 -3.2 Z M 44 52 h 12 v -8 H 22 v 8 h 11 v 35 h 11 z"/></svg>`,
  },
  {
    name: 'Tailwind',
    percent: 90,
    liq: '#38bdf8',
    liqDark: '#0284c7',
    color: '#38bdf8',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#38bdf8" d="M25 40 c3.3 -13.3 11.7 -20 25 -20 c20 0 22.5 15 32.5 17.5 c6.7 1.7 12.5 -0.8 17.5 -7.5 C96.7 43.3 88.3 50 75 50 c-20 0 -22.5 -15 -32.5 -17.5 c-6.7 -1.7 -12.5 0.8 -17.5 7.5 z M0 70 c3.3 -13.3 11.7 -20 25 -20 c20 0 22.5 15 32.5 17.5 c6.7 1.7 12.5 -0.8 17.5 -7.5 C71.7 73.3 63.3 80 50 80 c-20 0 -22.5 -15 -32.5 -17.5 c-6.7 -1.7 -12.5 0.8 -17.5 7.5 z"/></svg>`,
  },
  {
    name: 'Next.js',
    percent: 82,
    liq: '#a855f7',
    liqDark: '#6b21a8',
    color: '#a855f7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#0d0d0d"/><path fill="#ffffff" d="M72 75 L38 28 H28 v44 h8 V37 l31 43 z"/><path fill="#ffffff" d="M60 28 h8 v44 h-8 z"/></svg>`,
  },
];

const BACKEND_SKILLS = [
  {
    name: 'Node.js',
    percent: 80,
    liq: '#8cc84b',
    liqDark: '#4e7e25',
    color: '#8cc84b',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#8cc84b" d="M46 3.5 c2.4 -1.3 5.6 -1.3 8 0 L90 24 c2.3 1.3 3.8 3.8 3.8 6.5 v40 c0 2.7 -1.5 5.2 -3.8 6.5 L54 96.5 c-2.4 1.3 -5.6 1.3 -8 0 L10 77 c-2.3 -1.3 -3.8 -3.8 -3.8 -6.5 v-40 c0 -2.7 1.5 -5.2 3.8 -6.5 z"/></svg>`,
  },
  {
    name: 'Supabase',
    percent: 79,
    liq: '#3ecf8e',
    liqDark: '#1c754d',
    color: '#3ecf8e',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M 58 98 c -2.5 3.2 -7.7 1.4 -7.8 -2.6 L 49.5 35.5 h 40 c 7.3 0 11.3 8.4 6.8 14.1 z" fill="#249361"/><path d="M 42 2 c 2.5 -3.2 7.7 -1.4 7.8 2.6 L 50.5 64.5 h -40 c -7.3 0 -11.3 -8.4 -6.8 -14.1 z" fill="#3ecf8e"/></svg>`,
  },
  {
    name: 'PostgreSQL',
    percent: 75,
    liq: '#336791',
    liqDark: '#1a3c57',
    color: '#336791',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#336791" d="M92 61 c-11.3 2.3 -12.1 -1.5 -12.1 -1.5 11.9 -17.7 16.9 -40.1 12.6 -45.6 -11.7 -15 -32 -7.9 -32.4 -7.7 a 40 40 0 0 0 -7.5 -0.8 c -5.1 -0.1 -9 1.3 -11.9 3.6 0 0 -36.2 -14.9 -34.5 18.8 0.4 7.2 10.3 54.3 22.1 40 0 0 4.2 -4.4 4.2 -4.4 2.1 1.4 4.6 2.1 7.2 1.8 0 0 0.2 -0.2 0.2 2 -3 3.4 -2.1 4 -8.2 5.3 -6.2 1.3 -2.5 3.5 -0.2 4.1 2.9 0.7 9.5 1.7 14 -4.5 0 0 -0.2 0.7 1.9 11 c 1.2 5.8 2 8.2 2.9 10.6 1.9 4.9 1.9 8.3 9.9 6.6 6.7 -1.4 10.1 -5.2 10.6 -11.4 0.3 -4.4 1.1 -3.8 1.2 -7.7 0.7 -6 0.1 -7.9 4.2 -7 3 0.1 7 -0.5 9.3 -1.6 5 -2.3 8 -6.2 3.1 -5.2 z"/></svg>`,
  },
];

function BentoLiquidSkillPill({ skill }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentVal, setCurrentVal] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const skillRef = useRef(null);
  const rafRef = useRef(null);

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateTo = (toVal, duration) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const fromVal = currentVal;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const nextVal = fromVal + (toVal - fromVal) * easeOutCubic(t);
      setCurrentVal(nextVal);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setCurrentVal(toVal);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    animateTo(skill.percent, 1200);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    animateTo(0, 500);
    setTilt({ rx: 0, ry: 0 });
  };

  const handleMouseMove = (e) => {
    if (!skillRef.current) return;
    const rect = skillRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 24,
      ry: x * 28,
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={skillRef}
      className={`bento-skill-pill ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        '--liq': skill.liq,
        '--liq-dark': skill.liqDark,
      }}
    >
      {/* 3D SVG Logo — Perfectly centered in resting state, tracks cursor */}
      <div
        className="bento-logo-wrapper"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${isHovered ? 18 : 0}px)`,
        }}
      >
        <div className="svg3d-container">
          <SVG3D
            svg={skill.svgString}
            smoothness={0.6}
            color={skill.color}
            animate={isHovered ? "spinFloat" : "float"}
            depth={1.4}
            zoom={6.5}
            width="110px"
            height="110px"
            interactive={true}
            cursorOrbit={true}
            orbitStrength={0.45}
            draggable={false}
            scrollZoom={false}
          />
        </div>
      </div>

      {/* Capsule Container — 0 opacity in resting state, comes into view ONLY on hover */}
      <div className={`bento-capsule ${isHovered ? 'visible' : ''}`}>
        {/* Liquid Fill Layer — comes into view ONLY on hover */}
        <div className="bento-liquid-container" style={{ height: `${currentVal}%`, opacity: isHovered ? 1 : 0 }}>
          <div className="bento-liquid-body">
            {/* Wave 1 (Front) */}
            <div className="bento-wave wave-front">
              <svg viewBox="0 0 220 28" preserveAspectRatio="none">
                <path fill="currentColor" d="M0 14 Q18 4 36 14 T72 14 T108 14 T144 14 T180 14 T216 14 V28 H0Z" />
                <path fill="currentColor" d="M0 14 Q18 4 36 14 T72 14 T108 14 T144 14 T180 14 T216 14 V28 H0Z" transform="translate(220)" />
              </svg>
            </div>
            {/* Wave 2 (Back / Depth) */}
            <div className="bento-wave wave-back">
              <svg viewBox="0 0 220 28" preserveAspectRatio="none">
                <path fill="currentColor" d="M0 14 Q22 2 44 14 T88 14 T132 14 T176 14 T220 14 V28 H0Z" />
                <path fill="currentColor" d="M0 14 Q22 2 44 14 T88 14 T132 14 T176 14 T220 14 V28 H0Z" transform="translate(220)" />
              </svg>
            </div>
            {/* Shimmer Light Bar */}
            <div className="bento-liquid-shimmer" />
            {/* Bubbles */}
            <div className="bento-bubbles">
              <span className="b-1" />
              <span className="b-2" />
              <span className="b-3" />
            </div>
          </div>
        </div>

        {/* Content Layer */}
        <div className="bento-capsule-content">
          {/* Top Skill Name (Reveals on Hover) */}
          <div className={`bento-skill-name ${isHovered ? 'visible' : ''}`}>
            {skill.name}
          </div>

          {/* Bottom Percentage Badge (Reveals on Hover) */}
          <div className={`bento-skill-percent ${isHovered ? 'visible' : ''}`}>
            {Math.round(currentVal)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PillTechStack() {
  const [activeTab, setActiveTab] = useState('frontend');
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const skills = gsap.utils.toArray('.bento-skill-pill');
    gsap.fromTo(
      skills,
      { autoAlpha: 0, y: 30, scale: 0.92 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef, dependencies: [activeTab] });

  return (
    <section ref={sectionRef} id="stack" className="bento-tech-stack-section">
      {/* Header */}
      <div className="bento-stack-header">
        <div className="about-line-head" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          <div className="item-name">
            <div className="hero-text">02 / STACK</div>
          </div>
        </div>

        <h2 className="bento-main-heading">
          TECH <span className="highlight-gradient">Stack</span>
        </h2>

        {/* Tab Buttons Design */}
        <div className="bento-tabs-wrapper">
          <div className="bento-tabs-container">
            <button
              className={`bento-tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
              onClick={() => setActiveTab('frontend')}
            >
              <span className="tab-dot" />
              Frontend
            </button>
            <button
              className={`bento-tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
              onClick={() => setActiveTab('backend')}
            >
              <span className="tab-dot" />
              Backend
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Pills Container */}
      <div className="bento-slider-wrapper">
        <div className={`bento-slider ${activeTab === 'backend' ? 'backend' : ''}`}>
          {/* FRONTEND PANEL */}
          <div className="bento-panel">
            <div className="bento-grid">
              {FRONTEND_SKILLS.map((skill) => (
                <BentoLiquidSkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          {/* BACKEND PANEL */}
          <div className="bento-panel">
            <div className="bento-grid">
              {BACKEND_SKILLS.map((skill) => (
                <BentoLiquidSkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



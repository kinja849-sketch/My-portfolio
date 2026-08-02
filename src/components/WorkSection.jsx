import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: 'FEADSHIP',
    category: 'B2B / Marketplace',
    tagline: 'An immersive digital experience bridging high-end engineering with cinematic storytelling. Engineered to transcend native limitations and deliver a seamless journey.',
    stack: ['JavaScript', 'WebGL', 'Three.js', 'GSAP'],
    video: 'https://res.cloudinary.com/df3m5glwo/video/upload/v1782724727/feadship_optimized_cfeclk.webm',
    mobileImage: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beb93af0165d490d94894_feadship.webp',
    link: 'https://feadship.webflow.io/'
  },
  {
    name: 'SPECTACULAR',
    category: 'Paramedical Platform',
    tagline: 'A typography-focused platform where architectural precision meets fluid, performance-driven motion.',
    stack: ['Figma to Webflow', 'GSAP', 'Client-first'],
    video: 'https://res.cloudinary.com/df3m5glwo/video/upload/v1781261282/studio_yumf1v.webm',
    mobileImage: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beb9dd61285375257c08b_studio.webp',
    link: 'https://spectaculars.webflow.io/'
  },
  {
    name: 'SOREN-ROSE',
    category: 'Portfolio Studio',
    tagline: 'A study in minimalist elegance. Crafted to transform static content into a fluid, high-performance scroll experience.',
    stack: ['GSAP', 'JavaScript', 'Three.js'],
    video: 'https://res.cloudinary.com/df3m5glwo/video/upload/v1781261274/rosestudio_fibvjw.webm',
    mobileImage: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beba279763ce104996b47_rose.webp',
    link: 'https://soren-rosestudio.webflow.io/'
  },
  {
    name: 'PHOTONIX',
    category: 'Automation Hub',
    tagline: 'Seamless industrial storytelling through frame-perfect canvas rendering. Bridging high-performance data with adaptive, interactive visuals.',
    stack: ['Three.js', 'GitHub', 'GSAP', 'API'],
    video: 'https://res.cloudinary.com/df3m5glwo/video/upload/v1781261272/pxonix_srtiaq.webm',
    mobileImage: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beb98b7d387841011fd2a_pxonix.webp',
    link: 'https://photoni-x.webflow.io/'
  },
  {
    name: 'NEURA-AI',
    category: '3D Animation',
    tagline: 'An immersive gateway into the future of intelligence. Where complex 3D transformations meet intuitive, high-speed agency interactions.',
    stack: ['3D Spline', 'GSAP', 'JavaScript'],
    video: 'https://res.cloudinary.com/df3m5glwo/video/upload/v1781264863/ne_h6aifs.webm',
    mobileImage: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beba7351254574b0b38bd_neuralistica.webp',
    link: 'https://neuralistica.webflow.io/'
  }
];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const introCardRef = useRef(null);
  const hudPctRef = useRef(null);
  const hudFillRef = useRef(null);
  const hudSceneRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cubeEl = cubeRef.current;
    if (!sectionEl || !cubeEl) return;

    const isMobile = window.innerWidth < 768;
    const SCENE_COUNT = PROJECTS.length + 1;
    const STOPS = [
      { rx: 90, ry: 0 },
      { rx: 0, ry: 0 },
      { rx: 0, ry: -90 },
      { rx: 0, ry: -180 },
      { rx: 0, ry: -270 },
      { rx: 0, ry: -360 }
    ];

    function getCubeTransform(progress) {
      const t = progress * (SCENE_COUNT - 1);
      const i = Math.min(Math.floor(t), SCENE_COUNT - 2);
      const f = (t - i) < 0.5 ? 2 * (t - i) * (t - i) : -1 + (4 - 2 * (t - i)) * (t - i);
      return {
        rx: STOPS[i].rx + (STOPS[i + 1].rx - STOPS[i].rx) * f,
        ry: STOPS[i].ry + (STOPS[i + 1].ry - STOPS[i].ry) * f
      };
    }

    function updateCardContent(cardEl, project) {
      if (!cardEl || !project) return;
      const cat = cardEl.querySelector('.card-category');
      const name = cardEl.querySelector('.card-name');
      const tag = cardEl.querySelector('.card-tagline');
      const stack = cardEl.querySelector('.card-stack');
      const btn = cardEl.querySelector('.card-btn');

      if (cat) cat.textContent = project.category;
      if (name) name.textContent = project.name;
      if (tag) tag.textContent = project.tagline;
      if (stack) {
        stack.innerHTML = '';
        project.stack.forEach(tech => {
          const span = document.createElement('span');
          span.textContent = tech;
          stack.appendChild(span);
        });
      }
      if (btn) btn.href = project.link;
    }

    let lastSceneIndex = -1;

    // Use the NATIVE 600vh height from webflow.css + sticky-viewport for pinning.
    // ScrollTrigger only tracks progress — NO pin, NO pinSpacing (avoids blank gaps).
    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        const { rx, ry } = getCubeTransform(p);
        cubeEl.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

        const pct = Math.round(p * 100);
        if (hudPctRef.current) hudPctRef.current.textContent = `${String(pct).padStart(3, '0')}%`;
        if (hudFillRef.current) hudFillRef.current.style.width = `${pct}%`;

        const currentScene = Math.min(SCENE_COUNT - 1, Math.floor(p * SCENE_COUNT));

        if (currentScene !== lastSceneIndex) {
          lastSceneIndex = currentScene;

          if (currentScene === 0) {
            if (hudSceneRef.current) hudSceneRef.current.textContent = 'OVERVIEW';
            if (introCardRef.current) introCardRef.current.style.opacity = '1';
            if (leftCardRef.current) {
              leftCardRef.current.style.opacity = '0';
              leftCardRef.current.style.pointerEvents = 'none';
              leftCardRef.current.style.transform = isMobile ? 'translateX(-50%) translateY(15px)' : 'translateY(-50%) translateX(-20px)';
            }
            if (rightCardRef.current) {
              rightCardRef.current.style.opacity = '0';
              rightCardRef.current.style.pointerEvents = 'none';
              rightCardRef.current.style.transform = isMobile ? 'translateX(-50%) translateY(15px)' : 'translateY(-50%) translateX(20px)';
            }
          } else {
            if (introCardRef.current) introCardRef.current.style.opacity = '0';
            const project = PROJECTS[currentScene - 1];
            if (project) {
              if (hudSceneRef.current) hudSceneRef.current.textContent = project.category;
              if (isMobile) {
                const targetCard = currentScene % 2 !== 0 ? leftCardRef.current : rightCardRef.current;
                const hiddenCard = currentScene % 2 !== 0 ? rightCardRef.current : leftCardRef.current;
                updateCardContent(targetCard, project);
                if (targetCard) {
                  targetCard.style.opacity = '1';
                  targetCard.style.pointerEvents = 'auto';
                  targetCard.style.transform = 'translateX(-50%) translateY(0px)';
                }
                if (hiddenCard) {
                  hiddenCard.style.opacity = '0';
                  hiddenCard.style.pointerEvents = 'none';
                  hiddenCard.style.transform = 'translateX(-50%) translateY(15px)';
                }
              } else {
                if (currentScene % 2 !== 0) {
                  updateCardContent(leftCardRef.current, project);
                  if (leftCardRef.current) {
                    leftCardRef.current.style.opacity = '1';
                    leftCardRef.current.style.pointerEvents = 'auto';
                    leftCardRef.current.style.transform = 'translateY(-50%) translateX(0px)';
                  }
                  if (rightCardRef.current) {
                    rightCardRef.current.style.opacity = '0';
                    rightCardRef.current.style.pointerEvents = 'none';
                    rightCardRef.current.style.transform = 'translateY(-50%) translateX(20px)';
                  }
                } else {
                  updateCardContent(rightCardRef.current, project);
                  if (rightCardRef.current) {
                    rightCardRef.current.style.opacity = '1';
                    rightCardRef.current.style.pointerEvents = 'auto';
                    rightCardRef.current.style.transform = 'translateY(-50%) translateX(0px)';
                  }
                  if (leftCardRef.current) {
                    leftCardRef.current.style.opacity = '0';
                    leftCardRef.current.style.pointerEvents = 'none';
                    leftCardRef.current.style.transform = 'translateY(-50%) translateX(-20px)';
                  }
                }
              }
            }
          }
        }
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="work-section">
      <div className="sticky-viewport">
        <div className="cube-container">
          <div className="container-work" style={{ position: 'absolute', top: '2rem', left: '2rem', right: '2rem', zIndex: 12 }}>
            <div className="about-line-head">
              <div className="item-name">
                <div className="hero-text" style={{ color: '#fff' }}>03 / WORK</div>
              </div>
              <div className="line-about" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
            </div>
            <div className="heading-work-wrap">
              <h3 className="head-servisec" style={{ color: '#fff' }}>
                SELECTED <em className="italic-text-3">Work</em>
              </h3>
            </div>
          </div>

          {/* Left Card Details */}
          <div
            ref={leftCardRef}
            id="card-left"
            className="project-card-wb"
            style={{
              position: 'absolute',
              left: '7vw',
              top: '50%',
              transform: 'translateY(-50%) translateX(-20px)',
              width: '21rem',
              maxWidth: '28%',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              zIndex: 20
            }}
          >
            <div style={{ padding: '1.75rem 1.5rem', background: 'rgba(12,12,12,0.92)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.5)', marginBottom: '1.1rem' }}></div>
              <p className="card-category" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.75rem' }}>
                {PROJECTS[0].category}
              </p>
              <h3 className="card-name" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.92)', marginBottom: '0.9rem', lineHeight: '0.9' }}>
                {PROJECTS[0].name}
              </h3>
              <p className="card-tagline" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.73rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.32)', marginBottom: '1rem' }}>
                {PROJECTS[0].tagline}
              </p>
              <div className="card-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
                {PROJECTS[0].stack.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
              <a href={PROJECTS[0].link} target="_blank" rel="noreferrer" className="card-btn">
                View Project
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px', verticalAlign: 'middle', display: 'inline-block' }}>
                  <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Card Details */}
          <div
            ref={rightCardRef}
            id="card-right"
            className="project-card-wb"
            style={{
              position: 'absolute',
              right: '7vw',
              top: '50%',
              transform: 'translateY(-50%) translateX(20px)',
              width: '21rem',
              maxWidth: '28%',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              zIndex: 20
            }}
          >
            <div style={{ padding: '1.75rem 1.5rem', background: 'rgba(12,12,12,0.92)', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'right' }}>
              <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.5)', marginBottom: '1.1rem', marginLeft: 'auto' }}></div>
              <p className="card-category" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.75rem' }}>
                {PROJECTS[1].category}
              </p>
              <h3 className="card-name" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.92)', marginBottom: '0.9rem', lineHeight: '0.9' }}>
                {PROJECTS[1].name}
              </h3>
              <p className="card-tagline" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.73rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.32)', marginBottom: '1rem' }}>
                {PROJECTS[1].tagline}
              </p>
              <div className="card-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem', justifyContent: 'flex-end' }}>
                {PROJECTS[1].stack.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
              <a href={PROJECTS[1].link} target="_blank" rel="noreferrer" className="card-btn">
                View Project
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px', verticalAlign: 'middle', display: 'inline-block' }}>
                  <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* 3D Prism Cube */}
          <div
            ref={cubeRef}
            id="prism-cube"
            style={{
              width: 'min(72vw, 550px)',
              height: 'calc(min(72vw, 550px) * 9 / 16)',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: 'rotateX(90deg) rotateY(0deg)',
              willChange: 'transform'
            }}
          >
            <div className="cube-face f-top" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% - min(72vw, 550px)/2)', width: '100%', height: 'min(72vw, 550px)', transform: 'rotateX(-90deg) translateZ(calc(calc(min(72vw, 550px) * 9 / 16) / 2))' }}>
              <video src={PROJECTS[0].video} autoPlay muted loop playsInline></video>
            </div>
            <div className="cube-face f-front" style={{ position: 'absolute', inset: 0, transform: 'translateZ(calc(min(72vw, 550px) / 2))' }}>
              <video src={PROJECTS[0].video} autoPlay muted loop playsInline></video>
            </div>
            <div className="cube-face f-right" style={{ position: 'absolute', inset: 0, transform: 'rotateY(90deg) translateZ(calc(min(72vw, 550px) / 2))' }}>
              <video src={PROJECTS[1].video} autoPlay muted loop playsInline></video>
            </div>
            <div className="cube-face f-back" style={{ position: 'absolute', inset: 0, transform: 'rotateY(180deg) translateZ(calc(min(72vw, 550px) / 2))' }}>
              <video src={PROJECTS[2].video} autoPlay muted loop playsInline></video>
            </div>
            <div className="cube-face f-left" style={{ position: 'absolute', inset: 0, transform: 'rotateY(-90deg) translateZ(calc(min(72vw, 550px) / 2))' }}>
              <video src={PROJECTS[3].video} autoPlay muted loop playsInline></video>
            </div>
            <div className="cube-face f-bottom" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% - min(72vw, 550px)/2)', width: '100%', height: 'min(72vw, 550px)', transform: 'rotateX(90deg) translateZ(calc(calc(min(72vw, 550px) * 9 / 16) / 2))' }}>
              <video src={PROJECTS[4].video} autoPlay muted loop playsInline></video>
            </div>
          </div>

          {/* Intro Card */}
          <div
            ref={introCardRef}
            id="intro-card"
            style={{
              position: 'absolute',
              textAlign: 'center',
              maxWidth: '32rem',
              pointerEvents: 'none',
              opacity: 1,
              transition: 'opacity 0.4s ease'
            }}
          >
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1.5rem' }}>
              Selected Work · Projects
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 900, fontSize: '4.5rem', letterSpacing: '-0.05em', lineHeight: 0.88, color: 'rgba(255,255,255,0.92)' }}>
              Selected{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.18)' }}>
                Work
              </span>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.9)', marginTop: '2rem' }}>
              Scroll to explore
            </p>
          </div>

          {/* HUD Container */}
          <div className="hud-container">
            <div ref={hudPctRef} id="hud-pct" style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>
              000%
            </div>
            <div style={{ width: '6rem', height: '1px', background: 'rgba(255,255,255,0.06)', marginTop: '0.4rem', position: 'relative' }}>
              <div ref={hudFillRef} id="hud-fill" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%', background: '#fff', opacity: 0.65 }}></div>
            </div>
            <div ref={hudSceneRef} id="hud-scene" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.45rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.2)', marginTop: '0.3rem', textTransform: 'uppercase' }}>
              OVERVIEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

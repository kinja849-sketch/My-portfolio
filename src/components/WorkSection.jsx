import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: 'VICALARY',
    category: 'Web Application',
    tagline: 'Building modern, scalable web applications with clean architecture, strong attention to detail, and a focus on performance and user experience.',
    stack: ['JavaScript', 'React', 'NodeJS', 'Tailwind'],
    image: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beb93af0165d490d94894_feadship.webp',
  },
  {
    name: 'YANHAL',
    category: 'Web Platform',
    tagline: 'Interactive, responsive web platform designed with modern UI standards and efficient frontend state management.',
    stack: ['React', 'TypeScript', 'NodeJS', 'Tailwind'],
    image: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beb9dd61285375257c08b_studio.webp',
  },
  {
    name: 'YADA LEARN',
    category: 'EdTech Platform',
    tagline: 'E-learning web application focused on interactive content delivery, real-time database features, and user engagement.',
    stack: ['React', 'Supabase', 'TypeScript', 'NodeJS'],
    image: 'https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a2beba279763ce104996b47_rose.webp',
  }
];

export default function WorkSection() {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const introCardRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cubeEl = cubeRef.current;
    if (!sectionEl || !cubeEl) return;

    const SCENE_COUNT = PROJECTS.length + 1;
    const STOPS = [
      { rx: 90, ry: 0 },
      { rx: 0, ry: 0 },
      { rx: 0, ry: -90 },
      { rx: 0, ry: -180 }
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
    }

    let lastSceneIndex = -1;

    const st = ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const transform = getCubeTransform(progress);
        cubeEl.style.transform = `rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`;

        const rawScene = progress * (SCENE_COUNT - 1);
        const sceneIndex = Math.min(Math.floor(rawScene), SCENE_COUNT - 1);

        if (sceneIndex !== lastSceneIndex) {
          lastSceneIndex = sceneIndex;

          if (sceneIndex === 0) {
            if (introCardRef.current) introCardRef.current.style.opacity = '1';
            if (leftCardRef.current) leftCardRef.current.style.opacity = '0';
            if (rightCardRef.current) rightCardRef.current.style.opacity = '0';
          } else if (sceneIndex === 1) {
            if (introCardRef.current) introCardRef.current.style.opacity = '0';
            updateCardContent(leftCardRef.current, PROJECTS[0]);
            if (leftCardRef.current) leftCardRef.current.style.opacity = '1';
            if (rightCardRef.current) rightCardRef.current.style.opacity = '0';
          } else if (sceneIndex === 2) {
            if (introCardRef.current) introCardRef.current.style.opacity = '0';
            updateCardContent(rightCardRef.current, PROJECTS[1]);
            if (leftCardRef.current) leftCardRef.current.style.opacity = '0';
            if (rightCardRef.current) rightCardRef.current.style.opacity = '1';
          } else if (sceneIndex === 3) {
            if (introCardRef.current) introCardRef.current.style.opacity = '0';
            updateCardContent(leftCardRef.current, PROJECTS[2]);
            if (leftCardRef.current) leftCardRef.current.style.opacity = '1';
            if (rightCardRef.current) rightCardRef.current.style.opacity = '0';
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

          {/* Left Card Details (All links deactivated) */}
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
              <div
                className="card-btn"
                style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}
                onClick={(e) => e.preventDefault()}
              >
                View Project (Deactivated)
              </div>
            </div>
          </div>

          {/* Right Card Details (All links deactivated) */}
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
              <div
                className="card-btn"
                style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}
                onClick={(e) => e.preventDefault()}
              >
                View Project (Deactivated)
              </div>
            </div>
          </div>

          {/* 3D Prism Cube: Uses static project images (video playback removed as requested) */}
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
              <img src={PROJECTS[0].image} alt={PROJECTS[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="cube-face f-front" style={{ position: 'absolute', inset: 0, transform: 'translateZ(calc(min(72vw, 550px) / 2))' }}>
              <img src={PROJECTS[0].image} alt={PROJECTS[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="cube-face f-right" style={{ position: 'absolute', inset: 0, transform: 'rotateY(90deg) translateZ(calc(min(72vw, 550px) / 2))' }}>
              <img src={PROJECTS[1].image} alt={PROJECTS[1].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="cube-face f-back" style={{ position: 'absolute', inset: 0, transform: 'rotateY(180deg) translateZ(calc(min(72vw, 550px) / 2))' }}>
              <img src={PROJECTS[2].image} alt={PROJECTS[2].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="cube-face f-left" style={{ position: 'absolute', inset: 0, transform: 'rotateY(-90deg) translateZ(calc(min(72vw, 550px) / 2))' }}>
              <img src={PROJECTS[0].image} alt={PROJECTS[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="cube-face f-bottom" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% - min(72vw, 550px)/2)', width: '100%', height: 'min(72vw, 550px)', transform: 'rotateX(90deg) translateZ(calc(calc(min(72vw, 550px) * 9 / 16) / 2))' }}>
              <img src={PROJECTS[1].image} alt={PROJECTS[1].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        </div>
      </div>
    </section>
  );
}

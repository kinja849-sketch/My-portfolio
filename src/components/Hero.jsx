import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rightCol = rightColumnRef.current;
    if (!section || !rightCol) return;

    const stackGroups = rightCol.querySelectorAll('.hero-discribe-wrap');
    if (!stackGroups.length) return;

    // Initially dim all category stack groups
    gsap.set(stackGroups, { opacity: 0.25, scale: 0.96, y: 15 });

    // Create scroll trigger timeline to select items one by one as user scrolls through the hero section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    // Step 1: Highlight Frontend (Category 1)
    tl.to(stackGroups[0], { opacity: 1, scale: 1.05, y: 0, duration: 1 })
      .to(stackGroups[0], { opacity: 0.3, scale: 1, y: 0, duration: 1 });

    // Step 2: Highlight Backend (Category 2)
    if (stackGroups[1]) {
      tl.to(stackGroups[1], { opacity: 1, scale: 1.05, y: 0, duration: 1 }, '-=0.5')
        .to(stackGroups[1], { opacity: 0.3, scale: 1, y: 0, duration: 1 });
    }

    // Step 3: Highlight Education (Category 3)
    if (stackGroups[2]) {
      tl.to(stackGroups[2], { opacity: 1, scale: 1.05, y: 0, duration: 1 }, '-=0.5')
        .to(stackGroups[2], { opacity: 0.3, scale: 1, y: 0, duration: 1 });
    }

    // Step 4: Highlight Languages (Category 4)
    if (stackGroups[3]) {
      tl.to(stackGroups[3], { opacity: 1, scale: 1.05, y: 0, duration: 1 }, '-=0.5')
        .to(stackGroups[3], { opacity: 0.8, scale: 1, y: 0, duration: 1 });
    }

    // Fade out scroll indicator on initial scroll
    gsap.to('#scroll-indicator', {
      opacity: 0,
      duration: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '5% top',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="section_hero">
      <div id="sticky-wrapper" className="container-hero">
        <div className="hero-wrapper-content">
          <div className="hero-heading-container">
            <div className="hero-headig-left">
              <div className="heading-item">
                <div className="name-heading-wrapper">
                  <div className="item-name" style={{ width: 'auto', padding: '0 0.8rem' }}>
                    <div className="hero-text">NAJIB ABDIRAHMAN MOHAMMED</div>
                  </div>
                  <div className="item-name-work">
                    <div className="point-name"></div>
                    <div className="hero-text is-black">Available for Work</div>
                  </div>
                </div>
                <h1 className="h1">Full-Stack Developer</h1>
                <p id="scramble-2" className="discribe-hero">
                  Building modern, scalable web applications with clean architecture, strong attention to detail, and a focus on performance and user experience. Combining analytical thinking from a finance background with hands-on development in JavaScript, React, Node.js, and modern tooling.
                  <br />
                </p>
                <a href="#work" className="link-hero w-inline-block">
                  <div className="btn-contact">
                    <div className="btn-tete-wrap">
                      <div className="text-btn">View Projects</div>
                      <img
                        src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a35157bf937edec5b945227_SVG%20(1).svg"
                        loading="lazy"
                        alt="arrow"
                        className="icon-btn"
                      />
                    </div>
                  </div>
                </a>
              </div>

              <div className="heading-item">
                <div className="item-name">
                  <div className="hero-text">MY FOCUS</div>
                </div>
                <h2 className="h2">
                  I help startups and growing teams ship reliable web products by combining solid engineering practices with practical problem-solving.
                </h2>
                <p className="hero-discribe">
                  I care about clean code, maintainable systems, and delivering real results. Combining analytical rigor with modern full-stack development.
                  <br />
                </p>

                {/* DEACTIVATED "Get in Touch" button as requested */}
                <div
                  className="link-hero w-inline-block"
                  style={{ opacity: 0.5, pointerEvents: 'none', cursor: 'not-allowed' }}
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="btn-contact" style={{ backgroundColor: '#666', borderColor: '#666' }}>
                    <div className="btn-tete-wrap">
                      <div className="text-btn" style={{ color: '#aaa' }}>Get in Touch (Deactivated)</div>
                      <img
                        src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a35157bf937edec5b945227_SVG%20(1).svg"
                        loading="lazy"
                        alt="arrow"
                        className="icon-btn"
                        style={{ filter: 'grayscale(100%)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-headig-center"></div>

            {/* Category stack: selected one by one via ScrollTrigger timeline */}
            <div ref={rightColumnRef} className="hero-headig-right">
              <div className="hero-discribe-wrap" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-hero">Frontend</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">JavaScript (ES6+)</div>
                  <div className="tetxt-stack is-2">TypeScript</div>
                  <div className="tetxt-stack is-3">ReactJS &amp; Tailwind CSS</div>
                </div>
              </div>
              <div className="hero-discribe-wrap" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-hero">Backend</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-4">NodeJS</div>
                  <div className="tetxt-stack is-5">Supabase &amp; APIs</div>
                  <div className="tetxt-stack is-6">REST &amp; Webhooks</div>
                </div>
              </div>
              <div className="hero-discribe-wrap" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-hero">Education</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-8">B. Finance &amp; Accounting</div>
                  <div className="tetxt-stack is-9">Muhammadiyah Univ. Indonesia</div>
                </div>
              </div>
              <div className="hero-discribe-wrap" style={{ transition: 'all 0.3s ease' }}>
                <div className="text-hero">Languages</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">English &amp; Swahili (Native)</div>
                  <div className="tetxt-stack">Somali (Native) · Arabic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-scroll w-embed w-script">
        <div id="scroll-indicator" className="scroll-indicator">
          <div className="cursor-wrapper">
            <svg className="cursor-text" width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"></path>
              </defs>
              <text fill="white" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="3.5" fontWeight="bold">
                <textPath href="#circlePath">SCROLL DOWN • SCROLL DOWN •</textPath>
              </text>
            </svg>
            <svg className="mouse-icon" width="20" height="34" viewBox="0 0 24 40" fill="none">
              <rect x="1" y="1" width="22" height="38" rx="11" stroke="white" strokeWidth="2" strokeOpacity="0.6"></rect>
              <path d="M12 8V14" stroke="white" strokeWidth="2" strokeLinecap="round" className="mouse-wheel"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

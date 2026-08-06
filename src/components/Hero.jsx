import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero({ onOpenContact }) {
  const sectionRef = useRef(null);
  const headingContainerRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const rightCol = rightColumnRef.current;
    const leftCol = leftColumnRef.current;
    const headingContainer = headingContainerRef.current;
    if (!section || !rightCol || !leftCol) return;

    const stackGroups = rightCol.querySelectorAll('.hero-discribe-wrap');
    const leftItems = leftCol.querySelectorAll('.heading-item');

    if (!stackGroups.length || !leftItems.length) return;

    // Initially hide all right category stack groups except first
    gsap.set(stackGroups, { autoAlpha: 0, display: 'none' });
    gsap.set(stackGroups[0], { autoAlpha: 1, display: 'block' });

    // Initially show Left Item 0 (Full-Stack Dev), hide Left Item 1 (MY FOCUS)
    gsap.set(leftItems[0], { autoAlpha: 1, display: 'flex' });
    if (leftItems[1]) {
      gsap.set(leftItems[1], { autoAlpha: 0, display: 'none' });
    }

    // GSAP ScrollTrigger timeline: As frames rotate, content transitions smoothly
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'power2.inOut' },
    });

    // Segment 1 (0% to 25% scroll): Frontend visible -> then disappears
    tl.to(stackGroups[0], { autoAlpha: 1, display: 'block', duration: 1 })
      .to(stackGroups[0], { autoAlpha: 0, display: 'none', duration: 0.3 });

    // Segment 2 (25% to 50% scroll): Backend appears + Left column smoothly switches to MY FOCUS
    if (stackGroups[1]) {
      tl.to(leftItems[0], { autoAlpha: 0, display: 'none', duration: 0.3 }, '+=0.02')
        .to(leftItems[1], { autoAlpha: 1, display: 'flex', duration: 0.5 }, '<')
        .to(stackGroups[1], { autoAlpha: 1, display: 'block', duration: 1 }, '<')
        .to(stackGroups[1], { autoAlpha: 0, display: 'none', duration: 0.3 });
    }

    // Segment 3 (50% to 75% scroll): Education appears -> then disappears
    if (stackGroups[2]) {
      tl.to(stackGroups[2], { autoAlpha: 1, display: 'block', duration: 1 }, '+=0.05')
        .to(stackGroups[2], { autoAlpha: 0, display: 'none', duration: 0.3 });
    }

    // Segment 4 (75% to 100% scroll): Languages appears -> then disappears
    if (stackGroups[3]) {
      tl.to(stackGroups[3], { autoAlpha: 1, display: 'block', duration: 1 }, '+=0.05')
        .to(stackGroups[3], { autoAlpha: 0, display: 'none', duration: 0.3 });
    }

    // Fade out ALL hero text & headers as user leaves hero section so NOTHING bleeds into About Me
    if (headingContainer) {
      gsap.to(headingContainer, {
        autoAlpha: 0,
        y: -30,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: '82% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Fade out scroll indicator on initial scroll
    gsap.to('#scroll-indicator', {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '5% top',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="hero" className="section_hero">
      <div id="sticky-wrapper" className="container-hero">
        <div className="hero-wrapper-content">
          <div ref={headingContainerRef} className="hero-heading-container">
            <div ref={leftColumnRef} className="hero-headig-left">
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
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-btn">
                        <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
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

                <a
                  href="#footernav"
                  className="link-hero w-inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenContact) onOpenContact();
                  }}
                >
                  <div className="btn-contact">
                    <div className="btn-tete-wrap">
                      <div className="text-btn">Get in Touch</div>
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-btn">
                        <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="hero-headig-center"></div>

            {/* Category stack: As frame rotates on scroll, categories appear ONE BY ONE, and as one appears, the previous completely disappears */}
            <div ref={rightColumnRef} className="hero-headig-right">
              <div className="hero-discribe-wrap">
                <div className="text-hero">Frontend</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">JavaScript (ES6+)</div>
                  <div className="tetxt-stack is-2">TypeScript</div>
                  <div className="tetxt-stack is-3">ReactJS &amp; Tailwind CSS</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Backend</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-4">NodeJS</div>
                  <div className="tetxt-stack is-5">Supabase &amp; APIs</div>
                  <div className="tetxt-stack is-6">REST &amp; Webhooks</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Education</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-8">B. Finance &amp; Accounting</div>
                  <div className="tetxt-stack is-9">Muhammadiyah Univ. Indonesia</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
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

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const totalFrames = 480;
    const introStartFrame = 25;
    const frameObj = { frame: introStartFrame };
    const images = new Array(totalFrames);

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      canvas.width = 1080;
      canvas.height = 1350;
    } else {
      canvas.width = 1920;
      canvas.height = 1080;
    }

    function getImgSrc(index) {
      const frameNum = String(index).padStart(3, '0');
      return `https://cdn.jsdelivr.net/gh/naliv8899-wq/portfoliowebp@main/frame_${frameNum}.webp`;
    }

    function draw(img) {
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    let lastDrawnFrame = -1;
    function renderFrame(index) {
      if (index === lastDrawnFrame) return;
      lastDrawnFrame = index;

      const imgIndex = index - 1;
      let img = images[imgIndex];
      if (!img) {
        img = new Image();
        img.src = getImgSrc(index);
        images[imgIndex] = img;
        img.onload = () => {
          if (Math.round(frameObj.frame) === index) {
            requestAnimationFrame(() => draw(img));
          }
        };
        return;
      }

      if (img.complete && img.naturalWidth !== 0) {
        requestAnimationFrame(() => draw(img));
      }
    }

    // Smart background preloader for smooth scrubbing
    function preloadRemainingImages() {
      const step = isMobile ? 2 : 1;
      for (let i = introStartFrame + 1; i <= totalFrames; i += step) {
        if (!images[i - 1]) {
          const img = new Image();
          img.src = getImgSrc(i);
          images[i - 1] = img;
        }
      }
    }

    // Step 1: Preload initial intro frames
    let introLoadedCount = 0;
    for (let i = 1; i <= introStartFrame; i++) {
      const img = new Image();
      img.src = getImgSrc(i);
      images[i - 1] = img;
      img.onload = () => {
        introLoadedCount++;
        if (i === introStartFrame) {
          requestAnimationFrame(() => draw(img));
        }
        if (introLoadedCount === introStartFrame) {
          preloadRemainingImages();
        }
      };
    }

    // Step 2: GSAP ScrollTrigger Sequence
    const trigger = gsap.to(frameObj, {
      frame: totalFrames,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section_hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.6 : 0.4,
      },
      onUpdate: function () {
        renderFrame(Math.round(frameObj.frame));
      },
    });

    // Scroll indicator animation
    gsap.to('#scroll-indicator', {
      opacity: 0,
      duration: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section_hero',
        start: '5% top',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      if (trigger.scrollTrigger) trigger.scrollTrigger.kill();
    };
  }, []);

  return (
    <section id="hero" className="section_hero">
      <div id="sticky-wrapper" className="container-hero">
        <div className="hero-wrapper-content">
          <div className="code-canvas-hero w-embed">
            <div className="sequence-container">
              <canvas ref={canvasRef} id="sequence-canvas"></canvas>
            </div>
          </div>

          <div className="hero-heading-container">
            <div className="hero-headig-left">
              <div className="heading-item">
                <div className="name-heading-wrapper">
                  <div className="item-name">
                    <div className="hero-text">NAJIB ABDIRHMAN</div>
                  </div>
                  <div className="item-name-work">
                    <div className="point-name"></div>
                    <div className="hero-text is-black">Available for Work</div>
                  </div>
                </div>
                <h1 className="h1">Creative Front-end Developer &amp; Webflow Specialist</h1>
                <p id="scramble-2" className="discribe-hero">
                  Engineering high-end interactive websites where advanced motion meets clean, performant architecture. Powered by creative coding and intelligent AI-driven workflows.
                  <br />
                </p>
                <a href="#work" className="link-hero w-inline-block">
                  <div className="btn-contact">
                    <div className="btn-tete-wrap">
                      <div className="text-btn">View Project</div>
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
                  I help digital agencies and forward-thinking brands scale by pushing Webflow to its absolute limits.
                </h2>
                <p className="hero-discribe">
                  By merging advanced creative coding (GSAP, Three.js) with intelligent workflow automations (n8n, Make), I deliver clean, production-ready web ecosystems that load instantly and perform flawlessly.
                  <br />
                </p>
                <a href="#footernav" className="link-hero w-inline-block">
                  <div className="btn-contact">
                    <div className="btn-tete-wrap">
                      <div className="text-btn">My Contact</div>
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
            </div>

            <div className="hero-headig-center"></div>

            <div className="hero-headig-right">
              <div className="hero-discribe-wrap">
                <div className="text-hero">Core Stack</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">Advanced Webflow</div>
                  <div className="tetxt-stack is-2">Finsweet Attributes</div>
                  <div className="tetxt-stack is-3">Custom JavaScript(E63+)</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Creative Coding</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-4">GSAP</div>
                  <div className="tetxt-stack is-5">Canvas API &amp; 3D Spline</div>
                  <div className="tetxt-stack is-6">Three.js/WebGL</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Automations</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-8">Workflow Automation (n8n/Make/Zapier)</div>
                  <div className="tetxt-stack is-9">API &amp; Webhooks Integration</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">AI-Driven Dev</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">Ai Programming (Claude &amp; Gemini)</div>
                  <div className="tetxt-stack">Prompt Engineering for Custom Code</div>
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

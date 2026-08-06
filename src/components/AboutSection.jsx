import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const vortexTextRef = useRef(null);
  const profileImageRef = useRef(null);
  const ticksGroupRef = useRef(null);
  const [digitalTime, setDigitalTime] = useState('');

  useGSAP(() => {
    const targetText = vortexTextRef.current;
    const aboutContainer = sectionRef.current?.querySelector('.container_about');
    const aboutSection = sectionRef.current;
    const profileImg = profileImageRef.current;

    if (targetText && aboutContainer && aboutSection && profileImg) {
      document.fonts.ready.then(() => {
        const text = new SplitType(targetText, { types: 'chars' });
        const chars = text.chars;
        if (!chars || !chars.length) return;

        const totalChars = chars.length;

        const svgPathData =
          'M512 0L348.627 319.382H195.172l68.375-132.364h-3.071C204.072 260.235 119.911 308.437 0 319.382V188.849s76.71-4.533 121.808-51.945H0V.007h136.897v112.594l3.071-.013L195.91.007h103.535V111.89l3.071-.006L360.557 0H512z';
        const svgNS = 'http://www.w3.org/2000/svg';
        const pathElement = document.createElementNS(svgNS, 'path');
        pathElement.setAttribute('d', svgPathData);
        const pathLength = pathElement.getTotalLength();

        function calculatePositions() {
          const currentViewportWidth = window.innerWidth;
          let logoPercentWidth =
            currentViewportWidth < 768 ? 75 : currentViewportWidth < 1024 ? 65 : 28;
          const logoWidth = (logoPercentWidth * currentViewportWidth) / 100;
          const scale = logoWidth / 512;

          const currentImgY = gsap.getProperty(profileImg, 'y') || 0;
          gsap.set(profileImg, { y: 0 });
          const imgRect = profileImg.getBoundingClientRect();
          const textRect = targetText.getBoundingClientRect();
          gsap.set(profileImg, { y: currentImgY });

          const imgCenterX = imgRect.left + imgRect.width / 2 - textRect.left;
          const imgCenterY = imgRect.top + imgRect.height / 2 - textRect.top;

          const charsData = chars.map((char) => ({
            offsetLeft: char.offsetLeft,
            offsetTop: char.offsetTop,
            offsetWidth: char.offsetWidth,
          }));

          chars.forEach((char, index) => {
            const progress = (index / (totalChars - 1 || 1)) * pathLength;
            const point = pathElement.getPointAtLength(progress);

            const startX = imgCenterX + (point.x - 256) * scale;
            const startY = imgCenterY + (point.y - 160) * scale;

            const data = charsData[index];
            gsap.set(char, {
              x: startX - data.offsetLeft - data.offsetWidth / 2,
              y: startY - data.offsetTop,
              autoAlpha: 0.25,
            });
          });
        }

        gsap.set(targetText, { perspective: 1200 });
        calculatePositions();

        // Vortex text assembly animation — triggers when About section is scrolled into view
        gsap.to(chars, {
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 70%',
            end: 'top 15%',
            scrub: window.innerWidth < 768 ? 0.8 : 1.2,
            invalidateOnRefresh: true,
          },
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          autoAlpha: 1,
          stagger: {
            amount: 0.4,
            from: 'random',
          },
          ease: 'power2.inOut',
        });

        // Profile Image: Moves slightly upward
        const isMobile = window.innerWidth < 768;
        const targetY = isMobile ? -16 : -28;

        gsap.set(profileImg, { y: 0 });

        gsap.to(profileImg, {
          y: targetY,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 70%',
            end: 'top 15%',
            scrub: isMobile ? 0.8 : 1.2,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      });
    }

    // Tick Clock Logic
    const ticksGroup = ticksGroupRef.current;
    if (ticksGroup) {
      ticksGroup.innerHTML = '';
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 60; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '45');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', '55');
        line.setAttribute('y2', '0');
        line.setAttribute('transform', `rotate(${i * 6})`);
        line.classList.add('clock-tick');
        fragment.appendChild(line);
      }
      ticksGroup.appendChild(fragment);

      const ticks = ticksGroup.children;
      let lastSecond = -1;

      function updateClock() {
        const now = new Date();
        const seconds = now.getSeconds();

        if (seconds !== lastSecond) {
          lastSecond = seconds;
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          setDigitalTime(`${hours}:${minutes}`);

          for (let i = 0; i < 60; i++) {
            if (ticks[i]) {
              if (i <= seconds) {
                ticks[i].classList.add('active');
              } else {
                ticks[i].classList.remove('active');
              }
            }
          }
        }
        requestAnimationFrame(updateClock);
      }
      requestAnimationFrame(updateClock);
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="section_about" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container_about" style={{ minHeight: 'auto', padding: '3.5rem 1.87rem 3.5rem', position: 'relative', zIndex: 5 }}>
        {/* Top Header Bar */}
        <div className="about-line-head" style={{ marginBottom: '1.5rem' }}>
          <div className="item-name">
            <div className="hero-text">01 / ABOUT</div>
          </div>
          <div className="line-about"></div>
        </div>

        {/* Section Heading: Unified ABOUT Me */}
        <div className="about-heading-wrapper" style={{ textAlign: 'center', marginBottom: '1.25rem', paddingLeft: 0, paddingBottom: 0 }}>
          <h2 className="head-servisec" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, color: '#111', margin: 0, letterSpacing: '-0.02em' }}>
            ABOUT <em className="italic-text" style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(0,0,0,0.5)', fontFamily: 'PT Serif, serif' }}>Me</em>
          </h2>
        </div>

        <div className="container-about-heading" style={{ marginTop: '0.5rem' }}>
          {/* Profile image: Moves slightly upward under line, never crossing line, exact central X-axis */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
            <img
              ref={profileImageRef}
              src="/photo_2026-05-29_01-43-44-removebg-preview.png"
              loading="lazy"
              alt="Najib Abdirahman Mohammed"
              style={{
                width: '9.5rem',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '0.75rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                display: 'inline-block',
                willChange: 'transform',
                zIndex: 10,
              }}
            />
          </div>

          {/* Paragraph Text: Perfectly contained with crisp legible typography filling space */}
          <div className="heading-about-wrapper" style={{ width: '100%', maxWidth: '58rem', margin: '0 auto', paddingLeft: 0, top: 0, position: 'relative' }}>
            <p
              ref={vortexTextRef}
              className="vortex-text"
              style={{
                textAlign: 'center',
                margin: '0 auto',
                fontSize: 'clamp(1.3rem, 2vw, 1.65rem)',
                lineHeight: '1.65',
                color: '#0d0d0d',
                fontWeight: 500,
                letterSpacing: '-0.015em',
              }}
            >
              I am a results-driven professional with a strong foundation in analytical thinking, process optimization, and structured problem-solving. Currently pursuing a Bachelor of Finance &amp; Accounting at Muhammadiyah University of Purwokerto, Indonesia, I build modern web applications using modern technologies (JavaScript, React, Node.js, Supabase) focusing on creating efficient, user-friendly, and scalable solutions. I am fluent in English, Swahili, and Somali, with conversational Arabic. My goal is to grow as a full-stack developer, delivering high-quality products while applying the same precision and efficiency I bring to financial analysis and operations.
            </p>
          </div>
        </div>

        {/* Clock Element */}
        <div className="clock-container" style={{ marginTop: '3rem' }}>
          <div className="code-clock w-embed w-script">
            <div className="svg-clock-wrapper">
              <svg id="tick-clock" width="120" height="120" viewBox="0 0 120 120">
                <g ref={ticksGroupRef} id="ticks-group" transform="translate(60, 60) rotate(-90)"></g>
              </svg>
            </div>
          </div>
          <div id="clock-digits" className="text-clock">{digitalTime}</div>
        </div>

        {/* Subtle Watermark Background Text (Non-disruptive) */}
        <div
          className="about-bg-text"
          style={{
            pointerEvents: 'none',
            opacity: 0.035,
            zIndex: 1,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <div className="bg-text-about" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.0', fontWeight: 800 }}>
            Finan<br />cial &amp;<br />Tech
          </div>
          <div className="bg-text-about right" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: '1.0', fontWeight: 800 }}>
            Full Stack<br />Develop<br />ment
          </div>
        </div>

        <div className="about-line">
          <div className="item-about-devpoint">
            <div className="point-name"></div>
            <div className="hero-text is-black">DEV</div>
          </div>
        </div>
      </div>
      <section id="aboutme" className="about-link-nav"></section>
    </section>
  );
}


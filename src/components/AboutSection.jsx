import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const vortexTextRef = useRef(null);
  const profileImageRef = useRef(null);
  const ticksGroupRef = useRef(null);
  const [digitalTime, setDigitalTime] = useState('');

  useEffect(() => {
    const targetText = vortexTextRef.current;
    const aboutContainer = document.querySelector('.container_about');
    const aboutSection = sectionRef.current;

    if (targetText && aboutContainer && aboutSection) {
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
            currentViewportWidth < 768 ? 80 : currentViewportWidth < 1024 ? 70 : 29.33;
          const logoWidth = (logoPercentWidth * currentViewportWidth) / 100;
          const scale = logoWidth / 512;

          const containerRect = aboutContainer.getBoundingClientRect();
          const textRect = targetText.getBoundingClientRect();

          const containerCenterX = containerRect.left + containerRect.width / 2 - textRect.left;
          const containerCenterY = containerRect.top + containerRect.height / 2 - textRect.top;

          const charsData = chars.map((char) => ({
            offsetLeft: char.offsetLeft,
            offsetTop: char.offsetTop,
            offsetWidth: char.offsetWidth,
          }));

          chars.forEach((char, index) => {
            const progress = (index / (totalChars - 1 || 1)) * pathLength;
            const point = pathElement.getPointAtLength(progress);

            const startX = containerCenterX + (point.x - 256) * scale;
            const startY = containerCenterY + (point.y - 160) * scale;

            const data = charsData[index];
            gsap.set(char, {
              x: startX - data.offsetLeft - data.offsetWidth / 2,
              y: startY - data.offsetTop,
              opacity: 0.25,
            });
          });
        }

        gsap.set(targetText, { perspective: 1200 });
        calculatePositions();

        // Vortex text assembly animation — triggers when About section is in FULL VIEW
        gsap.to(chars, {
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 50%',
            end: 'top 10%',
            scrub: window.innerWidth < 768 ? 0.8 : 1.2,
            invalidateOnRefresh: true,
          },
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
          stagger: {
            amount: 0.4,
            from: 'random',
          },
          ease: 'power2.inOut',
        });

        ScrollTrigger.addEventListener('refreshInit', calculatePositions);
      });
    }

    // Profile Image: Slightly pushed upward on scroll without crossing the top line
    if (profileImageRef.current && aboutSection) {
      gsap.set(profileImageRef.current, { y: 0 });

      gsap.to(profileImageRef.current, {
        y: -25,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 50%',
          end: 'top 10%',
          scrub: window.innerWidth < 768 ? 0.8 : 1.2,
          invalidateOnRefresh: true,
        },
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
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section_about">
      <div className="container_about">
        <div className="about-line-head">
          <div className="item-name">
            <div className="hero-text">01 / ABOUT</div>
          </div>
          <div className="line-about"></div>
        </div>

        <div className="about-heading-wrapper" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 className="head-servisec">
            ABOUT <em className="italic-text">Me</em>
          </h3>
        </div>

        <div className="container-about-heading">
          {/* Profile image: Centered above paragraph text, slightly pushed upward on scroll without crossing top line */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img
              ref={profileImageRef}
              src="/photo_2026-05-29_01-43-44-removebg-preview.png"
              loading="lazy"
              alt="Najib Abdirahman Mohammed"
              style={{
                width: '8.5rem',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '0.75rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                display: 'inline-block',
                willChange: 'transform',
                zIndex: 10
              }}
            />
          </div>

          <div className="heading-about-wrapper" style={{ width: '100%', maxWidth: '44rem', margin: '0 auto' }}>
            <p ref={vortexTextRef} className="vortex-text" style={{ textAlign: 'center', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.65', color: '#111' }}>
              I am a results-driven professional with a strong foundation in analytical thinking, process optimization, and structured problem-solving. Currently pursuing a Bachelor of Finance &amp; Accounting at Muhammadiyah University of Purwokerto, Indonesia, I build modern web applications using modern technologies (JavaScript, React, Node.js, Supabase) focusing on creating efficient, user-friendly, and scalable solutions. I am fluent in English, Swahili, and Somali, with conversational Arabic. My goal is to grow as a full-stack developer, delivering high-quality products while applying the same precision and efficiency I bring to financial analysis and operations.
            </p>
          </div>
        </div>

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

        <div className="about-bg-text">
          <div className="bg-text-about">
            Finan<br />cial &amp;<br />Tech<br /><br />
          </div>
          <div className="bg-text-about right">
            <br />Full Stack<br />Develop<br />ment<br /><br />
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

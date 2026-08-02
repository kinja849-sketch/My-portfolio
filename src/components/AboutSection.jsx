import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const vortexTextRef = useRef(null);
  const signatureRef = useRef(null);
  const ticksGroupRef = useRef(null);
  const [digitalTime, setDigitalTime] = useState('');

  useEffect(() => {
    // 1. Vortex Text Split & GSAP Animation
    const targetText = vortexTextRef.current;
    const aboutSection = sectionRef.current;

    if (targetText && aboutSection) {
      const text = new SplitType(targetText, { types: 'words, chars' });
      const chars = text.chars;

      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            opacity: 0.15,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aboutSection,
              start: 'top 60%',
              end: 'center 40%',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }

    // 2. Scroll Signature Animation
    const signatureEl = signatureRef.current;
    if (aboutSection && signatureEl) {
      gsap.fromTo(
        signatureEl,
        { opacity: 0.2, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    // 3. Tick Clock Logic
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

        <div className="about-heading-wrapper">
          <h3 className="head-servisec">
            ABOUT <em className="italic-text">Me</em>
          </h3>
        </div>

        <div className="container-about-heading">
          {/* Silhouette Image from GitHub */}
          <img
            src="/Silhouette For Najib Abdirahman portfolio.jpg"
            loading="lazy"
            alt="Silhouette Najib Abdirahman"
            className="image-4"
            style={{ objectFit: 'cover', borderRadius: '1.2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          />

          {/* About Me Photo from GitHub */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
            <img
              src="/photo_2026-05-29_01-43-44-removebg-preview.png"
              loading="lazy"
              alt="Najib Abdirahman Mohammed"
              style={{ maxHeight: '380px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div className="heading-about-wrapper" style={{ width: '100%', maxWidth: '52rem', margin: '0 auto' }}>
            {/* Signature SVG from GitHub */}
            <div className="code-point w-embed w-script">
              <img
                ref={signatureRef}
                src="/file.svg"
                alt="Signature Najib Abdirahman"
                className="scroll-signature"
                style={{ width: '14rem', height: 'auto', display: 'block' }}
              />
            </div>

            <p ref={vortexTextRef} className="vortex-text">
              I am a results-driven professional with a strong foundation in analytical thinking, process optimization, and structured problem-solving. Currently pursuing a Bachelor of Finance &amp; Accounting at Muhammadiyah University of Purwokerto, Indonesia, I build modern web applications using modern technologies (JavaScript, React, Node.js, Supabase) focusing on creating efficient, user-friendly, and scalable solutions. I am fluent in English, Swahili, and Somali, with conversational Arabic. My goal is to grow as a full-stack developer, delivering high-quality products while applying the same precision and efficiency I bring to financial analysis and operations.
            </p>
          </div>
        </div>

        <div className="clock-container">
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

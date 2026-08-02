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
    const aboutContainer = document.querySelector('.container_about');
    const aboutSection = sectionRef.current;

    if (targetText && aboutContainer && aboutSection) {
      const text = new SplitType(targetText, { types: 'chars' });
      const chars = text.chars;
      const totalChars = chars.length;

      const svgPathData = "M512 0L348.627 319.382H195.172l68.375-132.364h-3.071C204.072 260.235 119.911 308.437 0 319.382V188.849s76.71-4.533 121.808-51.945H0V.007h136.897v112.594l3.071-.013L195.91.007h103.535V111.89l3.071-.006L360.557 0H512z";
      const svgNS = "http://www.w3.org/2000/svg";
      const pathElement = document.createElementNS(svgNS, "path");
      pathElement.setAttribute("d", svgPathData);
      const pathLength = pathElement.getTotalLength();

      function calculatePositions() {
        const currentViewportWidth = window.innerWidth;
        let logoPercentWidth = currentViewportWidth < 768 ? 80 : currentViewportWidth < 1024 ? 70 : 29.33;
        const logoWidth = (logoPercentWidth * currentViewportWidth) / 100;
        const scale = logoWidth / 512;

        const containerRect = aboutContainer.getBoundingClientRect();
        const textRect = targetText.getBoundingClientRect();

        const containerCenterX = (containerRect.left + containerRect.width / 2) - textRect.left;
        const containerCenterY = (containerRect.top + containerRect.height / 2) - textRect.top;

        const charsData = chars.map(char => ({
          offsetLeft: char.offsetLeft,
          offsetTop: char.offsetTop,
          offsetWidth: char.offsetWidth
        }));

        chars.forEach((char, index) => {
          const progress = (index / (totalChars - 1 || 1)) * pathLength;
          const point = pathElement.getPointAtLength(progress);

          const startX = containerCenterX + (point.x - 256) * scale;
          const startY = containerCenterY + (point.y - 160) * scale;

          const data = charsData[index];
          gsap.set(char, {
            x: startX - data.offsetLeft - (data.offsetWidth / 2),
            y: startY - data.offsetTop,
            opacity: 0.25
          });
        });
      }

      gsap.set(targetText, { perspective: 1200 });
      calculatePositions();

      gsap.to(chars, {
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 20%',
          end: 'bottom 120%',
          scrub: window.innerWidth < 768 ? 0.8 : 1.2,
          invalidateOnRefresh: true
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
          from: "random"
        },
        ease: "power2.inOut"
      });

      ScrollTrigger.addEventListener("refreshInit", calculatePositions);
    }

    // 2. Scroll Signature Animation
    const svgPaths = signatureRef.current?.querySelectorAll('path');
    if (aboutSection && svgPaths && svgPaths.length > 0) {
      gsap.set(svgPaths, {
        strokeDasharray: (i, el) => el.getTotalLength(),
        strokeDashoffset: (i, el) => el.getTotalLength()
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSection,
          start: "top 30%",
          end: "bottom 70%",
          scrub: 0.3,
          invalidateOnRefresh: true
        }
      });

      svgPaths.forEach((path) => {
        tl.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          duration: 1
        });
      });
    }

    // 3. Tick Clock Logic
    const ticksGroup = ticksGroupRef.current;
    if (ticksGroup) {
      ticksGroup.innerHTML = '';
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 60; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "45");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "55");
        line.setAttribute("y2", "0");
        line.setAttribute("transform", `rotate(${i * 6})`);
        line.classList.add("clock-tick");
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
                ticks[i].classList.add("active");
              } else {
                ticks[i].classList.remove("active");
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
          <img
            src="/photo_2026-05-29_01-43-44-removebg-preview.png"
            loading="lazy"
            alt="Najib Abdirahman Mohammed"
            className="image-4"
            style={{ objectFit: 'contain', maxHeight: '420px' }}
          />

          <div className="heading-about-wrapper">
            <div className="code-point w-embed w-script">
              <svg
                ref={signatureRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 446 526"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                className="scroll-signature"
              >
                <path d="M428.972 55.0117C428.972 55.2241 428.117 57.6385 426.303 62.3293C424.309 67.1116 421.655 74.7695 418.914 83.2617C417.759 86.5654 417.082 87.8268 415.402 90.7299" stroke="black" strokeWidth="8" strokeLinecap="round"></path>
                <path d="M133.917 188.813C133.701 188.813 136.765 184.732 146.417 173.971C161.527 157.126 177.094 140.365 183.481 130.708C192.221 117.492 187.527 161.93 195.136 170.588C197.03 172.744 199.914 173.282 203.464 172.591C207.014 171.9 211.61 169.445 238.891 145.62C266.173 121.796 316.001 76.6765 345.072 48.3177C374.143 19.959 380.946 9.72822 381.346 7.1812C382.353 0.765777 364.611 21.4124 350.47 46.6183C339.839 65.569 326.29 99.1843 275.785 174.997C225.28 250.809 139.277 368.351 88.9205 434.575C38.5635 500.799 26.458 512.143 19.6579 517.034C12.8578 521.925 11.73 520.019 9.84449 515.017C4.9787 502.107 4.22376 484.668 10.5483 463.411C14.2927 450.827 23.2277 435.998 35.5731 417.664C47.9186 399.331 64.4529 378.302 121.343 329.331C178.232 280.361 274.976 204.086 318.479 169.37C361.982 134.655 349.313 143.811 338.069 153.575C316.422 172.372 305.407 188.266 303.946 194.514C303.494 196.445 308.682 195.386 321.644 185.528C334.607 175.669 356.478 156.921 368.319 146.372C380.16 135.824 381.308 134.042 379.746 135.138C363.547 146.502 358.714 160.849 359.47 163.538C362.132 173.006 395.398 156.738 412.252 145.263C434.172 130.338 437.915 116.827 438.841 114.498C438.462 113.735 436.362 113.821 436.164 113.918C435.965 114.016 437.732 114.122 439.552 114.231" stroke="black" strokeWidth="8" strokeLinecap="round"></path>
                <path d="M245.111 257.72C245.751 257.504 264.87 248.568 300.636 230.255C317.949 221.39 332.214 210.881 350.558 201.104C368.903 191.327 390.551 181.957 402.49 176.884C414.428 171.812 416.001 171.321 420.794 168.347" stroke="black" strokeWidth="8" strokeLinecap="round"></path>
              </svg>
            </div>
            <p ref={vortexTextRef} className="vortex-text">
              I am a results-driven professional with a strong foundation in analytical thinking, process optimization, and structured problem-solving. Currently pursuing a Bachelor of Finance &amp; Accounting at Muhammadiyah University of Purwokerto, Indonesia, I build modern web applications focusing on clean code, performance, and user-friendly scalable solutions.
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

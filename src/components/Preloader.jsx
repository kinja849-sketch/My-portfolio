import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const textPaths = document.querySelectorAll(".loader svg textPath");
    if (!textPaths.length) return;

    const startTextLengths = Array.from(textPaths).map((tp) => parseFloat(tp.getAttribute("textLength") || 0));
    const startTextOffsets = Array.from(textPaths).map((tp) => parseFloat(tp.getAttribute("startOffset") || 0));

    const targetTextLengths = [4000, 3500, 3250, 3000, 2500, 2000, 1500, 1250];
    const orbitRadii = [775, 700, 625, 550, 475, 400, 325, 250];

    const maxOrbitRadius = orbitRadii[0];
    const maxAnimDuration = 3.0; 
    const minAnimDuration = 2.2;

    textPaths.forEach((textPath, index) => {
      const animationDelay = (textPaths.length - 1 - index) * 0.15;
      const currentOrbitRadius = orbitRadii[index];
      const currentDuration = minAnimDuration + (currentOrbitRadius / maxOrbitRadius) * (maxAnimDuration - minAnimDuration);
      const pathLength = 2 * Math.PI * currentOrbitRadius * 3;
      const textLengthIncrease = targetTextLengths[index] - startTextLengths[index];
      const offsetAdjustment = (textLengthIncrease / 2 / pathLength) * 100;
      const targetOffset = startTextOffsets[index] - offsetAdjustment;

      gsap.to(textPath, {
        attr: { textLength: targetTextLengths[index], startOffset: targetOffset + "%" },
        duration: currentDuration,
        delay: animationDelay,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    let loaderRotation = 0;
    function animateRotation() {
      const spinDirection = Math.random() < 0.5 ? 1 : -1;
      loaderRotation += 25 * spinDirection;
      const svgElement = document.querySelector(".loader svg");
      if (svgElement) {
        gsap.to(svgElement, { 
          rotation: loaderRotation, 
          duration: 4.5, 
          ease: "power2.inOut", 
          onComplete: animateRotation 
        });
      }
    }
    animateRotation();

    const countObj = { value: 0 };
    gsap.to(countObj, {
      value: 100,
      duration: 6.5,
      delay: 0.5,
      ease: "power1.out",
      onUpdate: () => {
        setCount(Math.floor(countObj.value));
      },
      onComplete: () => {
        if (counterRef.current) {
          gsap.to(counterRef.current, { opacity: 0, duration: 0.8, delay: 0.5 });
        }
      }
    });

    const orbitTextElements = document.querySelectorAll(".loader .orbit-text");
    gsap.set(orbitTextElements, { opacity: 0 });
    const orbitTextsReversed = Array.from(orbitTextElements).reverse();

    gsap.to(orbitTextsReversed, { opacity: 1, duration: 1.2, stagger: 0.15, ease: "power1.out" });

    gsap.to(orbitTextsReversed, {
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      delay: 8.5,
      ease: "power1.out",
      onComplete: () => {
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1.2,
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
        }
      }
    });
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="code-preloader w-embed w-script">
        <div className="loader">
          <div ref={counterRef} className="counter">
            {count}
          </div>
          <svg viewBox="-425 -425 1850 1850" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path id="loader-orbit-1" d="M 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 A 775,775 0 0,1 500,-275 A 775,775 0 0,1 500,1275 L 500,-275"></path>
            <path id="loader-orbit-2" d="M 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 A 700,700 0 0,1 500,-200 A 700,700 0 0,1 500,1200 L 500,-200"></path>
            <path id="loader-orbit-3" d="M 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 A 625,625 0 0,1 500,-125 A 625,625 0 0,1 500,1125 L 500,-125"></path>
            <path id="loader-orbit-4" d="M 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 A 550,550 0 0,1 500,-50 A 550,550 0 0,1 500,1050 L 500,-50"></path>
            <path id="loader-orbit-5" d="M 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 A 475,475 0 0,1 500,25 A 475,475 0 0,1 500,975 L 500,25"></path>
            <path id="loader-orbit-6" d="M 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 A 400,400 0 0,1 500,100 A 400,400 0 0,1 500,900 L 500,100"></path>
            <path id="loader-orbit-7" d="M 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 A 325,325 0 0,1 500,175 A 325,325 0 0,1 500,825 L 500,175"></path>
            <path id="loader-orbit-8" d="M 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 A 250,250 0 0,1 500,250 A 250,250 0 0,1 500,750 L 500,250"></path>
            <text className="orbit-text">
              <textPath href="#loader-orbit-1" startOffset="35%" textLength="300">3D SPLINE</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-2" startOffset="35%" textLength="280">THREE.JS</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-3" startOffset="35%" textLength="240">WEBFLOW</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-4" startOffset="35%" textLength="260">DEVELOPER</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-5" startOffset="35%" textLength="290">FRONTED</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-6" startOffset="35%" textLength="200">CREATIVE</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-7" startOffset="35%" textLength="210">ABDIRHMAN</textPath>
            </text>
            <text className="orbit-text">
              <textPath href="#loader-orbit-8" startOffset="35%" textLength="190">NAJIB</textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

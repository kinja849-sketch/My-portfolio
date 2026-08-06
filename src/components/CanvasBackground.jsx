import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CanvasBackground({ preloaderDone }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const introTriggeredRef = useRef(false);
  const startIntroRef = useRef(null);

  // Main setup effect — runs once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const totalFrames = 300;
    const introStartFrame = 25;
    const frameObj = { frame: introStartFrame };
    const images = new Array(totalFrames);
    const cleanups = [];

    const isMobile = window.innerWidth <= 768;
    canvas.width = isMobile ? 960 : 1920;
    canvas.height = isMobile ? 540 : 1080;

    function getImgSrc(index) {
      const frameNum = String(index).padStart(3, '0');
      return `/frames/ezgif-frame-${frameNum}.jpg`;
    }

    function draw(img) {
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      const clamped = Math.max(1, Math.min(totalFrames, index));
      if (clamped === lastDrawnFrame) return;
      lastDrawnFrame = clamped;

      let img = images[clamped - 1];
      if (!img) {
        img = new Image();
        img.src = getImgSrc(clamped);
        images[clamped - 1] = img;
        img.onload = () => {
          if (Math.round(frameObj.frame) === clamped) {
            requestAnimationFrame(() => draw(img));
          }
        };
        return;
      }

      if (img.complete && img.naturalWidth !== 0) {
        requestAnimationFrame(() => draw(img));
      } else {
        img.onload = () => {
          if (Math.round(frameObj.frame) === clamped) {
            requestAnimationFrame(() => draw(img));
          }
        };
      }
    }

    // ── PHASE 1: Preload intro frames (1–25) ──
    let introLoadedCount = 0;
    let introReady = false;

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
          introReady = true;
        }
      };
    }

    // ── PHASE 2: Intro animation (frame 25 → 1) ──
    function startIntroAnimation() {
      if (!introReady) {
        const retryTimeout = setTimeout(startIntroAnimation, 100);
        cleanups.push(() => clearTimeout(retryTimeout));
        return;
      }

      const introTl = gsap.timeline({
        onComplete: initScrollTrigger,
      });

      introTl.to(frameObj, {
        frame: 1,
        duration: 1.0,
        ease: 'power1.out',
        onUpdate() {
          renderFrame(Math.round(frameObj.frame));
        },
      });

      cleanups.push(() => introTl.kill());
    }

    // Store reference so the preloaderDone effect can call it
    startIntroRef.current = startIntroAnimation;

    // ── PHASE 3: ScrollTrigger (frame 1 → totalFrames across entire portfolio page) ──
    function initScrollTrigger() {
      frameObj.frame = 1;
      lastDrawnFrame = -1;

      const mainWrapper = document.querySelector('.main-wrapper') || document.body;

      const frameTween = gsap.to(frameObj, {
        frame: totalFrames,
        ease: 'none',
        scrollTrigger: {
          trigger: mainWrapper,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isMobile ? 0.8 : 0.5,
          invalidateOnRefresh: true,
        },
        onUpdate() {
          renderFrame(Math.round(frameObj.frame));
        },
      });

      cleanups.push(() => {
        if (frameTween.scrollTrigger) frameTween.scrollTrigger.kill();
        frameTween.kill();
      });

      preloadRemainingFrames();
    }

    // ── Background preload of frames 26–300 ──
    function preloadRemainingFrames() {
      const step = isMobile ? 2 : 1;
      for (let i = introStartFrame + 1; i <= totalFrames; i += step) {
        if (!images[i - 1]) {
          const img = new Image();
          img.src = getImgSrc(i);
          images[i - 1] = img;
        }
      }
    }

    // ── About section: fade canvas out/in so About section maintains clean exact style ──
    const aboutSection = document.querySelector('.section_about');
    if (aboutSection) {
      const fadeOut = gsap.to(container, {
        autoAlpha: 0,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 85%',
          end: 'top 15%',
          scrub: true,
        },
      });

      const fadeIn = gsap.to(container, {
        autoAlpha: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'bottom 85%',
          end: 'bottom 15%',
          scrub: true,
        },
      });

      cleanups.push(() => {
        if (fadeOut.scrollTrigger) fadeOut.scrollTrigger.kill();
        if (fadeIn.scrollTrigger) fadeIn.scrollTrigger.kill();
      });
    }

    // ── Resize handling ──
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleRefresh);
    window.addEventListener('load', handleRefresh);
    const t1 = setTimeout(handleRefresh, 300);
    const t2 = setTimeout(handleRefresh, 1000);
    const t3 = setTimeout(handleRefresh, 2500);

    cleanups.push(() => {
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    });

    // If preloaderDone was already true when this effect ran (e.g. fast reload),
    // trigger intro immediately
    if (introTriggeredRef.current) {
      startIntroAnimation();
    }

    return () => {
      cleanups.forEach((fn) => fn());
      startIntroRef.current = null;
    };
  }, []);

  // Watch preloaderDone prop — trigger intro animation when preloader completes
  useEffect(() => {
    if (preloaderDone && !introTriggeredRef.current) {
      introTriggeredRef.current = true;
      if (startIntroRef.current) {
        startIntroRef.current();
      }
    }
  }, [preloaderDone]);

  return (
    <div ref={containerRef} className="canvas-background-fixed">
      <canvas ref={canvasRef} id="sequence-canvas"></canvas>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const totalFrames = 300;
    const frameObj = { frame: 1 };
    const images = new Array(totalFrames);

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

    // Preload all 300 frames immediately in parallel
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getImgSrc(i);
      images[i - 1] = img;
      if (i === 1) {
        img.onload = () => requestAnimationFrame(() => draw(img));
      }
    }

    // ScrollTrigger: scrubs smoothly through all 300 frames from top to bottom of page
    const trigger = gsap.to(frameObj, {
      frame: totalFrames,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 0.4 : 0.2,
        invalidateOnRefresh: true,
      },
      onUpdate: function () {
        renderFrame(Math.round(frameObj.frame));
      },
    });

    // Refresh ScrollTrigger after DOM is fully loaded & when window resizes
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleRefresh);
    window.addEventListener('load', handleRefresh);
    setTimeout(handleRefresh, 500);
    setTimeout(handleRefresh, 1500);

    return () => {
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
      if (trigger.scrollTrigger) trigger.scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="canvas-background-fixed">
      <canvas ref={canvasRef} id="sequence-canvas"></canvas>
    </div>
  );
}

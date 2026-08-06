import React, { useRef, useEffect } from 'react';

export default function Navbar({ onOpenContact }) {
  const dockRef = useRef(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const items = Array.from(dock.querySelectorAll('.dock-item'));

    const BASE_SIZE = 48;
    const MAGNIFICATION = 72;   // max size when mouse is directly over
    const DISTANCE = 140;       // influence radius in px

    let mouseX = Infinity;
    let rafId = null;

    function update() {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - centerX);

        // Map distance -> scale factor
        let scale;
        if (distance > DISTANCE) {
          scale = 1;
        } else {
          // Cosine falloff for smoother feel
          const t = 1 - distance / DISTANCE;
          const ease = 0.5 - 0.5 * Math.cos(Math.PI * t); // easeInOutSine
          scale = 1 + (MAGNIFICATION / BASE_SIZE - 1) * ease;
        }

        const size = Math.round(BASE_SIZE * scale);
        item.style.width = size + 'px';
        item.style.height = size + 'px';
      });

      rafId = null;
    }

    function scheduleUpdate() {
      if (rafId == null) {
        rafId = requestAnimationFrame(update);
      }
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      scheduleUpdate();
    };

    const handleMouseLeave = () => {
      mouseX = Infinity;
      scheduleUpdate();
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    const cleanupFns = items.map((item) => {
      const handleFocus = () => {
        const rect = item.getBoundingClientRect();
        mouseX = rect.left + rect.width / 2;
        scheduleUpdate();
      };
      const handleBlur = () => {
        mouseX = Infinity;
        scheduleUpdate();
      };

      item.addEventListener('focus', handleFocus);
      item.addEventListener('blur', handleBlur);

      return () => {
        item.removeEventListener('focus', handleFocus);
        item.removeEventListener('blur', handleBlur);
      };
    });

    // Initial layout
    update();

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
      cleanupFns.forEach((fn) => fn());
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex items-center justify-center px-4 pointer-events-none">
      <div className="dock-wrapper pointer-events-auto">
        <nav ref={dockRef} className="dock" id="dock" role="toolbar" aria-label="Main navigation">
          {/* About */}
          <a
            href="#aboutme"
            className="dock-item"
            tabIndex={0}
            role="button"
            aria-label="About"
            data-index="0"
          >
            <span className="dock-label">About</span>
            <div className="icon-wrap">
              {/* User / Person icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </a>

          {/* Stack */}
          <a
            href="#stack"
            className="dock-item"
            tabIndex={0}
            role="button"
            aria-label="Stack"
            data-index="1"
          >
            <span className="dock-label">Stack</span>
            <div className="icon-wrap">
              {/* Layers icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                <path d="m22 12.63-9.17 4.16a2 2 0 0 1-1.66 0L2 12.63" />
                <path d="m22 17.63-9.17 4.16a2 2 0 0 1-1.66 0L2 17.63" />
              </svg>
            </div>
          </a>

          {/* Work */}
          <a
            href="#work"
            className="dock-item"
            tabIndex={0}
            role="button"
            aria-label="Work"
            data-index="2"
          >
            <span className="dock-label">Work</span>
            <div className="icon-wrap">
              {/* Briefcase icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
              </svg>
            </div>
          </a>

          {/* Contact */}
          <a
            href="#footernav"
            className="dock-item"
            tabIndex={0}
            role="button"
            aria-label="Contact"
            data-index="3"
            onClick={(e) => {
              if (onOpenContact) {
                e.preventDefault();
                onOpenContact();
              }
            }}
          >
            <span className="dock-label">Contact</span>
            <div className="icon-wrap">
              {/* Mail icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
          </a>
        </nav>
      </div>
    </header>
  );
}

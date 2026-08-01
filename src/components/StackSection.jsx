import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StackSection() {
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const mainTrigger = cardsContainerRef.current;
    if (!mainTrigger) return;

    const cards = gsap.utils.toArray('.card', mainTrigger);
    if (!cards.length) return;

    let mm = gsap.matchMedia();

    // Desktop Fan-Out Animation
    mm.add('(min-width: 769px)', () => {
      const rotations = [-15, -7.5, 7.5, 15];
      const baseCardWidth = cards[0].offsetWidth || 288;

      gsap.set(cards, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        x: 0,
        xPercent: -50,
        yPercent: -50,
        rotation: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainTrigger,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Fan out cards
      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            x: () => {
              const gap = baseCardWidth * 0.15;
              const step = baseCardWidth + gap;
              const offsets = [-step * 1.5, -step * 0.5, step * 0.5, step * 1.5];
              return offsets[index];
            },
            xPercent: -50,
            rotation: rotations[index],
            ease: 'power2.inOut',
          },
          0
        );
      });

      // 3D Flip
      cards.forEach((card, index) => {
        const frontEl = card.querySelector('.flip-card-front');
        const backEl = card.querySelector('.flip-card-back');
        const startTime = 0.6 + index * 0.25;

        if (frontEl && backEl) {
          tl.to(frontEl, { rotateY: -180, ease: 'power2.inOut' }, startTime);
          tl.to(backEl, { rotateY: 0, ease: 'power2.inOut' }, startTime);
          tl.to(card, { rotation: 0, ease: 'power2.inOut' }, startTime);
          tl.to(card, { z: 120, yoyo: true, repeat: 1, ease: 'power2.inOut' }, startTime);
        }
      });
    });

    // Mobile Vertical Stack Flip
    mm.add('(max-width: 768px)', () => {
      gsap.set(cards, {
        position: 'relative',
        left: 'auto',
        top: 'auto',
        x: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
      });

      cards.forEach((card) => {
        const frontEl = card.querySelector('.flip-card-front');
        const backEl = card.querySelector('.flip-card-back');

        if (frontEl && backEl) {
          gsap.set(frontEl, { rotateY: 0 });
          gsap.set(backEl, { rotateY: 180 });

          const mobileTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'center 15%',
              scrub: 1.2,
            },
          });

          mobileTl.to(frontEl, { rotateY: -180, ease: 'power2.out' }, 0);
          mobileTl.to(backEl, { rotateY: 0, ease: 'power2.out' }, 0);
          mobileTl.to(
            card,
            {
              z: 80,
              scale: 1.02,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut',
            },
            0
          );
        }
      });
    });
  }, []);

  return (
    <div className="section-stack">
      <div className="bg-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://cdn.prod.website-files.com/6a116b867b57804193b667d1%2F6a2ff3331e4883658f03c92e_video_poster.0000000.jpg"
        >
          <source src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1%2F6a2ff3331e4883658f03c92e_video_mp4.mp4" type="video/mp4" />
          <source src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1%2F6a2ff3331e4883658f03c92e_video_webm.webm" type="video/webm" />
        </video>
      </div>

      <section ref={cardsContainerRef} id="stack" className="cards">
        {/* Card 1 */}
        <div className="card card-1">
          <div className="card-wrapper">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-back-up">
                  <div className="number-card">01</div>
                </div>
                <div className="name-cadr-center">
                  <div className="text-name-card">T</div>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp"
                  loading="lazy"
                  alt="card bg"
                />
                <div className="card-backdown">
                  <div className="number-card">01</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">LAYOUT</h4>
                  <div className="card-h">L</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">Figma to Webflow</div></div>
                <div className="discribe-cards"><div className="discribe-text">Client-First Architecture</div></div>
                <div className="discribe-cards"><div className="discribe-text">Fluid Responsive Design</div></div>
                <div className="discribe-cards"><div className="discribe-text">Clean Class Structure</div></div>
                <div className="discribe-cards"><div className="discribe-text">Cross-Device Grid Scaling</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card card-2">
          <div className="card-wrapper">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-back-up">
                  <div className="number-card">02</div>
                </div>
                <div className="name-cadr-center">
                  <div className="text-name-card">E</div>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp"
                  loading="lazy"
                  alt="card bg"
                />
                <div className="card-backdown">
                  <div className="number-card">02</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">MOTION</h4>
                  <div className="card-h">M</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">Advanced Custom Code</div></div>
                <div className="discribe-cards"><div className="discribe-text">GSAP &amp; ScrollTrigger Core</div></div>
                <div className="discribe-cards"><div className="discribe-text">Cinematic Timeline Engineering</div></div>
                <div className="discribe-cards"><div className="discribe-text">Interactive Component Behavior</div></div>
                <div className="discribe-cards"><div className="discribe-text">High-End Micro-Interactions</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card card-3">
          <div className="card-wrapper">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-back-up">
                  <div className="number-card">03</div>
                </div>
                <div className="name-cadr-center">
                  <div className="text-name-card">C</div>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp"
                  loading="lazy"
                  alt="card bg"
                />
                <div className="card-backdown">
                  <div className="number-card">03</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">3D &amp; WEBGL</h4>
                  <div className="card-h">D</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">Three.js Scene Integration</div></div>
                <div className="discribe-cards"><div className="discribe-text">Interactive WebGl Components</div></div>
                <div className="discribe-cards"><div className="discribe-text">Canvas API Image Sequences</div></div>
                <div className="discribe-cards"><div className="discribe-text">Heavy Asset Frame Optimization</div></div>
                <div className="discribe-cards"><div className="discribe-text">3D Spline Integration</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card card-4">
          <div className="card-wrapper">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-back-up">
                  <div className="number-card">04</div>
                </div>
                <div className="name-cadr-center">
                  <div className="text-name-card">H</div>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp"
                  loading="lazy"
                  alt="card bg"
                />
                <div className="card-backdown">
                  <div className="number-card">04</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">AUTOMATION</h4>
                  <div className="card-h">A</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">Make &amp; Airtable Infrastructures</div></div>
                <div className="discribe-cards"><div className="discribe-text">Automation n8n Workflow</div></div>
                <div className="discribe-cards"><div className="discribe-text">Seamless API &amp; Webhooks</div></div>
                <div className="discribe-cards"><div className="discribe-text">CRM Data Synchronization</div></div>
                <div className="discribe-cards"><div className="discribe-text">Production-Ready Hand-off</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

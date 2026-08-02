import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StackSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardsEl = cardsRef.current;
    if (!sectionEl || !cardsEl) return;

    const cards = gsap.utils.toArray('.card', cardsEl);
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const rotations = [-15, -7.5, 7.5, 15];

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
          trigger: cardsEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const baseWidth = card.offsetWidth || 288;
        tl.to(
          card,
          {
            x: () => {
              const gap = baseWidth * 0.15;
              const step = baseWidth + gap;
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
          mobileTl.to(card, { z: 80, scale: 1.02, yoyo: true, repeat: 1, ease: 'power2.inOut' }, 0);
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-stack">
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

      <section ref={cardsRef} id="stack" className="cards">
        {/* Card 1 */}
        <div className="card card-1">
          <div className="card-wrapper">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-back-up">
                  <div className="number-card">01</div>
                </div>
                <div className="name-cadr-center">
                  <div className="text-name-card">F</div>
                </div>
                <img src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp" loading="lazy" alt="card bg" />
                <div className="card-backdown">
                  <div className="number-card">01</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">FRONTEND</h4>
                  <div className="card-h">F</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">JavaScript (ES6+)</div></div>
                <div className="discribe-cards"><div className="discribe-text">TypeScript</div></div>
                <div className="discribe-cards"><div className="discribe-text">ReactJS Development</div></div>
                <div className="discribe-cards"><div className="discribe-text">Tailwind CSS</div></div>
                <div className="discribe-cards"><div className="discribe-text">Modern Responsive UI</div></div>
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
                  <div className="text-name-card">B</div>
                </div>
                <img src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp" loading="lazy" alt="card bg" />
                <div className="card-backdown">
                  <div className="number-card">02</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">BACKEND</h4>
                  <div className="card-h">B</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">NodeJS &amp; Express</div></div>
                <div className="discribe-cards"><div className="discribe-text">Supabase Infrastructure</div></div>
                <div className="discribe-cards"><div className="discribe-text">REST APIs &amp; Webhooks</div></div>
                <div className="discribe-cards"><div className="discribe-text">Authentication &amp; Security</div></div>
                <div className="discribe-cards"><div className="discribe-text">Database &amp; Real-time Data</div></div>
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
                  <div className="text-name-card">S</div>
                </div>
                <img src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp" loading="lazy" alt="card bg" />
                <div className="card-backdown">
                  <div className="number-card">03</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">STRENGTHS</h4>
                  <div className="card-h">S</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">Responsive React UIs</div></div>
                <div className="discribe-cards"><div className="discribe-text">Type-Safe Development</div></div>
                <div className="discribe-cards"><div className="discribe-text">Full-Stack Integration</div></div>
                <div className="discribe-cards"><div className="discribe-text">Analytical Problem Solving</div></div>
                <div className="discribe-cards"><div className="discribe-text">Clean &amp; Maintainable Code</div></div>
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
                  <div className="text-name-card">E</div>
                </div>
                <img src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a46258af38bfb12c92f977c_3258584.webp" loading="lazy" alt="card bg" />
                <div className="card-backdown">
                  <div className="number-card">04</div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="head-card">
                  <h4 className="h4">HONORS</h4>
                  <div className="card-h">H</div>
                </div>
                <div className="discribe-cards"><div className="discribe-text">B. Finance &amp; Accounting (MUP)</div></div>
                <div className="discribe-cards"><div className="discribe-text">Debate Club Leader</div></div>
                <div className="discribe-cards"><div className="discribe-text">2-Time Spelling Bee Champ</div></div>
                <div className="discribe-cards"><div className="discribe-text">Archery Competitor</div></div>
                <div className="discribe-cards"><div className="discribe-text">Process Optimization</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

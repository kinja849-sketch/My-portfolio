import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="section_hero">
      <div id="sticky-wrapper" className="container-hero">
        <div className="hero-wrapper-content">
          <div className="hero-heading-container">
            <div className="hero-headig-left">
              <div className="heading-item">
                <div className="name-heading-wrapper">
                  <div className="item-name" style={{ width: 'auto', padding: '0 0.8rem' }}>
                    <div className="hero-text">NAJIB ABDIRAHMAN MOHAMMED</div>
                  </div>
                  <div className="item-name-work">
                    <div className="point-name"></div>
                    <div className="hero-text is-black">Available for Work</div>
                  </div>
                </div>
                <h1 className="h1">Full-Stack Developer</h1>
                <p id="scramble-2" className="discribe-hero">
                  Building modern, scalable web applications with clean architecture, strong attention to detail, and a focus on performance and user experience. Combining analytical thinking from a finance background with hands-on development in JavaScript, React, Node.js, and modern tooling.
                  <br />
                </p>
                <a href="#work" className="link-hero w-inline-block">
                  <div className="btn-contact">
                    <div className="btn-tete-wrap">
                      <div className="text-btn">View Projects</div>
                      <img
                        src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a35157bf937edec5b945227_SVG%20(1).svg"
                        loading="lazy"
                        alt="arrow"
                        className="icon-btn"
                      />
                    </div>
                  </div>
                </a>
              </div>

              <div className="heading-item">
                <div className="item-name">
                  <div className="hero-text">MY FOCUS</div>
                </div>
                <h2 className="h2">
                  I help startups and growing teams ship reliable web products by combining solid engineering practices with practical problem-solving.
                </h2>
                <p className="hero-discribe">
                  I care about clean code, maintainable systems, and delivering real results. Combining analytical rigor with modern full-stack development.
                  <br />
                </p>
                <a href="#footernav" className="link-hero w-inline-block">
                  <div className="btn-contact">
                    <div className="btn-tete-wrap">
                      <div className="text-btn">Get in Touch</div>
                      <img
                        src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a35157bf937edec5b945227_SVG%20(1).svg"
                        loading="lazy"
                        alt="arrow"
                        className="icon-btn"
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="hero-headig-center"></div>

            <div className="hero-headig-right">
              <div className="hero-discribe-wrap">
                <div className="text-hero">Frontend</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">JavaScript (ES6+)</div>
                  <div className="tetxt-stack is-2">TypeScript</div>
                  <div className="tetxt-stack is-3">ReactJS &amp; Tailwind CSS</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Backend</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-4">NodeJS</div>
                  <div className="tetxt-stack is-5">Supabase &amp; APIs</div>
                  <div className="tetxt-stack is-6">REST &amp; Webhooks</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Education</div>
                <div className="discribe-item">
                  <div className="tetxt-stack is-8">B. Finance &amp; Accounting</div>
                  <div className="tetxt-stack is-9">Muhammadiyah Univ. Indonesia</div>
                </div>
              </div>
              <div className="hero-discribe-wrap">
                <div className="text-hero">Languages</div>
                <div className="discribe-item">
                  <div className="tetxt-stack">English &amp; Swahili (Native)</div>
                  <div className="tetxt-stack">Somali (Native) · Arabic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-scroll w-embed w-script">
        <div id="scroll-indicator" className="scroll-indicator">
          <div className="cursor-wrapper">
            <svg className="cursor-text" width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"></path>
              </defs>
              <text fill="white" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="3.5" fontWeight="bold">
                <textPath href="#circlePath">SCROLL DOWN • SCROLL DOWN •</textPath>
              </text>
            </svg>
            <svg className="mouse-icon" width="20" height="34" viewBox="0 0 24 40" fill="none">
              <rect x="1" y="1" width="22" height="38" rx="11" stroke="white" strokeWidth="2" strokeOpacity="0.6"></rect>
              <path d="M12 8V14" stroke="white" strokeWidth="2" strokeLinecap="round" className="mouse-wheel"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

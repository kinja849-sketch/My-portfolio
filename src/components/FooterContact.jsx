import React from 'react';

export default function FooterContact({ onOpenContact }) {
  return (
    <footer id="footer" className="footer">
      <div id="footernav" className="container-footer">
        <div className="footer-heading-wrapper">
          <div className="footer-line-head">
            <div className="item-name">
              <div className="hero-text">04 / Contact</div>
            </div>
            <div className="line-about"></div>
          </div>

          <h5 className="h5">Let’s work together</h5>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenContact) onOpenContact();
            }}
            className="btn-lets-talk w-inline-block"
          >
            <div className="btn-contact">
              <div className="btn-tete-wrap">
                <div className="text-btn">Get in touch</div>
                <img
                  src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a35157bf937edec5b945227_SVG%20(1).svg"
                  loading="lazy"
                  alt="arrow"
                  className="icon-btn"
                />
              </div>
            </div>
          </a>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', maxWidth: '30rem', margin: '1.5rem auto 0', textAlign: 'center', lineHeight: '1.6' }}>
            Open to opportunities in full-stack development, React/Node projects, and collaborative remote or on-site work.
          </p>

          <div className="item-name-footer" style={{ marginTop: '2rem' }}>
            <div className="point-name"></div>
            <div className="hero-text is-black">
              FNSH
              <br />
            </div>
          </div>

          <div className="foter-item-crest">
            <div className="footer-crest"></div>
            <div className="footer-crest-vert"></div>
          </div>
        </div>

        <div className="footer-down-wrapper">
          <div className="item-footer-down">
            <div className="item-footer-wrap">
              <a href="mailto:najibabdirahman074@gmail.com" target="_blank" rel="noreferrer" className="link-footer-wrap w-inline-block">
                <div>EMAIL: najibabdirahman074@gmail.com</div>
              </a>
              <a href="tel:+6282226369835" target="_blank" rel="noreferrer" className="link-footer-wrap w-inline-block">
                <div>PHONE: +62 82226369835</div>
              </a>
            </div>

            <div className="footer-wrap-down">
              <div className="item-down-left">
                <div className="text-block-9">
                  2026 © Edition Najib Abdirahman Mohammed . Crafted with code &amp; intent.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';

export default function Navbar({ onOpenContact }) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="nav_fixed">
      <div className="nav_component w-nav" data-collapse="small" data-duration="400">
        <div className="padding-global">
          <div className="nav-mob-overlay"></div>
          <div className="nav_container">
            <a href="#hero" className="nav_brand w-nav-brand">
              <img
                src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a16b0ec12e768c86f236ff7_IMG_4698%201.svg"
                loading="lazy"
                alt="Logo"
                className="nav_logo"
              />
              <div className="text-logo">
                NAJIB
                <br />
                ABDIRAHMAN
              </div>
            </a>

            <nav role="navigation" className={`nav_menu w-nav-menu ${menuActive ? 'w--open' : ''}`}>
              <div className="nav-link-wrapper">
                <div className="nav-doth"></div>
                <a href="#aboutme" className="nav_menu_link w-nav-link" onClick={() => setMenuActive(false)}>
                  About
                </a>
              </div>
              <div className="nav-link-wrapper">
                <div className="nav-doth"></div>
                <a href="#stack" className="nav_menu_link w-nav-link" onClick={() => setMenuActive(false)}>
                  Stack
                </a>
              </div>
              <div className="nav-link-wrapper">
                <div className="nav-doth"></div>
                <a href="#work" className="nav_menu_link w-nav-link" onClick={() => setMenuActive(false)}>
                  Work
                </a>
              </div>
              <div className="nav-link-wrapper">
                <div className="nav-doth"></div>
                <a href="#footernav" className="nav_menu_link w-nav-link" onClick={() => setMenuActive(false)}>
                  Contact
                </a>
              </div>
              <div className="mob-menu-wrappper"></div>
            </nav>

            <div className="nav_button w-nav-button" onClick={() => setMenuActive(!menuActive)}>
              <div className="text-navbtn-wrap">
                <div className="text-block-13">
                  {menuActive ? 'Close' : 'Menu'}
                  <br />
                </div>
              </div>
              <div className="bools-brn">
                <div className="code-btn w-embed">
                  <svg className={`ham ham6 ${menuActive ? 'active' : ''}`} viewBox="0 0 100 100">
                    <path
                      className="line top"
                      d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
                    ></path>
                    <path
                      className="line middle"
                      d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
                    ></path>
                    <path
                      className="line bottom"
                      d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <a
              href="#footernav"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenContact) onOpenContact();
              }}
              className="link-sub w-inline-block"
            >
              <div className="text-btn">Get in touch</div>
              <img
                src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a3518a536fe5f17506a2315_SVG%20(3).svg"
                loading="lazy"
                alt="arrow"
                className="icon-btn"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budgetMin, setBudgetMin] = useState(5000);
  const [budgetMax, setBudgetMax] = useState(15000);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-form" style={{ display: 'flex' }}>
      <footer id="contact" style={{ opacity: 1, position: 'relative', width: '100%', maxWidth: '700px' }} className="footer14_component padding-section-large">
        <div className="container-m">
          <div className="footer14_cta">
            <div className="contact-form w-form">
              {!submitted ? (
                <form id="wf-form-Contact-Form" name="wf-form-Contact-Form" className="contact-form_layout" onSubmit={handleSubmit}>
                  <div className="form_input-wrapper">
                    <div className="tagline_wrapper">
                      <div className="tagline-dot is-form"></div>
                      <label htmlFor="name" className="form_field-label text-style-tagline">
                        Name *
                      </label>
                    </div>
                    <input
                      className="form_input w-input"
                      maxLength={256}
                      name="name"
                      placeholder="Mark Scout"
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="form_input-bar">
                      <div className="form_input-bar-fill"></div>
                    </div>
                  </div>

                  <div className="form_input-wrapper">
                    <div className="tagline_wrapper">
                      <div className="tagline-dot is-form"></div>
                      <label htmlFor="email" className="form_field-label text-style-tagline">
                        Email *
                      </label>
                    </div>
                    <input
                      className="form_input w-input"
                      maxLength={256}
                      name="Email"
                      placeholder="mark.s@lumonindustries.com"
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="form_input-bar">
                      <div className="form_input-bar-fill"></div>
                    </div>
                  </div>

                  <div className="form_input-wrapper">
                    <div className="tagline_wrapper">
                      <div className="tagline-dot is-active"></div>
                      <label htmlFor="Budget-Min" className="form_field-label text-style-tagline">
                        What's your estimated budget range? * (${budgetMin.toLocaleString()} - ${budgetMax.toLocaleString()})
                      </label>
                    </div>
                    <div className="fs-rangeslider_wrapper" style={{ marginTop: '1rem' }}>
                      <div className="fs-range_values" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div className="range-group">
                          <div className="text-block-10">${budgetMin.toLocaleString()}</div>
                        </div>
                        <div className="range-group">
                          <div className="text-block-12">${budgetMax.toLocaleString()}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                          type="range"
                          min="0"
                          max="30000"
                          step="1000"
                          value={budgetMin}
                          onChange={(e) => setBudgetMin(Number(e.target.value))}
                          style={{ width: '50%' }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="30000"
                          step="1000"
                          value={budgetMax}
                          onChange={(e) => setBudgetMax(Number(e.target.value))}
                          style={{ width: '50%' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form_input-wrapper">
                    <div className="tagline_wrapper">
                      <div className="tagline-dot is-form"></div>
                      <label htmlFor="Details" className="form_field-label text-style-tagline">
                        Project details*
                      </label>
                    </div>
                    <textarea
                      required
                      placeholder="Tell me a bit about your project—the more detail, the merrier."
                      maxLength={5000}
                      id="Details"
                      name="Details"
                      className="form_input is-text-area w-input"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                    <div className="form_input-bar">
                      <div className="form_input-bar-fill"></div>
                    </div>
                  </div>

                  <div className="contact-form_button">
                    <div className="btn-footer is-secondary is-xlarge" style={{ cursor: 'pointer' }}>
                      <input type="submit" className="absolute-submit w-button" value="Submit" style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }} />
                      <div className="button-text_wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', padding: '0.8rem 1.5rem', borderRadius: '100px' }}>
                        <div className="button-text" style={{ fontWeight: 600 }}>Send it</div>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 14L14 1M14 1V13.48M14 1H1.52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="form-success w-form-done" style={{ display: 'block', padding: '2rem', textAlign: 'center' }}>
                  <div>Received—sit tight, I'll be in touch.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-icob-wrapper" onClick={onClose}>
          <img
            src="https://cdn.prod.website-files.com/6a116b867b57804193b667d1/6a384b480d55b37ecbe8b45e_69c6e447b7d4ded1ceb40a45_ic_baseline-close.svg"
            loading="lazy"
            alt="close icon"
            className="image-9"
          />
        </div>
      </footer>
    </div>
  );
}

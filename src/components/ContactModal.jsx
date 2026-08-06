import React, { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Format WhatsApp message with exact fields requested
    const message = `Hello Najib!\n\n*Name:* ${name}\n*Email:* ${email}\n*Offered Price:* ${price}\n*Details:* ${details}\n\nI would like to discuss working together!`;
    const whatsappUrl = `https://wa.me/6282226369835?text=${encodeURIComponent(message)}`;

    // Immediately open WhatsApp link
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmitting(false);
      setName('');
      setEmail('');
      setPrice('');
      setDetails('');
      onClose();
    }, 600);
  };

  return (
    <div className="phone-form-modal-overlay">
      <div className="phone-form-backdrop" onClick={onClose}></div>
      <div className="phone-form-card">
        {/* Close Button */}
        <button type="button" className="phone-modal-close-btn" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="phone-form-content-grid">
          {/* Left Column: Mobile Handset Graphic */}
          <div className="phone-visual-col">
            <img src="https://res.cloudinary.com/koc0fyuc/image/upload/v1785943785/0ed9f671f6e6211ee8e786ad9dd09b44-removebg-preview_pcxru0.png" alt="Mobile Handset" className="red-phone-img" />
          </div>

          {/* Right Column: Contact Form */}
          <div className="phone-form-col">
            <div className="phone-form-header">
              <h2 className="phone-form-title">Get Hold Of Me?</h2>
              <p className="phone-form-subtitle">Contact Me if you need any assistance.</p>
            </div>

            <form onSubmit={handleSubmit} className="phone-actual-form">
              <div className="phone-input-group">
                <label htmlFor="pf-name" className="phone-input-label">
                  Name and surname
                </label>
                <input
                  id="pf-name"
                  type="text"
                  className="phone-field-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="phone-input-group">
                <label htmlFor="pf-email" className="phone-input-label">
                  Email
                </label>
                <input
                  id="pf-email"
                  type="email"
                  className="phone-field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="phone-input-group">
                <label htmlFor="pf-price" className="phone-input-label">
                  Price / Budget Offered
                </label>
                <input
                  id="pf-price"
                  type="text"
                  className="phone-field-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="phone-input-group">
                <label htmlFor="pf-details" className="phone-input-label">
                  Please enter the details of your request.
                </label>
                <textarea
                  id="pf-details"
                  className="phone-field-textarea"
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="phone-form-submit-row">
                <button type="submit" className="phone-whatsapp-submit-btn" disabled={submitting}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>{submitting ? 'SENDING...' : 'SEND VIA WHATSAPP'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



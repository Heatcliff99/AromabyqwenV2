import React, { useState } from 'react';
import './Contact.css';
import { shopLocations } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: '',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send to backend/email
    console.log('Enquiry submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>We're just a call away</h1>
        <p>Tell us the occasion. We'll handle the petals.</p>
      </header>

      <section className="shops-section">
        {shopLocations.map(shop => (
          <div key={shop.id} className="shop-card">
            <h2>{shop.name}</h2>
            <p className="shop-address">{shop.address}</p>
            <div className="shop-map">
              <iframe
                src={shop.mapEmbed}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="shop-actions">
              <a href={shop.mapLink} target="_blank" rel="noopener noreferrer" className="directions-btn">
                Get Directions
              </a>
              <a href={`tel:${shop.phone}`} className="call-btn">
                Call This Shop
              </a>
            </div>
          </div>
        ))}
      </section>

      <section className="contact-info">
        <div className="info-card">
          <h3>📞 Call / WhatsApp</h3>
          <p>+91 99231 06684</p>
        </div>
        <div className="info-card">
          <h3>🕐 Opening Hours</h3>
          <p>Open daily, 9:00 AM – 10:00 PM</p>
        </div>
        <div className="info-card">
          <h3>📷 Instagram</h3>
          <a href="https://instagram.com/aromaflowerscorner" target="_blank" rel="noopener noreferrer">
            @aromaflowerscorner
          </a>
        </div>
      </section>

      <section className="enquiry-section">
        <h2>Send Us an Enquiry</h2>
        {submitted ? (
          <div className="success-message">
            <h3>Thank you! 🌸</h3>
            <p>We've received your enquiry and will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquiry-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number * (10 digits)</label>
              <input
                type="tel"
                id="phone"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9923106684"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="occasion">Occasion</label>
                <select
                  id="occasion"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                >
                  <option value="">Select occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="ganesh-chaturthi">Ganesh Chaturthi</option>
                  <option value="navratri">Navratri</option>
                  <option value="inauguration">Inauguration</option>
                  <option value="sympathy">Sympathy</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Event Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us the occasion, date and what you have in mind..."
              />
            </div>
            <button type="submit" className="submit-btn">Send Enquiry</button>
          </form>
        )}
      </section>

      <section className="feedback-section">
        <h2>Customer Feedback</h2>
        <div className="feedback-widget">
          <div className="rating-stars">★★★★★</div>
          <p>"Beautiful flowers and excellent service! Made our wedding so special."</p>
          <span className="customer-name">— Priya S., Wedding</span>
        </div>
        <div className="feedback-widget">
          <div className="rating-stars">★★★★★</div>
          <p>"The bouquet was exactly as I imagined. Fresh flowers and lovely packaging!"</p>
          <span className="customer-name">— Anjali M., Anniversary</span>
        </div>
      </section>
    </div>
  );
};

export default Contact;

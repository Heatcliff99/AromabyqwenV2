import React from 'react';
import './Journal.css';

const Journal: React.FC = () => {
  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1>The Artisan's Journal</h1>
        <p>A little corner of Nagpur where flowers become memory.</p>
      </header>

      <section className="brand-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2018, Aroma Flowers Corner is a women-owned floral atelier nestled in the heart of Nagpur. 
            We believe that every bouquet marks a memory, every bloom tells a story of fleeting beauty.
          </p>
          <p>
            From our first shop in Manish Nagar to our second location in Khamla, we've been crafting 
            hand-tied bouquets, varmalas, floral jewellery, and event décor with love, care, and an artist's touch.
          </p>
        </div>
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1563241527-300e278a9b4e?w=600&h=400&fit=crop" alt="Floral atelier" />
        </div>
      </section>

      <section className="process-section">
        <h2>How a Bloom Becomes Yours</h2>
        <div className="process-grid">
          <div className="process-card">
            <div className="process-icon">🌅</div>
            <h3>Sourced at First Light</h3>
            <p>Fresh flowers selected daily from local markets and trusted growers.</p>
          </div>
          <div className="process-card">
            <div className="process-icon">🎨</div>
            <h3>Composed by Hand</h3>
            <p>Each arrangement crafted with care by our skilled florists.</p>
          </div>
          <div className="process-card">
            <div className="process-icon">🎁</div>
            <h3>Wrapped Like a Gift</h3>
            <p>Beautiful packaging that makes every delivery feel special.</p>
          </div>
          <div className="process-card">
            <div className="process-icon">🚚</div>
            <h3>Delivered with Care</h3>
            <p>Safe, timely delivery to your doorstep or chosen venue.</p>
          </div>
        </div>
      </section>

      <section className="trust-badges">
        <div className="badge">
          <h3>Made to Order</h3>
          <p>Freshly crafted for each customer</p>
        </div>
        <div className="badge">
          <h3>Fully Customisable</h3>
          <p>Choose your flowers, colors, and style</p>
        </div>
        <div className="badge">
          <h3>We're a Call Away</h3>
          <p>+91 99231 06684</p>
        </div>
      </section>

      <section className="blog-section">
        <h2>Seasonal Tips & Ideas</h2>
        <div className="blog-grid">
          <article className="blog-post">
            <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=250&fit=crop" alt="Flower care" />
            <div className="blog-content">
              <h3>How to Make Your Bouquet Last Longer</h3>
              <p>Simple tips to extend the life of your fresh flowers...</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
          <article className="blog-post">
            <img src="https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=400&h=250&fit=crop" alt="Festival styling" />
            <div className="blog-content">
              <h3>Festival Flower Styling Guide</h3>
              <p>Decorate your home beautifully this Ganesh Chaturthi...</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
          <article className="blog-post">
            <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=250&fit=crop" alt="Wedding flowers" />
            <div className="blog-content">
              <h3>Choosing Wedding Flowers on a Budget</h3>
              <p>Smart tips for beautiful wedding florals without breaking the bank...</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Journal;

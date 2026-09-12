import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flower2, Heart, Star } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const products = [
    { name: 'Rose Bouquet', price: 899, image: 'https://images.unsplash.com/photo-1563241527-300e278d9f41?w=500&h=600&fit=crop', category: 'Birthday', id: 'prod1' },
    { name: 'Peony Arrangement', price: 1299, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500&h=600&fit=crop', category: 'Anniversary', id: 'prod2' },
    { name: 'Lavender Bundle', price: 599, image: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&h=600&fit=crop', category: 'Everyday', id: 'prod3' },
    { name: 'Wedding Varmala', price: 5000, image: 'https://images.unsplash.com/photo-1518709322009-8f85eb2b8b2e?w=500&h=600&fit=crop', category: 'Wedding', id: 'prod4' },
    { name: 'Floral Jewellery Set', price: 2500, image: 'https://images.unsplash.com/photo-1523694576729-dc78a7a88ddc?w=500&h=600&fit=crop', category: 'Baby Shower', id: 'prod5' },
    { name: 'Event Décor Package', price: 15000, image: 'https://images.unsplash.com/photo-1516196182-6c6df6cb91b7?w=500&h=600&fit=crop', category: 'Inauguration', id: 'prod6' },
  ];

  const testimonials = [
    { quote: 'The most beautiful flowers I have ever received. Absolutely stunning arrangement!', author: 'Priya S.', occasion: 'Wedding' },
    { quote: 'Fresh flowers and lovely packaging! Made our anniversary so special.', author: 'Anjali M.', occasion: 'Anniversary' },
    { quote: 'Professional service and gorgeous bouquets. Highly recommend!', author: 'Neha K.', occasion: 'Birthday' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <img src="https://images.unsplash.com/photo-1490750967868-bcdf92dd21ea?w=1600&h=900&fit=crop" alt="" className="hero-bg" />
        <div className="hero-content">
          <p className="hero-subtitle">Where every bloom tells a story of fleeting beauty.</p>
          <h1 className="hero-title">Aroma Flowers Corner</h1>
          <p className="hero-description">Artisan floral atelier crafting hand-tied bouquets, varmalas, floral jewellery, and event décor in Nagpur since 2018.</p>
          <div className="hero-buttons">
            <Link to="/customise" className="btn btn-primary">Customise a Bouquet</Link>
            <Link to="/collection" className="btn btn-outline">View the Collection</Link>
          </div>
        </div>
      </section>

      {/* This Season's Pick */}
      <section className="seasons-pick section">
        <div className="container">
          <div className="featured-card">
            <img src="https://images.unsplash.com/photo-1563241527-300e278d9f41?w=600&h=700&fit=crop" alt="Season's Pick" />
            <div className="featured-content">
              <p className="featured-label">This Season's Pick</p>
              <h2>Rose & Peony Delight</h2>
              <p>A luxurious blend of fresh roses and peonies, elegantly wrapped for that perfect romantic gesture.</p>
              <p className="featured-price">₹1,299</p>
              <Link to="/collection" className="btn btn-primary">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Season's Edit */}
      <section className="seasons-edit section">
        <div className="container">
          <div className="edit-content">
            <p className="edit-label">The Season's Edit</p>
            <h2>From Our Artisan's Journal</h2>
            <p>This season brings a bounty of roses, lilies, and marigolds — perfect for festivals and celebrations. Our florists handpick each stem at dawn to ensure peak freshness.</p>
            <Link to="/journal" className="read-more">Read the Artisan's Journal <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* In Season Now */}
      <section className="in-season section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">In Season Now</p>
            <h2>Explore Our Collection</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="category-tag">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">₹{product.price.toLocaleString()}</p>
                  <Link to={`/customise?productId=${product.id}`} className="view-btn">View Detail</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bouquet Builder Promo */}
      <section className="builder-promo section">
        <div className="container">
          <div className="promo-content">
            <h2>The Petal & Stem Atelier</h2>
            <p>Become the artist. Compose your own bouquet, bloom by bloom. Choose your budget, pick your favorite flowers, add fillers and foliage, and select the perfect wrapping.</p>
            <Link to="/customise" className="btn btn-primary">Open the Bouquet Builder</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Love Notes</p>
            <h2>What Our Customers Say</h2>
          </div>
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <p className="testimonial-author">— {testimonial.author}</p>
                <p className="testimonial-occasion">{testimonial.occasion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

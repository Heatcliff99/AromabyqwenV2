import { useState, useEffect } from 'react'
import { ShoppingCart, Search, Menu, X, Mail, Phone, MapPin, Heart, Star, ArrowRight, Flower2 } from 'lucide-react'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    { icon: <Flower2 size={40} />, title: 'Wedding Flowers', description: 'Bespoke floral arrangements for your special day, from bouquets to venue styling.', link: '#' },
    { icon: <Heart size={40} />, title: 'Event Styling', description: 'Complete floral design for corporate events, parties, and celebrations.', link: '#' },
    { icon: <Star size={40} />, title: 'Workshops', description: 'Learn the art of floristry with our hands-on classes for all skill levels.', link: '#' },
  ]

  const products = [
    { name: 'Rose Bouquet', price: '$89', image: 'https://images.unsplash.com/photo-1563241527-300e278d9f41?w=500&h=600&fit=crop', badge: 'Bestseller' },
    { name: 'Peony Arrangement', price: '$125', image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500&h=600&fit=crop', badge: 'New' },
    { name: 'Lavender Bundle', price: '$45', image: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&h=600&fit=crop', badge: null },
    { name: 'Eucalyptus Wreath', price: '$78', image: 'https://images.unsplash.com/photo-1516196182-6c6df6cb91b7?w=500&h=600&fit=crop', badge: 'Sale' },
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1526047932273-341f2a7b6b9a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518709322009-8f85eb2b8b2e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523694576729-dc78a7a88ddc?w=400&h=400&fit=crop',
  ]

  const testimonials = [
    { quote: 'The most beautiful flowers I have ever received. Absolutely stunning arrangement!', author: 'Sarah M.', role: 'Wedding Client' },
  ]

  return (
    <>
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="nav">
            <a href="#" className="logo">AROMA</a>
            
            <ul className="nav-links">
              <li><a href="#home" className="nav-link active">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#shop" className="nav-link">Shop</a></li>
              <li><a href="#gallery" className="nav-link">Gallery</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>

            <div className="nav-icons">
              <button className="nav-icon"><Search size={20} /></button>
              <button className="nav-icon"><ShoppingCart size={20} /></button>
              <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <img src="https://images.unsplash.com/photo-1490750967868-bcdf92dd21ea?w=1600&h=900&fit=crop" alt="" className="hero-bg" />
        <div className="hero-content">
          <p className="hero-subtitle">Artisan Floral Design</p>
          <h1 className="hero-title">Creating Beautiful Moments Through Flowers</h1>
          <p className="hero-description">Handcrafted bouquets and bespoke floral arrangements for life's most precious moments.</p>
          <div className="hero-buttons">
            <a href="#shop" className="btn btn-primary">Shop Now</a>
            <a href="#about" className="btn btn-outline">Our Story</a>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1563241527-300e278d9f41?w=500&h=600&fit=crop" alt="" className="hero-image" />
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <img src="https://images.unsplash.com/photo-1526047932273-341f2a7b6b9a?w=600&h=700&fit=crop" alt="" className="about-image-main" />
              <img src="https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=300&h=400&fit=crop" alt="" className="about-image-accent" />
            </div>
            <div className="about-content">
              <p className="about-label">Our Story</p>
              <h2 className="about-title">Passion for Floral Artistry</h2>
              <p className="about-text">Founded in 2015, Aroma has been creating exceptional floral designs that capture the essence of nature's beauty. Our team of skilled florists combines traditional techniques with contemporary aesthetics to craft unforgettable arrangements.</p>
              <p className="about-text">Every stem is carefully selected, every arrangement thoughtfully designed. We believe flowers have the power to transform spaces and touch hearts.</p>
              <a href="#contact" className="btn btn-primary">Get in Touch</a>
              <p className="about-signature">The Aroma Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-description">From intimate gatherings to grand celebrations, we bring your floral visions to life.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <a href={service.link} className="service-link">Learn More <ArrowRight size={14} style={{marginLeft: '5px', verticalAlign: 'middle'}} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="featured section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Curated Collection</p>
            <h2 className="section-title">Featured Arrangements</h2>
            <p className="section-description">Discover our handpicked selection of signature bouquets and arrangements.</p>
          </div>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: '50px'}}>
            <a href="#" className="btn btn-outline">View All Products</a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">Our Work</h2>
            <p className="section-description">A glimpse into our floral creations and styled events.</p>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`Gallery ${index + 1}`} />
                <div className="gallery-overlay">
                  <span className="gallery-overlay-text">View Project</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section">
        <div className="container">
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-content">
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">Contact Us</h2>
            <p className="section-description">Have a question or want to discuss a custom arrangement? We'd love to hear from you.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Visit Our Studio</h3>
              <p style={{color: 'var(--text-light)', marginTop: '15px'}}>We welcome appointments for personalized consultations.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin className="contact-item-icon" size={20} />
                  <span className="contact-item-text">123 Floral Street, Garden District, NY 10001</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-item-icon" size={20} />
                  <span className="contact-item-text">+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-item-icon" size={20} />
                  <span className="contact-item-text">hello@aromafloral.com</span>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-input" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Tell us about your floral needs..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3 className="footer-logo">AROMA</h3>
              <p className="footer-description">Artisan floral design studio creating beautiful arrangements for life's special moments since 2015.</p>
              <div className="social-links">
                <a href="#" className="social-link"><Heart size={18} /></a>
                <a href="#" className="social-link"><Star size={18} /></a>
                <a href="#" className="social-link"><Flower2 size={18} /></a>
              </div>
            </div>
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li className="footer-link"><a href="#home">Home</a></li>
                <li className="footer-link"><a href="#about">About</a></li>
                <li className="footer-link"><a href="#services">Services</a></li>
                <li className="footer-link"><a href="#shop">Shop</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li className="footer-link"><a href="#">Weddings</a></li>
                <li className="footer-link"><a href="#">Events</a></li>
                <li className="footer-link"><a href="#">Workshops</a></li>
                <li className="footer-link"><a href="#">Corporate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Support</h4>
              <ul className="footer-links">
                <li className="footer-link"><a href="#">FAQ</a></li>
                <li className="footer-link"><a href="#">Shipping</a></li>
                <li className="footer-link"><a href="#">Returns</a></li>
                <li className="footer-link"><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 Aroma Floral Atelier. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

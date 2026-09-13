import React from 'react';
import { Link } from 'react-router-dom';
import './Collection.css';
import { PRODUCTS as products } from '../types';

const Collection: React.FC = () => {
  return (
    <div className="collection-page">
      <header className="collection-header">
        <h1>The Curated Collection</h1>
        <p>Rapid browsing. High-intent beauty.</p>
      </header>

      {/* Section A - Hand-Tied Bouquets */}
      <section className="collection-section">
        <div className="section-header">
          <h2>Hand-Tied Bouquets</h2>
          <Link to="/customise?category=bouquets" className="shop-btn">Shop Hand-Tied Bouquets</Link>
        </div>
        <div className="product-grid">
          {products.filter((p: any) => p.category === 'bouquets').map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <Link to={`/customise?category=bouquets&productId=${product.id}`} className="customise-btn">Customise →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section B - Varmalas */}
      <section className="collection-section">
        <div className="section-header">
          <h2>Varmalas (Wedding Garlands)</h2>
          <Link to="/customise?category=varmalas" className="shop-btn">Shop Varmalas</Link>
        </div>
        <div className="product-grid">
          {products.filter((p: any) => p.category === 'varmalas').map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <Link to={`/customise?category=varmalas&productId=${product.id}`} className="customise-btn">Customise →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section C - Floral Jewellery */}
      <section className="collection-section">
        <div className="section-header">
          <h2>Floral Jewellery</h2>
          <Link to="/customise?category=jewellery" className="shop-btn">Shop Floral Jewellery</Link>
        </div>
        <div className="product-grid">
          {products.filter((p: any) => p.category === 'jewellery').map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <Link to={`/customise?category=jewellery&productId=${product.id}`} className="customise-btn">Customise →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section D - Event Décor */}
      <section className="collection-section">
        <div className="section-header">
          <h2>Event Décor</h2>
          <Link to="/customise?category=decor" className="shop-btn">Shop Event Décor</Link>
        </div>
        <div className="product-grid">
          {products.filter((p: any) => p.category === 'decor').map((product: any) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <Link to={`/customise?category=decor&productId=${product.id}`} className="customise-btn">Customise →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Block */}
      <section className="collection-cta">
        <h3>Have something else in mind?</h3>
        <div className="cta-buttons">
          <Link to="/customise" className="primary-btn">Build a Custom Bouquet</Link>
          <Link to="/contact" className="secondary-btn">Send an Enquiry</Link>
        </div>
      </section>
    </div>
  );
};

export default Collection;

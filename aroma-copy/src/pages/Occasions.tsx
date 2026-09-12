import React from 'react';
import { Link } from 'react-router-dom';
import './Occasions.css';
import { occasions } from '../types';

const Occasions: React.FC = () => {
  return (
    <div className="occasions-page">
      <header className="occasions-header">
        <h1>Occasions & Festivals</h1>
        <p>Celebrate every moment with flowers that speak from the heart.</p>
        
        {/* Jump Menu */}
        <nav className="jump-nav">
          {occasions.map(occ => (
            <a key={occ.id} href={`#${occ.id}`} className="jump-link">{occ.name}</a>
          ))}
        </nav>
      </header>

      {occasions.map(occasion => (
        <section key={occasion.id} id={occasion.id} className="occasion-section">
          <div className="occasion-hero">
            <img src={occasion.image} alt={occasion.name} />
            <div className="occasion-overlay">
              <h2>{occasion.name}</h2>
              <p>{occasion.description}</p>
              <Link to={`/collection?occasion=${occasion.id}`} className="shop-occasion-btn">
                Shop {occasion.name}
              </Link>
            </div>
          </div>
          
          <div className="occasion-gallery">
            {occasion.gallery?.map((img, idx) => (
              <img key={idx} src={img} alt={`${occasion.name} ${idx + 1}`} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Occasions;

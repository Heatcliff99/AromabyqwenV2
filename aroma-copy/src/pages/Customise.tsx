import React from 'react';
import ProductCustomizer from '../components/ProductCustomizer';
import './Customise.css';

const Customise: React.FC = () => {
  return (
    <div className="customise-page">
      <header className="customise-header">
        <h1>The Petal & Stem Atelier</h1>
        <p>Compose your piece, bloom by bloom.</p>
      </header>
      
      <ProductCustomizer />
    </div>
  );
};

export default Customise;

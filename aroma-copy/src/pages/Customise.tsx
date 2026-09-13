import React, { useState } from 'react';
import { ProductCustomizer } from '../components/ProductCustomizer';
import './Customise.css';

const Customise: React.FC = () => {
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleOpenCustomizer = () => {
    setShowCustomizer(true);
  };

  const handleCloseCustomizer = () => {
    setShowCustomizer(false);
  };

  const handleCustomizationComplete = () => {
    setShowCustomizer(false);
    // Handle order completion - could redirect or show confirmation
    console.log('Customization complete!');
  };

  return (
    <div className="customise-page">
      <header className="customise-header">
        <h1>The Petal & Stem Atelier</h1>
        <p>Compose your piece, bloom by bloom.</p>
      </header>
      
      {!showCustomizer ? (
        <div className="customise-intro">
          <button 
            className="start-customizing-btn"
            onClick={handleOpenCustomizer}
          >
            Start Customizing Your Order
          </button>
        </div>
      ) : (
        <ProductCustomizer 
          onClose={handleCloseCustomizer}
          onComplete={handleCustomizationComplete}
        />
      )}
    </div>
  );
};

export default Customise;

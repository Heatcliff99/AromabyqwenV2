import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCustomizer } from '../components/ProductCustomizer';
import './Customise.css';

const Customise: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/');
  };
  
  const handleComplete = () => {
    navigate('/account');
  };
  
  return (
    <div className="customise-page">
      <header className="customise-header">
        <h1>The Petal & Stem Atelier</h1>
        <p>Compose your piece, bloom by bloom.</p>
      </header>
      
      <ProductCustomizer onClose={handleClose} onComplete={handleComplete} />
    </div>
  );
};

export default Customise;

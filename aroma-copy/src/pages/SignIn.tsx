import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './SignIn.css';

const SignIn: React.FC = () => {
  const context = useContext(AppContext);
  const login = context?.login || (() => {});
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    referral: ''
  });
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    const mockUser = {
      id: 'google-' + Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      phone: '9923106684'
    };
    login(mockUser);
    localStorage.setItem('aroma_user', JSON.stringify(mockUser));
    navigate('/');
  };
  
  const handlePhoneLogin = () => {
    const phone = prompt('Enter your 10-digit phone number:');
    if (phone && /^\d{10}$/.test(phone)) {
      const otp = prompt('Enter OTP sent to ' + phone);
      if (otp) {
        const mockUser = {
          id: 'phone-' + Date.now(),
          name: 'Phone User',
          phone,
          email: ''
        };
        login(mockUser);
        localStorage.setItem('aroma_user', JSON.stringify(mockUser));
        navigate('/');
      }
    } else if (phone) {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    if (!isLogin && !formData.name) {
      alert('Please enter your full name');
      return;
    }
    if (!formData.password) {
      alert('Please enter your password');
      return;
    }
    
    const mockUser = {
      id: 'email-' + Date.now(),
      name: formData.name || 'Email User',
      email: formData.email,
      phone: formData.phone
    };
    login(mockUser);
    localStorage.setItem('aroma_user', JSON.stringify(mockUser));
    navigate('/');
  };

  return (
    <div className="signin-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          
          <div className="auth-methods">
            <button className="auth-btn google" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
            <button className="auth-btn phone" onClick={handlePhoneLogin}>
              Continue with Phone Number
            </button>
          </div>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your full name"
                />
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number (10 digits)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                placeholder="9923106684"
                maxLength={10}
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create one' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState } from 'react';
import './SignIn.css';

const SignIn: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    referral: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with auth provider
    console.log('Auth submitted:', formData);
    // Simulate login success
    navigate('/account');
  };

  return (
    <div className="signin-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Log in to your account' : 'Join us to order and track your bouquets'}
          </p>

          <div className="auth-options">
            <button className="auth-btn google-btn">
              <span className="btn-icon">G</span>
              Continue with Google
            </button>
            <button className="auth-btn phone-btn">
              <span className="btn-icon">📱</span>
              Continue with Phone Number
            </button>
          </div>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
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

            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Your delivery address in Nagpur"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="referral">How did you hear about us?</label>
                  <select
                    id="referral"
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                  >
                    <option value="">Select an option</option>
                    <option value="instagram">Instagram</option>
                    <option value="friend">Friend/Family</option>
                    <option value="google">Google Search</option>
                    <option value="walkby">Walked by the shop</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            {isLogin && (
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="submit-auth-btn">
              {isLogin ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setIsLogin(false)} className="switch-link">
                  Create one
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="switch-link">
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

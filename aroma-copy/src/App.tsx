import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Menu, X, Settings, User } from 'lucide-react'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Customise from './pages/Customise'
import Occasions from './pages/Occasions'
import Journal from './pages/Journal'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import Account from './pages/Account'
import OwnerDashboard from './components/OwnerDashboard'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container">
            <nav className="nav">
              <Link to="/" className="logo">AROMA FLOWERS CORNER</Link>
              
              <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/collection" className="nav-link">Collection</Link></li>
                <li><Link to="/customise" className="nav-link">Customise</Link></li>
                <li><Link to="/occasions" className="nav-link">Occasions & Festivals</Link></li>
                <li><Link to="/journal" className="nav-link">Journal</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>
                <li><Link to="/signin" className="nav-link">Sign In</Link></li>
              </ul>

              <div className="nav-icons">
                <button className="nav-icon" onClick={() => setShowDashboard(true)} title="Owner Dashboard">
                  <Settings size={20} />
                </button>
                <Link to="/account" className="nav-icon">
                  <User size={20} />
                </Link>
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/customise" element={<Customise />} />
            <Route path="/occasions" element={<Occasions />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>

        {/* Owner Dashboard Modal */}
        {showDashboard && (
          <div className="modal-overlay" onClick={() => setShowDashboard(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowDashboard(false)}>
                <X size={24} />
              </button>
              <OwnerDashboard />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3 className="footer-logo">AROMA FLOWERS CORNER</h3>
                <p className="footer-description">Women-owned floral atelier in Nagpur, crafting beautiful memories since 2018.</p>
                <div className="shop-locations">
                  <p><strong>Manish Nagar:</strong> Shop No 10, 11, Manik Park, opposite Union Bank, Manish Nagar, Nagpur 440037</p>
                  <p><strong>Khamla:</strong> Kalash Complex, Gulmohar Hall, Pande Layout, Khamla, Nagpur</p>
                </div>
                <p className="footer-phone">📞 +91 99231 06684</p>
                <p className="footer-hours">🕐 Open daily: 9:00 AM – 10:00 PM</p>
                <div className="social-links">
                  <a href="https://instagram.com/aromaflowerscorner" className="social-link" target="_blank" rel="noopener noreferrer">@aromaflowerscorner</a>
                </div>
              </div>
              <div>
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  <li className="footer-link"><Link to="/">Home</Link></li>
                  <li className="footer-link"><Link to="/collection">Collection</Link></li>
                  <li className="footer-link"><Link to="/customise">Customise</Link></li>
                  <li className="footer-link"><Link to="/occasions">Occasions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-title">Services</h4>
                <ul className="footer-links">
                  <li className="footer-link"><Link to="/collection">Weddings</Link></li>
                  <li className="footer-link"><Link to="/collection">Event Décor</Link></li>
                  <li className="footer-link"><Link to="/collection">Floral Jewellery</Link></li>
                  <li className="footer-link"><Link to="/journal">Flower Care</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-title">Support</h4>
                <ul className="footer-links">
                  <li className="footer-link"><Link to="/contact">Contact</Link></li>
                  <li className="footer-link"><Link to="/signin">Track Order</Link></li>
                  <li className="footer-link"><Link to="/contact">FAQ</Link></li>
                  <li className="footer-link"><Link to="/journal">Journal</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copyright">© 2024 Aroma Flowers Corner. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Menu, X, Settings, User, ShoppingCart, LogOut } from 'lucide-react'
import './App.css'
import { AppContext } from './context/AppContext'
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
  const context = useContext(AppContext)
  const currentUser = context?.currentUser || null
  const logout = context?.logout || (() => {})
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    setUserDropdownOpen(false)
    navigate('/')
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false) // Close menu when resizing to desktop
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNavLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container">
            <nav className="nav">
              <Link to="/" className="logo" onClick={handleNavLinkClick}>AROMA FLOWERS CORNER</Link>
              
              <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" className="nav-link" onClick={handleNavLinkClick}>Home</Link></li>
                <li><Link to="/collection" className="nav-link" onClick={handleNavLinkClick}>Collection</Link></li>
                <li><Link to="/customise" className="nav-link" onClick={handleNavLinkClick}>Customise</Link></li>
                <li><Link to="/occasions" className="nav-link" onClick={handleNavLinkClick}>Occasions & Festivals</Link></li>
                <li><Link to="/journal" className="nav-link" onClick={handleNavLinkClick}>Journal</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={handleNavLinkClick}>Contact</Link></li>
                <li><Link to="/signin" className="nav-link" onClick={handleNavLinkClick}>Sign In</Link></li>
              </ul>

              <div className="nav-icons">
                {/* Cart Button */}
                <button className="nav-icon cart-btn" onClick={() => navigate('/account')} title="Cart & Orders">
                  <ShoppingCart size={20} />
                  <span className="cart-count">0</span>
                </button>
                
                {/* User Menu */}
                {currentUser ? (
                  <div className="user-menu-container">
                    <button 
                      className="nav-icon user-btn" 
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      title={currentUser.name}
                    >
                      <User size={20} />
                      <span className="user-name">{currentUser.name.split(' ')[0]}</span>
                    </button>
                    {userDropdownOpen && (
                      <div className="user-dropdown">
                        <Link to="/account" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                          My Account
                        </Link>
                        <Link to="/account?tab=orders" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                          Order History
                        </Link>
                        <button className="dropdown-item logout-btn" onClick={handleLogout}>
                          <LogOut size={16} />
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/signin" className="nav-icon" title="Sign In">
                    <User size={20} />
                  </Link>
                )}
                
                {/* Owner Dashboard */}
                <button className="nav-icon" onClick={() => setShowDashboard(true)} title="Owner Dashboard">
                  <Settings size={20} />
                </button>
                <Link to="/account" className="nav-icon" onClick={handleNavLinkClick}>
                  <User size={20} />
                </Link>
                <button 
                  className="mobile-menu-btn" 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  title="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hamburger Menu Panel */}
        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
            <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
              {/* Section 1: Main Navigation */}
              <div className="menu-section">
                <h3 className="menu-section-title">Menu</h3>
                <ul className="menu-nav-list">
                  <li><Link to="/" className="menu-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
                  <li><Link to="/collection" className="menu-link" onClick={() => setMenuOpen(false)}>Collection</Link></li>
                  <li><Link to="/customise" className="menu-link" onClick={() => setMenuOpen(false)}>Customise</Link></li>
                  <li><Link to="/occasions" className="menu-link" onClick={() => setMenuOpen(false)}>Occasions & Festivals</Link></li>
                  <li><Link to="/journal" className="menu-link" onClick={() => setMenuOpen(false)}>Journal</Link></li>
                  <li><Link to="/contact" className="menu-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                  {!currentUser && (
                    <li><Link to="/signin" className="menu-link" onClick={() => setMenuOpen(false)}>Sign In / Create Account</Link></li>
                  )}
                </ul>
              </div>

              {/* Section 2: Shop by Category Grid */}
              <div className="menu-section">
                <h3 className="menu-section-title">Shop by Category</h3>
                <div className="category-grid">
                  {[
                    { name: 'Hand-Tied Bouquets', img: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400', path: '/collection?category=bouquets' },
                    { name: 'Varmalas', img: 'https://images.unsplash.com/photo-1549416877-b9c91e6b7f4a?w=400', path: '/collection?category=varmalas' },
                    { name: 'Floral Jewellery', img: 'https://images.unsplash.com/photo-1596541673891-76be67b7ac51?w=400', path: '/collection?category=jewellery' },
                    { name: 'Event Décor', img: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=400', path: '/collection?category=decor' },
                    { name: 'Baby Shower', img: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=400', path: '/occasions#baby-shower' },
                    { name: 'Wedding', img: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?w=400', path: '/occasions#wedding' },
                    { name: 'Birthday', img: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400', path: '/occasions#birthday' },
                    { name: 'Anniversary', img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400', path: '/occasions#anniversary' },
                    { name: 'Ganesh Chaturthi', img: 'https://images.unsplash.com/photo-1567113463300-102a7eb3e251?w=400', path: '/occasions#ganesh-chaturthi' },
                    { name: 'Mahalakshmi Puja', img: 'https://images.unsplash.com/photo-1601662528567-526cd06f65e8?w=400', path: '/occasions#mahalakshmi' },
                    { name: 'Navratri', img: 'https://images.unsplash.com/photo-1567593816199-6c56c4d4f8f6?w=400', path: '/occasions#navratri' },
                    { name: 'Welcome / Inauguration', img: 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?w=400', path: '/occasions#welcome' },
                    { name: 'Sympathy', img: 'https://images.unsplash.com/photo-1596541673891-76be67b7ac51?w=400', path: '/occasions#sympathy' },
                    { name: 'Just Because', img: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?w=400', path: '/occasions#just-because' }
                  ].map((category, idx) => (
                    <Link key={idx} to={category.path} className="category-tile" onClick={() => setMenuOpen(false)}>
                      <img src={category.img} alt={category.name} loading="lazy" />
                      <span className="category-name">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer: Call/WhatsApp + Hours */}
              <div className="menu-footer">
                <a href="tel:+919923106684" className="menu-cta-btn">
                  📞 Call Now
                </a>
                <a href="https://wa.me/919923106684" className="menu-cta-btn whatsapp">
                  💬 WhatsApp
                </a>
                <p className="menu-hours">🕐 Open daily: 9:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        )}

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
              <OwnerDashboard isOpen={true} onClose={() => setShowDashboard(false)} />
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

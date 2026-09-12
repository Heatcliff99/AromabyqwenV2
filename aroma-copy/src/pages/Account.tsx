import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account: React.FC = () => {
  // Mock user data - would come from auth context in real app
  const user = {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 99231 06684',
    address: 'Manish Nagar, Nagpur'
  };

  const orders = [
    {
      id: 'ORD-001',
      product: 'Custom Rose Bouquet',
      date: '2025-01-10',
      status: 'Delivered',
      amount: 1500
    },
    {
      id: 'ORD-002',
      product: 'Wedding Varmala',
      date: '2025-01-15',
      status: 'In Progress',
      amount: 5000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return '#2c7a4b';
      case 'Out for Delivery': return '#f4a460';
      case 'Ready': return '#2c7a4b';
      case 'In Progress': return '#d4a5a5';
      case 'Received': return '#6b5b4f';
      default: return '#6b5b4f';
    }
  };

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>My Account</h1>
        <p>Welcome back, {user.name}</p>
      </header>

      <div className="account-content">
        <aside className="account-sidebar">
          <nav className="account-nav">
            <a href="#profile" className="nav-item active">Profile</a>
            <a href="#orders" className="nav-item">Order History</a>
            <a href="#tracking" className="nav-item">Track My Order</a>
            <a href="#saved" className="nav-item">Saved Designs</a>
            <Link to="/customise" className="nav-item">New Customisation</Link>
            <a href="#" className="nav-item logout">Log Out</a>
          </nav>
        </aside>

        <main className="account-main">
          <section id="profile" className="account-section">
            <h2>Profile Information</h2>
            <div className="profile-card">
              <div className="profile-detail">
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>
              <div className="profile-detail">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="profile-detail">
                <label>Phone</label>
                <p>{user.phone}</p>
              </div>
              <div className="profile-detail">
                <label>Delivery Address</label>
                <p>{user.address}</p>
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </section>

          <section id="orders" className="account-section">
            <h2>Order History</h2>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.product}</td>
                      <td>{order.date}</td>
                      <td>₹{order.amount}</td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="view-btn">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="tracking" className="account-section">
            <h2>Track My Order</h2>
            <div className="tracking-info">
              <p>Select an order from your order history to track its status.</p>
              <div className="status-flow">
                <div className="status-step">
                  <div className="step-dot received">✓</div>
                  <p>Received</p>
                </div>
                <div className="step-connector"></div>
                <div className="status-step">
                  <div className="step-dot progress">✓</div>
                  <p>In Progress</p>
                </div>
                <div className="step-connector"></div>
                <div className="status-step">
                  <div className="step-dot">3</div>
                  <p>Ready</p>
                </div>
                <div className="step-connector"></div>
                <div className="status-step">
                  <div className="step-dot">4</div>
                  <p>Out for Delivery</p>
                </div>
                <div className="step-connector"></div>
                <div className="status-step">
                  <div className="step-dot">5</div>
                  <p>Delivered</p>
                </div>
              </div>
            </div>
          </section>

          <section id="saved" className="account-section">
            <h2>Saved Designs</h2>
            <div className="saved-designs">
              <p>You haven't saved any designs yet.</p>
              <Link to="/customise" className="browse-btn">Browse & Customise</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Account;

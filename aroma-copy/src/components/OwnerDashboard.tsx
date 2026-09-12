import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Calendar, Settings, TrendingUp, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';
import './OwnerDashboard.css';

interface OwnerDashboardProps {
  onClose: () => void;
}

export function OwnerDashboard({ onClose }: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'calendar'>('orders');
  const [selectedShop, setSelectedShop] = useState<'manish_nagar' | 'khamla'>('manish_nagar');

  const { orders, updateOrderStatus, uploadReadyPhoto, inventory, updateInventory } = useApp();

  const shopInventory = inventory.find(inv => inv.shopId === selectedShop);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <AlertCircle size={18} />;
      case 'in_progress':
        return <Clock size={18} />;
      case 'ready':
        return <CheckCircle size={18} />;
      case 'out_for_delivery':
        return <Truck size={18} />;
      case 'delivered':
        return <CheckCircle size={18} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'received':
        return 'Received';
      case 'in_progress':
        return 'In Progress';
      case 'ready':
        return 'Ready';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const newLevel = newQuantity === 0 ? 'out_of_stock' : newQuantity < 20 ? 'low' : 'in_stock';
    updateInventory(selectedShop, itemId, { quantity: newQuantity, stockLevel: newLevel });
  };

  const getStockLevelColor = (level: string) => {
    switch (level) {
      case 'in_stock':
        return '#27ae60';
      case 'low':
        return '#f39c12';
      case 'out_of_stock':
        return '#e74c3c';
      default:
        return '#666';
    }
  };

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h2>Owner Dashboard</h2>
            <p>Manage orders, inventory, and bookings</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Shop Selector */}
        <div className="shop-selector">
          <button
            className={`shop-btn ${selectedShop === 'manish_nagar' ? 'active' : ''}`}
            onClick={() => setSelectedShop('manish_nagar')}
          >
            📍 Manish Nagar
          </button>
          <button
            className={`shop-btn ${selectedShop === 'khamla' ? 'active' : ''}`}
            onClick={() => setSelectedShop('khamla')}
          >
            📍 Khamla
          </button>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={18} />
            Orders ({orders.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Settings size={18} />
            Inventory
          </button>
          <button
            className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={18} />
            Calendar
          </button>
        </div>

        {/* Tab Content */}
        <div className="dashboard-content">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="orders-tab">
              <div className="orders-header">
                <h3>All Orders</h3>
                <div className="order-stats">
                  <span className="stat">
                    <TrendingUp size={16} />
                    Total: {orders.length}
                  </span>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="empty-state">
                  <Package size={48} />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-id">
                          <strong>#{order.id}</strong>
                          <span className={`status-badge status-${order.status}`}>
                            {getStatusIcon(order.status)}
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="order-meta">
                          <span>📅 {order.booking.date}</span>
                          <span>⏰ {order.booking.time}</span>
                          <span>💰 ₹{order.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="order-details">
                        <div className="customer-info">
                          <strong>Customer:</strong> {order.booking.customerName}
                          <br />
                          <strong>WhatsApp:</strong> {order.booking.whatsappNumber}
                          <br />
                          <strong>Type:</strong>{' '}
                          {order.booking.deliveryType === 'pickup'
                            ? `Pickup from ${order.booking.pickupLocation}`
                            : `Delivery to ${order.booking.deliveryLocation?.address}`}
                        </div>

                        <div className="customization-summary">
                          <strong>Customization:</strong>
                          <ul>
                            {order.customization.selectedFlowers.map((f, idx) => (
                              <li key={idx}>
                                Flower × {f.quantity} (Color: {f.color})
                              </li>
                            ))}
                            {order.customization.selectedFillers.map((f, idx) => (
                              <li key={idx}>
                                Filler × {f.quantity}
                              </li>
                            ))}
                            {order.customization.wrappingStyleId && (
                              <li>Wrapping: {order.customization.wrappingStyleId}</li>
                            )}
                          </ul>
                        </div>

                        {order.readyPhotoUrl && (
                          <div className="ready-photo">
                            <strong>Ready Photo:</strong>
                            <img src={order.readyPhotoUrl} alt="Ready order" />
                          </div>
                        )}
                      </div>

                      <div className="order-actions">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(order.id, e.target.value as any)
                          }
                          className="status-select"
                        >
                          <option value="received">Received</option>
                          <option value="in_progress">In Progress</option>
                          <option value="ready">Ready</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                        </select>

                        {order.status === 'ready' && !order.readyPhotoUrl && (
                          <button
                            className="upload-photo-btn"
                            onClick={() => {
                              const url = prompt('Enter photo URL:');
                              if (url) {
                                uploadReadyPhoto(order.id, url);
                              }
                            }}
                          >
                            📷 Upload Ready Photo
                          </button>
                        )}

                        <a
                          href={`https://wa.me/${order.booking.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hi ${order.booking.customerName}! Your order #${order.id} is now ${getStatusLabel(order.status)}. ${
                              order.status === 'ready' && order.readyPhotoUrl
                                ? `Here's a photo of your ready arrangement: ${order.readyPhotoUrl}`
                                : ''
                            } Please have it ready on time!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-btn"
                        >
                          💬 WhatsApp Customer
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="inventory-tab">
              <div className="inventory-header">
                <h3>Inventory - {selectedShop === 'manish_nagar' ? 'Manish Nagar' : 'Khamla'}</h3>
                <p>Track and manage stock levels in real-time</p>
              </div>

              <div className="inventory-sections">
                {/* Flowers */}
                <div className="inventory-section">
                  <h4>🌸 Flowers</h4>
                  <div className="inventory-grid">
                    {shopInventory?.items
                      .filter(item => item.type === 'flower')
                      .map(item => (
                        <div
                          key={item.id}
                          className="inventory-item"
                          style={{ borderLeftColor: getStockLevelColor(item.stockLevel) }}
                        >
                          <div className="item-header">
                            <strong>{item.name}</strong>
                            <span
                              className="stock-badge"
                              style={{ background: getStockLevelColor(item.stockLevel) }}
                            >
                              {item.stockLevel.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="item-controls">
                            <label>Quantity:</label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                              }
                              min="0"
                            />
                          </div>
                          <div className="item-price">
                            <strong>Price:</strong> ₹{item.price}/unit
                          </div>
                          {item.stockLevel === 'out_of_stock' && (
                            <div className="item-availability">
                              <label>Available From:</label>
                              <input
                                type="datetime-local"
                                onChange={(e) => {
                                  updateInventory(selectedShop, item.id, {
                                    availableFrom: new Date(e.target.value),
                                  });
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Fillers */}
                <div className="inventory-section">
                  <h4>🌿 Fillers & Foliage</h4>
                  <div className="inventory-grid">
                    {shopInventory?.items
                      .filter(item => item.type === 'filler')
                      .map(item => (
                        <div
                          key={item.id}
                          className="inventory-item"
                          style={{ borderLeftColor: getStockLevelColor(item.stockLevel) }}
                        >
                          <div className="item-header">
                            <strong>{item.name}</strong>
                            <span
                              className="stock-badge"
                              style={{ background: getStockLevelColor(item.stockLevel) }}
                            >
                              {item.stockLevel.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="item-controls">
                            <label>Quantity:</label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                              }
                              min="0"
                            />
                          </div>
                          <div className="item-price">
                            <strong>Price:</strong> ₹{item.price}/unit
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="inventory-section">
                  <h4>📦 Wrapping & Materials</h4>
                  <div className="inventory-grid">
                    {shopInventory?.items
                      .filter(item => item.type === 'material')
                      .map(item => (
                        <div
                          key={item.id}
                          className="inventory-item"
                          style={{ borderLeftColor: getStockLevelColor(item.stockLevel) }}
                        >
                          <div className="item-header">
                            <strong>{item.name}</strong>
                            <span
                              className="stock-badge"
                              style={{ background: getStockLevelColor(item.stockLevel) }}
                            >
                              {item.stockLevel.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="item-controls">
                            <label>Quantity:</label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                              }
                              min="0"
                            />
                          </div>
                          <div className="item-price">
                            <strong>Price:</strong> ₹{item.price}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="calendar-tab">
              <div className="calendar-header">
                <h3>Booking Calendar</h3>
                <p>View all scheduled pickups and deliveries</p>
              </div>

              <div className="calendar-view">
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <Calendar size={48} />
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  <div className="bookings-list">
                    {orders
                      .sort((a, b) => new Date(a.booking.date + 'T' + a.booking.time).getTime() - 
                                        new Date(b.booking.date + 'T' + b.booking.time).getTime())
                      .map((order) => (
                        <div key={order.id} className="booking-card">
                          <div className="booking-date">
                            <strong>{order.booking.date}</strong>
                            <span>⏰ {order.booking.time}</span>
                          </div>
                          <div className="booking-info">
                            <strong>#{order.id}</strong> - {order.booking.customerName}
                            <br />
                            <span className="booking-type">
                              {order.booking.deliveryType === 'pickup'
                                ? `📍 Pickup: ${order.booking.pickupLocation}`
                                : `🚚 Delivery: ${order.booking.deliveryLocation?.address}`}
                            </span>
                          </div>
                          <div className={`booking-status status-${order.status}`}>
                            {getStatusLabel(order.status)}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react'
import { 
  Package, Calendar, AlertTriangle, CheckCircle, Clock, 
  Truck, Image as ImageIcon, X, Plus, Minus
} from 'lucide-react'
import type { Order, OrderStatus, ShopLocation } from '../types'
import { ORDER_STATUS_LABELS, SHOPS, FLOWER_SPECIES, FILLERS_FOLIAGE } from '../types'
import './OwnerDashboard.css'

// Mock data for demonstration
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user1',
    productType: 'bouquet',
    occasion: 'birthday',
    customisation: {
      budgetTier: { amount: 500, label: '₹500', unlockedFlowers: ['seasonal', 'standard'] },
      selectedFlowers: [{ speciesId: 'rose', color: 'red', quantity: 12 }],
      selectedFillers: [{ fillerId: 'eucalyptus', quantity: 3 }],
      wrappingStyle: { id: 'craft-paper', name: 'Craft Paper Wrap', basePrice: 50, price: 50, productTypes: ['bouquet'] },
      addOns: []
    },
    booking: {
      date: '2025-01-15',
      time: '10:00',
      dateTime: new Date('2025-01-15T10:00:00'),
      deliveryType: 'delivery',
      googleMapsLink: 'https://maps.google.com/?q=Nagpur',
      whatsappNumber: '+91 99999 99999',
      customerName: 'Priya Sharma'
    },
    status: 'in-progress',
    totalPrice: 650,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-11')
  }
]

interface OwnerDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function OwnerDashboard({ isOpen, onClose }: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'calendar'>('orders')
  const [selectedShop, setSelectedShop] = useState<ShopLocation>('manish-nagar')
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [inventory, setInventory] = useState<Record<string, Record<ShopLocation, { quantity: number; status: string; availableFrom?: string }>>>({})

  // Initialize inventory
  useState(() => {
    const initialInventory: typeof inventory = {}
    FLOWER_SPECIES.forEach(flower => {
      initialInventory[flower.id] = {
        'manish-nagar': { quantity: 50, status: 'in-stock' },
        'khamla': { quantity: 30, status: 'in-stock' }
      }
    })
    FILLERS_FOLIAGE.forEach(filler => {
      initialInventory[filler.id] = {
        'manish-nagar': { quantity: 100, status: 'in-stock' },
        'khamla': { quantity: 80, status: 'in-stock' }
      }
    })
    setInventory(initialInventory)
  })

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date() } : order
    ))
  }

  const updateInventory = (itemId: string, shop: ShopLocation, delta: number) => {
    setInventory(prev => {
      const itemStock = prev[itemId]?.[shop] || { quantity: 0, status: 'out-of-stock' }
      const newQty = Math.max(0, itemStock.quantity + delta)
      let newStatus: string = 'in-stock'
      if (newQty === 0) newStatus = 'out-of-stock'
      else if (newQty < 20) newStatus = 'low-stock'
      
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [shop]: { ...itemStock, quantity: newQty, status: newStatus }
        }
      }
    })
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'received': return <Clock size={18} />
      case 'in-progress': return <Package size={18} />
      case 'ready': return <CheckCircle size={18} />
      case 'out-for-delivery': return <Truck size={18} />
      case 'delivered': return <CheckCircle size={18} />
      default: return <Clock size={18} />
    }
  }

  if (!isOpen) return null

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-header">
          <div>
            <h2>Owner Dashboard</h2>
            <p>Aroma Flowers Corner - Management Panel</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="dashboard-nav">
          <div className="shop-selector">
            <label>Shop Location:</label>
            <select value={selectedShop} onChange={(e) => setSelectedShop(e.target.value as ShopLocation)}>
              {SHOPS.map(shop => (
                <option key={shop.id} value={shop.id}>{shop.name}</option>
              ))}
            </select>
          </div>
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={18} />
              Orders
            </button>
            <button 
              className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <AlertTriangle size={18} />
              Inventory
            </button>
            <button 
              className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('calendar')}
            >
              <Calendar size={18} />
              Calendar
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {activeTab === 'orders' && (
            <div className="orders-panel">
              <h3>All Orders</h3>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">{order.id}</span>
                      <span className={`status-badge status-${order.status}`}>
                        {getStatusIcon(order.status)}
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <div className="order-details">
                      <p><strong>Customer:</strong> {order.booking.customerName}</p>
                      <p><strong>WhatsApp:</strong> {order.booking.whatsappNumber}</p>
                      <p><strong>Type:</strong> {order.productType} {order.occasion && `(${order.occasion})`}</p>
                      <p><strong>Date:</strong> {order.booking.dateTime ? order.booking.dateTime.toLocaleDateString() : `${order.booking.date} at ${order.booking.time}`}</p>
                      <p><strong>Delivery:</strong> {order.booking.deliveryType === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}</p>
                      {order.booking.googleMapsLink && (
                        <p><strong>Location:</strong> <a href={order.booking.googleMapsLink} target="_blank" rel="noopener noreferrer">View on Maps</a></p>
                      )}
                      <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                    </div>
                    <div className="order-actions">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      >
                        {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      {order.status === 'ready' && (
                        <button className="upload-photo-btn">
                          <ImageIcon size={16} />
                          Upload Ready Photo
                        </button>
                      )}
                      <a 
                        href={`https://wa.me/${order.booking.whatsappNumber.replace('+', '')}?text=Hi ${order.booking.customerName}, your order ${order.id} is now ${ORDER_STATUS_LABELS[order.status]}.`}
                        className="whatsapp-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp Customer
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="inventory-panel">
              <h3>Inventory Management - {SHOPS.find(s => s.id === selectedShop)?.name}</h3>
              
              <div className="inventory-section">
                <h4>Flowers</h4>
                <div className="inventory-grid">
                  {FLOWER_SPECIES.map(flower => {
                    const stock = inventory[flower.id]?.[selectedShop] || { quantity: 0, status: 'out-of-stock' }
                    return (
                      <div key={flower.id} className={`inventory-item ${stock.status}`}>
                        <div className="item-info">
                          <strong>{flower.name}</strong>
                          <span className={`status-indicator ${stock.status}`}>{stock.status.replace('-', ' ')}</span>
                        </div>
                        <div className="item-controls">
                          <button onClick={() => updateInventory(flower.id, selectedShop, -1)}>
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{stock.quantity}</span>
                          <button onClick={() => updateInventory(flower.id, selectedShop, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="inventory-section">
                <h4>Fillers & Foliage</h4>
                <div className="inventory-grid">
                  {FILLERS_FOLIAGE.map(filler => {
                    const stock = inventory[filler.id]?.[selectedShop] || { quantity: 0, status: 'out-of-stock' }
                    return (
                      <div key={filler.id} className={`inventory-item ${stock.status}`}>
                        <div className="item-info">
                          <strong>{filler.name}</strong>
                          <span className={`status-indicator ${stock.status}`}>{stock.status.replace('-', ' ')}</span>
                        </div>
                        <div className="item-controls">
                          <button onClick={() => updateInventory(filler.id, selectedShop, -1)}>
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{stock.quantity}</span>
                          <button onClick={() => updateInventory(filler.id, selectedShop, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="calendar-panel">
              <h3>Booking Calendar</h3>
              <p>View and manage all upcoming bookings.</p>
              <div className="calendar-view">
                {orders.map(order => (
                  <div key={order.id} className="calendar-event">
                    <div className="event-date">
                      {order.booking.dateTime ? order.booking.dateTime.toLocaleDateString('en-IN', { 
                        weekday: 'short', day: 'numeric', month: 'short' 
                      }) : order.booking.date}
                    </div>
                    <div className="event-time">
                      {order.booking.dateTime ? order.booking.dateTime.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', minute: '2-digit' 
                      }) : order.booking.time}
                    </div>
                    <div className="event-details">
                      <strong>{order.booking.customerName}</strong>
                      <p>{order.productType} - {ORDER_STATUS_LABELS[order.status]}</p>
                      <p>{order.booking.deliveryType === 'delivery' ? '🚚 Delivery' : '🏪 Pickup at ' + (order.booking.shopLocation || 'Manish Nagar')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

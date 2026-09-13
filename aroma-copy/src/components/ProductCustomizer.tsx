import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUDGET_TIERS, FLOWERS, FILLERS, PRODUCT_TYPES, WRAPPING_STYLES, type BookingDetails } from '../types';
import { X, Plus, Minus, Check, Info } from 'lucide-react';
import './ProductCustomizer.css';

interface ProductCustomizerProps {
  onClose: () => void;
  onComplete: () => void;
}

export function ProductCustomizer({ onClose, onComplete }: ProductCustomizerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [mapsLink, setMapsLink] = useState('');

  const {
    customization,
    setBudgetTier,
    addFlower,
    removeFlower,
    updateFlowerQuantity,
    addFiller,
    removeFiller,
    updateFillerQuantity,
    setWrappingStyle,
    calculateTotal,
    getAvailableFlowers,
    getAvailableFillers,
    getApplicableWrappingStyles,
    booking,
    setBooking,
    createOrder,
    isSlotAvailable,
  } = useApp();

  const total = calculateTotal();
  const selectedTier = BUDGET_TIERS.find(t => t.amount === customization.budgetTier);

  // Step 1: Select budget tier
  const handleBudgetSelect = (amount: number) => {
    setBudgetTier(amount);
  };

  // Step 2: Flower selection
  const availableFlowers = customization.budgetTier 
    ? getAvailableFlowers(customization.budgetTier) 
    : [];

  const handleAddFlower = (speciesId: string, color: string) => {
    addFlower(speciesId, color, 1);
  };

  // Step 3: Filler selection
  const availableFillers = getAvailableFillers();

  const handleAddFiller = (fillerId: string) => {
    addFiller(fillerId, 1);
  };

  // Step 4: Wrapping selection
  const applicableWrapping = getApplicableWrappingStyles(customization.productType);

  const handleWrappingSelect = (styleId: string) => {
    setWrappingStyle(styleId);
  };

  // Booking form handlers
  const handleDateChange = (date: string) => {
    setBooking({
      ...booking,
      date,
      time: booking?.time || '10:00',
      deliveryType: booking?.deliveryType || 'pickup',
      whatsappNumber: booking?.whatsappNumber || '',
      customerName: booking?.customerName || '',
    } as BookingDetails);
  };

  const handleTimeChange = (time: string) => {
    if (!booking) return;
    const slotKey = `${booking.date}T${time}`;
    if (isSlotAvailable(slotKey)) {
      setBooking({ ...booking, time });
    }
  };

  const handleDeliveryTypeChange = (type: 'pickup' | 'delivery') => {
    setBooking({
      ...booking,
      deliveryType: type,
      pickupLocation: type === 'pickup' ? 'Manish Nagar' : undefined,
    } as BookingDetails);
  };

  const handlePickupLocationChange = (location: 'Manish Nagar' | 'Khamla') => {
    setBooking({ ...booking, pickupLocation: location } as BookingDetails);
  };

  const handleConfirmOrder = () => {
    const order = createOrder();
    if (order) {
      onComplete();
    }
  };

  const canProceedFromStep1 = customization.budgetTier !== null;
  const canProceedFromStep2 = customization.selectedFlowers.length > 0;
  // const canProceedFromStep3 = true; // Fillers are optional
  const canProceedFromStep4 = customization.wrappingStyle !== null;

  const getFlowerName = (id: string) => FLOWERS.find(f => f.id === id)?.name || id;
  const getFillerName = (id: string) => FILLERS.find(f => f.id === id)?.name || id;
  const getWrappingName = (id: string) =>
    WRAPPING_STYLES.find(w => w.id === id)?.name || '';

  return (
    <div className="customizer-overlay">
      <div className="customizer-modal">
        <div className="customizer-header">
          <h2>Customize Your Order</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''} ${
                currentStep > step ? 'completed' : ''
              }`}
            >
              <div className="step-number">{step}</div>
              <span className="step-label">
                {step === 1 && 'Budget'}
                {step === 2 && 'Flowers'}
                {step === 3 && 'Fillers'}
                {step === 4 && 'Wrapping'}
                {step === 5 && 'Booking'}
              </span>
            </div>
          ))}
        </div>

        <div className="customizer-content">
          {/* Step 1: Budget Selection */}
          {currentStep === 1 && (
            <div className="step-content">
              <h3>Select Your Budget</h3>
              <p className="step-description">
                Choose a budget tier to unlock matching flower quality and species
              </p>
              <div className="budget-tiers-grid">
                {BUDGET_TIERS.map((tier) => (
                  <button
                    key={tier.amount}
                    className={`budget-tier-btn ${
                      customization.budgetTier === tier.amount ? 'selected' : ''
                    } ${tier.isPremium ? 'premium' : ''}`}
                    onClick={() => handleBudgetSelect(tier.amount)}
                  >
                    {tier.label}
                    {tier.isPremium && <span className="premium-badge">Premium</span>}
                  </button>
                ))}
              </div>
              {selectedTier && (
                <div className="unlocked-info">
                  <Info size={18} />
                  <span>
                    Unlocks:{' '}
                    {selectedTier.unlockedFlowers.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}{' '}
                    flowers
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Flower Selection */}
          {currentStep === 2 && (
            <div className="step-content">
              <h3>Select Flowers</h3>
              <p className="step-description">
                Choose your preferred flowers with colors and quantities
              </p>
              {customization.budgetTier === null ? (
                <p className="no-selection">Please select a budget tier first.</p>
              ) : (
                <div className="flowers-grid">
                  {availableFlowers.map((flower) => (
                    <div key={flower.id} className="flower-card">
                      <h4>{flower.name}</h4>
                      <p className="flower-price">₹{flower.basePrice}/stem</p>
                      <div className="color-options">
                        {flower.colors.map((color) => {
                          const selected = customization.selectedFlowers.find(
                            (f) => f.speciesId === flower.id && f.color === color
                          );
                          return (
                            <div
                              key={color}
                              className={`color-swatch ${selected ? 'selected' : ''}`}
                              style={{ backgroundColor: color }}
                              onClick={() =>
                                selected
                                  ? removeFlower(flower.id, color)
                                  : handleAddFlower(flower.id, color)
                              }
                            >
                              {selected && <Check size={14} style={{ color: '#fff' }} />}
                            </div>
                          );
                        })}
                      </div>
                      {customization.selectedFlowers.some(
                        (f) => f.speciesId === flower.id
                      ) && (
                        <div className="quantity-controls">
                          <button
                            onClick={() => {
                              const selected = customization.selectedFlowers.find(
                                (f) => f.speciesId === flower.id
                              );
                              if (selected) {
                                updateFlowerQuantity(
                                  flower.id,
                                  selected.color,
                                  selected.quantity - 1
                                );
                              }
                            }}
                          >
                            <Minus size={16} />
                          </button>
                          <span>
                            {customization.selectedFlowers
                              .filter((f) => f.speciesId === flower.id)
                              .reduce((sum: number, f) => sum + f.quantity, 0)}
                          </span>
                          <button
                            onClick={() => {
                              const selected = customization.selectedFlowers.find(
                                (f) => f.speciesId === flower.id
                              );
                              if (selected) {
                                updateFlowerQuantity(
                                  flower.id,
                                  selected.color,
                                  selected.quantity + 1
                                );
                              } else if (flower.colors.length > 0) {
                                handleAddFlower(flower.id, flower.colors[0]);
                              }
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Filler Selection */}
          {currentStep === 3 && (
            <div className="step-content">
              <h3>Select Fillers & Foliage</h3>
              <p className="step-description">
                Add decorative elements to enhance your arrangement (optional)
              </p>
              <div className="fillers-grid">
                {availableFillers.map((filler) => {
                  const selected = customization.selectedFillers.find(
                    (f) => f.fillerId === filler.id
                  );
                  return (
                    <div key={filler.id} className="filler-card">
                      <h4>{filler.name}</h4>
                      <p className="filler-price">₹{filler.price}/unit</p>
                      {!selected ? (
                        <button
                          className="add-filler-btn"
                          onClick={() => handleAddFiller(filler.id)}
                        >
                          <Plus size={16} /> Add
                        </button>
                      ) : (
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateFillerQuantity(filler.id, selected.quantity - 1)
                            }
                          >
                            <Minus size={16} />
                          </button>
                          <span>{selected.quantity}</span>
                          <button
                            onClick={() =>
                              updateFillerQuantity(filler.id, selected.quantity + 1)
                            }
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFiller(filler.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Wrapping Selection */}
          {currentStep === 4 && (
            <div className="step-content">
              <h3>Select Wrapping / Base Style</h3>
              <p className="step-description">
                Choose the perfect finishing touch for your {customization.productType}
              </p>
              <div className="wrapping-grid">
                {applicableWrapping.map((style) => (
                  <div
                    key={style.id}
                    className={`wrapping-card ${
                      customization.wrappingStyle === style.id ? 'selected' : ''
                    }`}
                    onClick={() => handleWrappingSelect(style.id)}
                  >
                    <h4>{style.name}</h4>
                    <p className="wrapping-price">₹{style.price}</p>
                    {customization.wrappingStyle === style.id && (
                      <div className="selected-badge">
                        <Check size={16} /> Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Booking Details */}
          {currentStep === 5 && (
            <div className="step-content">
              <h3>Booking & Delivery</h3>
              <p className="step-description">
                Select date, time, and delivery preferences
              </p>

              <div className="booking-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={booking?.customerName || ''}
                    onChange={(e) =>
                      setBooking({ ...booking, customerName: e.target.value } as BookingDetails)
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input
                    type="tel"
                    value={booking?.whatsappNumber || ''}
                    onChange={(e) =>
                      setBooking({ ...booking, whatsappNumber: e.target.value } as BookingDetails)
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={booking?.date || ''}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <select
                      value={booking?.time || ''}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      disabled={!booking?.date}
                    >
                      <option value="">Select time</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const hour = i + 9; // 9 AM to 8 PM
                        const time = `${hour.toString().padStart(2, '0')}:00`;
                        const slotKey = booking?.date ? `${booking.date}T${time}` : '';
                        const available = slotKey ? isSlotAvailable(slotKey) : false;
                        return (
                          <option key={time} value={time} disabled={!available}>
                            {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
                            {!available ? ' (Booked)' : ''}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Delivery Type</label>
                  <div className="delivery-type-options">
                    <button
                      className={`delivery-option ${
                        booking?.deliveryType === 'pickup' ? 'selected' : ''
                      }`}
                      onClick={() => handleDeliveryTypeChange('pickup')}
                    >
                      📍 Store Pickup
                    </button>
                    <button
                      className={`delivery-option ${
                        booking?.deliveryType === 'delivery' ? 'selected' : ''
                      }`}
                      onClick={() => handleDeliveryTypeChange('delivery')}
                    >
                      🚚 Home Delivery
                    </button>
                  </div>
                </div>

                {booking?.deliveryType === 'pickup' ? (
                  <div className="form-group">
                    <label>Pickup Location</label>
                    <div className="pickup-location-options">
                      {['Manish Nagar', 'Khamla'].map((location) => (
                        <button
                          key={location}
                          className={`pickup-option ${
                            booking?.pickupLocation === location ? 'selected' : ''
                          }`}
                          onClick={() =>
                            handlePickupLocationChange(location as 'Manish Nagar' | 'Khamla')
                          }
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Delivery Location</label>
                    <input
                      type="text"
                      value={mapsLink}
                      onChange={(e) => setMapsLink(e.target.value)}
                      placeholder="Paste Google Maps link here"
                    />
                    <p className="form-hint">
                      Drop a pin or paste your Google Maps location link
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Live Summary Sidebar */}
        <div className="customizer-sidebar">
          <h4>Order Summary</h4>
          <div className="summary-details">
            <div className="summary-item">
              <span>Product Type</span>
              <strong>
                {PRODUCT_TYPES.find((p) => p.type === customization.productType)?.name}
              </strong>
            </div>
            {customization.budgetTier && (
              <div className="summary-item">
                <span>Budget</span>
                <strong>₹{customization.budgetTier.toLocaleString()}</strong>
              </div>
            )}
            {customization.selectedFlowers.length > 0 && (
              <div className="summary-section">
                <span>Flowers</span>
                {customization.selectedFlowers.map((f, idx: number) => (
                  <div key={idx} className="summary-subitem">
                    <span>
                      {getFlowerName(f.speciesId)} ({f.color}) × {f.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {customization.selectedFillers.length > 0 && (
              <div className="summary-section">
                <span>Fillers</span>
                {customization.selectedFillers.map((f, idx: number) => (
                  <div key={idx} className="summary-subitem">
                    <span>
                      {getFillerName(f.fillerId)} × {f.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {customization.wrappingStyle && (
              <div className="summary-item">
                <span>Wrapping</span>
                <strong>{getWrappingName(customization.wrappingStyle)}</strong>
              </div>
            )}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString()}</strong>
          </div>

          {/* Navigation Buttons */}
          <div className="customizer-actions">
            {currentStep > 1 && (
              <button className="nav-btn prev" onClick={() => setCurrentStep(currentStep - 1)}>
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                className="nav-btn next"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !canProceedFromStep1) ||
                  (currentStep === 2 && !canProceedFromStep2) ||
                  (currentStep === 4 && !canProceedFromStep4)
                }
              >
                Next
              </button>
            ) : (
              <button
                className="nav-btn confirm"
                onClick={handleConfirmOrder}
                disabled={
                  !booking?.customerName ||
                  !booking?.whatsappNumber ||
                  !booking?.date ||
                  !booking?.time ||
                  (booking.deliveryType === 'delivery' && !mapsLink)
                }
              >
                Proceed to Book This Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

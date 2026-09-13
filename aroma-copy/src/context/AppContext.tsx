import { createContext, useContext, useState, useCallback } from 'react';
import type { 
  CustomizationState, 
  BookingDetails, 
  Order, 
  ProductType,
  InventoryItem,
  ShopInventory,
  BudgetTier,
  WrappingStyle
} from '../types';
import { FLOWERS, FILLERS, WRAPPING_STYLES, BUDGET_TIERS } from '../types';

interface AppContextType {
  // Authentication
  currentUser: { id: string; name: string; email: string; phone: string } | null;
  login: (user: { id: string; name: string; email: string; phone: string }) => void;
  logout: () => void;
  
  // Customization
  customisation: CustomizationState;
  setProductType: (type: ProductType) => void;
  setBudgetTier: (tier: BudgetTier | null) => void;
  addFlower: (speciesId: string, color: string, quantity: number) => void;
  removeFlower: (speciesId: string, color: string) => void;
  updateFlowerQuantity: (speciesId: string, color: string, quantity: number) => void;
  addFiller: (fillerId: string, quantity: number) => void;
  removeFiller: (fillerId: string) => void;
  updateFillerQuantity: (fillerId: string, quantity: number) => void;
  setWrappingStyle: (style: WrappingStyle | null) => void;
  resetCustomization: () => void;
  calculateTotal: () => number;
  
  // Booking
  booking: BookingDetails | null;
  setBooking: (booking: BookingDetails | null) => void;
  createOrder: () => Order | null;
  
  // Orders
  orders: Order[];
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  uploadReadyPhoto: (orderId: string, photoUrl: string) => void;
  
  // Inventory
  inventory: ShopInventory[];
  updateInventory: (shopId: string, itemId: string, updates: Partial<InventoryItem>) => void;
  getAvailableFlowers: (budgetAmount: number) => typeof FLOWERS;
  getAvailableFillers: () => typeof FILLERS;
  getApplicableWrappingStyles: (productType: ProductType) => typeof WRAPPING_STYLES;
  
  // Calendar
  bookedSlots: string[];
  addBookedSlot: (slot: string) => void;
  isSlotAvailable: (dateTime: string) => boolean;
}

export const AppContext = createContext<AppContextType | null>(null);

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Format date-time for calendar slot key
const formatSlotKey = (date: string, time: string) => `${date}T${time}`;

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string; phone: string } | null>(null);
  
  const login = useCallback((user: { id: string; name: string; email: string; phone: string }) => {
    setCurrentUser(user);
  }, []);
  
  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);
  
  // Customization state
  const [customisation, setCustomization] = useState<CustomizationState>({
    productType: 'bouquet',
    budgetTier: null,
    selectedFlowers: [],
    selectedFillers: [],
    wrappingStyle: null,
    addOns: [],
  });

  // Booking state
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);

  // Booked calendar slots (format: "YYYY-MM-DDTHH:MM")
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Inventory state (two shops)
  const [inventory, setInventory] = useState<ShopInventory[]>([
    {
      id: 'manish-nagar',
      shopId: 'manish-nagar',
      items: [
        ...FLOWERS.map(f => ({
          id: f.id,
          name: f.name,
          type: 'flower' as const,
          stockByShop: {
            'manish-nagar': { quantity: 100, status: 'in-stock' as const },
            'khamla': { quantity: 80, status: 'in-stock' as const }
          },
          pricePerUnit: f.basePrice,
          unit: 'stem',
          isActive: true,
          lastUpdated: new Date(),
        })),
        ...FILLERS.map(f => ({
          id: f.id,
          name: f.name,
          type: 'filler' as const,
          stockByShop: {
            'manish-nagar': { quantity: 50, status: 'in-stock' as const },
            'khamla': { quantity: 40, status: 'in-stock' as const }
          },
          pricePerUnit: f.price,
          unit: 'unit',
          isActive: true,
          lastUpdated: new Date(),
        })),
        ...WRAPPING_STYLES.map(w => ({
          id: w.id,
          name: w.name,
          type: 'material' as const,
          stockByShop: {
            'manish-nagar': { quantity: 30, status: 'in-stock' as const },
            'khamla': { quantity: 25, status: 'in-stock' as const }
          },
          pricePerUnit: w.price,
          unit: 'piece',
          isActive: true,
          lastUpdated: new Date(),
        })),
      ],
    },
    {
      id: 'khamla',
      shopId: 'khamla',
      items: [
        ...FLOWERS.map(f => ({
          id: f.id,
          name: f.name,
          type: 'flower' as const,
          stockByShop: {
            'manish-nagar': { quantity: 100, status: 'in-stock' as const },
            'khamla': { quantity: 80, status: 'in-stock' as const }
          },
          pricePerUnit: f.basePrice,
          unit: 'stem',
          isActive: true,
          lastUpdated: new Date(),
        })),
        ...FILLERS.map(f => ({
          id: f.id,
          name: f.name,
          type: 'filler' as const,
          stockByShop: {
            'manish-nagar': { quantity: 50, status: 'in-stock' as const },
            'khamla': { quantity: 40, status: 'in-stock' as const }
          },
          pricePerUnit: f.price,
          unit: 'unit',
          isActive: true,
          lastUpdated: new Date(),
        })),
        ...WRAPPING_STYLES.map(w => ({
          id: w.id,
          name: w.name,
          type: 'material' as const,
          stockByShop: {
            'manish-nagar': { quantity: 30, status: 'in-stock' as const },
            'khamla': { quantity: 25, status: 'in-stock' as const }
          },
          pricePerUnit: w.price,
          unit: 'piece',
          isActive: true,
          lastUpdated: new Date(),
        })),
      ],
    },
  ]);

  // Calculate total price
  const calculateTotal = useCallback(() => {
    let total = 0;

    // Add flower costs
    customisation.selectedFlowers.forEach(({ speciesId, quantity }) => {
      const flower = FLOWERS.find(f => f.id === speciesId);
      if (flower) {
        total += flower.basePrice * quantity;
      }
    });

    // Add filler costs
    customisation.selectedFillers.forEach(({ fillerId, quantity }) => {
      const filler = FILLERS.find(f => f.id === fillerId);
      if (filler) {
        total += filler.price * quantity;
      }
    });

    // Add wrapping cost
    if (customisation.wrappingStyle) {
      const wrapping = WRAPPING_STYLES.find(w => w.id === customisation.wrappingStyle?.id);
      if (wrapping) {
        total += wrapping.price;
      }
    }

    return total;
  }, [customisation]);

  // Set product type
  const setProductType = useCallback((type: ProductType) => {
    setCustomization(prev => ({
      ...prev,
      productType: type,
      wrappingStyle: null, // Reset wrapping when product type changes
    }));
  }, []);

  // Set budget tier
  const setBudgetTier = useCallback((tier: BudgetTier | null) => {
    setCustomization(prev => ({
      ...prev,
      budgetTier: tier,
    }));
  }, []);

  // Get unlocked flower categories based on budget
  const getUnlockedCategories = useCallback((budgetAmount: number | null) => {
    if (!budgetAmount) return ['seasonal'] as const;
    const tier = BUDGET_TIERS.find(t => t.amount === budgetAmount);
    return tier?.unlockedFlowers || ['seasonal'];
  }, []);

  // Get available flowers based on budget
  const getAvailableFlowers = useCallback((budgetAmount: number) => {
    const unlockedCategories = getUnlockedCategories(budgetAmount);
    return FLOWERS.filter(f => unlockedCategories.includes(f.category as any) );
  }, [getUnlockedCategories]);

  // Get available fillers
  const getAvailableFillers = useCallback(() => {
    return FILLERS.filter(f => f);
  }, []);

  // Get applicable wrapping styles
  const getApplicableWrappingStyles = useCallback((productType: ProductType) => {
    return WRAPPING_STYLES.filter(w => w.productTypes.includes(productType));
  }, []);

  // Add flower to customisation
  const addFlower = useCallback((speciesId: string, color: string, quantity: number) => {
    setCustomization(prev => {
      const existingIndex = prev.selectedFlowers.findIndex(
        f => f.speciesId === speciesId && f.color === color
      );

      if (existingIndex >= 0) {
        const updated = [...prev.selectedFlowers];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return { ...prev, selectedFlowers: updated };
      } else {
        return {
          ...prev,
          selectedFlowers: [...prev.selectedFlowers, { speciesId, color, quantity }],
        };
      }
    });
  }, []);

  // Remove flower from customisation
  const removeFlower = useCallback((speciesId: string, color: string) => {
    setCustomization(prev => ({
      ...prev,
      selectedFlowers: prev.selectedFlowers.filter(
        f => !(f.speciesId === speciesId && f.color === color)
      ),
    }));
  }, []);

  // Update flower quantity
  const updateFlowerQuantity = useCallback((speciesId: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFlower(speciesId, color);
      return;
    }

    setCustomization(prev => ({
      ...prev,
      selectedFlowers: prev.selectedFlowers.map(f =>
        f.speciesId === speciesId && f.color === color ? { ...f, quantity } : f
      ),
    }));
  }, [removeFlower]);

  // Add filler to customisation
  const addFiller = useCallback((fillerId: string, quantity: number) => {
    setCustomization(prev => {
      const existing = prev.selectedFillers.find(f => f.fillerId === fillerId);

      if (existing) {
        return {
          ...prev,
          selectedFillers: prev.selectedFillers.map(f =>
            f.fillerId === fillerId ? { ...f, quantity: f.quantity + quantity } : f
          ),
        };
      } else {
        return {
          ...prev,
          selectedFillers: [...prev.selectedFillers, { fillerId, quantity }],
        };
      }
    });
  }, []);

  // Remove filler from customisation
  const removeFiller = useCallback((fillerId: string) => {
    setCustomization(prev => ({
      ...prev,
      selectedFillers: prev.selectedFillers.filter(f => f.fillerId !== fillerId),
    }));
  }, []);

  // Update filler quantity
  const updateFillerQuantity = useCallback((fillerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFiller(fillerId);
      return;
    }

    setCustomization(prev => ({
      ...prev,
      selectedFillers: prev.selectedFillers.map(f =>
        f.fillerId === fillerId ? { ...f, quantity } : f
      ),
    }));
  }, [removeFiller]);

  // Set wrapping style
  const setWrappingStyle = useCallback((style: WrappingStyle | null) => {
    setCustomization(prev => ({
      ...prev,
      wrappingStyle: style,
    }));
  }, []);

  // Reset customisation
  const resetCustomization = useCallback(() => {
    setCustomization({
      productType: 'bouquet',
      budgetTier: null,
      selectedFlowers: [],
      selectedFillers: [],
      wrappingStyle: null,
      addOns: [],
    });
    setBooking(null);
  }, []);

  // Check if slot is available
  const isSlotAvailable = useCallback((dateTime: string) => {
    return !bookedSlots.includes(dateTime);
  }, [bookedSlots]);

  // Add booked slot
  const addBookedSlot = useCallback((slot: string) => {
    setBookedSlots(prev => [...prev, slot]);
  }, []);

  // Create order
  const createOrder = useCallback(() => {
    if (!booking || customisation.selectedFlowers.length === 0) {
      return null;
    }

    const order: Order = {
      id: generateId(),
      userId: 'guest',
      productType: customisation.productType || 'bouquet',
      customisation: { ...customisation },
      booking: { ...booking },
      status: 'received',
      totalPrice: calculateTotal(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrders(prev => [...prev, order]);
    addBookedSlot(formatSlotKey(booking.date, booking.time));

    return order;
  }, [booking, customisation, calculateTotal, addBookedSlot]);

  // Get order by ID
  const getOrderById = useCallback((id: string) => {
    return orders.find(o => o.id === id);
  }, [orders]);

  // Update order status
  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  // Upload ready photo
  const uploadReadyPhoto = useCallback((orderId: string, photoUrl: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, readyPhotoUrl: photoUrl } : order
      )
    );
  }, []);

  // Update inventory
  const updateInventory = useCallback((shopId: string, itemId: string, updates: Partial<InventoryItem>) => {
    setInventory(prev =>
      prev.map(shop =>
        shop.shopId === shopId
          ? {
              ...shop,
              items: shop.items.map(item =>
                item.id === itemId ? { ...item, ...updates } : item
              ),
            }
          : shop
      )
    );
  }, []);

  const value: AppContextType = {
    currentUser,
    login,
    logout,
    customisation,
    setProductType,
    setBudgetTier,
    addFlower,
    removeFlower,
    updateFlowerQuantity,
    addFiller,
    removeFiller,
    updateFillerQuantity,
    setWrappingStyle,
    resetCustomization,
    calculateTotal,
    booking,
    setBooking,
    createOrder,
    orders,
    getOrderById,
    updateOrderStatus,
    uploadReadyPhoto,
    inventory,
    updateInventory,
    getAvailableFlowers,
    getAvailableFillers,
    getApplicableWrappingStyles,
    bookedSlots,
    addBookedSlot,
    isSlotAvailable,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

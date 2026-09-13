// Product Types
export type ProductType = 'bouquet' | 'basket' | 'varmala' | 'jewellery' | 'decor';

// Budget Tiers
export interface BudgetTier {
  id: string;
  label: string;
  price: number;
  category: 'everyday' | 'premium' | 'luxury';
  amount: number; // alias for price (for backward compatibility)
  isPremium: boolean; // computed flag
  unlockedFlowers: string[]; // flower categories unlocked at this tier
}

// Flower Species
export interface FlowerSpecies {
  id: string;
  name: string;
  basePrice: number;
  colors: string[];
  category: 'seasonal' | 'standard' | 'premium';
}

// Fillers & Foliage
export interface FillerFoliage {
  id: string;
  name: string;
  pricePerUnit: number;
  price: number; // alias for pricePerUnit (for backward compatibility)
  unit: string;
}

// Wrapping Styles
export interface WrappingStyle {
  id: string;
  name: string;
  price: number;
  applicableTo: ProductType[];
  productTypes: ProductType[]; // alias for applicableTo
}

// Add-ons
export interface AddOn {
  id: string;
  name: string;
  price: number;
}

// Customization State
export interface CustomizationState {
  productType: ProductType | null;
  budgetTier: BudgetTier | null;
  selectedFlowers: Array<{
    speciesId: string;
    color: string;
    quantity: number;
  }>;
  selectedFillers: Array<{
    fillerId: string;
    quantity: number;
  }>;
  wrappingStyle: WrappingStyle | null;
  ribbonColor?: string;
  addOns?: AddOn[];
  inspirationImage?: string;
  visionNote?: string;
}

// Shop Locations
export interface ShopLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapsLink: string;
}

// User & Auth
export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  authMethod?: 'google' | 'phone' | 'email';
  signupDate?: string;
}

// Inventory
export interface InventoryItem {
  id: string;
  name: string;
  type: 'flower' | 'filler' | 'material';
  stockByShop: {
    manishNagar: number;
    khamla: number;
  };
  pricePerUnit: number;
  unit: string;
  isActive: boolean;
  availableFrom?: string;
  lastUpdated: string;
}

// Booking & Orders
export interface BookingDetails {
  date: string;
  time: string;
  deliveryType: 'delivery' | 'pickup';
  pickupLocation?: string;
  deliveryAddress?: string;
  mapsLink?: string;
  whatsappNumber: string;
  dateTime: string; // combined date-time for display
  customerName: string; // added for order summary
  googleMapsLink?: string; // alias for mapsLink
  shopLocation?: string; // for pickup location display
}

export type OrderStatus = 'received' | 'in-progress' | 'ready' | 'out-for-delivery' | 'delivered';

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  productType: ProductType;
  customization: CustomizationState;
  booking: BookingDetails;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  readyPhoto?: string;
  occasion?: string; // for event tracking
}

// Constants
export const BUDGET_TIERS: BudgetTier[] = [
  { id: 'tier-100', label: '₹100', price: 100, amount: 100, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal'] },
  { id: 'tier-150', label: '₹150', price: 150, amount: 150, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal'] },
  { id: 'tier-200', label: '₹200', price: 200, amount: 200, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal', 'standard'] },
  { id: 'tier-300', label: '₹300', price: 300, amount: 300, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal', 'standard'] },
  { id: 'tier-400', label: '₹400', price: 400, amount: 400, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal', 'standard'] },
  { id: 'tier-500', label: '₹500', price: 500, amount: 500, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal', 'standard'] },
  { id: 'tier-700', label: '₹700', price: 700, amount: 700, category: 'everyday', isPremium: false, unlockedFlowers: ['seasonal', 'standard'] },
  { id: 'tier-1000', label: '₹1000', price: 1000, amount: 1000, category: 'premium', isPremium: true, unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { id: 'tier-1500', label: '₹1500', price: 1500, amount: 1500, category: 'premium', isPremium: true, unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { id: 'tier-2000', label: '₹2000', price: 2000, amount: 2000, category: 'premium', isPremium: true, unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { id: 'tier-3000', label: '₹3000', price: 3000, amount: 3000, category: 'luxury', isPremium: true, unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { id: 'tier-5000', label: '₹5000+ (Premium Collection)', price: 5000, amount: 5000, category: 'luxury', isPremium: true, unlockedFlowers: ['seasonal', 'standard', 'premium'] }
];

export const FLOWERS: FlowerSpecies[] = [
  { id: 'rose', name: 'Rose', basePrice: 15, colors: ['red', 'pink', 'white', 'yellow', 'peach'], category: 'standard' },
  { id: 'carnation', name: 'Carnation', basePrice: 10, colors: ['pink', 'white', 'red', 'yellow'], category: 'standard' },
  { id: 'lily', name: 'Lily', basePrice: 25, colors: ['white', 'pink', 'yellow'], category: 'premium' },
  { id: 'orchid', name: 'Orchid', basePrice: 50, colors: ['purple', 'white', 'pink'], category: 'premium' },
  { id: 'gerbera', name: 'Gerbera', basePrice: 20, colors: ['pink', 'yellow', 'orange', 'red', 'white'], category: 'standard' },
  { id: 'chrysanthemum', name: 'Chrysanthemum', basePrice: 12, colors: ['white', 'yellow', 'purple'], category: 'seasonal' },
  { id: 'marigold', name: 'Marigold', basePrice: 8, colors: ['orange', 'yellow'], category: 'seasonal' },
  { id: 'tuberose', name: 'Tuberose (Rajnigandha)', basePrice: 18, colors: ['white'], category: 'standard' },
  { id: 'jasmine', name: 'Jasmine (Mogra)', basePrice: 15, colors: ['white'], category: 'standard' },
  { id: 'gladiolus', name: 'Gladiolus', basePrice: 22, colors: ['pink', 'white', 'red', 'yellow'], category: 'standard' },
  { id: 'anthurium', name: 'Anthurium', basePrice: 35, colors: ['red', 'pink', 'white'], category: 'premium' },
  { id: 'bird-of-paradise', name: 'Bird of Paradise', basePrice: 60, colors: ['orange', 'blue'], category: 'premium' },
  { id: 'hydrangea', name: 'Hydrangea', basePrice: 45, colors: ['blue', 'pink', 'white', 'purple'], category: 'premium' },
  { id: 'peony', name: 'Peony', basePrice: 55, colors: ['pink', 'white', 'red'], category: 'premium' },
  { id: 'sunflower', name: 'Sunflower', basePrice: 15, colors: ['yellow'], category: 'seasonal' },
  { id: 'tulip', name: 'Tulip', basePrice: 30, colors: ['red', 'pink', 'yellow', 'white', 'purple'], category: 'premium' },
  { id: 'daisy', name: 'Daisy', basePrice: 10, colors: ['white', 'pink', 'yellow'], category: 'seasonal' },
  { id: 'lotus', name: 'Lotus', basePrice: 40, colors: ['pink', 'white'], category: 'premium' },
  { id: 'ixora', name: 'Ixora', basePrice: 12, colors: ['red', 'pink', 'yellow', 'white'], category: 'seasonal' },
  { id: 'seasonal', name: 'Local/Seasonal Flowers', basePrice: 8, colors: ['mixed'], category: 'seasonal' }
];

// Aliases for backward compatibility (must be after FILLERS declaration)
export const FLOWER_SPECIES = FLOWERS;

export const FILLERS: FillerFoliage[] = [
  { id: 'fern', name: 'Ferns', pricePerUnit: 5, price: 5, unit: 'stem' },
  { id: 'eucalyptus', name: 'Eucalyptus', pricePerUnit: 8, price: 8, unit: 'stem' },
  { id: 'money-plant', name: 'Money Plant Leaves', pricePerUnit: 4, price: 4, unit: 'leaf' },
  { id: 'babys-breath', name: "Baby's Breath (Gypsophila)", pricePerUnit: 6, price: 6, unit: 'stem' },
  { id: 'palm-leaves', name: 'Palm Leaves', pricePerUnit: 5, price: 5, unit: 'leaf' },
  { id: 'areca-leaves', name: 'Areca Leaves', pricePerUnit: 5, price: 5, unit: 'leaf' },
  { id: 'seasonal-foliage', name: 'Seasonal Foliage', pricePerUnit: 3, price: 3, unit: 'stem' }
];

// Alias for backward compatibility
export const FILLERS_FOLIAGE = FILLERS;

export const WRAPPING_STYLES: WrappingStyle[] = [
  { id: 'craft-paper', name: 'Craft Paper Wrap', price: 30, applicableTo: ['bouquet'], productTypes: ['bouquet'] },
  { id: 'cellophane', name: 'Cellophane Wrap', price: 25, applicableTo: ['bouquet'], productTypes: ['bouquet'] },
  { id: 'cloth-wrap', name: 'Cloth Wrap', price: 50, applicableTo: ['bouquet'], productTypes: ['bouquet'] },
  { id: 'box-wrap', name: 'Box Wrap', price: 60, applicableTo: ['bouquet'], productTypes: ['bouquet'] },
  { id: 'cane-basket', name: 'Cane Basket', price: 80, applicableTo: ['basket'], productTypes: ['basket'] },
  { id: 'ceramic-basket', name: 'Ceramic Basket', price: 120, applicableTo: ['basket'], productTypes: ['basket'] },
  { id: 'wooden-crate', name: 'Wooden Crate', price: 100, applicableTo: ['basket'], productTypes: ['basket'] },
  { id: 'single-strand', name: 'Single-Strand Thread Base', price: 40, applicableTo: ['varmala'], productTypes: ['varmala'] },
  { id: 'double-strand', name: 'Double-Strand Thread Base', price: 70, applicableTo: ['varmala'], productTypes: ['varmala'] },
  { id: 'thread-base', name: 'Thread Base (Jewellery)', price: 35, applicableTo: ['jewellery'], productTypes: ['jewellery'] },
  { id: 'wire-base', name: 'Wire Base', price: 45, applicableTo: ['jewellery'], productTypes: ['jewellery'] },
  { id: 'fabric-backing', name: 'Fabric Backing', price: 50, applicableTo: ['jewellery'], productTypes: ['jewellery'] },
  { id: 'arch-base', name: 'Grand Arch Base', price: 200, applicableTo: ['decor'], productTypes: ['decor'] }
];

export const ADD_ONS: AddOn[] = [
  { id: 'chocolates', name: 'Box of Chocolates', price: 150 },
  { id: 'greeting-card', name: 'Greeting Card', price: 30 },
  { id: 'teddy', name: 'Teddy Bear', price: 200 },
  { id: 'led-lights', name: 'LED Lights', price: 50 },
  { id: 'name-tag', name: 'Custom Name Tag', price: 40 }
];

export const SHOP_LOCATIONS: ShopLocation[] = [
  {
    id: 'manish-nagar',
    name: 'Aroma Flowers Corner (Manish Nagar)',
    address: 'Shop No 10, 11, Manik Park, opposite Union Bank of India, Santaji Society, Manish Nagar, Somalwada, Nagpur, Maharashtra 440037',
    phone: '+91 99231 06684',
    mapsLink: 'https://maps.google.com/?q=Manish+Nagar+Nagpur'
  },
  {
    id: 'khamla',
    name: 'Aroma Flowers Corner (Khamla)',
    address: 'Kalash Complex, Gulmohar Hall, Near Gulmohar Hall, Pande Layout, Khamla, Nagpur, Maharashtra',
    phone: '+91 99231 06684',
    mapsLink: 'https://maps.google.com/?q=Khamla+Nagpur'
  }
];

export const PRODUCT_TYPES: { id: ProductType; name: string; label: string }[] = [
  { id: 'bouquet', name: 'Hand-Tied Bouquets', label: 'Bouquets' },
  { id: 'basket', name: 'Flower Baskets', label: 'Baskets' },
  { id: 'varmala', name: 'Varmalas (Wedding Garlands)', label: 'Varmalas' },
  { id: 'jewellery', name: 'Floral Jewellery', label: 'Jewellery' },
  { id: 'decor', name: 'Event Décor', label: 'Décor' }
];

export const OCCASIONS = [
  { id: 'wedding', name: 'Weddings', description: 'Bridal bouquets, varmalas, mandap décor' },
  { id: 'baby-shower', name: 'Baby Showers', description: 'Floral jewellery, backdrop décor' },
  { id: 'birthday', name: 'Birthdays', description: 'Celebratory bouquets and arrangements' },
  { id: 'anniversary', name: 'Anniversaries', description: 'Romantic floral expressions' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', description: 'Garlands, mandap flowers, idol décor' },
  { id: 'mahalakshmi-puja', name: 'Mahalakshmi Puja', description: 'Traditional festival arrangements' },
  { id: 'navratri', name: 'Navratri', description: 'Festival-specific styling' },
  { id: 'welcome', name: 'Welcome Parties & Inaugurations', description: 'Corporate ribbon-cutting, entrance décor' },
  { id: 'sympathy', name: 'Sympathy & Condolence', description: 'Respectful tribute arrangements' },
  { id: 'just-because', name: 'Just Because', description: 'Everyday bouquets to brighten moments' }
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  'received': 'Received',
  'in-progress': 'In Progress',
  'ready': 'Ready',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered'
};

export const SHOPS = ['manishNagar', 'khamla'] as const;
export type ShopName = typeof SHOPS[number];

// Type alias for shop location keys (for inventory indexing)
export type ShopLocationKey = 'manishNagar' | 'khamla';

// Shop Inventory type (for owner dashboard)
export interface ShopInventory {
  flowers: InventoryItem[];
  fillers: InventoryItem[];
  materials: InventoryItem[];
}

// Export PRODUCTS array for Collection page
export const PRODUCTS = [] as any[]; // Placeholder - actual products are generated dynamically

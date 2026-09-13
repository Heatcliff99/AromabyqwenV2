// Types for Aroma Flowers Corner - Premium Floral E-commerce Platform

// Shop Locations
export type ShopLocation = 'manish-nagar' | 'khamla';

export interface ShopInfo {
  id: ShopLocation;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
}

export const SHOPS: ShopInfo[] = [
  {
    id: 'manish-nagar',
    name: 'Aroma Flowers Corner (Manish Nagar)',
    address: 'Shop No 10, 11, Manik Park, opposite Union Bank of India, Santaji Society, Manish Nagar, Somalwada, Nagpur, Maharashtra 440037',
    phone: '+91 99231 06684',
    mapUrl: 'https://maps.google.com/?q=Aroma+Flowers+Corner+Manish+Nagar+Nagpur'
  },
  {
    id: 'khamla',
    name: 'Aroma Flowers Corner (Khamla)',
    address: 'Kalash Complex, Gulmohar Hall, Near Gulmohar Hall, Pande Layout, Khamla, Nagpur, Maharashtra',
    phone: '+91 99231 06684',
    mapUrl: 'https://maps.google.com/?q=Aroma+Flowers+Corner+Khamla+Nagpur'
  }
];

// Budget Tiers
export interface BudgetTier {
  amount: number;
  label: string;
  unlockedFlowers: string[];
  isPremium?: boolean;
}

export const BUDGET_TIERS: BudgetTier[] = [
  { amount: 100, label: '₹100', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum'] },
  { amount: 150, label: '₹150', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum', 'carnation'] },
  { amount: 200, label: '₹200', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum', 'carnation', 'gerbera'] },
  { amount: 300, label: '₹300', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum', 'carnation', 'gerbera', 'rose'] },
  { amount: 400, label: '₹400', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum', 'carnation', 'gerbera', 'rose', 'lily'] },
  { amount: 500, label: '₹500', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum', 'carnation', 'gerbera', 'rose', 'lily', 'tuberose'] },
  { amount: 700, label: '₹700', unlockedFlowers: ['seasonal', 'marigold', 'chrysanthemum', 'carnation', 'gerbera', 'rose', 'lily', 'tuberose', 'jasmine'] },
  { amount: 1000, label: '₹1000', unlockedFlowers: ['all-standard'] },
  { amount: 1500, label: '₹1500', unlockedFlowers: ['all-standard', 'orchid'] },
  { amount: 2000, label: '₹2000', unlockedFlowers: ['all-standard', 'orchid', 'anthurium'] },
  { amount: 3000, label: '₹3000', unlockedFlowers: ['all-standard', 'orchid', 'anthurium', 'hydrangea'] },
  { amount: 5000, label: '₹5000+', unlockedFlowers: ['all'], isPremium: true }
];

// Flower Species
export interface FlowerSpecies {
  id: string;
  name: string;
  scientificName?: string;
  basePrice: number;
  category: 'seasonal' | 'standard' | 'premium' | 'imported';
  colors: string[];
  imageUrl?: string;
  availableFrom?: Date;
}

export const FLOWER_SPECIES: FlowerSpecies[] = [
  { id: 'rose', name: 'Rose', basePrice: 25, category: 'standard', colors: ['red', 'pink', 'white', 'yellow', 'peach', 'purple', 'orange'] },
  { id: 'carnation', name: 'Carnation', basePrice: 15, category: 'standard', colors: ['red', 'pink', 'white', 'yellow', 'purple'] },
  { id: 'lily', name: 'Lily', basePrice: 35, category: 'standard', colors: ['white', 'pink', 'yellow', 'orange'] },
  { id: 'orchid', name: 'Orchid', basePrice: 75, category: 'premium', colors: ['white', 'pink', 'purple', 'yellow'] },
  { id: 'gerbera', name: 'Gerbera', basePrice: 20, category: 'standard', colors: ['red', 'pink', 'white', 'yellow', 'orange', 'purple'] },
  { id: 'chrysanthemum', name: 'Chrysanthemum', basePrice: 12, category: 'seasonal', colors: ['white', 'yellow', 'pink', 'purple'] },
  { id: 'marigold', name: 'Marigold', basePrice: 8, category: 'seasonal', colors: ['orange', 'yellow'] },
  { id: 'tuberose', name: 'Tuberose (Rajnigandha)', basePrice: 30, category: 'standard', colors: ['white'] },
  { id: 'jasmine', name: 'Jasmine (Mogra)', basePrice: 25, category: 'standard', colors: ['white'] },
  { id: 'gladiolus', name: 'Gladiolus', basePrice: 28, category: 'standard', colors: ['red', 'pink', 'white', 'yellow', 'purple'] },
  { id: 'anthurium', name: 'Anthurium', basePrice: 65, category: 'premium', colors: ['red', 'pink', 'white'] },
  { id: 'bird-of-paradise', name: 'Bird of Paradise', basePrice: 85, category: 'imported', colors: ['orange', 'blue'] },
  { id: 'hydrangea', name: 'Hydrangea', basePrice: 95, category: 'premium', colors: ['blue', 'pink', 'white', 'purple'] },
  { id: 'peony', name: 'Peony', basePrice: 120, category: 'imported', colors: ['pink', 'white', 'red'] },
  { id: 'sunflower', name: 'Sunflower', basePrice: 18, category: 'seasonal', colors: ['yellow'] },
  { id: 'tulip', name: 'Tulip', basePrice: 45, category: 'imported', colors: ['red', 'pink', 'white', 'yellow', 'purple'] },
  { id: 'daisy', name: 'Daisy', basePrice: 10, category: 'seasonal', colors: ['white', 'pink', 'yellow'] },
  { id: 'lotus', name: 'Lotus', basePrice: 40, category: 'seasonal', colors: ['pink', 'white'] },
  { id: 'ixora', name: 'Ixora', basePrice: 10, category: 'seasonal', colors: ['red', 'pink', 'yellow', 'white'] },
  { id: 'baby-breath', name: "Baby's Breath (Gypsophila)", basePrice: 20, category: 'standard', colors: ['white', 'pink'] }
];

// Fillers & Foliage
export interface FillerFoliage {
  id: string;
  name: string;
  basePrice: number;
  price: number;
  type: 'filler' | 'foliage';
  imageUrl?: string;
}

export const FILLERS_FOLIAGE: FillerFoliage[] = [
  { id: 'fern', name: 'Ferns', basePrice: 15, price: 15, type: 'foliage' },
  { id: 'eucalyptus', name: 'Eucalyptus', basePrice: 25, price: 25, type: 'foliage' },
  { id: 'money-plant', name: 'Money Plant Leaves', basePrice: 12, price: 12, type: 'foliage' },
  { id: 'babys-breath', name: "Baby's Breath (Gypsophila)", basePrice: 20, price: 20, type: 'filler' },
  { id: 'palm-leaves', name: 'Palm Leaves', basePrice: 18, price: 18, type: 'foliage' },
  { id: 'areca-leaves', name: 'Areca Leaves', basePrice: 15, price: 15, type: 'foliage' },
  { id: 'seasonal-foliage', name: 'Seasonal Foliage', basePrice: 10, price: 10, type: 'foliage' }
];

// Wrapping/Base Styles by Product Type
export interface WrappingStyle {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  productTypes: string[];
  imageUrl?: string;
}

export const WRAPPING_STYLES: WrappingStyle[] = [
  { id: 'craft-paper', name: 'Craft Paper Wrap', basePrice: 50, price: 50, productTypes: ['bouquet'] },
  { id: 'cellophane', name: 'Cellophane Wrap', basePrice: 40, price: 40, productTypes: ['bouquet'] },
  { id: 'cloth-wrap', name: 'Cloth Wrap', basePrice: 80, price: 80, productTypes: ['bouquet'] },
  { id: 'box-wrap', name: 'Box Wrap', basePrice: 100, price: 100, productTypes: ['bouquet', 'basket'] },
  { id: 'cane-basket', name: 'Cane Basket', basePrice: 150, price: 150, productTypes: ['basket'] },
  { id: 'ceramic-basket', name: 'Ceramic Basket', basePrice: 250, price: 250, productTypes: ['basket'] },
  { id: 'wooden-crate', name: 'Wooden Crate', basePrice: 200, price: 200, productTypes: ['basket'] },
  { id: 'single-strand', name: 'Single Strand Base', basePrice: 100, price: 100, productTypes: ['varmala'] },
  { id: 'double-strand', name: 'Double Strand Base', basePrice: 180, price: 180, productTypes: ['varmala'] },
  { id: 'thread-base', name: 'Traditional Thread Base', basePrice: 120, price: 120, productTypes: ['varmala', 'jewellery'] },
  { id: 'velvet-box', name: 'Velvet Jewellery Box', basePrice: 200, price: 200, productTypes: ['jewellery'] },
  { id: 'arch-base', name: 'Grand Arch Base', basePrice: 500, price: 500, productTypes: ['event-decor'] },
  { id: 'mandap-base', name: 'Mandap Base Structure', basePrice: 800, price: 800, productTypes: ['event-decor'] },
  { id: 'stage-base', name: 'Stage Backdrop Base', basePrice: 600, price: 600, productTypes: ['event-decor'] }
];

// Ribbon Colors & Add-ons
export const RIBBON_COLORS = ['red', 'pink', 'white', 'gold', 'silver', 'purple', 'blue', 'green', 'orange', 'yellow'];

export interface AddOn {
  id: string;
  name: string;
  price: number;
  type: 'chocolate' | 'card' | 'teddy' | 'lights' | 'name-tag' | 'other';
}

export const ADD_ONS: AddOn[] = [
  { id: 'chocolates', name: 'Premium Chocolates Box', price: 150, type: 'chocolate' },
  { id: 'greeting-card', name: 'Handwritten Greeting Card', price: 25, type: 'card' },
  { id: 'teddy-small', name: 'Small Teddy Bear', price: 200, type: 'teddy' },
  { id: 'teddy-large', name: 'Large Teddy Bear', price: 400, type: 'teddy' },
  { id: 'led-lights', name: 'LED Fairy Lights', price: 100, type: 'lights' },
  { id: 'name-tag', name: 'Custom Name Tag', price: 50, type: 'name-tag' }
];

// Product Types
export type ProductType = 'bouquet' | 'basket' | 'varmala' | 'jewellery' | 'event-decor';

export interface ProductCategory {
  id: string;
  name: string;
  type: ProductType;
  label: string;
  description: string;
  basePrice: number;
  imageUrl: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'hand-tied-bouquets', name: 'Hand-Tied Bouquets', type: 'bouquet', label: 'Bouquet', description: 'Elegantly arranged fresh flower bouquets', basePrice: 150, imageUrl: '' },
  { id: 'flower-baskets', name: 'Flower Baskets', type: 'basket', label: 'Basket', description: 'Beautiful flowers in decorative baskets', basePrice: 300, imageUrl: '' },
  { id: 'varmalas', name: 'Varmalas (Wedding Garlands)', type: 'varmala', label: 'Varmala', description: 'Traditional wedding garlands', basePrice: 500, imageUrl: '' },
  { id: 'floral-jewellery', name: 'Floral Jewellery', type: 'jewellery', label: 'Jewellery', description: 'Hair flowers, hasta phool, maang tikka', basePrice: 400, imageUrl: '' },
  { id: 'event-decor', name: 'Event Décor', type: 'event-decor', label: 'Event Décor', description: 'Mandap, entrance, stage, car décor', basePrice: 2000, imageUrl: '' }
];

// Occasions & Festivals
export interface Occasion {
  id: string;
  name: string;
  description: string;
  recommendedBudget: number;
  suggestedFlowers: string[];
  imageUrl?: string;
}

export const OCCASIONS: Occasion[] = [
  { id: 'weddings', name: 'Weddings', description: 'Bridal bouquets, varmalas, mandap décor, haldi flowers', recommendedBudget: 3000, suggestedFlowers: ['rose', 'orchid', 'jasmine', 'marigold'], imageUrl: '' },
  { id: 'baby-shower', name: 'Baby Showers', description: 'Floral jewellery, backdrop décor', recommendedBudget: 1500, suggestedFlowers: ['rose', 'carnation', 'baby-breath'], imageUrl: '' },
  { id: 'birthday', name: 'Birthdays', description: 'Celebratory bouquets and arrangements', recommendedBudget: 500, suggestedFlowers: ['rose', 'gerbera', 'lily'], imageUrl: '' },
  { id: 'anniversary', name: 'Anniversaries', description: 'Romantic arrangements for your special day', recommendedBudget: 1000, suggestedFlowers: ['rose', 'orchid', 'lily'], imageUrl: '' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', description: 'Garlands, mandap flowers, idol décor, thali décor', recommendedBudget: 800, suggestedFlowers: ['marigold', 'jasmine', 'lotus'], imageUrl: '' },
  { id: 'mahalakshmi-puja', name: 'Mahalakshmi Puja', description: 'Festival-specific floral arrangements', recommendedBudget: 700, suggestedFlowers: ['lotus', 'marigold', 'rose'], imageUrl: '' },
  { id: 'navratri', name: 'Navratri', description: 'Traditional festival decorations', recommendedBudget: 1000, suggestedFlowers: ['marigold', 'rose', 'jasmine'], imageUrl: '' },
  { id: 'welcome-inauguration', name: 'Welcome Parties & Inaugurations', description: 'Corporate ribbon-cutting, entrance décor', recommendedBudget: 2000, suggestedFlowers: ['orchid', 'lily', 'rose'], imageUrl: '' },
  { id: 'sympathy', name: 'Sympathy & Condolence', description: 'Respectful arrangements', recommendedBudget: 600, suggestedFlowers: ['lily', 'chrysanthemum', 'white-rose'], imageUrl: '' },
  { id: 'just-because', name: 'Just Because', description: 'Everyday bouquets to brighten someone\'s day', recommendedBudget: 300, suggestedFlowers: ['rose', 'gerbera', 'carnation'], imageUrl: '' }
];

// Order Status
export type OrderStatus = 'received' | 'in-progress' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  'received': 'Received',
  'in-progress': 'In Progress',
  'ready': 'Ready',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
  'cancelled': 'Cancelled'
};

// User & Authentication
export interface User {
  id: string;
  email?: string;
  phone: string;
  fullName: string;
  deliveryAddress?: string;
  referralSource?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
}

// Inventory Item
export interface InventoryItem {
  id: string;
  name: string;
  type: 'flower' | 'filler' | 'material';
  categoryId?: string;
  stockByShop: Record<ShopLocation, {
    quantity: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
    availableFrom?: Date;
  }>;
  pricePerUnit: number;
  unit: string;
  isActive: boolean;
  lastUpdated: Date;
}

// Customisation Selection
export interface CustomisationSelection {
  budgetTier: BudgetTier;
  selectedFlowers: Array<{
    speciesId: string;
    color: string;
    quantity: number;
  }>;
  selectedFillers: Array<{
    fillerId: string;
    quantity: number;
  }>;
  wrappingStyle?: WrappingStyle;
  ribbonColor?: string;
  addOns: AddOn[];
  inspirationImage?: string;
  visionNote?: string;
}

// Booking Details
export interface BookingDetails {
  date: string;
  time: string;
  dateTime?: Date;
  deliveryType: 'delivery' | 'pickup';
  pickupLocation?: string;
  shopLocation?: ShopLocation;
  googleMapsLink?: string;
  whatsappNumber: string;
  customerName: string;
  customerNotes?: string;
}

// Order
export interface Order {
  id: string;
  userId: string;
  productType: ProductType;
  productCategory?: string;
  occasion?: string;
  customisation: CustomisationSelection;
  booking: BookingDetails;
  status: OrderStatus;
  totalPrice: number;
  readyPhotoUrl?: string;
  calendarEventId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Calendar Slot
export interface CalendarSlot {
  dateTime: Date;
  isBooked: boolean;
  orderId?: string;
  shopLocation: ShopLocation;
}

// Testimonial
export interface Testimonial {
  id: string;
  customerName: string;
  occasion: string;
  quote: string;
  rating: number;
  photoUrl?: string;
  isApproved: boolean;
  createdAt: Date;
}

// Contact Enquiry
export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  occasion?: string;
  date?: Date;
  message: string;
  shopPreference?: ShopLocation;
  status: 'new' | 'contacted' | 'converted';
  createdAt: Date;
}

// Admin Dashboard Stats
export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  todaysOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  lowStockItems: number;
  outOfStockItems: number;
}

// Customization State
export interface CustomizationState {
  productType: ProductType | null;
  budgetTier: number | null;
  selectedFlowers: Array<{
    speciesId: string;
    color: string;
    quantity: number;
  }>;
  selectedFillers: Array<{
    fillerId: string;
    quantity: number;
  }>;
  wrappingStyle: string | null;
  ribbonColor?: string;
  addOns: AddOn[];
  inspirationImage?: string;
  visionNote?: string;
}

// Shop Inventory
export interface ShopInventory {
  id: string;
  shopId: ShopLocation;
  items: InventoryItem[];
}

// Export constants for use in components
export const FLOWERS = FLOWER_SPECIES;
export const FILLERS = FILLERS_FOLIAGE;
export const PRODUCT_TYPES = PRODUCT_CATEGORIES;

// Sample products for collection page
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  label?: string;
}

export const products: Product[] = [
  { id: 'prod1', name: 'Rose Bouquet', price: 899, image: 'https://images.unsplash.com/photo-1563241527-300e278d9f41?w=500&h=600&fit=crop', category: 'bouquets', label: 'Bouquet' },
  { id: 'prod2', name: 'Peony Arrangement', price: 1299, image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500&h=600&fit=crop', category: 'bouquets', label: 'Bouquet' },
  { id: 'prod3', name: 'Lavender Bundle', price: 599, image: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&h=600&fit=crop', category: 'bouquets', label: 'Bouquet' },
  { id: 'prod4', name: 'Wedding Varmala', price: 5000, image: 'https://images.unsplash.com/photo-1518709322009-8f85eb2b8b2e?w=500&h=600&fit=crop', category: 'varmalas', label: 'Varmala' },
  { id: 'prod5', name: 'Floral Jewellery Set', price: 2500, image: 'https://images.unsplash.com/photo-1523694576729-dc78a7a88ddc?w=500&h=600&fit=crop', category: 'jewellery', label: 'Jewellery' },
  { id: 'prod6', name: 'Event Décor Package', price: 15000, image: 'https://images.unsplash.com/photo-1516196182-6c6df6cb91b7?w=500&h=600&fit=crop', category: 'decor', label: 'Event Décor' }
];

// Occasions with gallery images
export interface OccasionWithGallery extends Occasion {
  gallery?: string[];
}

export const occasions: OccasionWithGallery[] = OCCASIONS.map(occ => ({
  ...occ,
  gallery: [
    'https://images.unsplash.com/photo-1519225421980-715cb0202128?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop'
  ]
}));

// Shop locations with embed maps
export interface ShopLocationWithEmbed extends ShopInfo {
  mapEmbed: string;
  mapLink: string;
}

export const shopLocations: ShopLocationWithEmbed[] = SHOPS.map(shop => ({
  ...shop,
  mapEmbed: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(shop.address)}`,
  mapLink: shop.mapUrl
}));

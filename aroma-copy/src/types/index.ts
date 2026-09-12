// Flower and product data types

export interface Flower {
  id: string;
  name: string;
  colors: string[];
  basePrice: number; // per stem
  category: 'premium' | 'standard' | 'seasonal';
  inStock: boolean;
  availableFrom?: Date;
}

export interface Filler {
  id: string;
  name: string;
  price: number; // per unit
  inStock: boolean;
  availableFrom?: Date;
}

export interface WrappingStyle {
  id: string;
  name: string;
  price: number;
  applicableTo: ProductType[];
  image?: string;
}

export type ProductType = 'bouquet' | 'basket' | 'varmala' | 'jewellery' | 'decor';

export interface BudgetTier {
  amount: number;
  label: string;
  isPremium?: boolean;
  unlockedFlowers: Flower['category'][];
}

export interface CustomizationState {
  productType: ProductType;
  budgetTier: number | null;
  selectedFlowers: Array<{
    flowerId: string;
    color: string;
    quantity: number;
  }>;
  selectedFillers: Array<{
    fillerId: string;
    quantity: number;
  }>;
  wrappingStyleId: string | null;
}

export interface BookingDetails {
  date: string;
  time: string;
  deliveryType: 'pickup' | 'delivery';
  pickupLocation?: 'Manish Nagar' | 'Khamla';
  deliveryLocation?: {
    address: string;
    mapsLink: string;
  };
  whatsappNumber: string;
  customerName: string;
}

export interface Order {
  id: string;
  customization: CustomizationState;
  booking: BookingDetails;
  status: 'received' | 'in_progress' | 'ready' | 'out_for_delivery' | 'delivered';
  totalPrice: number;
  createdAt: Date;
  readyPhotoUrl?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'flower' | 'filler' | 'material';
  stockLevel: 'in_stock' | 'low' | 'out_of_stock';
  quantity: number;
  availableFrom?: Date;
  price: number;
}

export interface ShopInventory {
  shopId: 'manish_nagar' | 'khamla';
  items: InventoryItem[];
}

export const BUDGET_TIERS: BudgetTier[] = [
  { amount: 100, label: '₹100', unlockedFlowers: ['seasonal'] },
  { amount: 150, label: '₹150', unlockedFlowers: ['seasonal'] },
  { amount: 200, label: '₹200', unlockedFlowers: ['seasonal', 'standard'] },
  { amount: 300, label: '₹300', unlockedFlowers: ['seasonal', 'standard'] },
  { amount: 400, label: '₹400', unlockedFlowers: ['seasonal', 'standard'] },
  { amount: 500, label: '₹500', unlockedFlowers: ['seasonal', 'standard'] },
  { amount: 700, label: '₹700', unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { amount: 1000, label: '₹1,000', unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { amount: 1500, label: '₹1,500', unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { amount: 2000, label: '₹2,000', unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { amount: 3000, label: '₹3,000', unlockedFlowers: ['seasonal', 'standard', 'premium'] },
  { amount: 5000, label: '₹5,000+', isPremium: true, unlockedFlowers: ['seasonal', 'standard', 'premium'] },
];

export const FLOWERS: Flower[] = [
  { id: 'rose', name: 'Rose', colors: ['#E63946', '#FFB7B2', '#FFFFFF', '#FFD700', '#FF69B4'], basePrice: 25, category: 'standard', inStock: true },
  { id: 'carnation', name: 'Carnation', colors: ['#FF6B6B', '#FFE66D', '#FFFFFF', '#FF85A2'], basePrice: 15, category: 'seasonal', inStock: true },
  { id: 'lily', name: 'Lily', colors: ['#FFFFFF', '#FFD700', '#FF69B4'], basePrice: 40, category: 'standard', inStock: true },
  { id: 'orchid', name: 'Orchid', colors: ['#DA70D6', '#FFFFFF', '#FFD700'], basePrice: 80, category: 'premium', inStock: true },
  { id: 'gerbera', name: 'Gerbera', colors: ['#FF6B6B', '#FFD93D', '#FF85A2', '#FFFFFF'], basePrice: 30, category: 'standard', inStock: true },
  { id: 'chrysanthemum', name: 'Chrysanthemum', colors: ['#FFFFFF', '#FFD700', '#FF69B4'], basePrice: 20, category: 'seasonal', inStock: true },
  { id: 'marigold', name: 'Marigold', colors: ['#FFA500', '#FFD700'], basePrice: 10, category: 'seasonal', inStock: true },
  { id: 'tuberose', name: 'Tuberose', colors: ['#FFFFFF'], basePrice: 35, category: 'standard', inStock: true },
  { id: 'jasmine', name: 'Jasmine', colors: ['#FFFFFF', '#FFFACD'], basePrice: 25, category: 'seasonal', inStock: true },
  { id: 'gladiolus', name: 'Gladiolus', colors: ['#FF69B4', '#FFFFFF', '#FFD700'], basePrice: 30, category: 'standard', inStock: true },
  { id: 'anthurium', name: 'Anthurium', colors: ['#E63946', '#FFFFFF', '#FF69B4'], basePrice: 60, category: 'premium', inStock: true },
  { id: 'hydrangea', name: 'Hydrangea', colors: ['#6A5ACD', '#FF69B4', '#FFFFFF'], basePrice: 70, category: 'premium', inStock: true },
  { id: 'peony', name: 'Peony', colors: ['#FFB7B2', '#FFFFFF', '#FF69B4'], basePrice: 90, category: 'premium', inStock: true },
  { id: 'sunflower', name: 'Sunflower', colors: ['#FFD700'], basePrice: 35, category: 'seasonal', inStock: true },
  { id: 'tulip', name: 'Tulip', colors: ['#FF69B4', '#FFFFFF', '#FFD700', '#E63946'], basePrice: 45, category: 'standard', inStock: true },
  { id: 'lotus', name: 'Lotus', colors: ['#FFB7B2', '#FFFFFF'], basePrice: 50, category: 'premium', inStock: true },
];

export const FILLERS: Filler[] = [
  { id: 'fern', name: 'Fern', price: 15, inStock: true },
  { id: 'eucalyptus', name: 'Eucalyptus', price: 25, inStock: true },
  { id: 'money_plant', name: 'Money Plant Leaves', price: 10, inStock: true },
  { id: 'babys_breath', name: "Baby's Breath", price: 20, inStock: true },
  { id: 'palm_areca', name: 'Palm/Areca Leaves', price: 12, inStock: true },
];

export const WRAPPING_STYLES: WrappingStyle[] = [
  { id: 'classic_paper', name: 'Classic Paper Wrap', price: 50, applicableTo: ['bouquet'] },
  { id: 'luxury_fabric', name: 'Luxury Fabric Wrap', price: 150, applicableTo: ['bouquet'] },
  { id: 'transparent_cello', name: 'Transparent Cellophane', price: 40, applicableTo: ['bouquet'] },
  { id: 'wicker_basket', name: 'Wicker Basket', price: 200, applicableTo: ['basket'] },
  { id: 'wooden_crate', name: 'Wooden Crate', price: 350, applicableTo: ['basket'] },
  { id: 'traditional_thread', name: 'Traditional Thread Base', price: 100, applicableTo: ['varmala'] },
  { id: 'premium_floral_foam', name: 'Premium Floral Foam Base', price: 150, applicableTo: ['varmala', 'decor'] },
  { id: 'jewellery_box', name: 'Velvet Jewellery Box', price: 250, applicableTo: ['jewellery'] },
  { id: 'minimalist_stand', name: 'Minimalist Display Stand', price: 500, applicableTo: ['decor'] },
  { id: 'grand_arch', name: 'Grand Arch Base', price: 2000, applicableTo: ['decor'] },
];

export const PRODUCT_TYPES: { value: ProductType; label: string; icon: string }[] = [
  { value: 'bouquet', label: 'Bouquets', icon: '🌸' },
  { value: 'basket', label: 'Flower Baskets', icon: '🧺' },
  { value: 'varmala', label: 'Varmalas', icon: '📿' },
  { value: 'jewellery', label: 'Floral Jewellery', icon: '💍' },
  { value: 'decor', label: 'Event Décor', icon: '🎉' },
];

export const PICKUP_LOCATIONS = ['Manish Nagar', 'Khamla'] as const;

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

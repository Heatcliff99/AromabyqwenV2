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

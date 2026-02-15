// types/product.ts
export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  brandImg? : string;
  specs: string;
  promotion?: string;
  warranty: string;
  delivery: string;
  views: string;
  isHot?: boolean;
  isDiscount?: boolean;
  discountPercentage?: number;
  isNew?: boolean;
  isSale?: boolean;
  stock?: number | 0;
  isInStock? : boolean;
  tag?: string; // This is the key for "Series" dropdowns
} 
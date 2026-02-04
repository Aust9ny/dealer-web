// types/product.ts
export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  specs: string;
  promotion?: string;
  warranty: string;
  delivery: string;
  views: string;
  isHot?: boolean;
}
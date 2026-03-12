export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  brandImg?: string;
  specs: string;
  tag?: string;
  promotion?: string;
  warranty: string;
  delivery?: string;
  views?: string;
  isHot?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  discountPercentage?: number;
  stock?: number;
  sourceMenuId?: number;
  sourceAlive?: string;
  sourceItemNo?: number;
}

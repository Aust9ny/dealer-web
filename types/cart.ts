import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  priceAtAdded: number; // The price based on user role when added
  addedAt: string;
  // Linking fields
  purchaseOrderID?: string; // Populated only after checkout
  orderedAt?: string;
}

export interface UserCart {
  id: string;
  name: string;      // e.g., "Project A", "Stock for March"
  items: CartItem[];
  isDefault: boolean;
  createdAt: string;
}
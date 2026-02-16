import type { Product } from './product';

export interface OrderLineItem {
  product: Product;      // Snapshot of the product at purchase
  quantity: number;
  priceAtPurchase: number; // Final price paid per unit
}

export interface PurchaseOrder {
  id: string;            // The ID generated at checkout (e.g., PO12345)
  userId: number;
  dealerId: number;
  cartId: string;        // The ID of the cart this came from
  items: OrderLineItem[]; // 🟢 List of products + their quantities
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;     // The "Ordered At" timestamp
}
import { Product } from "./product";

export interface PurchaseOrder {
  id: string
  amount: number
  createdAt: string // ISO datetime
}

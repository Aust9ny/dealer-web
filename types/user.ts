import type { UserCart } from './cart';

export interface User {
  id: number;
  fname: string;
  lname: string;
  tel: string;
  role: 'Technician' | 'Dealer' | 'Franchise';
  email: string;
  password?: string; // Optional for safety in frontend
  profileImg?: string;
  dealerID: number;
  address?: string;
  carts?: UserCart[]; // 🟢 The list of all user's carts
}
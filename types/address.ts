// types/address.ts

export interface Address {
  id:  number;
  /** Label for the address e.g., 'Head Office', 'Warehouse' */
  label?: string; 
  /** Receiver Name or Company Name */
  recipientName: string;
  /** Contact number for delivery */
  phone: string;

  /** Building name, House No, Street */
  addressDetail: string;
  /** Sub-district (Tambon) */
  subDistrict: string;
  /** District (Amphoe) */
  district: string;
  /** Province (Changwat) */
  province: string;
  /** Zip Code (5 digits) */
  postalCode: string;
  /** GPS coordinates for precise delivery mapping */
  
  coordinates?: {
    lat: number;
    lng: number;
  };
  /** Meta info */
  isDefault: boolean;
  /** Useful for Advice Dealer branch logic */
  isTaxAddress: boolean; 
}
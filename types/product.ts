// types/product.ts
export interface Product {
  code?: string;
  name: string;
  detail: string;
  warranty: string;
  pack_qty:number;
  stock?: number;
  volume_prices: {
    salesprice5: string;
    salesprice4: string;
    salesprice3: string;
    salesprice2: string;
  };
  type : string;
} 
    // "group_id": 39,
    //   "group_name": "APPLE PRODUCTS",
    //   "group_slugs": "apple-product",
    //   "group_order_by": 0,
    //   "group_hit": "",
    //   "adv": "",
    //   "name_thai": "",
    //   "menu_head_group_id": 1,
    //   "menu_sub": [
import type { menu_sub } from './menu_sub';


export interface ProductGroup {
  group_id: number;
  group_name: string;
  group_slugs: string;
  group_order_by: number;
  group_hit: string;
  adv: string;
  name_thai: string;
  menu_head_group_id: number;
  menu_sub: menu_sub[];
}

export interface ProductGroupResponse {
  status: string;
  statusCode: string;
  data: ProductGroup[];
  message: string;
  message_m: string;
}

export interface MenuDetail {
  menu_dtl_id: number;
  menu_id: number;
  menu_dtl_name: string;
  menu_dtl_alive: string;
  item_no: number;
  slug_dtl: string;
}

export type productGroup = ProductGroup;

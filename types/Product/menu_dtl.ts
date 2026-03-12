            //   "menu_dtl_id": 26811,
            //   "menu_id": 1891,
            //   "menu_dtl_name": "iPad Wifi",
            //   "menu_dtl_alive": "T",
            //   "item_no": 1,
            //   "slug_dtl": "ipad-wifi"

export interface MenuDetail {
  menu_dtl_id: number;
  menu_id: number;
  menu_dtl_name: string;
  menu_dtl_alive: string;
  item_no: number;
  slug_dtl: string;
}

export type menu_dtl = MenuDetail;

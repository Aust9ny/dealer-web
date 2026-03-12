// "id": 612,
//           "grpname": "iPad",
//           "grp": "iPad",
//           "no_": 1,
//           "menu_id": 1891,
//           "group_id": 39,
//           "orderby_pc": "99",
//           "slugs": "ipad",
//           "online_only": "T",
//           "banner_cate": "-",
//           "menu_dtl": [
import type { menu_dtl } from './menu_dtl';

export interface MenuSub {
  id: number;
  grpname: string;
  grp: string;
  no_: number;
  menu_id: number;
  group_id: number;
  orderby_pc: string;
  slugs: string;
  online_only: string;
  banner_cate: string;
  menu_dtl: menu_dtl[];
}

export type menu_sub = MenuSub;

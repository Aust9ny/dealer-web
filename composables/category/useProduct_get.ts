export interface ProductListParams {
  gr: string | number;
  gmall?: string | number;
  basket_id?: string;
  hi_end?: string;
  mnew_grp: string;
  old_data?: string;
}

export interface ProductListItem {
  id?: string | number;
  menu_id?: string | number;
  menu_dtl_id?: string | number;
  part_no?: string;
  sku?: string;
  code?: string;
  product_name?: string;
  product_name_th?: string;
  product_desc?: string;
  menu_dtl_name?: string;
  grp_name?: string;
  brand_name?: string;
  brand?: string;
  image?: string;
  image_url?: string;
  picture?: string;
  price?: string | number;
  srp?: string | number;
  dealer_price?: string | number;
  stock?: string | number;
  qty?: string | number;
  item_no?: string | number;
  [key: string]: unknown;
}

export interface ProductListResponse {
  data?: ProductListItem[];
  items?: ProductListItem[];
  result?: ProductListItem[];
  products?: ProductListItem[];
  rows?: ProductListItem[];
  list?: ProductListItem[];
  payload?: {
    data?: ProductListItem[];
    items?: ProductListItem[];
    result?: ProductListItem[];
    products?: ProductListItem[];
    rows?: ProductListItem[];
    list?: ProductListItem[];
  };
  [key: string]: unknown;
}

export const extractProductItems = (response: ProductListResponse | null | undefined): ProductListItem[] => {
  if (!response) return [];
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.items)) return response.items;
  if (Array.isArray(response.result)) return response.result;
  if (Array.isArray(response.products)) return response.products;
  if (Array.isArray(response.rows)) return response.rows;
  if (Array.isArray(response.list)) return response.list;
  if (Array.isArray(response.payload?.data)) return response.payload.data;
  if (Array.isArray(response.payload?.items)) return response.payload.items;
  if (Array.isArray(response.payload?.result)) return response.payload.result;
  if (Array.isArray(response.payload?.products)) return response.payload.products;
  if (Array.isArray(response.payload?.rows)) return response.payload.rows;
  if (Array.isArray(response.payload?.list)) return response.payload.list;
  return [];
};

export const productListData = async (params: ProductListParams): Promise<ProductListResponse> => {
  return await $fetch<ProductListResponse>('https://developback.advice.in.th/apiadvicedealer/v1.0.0/pricelist/product', {
    method: 'POST',
    body: {
      gr: params.gr,
      gmall: params.gmall ?? '',
      basket_id: params.basket_id ?? 'MTA1NjYw',
      hi_end: params.hi_end ?? '',
      mnew_grp: params.mnew_grp,
      old_data: params.old_data ?? '',
    },
    headers : {
        Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoib25saW5lIiwicGxhdGZvcm0iOiJhZHZpY2VkZWFsZXIiLCJpc19tZW1iZXIiOnRydWUsInVzZXIiOiJDMkxSMCIsInVzZXI4IjoiMzA4ODI2ODAiLCJjdXNfbGV2ZWwiOiIyMSIsImlhdCI6MTc3MzIwMTQ1MiwiZXhwIjoxNzczODA2MjUyfQ.WIubp_dPhe-0ws028cfPL1xEXnP-cEqIsMQGR8DJrR0'
    }
  });
};

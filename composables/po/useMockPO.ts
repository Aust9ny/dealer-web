import type { PurchaseOrder } from '~/types/purchase-order';
import { usePOPricing } from './usePOPricing';
import { useAuth } from '../auth/useAuth';

// Mock Data incorporating Product Objects and Quantities
const mockPOs: PurchaseOrder[] = [
{ 
  id: 'PO123455', 
  userId: 202, 
  dealerId: 112234,
  cartId: 'cart-default-202',
  status: 'paid',
  // Total: (12635 * 10) + (19200 * 2) + (3850 * 4) = 180,150
  totalAmount: 180150, 
  createdAt: '2026-02-16T08:30:00Z',
  items: [
    {
      product: {
        id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC RTX 4060 TI',
        price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', 
        promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac',
        specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', warranty: '3-3-3', 
        stock: 15
      },
      quantity: 10,
      priceAtPurchase: 12635
    },
    // 🟢 New Item 1: High-end CPU
    {
      product: { id: 31, sku: 'ASU-VG279QM', brand: 'ASUS', name: 'MONITOR ASUS TUF GAMING VG279QM - 27" IPS 280Hz G-SYNC', price: 9900, category: 'Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0171213/A0171213OK_BIG_2.jpg', specs: '27" / IPS / 1920x1080 / 1ms / HDR400', promotion: 'ผ่อน 0% นาน 10 เดือน', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '450k', isHot: false },
      quantity: 2,
      priceAtPurchase: 19200
    },
    // 🟢 New Item 2: Performance RAM
    {
      product: { id: 32, sku: 'SNG-G5-32', brand: 'SAMSUNG', name: 'MONITOR SAMSUNG ODYSSEY G5 - 32" VA 2K 144Hz CURVED', price: 8500, category: 'Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0148835/A0148835OK_BIG_2.jpg', specs: '32" / VA / 2560x1440 / 1000R / 1ms', promotion: 'แถมฟรี สาย DP Gold Plate', warranty: 'ประกัน 3-3-3', delivery: 'ส่งฟรีทั่วประเทศ', views: '800k', isHot: true },
      quantity: 4,
      priceAtPurchase: 3850
    }
  ]
},
  { 
    id: 'PO123456', 
    userId: 202, 
    dealerId: 112234,
    cartId: 'cart-project-alpha',
    status: 'shipping',
    totalAmount: 243510, 
    createdAt: '2026-02-16T09:15:00Z',
    items: [
      {
        product: { 
          id: 116, sku: 'APL-IP16P-256', brand: 'APPLE', name: 'iPhone 16 Pro Max 256GB', 
          price: 48900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168016/A0168016_1.jpg',
          specs: 'A18 Pro', warranty: '1 Year', stock: 5 
        },
        quantity: 5,
        priceAtPurchase: 45966 // Dealer Price
      }
    ]
  },  { 
    id: 'PO123457', 
    userId: 202, 
    dealerId: 112234,
    cartId: 'cart-project-alpha',
    status: 'shipping',
    totalAmount: 243510, 
    createdAt: '2026-02-16T09:15:00Z',
    items: [
      {
        product: { 
          id: 116, sku: 'APL-IP16P-256', brand: 'APPLE', name: 'iPhone 16 Pro Max 256GB', 
          price: 48900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168016/A0168016_1.jpg',
          specs: 'A18 Pro', warranty: '1 Year', stock: 5 
        },
        quantity: 5,
        priceAtPurchase: 45966 // Dealer Price
      }
    ]
  },
    { 
    id: 'PO123458', 
    userId: 202, 
    dealerId: 112234,
    cartId: 'cart-project-alpha',
    status: 'shipping',
    totalAmount: 243510, 
    createdAt: '2026-02-16T09:15:00Z',
    items: [
      {
        product: { 
          id: 116, sku: 'APL-IP16P-256', brand: 'APPLE', name: 'iPhone 16 Pro Max 256GB', 
          price: 48900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168016/A0168016_1.jpg',
          specs: 'A18 Pro', warranty: '1 Year', stock: 5 
        },
        quantity: 5,
        priceAtPurchase: 45966 // Dealer Price
      }
    ]
  },
    { 
    id: 'PO123459', 
    userId: 202, 
    dealerId: 112234,
    cartId: 'cart-project-alpha',
    status: 'shipping',
    totalAmount: 243510, 
    createdAt: '2026-02-16T09:15:00Z',
    items: [
      {
        product: { 
          id: 116, sku: 'APL-IP16P-256', brand: 'APPLE', name: 'iPhone 16 Pro Max 256GB', 
          price: 48900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168016/A0168016_1.jpg',
          specs: 'A18 Pro', warranty: '1 Year', stock: 5 
        },
        quantity: 5,
        priceAtPurchase: 45966 // Dealer Price
      },
    ]
  },
  { id: 'PO123452', userId: 303, dealerId: 113334, cartId: 'c1', items: [], status: 'completed', totalAmount: 8900, createdAt: '2026-02-14T14:00:00Z' }
];


export const useMockPO = () => {
  const { currentUser } = useAuth();
  const { getSubtotalFromItems } = usePOPricing();

  // 🟢 Get all POs for the currently logged in user
  const userOrders = computed(() => {
    if (!currentUser.value) return [];
    return mockPOs.filter(po => po.userId === currentUser.value?.id);
  });

  // 🟢 Find specific PO
  const getPOById = (id: string) => mockPOs.find(po => po.id === id);
  
  // 🟢 Get the absolute latest PO (useful for "Thank You" pages)
  const getLatestPO = () => {
    return [...mockPOs].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  };

  // 🟢 Get latest PO specifically for the logged in user
  const getLatestUserPO = computed(() => {
    return [...userOrders.value].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  });

  const updatePOItemQuantity = (poId: string, productId: number, newQty: number) => {
      const order = userOrders.value.find(o => o.id === poId);
      
      if (order) {
        const item = order.items.find(i => i.product.id === productId);
        if (item) {
          // 🟢 1. Final safety check on the quantity
          item.quantity = isNaN(newQty) || newQty === null ? 0 : newQty;

          // 🟢 2. Bulletproof Total Calculation
          // Using ?? 0 ensures that even if price or qty is missing, we get a number.
          order.totalAmount = getSubtotalFromItems(order.items);
        }
      }
  };

  return { 
    getPOById, 
    getAllPO: () => mockPOs, 
    userOrders, 
    getLatestPO,
    getLatestUserPO,
    updatePOItemQuantity
  };
};

import type { PurchaseOrder } from '~/types/purchase-order';

// Mock Data incorporating Product Objects and Quantities
const mockPOs: PurchaseOrder[] = [
  { 
    id: 'PO123455', 
    userId: 202, 
    dealerId: 112234,
    cartId: 'cart-default-202',
    status: 'paid',
    totalAmount: 135185, 
    createdAt: '2026-02-16T08:30:00Z',
    items: [
      {
        product: {
          id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC RTX 4060 TI',
          price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac',
          specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', warranty: '3-3-3', 
        },
        quantity: 10,
        priceAtPurchase: 12635 // Technician Price
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
      }
    ]
  },
  { id: 'PO123454', userId: 101, dealerId: 111234, cartId: 'c1', items: [], status: 'pending', totalAmount: 15200, createdAt: '2026-02-15T11:45:00Z' },
  { id: 'PO123453', userId: 101, dealerId: 111234, cartId: 'c1', items: [], status: 'completed', totalAmount: 8900, createdAt: '2026-02-14T13:20:00Z' },
  { id: 'PO123452', userId: 303, dealerId: 113334, cartId: 'c1', items: [], status: 'completed', totalAmount: 8900, createdAt: '2026-02-14T14:00:00Z' }
];


export const useMockPO = () => {
  const { currentUser } = useAuth();

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

  return { 
    getPOById, 
    getAllPO: () => mockPOs, 
    userOrders, 
    getLatestPO,
    getLatestUserPO 
  };
};
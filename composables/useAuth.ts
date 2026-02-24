
import type { Product } from '~/types/product';
import type { CartItem } from '~/types/cart';

export const useAuth = () => {
const currentUserId = useState<number | null>('active-user-id', () => 202); 
  const { getRolePrice: calculateRolePrice } = useRolePricing();
  
  const { users: allUsers } = useUser();

  // 🟢 2. ดึงข้อมูล User จริงๆ จาก useUser เสมอ (Reactivity Link)
  const currentUser = computed(() => 
    allUsers.value.find(u => u.id === currentUserId.value) || null
  );

  const login = (role: 'Technician' | 'Dealer' | 'Franchise') => {
    const foundUser = allUsers.value.find(u => u.role === role);
    if (foundUser) {
      currentUserId.value = foundUser.id; // 🟢 เปลี่ยนแค่ ID เดี๋ยวทุกหน้าจะเปลี่ยนตามเอง
      
      // Initialize cart if needed
      if (!foundUser.carts) {
        foundUser.carts = [{
          id: `cart-default-${foundUser.id}`,
          name: 'ตะกร้าสินค้าหลัก',
          items: [],
          isDefault: true,
          createdAt: new Date().toISOString()
        }];
      }
    }
  };

  const logout = () => { currentUserId.value = null; };

  // 3. Cart Actions (Integrated into Auth)
  const activeCart = computed(() => {
    if (!currentUser.value || !currentUser.value.carts) return null;
    return currentUser.value.carts.find(c => c.isDefault) || currentUser.value.carts[0];
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!currentUser.value || !activeCart.value) {
    //   console.warn('Please login to add items to cart');
      return;
    }

    const priceAtAdded = getRolePrice(product.price);

    // Check if product exists in current active cart
    const existingItem = activeCart.value.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        product: { ...product }, // Snapshot of product
        quantity,
        priceAtAdded,
        addedAt: new Date().toISOString()
      };
      activeCart.value.items.push(newItem);
    }
  };

  // 4. Helper for Role Based Pricing
  const getRolePrice = (basePrice: number) => {
    return calculateRolePrice(basePrice, currentUser.value?.role);
  };

  return { 
    currentUser, 
    login, 
    logout, 
    activeCart, 
    addToCart, 
    getRolePrice 
  };
};

import type { User } from '~/types/user';
import type { Product } from '~/types/product';
import type { CartItem } from '~/types/cart';

export const useAuth = () => {
  // 1. Shared Global Session
  const currentUser = useState<User | null>('user-session', () => null);
  
  const { user: allUsers } = useUser();

  // 2. Auth Actions
  const login = (role: 'Technician' | 'Dealer' | 'Franchise') => {
    const foundUser = allUsers.find(u => u.role === role);
    
    if (foundUser) {
      // Ensure the user has a carts array initialized
      if (!foundUser.carts) {
        foundUser.carts = [{
          id: `cart-default-${foundUser.id}`,
          name: 'ตะกร้าสินค้าหลัก',
          items: [],
          isDefault: true,
          createdAt: new Date().toISOString()
        }];
      }
      currentUser.value = foundUser;
    }
  };

  const logout = () => {
    currentUser.value = null;
  };

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
    if (!currentUser.value) return basePrice;
    const multipliers = {
      Technician: 0.96, // 4% off
      Dealer: 0.95,     // 5% off
      Franchise: 0.94   // 6% off
    };
    const role = currentUser.value.role as keyof typeof multipliers;
    return basePrice * (multipliers[role] || 1);
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
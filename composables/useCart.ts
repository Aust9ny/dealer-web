
import type { Product } from '~/types/product';
import type { UserCart, CartItem } from '~/types/cart';

export const useCart = () => {
  const { currentUser } = useAuth();
  const { getRolePrice: calculateRolePrice } = useRolePricing();

  // 1. Get the current active (default) cart
  const activeCart = computed(() => {
    return currentUser.value?.carts?.find(c => c.isDefault) || (currentUser.value?.carts && currentUser.value.carts[0]) || null;
  });

  // 2. Add Product to the active cart
  const addToCart = (product: Product, quantity: number = 1) => {
    if (!currentUser.value || !activeCart.value) return;

    // Calculate price based on role immediately to "lock" it in the cart
    const priceAtAdded = getRolePrice(product.price);

    const newItem: CartItem = {
      product: JSON.parse(JSON.stringify(product)), // Deep copy to prevent reference bugs
      quantity,
      priceAtAdded,
      addedAt: new Date().toISOString()
    };

    // Check if product already exists in the active cart
    const existingItem = activeCart.value.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      activeCart.value.items.push(newItem);
    }
  };

  // 3. Create a brand new cart (for multiple projects)
  const createNewCart = (name: string) => {
    if (!currentUser.value) return;

    const newCart: UserCart = {
      id: `cart-${Date.now()}`,
      name,
      items: [],
      isDefault: false,
      createdAt: new Date().toISOString()
    };

    currentUser.value.carts?.push(newCart);
  };

  // 4. Switch the default cart
  const setDefaultCart = (cartId: string) => {
    if (!currentUser.value) return;
    
    currentUser.value.carts?.forEach(c => {
      c.isDefault = (c.id === cartId);
    });
  };

  // Helper: Get Price based on user role (Same logic as we used in pages)
  const getRolePrice = (basePrice: number) => {
    return calculateRolePrice(basePrice, currentUser.value?.role);
  };

  return {
    activeCart,
    addToCart,
    createNewCart,
    setDefaultCart,
    getRolePrice
  };
};

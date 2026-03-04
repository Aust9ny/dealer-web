import type { CartItem, UserCart } from '~/types/cart';
import type { Product } from '~/types/product';
import type { User } from '~/types/user';

import { useRolePricing, type UserRole } from './useRolePricing';
import { useUser } from './useUser';

const createDefaultCart = (userId: number): UserCart => ({
  id: `cart-default-${userId}`,
  name: 'ตะกร้าสินค้าหลัก',
  items: [],
  isDefault: true,
  createdAt: new Date().toISOString(),
});

export const useAuth = () => {
  const currentUserId = useState<number | null>('active-user-id', () => 202);
  const { users } = useUser();
  const { getRolePrice: calculateRolePrice } = useRolePricing();

  const currentUser = computed(
    () => users.value.find((user) => user.id === currentUserId.value) || null,
  );

  const ensureUserDefaultCart = (user: User) => {
    if (!user.carts?.length) {
      user.carts = [createDefaultCart(user.id)];
    }
  };

  const activeCart = computed(() => {
    const user = currentUser.value;
    if (!user?.carts?.length) return null;
    return user.carts.find((cart) => cart.isDefault) || user.carts[0];
  });

  const getRolePrice = (basePrice: number) =>
    calculateRolePrice(basePrice, currentUser.value?.role);

  const addToCart = (product: Product, quantity: number = 1) => {
    const user = currentUser.value;
    if (!user) return;

    ensureUserDefaultCart(user);
    const cart = activeCart.value;
    if (!cart) return;

    const existingItem = cart.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }

    const newItem: CartItem = {
      product: JSON.parse(JSON.stringify(product)),
      quantity,
      priceAtAdded: getRolePrice(product.price),
      addedAt: new Date().toISOString(),
    };

    cart.items.push(newItem);
  };

  const createNewCart = (name: string) => {
    const user = currentUser.value;
    if (!user) return;

    if (!user.carts) {
      user.carts = [];
    }

    const newCart: UserCart = {
      id: `cart-${Date.now()}`,
      name,
      items: [],
      isDefault: false,
      createdAt: new Date().toISOString(),
    };

    user.carts.push(newCart);
  };

  const setDefaultCart = (cartId: string) => {
    const carts = currentUser.value?.carts;
    if (!carts) return;

    carts.forEach((cart) => {
      cart.isDefault = cart.id === cartId;
    });
  };

  const login = (role: UserRole) => {
    const foundUser = users.value.find((user) => user.role === role);
    if (!foundUser) return;

    currentUserId.value = foundUser.id;
    ensureUserDefaultCart(foundUser);
  };

  const logout = () => {
    currentUserId.value = null;
  };

  return {
    currentUser,
    login,
    logout,
    activeCart,
    addToCart,
    createNewCart,
    setDefaultCart,
    getRolePrice,
  };
};

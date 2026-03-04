import { useAuth } from './useAuth';

export const useCart = () => {
  const {
    activeCart,
    addToCart,
    createNewCart,
    setDefaultCart,
    getRolePrice,
  } = useAuth();

  return {
    activeCart,
    addToCart,
    createNewCart,
    setDefaultCart,
    getRolePrice,
  };
};

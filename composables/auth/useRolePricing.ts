import type { User } from '~/types/user';

export type UserRole = User['role'];

const ROLE_MULTIPLIERS: Record<UserRole, number> = {
  Technician: 0.96,
  Dealer: 0.95,
  Franchise: 0.94,
};

export const useRolePricing = () => {
  const getRoleMultiplier = (role?: UserRole | null) => {
    if (!role) return 1;
    return ROLE_MULTIPLIERS[role] ?? 1;
  };

  const getRolePrice = (basePrice: number, role?: UserRole | null) =>
    basePrice * getRoleMultiplier(role);

  return {
    ROLE_MULTIPLIERS,
    getRoleMultiplier,
    getRolePrice,
  };
};

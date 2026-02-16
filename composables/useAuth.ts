// composables/useAuth.ts
import type { User } from '~/types/user';

export const useAuth = () => {
  // Shared state for the current user
  const currentUser = useState<User | null>('user-session', () => null);

  const login = (role: 'Technician' | 'Dealer' | 'Franchise') => {
    // We pick from the mock data based on the role
    const mockData: Record<string, User> = {
      Technician: {
        id: 101, Fname: 'Somchai', Lname: 'Tech', tel: '081...', 
        role: 'Technician', email: 'tech@advice.com', password: '...'
      },
      Dealer: {
        id: 202, Fname: 'Sippakorn', Lname: 'First', tel: '099...', 
        role: 'Dealer', email: 'first@dealer.com', password: '...'
      },
      Franchise: {
        id: 303, Fname: 'Vipada', Lname: 'Success', tel: '021...', 
        role: 'Franchise', email: 'vipada@fran.com', password: '...'
      }
    };
    currentUser.value = mockData[role];
  };

  const logout = () => {
    currentUser.value = null;
  };

  return { currentUser, login, logout };
};
// composables/useAuth.ts
import type { User } from '~/types/user';

export const useAuth = () => {
  const currentUser = useState<User | null>('user-session', () => null);
  
  // 🟢 Import the user list from your other composable
  const { user: allUsers } = useUser();

  const login = (role: 'Technician' | 'Dealer' | 'Franchise') => {

    const foundUser = allUsers.find(u => u.role === role);
    
    if (foundUser) {
      currentUser.value = foundUser;
    }
  };

  const logout = () => {
    currentUser.value = null;
  };

  return { currentUser, login, logout };
};
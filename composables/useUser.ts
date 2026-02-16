import type { User } from '~/types/user';

export const useUser = () => {
    const user: User[] = [
    {
    id: 101,
    Fname: 'Somchai',
    Lname: 'TechService',
    tel: '0812345678',
    role: 'Technician',
    email: 'somchai.t@advice-rep.com',
    password: 'hashed_password_123'
  },
  {
    id: 202,
    Fname: 'Sippakorn',
    Lname: 'First',
    tel: '0998887766',
    role: 'Dealer',
    email: 'first.dealer@shop.co.th',
    password: 'hashed_password_456'
  },
  {
    id: 303,
    Fname: 'Vipada',
    Lname: 'Success',
    tel: '021112222',
    role: 'Franchise',
    email: 'vipada.f@franchise-hub.net',
    password: 'hashed_password_789'
  }
];

  return { user };
};

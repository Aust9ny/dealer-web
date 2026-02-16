import type { User } from '~/types/user';

export const useUser = () => {
    //this will
    const user: User[] = [
    {
    id: 101,
    fname: 'Somchai',
    lname: 'TechService',
    tel: '0812345678',
    role: 'Technician',
    email: 'somchai.t@advice-rep.com',
    password: 'hashed_password_123',
    dealerID : 111234
  },
  {
    id: 202,
    fname: 'Sippakorn',
    lname: 'First',
    tel: '0998887766',
    role: 'Dealer',
    email: 'first.dealer@shop.co.th',
    password: 'hashed_password_456',
    dealerID : 112234
  },
  {
    id: 303,
    fname: 'Vipada',
    lname: 'Success',
    tel: '021112222',
    role: 'Franchise',
    email: 'vipada.f@franchise-hub.net',
    password: 'hashed_password_789',
    dealerID : 113334
  }
];

  return { user };
};

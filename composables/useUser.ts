import { useState } from '#app';
import type { User } from '~/types/user';
import type { Address } from '~/types/address';

export const useUser = () => {
  // 🟢 1. Create a globally reactive state for users
  const users = useState<User[]>('all-users', () => [
    {
      id: 101,
      fname: 'Somchai',
      lname: 'TechService',
      tel: '0812345678',
      role: 'Technician',
      email: 'somchai.t@advice-rep.com',
      dealerID: 111234,
      addresses: []
    },
    {
      id: 202,
      fname: 'Sippakorn',
      lname: 'Kanhareuk',
      tel: '0998887766',
      role: 'Dealer',
      email: 'first.dealer@shop.co.th',
      dealerID: 112234,
      // 🟢 2. Integrated Mock Addresses here
      addresses: [
        {
          id: 1,
          label: 'สำนักงานใหญ่',
          recipientName: 'บริษัท แอดไวซ์ ไอที อินฟินิท จำกัด (มหาชน)',
          phone: '0821234568',
          addressDetail: '74/1 หมู่ 1',
          subDistrict: 'ท่าอิฐ',
          district: 'ปากเกร็ด',
          province: 'นนทบุรี',
          postalCode: '11120',
          isDefault: true,
          isTaxAddress: true
        },
        {
          id: 2,
          label: 'คลังสินค้าบางบัวทอง',
          recipientName: 'คลังสินค้า สาขาบางบัวทอง',
          phone: '029876543',
          addressDetail: '12/5 ถนนกาญจนาภิเษก',
          subDistrict: 'ละหาร',
          district: 'บางบัวทอง',
          province: 'นนทบุรี',
          postalCode: '11110',
          isDefault: false,
          isTaxAddress: false
        }
      ]
    },
    {
      id: 303,
      fname: 'Vipada',
      lname: 'Success',
      tel: '021112222',
      role: 'Franchise',
      email: 'vipada.f@franchise-hub.net',
      dealerID: 113334,
      addresses: []
    }
  ]);

  // 🟢 3. Helper for Formatted Address String
  const getFullAddress = (addr: Address) => {
    if (!addr) return '';
    return `${addr.addressDetail} ต.${addr.subDistrict} อ.${addr.district} จ.${addr.province} ${addr.postalCode}`;
  };

  // 🟢 4. Get Current User (Mocked for your Sippakorn login)
  const currentUser = computed(() => users.value.find(u => u.id === 202));

  return { 
    users, 
    currentUser,
    getFullAddress 
  };
};
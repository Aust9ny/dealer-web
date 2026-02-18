import { ref } from 'vue';
import type { Address } from '@/types/address';

export const useAddress = () => {
  const savedAddresses = ref<Address[]>([
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
    },
    {
      id: 3,
      label: 'สาขาเซ็นทรัลเวสต์เกต',
      recipientName: 'แอดไวซ์ สาขาเซ็นทรัลเวสต์เกต (ชั้น 2)',
      phone: '021234567',
      addressDetail: '199 หมู่ 6 ห้อง 2xx',
      subDistrict: 'เสาธงหิน',
      district: 'บางใหญ่',
      province: 'นนทบุรี',
      postalCode: '11140',
      isDefault: false,
      isTaxAddress: false
    }
  ]);

  // Helper to get formatted string for UI
  const getFullAddress = (addr: Address) => {
    return `${addr.addressDetail} ต.${addr.subDistrict} อ.${addr.district} จ.${addr.province} ${addr.postalCode}`;
  };

  return { 
    savedAddresses,
    getFullAddress 
  };
};
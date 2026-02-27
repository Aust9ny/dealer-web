export interface DeliveryMethodOption {
  id: string;
  label: string;
  desc: string;
}

const deliveryMethods: DeliveryMethodOption[] = [
  { id: 'next-day', label: 'TGM Dealer Delivery', desc: 'ส่งด่วนวันถัดไป (ก่อน 17:00 น.)' },
  { id: 'same-day', label: 'TGM Dealer Same Day', desc: 'จัดส่งภายในวัน (เฉพาะเงื่อนไขที่กำหนด)' },
  { id: 'counter', label: 'เคาน์เตอร์', desc: 'รับสินค้าที่เคาน์เตอร์' },
  { id: 'dealer-123', label: '123 TMG Dealer', desc: 'จัดส่งผ่าน 123 TMG Dealer' },
  { id: 'tmg', label: 'TMG', desc: 'จัดส่งผ่าน TMG' },
];

export const useDeliveryMethods = () => {
  return {
    deliveryMethods,
  };
};

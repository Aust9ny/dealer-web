// composables/dashboard/useNavigation.ts
export interface NavLink {
  label: string;
  to: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  icon: string;
  links: NavLink[];
}

export const useNavigation = () => {
  const menuGroups: NavGroup[] = [
    {
      title: 'ระบบการสั่งซื้อ',
      icon: '🛒',
      links: [
        { label: 'รายการสินค้าค้างส่ง', to: '/pending-orders' },
        { label: 'ใบสั่งซื้อย้อนหลัง', to: '/order-history' }
      ]
    },
    {
      title: 'การเงินและชำระเงิน',
      icon: '💳',
      links: [
        { label: 'ชำระ / อัปโหลดหลักฐานโอน', to: '/payment-upload' },
        { label: 'ชำระหนี้ Advice สนญ.', to: '/debt-payment' }
      ]
    },
    {
      title: 'ติดตามสถานะและเคลม',
      icon: '📦',
      links: [
        { label: 'ติดตามสถานะการสั่งซื้อ', to: '/Dealer_Profile' }, 
        { label: 'ติดตามสถานะการจัดส่ง', to: 'https://www.advice.co.th/services/check-tracking', external: true },
        { label: 'ตรวจสอบสถานะการแจ้งเคลม', to: 'https://www.advice.co.th/services/checkclaim', external: true  },
        { label: 'สินค้าเคลมรอตัดสินใจ', to: '/claim/claim_Decision' },
        { label: 'รายงานการจัดส่ง', to: '/claim/claim_Report' }
      ]
    },
    {
      title: 'สื่อการขายและโปรโมชั่น',
      icon: '📢',
      links: [
        { label: 'โปรโมชั่น Dealers', to: '/dealer-promotions' },
        { label: 'พิมพ์ป้ายราคา (Standard)', to: '/print-label-standard' },
        { label: 'พิมพ์ป้ายราคา (Gaming)', to: '/print-label-gaming' }
      ]
    },
    {
      title: 'ข้อมูลและการตั้งค่า',
      icon: '⚙️',
      links: [
        { label: 'รายการเคลื่อนไหวบัญชี', to: '/account-activity' },
        { label: 'รายขื่อไฟล์ที่อัปโหลด', to: '/uploaded-files' },
        { label: 'เงื่อนไขการจัดส่ง', to: '/shipping-terms' }
      ]
    }
  ];

  return { menuGroups };
};
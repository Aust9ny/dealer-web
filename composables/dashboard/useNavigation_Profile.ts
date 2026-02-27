// composables/dashboard/useNavigation_Profile.ts
import type { NavGroup } from './useNavigation';

export const useNavigationProfile = () => {
  const menuGroupsProfile: NavGroup[] = [
    {
      title: 'ระบบการสั่งซื้อ',
      icon: '🛒',
      links: [
        { label: 'รายการสั่งซื้อทั้งหมด', action: 'latestPO' },        
        { label: 'รายการสินค้าค้างส่ง', to: '/Dealer_Profile/pending' },
        { label: 'ติดตามสถานะการจัดส่ง',  to: 'https://www.advice.co.th/services/check-tracking', external: true },
      ],
    },
    {
      title: 'การเงินและชำระเงิน',
      icon: '💳',
      links: [
        { label: 'ชำระ / อัปโหลดหลักฐานโอน', to: '/Dealer_Profile/payment-upload' },
        { label: 'ชำระหนี้ Advice สนญ.', to: '/Dealer_Profile/debt' },
        { label: 'รายการเคลื่อนไหวบัญชี', to: '/Dealer_Profile/account-activity' },
      ],
    },
    {
      title: 'งานบริการและติดตามสถานะและเคลม',
      icon: '📦',
      links: [
        { label: 'ตรวจสอบสถานะการแจ้งเคลม', to: 'https://www.advice.co.th/services/checkclaim', external: true },
        { label: 'สินค้าเคลมรอตัดสินใจ', to: '/claim/claim_Decision' },
        { label: 'รายงานการจัดส่ง', to: '/claim/claim_Report' },
      ],
    },
    {
      title: 'ข้อมูลและการตั้งค่า',
      icon: '⚙️',
      links: [
        { label: 'ข้อมูลส่วนตัวดีลเลอร์', to: '/Dealer_Profile/information' },
        { label: 'รายชื่อไฟล์ที่อัปโหลด', to: '/Dealer_Profile/uploaded-files' },
        { label: 'เงื่อนไขการจัดส่ง', to: '/Dealer_Profile/shipping-terms' },
        { label: 'เปลี่ยนรหัสผ่าน', to: '/Dealer_Profile/change-password' },
      ],
    },
  ];

  return { menuGroupsProfile };
};
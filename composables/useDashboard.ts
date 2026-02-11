// composables/useDashboard.ts
import type { Product } from '~/types/product';
import type { Banner } from '~/types/banner';
import type { News } from '~/types/news';

export const useDashboard = () => {
  const startDate = ref<string | null>(null);
  const endDate = ref<string | null>(null);
  

  const banner1 = ref<Banner[]>([
    { id: 1, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1920&auto=format&fit=crop', link: 'https://www.advice.co.th/article/activity-promotion', alt: 'GPU Update' },
    { id: 2, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop', link: 'https://www.advice.co.th/article/activity-promotion', alt: 'Cybersecurity' },
  ]);

  const banner2 = ref<Banner[]>([
    { id: 4, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop', link: 'https://www.advice.co.th/article/activity-promotion', alt: 'AI Tech' },
  ]);

    const products = ref<Product[]>([
    { id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true , stock: 598 },
    { id: 2, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 3, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 4, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 5, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 6, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 10, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 21, sku: 'INT-I5-14600K', brand: 'INTEL', name: 'CPU INTEL CORE I5-14600K 3.5 GHz (SOCKET LGA 1700)', price: 11900, category: 'CPU', image: 'https://img.advice.co.th/images_nas/pic_product4/A0154873/A0154873OK_BIG_1.jpg', specs: '14 Cores / 20 Threads / 5.3 GHz Turbo', promotion: 'ลดพิเศษ 500.- เมื่อซื้อพร้อมบอร์ด', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '1.2M', isHot: true },
    { id: 22, sku: 'AMD-R7-7800X3D', brand: 'AMD', name: 'CPU AMD RYZEN 7 7800X3D 4.2 GHz (SOCKET AM5)', price: 15500, category: 'CPU', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168235/A0168235OK_BIG_1.jpg', specs: '8 Cores / 16 Threads / 96MB L3 Cache', promotion: 'แถมเกม Star Wars Outlaws', warranty: 'ประกัน 3-0-0', delivery: 'ส่งฟรีทั่วประเทศ', views: '2.5M', isHot: true },

    // Monitor
    { id: 31, sku: 'ASU-VG279QM', brand: 'ASUS', name: 'MONITOR ASUS TUF GAMING VG279QM - 27" IPS 280Hz G-SYNC', price: 9900, category: 'Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0171213/A0171213OK_BIG_2.jpg', specs: '27" / IPS / 1920x1080 / 1ms / HDR400', promotion: 'ผ่อน 0% นาน 10 เดือน', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '450k', isHot: false },
    { id: 32, sku: 'SNG-G5-32', brand: 'SAMSUNG', name: 'MONITOR SAMSUNG ODYSSEY G5 - 32" VA 2K 144Hz CURVED', price: 8500, category: 'Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0148835/A0148835OK_BIG_2.jpg', specs: '32" / VA / 2560x1440 / 1000R / 1ms', promotion: 'แถมฟรี สาย DP Gold Plate', warranty: 'ประกัน 3-3-3', delivery: 'ส่งฟรีทั่วประเทศ', views: '800k', isHot: true },

    // Gaming Gear
    { id: 41, sku: 'LOG-GPW-SH', brand: 'LOGITECH', name: 'LOGITECH G PRO X SUPERLIGHT 2 - WHITE', price: 4990, category: 'Gaming Gear', image: 'https://img.advice.co.th/images_nas/pic_product4/A0154220/A0154220OK_BIG_5.jpg', specs: 'LIGHTSPEED Wireless / 32K DPI / 60g', promotion: 'แถมฟรี Mousepad G240', warranty: 'ประกัน 2-0-0', delivery: 'ส่งด่วนฟรี', views: '1.8M', isHot: true },
    { id: 42, sku: 'RZR-HNT-V2', brand: 'RAZER', name: 'RAZER HUNTSMAN V3 PRO TKL - ANALOG OPTICAL', price: 7990, category: 'Gaming Gear', image: 'https://e-express.co.th/wp-content/uploads/2024/02/p3-69.webp', specs: 'Rapid Trigger / Adjustable Actuation', promotion: 'รับส่วนลดแลกซื้อสินค้า Razer 10%', warranty: 'ประกัน 2-0-0', delivery: 'ส่งฟรีทั่วประเทศ', views: '600k', isHot: false },
    // ... (Keep your original product list here)
    ]);

  const newList = ref<News[]>([
    { id: 1, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
    { id: 1, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
    { id: 1, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
    { id: 1, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
  ]);
  
  const stats = [
    { label: 'ยอดสั่งซื้อสะสม', value: '฿13,342,314', colorClass: 'text-slate-800', icon: '💰' },
    { label: 'สินค้าค้างส่ง', value: '10 รายการ', colorClass: 'text-slate-800', icon: '📦' },
    { label: 'สินค้าเคลมรอตัดสินใจ', value: '10 รายการ', colorClass: 'text-slate-800', icon: '⚠️' },
    { label: 'รายการจัดส่ง', value: '10 รายการ', colorClass: 'text-slate-800', icon: '🚚' },
  ];

  const quickAccessItems = [
  { title: 'เช็ค Serial Number', bgColor: 'bg-white', textColor: 'text-slate-800', hoverBorder: 'hover:border-primary' },
  { title: 'แจ้งเคลมสินค้า', bgColor: 'bg-white', textColor: 'text-slate-800', hoverBorder: 'hover:border-primary' },
  { title: 'พิมพ์ป้ายราคา', bgColor: 'bg-white', textColor: 'text-slate-800', hoverBorder: 'hover:border-primary' },
  { title: 'โปรโมชันล่าสุด', bgColor: 'bg-white', textColor: 'text-slate-800', hoverBorder: 'hover:border-primary' },
];

// ตัวอย่างข้อมูลสำหรับแสดงผลอันดับยอดขาย
const topSales = [
  { name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE', amount: 45, total: 645000 },
  { name: 'AMD RYZEN 7 7800X3D', amount: 38, total: 570000 },
  { name: 'SAMSUNG 990 PRO 2TB', amount: 30, total: 210000 },
  { name: 'CORSAIR DOMINATOR PLATINUM 32GB', amount: 25, total: 185000 },
  { name: 'MSI MAG B650 TOMAHAWK WIFI', amount: 18, total: 142000 },
];

const bottomSales = [
  { name: 'USB Hub 2.0 No-brand', amount: 2, total: 150 },
  { name: 'Mouse Pad Generic Black', amount: 1, total: 89 },
  { name: 'VGA Cable 1.5M', amount: 1, total: 120 },
  { name: 'CR2032 Battery x1', amount: 0, total: 0 },
  { name: 'Broken Fan Case (Dummy)', amount: 0, total: 0 },
];

  const rawMonthlyData = [
    { month: 'Jan', sales: 12, target: 15, date: '2025-01-01' },
    { month: 'Feb', sales: 19, target: 25, date: '2025-02-01' },
    { month: 'Mar', sales: 13, target: 20, date: '2025-03-01' },
    { month: 'Apr', sales: 15, target: 25, date: '2025-04-01' },
    { month: 'May', sales: 22, target: 30, date: '2025-05-01' },
    { month: 'Jun', sales: 18, target: 35, date: '2025-06-01' },
    { month: 'Jul', sales: 25, target: 40, date: '2025-07-01' },
    { month: 'Aug', sales: 30, target: 45, date: '2025-08-01' },
    { month: 'Sep', sales: 28, target: 50, date: '2025-09-01' },
    { month: 'Oct', sales: 35, target: 55, date: '2025-10-01' },
    { month: 'Nov', sales: 40, target: 60, date: '2025-11-01' },
    { month: 'Dec', sales: 45, target: 65, date: '2025-12-01' },
  ];

  const latestDateInData = rawMonthlyData[rawMonthlyData.length - 1].date;

  const categoryTitle = computed(() => products.value[0]?.category || 'Products');
  const chartData = computed(() => {
  const filtered = rawMonthlyData.filter(item => {

    const start = startDate.value ? new Date(startDate.value).getTime() : 0;

    const end = endDate.value 
      ? new Date(endDate.value).getTime() 
      : new Date(latestDateInData).getTime();
    
    const itemTime = new Date(item.date).getTime();
    
    return itemTime >= start && itemTime <= end;
  });

  // 2. แยก labels และ data ออกมาหลังจากกรองแล้ว
  return {
    labels: filtered.map(d => d.month),
    datasets: [
      {
        label: 'ยอดขายจริง (2025)',
        data: filtered.map(d => d.sales),
        borderColor: '#A855F7',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'เป้าหมาย (2026)',
        data: filtered.map(d => d.target),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
        pointRadius: 4,
      },
    ],
  };
});

  const productDistribution = computed(() => {
    const brands = products.value.reduce((acc: Record<string, number>, curr) => {
      acc[curr.brand] = (acc[curr.brand] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(brands),
      datasets: [
        {
          data: Object.values(brands),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        },
      ],
    };
  });

  const trendingProducts = computed(() => {
    return products.value
      .filter(p => p.isHot)
      .slice(0, 5);             
  });
  
  return {
    startDate, endDate, banner1, banner2, products, trendingProducts, newList, stats, categoryTitle, chartData, productDistribution, quickAccessItems, topSales, bottomSales 
  };
};
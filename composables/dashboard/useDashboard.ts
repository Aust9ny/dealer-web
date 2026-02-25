// composables/dashboard/useDashboard.ts
import type { Product } from '~/types/product';
import type { Banner } from '~/types/banner';
import type { News } from '~/types/news';

export const useDashboard = () => {
  const startDate = ref<string | null>(null);
  const endDate = ref<string | null>(null);
  

  const banner1 = useState<Banner[]>('dashboard-banner1', () => [
    { id: 1, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1920&auto=format&fit=crop', link: 'https://www.advice.co.th/article/activity-promotion', alt: 'GPU Update' },
    { id: 2, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop', link: 'https://www.advice.co.th/article/activity-promotion', alt: 'Cybersecurity' },
  ]);

  const banner2 = useState<Banner[]>('dashboard-banner2', () => [
    { id: 4, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop', link: 'https://www.advice.co.th/article/activity-promotion', alt: 'AI Tech' },
  ]);

    const products = useState<Product[]>('dashboard-products', () => [
    { id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true , stock: 598 },
    { id: 2, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true , stock: 2},
    { id: 3, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 4, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 5, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 6, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 10, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
    { id: 21, sku: 'INT-I5-14600K', brand: 'INTEL', name: 'CPU INTEL CORE I5-14600K 3.5 GHz (SOCKET LGA 1700)', price: 11900, category: 'CPU', image: 'https://img.advice.co.th/images_nas/pic_product4/A0154873/A0154873OK_BIG_1.jpg', specs: '14 Cores / 20 Threads / 5.3 GHz Turbo', promotion: 'ลดพิเศษ 500.- เมื่อซื้อพร้อมบอร์ด', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '1.2M', isHot: true },
    { id: 22, sku: 'AMD-R7-7800X3D', brand: 'AMD', name: 'CPU AMD RYZEN 7 7800X3D 4.2 GHz (SOCKET AM5)', price: 15500, category: 'CPU', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168235/A0168235OK_BIG_1.jpg', specs: '8 Cores / 16 Threads / 96MB L3 Cache', promotion: 'แถมเกม Star Wars Outlaws', warranty: 'ประกัน 3-0-0', delivery: 'ส่งฟรีทั่วประเทศ', views: '2.5M', isHot: true },
    {
    id: 26,
    sku: 'APL-IP15PM-256-BLU',
    name: 'iPhone 15 Pro Max 256GB Blue Titanium',
    brand: 'Apple',
    price: 48900,
    category: 'iPhone',
    image: 'https://example.com/iphone15pm.png',
    specs: 'Chip A17 Pro, 6.7-inch Super Retina XDR, Pro Camera System',
    warranty: '1 Year Apple Care',
    stock: 15,
    tag: 'iPhone 15', // Matches your "Series" dropdown
    isHot: true,
    isNew: true
  },
  {
    id: 27,
    sku: 'APL-IP16-128-PNK',
    name: 'iPhone 16 128GB Pink',
    brand: 'Apple',
    price: 29900,
    category: 'iPhone',
    image: 'https://example.com/iphone16.png',
    specs: 'Chip A18, Action Button, Camera Control',
    warranty: '1 Year Apple Care',
    stock: 0, // Tests your "ของหมด" filter
    tag: 'iPhone 16',
    isSale: true,
    isDiscount: true,
    discountPercentage: 5
  },
  {
    id: 23,
    sku: 'CPU-AMD-RZ7-9800X3D',
    name: 'AMD Ryzen 7 9800X3D',
    brand: 'AMD',
    price: 19500,
    category: 'CPU',
    image: 'https://example.com/ryzen7.png',
    specs: '8 Cores, 16 Threads, 104MB Cache, Socket AM5',
    warranty: '3 Years Warranty',
    stock: 5,
    tag: 'Ryzen 7',
    isHot: true
  },
  {
    id: 24,
    sku: 'VGA-ASU-RTX4080S-O16G',
    name: 'ASUS ROG Strix GeForce RTX 4080 SUPER 16GB',
    brand: 'ASUS',
    price: 45900,
    category: 'GPU',
    image: 'https://example.com/rtx4080.png',
    specs: '16GB GDDR6X, Triple Fan, Aura Sync RGB',
    warranty: '3 Years Warranty',
    stock: 3,
    tag: 'RTX 40 Series',
    isHot: true
  },
  {
    id: 25,
    sku: 'MEM-COR-D5-6000-32GB',
    name: 'CORSAIR VENGEANCE RGB 32GB (16GBx2) DDR5 6000MHz',
    brand: 'Corsair',
    price: 5400,
    category: 'RAM',
    image: 'https://example.com/ram-ddr5.png',
    specs: 'CL36, AMD EXPO / Intel XMP, Black Heatspreader',
    warranty: 'Lifetime Warranty',
    stock: 20,
    tag: 'DDR5'
  },
    // Monitor
    { id: 31, sku: 'ASU-VG279QM', brand: 'ASUS', name: 'MONITOR ASUS TUF GAMING VG279QM - 27" IPS 280Hz G-SYNC', price: 9900, category: 'Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0171213/A0171213OK_BIG_2.jpg', specs: '27" / IPS / 1920x1080 / 1ms / HDR400', promotion: 'ผ่อน 0% นาน 10 เดือน', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '450k', isHot: false },
    { id: 32, sku: 'SNG-G5-32', brand: 'SAMSUNG', name: 'MONITOR SAMSUNG ODYSSEY G5 - 32" VA 2K 144Hz CURVED', price: 8500, category: 'Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0148835/A0148835OK_BIG_2.jpg', specs: '32" / VA / 2560x1440 / 1000R / 1ms', promotion: 'แถมฟรี สาย DP Gold Plate', warranty: 'ประกัน 3-3-3', delivery: 'ส่งฟรีทั่วประเทศ', views: '800k', isHot: true },

    // Gaming Gear
    { id: 41, sku: 'LOG-GPW-SH', brand: 'LOGITECH', name: 'LOGITECH G PRO X SUPERLIGHT 2 - WHITE', price: 4990, category: 'Gaming Gear', image: 'https://img.advice.co.th/images_nas/pic_product4/A0154220/A0154220OK_BIG_5.jpg', specs: 'LIGHTSPEED Wireless / 32K DPI / 60g', promotion: 'แถมฟรี Mousepad G240', warranty: 'ประกัน 2-0-0', delivery: 'ส่งด่วนฟรี', views: '1.8M', isHot: true },
    { id: 42, sku: 'RZR-HNT-V2', brand: 'RAZER', name: 'RAZER HUNTSMAN V3 PRO TKL - ANALOG OPTICAL', price: 7990, category: 'Gaming Gear', image: 'https://e-express.co.th/wp-content/uploads/2024/02/p3-69.webp', specs: 'Rapid Trigger / Adjustable Actuation', promotion: 'รับส่วนลดแลกซื้อสินค้า Razer 10%', warranty: 'ประกัน 2-0-0', delivery: 'ส่งฟรีทั่วประเทศ', views: '600k', isHot: false },
    
    { id: 101, sku: 'APL-IP16P', brand: 'APPLE', name: 'iPhone 16 Pro Max 256GB Desert Titanium', price: 48900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168001/A0168001OK_BIG_1.jpg', specs: 'A18 Pro chip / 6.9" Super Retina XDR', promotion: 'ผ่อน 0% 36 เดือน', warranty: '1 Year AppleCare', delivery: 'ส่งด่วน 3 ชม.', views: '2.5M', isHot: true},
  { id: 102, sku: 'APL-IPA13', brand: 'APPLE', name: 'iPad Air 13-inch M2 Wi-Fi 128GB - Blue', price: 29900, category: 'iPad', image: 'https://img.advice.co.th/images_nas/pic_product4/A0165005/A0165005OK_BIG_1.jpg', specs: 'Apple M2 chip / 13" Liquid Retina', promotion: 'แถมฟรี Apple Pencil Pro', warranty: '1 Year AppleCare', delivery: 'ส่งฟรีทั่วประเทศ', views: '1.2M', isHot: false},

  // --- Laptops ---
  { id: 201, sku: 'ASU-ROG-G16', brand: 'ASUS', name: 'ASUS ROG STRIX G16 G614JVR-N3011W (ECLIPSE GRAY)', price: 54990, category: 'Gaming', image: 'https://img.advice.co.th/images_nas/pic_product4/A0164002/A0164002OK_BIG_1.jpg', specs: 'i7-14650HX / 16GB / 512GB / RTX4060', promotion: 'ลดพิเศษ 3,000.-', warranty: '3 Years On-site', delivery: 'ส่งด่วนฟรี', views: '800k', isHot: true },
  { id: 202, sku: 'MSI-PREST-14', brand: 'MSI', name: 'MSI PRESTIGE 14 AI EVO C1MG-020TH (STELLAR GRAY)', price: 39990, category: 'Thin & Light', image: 'https://img.advice.co.th/images_nas/pic_product4/A0163001/A0163001OK_BIG_1.jpg', specs: 'Ultra 7-155H / 16GB / 1TB / Intel Arc', promotion: 'แถมฟรี MSI Sleeve Case', warranty: '2 Years Warranty', delivery: 'ส่งด่วน 3 ชม.', views: '300k', isHot: false },

  // --- PC Components ---
  { id: 301, sku: 'INT-I7-14700K', brand: 'INTEL', name: 'CPU INTEL CORE I7-14700K 3.4 GHz (SOCKET LGA 1700)', price: 15900, category: 'CPU', image: 'https://img.advice.co.th/images_nas/pic_product4/A0154874/A0154874OK_BIG_1.jpg', specs: '20 Cores / 28 Threads / 5.6 GHz Turbo', promotion: 'แถมเกม Black Myth Wukong', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '1.5M', isHot: true},
  { id: 302, sku: 'ASU-RTX4070S', brand: 'ASUS', name: 'VGA ASUS DUAL GEFORCE RTX 4070 SUPER EVO - 12GB GDDR6X', price: 23900, category: 'GPU', image: 'https://img.advice.co.th/images_nas/pic_product4/A0162005/A0162005OK_BIG_1.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0', promotion: 'ลดเพิ่ม 500.- เมื่อใช้โค้ด', warranty: 'ประกัน 3-3-3', delivery: 'ส่งด่วนฟรี', views: '2.1M', isHot: true, },
  { id: 303, sku: 'MSI-Z790-PRO', brand: 'MSI', name: 'MAINBOARD MSI PRO Z790-P WIFI (DDR5)', price: 7900, category: 'Mainboard', image: 'https://img.advice.co.th/images_nas/pic_product4/A0152112/A0152112OK_BIG_1.jpg', specs: 'Socket 1700 / Z790 / 4 x DDR5', promotion: 'รับส่วนลดแลกซื้อ RAM 10%', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3 ชม.', views: '400k', isHot: false },

  // --- Monitors ---
  { id: 401, sku: 'LG-27GP850', brand: 'LG', name: 'MONITOR LG ULTRAGEAR 27GP850-B - 27" Nano IPS 165Hz', price: 12500, category: 'Gaming Monitor', image: 'https://img.advice.co.th/images_nas/pic_product4/A0142001/A0142001OK_BIG_1.jpg', specs: '27" / QHD / 1ms / G-Sync Compatible', promotion: 'แถมฟรี สาย HDMI 2.1', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3 ชม.', views: '950k', isHot: true },
  { id: 402, sku: 'DEL-U2723QE', brand: 'DELL', name: 'MONITOR DELL ULTRASHARP U2723QE - 27" IPS BLACK 4K', price: 18900, category: '4K UHD', image: 'https://img.advice.co.th/images_nas/pic_product4/A0148002/A0148002OK_BIG_1.jpg', specs: '27" / 4K / USB-C 90W PD / IPS Black', promotion: 'ส่งฟรีทั่วไทย', warranty: '3 Years On-site Premium', delivery: 'ส่งด่วนฟรี', views: '200k', isHot: false },

  // --- Storage ---
  { id: 501, sku: 'SAM-990P-2TB', brand: 'SAMSUNG', name: 'SSD SAMSUNG 990 PRO WITH HEATSINK 2TB M.2 PCIe 4.0', price: 6990, category: 'NVMe', image: 'https://img.advice.co.th/images_nas/pic_product4/A0153005/A0153005OK_BIG_1.jpg', specs: 'Read 7450MB/s / Write 6900MB/s', promotion: 'ราคาพิเศษสุดคุ้ม', warranty: 'ประกัน 5-0-0', delivery: 'จัดส่งด่วน 3 ชม.', views: '3M', isHot: true , stock : 10 },
  { id: 502, sku: 'WD-BLUE-4TB', brand: 'WD', name: '4 TB HDD WD BLUE (5400RPM, 256MB, SATA 3)', price: 3450, category: 'External HDD', image: 'https://img.advice.co.th/images_nas/pic_product4/A0120001/A0120001OK_BIG_1.jpg', specs: '3.5" / SATA III / 256MB Cache', promotion: 'ซื้อ 2 ลูกลดเพิ่ม 300.-', warranty: 'ประกัน 3-0-0', delivery: 'ส่งฟรีทั่วไทย', views: '150k', isHot: false ,stock : 10 },
  { id: 110, sku: 'APL-IPX-256', brand: 'APPLE', name: 'iPhone X 256GB Silver (Refurbished)', price: 8900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0110001/A0110001_1.jpg', specs: '5.8" OLED / A11 Bionic / Dual 12MP Cam', promotion: 'ราคาพิเศษ', warranty: 'ประกันร้าน 3 เดือน', delivery: 'ส่งฟรี', views: '1.2M', tag: 'iPhone X' , stock: 10 },
  { id: 111, sku: 'APL-IP11-128', brand: 'APPLE', name: 'iPhone 11 128GB Black', price: 14500, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0130011/A0130011_1.jpg', specs: '6.1" LCD / A13 Bionic / Dual Cam', promotion: 'ลดล้างสต็อก', warranty: '1 Year Apple', delivery: 'ส่งฟรี', views: '2M', tag: 'iPhone 11' ,stock: 10 },
  { id: 112, sku: 'APL-IP12-128', brand: 'APPLE', name: 'iPhone 12 128GB White', price: 18900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0140012/A0140012_1.jpg', specs: '6.1" OLED / A14 Bionic / 5G Support', promotion: 'ผ่อน 0% 10 เดือน', warranty: '1 Year Apple', delivery: 'ส่งฟรี', views: '1.5M', tag: 'iPhone 12' , stock: 10},
  { id: 113, sku: 'APL-IP13-128', brand: 'APPLE', name: 'iPhone 13 128GB Midnight', price: 21500, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0145013/A0145013_1.jpg', specs: '6.1" OLED / A15 Bionic / Super Retina XDR', promotion: 'แถมฟรี Case & Film', warranty: '1 Year Apple', delivery: 'ส่งด่วน 3 ชม.', views: '2.8M', tag: 'iPhone 13',stock : 10 },
  { id: 114, sku: 'APL-IP14-128', brand: 'APPLE', name: 'iPhone 14 128GB Blue', price: 24900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0150014/A0150014_1.jpg', specs: '6.1" OLED / A15 Bionic (5-core GPU)', promotion: 'รับส่วนลดแลกซื้อ AirPods', warranty: '1 Year AppleCare', delivery: 'ส่งฟรี', views: '1.1M', tag: 'iPhone 14' , stock : 10},
  { id: 115, sku: 'APL-IP15P-256', brand: 'APPLE', name: 'iPhone 15 Pro 256GB Natural Titanium', price: 36900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0160015/A0160015_1.jpg', specs: '6.1" 120Hz / A17 Pro / Titanium Design', promotion: 'Trade-in รับเพิ่ม 2,000.-', warranty: '1 Year AppleCare', delivery: 'ส่งด่วน 3 ชม.', views: '3.5M', tag: 'iPhone 15' },
  { id: 116, sku: 'APL-IP16P-256', brand: 'APPLE', name: 'iPhone 16 Pro Max 256GB Black Titanium', price: 48900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0168016/A0168016_1.jpg', specs: '6.9" / A18 Pro / Camera Control Button', promotion: 'Point x2 เมื่อซื้อผ่านบัตรที่ร่วมรายการ', warranty: '1 Year AppleCare', delivery: 'ส่งด่วน 3 ชม.', views: '5M', isHot: true, tag: 'iPhone 16' },
  { id: 117, sku: 'APL-IP17P-256', brand: 'APPLE', name: 'iPhone 17 Pro Max (Concept Version)', price: 52900, category: 'iPhone', image: 'https://img.advice.co.th/images_nas/pic_product4/A0170017/A0170017_1.jpg', specs: '6.9" / A19 Pro / Under-display Face ID', promotion: 'Pre-order Exclusive', warranty: '1 Year AppleCare', delivery: 'ส่งฟรี', views: '9M', isHot: true, tag: 'iPhone 17' },
    ]);

  const newList = useState<News[]>('dashboard-news-list', () => [
    { id: 1, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
    { id: 2, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
    { id: 3, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
    { id: 4, title: 'New GPU Release', link: '#', description: 'Latest news...', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU' },
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
    .slice(0, 7)
    .map((p, index) => {
      // จำลองส่วนลด
      const discount = 500 + index * 200;
      const oldPrice = p.price + discount;

      return {
        id: p.id,
        image: p.image,
        brand: p.brand,
        name: p.name,
        spec: p.specs,
        price: p.price,
        oldPrice: oldPrice,
        discount: discount,
        readyPoint: Math.floor(p.price / 20)
      };
    });
});

  return {
    startDate, endDate, banner1, banner2, products, trendingProducts, newList, stats, categoryTitle, chartData, productDistribution, quickAccessItems, topSales, bottomSales 
  };
};

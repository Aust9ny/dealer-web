<script setup lang="ts">
import type { Product , } from '~/types/product';
import type { Banner } from '~/types/banner';
import type { News } from '~/types/news';
import BarChart from '../components/IndexChart.vue';

const banner1 = ref<Banner[]>([
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Next-Gen GPU Architecture Update' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Cybersecurity & Tech Infrastructure News' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Latest Semi-conductor Technology' 
  },
]);

const banner2 = ref<Banner[]>([
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'AI & Machine Learning Breakthroughs' 
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Cloud Computing & Server Solutions' 
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1920&auto=format&fit=crop', 
    link: '#', 
    alt: 'Future Tech & Smart Innovation' 
  },
]);

const products = ref<Product[]>([
  { id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 2, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 3, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 4, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 5, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 6, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 10, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 21, sku: 'INT-I5-14600K', brand: 'INTEL', name: 'CPU INTEL CORE I5-14600K 3.5 GHz (SOCKET LGA 1700)', price: 11900, category: 'CPU', image: 'https://m.media-amazon.com/images/I/51pU-6l9ZHL._AC_SL1021_.jpg', specs: '14 Cores / 20 Threads / 5.3 GHz Turbo', promotion: 'ลดพิเศษ 500.- เมื่อซื้อพร้อมบอร์ด', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '1.2M', isHot: true },
  { id: 22, sku: 'AMD-R7-7800X3D', brand: 'AMD', name: 'CPU AMD RYZEN 7 7800X3D 4.2 GHz (SOCKET AM5)', price: 15500, category: 'CPU', image: 'https://m.media-amazon.com/images/I/51m-pYhO0nL._AC_SL1000_.jpg', specs: '8 Cores / 16 Threads / 96MB L3 Cache', promotion: 'แถมเกม Star Wars Outlaws', warranty: 'ประกัน 3-0-0', delivery: 'ส่งฟรีทั่วประเทศ', views: '2.5M', isHot: true },

  // Monitor
  { id: 31, sku: 'ASU-VG279QM', brand: 'ASUS', name: 'MONITOR ASUS TUF GAMING VG279QM - 27" IPS 280Hz G-SYNC', price: 9900, category: 'Monitor', image: 'https://m.media-amazon.com/images/I/81268rK4X2L._AC_SL1500_.jpg', specs: '27" / IPS / 1920x1080 / 1ms / HDR400', promotion: 'ผ่อน 0% นาน 10 เดือน', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม.', views: '450k', isHot: false },
  { id: 32, sku: 'SNG-G5-32', brand: 'SAMSUNG', name: 'MONITOR SAMSUNG ODYSSEY G5 - 32" VA 2K 144Hz CURVED', price: 8500, category: 'Monitor', image: 'https://m.media-amazon.com/images/I/81v8R5-yF7L._AC_SL1500_.jpg', specs: '32" / VA / 2560x1440 / 1000R / 1ms', promotion: 'แถมฟรี สาย DP Gold Plate', warranty: 'ประกัน 3-3-3', delivery: 'ส่งฟรีทั่วประเทศ', views: '800k', isHot: true },

  // Gaming Gear
  { id: 41, sku: 'LOG-GPW-SH', brand: 'LOGITECH', name: 'LOGITECH G PRO X SUPERLIGHT 2 - WHITE', price: 4990, category: 'Gaming Gear', image: 'https://m.media-amazon.com/images/I/51A5rBfM61L._AC_SL1500_.jpg', specs: 'LIGHTSPEED Wireless / 32K DPI / 60g', promotion: 'แถมฟรี Mousepad G240', warranty: 'ประกัน 2-0-0', delivery: 'ส่งด่วนฟรี', views: '1.8M', isHot: true },
  { id: 42, sku: 'RZR-HNT-V2', brand: 'RAZER', name: 'RAZER HUNTSMAN V3 PRO TKL - ANALOG OPTICAL', price: 7990, category: 'Gaming Gear', image: 'https://m.media-amazon.com/images/I/71YyO3A8xEL._AC_SL1500_.jpg', specs: 'Rapid Trigger / Adjustable Actuation', promotion: 'รับส่วนลดแลกซื้อสินค้า Razer 10%', warranty: 'ประกัน 2-0-0', delivery: 'ส่งฟรีทั่วประเทศ', views: '600k', isHot: false },
  // ... (Keep your original product list here)
]);

const newList = ref<News[]>([
  { id: 1, title: 'New GPU Release', link: '#', description: 'The latest GPU has been released with amazing features.', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU Release' },
  { id: 2, title: 'Tech Conference 2024', link: '#', description: 'Join us at the annual tech conference to explore new innovations.', date: '2024-05-20', image: 'https://img.advice.co.th/images_nas/advice_activity/202601302059541189.jpg', alt: 'Tech Conference' },
  { id: 3, title: 'New GPU Release', link: '#', description: 'The latest GPU has been released with amazing features.', date: '2024-06-01', image: 'https://img.advice.co.th/images_nas/advice_activity/202602022186856919.jpg', alt: 'GPU Release' },
  { id: 4, title: 'Tech Conference 2024', link: '#', description: 'Join us at the annual tech conference to explore new innovations.', date: '2024-05-20', image: 'https://img.advice.co.th/images_nas/advice_activity/202601302059541189.jpg', alt: 'Tech Conference' },
  // ... (Add more news items as needed)
]);

const stats = [
  { label: 'ยอดสั่งซื้อสะสม', value: '฿13,342,314', colorClass: 'text-slate-800', icon: '💰' },
  { label: 'สินค้าค้างส่ง', value: '10 รายการ', colorClass: 'text-slate-800', icon: '📦' },
  { label: 'สินค้าเคลมรอตัดสินใจ', value: '10 รายการ', colorClass: 'text-slate-800', icon: '⚠️' },
  { label: 'รายการจัดส่ง', value: '10 รายการ', colorClass: 'text-slate-800', icon: '🚚' },
];

const categoryTitle = computed(() => {
  return products.value.length > 0 ? products.value[0].category : 'Products';
});


const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

</script>
<template>
  <div class="bg-gray-100 min-h-screen font-thai">
    <div class="max-w-400 mx-auto p-6">
      <div class="grid grid-cols-12 gap-6">
        
        <aside class="col-span-12 lg:col-span-3 space-y-4">
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-300">
            <nav class="space-y-6">
              <div>
                <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span class="text-lg">🛒</span> ระบบการสั่งซื้อ
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li class="hover:text-[#2196F3] cursor-pointer transition">สั่งซื้อสินค้า</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">รายการสินค้าค้างส่ง</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">ใบสั่งซื้อย้อนหลัง</li>
                </ul>
                <div class="mt-4 h-px w-full bg-slate-400"/>
              </div>

              <div>
                <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span class="text-lg">💳</span> การเงินและชำระเงิน
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li class="hover:text-[#2196F3] cursor-pointer transition">ชำระ / อัปโหลดหลักฐานโอน</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">ชำระหนี้ Advice สนญ.</li>
                </ul>
                <div class="mt-4 h-px w-full bg-slate-400"/>
              </div>
              
              <div>
                <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span class="text-lg">💳</span> ติดตามสถานะและเคลม
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li class="hover:text-[#2196F3] cursor-pointer transition">ตรวจสอบสถานะการเคลม</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">สินค้าเคลมรอตัดสินใจ</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">รายงานการจัดส่ง</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">เงื่อนไขการจัดส่ง</li>
                </ul>
                <div class="mt-4 h-px w-full bg-slate-400"/>
              </div>
              
              <div>
                <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span class="text-lg">💳</span> สื่อการขายและโปรโมชั่น
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li class="hover:text-[#2196F3] cursor-pointer transition">โปรโมชั่น Dealers</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">พิมพ์ป้ายราคา (Standard)</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">พิมพ์ป้ายราคา (Gaming)</li>
                </ul>
                <div class="mt-4 h-px w-full bg-slate-400"/>
              </div>

              <div>
                <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span class="text-lg">💳</span> ข้อมูลและการตั้งค่า
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li class="hover:text-[#2196F3] cursor-pointer transition">รายการเคลื่อนไหวของบัญชี</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">รายขื่อไฟล์ที่อัปโหลด</li>
                  <li class="hover:text-[#2196F3] cursor-pointer transition">เงื่อนไขการจัดส่ง</li>
                </ul>
                <div class="mt-4 h-px w-full bg-slate-100"/>
              </div>

            </nav>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-9 space-y-10">
          
          <header class="bg-white rounded-2xl p-4 shadow-sm border border-slate-300 flex flex-wrap items-center justify-between gap-4 ">
            <h2 class="font-bold text-xl text-slate-800 px-2">สรุปผลการดำเนินงาน</h2>
            <div class="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl p-1.5">
              <input v-model="startDate" type="date" class="bg-transparent border-none text-sm focus:ring-0">
              <span class="text-slate-300">|</span>
              <input v-model="endDate" type="date" class="bg-transparent border-none text-sm focus:ring-0">
              <button class="bg-[#00569C] p-2.5 rounded-lg text-white hover:bg-[#004a86] transition active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" /></svg>
              </button>
            </div>
          </header>

<div class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-slate-300 w-full">
    


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="relative overflow-hidden bg-white border border-slate-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group cursor-pointer"
      >
        <div class="flex justify-between items-start relative z-10">
          <div>
            <p class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
              {{ stat.label }}
            </p>
            <h2 class="text-2xl font-black tracking-tight" :class="stat.colorClass">
              {{ stat.value }}
            </h2>
          </div>
          <span class="text-slate-300 group-hover:text-slate-500 transition-colors">❯</span>
        </div>
        
        <div class="absolute -right-2 -bottom-2 opacity-5 text-4xl grayscale">
          {{ stat.icon }}
        </div>
      </div>
      <h1 class="text-xl font-bold text-slate-800">ยอดขายรายเดือน</h1>
    </div>

    <div class="w-full h-100 relative">
      <BarChart />
    </div>

  </div>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div v-for="i in 5" :key="i" class="bg-slate-100 p-4 rounded-2xl shadow-sm border border-slate-300 text-center hover:border-blue-400 transition cursor-pointer group">
              <div class="w-30 h-30 bg-slate-50 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:bg-blue-50 transition ">
                Quick Access
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>

    <div class="bg-white border-t border-slate-200  pb-20 px-6">
      <div class="max-w-350 mx-auto space-y-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="rounded-2xl overflow-hidden shadow-lg aspect-2/1">
            <PromotionBanner :banners="banner1" />
          </div>
          <div class="rounded-2xl overflow-hidden shadow-lg aspect-2/1">
            <PromotionBanner :banners="banner2" />
          </div>
        </div>

        <ProductList :title="categoryTitle" :products="products" />
        
        <FooterNews :news-list="newList" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>
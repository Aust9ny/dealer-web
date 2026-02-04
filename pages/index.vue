<script setup lang="ts">
import type { Product , } from '~/types/product';
import type { Banner } from '~/types/banner';
import type { News } from '~/types/news';

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

const categoryTitle = computed(() => {
  return products.value.length > 0 ? products.value[0].category : 'Products';
});


const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

</script>
<template>
  <div class="bg-gray-50 min-h-screen">
  <div class="grid grid-cols-8 grid-rows-6 gap-4 p-6 bg-gray-50 min-h-screen">
    <div
      class="row-span-6 col-span-1 col-start-2 bg-white rounded-xl p-4 space-y-4 shadow-sm"
    >
      <div>
        <h3 class="font-semibold flex items-center gap-2">
          🛒 ระบบการสั่งซื้อ
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>สั่งซื้อสินค้า</li>
          <li>รายการสินค้าค้างส่ง</li>
          <li>ใบสั่งซื้อย้อนหลัง</li>
        </ul>
      </div>
      <div class="mt-2 h-0.5 w-full bg-gray-200"/>
      <div>
        <h3 class="font-semibold flex items-center gap-2">
          💳 การเงินและชำระเงิน
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>ชำระ / อัปโหลดหลักฐานโอน</li>
          <li>ชำระหนี้ Advice สนญ.</li>
        </ul>
      </div>
      <div class="mt-2 h-0.5 w-full bg-gray-200"/>
      <div>
        <h3 class="font-semibold flex items-center gap-2">
          📦 ติดตามสถานะและเคลม
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>ตรวจสอบสถานะการเคลม</li>
          <li>สินค้าคืนรอตัดสินใจ</li>
          <li>รายงานการจัดส่ง</li>
        </ul>
      </div>
      <div class="mt-2 h-0.5 w-full bg-gray-200"/>
      <div>
        <h3 class="font-semibold flex items-center gap-2">
          🏷 สื่อการขายและโปรโมชั่น
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>โปรโมชั่น Dealers</li>
          <li>พิมพ์ป้ายราคา (Standard)</li>
          <li>พิมพ์ป้ายราคา (Gaming)</li>
        </ul>
      </div>
      <div class="mt-2 h-0.5 w-full bg-gray-200"/>
      <div>
        <h3 class="font-semibold flex items-center gap-2">
          ⚙️ ข้อมูลและตั้งค่า
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>รายการเคลื่อนไหวของบัญชี</li>
          <li>รายชื่อไฟล์ที่อัปโหลด</li>
          <li>เงื่อนไขการจัดส่ง</li>
        </ul>
      </div>
      <div class="mt-2 h-0.5 w-full bg-gray-200"/>
    </div>

    <div
  class="col-span-5 col-start-3 bg-white rounded-xl p-4 shadow-sm
         flex items-center justify-between"
>
      <h2 class="font-semibold text-gray-700">
        สรุปผลการดำเนินงาน
      </h2>

      <!-- Outer frame -->
      <div
        class="flex items-center gap-2 text-sm
              bg-gray-50 border border-gray-200
              rounded-xl px-3 py-2"
      >
      <!-- Start date -->
        <input
          v-model="startDate"
          type="date"
          class="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        >
        <span class="text-gray-400">–</span>
      <!-- End date -->
        <input
          v-model="endDate"
          type="date"
          class="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        >

        <button class = "ml-1 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00569C] text-white hover:bg-[#004a86] active:scale-95 transition" title="ค้นหา" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="col-span-5 col-start-3 row-span-3 row-start-2 bg-white rounded-xl shadow-sm flex items-center justify-center text-center"
    >
      <div class="space-y-2">
        <p class="text-xl font-semibold text-gray-700">Dashboard Area</p>
        <p class="text-sm text-gray-500">
          ยอดเงินที่สั่งซื้อ, รายงานการสั่งซื้อ,<br>
          สินค้าค้างส่ง, สินค้าขายดี
        </p>
      </div>
    </div>
    <div
      class="row-span-2 col-start-3 row-start-5 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      Quick Shortcuts
    </div>

    <div
      class="row-span-2 col-start-4 row-start-5 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      Quick Shortcuts
    </div>

    <div
      class="row-span-2 col-start-5 row-start-5 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      Quick Shortcuts
    </div>

    <div
      class="row-span-2 col-start-6 row-start-5 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      Quick Shortcuts
    </div>

    <div
      class="row-span-2 col-start-7 row-start-5 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      Quick Shortcuts
    </div>
  </div>

  <div class="min-h-screen bg-[#F8FCF8] py-4 px-2 md:px-6">
     <div class="mx-auto max-w-1400px"> 
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        
        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div class="aspect-4/1 w-full"> 
            <PromotionBanner :banners="banner1" />
          </div>
        </div>

        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div class="aspect-4/1 w-full"> 
            <PromotionBanner :banners="banner2" />
          </div>
        </div>
        
      </div>

      <div class="mt-4">
        <ProductList 
          :title="categoryTitle"
          :products="products" 
        />
      </div>
      <div class="mt-12">
        <FooterNews :news-list="newList" />
    </div>
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
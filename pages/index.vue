<script setup lang="ts">
import type { Product } from '~/types/product';


const products = ref<Product[]>([
  { id: 1, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 2, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 3, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 4, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 5, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 6, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  { id: 10, sku: 'ZTC-4060TI', brand: 'ZOTAC', name: 'VGA ZOTAC GEFORCE RTX 4060 TI TWIN EDGE SPIDERMAN OC - 8GB GDDR6', price: 13300, category: 'VGA', image: 'https://m.media-amazon.com/images/I/81H2tfnNReL._AC_SL1500_.jpg', specs: '12GB / GDDR6X / 192-bit / PCIe4.0 / 1xHDMI / 3xDp', promotion: 'แถมฟรี | เมื่อซื้อ GeForce RTX 3080 Blac', warranty: 'ประกัน 3-3-3', delivery: 'จัดส่งด่วน 3-5 ชม. ฟรี', views: '900k', isHot: true },
  // ... (Keep your original product list here)
]);

const categoryTitle = computed(() => {
  return products.value.length > 0 ? products.value[0].category : 'Products';
});

const startDate = ref<string>('');
const endDate = ref<string>('');

const applyDate = () => {
  console.log('ช่วงวันที่เลือก:', startDate.value, endDate.value);
}

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
      <div class="mt-2 h-[2px] w-full bg-gray-200"/>
      <div>
        <h3 class="font-semibold flex items-center gap-2">
          💳 การเงินและชำระเงิน
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>ชำระ / อัปโหลดหลักฐานโอน</li>
          <li>ชำระหนี้ Advice สนญ.</li>
        </ul>
      </div>
      <div class="mt-2 h-[2px] w-full bg-gray-200"/>
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
      <div class="mt-2 h-[2px] w-full bg-gray-200"/>
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
      <div class="mt-2 h-[2px] w-full bg-gray-200"/>
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
      <div class="mt-2 h-[2px] w-full bg-gray-200"/>
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
          type="date"
          v-model="startDate"
          class="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        />

        <span class="text-gray-400">–</span>

        <!-- End date -->
        <input
          type="date"
          v-model="endDate"
          class="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        />
        <button class = "ml-1 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00569C] text-white hover:bg-[#004a86] active:scale-95 transition" title="ค้นหา" @click="applyDate">
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
  <!-- ===== PRODUCT LIST (OUTSIDE GRID) ===== -->
    <section class="bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <ProductList
          :title="categoryTitle"
          :products="products"
        />
      </div>
    </section>
  </div>
</template>
<style scoped>
.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>

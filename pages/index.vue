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
</script>


<template>
  <div class="grid grid-cols-8 grid-rows-8 gap-4 p-6 bg-gray-50 min-h-screen">
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

      <div>
        <h3 class="font-semibold flex items-center gap-2">
          💳 การเงินและชำระเงิน
        </h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-600">
          <li>ชำระ / อัปโหลดหลักฐานโอน</li>
          <li>ชำระหนี้ Advice สนญ.</li>
        </ul>
      </div>

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
    </div>

    <div
      class="col-span-5 col-start-3 bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
    >
      <h2 class="font-semibold">สรุปผลการดำเนินงาน:</h2>
      <div class="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm">
        <span>01/04/2024</span>
        <span>→</span>
        <span>01/04/2025</span>
      </div>
    </div>
    <div
      class="col-span-5 col-start-3 row-span-3 row-start-2 bg-white rounded-xl shadow-sm flex items-center justify-center text-center"
    >
      <div class="space-y-2">
        <p class="text-xl font-semibold text-gray-700">Dashboard Area</p>
        <p class="text-sm text-gray-500">
          ยอดเงินที่สั่งซื้อ, รายงานการสั่งซื้อ,<br />
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
    <div
      class="col-span-3 col-start-2 row-span-2 row-start-7 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      <span class="text-gray-500">Banner Left</span>
    </div> 
    <div
      class="col-span-3 col-start-5 row-span-2 row-start-7 bg-white rounded-xl shadow-sm flex items-center justify-center"
    >
      <span class="text-gray-500">Banner Right</span>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4">
    <ProductList 
      :title="categoryTitle"
      :products="products" 
    />
  </div>
</template>
<style scoped>
.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>

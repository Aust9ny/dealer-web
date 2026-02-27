<template>
  <!-- Card -->
  <div class="w-[85%] mx-auto mt-10 bg-[#ffffff] rounded p-10">
    <!-- Back -->
    <div class="mb-6">
      <NuxtLink
        to="/"
        class="inline-block bg-white border border-slate-300 px-4 py-2 text-sm rounded-md shadow-sm hover:bg-slate-50 transition"
      >
        ◀ ย้อนกลับ
      </NuxtLink>
    </div>

    <!-- Card Header -->
    <div class="text-center mb-8">
      <h2 class="text-[#2a7dbf] text-xl font-semibold">
        รายงานการจัดส่งสินค้า
      </h2>
    </div>

    <!-- Filter Section -->
    <div class="flex items-end gap-4 mb-5">
      <div class="flex flex-col text-sm">
        <label class="mb-1">วันที่เริ่ม</label>
        <input
          v-model="startDate"
          type="date"
          class="border border-gray-300 rounded px-3 py-1.5 min-w-[160px] bg-white"
        >
      </div>

      <div class="flex flex-col text-sm">
        <label class="mb-1">ถึง</label>
        <input
          v-model="endDate"
          type="date"
          class="border border-gray-300 rounded px-3 py-1.5 min-w-[160px] bg-white"
        >
      </div>

      <div class="flex flex-col text-sm">
        <select
          v-model="deliveryType"
          class="border border-gray-300 rounded px-3 py-1.5 min-w-[160px] bg-white"
        >
          <option value="">การจัดส่งทั้งหมด</option>
          <option value="tran">Trantach</option>
          <option value="ntc">NTC</option>
        </select>
      </div>

      <button
        class="bg-[#2a7dbf] hover:bg-[#1f6397] text-white px-5 py-2 rounded text-sm"
      >
        ค้นหา
      </button>
    </div>

    <div class="mt-6 overflow-x-auto border border-slate-200 rounded-md">
      <div class="mt-6 overflow-x-auto border border-slate-200 rounded-md">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-[#2a7dbf] text-white text-center">
              <th class="px-4 py-3 border">เลขที่บิล</th>
              <th class="px-4 py-3 border">วันที่ส่ง</th>
              <th class="px-4 py-3 border">เลขที่บิลขนส่ง</th>
              <th class="px-4 py-3 border">ประเภทการจัดส่ง</th>
              <th class="px-4 py-3 border">ประเภทกล่อง</th>
              <th class="px-4 py-3 border">จำนวนกล่อง</th>
              <th class="px-4 py-3 border">น้ำหนักสุทธิ</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    <!-- Phone Section -->
    <!-- Phone Section -->
    <div class="mt-4 text-sm">
      <!-- หัวข้อ -->
      <div class="bg-gray-100 px-4 py-3 font-medium">
        หมายเลขโทรศัพท์สำหรับรายงานติดต่อลูกค้า
      </div>

      <!-- Trantach -->
      <div class="flex px-4 py-3 bg-white">
        <div class="w-1/6 text-[#2a7dbf]">Trantach</div>
        <div class="w-2/6">065-0052555 (Call Center)</div>
      </div>

      <!-- NTC -->
      <div class="flex px-4 py-3 bg-gray-50">
        <div class="w-1/6 text-[#2a7dbf]">NTC</div>
        <div class="w-2/6">026119582 / 026119584 / 026118454</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-10 text-center">
      <button
        class="bg-[#2a7dbf] hover:bg-[#1f6397] text-white px-7 py-2.5 rounded"
      >
        ตกลง
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const startDate = ref('2026-02-26');
const endDate = ref('2026-02-26');
const deliveryType = ref('');
</script>

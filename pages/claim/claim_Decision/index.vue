<template>
  <div class="bg-slate-100 min-h-screen p-8">
    <!-- Back -->
    <div class="mb-6">
      <NuxtLink
        to="/"
        class="inline-block bg-white border border-slate-300 px-4 py-2 text-sm rounded-md shadow-sm hover:bg-slate-50 transition"
      >
        ◀ ย้อนกลับ
      </NuxtLink>
    </div>

    <!-- Main Container -->
    <div class="bg-white border border-slate-200 shadow-sm rounded-lg p-8">
      <!-- Title -->
      <h2 class="text-center text-xl font-semibold text-slate-700 mb-8">
        สินค้าเคลมรอตัดสินใจ
      </h2>

      <!-- Filter Bar -->
      <div class="bg-[#2a7dbf] text-white rounded-md shadow-sm">
        <div class="grid grid-cols-12 items-center text-sm">
          <!-- 1 เงื่อนไข -->
          <div class="col-span-1 px-4 py-3 border-r border-blue-500">
            เงื่อนไข
          </div>

          <!-- 2 Dropdown -->
          <div class="col-span-2 px-4 py-3 border-r border-blue-500">
            <select
              class="w-full bg-white text-slate-700 border border-slate-300 rounded-md px-3 py-1.5 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            >
              <option>เฉพาะยังไม่ได้ตอบ</option>
              <option>ทั้งหมด</option>
            </select>
          </div>

          <!-- 3 ค้นหา + ช่องกรอก -->
          <div
            class="col-span-3 px-4 py-3 border-r border-blue-500 flex items-center gap-2"
          >
            <span>ค้นหา</span>
            <input
              type="text"
              placeholder="SN / CM / CODE"
              class="flex-1 bg-white text-slate-700 border border-slate-300 rounded-md px-3 py-1.5 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
            >
          </div>

          <!-- 4 Checkbox + ช่วงวันที่ -->
          <div
            class="col-span-4 px-4 py-3 border-r border-blue-500 flex items-center gap-4"
          >
            <div class="flex items-center gap-2">
              <input type="checkbox" class="w-4 h-4 accent-blue-600" >
              <span>[คลิกเพื่อแก้ไข]</span>
            </div>

            <div class="flex items-center gap-2">
              <span>ช่วงวันที่</span>
              <input
                type="date"
                class="bg-white text-slate-700 border border-slate-300 rounded-md px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
              >
              <span>-</span>
              <input
                type="date"
                class="bg-white text-slate-700 border border-slate-300 rounded-md px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
              >
            </div>
          </div>

          <!-- 5 ปุ่มค้นหา -->
          <div class="col-span-2 px-4 py-3 flex justify-end">
            <button
              class="bg-white text-[#2a7dbf] border border-blue-300 px-6 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition"
            >
              ค้นหาตามเงื่อนไข
            </button>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="text-xs text-slate-600 mt-6 leading-relaxed space-y-1">
        <p>
          ท่านสามารถเลือก <b>“ยอมรับ”</b> หรือ <b>“ปฏิเสธ”</b> เงื่อนไขได้
          โดยกดที่คำว่า “ยืนยัน” record สุดท้าย (สีชมพู)
        </p>
        <p>YES = กดยอมรับเงื่อนไขเรียบร้อยแล้ว</p>
        <p>NO = ปฏิเสธเงื่อนไขนั้นแล้ว</p>
      </div>

      <div class="text-sm text-slate-500 mt-4">
        ไม่พบข้อมูล ตามเงื่อนไขที่ท่านค้นหา
      </div>

      <!-- Table -->
      <div class="mt-6 overflow-x-auto border border-slate-200 rounded-md">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-pink-500 text-white text-center">
              <th class="px-4 py-3 font-medium">เลขที่ CM</th>
              <th class="px-4 py-3 font-medium">เลขที่ SN</th>
              <th class="px-4 py-3 font-medium">CODE สินค้า</th>
              <th class="px-4 py-3 font-medium">ชื่อสินค้า</th>
              <th class="px-4 py-3 font-medium">Decision Detail</th>
              <th class="px-4 py-3 font-medium">เมื่อวันที่</th>
              <th class="px-4 py-3 font-medium">หมายเหตุ</th>
              <th class="px-4 py-3 font-medium">ค่าใช้จ่ายเพิ่ม</th>
              <th class="px-4 py-3 font-medium">ยืนยัน</th>
            </tr>
          </thead>

          <tbody>
            <tr class="text-center hover:bg-slate-50 transition">
              <td colspan="9" class="py-6 text-slate-400">ยังไม่มีข้อมูล</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-xs text-slate-500 border-t pt-4">
        Claim Decision Status : โปรแกรมเช็คการอนุมัติจากทางลูกค้า
        เพื่อยืนยันการทราบเงื่อนไขเพิ่มเติม<br >
        www.thesystem.co.th
      </div>
    </div>
  </div>
</template>

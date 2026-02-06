<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto grid grid-cols-6 grid-rows-7 gap-4 p-3">
      <!-- 1 : Sidebar top (โปรไฟล์) -->
      <div
        class="col-span-2 row-span-1 bg-white rounded-xl shadow overflow-hidden"
      >
        <div class="h-2 bg-[#00569C]"></div>

        <div class="p-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-[#00569C] text-white flex items-center justify-center font-semibold text-sm"
            >
              PS
            </div>
            <p class="font-medium text-gray-800">สวัสดี, พัค แชร์อย</p>
          </div>

          <div class="my-3 border-t border-gray-200"></div>

          <div class="space-y-1 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Dealer ID:</span>
              <span class="text-gray-700 font-medium">1234567890</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Email:</span>
              <span class="text-gray-700">yourmail@company.com</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 : Header content -->
      <div
        class="col-span-4 row-span-1 col-start-3 bg-white rounded-xl shadow overflow-hidden"
      >
        <div
          class="bg-[#00569C] text-white px-5 py-3 font-medium flex items-center gap-2"
        >
          📄 รายการสั่งซื้อทั้งหมด
        </div>

        <div class="px-5 py-4">
          <div class="flex gap-6 text-sm border-b">
            <span
              class="text-[#00569C] border-b-2 border-[#00569C] pb-2 cursor-pointer"
            >
              ทั้งหมด (99)
            </span>
            <span class="text-gray-500 cursor-pointer">ที่ต้องชำระ (99)</span>
            <span class="text-gray-500 cursor-pointer">รอตรวจสอบ (99)</span>
            <span class="text-gray-500 cursor-pointer">กำลังจัดส่ง (99)</span>
            <span class="text-gray-500 cursor-pointer">สำเร็จ (99)</span>
            <span class="text-gray-500 cursor-pointer">ยกเลิก (99)</span>
          </div>

          <div class="mt-4">
            <input
              type="text"
              placeholder="ค้นหาสินค้า, แบรนด์, รุ่น หรือหมายเลขคำสั่งซื้อ"
              class="w-full h-11 px-4 rounded-full border focus:ring-2 focus:ring-[#00569C] outline-none"
            />
          </div>
        </div>
      </div>

      <!-- 5 : Sidebar -->
      <div
        class="col-span-2 row-span-5 row-start-2 bg-white rounded-xl shadow flex flex-col"
      >
        <!-- content -->
        <div class="p-4 space-y-5 flex-1">
          <!-- จัดการคำสั่งซื้อ -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="font-medium text-gray-800">จัดการคำสั่งซื้อ</span>
            </div>

            <ul class="text-sm space-y-2">
              <li
                class="flex items-center justify-between text-[#00569C] font-medium cursor-pointer"
              >
                <span>รายการสั่งซื้อทั้งหมด</span>
                <span
                  class="text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                >
                  99
                </span>
              </li>

              <li class="text-gray-600 hover:text-[#00569C] cursor-pointer">
                รายการสินค้าค้างส่ง
              </li>
              <li class="text-gray-600 hover:text-[#00569C] cursor-pointer">
                ติดตามสถานะการจัดส่ง
              </li>
            </ul>
          </div>

          <div class="border-t border-gray-200"></div>

          <!-- การเงินและชำระเงิน -->
          <div>
            <p class="font-medium mb-2">การเงินและชำระเงิน</p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="hover:text-[#00569C] cursor-pointer">
                ชำระเงิน / อัปโหลดหลักฐาน
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                จ่ายชำระหนี้ Advice สนญ.
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                รายการเคลื่อนไหวบัญชี
              </li>
            </ul>
          </div>

          <div class="border-t border-gray-200"></div>

          <!-- งานบริการ -->
          <div>
            <p class="font-medium mb-2">งานบริการและติดตามสถานะเคลม</p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="hover:text-[#00569C] cursor-pointer">
                ตรวจสอบสถานะการแจ้งเคลม
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                สินค้าเคลมรอตัดสินใจ
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                รายงานการส่งคืน
              </li>
            </ul>
          </div>

          <div class="border-t border-gray-200"></div>

          <!-- ข้อมูลบัญชี -->
          <div>
            <p class="font-medium mb-2">ข้อมูลบัญชี</p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="hover:text-[#00569C] cursor-pointer">
                ข้อมูลส่วนตัวดีลเลอร์
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                รายชื่อไฟล์อัปโหลด
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                เงื่อนไขการจัดส่ง
              </li>
              <li class="hover:text-[#00569C] cursor-pointer">
                เปลี่ยนรหัสผ่าน
              </li>
            </ul>
          </div>
          <div class="mt-auto p-4 pt-3 border-t border-gray-200"></div>
        </div>
        
        <!-- logout -->
        <div class="mt-auto p-4 mb-3">
          <button
            class="w-full flex items-center justify-center gap-2 border border-red-400 text-red-600 rounded-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 active:bg-red-700 active:border-red-700 transition"
          >
            ⏻ ออกจากระบบ
          </button>
        </div>
      </div>

      <!-- 6 : Main content -->
      <div
        class="col-span-4 row-span-5 col-start-3 row-start-2 bg-white rounded-xl shadow flex flex-col items-center justify-center"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/679/679821.png"
          class="w-40 opacity-70"
        />
        <p class="mt-4 text-gray-500">ไม่มีรายการสั่งซื้อของคุณ</p>
        <button
          class="mt-6 bg-[#00569C] hover:bg-[#004a85] text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          🛒 เปิดสั่งซื้อสินค้าทันที
        </button>
      </div>
    </div>
  </div>
</template>

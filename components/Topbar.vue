<script setup>
import { ref, computed } from  'vue';

const showAccountMenu = ref(false);
const showSearchModal = ref(false);

// mock user
const firstName = 'Puck';
const lastName = 'Sheres';

const initials = computed(() => {
  return firstName.charAt(0) + lastName.charAt(0);
});
</script>

<template>
  <header
    class="w-full h-20 bg-white flex items-center px-12 border-t-10 border-[#00569C] shadow-sm relative z-50"
  >
    <!-- Left : Logo -->
    <div class="flex items-center select-none">
      <div class="text-3xl font-bold text-[#0D95DA]">
        Advice <span class="text-green-500 italic">Dealers</span>
      </div>
    </div>

    <!-- Center : Search -->
    <div class="flex-1 flex justify-center px-12 relative">
      <!-- Search Bar -->
      <div class="relative w-full max-w-3xl z-50">
        <input
          type="text"
          placeholder="ค้นหาสินค้า, แบรนด์, รุ่น"
          @click="showSearchModal = true"
          class="w-full h-11 pl-5 pr-28 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        />

        <button
          class="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-6 bg-[#00569C] text-white rounded-full flex items-center gap-2"
        >
          🔍 ค้นหา
        </button>
      </div>

      <!-- Search Modal -->
      <div
        v-if="showSearchModal"
        class="absolute top-[72px] left-0 w-[1100px] max-w-none bg-white border border-gray-200 rounded-xl shadow-xl z-50"
      >
        <div
          class="grid grid-cols-12 min-h-[320px] max-h-[70vh] overflow-hidden"
        >
          <!-- Col 1 (2 cols) : แบ่งครึ่งบน / ล่าง -->
          <div
            class="col-span-2 row-span-6 grid grid-rows-2 border-r border-gray-200"
          >
            <!-- เทรนด์การค้นหา -->
            <div class="p-6">
              <div class="font-medium text-gray-700 mb-3">เทรนด์การค้นหา</div>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="hover:text-[#00569C] cursor-pointer">RTX 4090</li>
                <li class="hover:text-[#00569C] cursor-pointer">MacBook Air</li>
                <li class="hover:text-[#00569C] cursor-pointer">iPhone 14</li>
                <li class="hover:text-[#00569C] cursor-pointer">MacBook Air</li>
                <li class="hover:text-[#00569C] cursor-pointer">iPhone 14</li>
              </ul>
            </div>

            <!-- ประวัติการค้นหา -->
            <div class="border-t border-gray-200 p-6">
              <div class="font-medium text-gray-700 mb-3">ประวัติการค้นหา</div>
              <ul class="space-y-2 text-sm text-gray-500">
                <li class="hover:text-[#00569C] cursor-pointer">SSD 1TB</li>
                <li class="hover:text-[#00569C] cursor-pointer">MacBook Pro</li>
                <li class="hover:text-[#00569C] cursor-pointer">SSD 1TB</li>
                <li class="hover:text-[#00569C] cursor-pointer">MacBook Pro</li>
              </ul>
            </div>
          </div>

          <!-- Col 2 (5 cols) -->
          <div
            class="col-span-5 col-start-3 row-span-6 p-6 border-r border-gray-200"
          >
            <div class="font-medium text-gray-700 mb-3">
              สินค้าที่เป็นเทรนด์
            </div>

            <div class="space-y-3 text-sm">
              <div
                class="flex gap-3 items-center hover:bg-gray-50 p-2 rounded cursor-pointer"
              >
                <div class="w-12 h-12 bg-gray-100 rounded"></div>
                <div>
                  <div class="text-gray-800">VGA RTX 3080</div>
                  <div class="text-gray-400 text-xs">฿19,900</div>
                </div>
              </div>

              <div
                class="flex gap-3 items-center hover:bg-gray-50 p-2 rounded cursor-pointer"
              >
                <div class="w-12 h-12 bg-gray-100 rounded"></div>
                <div>
                  <div class="text-gray-800">SSD 1TB</div>
                  <div class="text-gray-400 text-xs">฿2,990</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Col 3 (5 cols) -->
          <div class="col-span-5 col-start-8 row-span-6 p-6">
            <div class="font-medium text-gray-700 mb-3">โปรโมชั่น</div>
            <div class="h-40 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div
        v-if="showSearchModal"
        @click="showSearchModal = false"
        class="fixed inset-0 z-40"
      ></div>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-4">
      <!-- Orders -->
      <button
        class="flex items-center gap-2 px-5 h-10 rounded-full text-black bg-[#0D95DA]/10 border border-[#0D95DA] hover:bg-[#0D95DA]/20 transition"
      >
        📋 รายการการสั่งซื้อ

        <!-- Notification (circle) -->
        <span
          class="ml-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full"
        >
          0
        </span>
      </button>

      <!-- Divider -->
      <div class="h-6 w-px bg-gray-300"></div>

      <!-- Account -->
      <div class="relative">
        <button
          @click="showAccountMenu = !showAccountMenu"
          class="flex items-center gap-3 pl-3 pr-4 h-11 rounded-full bg-[#00569C] hover:bg-[#004a85] transition"
        >
          <!-- Avatar (ไม่มีกรอบขาวแล้ว) -->
          <div
            class="w-8 h-8 rounded-full bg-[#003E73] flex items-center justify-center text-white text-sm font-semibold"
          >
            {{ initials }}
          </div>

          <!-- Label -->
          <span class="font-medium text-white"> บัญชีของฉัน </span>

          <!-- Chevron -->
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          v-if="showAccountMenu"
          class="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
        >
          <!-- การสั่งซื้อของฉัน -->
          <div
            class="flex items-center px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            <span>การสั่งซื้อของฉัน</span>
            <span
              class="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center"
            >
              9
            </span>
          </div>

          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- การเงินเเละการชำระเงิน -->
          <div
            class="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            การเงินเเละการชำระเงิน
          </div>

          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- บัญชีของฉัน -->
          <NuxtLink
            to="/Dealer_Profile"
            class="block px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            บัญชีของฉัน
          </NuxtLink>

          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- ออกจากระบบ -->
          <div
            class="px-3 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-red-50 hover:text-red-600 transition"
          >
            ออกจากระบบ
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

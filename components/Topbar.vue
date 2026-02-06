<script setup>
import { ref, computed } from 'vue';

const showAccountMenu = ref(false);

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
    <div class="flex-1 flex justify-center px-12">
      <div class="relative w-full max-w-3xl">
        <input
          type="text"
          placeholder="ค้นหาสินค้า, แบรนด์, รุ่น"
          class="w-full h-11 pl-5 pr-28 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        />
        <button
          class="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-6 bg-[#00569C] text-white rounded-full flex items-center gap-2 hover:opacity-90"
        >
          🔍 ค้นหา
        </button>
      </div>
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

          <!-- บัญชีของฉัน -->
          <NuxtLink to="/Dealer_Profile" class="block px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition">
            บัญชีของฉัน
          </NuxtLink>
          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- สินค้าที่ถูกใจ -->
          <div
            class="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            สินค้าที่ถูกใจ
          </div>

          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- คูปองของฉัน -->
          <div
            class="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            คูปองของฉัน
          </div>

          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- บริการ -->
          <div
            class="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            บริการ (เช็ค / ตรวจสอบ)
          </div>

          <div class="h-px bg-gray-200 mx-3"></div>

          <!-- ศูนย์ช่วยเหลือ -->
          <div
            class="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            ศูนย์ช่วยเหลือ
          </div>

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

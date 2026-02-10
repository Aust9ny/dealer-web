<script setup lang="ts">
import { ref, computed } from 'vue';
const { trendingProducts, banner1 } = useDashboard();
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
    class="w-full h-20 bg-white flex items-center px-12 border-t-10 border-primary shadow-sm relative z-50"
  >
  <NuxtLink to="/">

    <!-- Left : Logo -->
    <div class="flex items-center select-none">
      <div class="text-3xl font-bold text-[#0D95DA]">
        Advice <span class="text-green-500 italic">Dealers</span>
      </div>
    </div>
  </NuxtLink>
    <!-- Center : Search -->
    <div class="flex-1 flex justify-center px-12 relative">
      <!-- Search Bar -->
      <div class="relative w-full max-w-3xl z-50">
        <input
          type="text"
          placeholder="ค้นหาสินค้า, แบรนด์, รุ่น"
          class="w-full h-11 pl-5 pr-28 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          @click="showSearchModal = true"
        >

        <button
          class="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-6 bg-primary text-white rounded-full flex items-center gap-2"
        >
          🔍 ค้นหา
        </button>
      </div>

      <!-- Search Modal -->
      <div
        v-if="showSearchModal"
        class="absolute top-15 left-1/2 -translate-x-1/2 w-375 max-w-[95vw] bg-white border border-gray-200 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] z-50"
      >
        <div
          class="grid grid-cols-12 min-h-105 max-h-[80vh] overflow-y-auto"
        >
          <!-- Col 1 -->
          <div class="col-span-2 grid grid-rows-2 border-r border-gray-200">
            <!-- Trending search -->
            <div class="p-5">
              <div class="flex items-center justify-between mb-3">
                <div
                  class="flex items-center gap-2 text-[13px] font-semibold text-gray-800"
                >
                  📈 เทรนด์การค้นหาช่วงนี้
                </div>
              </div>
              <div class="h-px bg-gray-200 my-3"/>

              <ul class="space-y-2 text-[13px] text-gray-600">
                <li class="hover:text-primary cursor-pointer">
                  RTX 4090 AORUS MASTER
                </li>
                <li class="hover:text-primary cursor-pointer">
                  MacBook Air 2023
                </li>
                <li class="hover:text-primary cursor-pointer">iPhone 14</li>
                <li class="hover:text-primary cursor-pointer">
                  คอมประกอบ Intel
                </li>
                <li class="hover:text-primary cursor-pointer">งบจำกัด</li>
              </ul>

              <div
                class="mt-3 text-[12px] text-primary cursor-pointer hover:underline"
              >
                แสดงผลลัพธ์เพิ่มเติม 10+
              </div>
            </div>

            <!-- Search history -->
            <div class="border-t border-gray-200 p-5">
              <div class="flex items-center justify-between mb-3">
                <div
                  class="flex items-center gap-2 text-[13px] font-semibold text-gray-800"
                >
                  🕘 ประวัติที่คุณเคยค้นหา
                </div>
                <span
                  class="text-[12px] text-gray-400 cursor-pointer hover:text-red-500"
                >
                  ลบทั้งหมด
                </span>
              </div>
              <div class="h-px bg-gray-200 my-3"/>
              <ul class="space-y-2 text-[13px] text-gray-500">
                <li
                  class="flex items-center hover:text-primary cursor-pointer"
                >
                  ssd
                  <span class="ml-auto text-gray-300">✕</span>
                </li>
                <li
                  class="flex items-center hover:text-primary cursor-pointer"
                >
                  hdd
                  <span class="ml-auto text-gray-300">✕</span>
                </li>
                <li
                  class="flex items-center hover:text-primary cursor-pointer"
                >
                  cpu
                  <span class="ml-auto text-gray-300">✕</span>
                </li>
                <li
                  class="flex items-center hover:text-primary cursor-pointer"
                >
                  camera
                  <span class="ml-auto text-gray-300">✕</span>
                </li>
                <li
                  class="flex items-center hover:text-primary cursor-pointer"
                >
                  rtx 4080
                  <span class="ml-auto text-gray-300">✕</span>
                </li>
              </ul>

              <div
                class="mt-3 text-[12px] text-primary cursor-pointer hover:underline"
              >
                แสดงผลลัพธ์เพิ่มเติม 10+
              </div>
            </div>
          </div>

          <!-- Col 2 : Trending products -->
          <div class="col-span-5 col-start-3 p-5 border-r border-gray-200">
            <div class="flex items-center justify-between mb-3">
              <div class="text-[13px] font-semibold text-gray-800">
                สินค้าที่เป็นเทรนด์ตอนนี้
              </div>
              <span
                class="text-[12px] text-primary cursor-pointer hover:underline"
              >
                ดูทั้งหมด
              </span>
            </div>

            <div class="h-px bg-gray-200 mb-3"/>

            <div class="space-y-1">
              <div
                v-for="(product, index) in trendingProducts"
                :key="product.id"
                class="grid grid-cols-[80px_1fr_auto] gap-3 py-3 px-2 hover:bg-gray-50 cursor-pointer"
              >
                <!-- Image -->
                <img
                  :src="product.image"
                  class="w-20 h-20 object-cover rounded-md bg-gray-100"
                >

                <!-- Product info -->
                <div class="min-w-0">
                  <!-- Brand -->
                  <div class="text-[11px] text-blue-600 font-medium mb-0.5">
                    MSI
                  </div>

                  <!-- Name -->
                  <div
                    class="text-[13px] text-gray-800 leading-snug line-clamp-2"
                  >
                    {{ product.name }}
                  </div>

                  <!-- Spec -->
                  <div class="text-[11px] text-gray-400 mt-0.5">
                    8GB / GDDR6 / 128-bit / PCIe 4.0 / 1xHDMI
                  </div>
                </div>

                <!-- Price / Promotion -->
                <div class="text-right whitespace-nowrap">
                  <!-- ราคาปัจจุบัน -->
                  <div class="text-[14px] font-semibold text-gray-900">
                    ฿{{ product.price.toLocaleString() }}
                  </div>

                  <!-- ราคาเดิม + ส่วนลด (บรรทัดเดียวกัน) -->
                  <div class="flex items-center justify-end gap-2 mt-0.5">
                    <span
                      v-if="product.isHot"
                      class="text-[10px] px-2 py-0.5 bg-red-500 text-white rounded-full"
                    >
                      -฿1,500
                    </span>
                    <span class="text-[11px] text-gray-400 line-through">
                      ฿13,965
                    </span>
                  </div>

                  <!-- Ready / Online only -->
                  <div class="mt-1 text-[11px] text-green-600">
                    *Ready Point: 999
                  </div>
                  <div class="text-[11px] text-gray-400">*เฉพาะออนไลน์เท่านั้น</div>
                </div>

                <!-- Divider -->
                <div
                  v-if="index !== trendingProducts.length - 1"
                  class="col-span-3 h-px bg-gray-100 mt-3"
                />
              </div>
            </div>
          </div>

          <!-- Col 3 : Promotion -->
          <div class="col-span-5 col-start-8 p-5">
            <div class="flex items-center justify-between mb-4">
              <div class="text-[13px] font-semibold text-gray-800">
                โปรโมชั่น
              </div>
              <span
                class="text-[12px] text-primary cursor-pointer hover:underline"
              >
                ดูทั้งหมด
              </span>
            </div>

            <div class="space-y-3">
              <a
                v-for="banner in banner1"
                :key="banner.id"
                :href="banner.link"
                target="_blank"
                class="block overflow-hidden rounded-xl border hover:shadow-md transition"
              >
                <img
                  :src="banner.image"
                  :alt="banner.alt"
                  class="w-full h-36 object-cover"
                >
              </a>
              <a
                v-for="banner in banner1"
                :key="banner.id"
                :href="banner.link"
                target="_blank"
                class="block overflow-hidden rounded-xl border hover:shadow-md transition"
              >
                <img
                  :src="banner.image"
                  :alt="banner.alt"
                  class="w-full h-36 object-cover"
                >
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div
        v-if="showSearchModal"
        class="fixed inset-0 z-40 "
        @click="showSearchModal = false"
      />
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
      <div class="h-6 w-px bg-gray-300"/>

      <!-- Account -->
      <div class="relative">
        <button
        class="flex items-center gap-3 pl-3 pr-4 h-11 rounded-full bg-primary hover:bg-[#004a85] transition"
        @click="showAccountMenu = !showAccountMenu"
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

          <div class="h-px bg-gray-200 mx-3"/>

          <!-- การเงินเเละการชำระเงิน -->
          <div
            class="px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            การเงินเเละการชำระเงิน
          </div>

          <div class="h-px bg-gray-200 mx-3"/>

          <!-- บัญชีของฉัน -->
          <NuxtLink
            to="/Dealer_Profile"
            class="block px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
            @click="showAccountMenu = !showAccountMenu"
          >
            บัญชีของฉัน
          </NuxtLink>

          <div class="h-px bg-gray-200 mx-3"/>

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

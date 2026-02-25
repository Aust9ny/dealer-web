<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';

const { currentUser } = useAuth();
const isSidebarOpen = ref(false);
const activeOrderTab = ref('ทั้งหมด');

interface MenuSection {
  title: string;
  items: string[];
}

const orderCount = 99;
const orderTabs = ['ทั้งหมด', 'ที่ต้องชำระ', 'รอตรวจสอบ', 'กำลังจัดส่ง', 'สำเร็จ', 'ยกเลิก'];

const menuSections: MenuSection[] = [
  { title: 'จัดการคำสั่งซื้อ', items: ['รายการสั่งซื้อทั้งหมด', 'รายการสินค้าค้างส่ง', 'ติดตามสถานะการจัดส่ง'] },
  { title: 'การเงินและชำระเงิน', items: ['ชำระเงิน / อัปโหลดหลักฐาน', 'จ่ายชำระหนี้ Advice สนญ.', 'รายการเคลื่อนไหวบัญชี'] },
  { title: 'งานบริการและติดตามสถานะเคลม', items: ['ตรวจสอบสถานะการแจ้งเคลม', 'สินค้าเคลมรอตัดสินใจ', 'รายงานการส่งคืน'] },
  { title: 'ข้อมูลบัญชี', items: ['ข้อมูลส่วนตัวดีลเลอร์', 'รายชื่อไฟล์อัปโหลด', 'เงื่อนไขการจัดส่ง', 'เปลี่ยนรหัสผ่าน'] },
];

const initials = computed(() => {
  const first = currentUser.value?.fname?.[0] || 'D';
  const last = currentUser.value?.lname?.[0] || 'L';
  return `${first}${last}`;
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto p-3 gap-4 grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-7">
      <div class="bg-white rounded-xl shadow overflow-hidden col-span-1 lg:col-span-2 lg:row-span-1">
        <div class="h-2 bg-primary" />

        <div class="p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
              {{ initials }}
            </div>
            <p class="font-medium text-gray-800">
              สวัสดี, {{ currentUser?.fname }} {{ currentUser?.lname }}
            </p>
          </div>

          <div class="my-3 border-t border-gray-200" />

          <div class="space-y-1 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Dealer ID:</span>
              <span class="text-gray-700 font-medium">{{ currentUser?.dealerID }}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Email:</span>
              <span class="text-gray-700">{{ currentUser?.email }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1 lg:hidden">
        <div class="bg-white rounded-xl shadow overflow-hidden">
          <button
            class="w-full flex items-center gap-3 font-medium p-6"
            :class="isSidebarOpen ? 'border-b' : ''"
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <div class="space-y-1">
              <div class="w-6 h-0.5 bg-gray-700" />
              <div class="w-6 h-0.5 bg-gray-700" />
              <div class="w-6 h-0.5 bg-gray-700" />
            </div>
            เมนู
          </button>
        </div>

        <transition name="slide-down">
          <div v-if="isSidebarOpen" class="bg-white rounded-xl shadow p-4 space-y-4">
            <div
              v-for="(section, sectionIndex) in menuSections"
              :key="section.title"
              :class="sectionIndex > 0 ? 'border-t pt-3' : ''"
            >
              <p class="font-medium mb-2">{{ section.title }}</p>
              <ul class="text-sm space-y-2 text-gray-600">
                <li
                  v-for="(item, itemIndex) in section.items"
                  :key="item"
                  :class="sectionIndex === 0 && itemIndex === 0 ? 'text-primary font-medium' : ''"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>

      <div class="bg-white rounded-xl shadow overflow-hidden col-span-1 lg:col-span-4 lg:row-span-1 lg:col-start-3">
        <div class="bg-primary text-white px-5 py-3 font-medium flex items-center gap-2">
          📄 รายการสั่งซื้อทั้งหมด
        </div>
        <div class="px-5 py-4">
          <div class="flex gap-6 text-sm border-b overflow-x-auto whitespace-nowrap">
            <span
              v-for="tab in orderTabs"
              :key="tab"
              class="pb-2 cursor-pointer border-b-2 transition-colors"
              :class="activeOrderTab === tab ? 'text-primary border-primary' : 'text-gray-500 border-transparent'"
              @click="activeOrderTab = tab"
            >
              {{ tab }} ({{ orderCount }})
            </span>
          </div>

          <div class="mt-4">
            <input
              type="text"
              placeholder="ค้นหาสินค้า, แบรนด์, รุ่น หรือหมายเลขคำสั่งซื้อ"
              class="w-full h-11 px-4 rounded-full border focus:ring-2 focus:ring-primary outline-none"
            >
          </div>
        </div>
      </div>

      <div class="hidden lg:flex bg-white rounded-xl shadow flex-col col-span-1 lg:col-span-2 lg:row-span-5 lg:row-start-2">
        <div class="p-4 space-y-5 flex-1">
          <div v-for="(section, sectionIndex) in menuSections" :key="section.title">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-medium text-gray-800">{{ section.title }}</span>
            </div>

            <ul class="text-sm space-y-2">
              <li
                v-for="(item, itemIndex) in section.items"
                :key="item"
                class="cursor-pointer"
                :class="sectionIndex === 0 && itemIndex === 0 ? 'flex items-center justify-between text-primary font-medium' : 'text-gray-600 hover:text-primary'"
              >
                <span>{{ item }}</span>
                <span
                  v-if="sectionIndex === 0 && itemIndex === 0"
                  class="text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {{ orderCount }}
                </span>
              </li>
            </ul>

            <div v-if="sectionIndex < menuSections.length - 1" class="border-t border-gray-200 mt-4" />
          </div>
        </div>

        <div class="mt-auto p-4 mb-3">
          <button
            class="w-full flex items-center justify-center gap-2 border border-red-400 text-red-600 rounded-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 active:bg-red-700 active:border-red-700 transition"
          >
            ⏻ ออกจากระบบ
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow flex flex-col col-span-1 lg:col-span-4 lg:row-span-5 lg:col-start-3 lg:row-start-2">
        <div class="flex-1 flex flex-col items-center justify-center p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/679/679821.png"
            class="w-40 opacity-70"
          >
          <p class="mt-4 text-gray-500">ไม่มีรายการสั่งซื้อของคุณ</p>
          <button
            class="mt-6 bg-primary hover:bg-[#004a85] text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            🛒 เปิดสั่งซื้อสินค้าทันที
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

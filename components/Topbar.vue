<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useMockPO } from "@/composables/useMockPO";

const router = useRouter();

const { getAllPO, getLatestPO } = useMockPO();

const totalPO = computed(() => getAllPO().length);

const goToLatestPO = () => {
  const latest = getLatestPO();

  if (!latest) {
    router.push("/po"); // หน้า list
    return;
  }

  router.push(`/po/${latest.id}`);
};

// dashboard
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';

// 🟢 Auth & Dashboard Composables
const { trendingProducts, banner1 } = useDashboard();
const { currentUser, login, logout } = useAuth(); 

const showAccountMenu = ref(false);
const showSearchModal = ref(false);

// 🟢 Role List for Switcher
const roles = [
  { name: 'Technician', icon: 'mdi:tools', color: 'text-amber-500' },
  { name: 'Dealer', icon: 'mdi:storefront-outline', color: 'text-primary' },
  { name: 'Franchise', icon: 'mdi:office-building-marker-outline', color: 'text-emerald-500' }
] as const;

// 🟢 Dynamic Initials from Auth State
const initials = computed(() => {
  if (!currentUser.value) return '??';
  return currentUser.value.Fname.charAt(0) + currentUser.value.Lname.charAt(0);
});

const activateSearch = () => {
  showSearchModal.value = true;
};

const closeSearch = () => {
  showSearchModal.value = false;
};

const handleSwitchRole = (role: 'Technician' | 'Dealer' | 'Franchise') => {
  login(role);
};

const handleLogout = () => {
  logout();
  showAccountMenu.value = false;
};
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-23 bg-white flex items-center px-12 border-t-10 border-primary shadow-sm z-110"
  >
    <div
      v-if="showSearchModal"
      class="fixed inset-0 bg-black/40 z-95"
      @click="closeSearch"
    />

    <NuxtLink to="/">
      <div class="flex items-center select-none">
        <div class="text-3xl font-bold text-primary">
          Advice <span class="text-green-500 italic">Dealers</span>
        </div>
      </div>
    </NuxtLink>

    <div class="flex-1 flex justify-center px-12 relative">
      <div class="relative w-full max-w-3xl z-100">
        <input
          type="text"
          placeholder="ค้นหาสินค้า, แบรนด์, รุ่น"
          class="w-full h-11 pl-5 pr-28 border rounded-full transition focus:outline-none"
          :class="
            showSearchModal
              ? 'ring-2 ring-primary border-primary bg-white shadow-xl'
              : 'border-gray-300 bg-white'
          "
          @focus="activateSearch"
        >
        <button
          class="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-6 bg-primary text-white rounded-full flex items-center gap-2"
        >
          🔍 ค้นหา
        </button>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button
        class="flex items-center gap-2 px-5 h-10 rounded-full text-black bg-[#0D95DA]/10 border border-[#0D95DA] hover:bg-[#0D95DA]/20 transition"
        @click="goToLatestPO"
      >
        📋 รายการการสั่งซื้อ
        <span
          class="ml-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full"
        >
          {{ totalPO }}
        </span>
      </button>

      <div class="h-6 w-px bg-gray-300" />

      <div class="relative">
        <button
          class="flex items-center gap-3 pl-2 pr-4 h-11 rounded-full bg-primary hover:bg-[#004a85] transition min-w-40"
          @click="showAccountMenu = !showAccountMenu"
        >
          <div
            class="w-8 h-8 rounded-full bg-[#003E73] flex items-center justify-center text-white text-sm font-black"
          >
            {{ initials }}
          </div>

          <div class="flex flex-col items-start leading-tight">
             <span class="text-[12px] font-bold text-white truncate max-w-25">
                {{ currentUser?.Fname || 'เข้าสู่ระบบ' }}
             </span>
             <span v-if="currentUser" class="text-[8px] bg-white/20 px-1.5 rounded text-white font-black uppercase tracking-tighter">
                {{ currentUser.role }}
             </span>
          </div>

          <Icon icon="mdi:chevron-down" class="w-4 h-4 text-white transition-transform" :class="{'rotate-180': showAccountMenu}" />
        </button>

        <div
          v-if="showAccountMenu"
          class="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-120"
        >
          <!-- การสั่งซื้อของฉัน -->
          <div
            class="flex items-center px-3 py-2.5 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
          >
            <span>การสั่งซื้อของฉัน</span>
            <span
              class="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center"
            >
              {{ totalPO }}
            </span>
          <div v-if="currentUser" class="p-4 bg-slate-50 border-b border-gray-100">
             <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ชื่อผู้ใช้งาน</p>
             <p class="text-sm font-bold text-slate-800">{{ currentUser.Fname }} {{ currentUser.Lname }}</p>
          </div>
        </div>
          <div class="p-2">
            <p class="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">สลับสิทธิ์การเข้าชม (Mock)</p>
            <div 
              v-for="role in roles" :key="role.name"
              class="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all"
              :class="[currentUser?.role === role.name ? 'bg-blue-50' : 'hover:bg-gray-50']"
              @click="handleSwitchRole(role.name)"
            >
              <Icon :icon="role.icon" class="w-5 h-5" :class="role.color" />
              <div class="flex flex-col">
                <span class="text-xs font-bold" :class="currentUser?.role === role.name ? 'text-primary' : 'text-gray-700'">{{ role.name }}</span>
                <span v-if="currentUser?.role === role.name" class="text-[9px] text-blue-400 font-medium italic">กำลังใช้งาน</span>
              </div>
              <Icon v-if="currentUser?.role === role.name" icon="mdi:check-circle" class="ml-auto w-4 h-4 text-primary" />
            </div>
          </div>

          <div class="h-px bg-gray-100 mx-3 mt-1" />

          <div class="py-1">
            <div class="flex items-center px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition">
              <span>การสั่งซื้อของฉัน</span>
              <span class="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center">9</span>
            </div>

            <div class="px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition">
              การเงินเเละการชำระเงิน
            </div>

            <NuxtLink
              to="/Dealer_Profile"
              class="block px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
              @click="showAccountMenu = false"
            >
              บัญชีของฉัน
            </NuxtLink>

            <div
              class="px-4 py-3 text-sm text-red-500 font-bold cursor-pointer hover:bg-red-50 transition flex items-center gap-2"
              @click="handleLogout"
            >
              <Icon icon="mdi:logout" class="w-4 h-4" />
              ออกจากระบบ
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </header>

  <SearchModal
    v-model="showSearchModal"
    :trending-products="trendingProducts"
    :banners="banner1"
    :trending-keywords="[
      'RTX 4090 AORUS MASTER',
      'MacBook Air 2023',
      'iPhone 14',
      'คอมประกอบ Intel',
      'งบจำกัด',
    ]"
    :search-history="['ssd', 'hdd', 'cpu', 'camera', 'rtx 4080']"
  />
</template>
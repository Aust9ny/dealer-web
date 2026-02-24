<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useMockPO } from '@/composables/useMockPO';
import { Icon } from '@iconify/vue';
import { watch, ref, onMounted, onBeforeUnmount } from 'vue';

const route = useRoute();

// 1️⃣ ปิดเมื่อเปลี่ยนหน้า
watch(
  () => route.fullPath,
  () => {
    showAccountMenu.value = false;
  },
);

// 2️⃣ ปิดเมื่อกดข้างนอก
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  const clickedOutsideMobile =
    mobileDropdownRef.value && !mobileDropdownRef.value.contains(target);

  const clickedOutsideDesktop =
    desktopDropdownRef.value && !desktopDropdownRef.value.contains(target);

  if (showAccountMenu.value && clickedOutsideMobile && clickedOutsideDesktop) {
    showAccountMenu.value = false;
  }
};

// 3️⃣ ปิดเมื่อกด ESC
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    showAccountMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});

const router = useRouter();
const { userOrders, getLatestUserPO } = useMockPO();
const totalPO = computed(() => userOrders.value.length);
const latestUserPO = computed(() => getLatestUserPO.value);

const goToLatestPO = () => {
  const latest = latestUserPO.value;

  if (!latest) {
    router.push('/po'); // หน้า list
    return;
  }

  router.push(`/po/${latest.id}`);
};

// 🟢 Auth & Dashboard Composables
const { trendingProducts, banner1 } = useDashboard();
const { currentUser, login, logout } = useAuth();

const showAccountMenu = ref(false);
const showSearchModal = ref(false);

// 🟢 Role List for Switcher
const roles = [
  { name: 'Technician', icon: 'mdi:tools', color: 'text-amber-500' },
  { name: 'Dealer', icon: 'mdi:storefront-outline', color: 'text-primary' },
  {
    name: 'Franchise',
    icon: 'mdi:office-building-marker-outline',
    color: 'text-emerald-500',
  },
] as const;

// 🟢 Dynamic Initials from Auth State
const initials = computed(() => {
  if (!currentUser.value) return '??';
  return currentUser.value.fname.charAt(0) + currentUser.value.lname.charAt(0);
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

const trendingKeywords = [
  'RTX 4090 AORUS MASTER',
  'MacBook Air 2023',
  'iPhone 14',
  'คอมประกอบ Intel',
  'งบจำกัด',
];

const searchHistory = ['ssd', 'hdd', 'cpu', 'camera', 'rtx 4080'];

const mobileDropdownRef = ref<HTMLElement | null>(null);
const desktopDropdownRef = ref<HTMLElement | null>(null);
</script>

<template>
  <header
    class="relative fixed top-0 left-0 w-full h-16 md:h-23 bg-white flex items-center px-4 md:px-12 border-t-8 md:border-t-10 border-primary shadow-sm z-110"
  >
    <div
      v-if="showSearchModal"
      class="fixed inset-0 bg-black/40 z-95"
      @click="closeSearch"
    />

    <NuxtLink to="/">
      <div class="flex items-center select-none">
        <div class="text-3xl font-bold text-[#0D95DA]">
          Advice <span class="text-green-500 italic">Dealers</span>
        </div>
      </div>
    </NuxtLink>

    <div class="flex items-center gap-3 ml-auto md:hidden">
      <!-- MOBILE VERSION -->
      <button @click="activateSearch">
        <Icon icon="mdi:magnify" class="w-6 h-6 text-gray-700" />
      </button>

      <!-- MOBILE SEARCH BAR -->
<div
  v-if="showSearchModal"
  class="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-4 md:hidden z-[150]"
>
  <div class="relative w-full">
    <Icon
      icon="mdi:magnify"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
    />

    <input
      type="text"
      placeholder="ค้นหาสินค้า..."
      class="w-full h-11 pl-12 pr-12 border border-gray-300 rounded-full bg-white transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
      autofocus
    >

    <button
      class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition"
      @click="closeSearch"
    >
      <Icon icon="mdi:close" class="w-5 h-5 text-gray-500" />
    </button>
  </div>
</div>
      <button class="relative" @click="goToLatestPO">
        <Icon icon="mdi:clipboard-text-outline" class="w-6 h-6 text-gray-700" />
        <span
          v-if="totalPO"
          class="absolute -top-2 -right-2 w-4 h-4 text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center"
        >
          {{ totalPO }}
        </span>
      </button>
      <div class="flex md:hidden items-center gap-3 ml-auto">
        <div ref="mobileDropdownRef" class="relative">
          <button
            class="flex items-center justify-center w-10 h-10 rounded-full bg-primary"
            @click="showAccountMenu = !showAccountMenu"
          >
            <div
              class="w-8 h-8 rounded-full bg-[#003E73] flex items-center justify-center text-white text-sm font-black"
            >
              {{ initials }}
            </div>
          </button>

          <!-- MOBILE DROPDOWN -->
          <div
            v-if="showAccountMenu"
            class="absolute right-0 top-full mt-2 w-64 z-200"
            @click.stop
          >
            <AccountMenuContent
              :current-user="currentUser"
              :roles="roles"
              :total-p-o="totalPO"
              @switch-role="handleSwitchRole"
              @go-po="goToLatestPO"
              @logout="handleLogout"
              @close="showAccountMenu = false"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:flex flex-1 justify-center px-12 relative">
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

    <div class="hidden md:flex items-center gap-4">
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

      <div ref="desktopDropdownRef" class="relative">
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
              {{ currentUser?.fname || "เข้าสู่ระบบ" }}
            </span>
            <span
              v-if="currentUser"
              class="text-[8px] bg-white/20 px-1.5 rounded text-white font-black uppercase tracking-tighter"
            >
              {{ currentUser.role }}
            </span>
          </div>

          <Icon
            icon="mdi:chevron-down"
            class="w-4 h-4 text-white transition-transform"
            :class="{ 'rotate-180': showAccountMenu }"
          />
        </button>
        <div
          v-if="showAccountMenu"
          class="absolute right-0 top-full mt-2 w-64 z-120"
        >
          <AccountMenuContent
            :current-user="currentUser"
            :roles="roles"
            :total-p-o="totalPO"
            @switch-role="handleSwitchRole"
            @go-po="goToLatestPO"
            @logout="handleLogout"
            @close="showAccountMenu = false"
          />
        </div>
      </div>
    </div>
  </header>

  <SearchModal
    v-model="showSearchModal"
    :trending-products="trendingProducts"
    :banners="banner1"
    :trending-keywords="trendingKeywords"
    :search-history="searchHistory"
  />
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/auth/useAuth';
import { useNavigationProfile } from '~/composables/dashboard/useNavigation_Profile';
import { useRouter, useRoute } from 'vue-router';
import { useMockPO } from '~/composables/po/useMockPO';
import type { NavLink } from '~/composables/dashboard/useNavigation';
const { menuGroupsProfile } = useNavigationProfile();
const { currentUser } = useAuth();
const router = useRouter();
const route = useRoute();
const { userOrders, getLatestUserPO } = useMockPO();
const latestUserPO = computed(() => getLatestUserPO.value);
const totalPO = computed(() => userOrders.value.length);
const goToLatestPO = () => {
  const latest = latestUserPO.value;

  if (!latest) {
    router.push('/po');
    return;
  }

  router.push(`/po/${latest.id}`);
};

const handleNavClick = (link: NavLink) => {
  if (link.action === 'latestPO') {
    goToLatestPO();
    return;
  }

  if (link.external) {
    window.open(link.to, '_blank');
    return;
  }

  if (link.to) {
    router.push(link.to);
  }
};
const activeOrderTab = ref('ทั้งหมด');
const orderTabs = [
  'ทั้งหมด',
  'ที่ต้องชำระ',
  'รอตรวจสอบ',
  'กำลังจัดส่ง',
  'สำเร็จ',
  'ยกเลิก',
];

useHeadSafe({
  meta: [
    { name: 'cache-control', content: 'no-store, no-cache, must-revalidate' },
    { name: 'pragma', content: 'no-cache' },
    { name: 'expires', content: '0' },
    { name: 'referrer', content: 'no-referrer' },
  ],
});

useSeoMeta({
  title: 'Dealer Profile',
  description: 'Dealer account profile and order overview.',
  ogTitle: 'Dealer Profile',
  ogDescription: 'Secure dealer profile and order management page.',
  robots: 'noindex, nofollow',
});

const initials = computed(() => {
  const first = currentUser.value?.fname?.[0] || 'D';
  const last = currentUser.value?.lname?.[0] || 'L';
  return `${first}${last}`;
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div
      class="max-w-7xl mx-auto p-3 gap-4 grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-7"
    >
      <div
        class="bg-white rounded-xl shadow overflow-hidden col-span-1 lg:col-span-2 lg:row-span-1"
      >
        <div class="h-2 bg-primary" />

        <div class="p-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm"
            >
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
              <span class="text-gray-700 font-medium">{{
                currentUser?.dealerID
              }}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Email:</span>
              <span class="text-gray-700">{{ currentUser?.email }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow overflow-hidden col-span-1 lg:col-span-4 lg:row-span-1 lg:col-start-3"
      >
        <div
          class="bg-primary text-white px-5 py-3 font-medium flex items-center gap-2"
        >
          📄 รายการสั่งซื้อทั้งหมด
        </div>
        <div class="px-5 py-4">
          <div
            class="flex gap-6 text-sm border-b overflow-x-auto whitespace-nowrap"
          >
            <span
              v-for="tab in orderTabs"
              :key="tab"
              class="pb-2 cursor-pointer border-b-2 transition-colors"
              :class="
                activeOrderTab === tab
                  ? 'text-primary border-primary'
                  : 'text-gray-500 border-transparent'
              "
              @click="activeOrderTab = tab"
            >
              {{ tab }} ({{ totalPO }})
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

      <div
        class="hidden lg:flex bg-white rounded-xl shadow flex-col col-span-1 lg:col-span-2 lg:row-span-5 lg:row-start-2"
      >
        <div class="p-4 space-y-5 flex-1">
          <div
            v-for="(group, groupIndex) in menuGroupsProfile"
            :key="group.title"
          >
            <!-- Title + icon -->
            <div class="flex items-center gap-2 mb-2">
              <span>{{ group.icon }}</span>
              <span class="font-medium text-gray-800">
                {{ group.title }}
              </span>
            </div>

            <!-- Links -->
            <ul class="text-sm space-y-2">
              <li
                v-for="(link, linkIndex) in group.links"
                :key="link.label"
                class="cursor-pointer rounded-lg transition-all"
                :class="[
                  route.path === link.to
                    ? 'bg-blue-100 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary',
                  'px-3 py-2'
                ]"
                @click="handleNavClick(link)"
              >
                <div class="flex items-center justify-between w-full">
                  <span>{{ link.label }}</span>

                  <span
                    v-if="groupIndex === 0 && linkIndex === 0"
                    class="text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {{ totalPO }}
                  </span>
                </div>
              </li>
            </ul>

            <div
              v-if="groupIndex < menuGroupsProfile.length - 1"
              class="border-t border-gray-200 mt-4"
            />
          </div>
        </div>
        <!-- Logout -->
        <div class="mt-auto p-4 mb-3">
          <button
            class="w-full flex items-center justify-center gap-2 border border-red-400 text-red-600 rounded-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 active:bg-red-700 active:border-red-700 transition"
          >
            ⏻ ออกจากระบบ
          </button>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow flex flex-col col-span-1 lg:col-span-4 lg:row-span-5 lg:col-start-3 lg:row-start-2"
      >
        <div class="flex-1 flex flex-col items-center justify-center p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/679/679821.png"
            class="w-40 opacity-70"
          >
          <p class="mt-4 text-gray-500">ไม่มีรายการสั่งซื้อของคุณ</p>
          <NuxtLink
            to="/category"
            class="mt-6 bg-primary hover:bg-[#004a85] text-white px-6 py-2 rounded-full flex items-center gap-2 inline-flex"
          >
            🛒 เปิดสั่งซื้อสินค้าทันที
          </NuxtLink>
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

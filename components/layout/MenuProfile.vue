<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '~/composables/auth/useAuth';
import { useNavigationProfile } from '~/composables/dashboard/useNavigation_Profile';
import { useMockPO } from '~/composables/po/useMockPO';
import type { NavLink } from '~/composables/dashboard/useNavigation';

const router = useRouter();
const route = useRoute();

const { currentUser, logout } = useAuth();
const { menuGroupsProfile } = useNavigationProfile();
const { userOrders, getLatestUserPO } = useMockPO();

const emit = defineEmits(['logout']);

/* ===============================
   COMPUTED
================================ */

const initials = computed(() => {
  const first = currentUser.value?.fname?.[0] || 'D';
  const last = currentUser.value?.lname?.[0] || 'L';
  return `${first}${last}`;
});

const latestUserPO = computed(() => getLatestUserPO.value);

const totalPO = computed(() => userOrders.value.length);

/* ===============================
   METHODS
================================ */

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

const handleLogout = async () => {
  await logout();
  emit('logout');
};
</script>

<template>
  <div class="space-y-4 lg:col-span-2">

    <!-- PROFILE CARD -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <div class="h-2 bg-primary" />

      <div class="p-5">
        <div class="flex items-center gap-2">
          <div
            class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm"
          >
            {{ initials }}
          </div>

          <p class="font-medium text-gray-800">
            สวัสดี, {{ currentUser?.fname }} {{ currentUser?.lname }}
          </p>
        </div>

        <div class="my-4 border-t border-gray-200" />

        <div class="text-sm space-y-2">
          <div class="flex justify-between text-gray-500">
            <span>Dealer ID:</span>
            <span class="text-gray-800 font-medium">
              {{ currentUser?.dealerID }}
            </span>
          </div>

          <div class="flex justify-between text-gray-500">
            <span>Email:</span>
            <span class="text-gray-700">
              {{ currentUser?.email }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- SIDEBAR MENU -->
    <div class="hidden lg:flex bg-white rounded-xl shadow p-5 flex-col">

      <div class="space-y-3 flex-1">
        <div
          v-for="(group, groupIndex) in menuGroupsProfile"
          :key="group.title"
        >

          <!-- Group Title -->
          <div class="flex items-center gap-2 mb-3">
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
              class="cursor-pointer rounded-lg transition-all px-3 py-2"
              :class="[
                route.path === link.to
                  ? 'bg-blue-100 text-primary font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary',
              ]"
              @click="handleNavClick(link)"
            >
              <div class="flex items-center justify-between">
                <span>{{ link.label }}</span>

                <!-- Badge PO -->
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
      <div class="mt-auto p-4 mb-4">
        <button
          class="w-full flex items-center justify-center gap-2 border border-red-400 text-red-600 rounded-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 active:bg-red-700 active:border-red-700 transition"
          @click="handleLogout"
        >
          ⏻ ออกจากระบบ
        </button>
      </div>

    </div>
  </div>
</template>

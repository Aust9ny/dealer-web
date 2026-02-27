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

// State
const isLoading = ref(false);
const password = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// Visibility State
const showPass = ref(false);
const showNewPass = ref(false);
const showConfirm = ref(false);

// Inline Icon Components (Heroicons)
const EyeIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      strokeWidth: 1.5,
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      h('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        d: 'M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.791 0 8.601 3.049 9.964 6.678.045.122.045.255 0 .377C20.601 15.951 16.79 19 12 19c-4.79 0-8.601-3.049-9.964-6.678z',
      }),
      h('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      }),
    ],
  );

const EyeSlashIcon = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
      strokeWidth: 1.5,
      stroke: 'currentColor',
      class: 'w-6 h-6',
    },
    [
      h('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        d: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-2.278-2.278L15.07 15.07M15.07 15.07A3 3 0 0010.93 10.93L15.07 15.07z',
      }),
    ],
  );

// Password strength logic
const strength = computed(() => {
  const pwd = newPassword.value;
  const constraints = [
    {
      id: 1,
      label: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร',
      met: pwd.length >= 8,
    },
    { id: 2, label: 'ประกอบด้วยตัวพิมพ์เล็ก (a-z)', met: /[a-z]/.test(pwd) },
    { id: 3, label: 'ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z)', met: /[A-Z]/.test(pwd) },
    {
      id: 4,
      label: 'ประกอบด้วยอักขระพิเศษ (เช่น !@#$?%^&*)',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  const passedCount = constraints.filter((c) => c.met).length;

  return {
    constraints,
    passedCount,
    isComplete: passedCount === constraints.length,
  };
});

// Handlers
const handlePasswordChange = () => {
  if (newPassword.value !== confirmNewPassword.value) {
    alert('โปรดตรวจสอบรหัสผ่านใหม่อีกครั้ง');
    return;
  }

  if (newPassword.value === password.value) {
    alert('รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเดิม');
    return;
  }

  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert('เปลี่ยนรหัสผ่านสำเร็จ');
    resetFields();
  }, 2000);
};

const handleCancel = () => {
  resetFields();
  navigateTo('/');
};

const resetFields = () => {
  password.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
};
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- LEFT SIDE -->
        <div class="space-y-6">
          <!-- PROFILE CARD -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <div class="h-2 bg-primary" />

            <div class="p-5">
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

          <!-- SIDEBAR MENU (Dynamic) -->
          <div class="bg-white rounded-xl shadow p-5 flex flex-col">
            <div class="space-y-6 flex-1">
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

                      <!-- Badge total PO (เฉพาะเมนูแรก group แรก link แรก) -->
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
            <div class="border-t pt-4 mt-6">
              <button
                class="w-full flex items-center justify-center gap-2 border border-red-400 text-red-600 rounded-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white hover:border-red-600 transition"
              >
                ⏻ ออกจากระบบ
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="bg-white rounded-xl shadow overflow-hidden lg:col-span-3">
          <div class="p-8 text-center border-b border-slate-50">
            <h1 class="text-2xl font-black text-[#2196F3] uppercase">
              เปลี่ยนรหัสผ่าน
            </h1>
          </div>

          <form class="space-y-6 p-8" @submit.prevent="handlePasswordChange">
            <div class="relative group">
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="รหัสผ่านปัจจุบัน..."
                class="w-full rounded-2xl border-none bg-slate-50 p-4 pr-12 ring-1 ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-[#2196F3] outline-none"
              >
              <button
                type="button"
                class="absolute right-4 top-4 text-slate-400 hover:text-[#2196F3]"
                @click="showPass = !showPass"
              >
                <EyeIcon v-if="!showPass" />
                <EyeSlashIcon v-else />
              </button>
            </div>

            <div class="space-y-2">
              <div class="relative group">
                <input
                  v-model="newPassword"
                  :type="showNewPass ? 'text' : 'password'"
                  placeholder="รหัสผ่านใหม่..."
                  class="w-full rounded-2xl border-none bg-slate-50 p-4 pr-12 ring-1 ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-[#2196F3] outline-none"
                >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-slate-400 hover:text-[#2196F3]"
                  @click="showNewPass = !showNewPass"
                >
                  <EyeIcon v-if="!showNewPass" />
                  <EyeSlashIcon v-else />
                </button>
              </div>

              <Transition
                enter-active-class="transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                enter-from-class="transform -translate-y-4 opacity-0 scale-95"
                enter-to-class="transform translate-y-0 opacity-100 scale-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="transform translate-y-0 opacity-100 scale-100"
                leave-to-class="transform -translate-y-4 opacity-0 scale-95"
              >
                <div
                  v-if="newPassword.length > 0"
                  class="mt-4 space-y-2 rounded-2xl p-4 transition-all duration-500 border-2 overflow-hidden"
                  :class="[
                    strength.isComplete
                      ? 'border-emerald-500 bg-emerald-50/30 shadow-md shadow-emerald-100'
                      : 'border-rose-400 bg-slate-50',
                  ]"
                >
                  <div
                    v-for="rule in strength.constraints"
                    :key="rule.id"
                    class="flex items-center gap-2 text-xs transition-all duration-500"
                    :class="
                      rule.met
                        ? 'text-emerald-600 font-bold translate-x-2'
                        : 'text-slate-400'
                    "
                  >
                    <div
                      class="h-1.5 w-1.5 rounded-full transition-all duration-300"
                      :class="
                        rule.met ? 'bg-emerald-500 scale-150' : 'bg-slate-300'
                      "
                    />
                    {{ rule.label }}
                  </div>

                  <div
                    class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/60"
                  >
                    <div
                      class="h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      :class="
                        strength.isComplete ? 'bg-emerald-500' : 'bg-amber-500'
                      "
                      :style="{ width: `${(strength.passedCount / 4) * 100}%` }"
                    />
                  </div>
                </div>
              </Transition>
            </div>

            <div class="relative group">
              <input
                v-model="confirmNewPassword"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="ยืนยันรหัสผ่านใหม่..."
                class="w-full rounded-2xl border-none bg-slate-50 p-4 pr-12 ring-1 ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-[#2196F3] outline-none"
              >
              <button
                type="button"
                class="absolute right-4 top-4 text-slate-400 hover:text-[#2196F3]"
                @click="showConfirm = !showConfirm"
              >
                <EyeIcon v-if="!showConfirm" />
                <EyeSlashIcon v-else />
              </button>
            </div>

            <div
              v-if="newPassword !== '' && confirmNewPassword !== ''"
              class="mt-2 font-thai text-sm"
            >
              <div
                v-if="newPassword !== confirmNewPassword"
                class="text-red-500"
              >
                รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน
              </div>

              <div v-else class="text-green-500 font-bold">รหัสผ่านตรงกัน</div>
            </div>

            <div class="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                :disabled="isLoading || !strength.isComplete"
                class="w-full rounded-2xl bg-[#2196F3] py-4 font-black uppercase text-white transition-all hover:bg-[#1976D2] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:pointer-events-none shadow-lg"
              >
                <span v-if="!isLoading">เปลี่ยนรหัสผ่าน</span>
                <div v-else class="flex items-center justify-center gap-2">
                  <div
                    class="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"
                  />
                  กำลังประมวลผล...
                </div>
              </button>

              <button
                type="button"
                class="w-full rounded-2xl bg-red-500 border border-slate-200 py-4 font-thai uppercase text-white transition-all hover:bg-red-600 hover:text-white hover:border-red-100 active:scale-[0.98]"
                @click="handleCancel"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Ensure Thai text looks clean and loopless if using Inter + IBM Plex */
.font-thai {
  line-height: 1.6;
}
</style>
<script setup lang="ts">
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

// State
const isLoading = ref(false);
const password = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

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
    {
      id: 2,
      label: 'ประกอบด้วยตัวพิมพ์เล็ก (a-z)',
      met: /[a-z]/.test(pwd),
    },
    {
      id: 3,
      label: 'ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z)',
      met: /[A-Z]/.test(pwd),
    },
    {
      id: 4,
      label: 'ประกอบด้วยตัวเลข (0-9)',
      met: /[0-9]/.test(pwd),
    },
    {
      id: 5,
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
  errorMessage.value = '';
  successMessage.value = '';

  if (newPassword.value !== confirmNewPassword.value) {
    errorMessage.value = 'โปรดตรวจสอบรหัสผ่านใหม่อีกครั้ง';
    return;
  }

  if (newPassword.value === password.value) {
    errorMessage.value = 'รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเดิม';
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    successMessage.value = 'เปลี่ยนรหัสผ่านสำเร็จ';
    resetFields();

    // ซ่อนข้อความหลัง 3 วิ
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  }, 2000);
};

const resetFields = () => {
  password.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
};

const passwordsMatch = computed(
  () =>
    newPassword.value &&
    confirmNewPassword.value &&
    newPassword.value === confirmNewPassword.value,
);

const canSubmit = computed(
  () =>
    strength.value.isComplete &&
    passwordsMatch.value &&
    password.value.length > 0,
);

const showModal = ref(false);

const handleConfirm = () => {
  showModal.value = false;
  handlePasswordChange();
};
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <MenuProfile @logout="navigateTo('/')" />
        <!-- RIGHT CONTENT -->
        <div class="bg-white rounded-xl shadow overflow-hidden lg:col-span-4">
          <div class="p-6 text-center bg-primary">
            <h1 class="text-xl text-white uppercase tracking-wide">
              เปลี่ยนรหัสผ่าน
            </h1>
          </div>

          <form
            class="max-w-xl mx-auto space-y-6 p-8"
            @submit.prevent="handlePasswordChange"
          >
            <!-- CURRENT PASSWORD -->
            <div>
              <!-- Label -->
              <label class="block text-sm font-medium mb-2 text-gray-700">
                รหัสผ่านเดิม
              </label>

              <!-- Input -->
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPass ? 'text' : 'password'"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >

                <button
                  type="button"
                  class="absolute right-3 top-3 text-gray-400 hover:text-primary"
                  @click="showPass = !showPass"
                >
                  <EyeIcon v-if="!showPass" />
                  <EyeSlashIcon v-else />
                </button>
              </div>

              <!-- Forgot Password -->
              <div class="flex justify-end mt-1">
                <button
                  type="button"
                  class="text-xs text-primary hover:underline"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>
            </div>

            <!-- NEW PASSWORD -->
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700">
                รหัสผ่านใหม่
              </label>

              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="showNewPass ? 'text' : 'password'"
                  class="w-full rounded-lg px-4 py-3 pr-12 outline-none transition"
                  :class="[
                    confirmNewPassword && !passwordsMatch
                      ? 'border border-red-500 focus:ring-2 focus:ring-red-500'
                      : 'border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary',
                  ]"
                >

                <button
                  type="button"
                  class="absolute right-3 top-3 text-gray-400 hover:text-primary"
                  @click="showNewPass = !showNewPass"
                >
                  <EyeIcon v-if="!showNewPass" />
                  <EyeSlashIcon v-else />
                </button>
              </div>
              <!-- RULES -->
              <div class="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                <div
                  v-for="rule in strength.constraints"
                  :key="rule.id"
                  class="flex items-center gap-2 transition-all duration-300"
                  :class="rule.met ? 'text-green-600' : 'text-gray-400'"
                >
                  <!-- ICON -->
                  <div
                    class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
                    :class="
                      rule.met
                        ? 'bg-green-500 text-white scale-110 shadow-sm shadow-green-200'
                        : 'bg-gray-300 text-transparent'
                    "
                  >
                    ✓
                  </div>

                  <!-- TEXT -->
                  <span
                    class="transition-all duration-300"
                    :class="rule.met ? 'translate-x-1 font-medium' : ''"
                  >
                    {{ rule.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- CONFIRM -->
            <div>
              <label class="block text-sm font-medium mb-2 text-gray-700">
                ยืนยันรหัสผ่านใหม่
              </label>

              <div class="relative">
                <input
                  v-model="confirmNewPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  class="w-full rounded-lg px-4 py-3 pr-12 outline-none transition"
                  :class="[
                    confirmNewPassword && !passwordsMatch
                      ? 'border border-red-500 focus:ring-2 focus:ring-red-500'
                      : confirmNewPassword && passwordsMatch
                        ? 'border border-green-500 focus:ring-2 focus:ring-green-500'
                        : 'border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary',
                  ]"
                >

                <button
                  type="button"
                  class="absolute right-3 top-3 text-gray-400 hover:text-primary"
                  @click="showConfirm = !showConfirm"
                >
                  <EyeIcon v-if="!showConfirm" />
                  <EyeSlashIcon v-else />
                </button>
              </div>

              <!-- MATCH MESSAGE -->
              <div v-if="confirmNewPassword" class="mt-2 text-xs">
                <span v-if="!passwordsMatch" class="text-red-500">
                  รหัสผ่านไม่ตรงกัน
                </span>
                <span v-else class="text-green-600"> รหัสผ่านตรงกัน </span>
              </div>
            </div>

            <!-- SUBMIT -->
            <button
              type="button"
              :disabled="!canSubmit || isLoading"
              class="w-full rounded-full py-3 font-semibold text-white transition"
              :class="[
                !canSubmit
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90',
              ]"
              @click="showModal = true"
            >
              <span v-if="!isLoading">ยืนยันข้อมูล</span>
              <span v-else>กำลังดำเนินการ...</span>
            </button>
            <div v-if="errorMessage" class="text-sm text-red-500 text-center">
              {{ errorMessage }}
            </div>

            <div
              v-if="successMessage"
              class="text-sm text-green-600 text-center"
            >
              {{ successMessage }}
            </div>
          </form>
        </div>
        <!-- MODAL -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center"
          >
            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-black/40"
              @click="showModal = false"
            />

            <!-- Modal Box -->
            <div
              class="relative bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl"
            >
              <h2 class="text-lg font-semibold mb-3">
                ยืนยันการเปลี่ยนรหัสผ่าน
              </h2>
              <p class="text-sm text-gray-600 mb-6">
                คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนรหัสผ่าน?
              </p>

              <div class="flex justify-end gap-3">
                <button
                  class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  @click="showModal = false"
                >
                  ยกเลิก
                </button>

                <button
                  class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                  @click="handleConfirm"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </Transition>
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
<template>
  <div class="flex  items-center justify-center bg-slate-50 font-thai p-6">
    <div class="w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200 ring-1 ring-slate-200">
      
      <div class="p-8 text-center border-b border-slate-50">
        <h1 class="text-2xl font-black text-[#2196F3] uppercase ">
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
            <button type="button" class="absolute right-4 top-4 text-slate-400 hover:text-[#2196F3]" @click="showNewPass = !showNewPass">
              <EyeIcon v-if="!showNewPass" />
              <EyeSlashIcon v-else />
            </button>
          </div>
          
          <div v-if="newPassword.length > 0" class="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 transition-all border border-slate-100">
            <div 
              v-for="rule in strength.constraints" 
              :key="rule.id"
              class="flex items-center gap-2 text-xs transition-colors duration-300"
              :class="rule.met ? 'text-[#2196F3] font-bold' : 'text-slate-400'"
            >
              <div class="h-1.5 w-1.5 rounded-full" :class="rule.met ? 'bg-[#2196F3]' : 'bg-slate-300'" />
              {{ rule.label }}
            </div>
            
            <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div 
                class="h-full transition-all duration-500"
                :class="strength.isComplete ? 'bg-[#2196F3]' : 'bg-amber-500'"
                :style="{ width: `${(strength.passedCount / 4) * 100}%` }"
              />
            </div>
          </div>
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

        <div v-if="newPassword !== '' && confirmNewPassword !== ''" class="mt-2 font-thai text-sm">
        
        <div v-if="newPassword !== confirmNewPassword" class="text-red-500">
            รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน
        </div>

        <div v-else class="text-green-500 font-bold">
            รหัสผ่านตรงกัน
        </div>

        </div>

        <div class="flex flex-col gap-3 pt-4">
            <button 
            type="submit"
            :disabled="isLoading || !strength.isComplete"
            class="w-full rounded-2xl bg-[#2196F3] py-4 font-black uppercase text-white transition-all 
                    hover:bg-[#1976D2] active:scale-[0.98] 
                    disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 
                    disabled:pointer-events-none shadow-lg"
            >
            <span v-if="!isLoading">เปลี่ยนรหัสผ่าน</span>
            <div v-else class="flex items-center justify-center gap-2">
              <div class="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
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
</template>

<script setup>
import { ref, computed, h } from 'vue';

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
const EyeIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', class: 'w-6 h-6' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 5 12 5c4.791 0 8.601 3.049 9.964 6.678.045.122.045.255 0 .377C20.601 15.951 16.79 19 12 19c-4.79 0-8.601-3.049-9.964-6.678z' }),
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
]);

const EyeSlashIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', class: 'w-6 h-6' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.822 7.822L21 21m-2.278-2.278L15.07 15.07M15.07 15.07A3 3 0 0010.93 10.93L15.07 15.07z' })
]);

// Password strength logic
const strength = computed(() => {
  const pwd = newPassword.value;
  const constraints = [
    { id: 1, label: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร', met: pwd.length >= 8 },
    { id: 2, label: 'ประกอบด้วยตัวพิมพ์เล็ก (a-z)', met: /[a-z]/.test(pwd) },
    { id: 3, label: 'ประกอบด้วยตัวพิมพ์ใหญ่ (A-Z)', met: /[A-Z]/.test(pwd) },
    { id: 4, label: 'ประกอบด้วยอักขระพิเศษ (เช่น !@#$?%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const passedCount = constraints.filter(c => c.met).length;
  
  return {
    constraints,
    passedCount,
    isComplete: passedCount === constraints.length
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

<style scoped>
/* Ensure Thai text looks clean and loopless if using Inter + IBM Plex */
.font-thai {
  line-height: 1.6;
}
</style>
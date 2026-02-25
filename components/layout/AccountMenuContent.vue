<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { User } from '@/types/user';

type UserRole = 'Technician' | 'Dealer' | 'Franchise';

interface RoleOption {
  name: UserRole;
  icon: string;
  color: string;
}

defineProps<{
  currentUser: User | null;
  roles: readonly RoleOption[];
  totalPO: number;
}>();

const emit = defineEmits<{
  'switch-role': [role: UserRole];
  'go-po': [];
  logout: [];
  close: [];
}>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
    <div
      v-if="currentUser"
      class="px-4 py-3 bg-slate-50 border-b border-gray-100"
    >
      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        ชื่อผู้ใช้งาน
      </p>
      <p class="text-sm font-bold text-slate-800">
        {{ currentUser.fname }} {{ currentUser.lname }}
      </p>
    </div>

    <div class="p-2">
      <p class="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        สลับสิทธิ์การเข้าชม (Mock)
      </p>
      <div
        v-for="role in roles"
        :key="role.name"
        class="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all"
        :class="[
          currentUser?.role === role.name ? 'bg-blue-50' : 'hover:bg-gray-50',
        ]"
        @click="emit('switch-role', role.name)"
      >
        <Icon :icon="role.icon" class="w-5 h-5" :class="role.color" />
        <div class="flex flex-col">
          <span
            class="text-xs font-bold"
            :class="currentUser?.role === role.name ? 'text-primary' : 'text-gray-700'"
          >
            {{ role.name }}
          </span>
          <span
            v-if="currentUser?.role === role.name"
            class="text-[9px] text-blue-400 font-medium italic"
          >
            กำลังใช้งาน
          </span>
        </div>
        <Icon
          v-if="currentUser?.role === role.name"
          icon="mdi:check-circle"
          class="ml-auto w-4 h-4 text-primary"
        />
      </div>
    </div>

    <div class="h-px bg-gray-100 mx-3 mt-1" />
    <div class="py-1">
      <div
        class="flex items-center px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
        @click="emit('go-po')"
      >
        <span>การสั่งซื้อของฉัน</span>
        <span class="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center">
          {{ totalPO }}
        </span>
      </div>
      <div class="px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition">
        การเงินเเละการชำระเงิน
      </div>

      <NuxtLink
        to="/Dealer_Profile"
        class="block px-4 py-3 text-sm text-gray-800 cursor-pointer hover:bg-gray-50 transition"
        @click="emit('close')"
      >
        บัญชีของฉัน
      </NuxtLink>

      <div
        class="px-4 py-3 text-sm text-red-500 font-bold cursor-pointer hover:bg-red-50 transition flex items-center gap-2"
        @click="emit('logout')"
      >
        <Icon icon="mdi:logout" class="w-4 h-4" />
        ออกจากระบบ
      </div>
    </div>
  </div>
</template>

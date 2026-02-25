<script setup lang="ts">
import { Icon } from '@iconify/vue';

const navItems = [
  { name: 'หน้าแรก', icon: 'mdi:home-variant-outline', activeIcon: 'mdi:home-variant', path: '/' },
  { name: 'หมวดหมู่', icon: 'mdi:category-outline', activeIcon: 'mdi:category', path: '/category' },
  { name: 'ใบสั่งซื้อ', icon: 'mdi:file-document-outline', activeIcon: 'mdi:file-document', path: 'dsf' },
  { name: 'บัญชี', icon: 'mdi:account-outline', activeIcon: 'mdi:account', path: '/Dealer_Profile' },
];
</script>

<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 pb-[env(safe-area-inset-bottom)]">
    <div class="flex items-center justify-around h-16">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1 transition-all duration-300 relative"
      >
        <template #default="{ isActive }">
          <div 
            class="flex flex-col items-center transition-all duration-300"
            :class="[isActive ? 'text-[#0D95DA] -translate-y-1' : 'text-slate-400']"
          >
            <Icon 
              :icon="isActive ? item.activeIcon : item.icon" 
              class="w-6 h-6 mb-1 transition-transform duration-300" 
            />
            <span class="text-[10px] font-bold tracking-tight uppercase">
              {{ item.name }}
            </span>

            <div 
              v-if="isActive" 
              class="absolute -bottom-1 w-5 h-1 bg-[#0D95DA] rounded-full"
            />
          </div>
        </template>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
/* ทำให้เวลาแตะบนมือถือไม่มี Hilight สีฟ้าที่น่ารำคาญ */
* {
  -webkit-tap-highlight-color: transparent;
}
</style>
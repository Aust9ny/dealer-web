<script setup lang="ts">
import { Icon } from '@iconify/vue';
const { locale, setLocale } = useI18n();

// ฟังก์ชันสลับภาษา
const toggleLanguage = () => {
  const newLocale = locale.value === 'th' ? 'en' : 'th';
  setLocale(newLocale);
};
</script>

<template>
  <button
  class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-200 active:scale-95  group"
  :aria-label="locale === 'th' ? 'Switch to English' : 'สลับเป็นภาษาไทย'"
  @click="toggleLanguage"
  >
    <div class="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-blue-50 transition-colors">
      <Icon 
        :icon="locale === 'th' ? 'twemoji:flag-thailand' : 'twemoji:flag-united-states'" 
        class="w-4 h-4" 
      />
    </div>

    <div class="flex flex-col items-start leading-none">
      <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Language</span>
      <span class="text-sm font-bold text-slate-700">{{ locale === 'th' ? 'ไทย (TH)' : 'English (EN)' }}</span>
    </div>

    <Icon 
      icon="mdi:swap-horizontal" 
      class="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors ml-1" 
    />
  </button>
</template>
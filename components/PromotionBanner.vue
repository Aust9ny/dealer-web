<script setup lang="ts">
import type { Banner } from '~/types/banner';

defineProps<{
  banners: Banner[];
}>();
</script>

<template>
  <div class="promotion-banner">
    <BaseSlider 
      :items="banners" 
      :items-per-row="1" 
      auto-play 
      :interval="6000"
      :show-arrows="false"
    >
      <template #default="{ item }">
        <a 
          :href="(item as Banner).link || '#'" 
          class="block w-full aspect-4/1 md:aspect-8/3 overflow-hidden rounded-xl border border-slate-200 shadow-sm"
        >
          <img 
            :src="(item as Banner).image" 
            :alt="(item as Banner).alt || 'Promotion'" 
            class="w-full h-full object-fill transition-transform duration-700 hover:scale-105"
          >
        </a>
      </template>
    </BaseSlider>
  </div>
</template>
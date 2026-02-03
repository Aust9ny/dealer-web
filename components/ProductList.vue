<script setup lang="ts">
import type { Product } from '~/types/product';

defineProps<{
  title?: string;
  products: Product[];
}>();
</script>

<template>
  <BaseSlider :title="title" :items="products" :items-per-row="5" auto-play>
    
    <template #header-action>
      <button class="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-[#2196F3] rounded-3xl transition-colors border border-slate-200">
        <span class="inline-block transition-transform duration-200 text-lg origin-center group-hover:scale-105">ดูทั้งหมด</span>
        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </template>

    <template #default="{ item }">
      <div class="relative z-10 hover:z-20 hover:scale-105 transition-transform duration-300 ease-out">
        <ProductCard :product="(item as Product)" />
      </div>
    </template>

  </BaseSlider>
</template>
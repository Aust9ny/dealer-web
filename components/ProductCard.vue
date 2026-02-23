<template>
  <article
    class="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-300 flex flex-col h-full">

    <div
      class="aspect-square mb-4 overflow-hidden rounded-xl bg-white flex items-center justify-center relative shrink-0">
      <div 
        v-if="product.isHot"
        class="absolute top-0 left-0 z-20 bg-[#ef4444] text-white text-[9px] font-black px-2 py-1 rounded-br-xl flex flex-col items-center leading-tight shadow-sm">
        <span>FREE!!</span>
        <span class="text-[7px] opacity-90">GIFT SET</span>
      </div>

      <div class="absolute top-1 right-1 z-20 flex flex-col items-end gap-1 max-w-[70%]">
        <div 
          v-if="product.brandImg"
          class="bg-white/70 backdrop-blur-sm border border-slate-100 px-2 py-0.5 rounded-full shadow-sm">
          <img :src="product.brandImg" :alt="product.brand" class="h-3 w-auto object-contain">
        </div>
        <div class="bg-[#facc15] text-[8px] font-black px-2 py-0.5 rounded-l-full shadow-sm flex items-center gap-1">
          <span
            class="bg-white text-[#facc15] rounded-full w-2.5 h-2.5 flex items-center justify-center text-[6px]">▶</span>
          PARTNER PROMO
        </div>
        <div v-if="product.isNew">
          <span class="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-l-md shadow-sm">NEW</span>
        </div>
        <div 
          v-if="product.discountPercentage"
          class="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-l-md shadow-sm">
          -{{ product.discountPercentage }}%
        </div>
      </div>

      <NuxtLink :to="getProductUrl(product)">
        <img 
          :src="product.image" :alt="product.name"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 z-10 p-2"
        >
      </NuxtLink>
    </div>

    <div class="space-y-1 grow">
      <p class="text-[#3b82f6] text-[11px] font-bold uppercase tracking-wider">{{ product.brand }}</p>
      <h3 class="text-slate-900 font-bold text-sm leading-snug line-clamp-2 min-h-10">
        {{ product.name }}
      </h3>
      <p class="text-slate-400 text-[10px] leading-tight line-clamp-2 min-h-7">
        {{ product.specs }}
      </p>

      <div v-if="product.promotion" class="mt-3 border-2 border-dashed border-[#3b82f6]/30 rounded-lg p-2 bg-[#f0f7ff]">
        <p class="text-[#1e40af] text-[10px] font-medium truncate">
          {{ product.promotion }}... <span class="font-bold underline cursor-pointer">ดูเพิ่มเติม</span>
        </p>
      </div>
      
      <div v-else class="mt-3 border-2 border-dashed border-[#3b82f6]/30 rounded-lg p-2 bg-[#f0f7ff]">
        <p class="text-[#1e40af] text-[10px] font-medium truncate">
          ส่งฟรีภายใน 3 ชั่วโมง... <span class="font-bold underline cursor-pointer">ดูเพิ่มเติม</span>
        </p>
      </div>
      
    </div>

    <div class="mt-4 pt-4 border-t border-slate-50 relative">
      <div class="flex items-start justify-between" :class="[viewMode === 'grid' ? 'mb-4' : '']">
        <div class="flex flex-col">
          <span class="text-xl font-black text-slate-900 leading-none">฿{{ product.price.toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1 items-end ">
          <span
            class="bg-slate-50 text-slate-500 text-[8px] px-2 py-0.5 rounded-full border border-slate-100 italic whitespace-nowrap">
            {{ product.warranty }}
          </span>
          <span
            class="bg-slate-50 text-slate-500 text-[8px] px-2 py-0.5 rounded-full border border-slate-100 whitespace-nowrap">
            {{ product.delivery }}
          </span>
        </div>
      </div>

      <div v-if="viewMode === 'grid'" class="flex justify-center border-t border-slate-50 pt-4">
        <button
          class="w-full bg-[#0D95DA] text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0b7cb5] transition-all active:scale-95 shadow-sm">
          <svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="3">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>เปิดบิล</span>
        </button>
      </div>

      <div v-else class="flex justify-center pt-4 gap-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path 
            fill="#90a1b9" fill-rule="evenodd"
            d="m14.5 8l.415-.208V7.79l-.003-.003l-.006-.012l-.021-.04l-.08-.144a8 8 0 0 0-.311-.494a9.4 9.4 0 0 0-1.255-1.485C12.113 4.532 10.38 3.43 8 3.43c-2.378 0-4.112 1.101-5.238 2.182a9.4 9.4 0 0 0-1.255 1.485a8 8 0 0 0-.412.678l-.006.012l-.002.003v.001s-.001.001.414.209l-.415-.209a.47.47 0 0 0 0 .417L1.5 8l-.415.208v.002l.003.003l.006.012a3 3 0 0 0 .1.184a9.4 9.4 0 0 0 1.566 1.98c1.127 1.08 2.86 2.18 5.24 2.18c2.379 0 4.113-1.1 5.24-2.181a9.5 9.5 0 0 0 1.254-1.485a8 8 0 0 0 .391-.638l.021-.04l.006-.012l.002-.003v-.001s.001-.001-.414-.209m0 0l.415.209a.47.47 0 0 0 0-.417zM7.94 6.464a1.536 1.536 0 1 0 0 3.072a1.536 1.536 0 0 0 0-3.072M5.478 8a2.464 2.464 0 1 1 4.928 0a2.464 2.464 0 0 1-4.928 0"
            clip-rule="evenodd" />
        </svg>
        <span class=" text-xs text-center text-slate-400">
          {{ product.views }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';

defineProps<{
  product: Product;
  viewMode?: 'list' | 'grid';
}>();

const { getProductUrl } = useProductUrl();

</script>
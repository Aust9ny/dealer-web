<template>
  <article class="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-300 flex flex-col h-full">
    
    <div class="aspect-square mb-4 overflow-hidden rounded-xl bg-white flex items-center justify-center relative shrink-0">
      <div v-if="product.isHot" class="absolute top-0 left-0 z-20 bg-[#ef4444] text-white text-[9px] font-black px-2 py-1 rounded-br-xl flex flex-col items-center leading-tight shadow-sm">
        <span>FREE!!</span>
        <span class="text-[7px] opacity-90">GIFT SET</span>
      </div>

      <div class="absolute top-0 right-0 z-20 flex flex-col items-end gap-1">
        <div v-if="product.brandImg" class="bg-white/70 backdrop-blur-sm border border-slate-100 px-2 py-0.5 rounded-full shadow-sm">
          <img :src="product.brandImg" :alt="product.brand" class="h-3 w-auto object-contain">
        </div>
        <div class="bg-[#facc15] text-[8px] font-black px-2 py-0.5 rounded-l-full shadow-sm flex items-center gap-1">
          <span class="bg-white text-[#facc15] rounded-full w-2.5 h-2.5 flex items-center justify-center text-[6px]">▶</span>
          PARTNER PROMO
        </div>
        <div v-if="product.isNew">
          <span class="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-l-md shadow-sm">NEW</span>
        </div>
        <div v-if="product.discountPercentage" class="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-l-md shadow-sm">
          -{{ product.discountPercentage }}%
        </div>
      </div>
      
      <img :src="product.image" :alt="product.name" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 z-10 p-2">
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
    </div>

    <div class="mt-4 pt-4 border-t border-slate-50 relative">
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col">
          <span class="text-2xl font-black text-slate-900 leading-none">฿{{ product.price.toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1 items-end">
          <span class="bg-slate-50 text-slate-500 text-[8px] px-2 py-0.5 rounded-full border border-slate-100 italic whitespace-nowrap">
            {{ product.warranty }}
          </span>
          <span class="bg-slate-50 text-slate-500 text-[8px] px-2 py-0.5 rounded-full border border-slate-100 whitespace-nowrap">
            {{ product.delivery }}
          </span>
        </div>
      </div>

      <div class="flex justify-center border-t border-slate-50 pt-2">
        <div class="text-slate-300 text-[10px] flex items-center gap-1 hover:text-[#3b82f6] transition-colors cursor-default">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
          </svg>
          <span class="font-medium">{{ product.views }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';
defineProps<{ product: Product }>();
</script>
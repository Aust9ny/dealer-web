<template>
  <article class="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-100 ">
    <div class="flex justify-between items-start mb-4">
      <span v-if="product.isHot" class="bg-[#ef4444] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
        🔥 Hot Item
      </span>
      <div class="flex gap-1 ml-auto">
        <span class="border-2 border-[#3b82f6] text-[#3b82f6] text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">ICT</span>
        <span class="bg-[#3b82f6] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md text-center leading-tight">
          0<small class="text-[8px]">%</small>
        </span>
      </div>
    </div>

    <div class="aspect-square mb-4 overflow-hidden rounded-xl">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">
    </div>

    <div class="space-y-1">
      <p class="text-[#3b82f6] text-[11px] font-bold uppercase tracking-wider">{{ product.brand }}</p>
      <h3 class="text-slate-900 font-bold text-sm leading-snug line-clamp-2 min-h-10">
        {{ product.name }}
      </h3>
      <p class="text-slate-400 text-[10px] leading-tight">{{ product.specs }}</p>
    </div>

    <div v-if="product.promotion" class="mt-3 border-2 border-dashed border-[#3b82f6]/30 rounded-lg p-2 bg-[#f0f7ff]">
      <p class="text-[#1e40af] text-[10px] font-medium truncate">
        {{ product.promotion }}... <span class="font-bold underline">ดูเพิ่มเติม</span>
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-2">
      <div class="flex items-baseline gap-1">
        <span class="text-2xl font-black text-slate-900">฿{{ product.price.toLocaleString() }}</span>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span class="bg-slate-50 text-slate-500 text-[9px] px-2 py-0.5 rounded-full border border-slate-100 italic">
            {{ product.warranty }}
          </span>
          <span class="bg-slate-50 text-slate-500 text-[9px] px-2 py-0.5 rounded-full border border-slate-100">
            {{ product.delivery }}
          </span>
        </div>
        <div class="text-slate-300 text-[10px] flex items-center gap-1">
          👁️ {{ product.views }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';
defineProps<{ product: Product }>();
</script>
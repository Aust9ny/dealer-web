<script setup lang="ts">
import { Icon } from '@iconify/vue';

const data = useDashboard();
const product = data.products;

const route = useRoute();
const slug = route.params.slug as string;

// Extract ID and find product from your ref/mock data
const productId = computed(() => Number(slug.split('-').pop()));
const products = computed(() => product.value.find(p => p.id === productId.value));

const quantity = ref(0);

// Pricing Tiers Logic (Mocking your Franchise/Dealer structure)
const priceTiers = computed(() => [
  { label: 'SRP:', price: products.value?.price || 0, class: 'bg-white text-slate-900' },
  { label: 'Technician:', price: (products.value?.price || 0) * 0.96, class: 'bg-slate-50' },
  { label: 'Dealer:', price: (products.value?.price || 0) * 0.95, class: 'bg-slate-50' },
  { label: 'Franchise:', price: (products.value?.price || 0) * 0.94, class: 'bg-slate-50' },
]);
</script>

<template>
  <div v-if="product" class="min-h-screen bg-[#F8F9FA] pb-20">
    <div class="max-w-300 mx-auto px-4 py-4 flex items-center gap-2 text-[13px] text-slate-500">
      <NuxtLink to="/" class="hover:text-blue-500">หน้าแรก</NuxtLink>
      <Icon icon="mdi:chevron-right" class="w-4 h-4" />
    <NuxtLink to="../category">
        <span class="hover:text-blue-500 cursor-pointer">หมวดหมู่สินค้า</span>
    </NuxtLink>

      <Icon icon="mdi:chevron-right" class="w-4 h-4" />
      <span class="truncate font-bold text-slate-800">{{ products?.name }}</span>
    </div>

    <div class="max-w-300 mx-auto px-4">
      <div class="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div class="lg:col-span-5 space-y-6">
            <div class="aspect-square flex items-center justify-center p-4  rounded-lg group">
              <img :src="products?.image" class="max-h-full object-contain transition-transform group-hover:scale-105" >
            </div>
            <div class="flex gap-3 justify-center">
              <div v-for="i in 5" :key="i" class="w-16 h-16 border rounded p-1 cursor-pointer hover:border-blue-500">
                <img :src="products?.image" class="w-full h-full object-contain" >
              </div>
            </div>
            <button class="flex items-center gap-2 mx-auto text-slate-400 text-sm hover:text-blue-500">
              <Icon icon="mdi:share-variant-outline" /> แชร์สินค้า
            </button>
          </div>

          <div class="lg:col-span-7 space-y-4">
            <div>
              <p class="text-[#0D95DA] font-bold uppercase text-xs tracking-wide">{{ products?.brand }}</p>
              <h1 class="text-xl font-bold text-slate-800 mt-1 leading-tight">{{ products?.name }}</h1>
              <p class="text-xs text-slate-400 mt-2">รหัสสินค้า : {{ products?.sku }}</p>
            </div>

            <ul class="bg-slate-50 rounded-md p-4 space-y-1">
              <li class="text-[11px] text-slate-500 flex gap-2">
                <span class="font-bold min-w-20">• Spec:</span> {{ products?.specs }}
              </li>
              <li class="text-[11px] text-slate-500 flex gap-2">
                <span class="font-bold min-w-20">• Warranty:</span> {{ products?.warranty }}
              </li>
            </ul>

            <div class=" rounded-md overflow-hidden">
              <div 
                v-for="tier in priceTiers" :key="tier.label" 
                class="flex justify-between items-center p-3 border-b last:border-0" :class="tier.class">
                <span class="text-sm font-bold text-slate-600">{{ tier.label }}</span>
                <span class="text-lg font-black" :class="tier.label === 'SRP:' ? 'text-slate-800' : 'text-blue-600'">
                  ฿{{ tier.price.toLocaleString() }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-6 pt-2">
              <div class="flex items-center">
                <span class="text-sm font-bold mr-4">จำนวนสั่ง:</span>
                <input
                v-model="quantity"
                type="number" 
                class="w-20 p-2 border text-center rounded focus:ring-1 outline-none" :disabled="!products?.isInStock" :class="!products?.isInStock ? 'bg-slate-300 text-slate-400' : ''">
                <span v-if="products?.isInStock" class="text-sm font-bold"> สินค้าหมดชั่วคราว</span>
              </div>
            </div>

            <button class="w-full bg-[#0D95DA] text-white py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-[#0b7cb5] shadow-lg shadow-blue-500/10">
              <Icon icon="mdi:cart-plus" class="w-5 h-5" /> เปิดบิล
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex border-b">
          <button class="px-8 py-4 border-b-2 border-blue-500 text-blue-500 font-bold text-sm">รายละเอียดสินค้า</button>
          <button class="px-8 py-4 text-slate-400 font-bold text-sm hover:bg-slate-50 transition-colors">คุณสมบัติ</button>
        </div>
        <div class="p-8 space-y-6">
          <h2 class="text-lg font-bold text-slate-800">รายละเอียดสินค้า {{ products?.name }}</h2>
          <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {{ products?.specs }} <br><br>
            Powered by high-performance components designed for speed and reliability.
            This product includes standard manufacturer warranty coverage.
          </p>
          
          <div class="pt-4 border-t">
            <h3 class="font-bold text-slate-800 mb-4">Feature Highlights:</h3>
            <ul class="space-y-2 text-sm text-slate-600">
              <li v-for="feature in 5" :key="feature" class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-slate-300 rounded-full"/>
                High-performance technology built for professional standards.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
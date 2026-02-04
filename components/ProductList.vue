<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import type { Product } from '~/types/product';

const props = defineProps<{
  products: Product[];
  title?: string;
}>();

const sliderRef = ref<any>(null); // เพิ่ม ref สำหรับเข้าถึง BaseSlider
const selectedCategory = ref('All');
const indicatorStyle = ref({ width: '0px', left: '0px' });
const buttonRefs = ref<any[]>([]);

// ฟังก์ชันคำนวณตำแหน่งและขนาดของปุ่มที่เลือก
const updateIndicator = () => {
  const index = categories.value.indexOf(selectedCategory.value);
  const el = buttonRefs.value[index];
  if (el) {
    indicatorStyle.value = {
      width: `${el.offsetWidth}px`,
      left: `${el.offsetLeft}px`
    };
  }
};

const categories = computed(() => {
  const allCats = props.products
    .map(p => p.category)
    .filter(cat => !!cat); 
  return ['All', ...new Set(allCats)];
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') return props.products;
  return props.products.filter(p => p.category === selectedCategory.value);
});

// ปรับปรุง Logic การแสดง Title
const displayTitle = computed(() => {
  if (selectedCategory.value === 'All') {
    return props.title || 'All Products';
  }
  return selectedCategory.value;
});

// เฝ้าดูการเปลี่ยนหมวดหมู่
watch(selectedCategory, () => {
  // 1. Move the blue indicator pill
  nextTick(updateIndicator);
  
  // 2. Reset Slider Page AND Restart Timer
  if (sliderRef.value) {
    sliderRef.value.resetSlider();
  }
});

onMounted(() => {
  setTimeout(updateIndicator, 150);
});
</script>

<template>
  <BaseSlider
    ref="sliderRef"
    :title="displayTitle" 
    :items="filteredProducts" 
    :items-per-row="5"
    :show-arrows="true"
    auto-play
  >
    <template #header-action>
      <div class="flex items-center gap-4">
        <div 
          v-if="categories.length > 1" 
          class="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-300 relative"
        >
          <div 
            class="absolute h-[calc(100%-8px)] bg-[#2196F3] rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
            :style="indicatorStyle"
          />

          <button 
            v-for="(cat, index) in categories" 
            :key="cat"
            :ref="(el) => (buttonRefs[index] = el)"
            type="button"
            :class="[
              'relative z-10 px-4 py-1.5 text-sm font-bold rounded-full transition-colors duration-300 whitespace-nowrap',
              selectedCategory === cat ? 'text-white' : 'text-slate-500 hover:text-slate-800'
            ]"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
        
        <button class="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-[#2196F3] rounded-3xl border border-slate-300 hover:border-[#2196F3] transition-all">
          <span class="text-sm md:text-base">ดูทั้งหมด</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </template>

    <template #default="{ item }">
      <div class="transition-transform duration-300 hover:scale-[1.02]">
        <ProductCard :product="(item as Product)" />
      </div>
    </template>
  </BaseSlider>
</template>
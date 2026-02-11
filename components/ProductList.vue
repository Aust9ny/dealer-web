<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue';
import type { Product } from '~/types/product';

// ใช้ withDefaults เพื่อกำหนดค่าเริ่มต้นให้ครบทุกตัวที่เป็น Optional
const props = withDefaults(defineProps<{
  products: Product[];
  title?: string;
  viewMode?: 'list' | 'grid';
}>(), {
  title: '',      
  viewMode: 'list'  
});

const sliderRef = ref<any>(null);
const selectedCategory = ref('All');
const indicatorStyle = ref({ width: '0px', left: '0px' });
const buttonRefs = ref<any[]>([]);

const updateIndicator = () => {
  if (props.viewMode === 'grid') return; // ไม่ต้องคำนวณถ้าอยู่ในโหมด grid
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
  const allCats = props.products.map(p => p.category).filter(cat => !!cat); 
  return ['All', ...new Set(allCats)];
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') return props.products;
  return props.products.filter(p => p.category === selectedCategory.value);
});

// ปรับ Title ให้ซ่อนหรือเปลี่ยนตามความเหมาะสม
const displayTitle = computed(() => {
  if (props.viewMode === 'grid') return ''; // ซ่อน Title เมื่อเป็น Grid ตามคำขอ
  if (selectedCategory.value === 'All') return 'รายการสินค้าแนะนำ';
  return `รายการสินค้าประเภท ${selectedCategory.value}`;
});

watch(selectedCategory, () => {
  nextTick(updateIndicator);
  if (sliderRef.value) {
    sliderRef.value.resetSlider();
  }
});

const handleResize = () => {
  updateIndicator();
};

onMounted(() => {
  if (props.viewMode !== 'grid') {
    setTimeout(updateIndicator, 150);
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="product-list-section py-4">
    <div 
      v-if="props.viewMode !== 'grid'" 
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mx-14 mb-4"
    >
      <h2 class="text-2xl font-bold text-slate-800 min-w-50">
        {{ displayTitle }}
      </h2>

      <div class="flex items-center gap-4">
        <div 
          v-if="categories.length > 1" 
          class="hidden md:flex items-center gap-1 bg-white p-1 rounded-full border border-slate-300 relative overflow-hidden"
        >
          <div 
            class="absolute bg-[#2196F3] rounded-full transition-all duration-300 shadow-sm"
            :style="{ width: indicatorStyle.width, left: indicatorStyle.left, top: '4px', bottom: '4px', height: 'calc(100% - 8px)' }"
          />
          <button 
            v-for="(cat, index) in categories" :key="cat"
            :ref="(el) => (buttonRefs[index] = el)"
            type="button"
            class="relative z-10 px-4 py-1.5 text-sm font-bold rounded-full transition-colors duration-300 whitespace-nowrap"
            :class="[selectedCategory === cat ? 'text-white' : 'text-slate-400 hover:text-slate-800']"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <NuxtLink to="category">
          <button class="group flex items-center gap-2 px-4 py-2 text-md font-semibold text-slate-400 hover:text-[#2196F3] rounded-3xl border border-slate-300 hover:border-[#2196F3] transition-all whitespace-nowrap active:scale-95">
            <span>ดูทั้งหมด</span>
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="props.viewMode === 'grid'" class="mx-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div v-for="product in products" :key="product.id" class="transition-transform duration-300 hover:scale-[1.03]">
          <ProductCard :product="product" view-mode="grid" />
        </div>
      </div>
    </div>

    <BaseSlider
      v-else
      ref="sliderRef"
      :items="filteredProducts" 
      :items-per-row="5"
      :show-arrows="true"
      auto-play
    >
      <template #default="{ item }">
        <div class="p-1">
          <div class="transition-transform duration-300 hover:scale-[1.03]">
            <ProductCard :product="(item as Product)" />
          </div>
        </div>
      </template>
    </BaseSlider>
  </div>
</template>
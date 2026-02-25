<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue';
import type { Product } from '~/types/product';

const props = withDefaults(defineProps<{
  products: Product[];
  title?: string;
  loading?: boolean; // รับสถานะการโหลดจาก parent (ถ้ามี)
}>(), {
  title: '',
  loading: false
});

const sliderRef = ref<any>(null);
const selectedCategory = ref('All');
const indicatorStyle = ref({ width: '0px', left: '0px' });
const buttonRefs = ref<any[]>([]);

// ฟังก์ชันคำนวณตำแหน่งและขนาดของปุ่มที่เลือก (สำหรับ Indicator เส้นสีฟ้า)
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
  // ถ้ายังโหลดไม่เสร็จ ให้โชว์แค่ปุ่ม All เพื่อความนิ่งของ UI
  if (!props.products || props.products.length === 0) return ['All'];
  
  const allCats = props.products.map(p => p.category).filter(cat => !!cat); 
  return ['All', ...new Set(allCats)];
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') return props.products;
  return props.products.filter(p => p.category === selectedCategory.value);
});

const displayTitle = computed(() => {
  if (selectedCategory.value === 'All') return props.title || 'รายการสินค้าแนะนำ';
  return `รายการสินค้าประเภท ${selectedCategory.value}`;
});

// เฝ้าดูการเปลี่ยนหมวดหมู่ภายใน Slider
watch(selectedCategory, () => {
  nextTick(updateIndicator);
  if (sliderRef.value?.resetSlider) {
    sliderRef.value.resetSlider();
  }
});

const handleResize = () => {
  updateIndicator();
};

onMounted(() => {
  setTimeout(updateIndicator, 150);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="product-list-section py-4">
    <div class="flex flex-wrap items-start justify-between gap-x-3 md:gap-x-6 gap-y-3 md:gap-y-4 mx-3 md:mx-14 mb-6 md:mb-8">
      
      <div class="w-full lg:w-100 shrink-0">
        <h2 class="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
          {{ displayTitle }}
        </h2>
      </div>

      <div v-if="categories.length > 1" class="flex flex-wrap items-start justify-start lg:justify-end gap-2 flex-1">
        <button 
          v-for="cat in categories" 
          :key="cat"
          ref="buttonRefs"
          type="button"
          :class="[
            'px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 border shadow-sm active:scale-95 whitespace-nowrap',
            selectedCategory === cat 
              ? 'bg-[#2196F3] border-[#2196F3] text-white' 
              : 'bg-white border-slate-300 text-slate-400 hover:text-slate-800 hover:border-slate-400'
          ]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <NuxtLink to="category" class="w-full sm:w-auto">
        <button class="w-full sm:w-auto group flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-[#2196F3] rounded-full border border-slate-300 hover:border-[#2196F3] transition-all active:scale-95 whitespace-nowrap">
          <span>ดูทั้งหมด</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </NuxtLink>
    </div>

    <div class="relative px-2 md:px-14">
      
      <div 
        v-if="!products || products.length === 0 || loading" 
        class="flex gap-1 md:gap-2 overflow-hidden"
      >
        <div 
          v-for="i in 5" 
          :key="i"
          class="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-1 md:p-2"
        >
          <ProductCardSkeleton />
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
          <div class="p-1 h-full"> 
            <div class="h-full transition-transform duration-300 hover:scale-[1.03]">
              <ProductCard :product="(item as Product)" />
            </div>
          </div>
        </template>
      </BaseSlider>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Product } from '~/types/product';

const props = defineProps<{
  title?: string;
  products: Product[];
}>();

const itemsPerPage = 5;
const currentIndex = ref(0);
const isPaused = ref(false);
const autoSlideTimer = ref<NodeJS.Timeout | null>(null);

// --- Slider Logic ---
const transformOffset = computed(() => -(currentIndex.value * (100 / itemsPerPage)));
const totalPages = computed(() => Math.ceil(props.products.length / itemsPerPage));
const currentPage = computed(() => Math.floor(currentIndex.value / itemsPerPage));

const next = () => {
  if (currentIndex.value + itemsPerPage < props.products.length) {
    currentIndex.value += itemsPerPage;
  } else {
    currentIndex.value = 0;
  }
};

const prev = () => {
  if (currentIndex.value - itemsPerPage >= 0) {
    currentIndex.value -= itemsPerPage;
  } else {
    currentIndex.value = Math.max(0, (totalPages.value - 1) * itemsPerPage);
  }
};

const goToPage = (pageIndex: number) => {
  currentIndex.value = pageIndex * itemsPerPage;
  startTimer();
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const manualNav = (fn: Function) => {
  fn();
  startTimer();
};

const startTimer = () => {
  stopTimer();
  autoSlideTimer.value = setInterval(() => {
    if (!isPaused.value) next();
  }, 5000);
};

const stopTimer = () => {
  if (autoSlideTimer.value) clearInterval(autoSlideTimer.value);
};

onMounted(() => startTimer());
onUnmounted(() => stopTimer());
</script>

<template>
  <div class="py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 v-if="title" class="text-2xl font-bold text-slate-800">{{ title }}</h2>
      
      <button 
        class="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-[#2196F3] rounded-3xl transition-colors border border-slate-200"
        @click="" 
      >
        <span class="inline-block transition-transform duration-200 text-lg origin-center group-hover:scale-103 border rounded-3xl p-2">ดูทั้งหมด</span>
        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div 
      class="relative group"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <button 
        v-if="totalPages > 1"
        class="absolute -left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white shadow-xl border border-slate-100 text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#386156] hover:text-white"
        @click="manualNav(prev)"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div class="overflow-hidden rounded-2xl p-1">
        <div 
          class="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :style="{ transform: `translateX(${transformOffset}%)` }"
        >
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 transition-transform duration-300 ease-out relative z-10 hover:z-20 hover:scale-105"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>

      <button 
        v-if="totalPages > 1"
        class="absolute -right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white shadow-xl border border-slate-100 text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#386156] hover:text-white"
        @click="manualNav(next)"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>

    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
      <button 
        v-for="(_, i) in totalPages" 
        :key="i"
        class="h-1.5 transition-all duration-300 rounded-full"
        :class="currentPage === i ? 'w-10 bg-[#386156]' : 'w-2 bg-slate-300 hover:bg-slate-400'"
        @click="goToPage(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>
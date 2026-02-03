<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Product } from '~/types/product';

const props = defineProps<{
  title?: string;
  products: Product[];
}>();

// --- 1. Dynamic Items Per Page ---
const visibleItems = ref(5); // ค่าเริ่มต้น

const updateVisibleItems = () => {
  const width = window.innerWidth;
  if (width >= 1280) visibleItems.value = 5;      // xl
  else if (width >= 1024) visibleItems.value = 4; // lg
  else if (width >= 768) visibleItems.value = 3;  // md
  else if (width >= 640) visibleItems.value = 2;  // sm
  else visibleItems.value = 1;                   // mobile
};

// --- 2. State & Logic ---
const currentIndex = ref(0);
const isPaused = ref(false);
const autoSlideTimer = ref<NodeJS.Timeout | null>(null);

// คำนวณ transform โดยใช้ visibleItems แทนค่าคงที่
const transformOffset = computed(() => -(currentIndex.value * (100 / visibleItems.value)));
const totalPages = computed(() => Math.ceil(props.products.length / visibleItems.value));
const currentPage = computed(() => Math.floor(currentIndex.value / visibleItems.value));

const next = () => {
  // ขยับไปทีละหน้าตามจำนวนที่มองเห็น
  if (currentIndex.value + visibleItems.value < props.products.length) {
    currentIndex.value += visibleItems.value;
  } else {
    currentIndex.value = 0;
  }
};

const prev = () => {
  if (currentIndex.value - visibleItems.value >= 0) {
    currentIndex.value -= visibleItems.value;
  } else {
    // ไปหน้าสุดท้ายที่ถูกต้อง
    currentIndex.value = Math.max(0, (totalPages.value - 1) * visibleItems.value);
  }
};

const goToPage = (pageIndex: number) => {
  currentIndex.value = pageIndex * visibleItems.value;
  startTimer();
};

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

// --- 3. Lifecycle ---
onMounted(() => {
  updateVisibleItems();
  window.addEventListener('resize', updateVisibleItems);
  startTimer();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleItems);
  stopTimer();
});
</script>

<template>
  <div class="py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 v-if="title" class="text-2xl font-bold text-slate-800">{{ title }}</h2>
      <button class="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-[#2196F3] rounded-3xl transition-colors border border-slate-200">
        <span class="inline-block transition-transform duration-200 text-lg origin-center group-hover:scale-103 border rounded-3xl p-2 px-4">ดูทั้งหมด</span>
        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="relative group" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
        <button v-if="totalPages > 1" class="nav-btn left-4" @click="manualNav(prev)">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div class="overflow-hidden rounded-2xl p-8">
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

    <button v-if="totalPages > 1" class="nav-btn right-4" @click="manualNav(next)">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
    </button>
    </div>

    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
    <button 
        v-for="(_, i) in totalPages" 
        :key="i"
        class="h-1.5 transition-all duration-300 rounded-full"
        :class="currentPage === i ? 'w-10 bg-[#2196F3]' : 'w-2 bg-slate-300 hover:bg-slate-400'"
        @click="goToPage(i)"
    />
    </div>
</div>
</template>

<style scoped>
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  padding: 1rem;
  border-radius: 9999px;
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  color: #111827;
  opacity: 0;
  transition: all 300ms;
}

.group:hover .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background-color: #2196F3;
  color: white;
}

.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>
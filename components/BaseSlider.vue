<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  items: unknown[];
  title?: string;
  itemsPerRow?: number; 
  autoPlay?: boolean;
}>();

const visibleItems = ref(1);
const currentIndex = ref(0);
const isPaused = ref(false);
const autoSlideTimer = ref<NodeJS.Timeout | null>(null);

const updateVisibleItems = () => {
  const width = window.innerWidth;
  if (props.itemsPerRow === 1) {
    visibleItems.value = 1;
  } else {
    const desktop = props.itemsPerRow || 5;
    if (width >= 1280) visibleItems.value = desktop;
    else if (width >= 1024) visibleItems.value = 4;
    else if (width >= 768) visibleItems.value = 3;
    else if (width >= 640) visibleItems.value = 2;
    else visibleItems.value = 1;
  }
};

const transformOffset = computed(() => -(currentIndex.value * (100 / visibleItems.value)));
const totalPages = computed(() => Math.ceil(props.items.length / visibleItems.value));
const currentPage = computed(() => Math.floor(currentIndex.value / visibleItems.value));

const next = () => {
  if (currentIndex.value + visibleItems.value < props.items.length) {
    currentIndex.value += visibleItems.value;
  } else {
    currentIndex.value = 0;
  }
};

const prev = () => {
  if (currentIndex.value - visibleItems.value >= 0) {
    currentIndex.value -= visibleItems.value;
  } else {
    currentIndex.value = Math.max(0, (totalPages.value - 1) * visibleItems.value);
  }
};

const startTimer = () => {
  if (!props.autoPlay) return;
  stopTimer();
  autoSlideTimer.value = setInterval(() => {
    if (!isPaused.value) next();
  }, 5000);
};

const stopTimer = () => {
  if (autoSlideTimer.value) clearInterval(autoSlideTimer.value);
};

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
      <slot name="header-action" />
    </div>

    <div class="relative group" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
      <button v-if="totalPages > 1" class="nav-btn left-0" @click="prev()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <div :class="['overflow-hidden rounded-2xl', visibleItems > 1 ? 'px-12' : 'px-0']">
        <div 
          class="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :style="{ transform: `translateX(${transformOffset}%)` }"
        >
          <div 
            v-for="(item, index) in items" 
            :key="index"
            class="flex-none p-2"
            :style="{ width: `${100 / visibleItems}%` }"
          >
            <slot :item="item" />
          </div>
        </div>
      </div>

      <button v-if="totalPages > 1" class="nav-btn right-0" @click="next()">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>

    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
      <button 
        v-for="(_, i) in totalPages" :key="i"
        class="h-1.5 transition-all duration-300 rounded-full"
        :class="currentPage === i ? 'w-10 bg-[#2196F3]' : 'w-2 bg-slate-300'"
        @click="currentIndex = i * visibleItems"
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
  color: #1e293b;
  opacity: 0;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-btn:hover {
  background-color: #386156;
  color: white;
}
.group:hover .nav-btn {
  opacity: 1;
}
.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>
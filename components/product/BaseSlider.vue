<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  items: unknown[];
  title?: string;
  itemsPerRow?: number;
  autoPlay?: boolean;
  showArrows?: boolean;
  interval?: number;
}>();

// ตั้งค่าเริ่มต้นให้สอดคล้องกับพฤติกรรม CSS ของเรา
const visibleItems = ref(props.itemsPerRow || 5); 

const currentIndex = ref(0);
const isPaused = ref(false);
const autoSlideTimer = ref<ReturnType<typeof setInterval> | null>(null);
const touchStart = ref(0);
const touchEnd = ref(0);

const shouldShowArrows = computed(() => props.showArrows !== false);

const totalPages = computed(() => {
  if (!props.items?.length) return 0;
  return Math.ceil(props.items.length / visibleItems.value);
});

const currentPage = computed(() => {
  if (visibleItems.value === 0) return 0;
  return Math.floor(currentIndex.value / visibleItems.value);
});

const transformOffset = computed(() => {
  if (visibleItems.value === 0) return 0;
  return -(currentIndex.value * (100 / visibleItems.value));
});

// Logic: เลื่อนไปข้างหน้า (ห้ามวนกลับถ้าใช้ Disabled Button)
const next = () => {
  if (!props.items?.length) return;
  if (currentIndex.value + visibleItems.value < props.items.length) {
    currentIndex.value += visibleItems.value;
  }
};

// Logic: เลื่อนย้อนกลับ
const prev = () => {
  if (!props.items?.length) return;
  if (currentIndex.value - visibleItems.value >= 0) {
    currentIndex.value -= visibleItems.value;
  }
};

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = e.targetTouches[0].clientX;
  touchEnd.value = touchStart.value;
  isPaused.value = true;
};

const updateVisibleItems = () => {
  if (typeof window === 'undefined') return;
  const width = window.innerWidth;
  
  if (props.itemsPerRow === 1) {
    visibleItems.value = 1;
  } else {
    // ต้องให้ตัวเลขชุดนี้ตรงกับ Class ที่เขียนใน Template (w-1/2, w-1/3...)
    if (width >= 1280) visibleItems.value = props.itemsPerRow || 5;
    else if (width >= 1024) visibleItems.value = 4;
    else if (width >= 768) visibleItems.value = 3;
    else visibleItems.value = 2;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  touchEnd.value = e.targetTouches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeDistance = touchStart.value - touchEnd.value;
  const threshold = 50;
  if (swipeDistance > threshold) next();
  else if (swipeDistance < -threshold) prev();
  isPaused.value = false;
};

const startTimer = () => {
  if (!props.autoPlay) return;
  stopTimer();
  autoSlideTimer.value = setInterval(() => {
    if (!isPaused.value) next();
  }, props.interval || 5000);
};

const stopTimer = () => {
  if (autoSlideTimer.value) clearInterval(autoSlideTimer.value);
};

defineExpose({
  resetSlider: () => { currentIndex.value = 0; startTimer(); },
  currentIndex
});

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
  <div class="carousel-container overflow-hidden">
    <div class="flex items-center justify-between mb-2 md:mb-4 md:mx-14 px-4 md:px-0">
      <slot name="header-action" />
    </div>

    <div
      class="relative group"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <button
        v-if="totalPages > 1 && shouldShowArrows"
        class="nav-btn left-1 md:left-4 hidden md:flex" 
        :disabled="currentIndex === 0" 
        @click="prev()"
      >
        <Icon icon="mdi:chevron-left" class="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div :class="['overflow-hidden rounded-2xl transition-all', visibleItems > 1 ? 'md:px-12 px-1' : 'px-0']">
        <div
          class="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :style="{ transform: `translateX(${transformOffset}%)` }"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex-none p-1 md:p-2 transition-none"
            :class="[
              // 🟢 แก้ไขตรงนี้: 
              // ถ้าไม่ใช่ Banner (itemsPerRow > 1) 
              // ให้ Mobile แสดง 2 รูป (w-1/2) แทนการเต็มจอ (w-full)
              itemsPerRow === 1 
                ? 'w-full' 
                : 'w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5' 
            ]"
          >
            <slot :item="item" />
          </div>
        </div>
      </div>

      <button
        v-if="totalPages > 1 && shouldShowArrows"
        class="nav-btn right-1 md:right-4 hidden md:flex"
        :disabled="currentIndex >= items.length - visibleItems"
        @click="next()"
      >
        <Icon icon="mdi:chevron-right" class="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>

    <div v-if="totalPages > 1" class="flex justify-center gap-1 mt-4 md:mt-8">
      <button
        v-for="(_, i) in totalPages" :key="i"
        class="h-1 md:h-1.5 transition-all duration-300 rounded-full"
        :class="currentPage === i ? 'w-6 md:w-10 bg-[#2196F3]' : 'w-1 md:w-2 bg-slate-300'"
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
  z-index: 30;
  width: 44px;
  height: 44px;
  display: none; /* ซ่อนบนมือถือเพื่อใช้ swipe แทน */
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  color: #1e293b;
  opacity: 0.6;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 768px) {
  .nav-btn { display: flex; }
  .group:hover .nav-btn { opacity: 1; }
}

.nav-btn:hover:not(:disabled) {
  background-color: #2196F3;
  color: white;
  border-color: #2196F3;
  transform: translateY(-50%) scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.15 !important;
  cursor: not-allowed;
  filter: grayscale(1);
}

.flex {
  backface-visibility: hidden;
  will-change: transform;
}
</style>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { StyleValue } from 'vue' ;// นำเข้า Type

interface CategoryNode {
  id: number;
  name: string;
  icon: string;
  subCats: string[];
}

// 🟢 STATES & REFS
const isSidebarOpen = ref(true);
const activeCategory = ref<number>(1);
const activeSubCategory = ref<string>('iPhone');
const activeSubTag = ref<string>('ALL');
const globalLoading = useState('global-loading', () => false);
const viewMode = ref<'grid' | 'list'>('list');

const isQuickSelectOpen = ref(false);
const tempCategory = ref<CategoryNode | null>(null);
const flyoutOffset = ref(0);
const isFlipped = ref(false);

const searchQuery = ref('');
const stockStatus = ref<'ทั้งหมด' | 'มีของ' | 'ของหมด'>('ทั้งหมด');

const { products } = useDashboard();
const { filteredProducts, productsBySubTag, currentSubCatTags } = useCategoryFilters({
  products,
  activeSubCategory,
  activeSubTag,
  searchQuery,
  stockStatus,
});

// 🟢 STATIC DATA
const baseCategories = [
  {
    name: 'Apple Products',
    icon: '📱',
    subCats: ['iPhone', 'iPad', 'Mac', 'AirPods', 'Apple watch'],
  },
  {
    name: 'Laptops',
    icon: '💻',
    subCats: ['Gaming', 'Thin & Light', 'Workstation'],
  },
  {
    name: 'PC Components',
    icon: '🔌',
    subCats: ['CPU', 'GPU', 'Mainboard', 'RAM'],
  },
];
const categories = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  ...baseCategories[i % baseCategories.length],
})) as CategoryNode[];
const activeCategoryName = computed(
  () =>
    categories.find((c) => c.id === activeCategory.value)?.name || 'Categories',
);

// 🟢 ACTIONS
const toggleCategory = (cat: CategoryNode, event: MouseEvent) => {
  if (!isSidebarOpen.value) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    isFlipped.value = rect.top + 350 > window.innerHeight;
    flyoutOffset.value = isFlipped.value
      ? window.innerHeight - rect.bottom
      : rect.top;
    tempCategory.value = cat;
    isQuickSelectOpen.value = true;
  } else {
    activeCategory.value = activeCategory.value === cat.id ? 0 : cat.id;
  }
};

const selectMainCategory = (cat: CategoryNode) => {
  tempCategory.value = cat;
};

const selectSubCategory = async (catId: number, subName: string) => {
  globalLoading.value = true;
  activeCategory.value = catId;
  activeSubCategory.value = subName;
  activeSubTag.value = 'ALL';
  isQuickSelectOpen.value = false;
  try {
    await new Promise((r) => setTimeout(r, 400));
  } finally {
    globalLoading.value = false;
  }
};

const handleModalSelect = (catId: number, subName: string) =>
  selectSubCategory(catId, subName);
  
const resetFilters = () => {
  searchQuery.value = ''; 
  stockStatus.value = 'ทั้งหมด';
  activeSubTag.value = 'ALL';
  activeSubCategory.value = 'iPhone';
};

const dropdownStates = ref<Record<string, boolean>>({});
const toggleDropdown = (tag: string) =>
  (dropdownStates.value[tag] = !dropdownStates.value[tag]);

watch(
  productsBySubTag,
  (newG) => {
    Object.keys(newG).forEach((t) => {
      if (dropdownStates.value[t] === undefined) dropdownStates.value[t] = true;
    });
  },
  { immediate: true },
);

const { $viewport } = useNuxtApp();

// Computed Style เพื่อให้การแสดงผลบน Desktop ดูเหมือน Popout จริงๆ
const desktopStyles = computed((): StyleValue => { // กำหนด Return Type
  if (!import.meta.client || !$viewport.isGreaterOrEquals('lg')) return {};

  const baseLeft = isSidebarOpen.value ? '280px' : '92px';

  const styles: Record<string, string | number> = {
    left: baseLeft,
    width: '340px',
    position: 'fixed'
  };

  if (isFlipped.value) {
    styles.bottom = `${window.innerHeight - (flyoutOffset.value + 48)}px`;
    styles.top = 'auto';
  } else {
    styles.top = `${flyoutOffset.value - 12}px`;
    styles.bottom = 'auto';
  }

  return styles as StyleValue;
});
</script>

<template>
  <div
    class="flex flex-col min-h-screen w-full bg-slate-100 p-2 md:p-4 font-sans"
  >
    <nav
      class="flex items-center gap-2 mb-4 px-2 md:px-4 text-xs md:text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-hide"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-1 text-slate-500 hover:text-[#0D95DA] transition-colors"
      >
        <Icon icon="mdi:home-outline" class="w-4 h-4" /> หน้าแรก
      </NuxtLink>
      <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
      <span class="text-slate-500">หมวดหมู่สินค้า</span>
      <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
      <span class="text-[#0D95DA] font-bold">{{
        activeSubCategory || activeCategoryName
      }}</span>
    </nav>

    <div
      class="flex flex-1 flex-col lg:flex-row gap-3 items-start overflow-visible"
    >
      <aside
        :class="[isSidebarOpen ? 'lg:w-64' : 'lg:w-20']"
        class="hidden lg:flex w-full lg:sticky lg:top-4 lg:h-[calc(100vh-60px)] bg-white transition-all duration-300 flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden"
      >
        <div
          class="p-4 flex justify-between items-center border-b h-16 shrink-0"
        >
          <span v-if="isSidebarOpen" class="font-bold truncate text-black"
            >หมวดหมู่สินค้า</span
          >
          <button
            class="hover:bg-slate-100 p-1.5 rounded-lg ml-1"
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <Icon icon="mdi:menu" class="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <div v-for="cat in categories" :key="cat.id" class="flex flex-col">
            <div
              class="p-3 rounded-xl cursor-pointer flex items-center transition-all group m-1"
              :class="[
                activeCategory === cat.id
                  ? 'text-primary font-bold bg-blue-50/50'
                  : 'text-slate-900 hover:bg-slate-50',
                !isSidebarOpen ? 'justify-center p-2' : 'justify-between',
              ]"
              @click="toggleCategory(cat, $event)"
            >
              <div
                class="flex items-center w-full"
                :class="[!isSidebarOpen ? 'justify-center' : 'gap-3']"
              >
                <div
                  class="w-10 h-10 shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                  :class="
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-slate-400 group-hover:bg-white'
                  "
                >
                  <span class="text-xl">{{ cat.icon }}</span>
                </div>
                <span
                  v-if="isSidebarOpen"
                  class="font-medium whitespace-nowrap text-sm"
                  >{{ cat.name }}</span
                >
              </div>
              <Icon
                v-if="isSidebarOpen"
                icon="mdi:chevron-down"
                class="w-4 h-4 opacity-50"
                :class="{ 'rotate-180': activeCategory === cat.id }"
              />
            </div>

            <div
              v-if="activeCategory === cat.id && isSidebarOpen"
              class="overflow-hidden bg-white mb-2"
            >
              <div
                v-for="sub in cat.subCats"
                :key="sub"
                class="py-2.5 pl-12 pr-4 text-xs font-semibold cursor-pointer hover:text-[#0D95DA] hover:bg-slate-50 transition-colors"
                :class="
                  activeSubCategory === sub
                    ? 'text-[#0D95DA] bg-blue-50 rounded-lg'
                    : 'text-slate-400'
                "
                @click="selectSubCategory(cat.id, sub)"
              >
                {{ sub }}
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-3 w-full">
        <button
          class="lg:hidden flex items-center justify-center gap-2 bg-white p-4 rounded-xl shadow-sm border-t-4 border-t-[#0D95DA] font-bold text-slate-700 w-full active:scale-[0.98] transition-transform"
          @click="
            isQuickSelectOpen = true;
            tempCategory = null;
          "
        >
          <Icon icon="mdi:grid" /> เลือกหมวดหมู่สินค้า
        </button>

        <header
          class="bg-white border-b border-slate-200 p-6 shadow-sm shrink-0 rounded-2xl border-t-6 border-t-[#0D95DA] mr-2"
        >
          <div
            class="flex justify-between items-center mb-6 border-b border-slate-200 pb-4"
          >
            <div class="flex items-baseline gap-2">
              <h2 class="text-xl text-slate-800">
                {{ activeSubCategory || activeCategoryName }}
              </h2>
              <span class="text-slate-400 text-xs"
                >({{ filteredProducts.length }} รายการ)</span
              >
            </div>

            <div class="flex items-center gap-3">
              <button
                class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-200"
              >
                <Icon icon="mdi:printer-outline" class="w-5 h-5" />
              </button>
              <div class="h-8 w-px bg-slate-200 mx-1" />
              <button
                class="p-2 transition-all rounded-lg border"
                :class="[
                  viewMode === 'grid'
                    ? 'text-[#0D95DA] bg-blue-50 border-blue-200'
                    : 'text-slate-400 hover:bg-slate-50 border-slate-200',
                ]"
                @click="viewMode = 'grid'"
              >
                <Icon icon="mdi:view-grid-outline" class="w-5 h-5" />
              </button>
              <button
                class="p-2 transition-all rounded-lg border"
                :class="[
                  viewMode === 'list'
                    ? 'text-[#0D95DA] bg-blue-50 border-blue-200'
                    : 'text-slate-400 hover:bg-slate-50 border-slate-200',
                ]"
                @click="viewMode = 'list'"
              >
                <Icon icon="mdi:format-list-bulleted" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="text-slate-800 text-md text-semibold"
                >รุ่น / ซีรีส์:</span
              >
            </div>
            <div class="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
              <button
                :class="[
                  activeSubTag === 'ALL'
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-500 hover:bg-slate-50',
                ]"
                class="px-5 py-2 rounded-full text-md border transition-all"
                @click="activeSubTag = 'ALL'"
              >
                ALL
              </button>
              <button
                v-for="tag in currentSubCatTags"
                :key="tag"
                :class="[
                  activeSubTag === tag
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-500  hover:bg-slate-50',
                ]"
                class="px-5 py-2 rounded-full text-md border transition-all"
                @click="activeSubTag = tag"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <div
            class="mt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div class="relative w-full max-w-md">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="ค้นหาชื่อสินค้า..."
                class="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0D95DA] shadow-sm"
              >
              <Icon
                icon="mdi:magnify"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
              />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-600 font-medium"
                >สถานะสินค้า:</span
              >
              <div class="relative min-w-35">
                <select
                  v-model="stockStatus"
                  class="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none"
                >
                  <option>ทั้งหมด</option>
                  <option>มีของ</option>
                  <option>ของหมด</option>
                </select>
                <Icon
                  icon="mdi:chevron-down"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </header>

        <section class="mt-4 space-y-6 pb-20">
          <div
            v-if="filteredProducts.length === 0"
            class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200"
          >
            <Icon
              icon="mdi:package-variant-closed"
              class="w-16 h-16 text-slate-200 mb-4"
            />
            <p class="text-slate-400 font-medium">ไม่พบสินค้าที่คุณต้องการ</p>
            <button
              class="mt-2 text-[#0D95DA] text-sm font-bold underline"
              @click="resetFilters"
            >
              ล้างการกรอง
            </button>
          </div>
          <template v-else>
            <div
              v-for="(taggedProducts, tagName) in productsBySubTag"
              :key="tagName"
            >
              <ProductDropdown
                :label="tagName"
                :products="taggedProducts"
                :view-mode="viewMode"
                :is-open="dropdownStates[tagName]"
                @toggle="toggleDropdown(tagName)"
              />
            </div>
          </template>
        </section>
      </main>
    </div>

    <Transition name="fade">
    <div
      v-if="isQuickSelectOpen"
      class="fixed inset-0 z-200"
      :class="[
        $viewport.isGreaterOrEquals('lg') 
          ? 'pointer-events-none' 
          : 'flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md'
      ]"
    >
      <div
        class="absolute inset-0 pointer-events-auto"
        @click="isQuickSelectOpen = false"
      />

      <div
        class="bg-white w-full shadow-2xl z-10 flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto border border-slate-200"
        :class="[
          $viewport.isGreaterOrEquals('lg') 
            ? 'fixed rounded-4xl w-85' 
            : 'relative rounded-[2.5rem] min-h-125 max-h-[82vh]'
        ]"
        :style="desktopStyles"
      >
        <div
          v-if="$viewport.isGreaterOrEquals('lg') && !isSidebarOpen"
          class="absolute -left-2 w-4 h-4 bg-white rotate-45 border-l border-b border-slate-200 z-[-1]"
          :class="isFlipped ? 'bottom-8' : 'top-8'"
        />

        <div class="p-5 border-b bg-slate-50/50 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <button
              v-if="tempCategory && !$viewport.isGreaterOrEquals('lg')"
              class="p-2 bg-white rounded-full shadow-sm text-[#0D95DA] active:scale-90 transition-transform"
              @click="tempCategory = null"
            >
              <Icon icon="mdi:arrow-left" class="w-5 h-5" />
            </button>
            
            <div v-else class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl border border-slate-100">
              {{ tempCategory?.icon || "📦" }}
            </div>

            <div>
              <span class="block font-black text-slate-800 leading-tight">
                {{ tempCategory ? tempCategory.name : "เลือกหมวดหมู่หลัก" }}
              </span>
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {{ tempCategory ? "ระบุหมวดหมู่ย่อย" : "Inventory Quick Select" }}
              </span>
            </div>
          </div>

          <button
            class="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            @click="isQuickSelectOpen = false"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <div class="flex-1 p-3 overflow-y-auto space-y-1 scrollbar-hide bg-white">
          
          <div v-if="!tempCategory" class="grid grid-cols-1 gap-1">
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-blue-50/50 transition-all text-left border border-transparent hover:border-blue-100 group"
              @click="selectMainCategory(cat)"
            >
              <span class="text-2xl bg-slate-50 w-11 h-11 flex items-center justify-center rounded-xl group-hover:bg-white transition-colors shadow-sm">
                {{ cat.icon }}
              </span>
              <div class="flex-1">
                <span class="font-bold text-slate-700 block text-sm">{{ cat.name }}</span>
                <span class="text-[10px] text-slate-400 font-medium">
                  {{ cat.subCats.length }} หมวดหมู่ย่อย
                </span>
              </div>
              <Icon
                icon="mdi:chevron-right"
                class="text-slate-300 group-hover:text-[#0D95DA] transition-all transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <div v-else class="space-y-1">
            <button 
              v-if="$viewport.isGreaterOrEquals('lg')"
              class="w-full mb-2 flex items-center gap-2 px-3 py-1 text-[10px] font-black text-[#0D95DA] hover:underline"
              @click="tempCategory = null"
            >
              <Icon icon="mdi:arrow-left" class="w-3 h-3" /> ย้อนกลับไปหมวดหมู่หลัก
            </button>

            <button
              v-for="sub in tempCategory.subCats"
              :key="sub"
              class="w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-all group border border-transparent"
              :class="
                activeSubCategory === sub
                  ? 'bg-blue-50 text-[#0D95DA] font-bold border-blue-100'
                  : 'hover:bg-slate-50 text-slate-600'
              "
              @click="handleModalSelect(tempCategory.id, sub)"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-1.5 h-1.5 rounded-full bg-[#0D95DA] transition-all duration-300"
                  :class="activeSubCategory === sub ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
                />
                <span class="text-sm">{{ sub }}</span>
              </div>
              <Icon
                :icon="activeSubCategory === sub ? 'mdi:check-circle' : 'mdi:chevron-right'"
                class="w-4 h-4"
                :class="activeSubCategory === sub ? 'text-[#0D95DA]' : 'text-slate-300'"
              />
            </button>
          </div>
        </div>

        <div class="p-4 bg-slate-50/50 text-center border-t border-slate-100 shrink-0">
          <p class="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
            Dealer Management System
          </p>
        </div>
      </div>
    </div>
  </Transition>
  </div>
</template>


<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>

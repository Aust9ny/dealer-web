<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { StyleValue } from 'vue';
import { productGroupsData } from '~/composables/category/usecategory_get';
import type { ProductGroup, ProductGroupResponse } from '~/types/Product/product_group';
import type { MenuSub } from '~/types/Product/menu_sub';
import type { MenuDetail } from '~/types/Product/menu_dtl';

// 🟢 1. FETCH DATA & INTERFACE
const { data: ProductData, pending, error } = await useAsyncData<ProductGroupResponse>(
  'product-groups-key',
  () => productGroupsData()
);

interface CategoryNode {
  id: number;
  name: string;
  icon: string;
  subCats: string[];
}

const productGroups = computed<ProductGroup[]>(() => ProductData.value?.data ?? []);

// 🟢 2. STATES & REFS
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

// 🟢 1. ดึงข้อมูล Object ของหมวดหมู่ย่อยที่กำลังเลือกอยู่
const activeGroup = computed<ProductGroup | null>(() => {
  if (!activeCategory.value) return null;
  return productGroups.value.find((group) => group.group_id === activeCategory.value) ?? null;
});

const activeSubCategoryData = computed<MenuSub | null>(() => {
  if (!activeGroup.value || !activeSubCategory.value) return null;
  
  return activeGroup.value.menu_sub.find((sub) => sub.grpname === activeSubCategory.value) ?? null;
});

// 🟢 2. สร้าง Dynamic Tags จาก menu_dtl
const currentSubCatTags = computed(() => {
  if (!activeSubCategoryData.value?.menu_dtl) return [];
  
  return activeSubCategoryData.value.menu_dtl.map((dtl) => dtl.menu_dtl_name);
});

// 🟢 3. MAPPING REAL DATA TO CATEGORIES
const categories = computed(() => {
  return productGroups.value.map((group) => ({
    id: group.group_id,
    name: group.group_name,
    icon: group.group_id === 39 ? '📱' : '📦', // Apple ID 39
    subCats: group.menu_sub.map((sub) => sub.grpname),
  })) as CategoryNode[];
});

const filteredDetails = computed<MenuDetail[]>(() => {
  let details = [...(activeSubCategoryData.value?.menu_dtl ?? [])];

  if (activeSubTag.value !== 'ALL') {
    details = details.filter((detail) => detail.menu_dtl_name === activeSubTag.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    details = details.filter((detail) =>
      detail.menu_dtl_name.toLowerCase().includes(query) ||
      detail.slug_dtl.toLowerCase().includes(query),
    );
  }

  if (stockStatus.value === 'มีของ') {
    details = details.filter((detail) => detail.menu_dtl_alive === 'T' && detail.item_no > 0);
  }

  if (stockStatus.value === 'ของหมด') {
    details = details.filter((detail) => detail.menu_dtl_alive !== 'T' || detail.item_no <= 0);
  }

  return details;
});

const dropdownGroups = computed<Record<string, ProductGroup[]>>(() => {
  const activeGroupValue = activeGroup.value;
  const activeSubValue = activeSubCategoryData.value;

  if (!activeGroupValue || !activeSubValue) return {};

  const groupByTag = new Map<string, MenuDetail[]>();

  filteredDetails.value.forEach((detail) => {
    const tagName = detail.menu_dtl_name || 'no data';
    const existing = groupByTag.get(tagName) ?? [];
    existing.push(detail);
    groupByTag.set(tagName, existing);
  });

  return Array.from(groupByTag.entries()).reduce((acc, [tagName, details]) => {
    acc[tagName] = [
      {
        ...activeGroupValue,
        menu_sub: [
          {
            ...activeSubValue,
            menu_dtl: details,
          },
        ],
      },
    ];
    return acc;
  }, {} as Record<string, ProductGroup[]>);
});

const activeCategoryName = computed(
  () => categories.value.find((c) => c.id === activeCategory.value)?.name || 'Categories',
);

// 🟢 5. ACTIONS
const toggleCategory = (cat: CategoryNode, event: MouseEvent) => {
  if (!isSidebarOpen.value) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    isFlipped.value = rect.top + 350 > window.innerHeight;
    flyoutOffset.value = isFlipped.value ? window.innerHeight - rect.bottom : rect.top;
    tempCategory.value = cat;
    isQuickSelectOpen.value = true;
  } else {
    activeCategory.value = activeCategory.value === cat.id ? 0 : cat.id;
  }
};

const selectMainCategory = (cat: CategoryNode) => { tempCategory.value = cat; };

const selectSubCategory = async (catId: number, subName: string) => {
  globalLoading.value = true;
  activeCategory.value = catId;
  activeSubCategory.value = subName;
  activeSubTag.value = 'ALL';
  isQuickSelectOpen.value = false;
  try { await new Promise((r) => setTimeout(r, 400)); } 
  finally { globalLoading.value = false; }
};

const handleModalSelect = (catId: number, subName: string) => selectSubCategory(catId, subName);
  
const resetFilters = () => {
  searchQuery.value = ''; 
  stockStatus.value = 'ทั้งหมด';
  activeSubTag.value = 'ALL';
};

const dropdownStates = ref<Record<string, boolean>>({});
const toggleDropdown = (tag: string) => (dropdownStates.value[tag] = !dropdownStates.value[tag]);

watch(dropdownGroups, (newG) => {
  Object.keys(newG).forEach((t) => {
    if (dropdownStates.value[t] === undefined) dropdownStates.value[t] = true;
  });
}, { immediate: true });

watch(categories, (newCategories) => {
  if (!newCategories.length) return;

  if (!newCategories.some((category) => category.id === activeCategory.value)) {
    activeCategory.value = newCategories[0].id;
  }

  const selectedCategory = newCategories.find((category) => category.id === activeCategory.value) ?? newCategories[0];
  if (!selectedCategory.subCats.includes(activeSubCategory.value)) {
    activeSubCategory.value = selectedCategory.subCats[0] ?? '';
  }
}, { immediate: true });

// VIEWPORT & STYLES (KEEP ORIGINAL)
const { $viewport } = useNuxtApp();
const desktopStyles = computed((): StyleValue => {
  if (!import.meta.client || !$viewport.isGreaterOrEquals('lg')) return {};
  const baseLeft = isSidebarOpen.value ? '280px' : '92px';
  const styles: Record<string, string | number> = { left: baseLeft, width: '340px', position: 'fixed' };
  if (isFlipped.value) {
    styles.bottom = `${window.innerHeight - (flyoutOffset.value + 48)}px`;
    styles.top = 'auto';
  } else {
    styles.top = `${flyoutOffset.value - 12}px`;
    styles.bottom = 'auto';
  }
  return styles as StyleValue;
});

useHead({ title: () => `${activeSubCategory.value || activeCategoryName.value} | Category` });
</script>

<template>
  <div class="flex flex-col min-h-screen w-full bg-slate-100 p-2 md:p-4 font-sans">
    
    <nav class="flex items-center gap-2 mb-4 px-2 md:px-4 text-xs md:text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-hide">
      <NuxtLink to="/" class="flex items-center gap-1 text-slate-500 hover:text-[#0D95DA] transition-colors">
        <Icon icon="mdi:home-outline" class="w-4 h-4" /> หน้าแรก
      </NuxtLink>
      <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
      <span class="text-slate-500">หมวดหมู่สินค้า</span>
      <Icon v-if="activeSubCategory" icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
      <span v-if="activeSubCategory" class="text-[#0D95DA] font-bold">{{ activeSubCategory }}</span>
    </nav>

    <div class="flex flex-1 flex-col lg:flex-row gap-3 items-start overflow-visible">
      
      <aside :class="[isSidebarOpen ? 'lg:w-64' : 'lg:w-20']" class="hidden lg:flex w-full lg:sticky lg:top-4 lg:h-[calc(100vh-60px)] bg-white transition-all duration-300 flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden">
        <div class="p-4 flex justify-between items-center border-b h-16 shrink-0">
          <span v-if="isSidebarOpen" class="font-bold truncate text-black uppercase tracking-wider">Categories</span>
          <button class="hover:bg-slate-100 p-1.5 rounded-lg ml-1" @click="isSidebarOpen = !isSidebarOpen">
            <Icon icon="mdi:menu" class="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <div v-for="cat in categories" :key="cat.id" class="flex flex-col">
            <div class="p-3 rounded-xl cursor-pointer flex items-center transition-all group m-1" :class="[activeCategory === cat.id ? 'text-primary font-bold bg-blue-50/50' : 'text-slate-900 hover:bg-slate-50', !isSidebarOpen ? 'justify-center p-2' : 'justify-between']" @click="toggleCategory(cat, $event)">
              <div class="flex items-center w-full" :class="[!isSidebarOpen ? 'justify-center' : 'gap-3']">
                <div class="w-10 h-10 shrink-0 flex items-center justify-center rounded-full transition-all duration-300" :class="activeCategory === cat.id ? 'bg-primary text-white shadow-lg' : 'text-slate-400 group-hover:bg-white'">
                  <span class="text-xl">{{ cat.icon }}</span>
                </div>
                <span v-if="isSidebarOpen" class="font-medium whitespace-nowrap text-sm truncate w-32">{{ cat.name }}</span>
              </div>
              <Icon v-if="isSidebarOpen" icon="mdi:chevron-down" class="w-4 h-4 opacity-50" :class="{ 'rotate-180': activeCategory === cat.id }" />
            </div>
            <div v-if="activeCategory === cat.id && isSidebarOpen" class="overflow-hidden bg-white mb-2">
              <div v-for="sub in cat.subCats" :key="sub" class="py-2.5 pl-12 pr-4 text-xs font-semibold cursor-pointer hover:text-[#0D95DA] hover:bg-slate-50 transition-colors" :class="activeSubCategory === sub ? 'text-[#0D95DA] bg-blue-50 rounded-lg' : 'text-slate-400'" @click="selectSubCategory(cat.id, sub)">
                {{ sub }}
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-3 w-full">
        <button class="lg:hidden flex items-center justify-center gap-2 bg-white p-4 rounded-xl shadow-sm border-t-4 border-t-[#0D95DA] font-bold text-slate-700 w-full" @click="isQuickSelectOpen = true; tempCategory = null;">
          <Icon icon="mdi:grid" /> เลือกหมวดหมู่สินค้า
        </button>

        <header class="bg-white border-b border-slate-200 p-6 shadow-sm shrink-0 rounded-2xl border-t-6 border-t-[#0D95DA] mr-2">
          <div class="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
            <div class="flex items-baseline gap-2">
              <h2 class="text-xl text-slate-800">{{ activeSubCategory || activeCategoryName }}</h2>
              <span class="text-slate-400 text-xs">({{ filteredDetails.length }} รายการ)</span>
            </div>
            <div class="flex items-center gap-3">
              <button class="p-2 transition-all rounded-lg border" :class="[viewMode === 'grid' ? 'text-[#0D95DA] bg-blue-50 border-blue-200' : 'text-slate-400 border-slate-200']" @click="viewMode = 'grid'">
                <Icon icon="mdi:view-grid-outline" class="w-5 h-5" />
              </button>
              <button class="p-2 transition-all rounded-lg border" :class="[viewMode === 'list' ? 'text-[#0D95DA] bg-blue-50 border-blue-200' : 'text-slate-400 border-slate-200']" @click="viewMode = 'list'">
                <Icon icon="mdi:format-list-bulleted" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
              <button :class="[activeSubTag === 'ALL' ? 'bg-primary text-white' : 'bg-white text-slate-500']" class="px-5 py-2 rounded-full text-md border transition-all" @click="activeSubTag = 'ALL'">ALL</button>
              <button v-for="tag in currentSubCatTags" :key="tag" :class="[activeSubTag === tag ? 'bg-primary text-white' : 'bg-white text-slate-500']" class="px-5 py-2 rounded-full text-md border transition-all" @click="activeSubTag = tag">{{ tag }}</button>
            </div>
          </div>

          <div class="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative w-full max-w-md">
              <input v-model="searchQuery" type="text" placeholder="ค้นหาชื่อสินค้า..." class="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-sm">
              <Icon icon="mdi:magnify" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-600 font-medium">สถานะ:</span>
              <select v-model="stockStatus" class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none">
                <option value="ทั้งหมด">ทั้งหมด</option>
                <option value="มีของ">มีของ</option>
                <option value="ของหมด">ของหมด</option>
              </select>
            </div>
          </div>
        </header>

        <section class="mt-4 space-y-6 pb-20">
          <div v-if="pending" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p class="text-slate-400 font-medium">กำลังโหลดข้อมูลสินค้า...</p>
          </div>
          <div v-else-if="error" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p class="text-slate-400 font-medium">โหลดข้อมูลสินค้าไม่สำเร็จ</p>
          </div>
          <div v-else-if="filteredDetails.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <Icon icon="mdi:package-variant-closed" class="w-16 h-16 text-slate-200 mb-4" />
            <p class="text-slate-400 font-medium">ไม่พบสินค้าที่คุณต้องการ</p>
          </div>
          <template v-else>
            <div v-for="(taggedGroups, tagName) in dropdownGroups" :key="tagName">
              <ProductDropdown :label="tagName" :products="taggedGroups" :view-mode="viewMode" :is-open="dropdownStates[tagName]" @toggle="toggleDropdown(tagName)" />
            </div>
          </template>
        </section>
      </main>
    </div>

    <Transition name="fade">
      <div v-if="isQuickSelectOpen" class="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="absolute inset-0" @click="isQuickSelectOpen = false" />
        <div class="bg-white w-full shadow-2xl z-10 flex flex-col overflow-hidden rounded-[2rem] max-h-[82vh] border border-slate-200 relative" :style="desktopStyles">
          <div class="p-5 border-b bg-slate-50/50 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button v-if="tempCategory" class="p-2 bg-white rounded-full text-[#0D95DA]" @click="tempCategory = null">
                <Icon icon="mdi:arrow-left" class="w-5 h-5" />
              </button>
              <span class="font-black text-slate-800 leading-tight">{{ tempCategory ? tempCategory.name : 'เลือกหมวดหมู่' }}</span>
            </div>
            <button class="p-2 hover:bg-slate-100 rounded-full text-slate-400" @click="isQuickSelectOpen = false">
              <Icon icon="mdi:close" class="w-5 h-5" />
            </button>
          </div>
          <div class="flex-1 p-3 overflow-y-auto space-y-1 bg-white">
            <div v-if="!tempCategory" class="grid grid-cols-1 gap-1">
              <button v-for="cat in categories" :key="cat.id" class="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-blue-50 transition-all text-left group" @click="selectMainCategory(cat)">
                <span class="text-2xl bg-slate-50 w-11 h-11 flex items-center justify-center rounded-xl group-hover:bg-white">{{ cat.icon }}</span>
                <span class="font-bold text-slate-700 text-sm flex-1">{{ cat.name }}</span>
                <Icon icon="mdi:chevron-right" class="text-slate-300" />
              </button>
            </div>
            <div v-else class="space-y-1">
              <button v-for="sub in tempCategory.subCats" :key="sub" class="w-full p-3.5 rounded-2xl text-left flex items-center justify-between" :class="activeSubCategory === sub ? 'bg-blue-50 text-[#0D95DA] font-bold' : 'text-slate-600'" @click="handleModalSelect(tempCategory.id, sub)">
                <span class="text-sm">{{ sub }}</span>
                <Icon :icon="activeSubCategory === sub ? 'mdi:check-circle' : 'mdi:chevron-right'" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>

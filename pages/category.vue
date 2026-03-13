<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { StyleValue } from 'vue';
import { productGroupsData } from '~/composables/category/usecategory_get';
import { extractProductItems, productListData, type ProductListItem, type ProductListResponse } from '~/composables/category/useProduct_get';
import type { ProductGroup, ProductGroupResponse } from '~/types/Product/product_group';
import type { MenuSub } from '~/types/Product/menu_sub';
import type { MenuDetail } from '~/types/Product/menu_dtl';

// 🟢 1. FETCH DATA & INTERFACES
const emptyCategoryResponse = (): ProductGroupResponse => ({
  status: '',
  statusCode: '',
  data: [],
  message: '',
  message_m: '',
});

const emptyProductListResponse = (): ProductListResponse => ({
  data: [],
});

const { data: ProductData, pending, error } = useLazyAsyncData<ProductGroupResponse>(
  'product-groups-key',
  productGroupsData,
  {
    default: emptyCategoryResponse,
  },
);

interface CategoryNode {
  id: number;
  name: string;
  icon: string;
  subCats: Array<{
    id: number;
    name: string;
    lookupName: string;
    slug: string;
  }>;
}

const productGroups = computed<ProductGroup[]>(() => ProductData.value?.data ?? []);

// 🟢 2. STATES & REFS
const isSidebarOpen = ref(true);
const activeCategory = ref<number | null>(null);
const activeSubCategoryId = ref<number | null>(null);
const activeSubTagId = ref<number | 'ALL'>('ALL');
const globalLoading = useState('global-loading', () => false);
const viewMode = ref<'grid' | 'list'>('list');

const isQuickSelectOpen = ref(false);
const tempCategory = ref<CategoryNode | null>(null);
const flyoutOffset = ref(0);
const isFlipped = ref(false);

const searchQuery = ref('');
const stockStatus = ref<'ทั้งหมด' | 'มีของ' | 'ของหมด'>('ทั้งหมด');

// 🟢 3. COMPUTED SELECTIONS
const activeGroup = computed<ProductGroup | null>(() => {
  if (!activeCategory.value) return null;
  return productGroups.value.find((group) => group.group_id === activeCategory.value) ?? null;
});

const activeSubCategoryData = computed<MenuSub | null>(() => {
  if (!activeGroup.value || !activeSubCategoryId.value) return null;
  return activeGroup.value.menu_sub.find((sub) => sub.id === activeSubCategoryId.value) ?? null;
});

const selectedMenuDetail = computed<MenuDetail | null>(() => {
  if (!activeSubCategoryData.value || activeSubTagId.value === 'ALL') return null;
  return activeSubCategoryData.value.menu_dtl.find((detail) => detail.menu_dtl_id === activeSubTagId.value) ?? null;
});

const activeSubCategory = computed(() => activeSubCategoryData.value?.grpname || activeSubCategoryData.value?.grp || '');
const activeSubTag = computed(() => selectedMenuDetail.value?.menu_dtl_name || 'ALL');

const currentSubCatTags = computed(() => {
  if (!activeSubCategoryData.value?.menu_dtl) return [];
  return activeSubCategoryData.value.menu_dtl.map((dtl) => ({
    id: dtl.menu_dtl_id,
    name: dtl.menu_dtl_name,
  }));
});

const categories = computed(() => {
  return productGroups.value.map((group) => ({
    id: group.group_id,
    name: group.group_name,
    icon: group.group_id === 39 ? '📱' : '📦',
    subCats: group.menu_sub.map((sub) => ({
      id: sub.id,
      name: sub.grpname,
      lookupName: sub.grp,
      slug: sub.slugs,
    })),
  })) as CategoryNode[];
});

// 🟢 4. PRODUCT LIST DATA FETCHING
const productListRequest = computed(() => ({
  gr: activeSubCategoryData.value?.menu_id ?? '',
  gmall: selectedMenuDetail.value?.menu_dtl_id ?? '',
  mnew_grp: activeSubCategoryData.value?.grp ?? '',
  hi_end: '',
  old_data: '',
}));

const {
  data: productListResponse,
  pending: productListPending,
  error: productListError,
} = useLazyAsyncData<ProductListResponse>(
  'category-product-list',
  async () => {
    if (!productListRequest.value.gr || !productListRequest.value.mnew_grp) {
      return emptyProductListResponse();
    }
    return await productListData(productListRequest.value);
  },
  {
    default: emptyProductListResponse,
    watch: [productListRequest],
  },
);

const productItems = computed<ProductListItem[]>(() => extractProductItems(productListResponse.value));

const getItemStock = (item: ProductListItem) => {
  const value = item.stock ?? item.qty ?? item.item_no;
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value.replace(/,/g, '')); // ลบลูกน้ำออกก่อนแปลง
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

// 🟢 5. FIXED FILTER LOGIC (เปลี่ยน details เป็น items)
const filteredProductItems = computed<ProductListItem[]>(() => {
  let items = [...productItems.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter((item) => 
      (item.name?.toLowerCase().includes(query)) || 
      (item.code?.toLowerCase().includes(query))
    );
  }

  if (stockStatus.value === 'มีของ') {
    items = items.filter((item) => getItemStock(item) > 0);
  }

  if (stockStatus.value === 'ของหมด') {
    items = items.filter((item) => getItemStock(item) <= 0);
  }

  return items;
});

// 🟢 6. FIXED DROPDOWN GROUPS (ประกันว่ามี Label เสมอ)
const dropdownGroups = computed<Record<string, ProductListItem[]>>(() => {
  if (filteredProductItems.value.length === 0) return {};
  const label = (activeSubTagId.value === 'ALL' ? activeSubCategory.value : activeSubTag.value) || 'รายการสินค้า';
  return { [label]: filteredProductItems.value };
});

const activeCategoryName = computed(
  () => categories.value.find((c) => c.id === activeCategory.value)?.name || 'Categories',
);

// 🟢 7. ACTIONS
const toggleCategory = (cat: CategoryNode, event: MouseEvent) => {
  if (!isSidebarOpen.value) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    isFlipped.value = rect.top + 350 > window.innerHeight;
    flyoutOffset.value = isFlipped.value ? window.innerHeight - rect.bottom : rect.top;
    tempCategory.value = cat;
    isQuickSelectOpen.value = true;
  } else {
    activeCategory.value = activeCategory.value === cat.id ? null : cat.id;
  }
};

const selectMainCategory = (cat: CategoryNode) => { tempCategory.value = cat; };

const selectSubCategory = async (catId: number, subId: number) => {
  globalLoading.value = true;
  activeCategory.value = catId;
  activeSubCategoryId.value = subId;
  activeSubTagId.value = 'ALL';
  isQuickSelectOpen.value = false;
  try { await new Promise((r) => setTimeout(r, 400)); } 
  finally { globalLoading.value = false; }
};

const handleModalSelect = (catId: number, subId: number) => selectSubCategory(catId, subId);
  
const resetFilters = () => {
  searchQuery.value = ''; 
  stockStatus.value = 'ทั้งหมด';
  activeSubTagId.value = 'ALL';
};

const hasLoadedGroups = computed(() => productGroups.value.length > 0);
const hasLoadedProductItems = computed(() => productItems.value.length > 0);
const showProductDebug = true; // เปิดไว้เพื่อตรวจสอบค่า

const dropdownStates = ref<Record<string, boolean>>({});
const toggleDropdown = (tag: string) => (dropdownStates.value[tag] = !dropdownStates.value[tag]);

watch(dropdownGroups, (newG) => {
  Object.keys(newG).forEach((t) => {
    if (dropdownStates.value[t] === undefined) dropdownStates.value[t] = true;
  });
}, { immediate: true });

watch(categories, (newCategories) => {
  if (!newCategories.length) return;
  if (!activeCategory.value || !newCategories.some((c) => c.id === activeCategory.value)) {
    activeCategory.value = newCategories[0].id;
  }
  const selectedCategory = newCategories.find((c) => c.id === activeCategory.value) ?? newCategories[0];
  if (!activeSubCategoryId.value || !selectedCategory.subCats.some((s) => s.id === activeSubCategoryId.value)) {
    activeSubCategoryId.value = selectedCategory.subCats[0]?.id ?? null;
  }
}, { immediate: true });

const { $viewport } = useNuxtApp();
const desktopStyles = computed((): StyleValue => {
  if (!import.meta.client || !$viewport.isGreaterOrEquals('lg')) return {};
  const baseLeft = isSidebarOpen.value ? '280px' : '92px';
  const styles: Record<string, string | number> = { left: baseLeft, width: '340px', position: 'fixed' };
  styles[isFlipped.value ? 'bottom' : 'top'] = isFlipped.value ? `${window.innerHeight - (flyoutOffset.value + 48)}px` : `${flyoutOffset.value - 12}px`;
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
              <div v-for="sub in cat.subCats" :key="sub.id" class="py-2.5 pl-12 pr-4 text-xs font-semibold cursor-pointer hover:text-[#0D95DA] hover:bg-slate-50 transition-colors" :class="activeSubCategoryId === sub.id ? 'text-[#0D95DA] bg-blue-50 rounded-lg' : 'text-slate-400'" @click="selectSubCategory(cat.id, sub.id)">
                {{ sub.name }}
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-3 w-full">
        <header class="bg-white border-b border-slate-200 p-6 shadow-sm shrink-0 rounded-2xl border-t-6 border-t-[#0D95DA] mr-2">
          <div class="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
            <div class="flex items-baseline gap-2">
              <h2 class="text-xl text-slate-800 font-bold uppercase">{{ activeSubCategory || activeCategoryName }}</h2>
              <span class="text-slate-400 text-xs">({{ filteredProductItems.length }} รายการ)</span>
            </div>
            <div class="flex items-center gap-3">
              <button class="p-2 transition-all rounded-lg border" :class="[viewMode === 'grid' ? 'text-[#0D95DA] bg-blue-50 border-blue-200' : 'text-slate-400 border-slate-200']" @click="viewMode = 'grid'"><Icon icon="mdi:view-grid-outline" class="w-5 h-5" /></button>
              <button class="p-2 transition-all rounded-lg border" :class="[viewMode === 'list' ? 'text-[#0D95DA] bg-blue-50 border-blue-200' : 'text-slate-400 border-slate-200']" @click="viewMode = 'list'"><Icon icon="mdi:format-list-bulleted" class="w-5 h-5" /></button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
              <button :class="[activeSubTagId === 'ALL' ? 'bg-primary text-white' : 'bg-white text-slate-500']" class="px-5 py-2 rounded-full text-md border transition-all" @click="activeSubTagId = 'ALL'">ALL</button>
              <button v-for="tag in currentSubCatTags" :key="tag.id" :class="[activeSubTagId === tag.id ? 'bg-primary text-white' : 'bg-white text-slate-500']" class="px-5 py-2 rounded-full text-md border transition-all" @click="activeSubTagId = tag.id">{{ tag.name }}</button>
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

        <div v-if="showProductDebug" class="bg-slate-900 text-slate-100 rounded-2xl p-4 space-y-2 overflow-x-auto text-[10px]">
           <p class="font-bold text-blue-400 uppercase tracking-widest border-b border-slate-700 pb-1 mb-2">Debug Info</p>
           <p>Item Count: {{ productItems.length }} | Filtered: {{ filteredProductItems.length }}</p>
           <p>Request: {{ productListRequest }}</p>
           <p>Label Used: {{ Object.keys(dropdownGroups)[0] }}</p>
           <p>data : {{ productListResponse?.data }}</p>
        </div>

        <section class="mt-4 space-y-6 pb-20">
          <div v-if="pending && !hasLoadedGroups" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p class="text-slate-400 font-medium tracking-widest animate-pulse">LOADING API...</p>
          </div>
          
          <div v-else-if="filteredProductItems.length === 0 && !productListPending" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <Icon icon="mdi:package-variant-closed" class="w-16 h-16 text-slate-200 mb-4" />
            <p class="text-slate-400 font-medium">ไม่พบสินค้าในหมวดหมู่นี้</p>
          </div>

          <template v-else>
            <div v-for="(taggedProducts, tagName) in dropdownGroups" :key="tagName">
              <ProductDropdown
                :label="tagName"
                :products="taggedProducts"
                :view-mode="viewMode"
                :is-open="dropdownStates[tagName]"
                :active-category-name="activeCategoryName"
                :active-sub-category-name="activeSubCategory"
                @toggle="toggleDropdown(tagName)"
                :table-headers="productListResponse?.data?.table_headers"
              />
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
              <button v-if="tempCategory" class="p-2 bg-white rounded-full text-[#0D95DA]" @click="tempCategory = null"><Icon icon="mdi:arrow-left" /></button>
              <span class="font-black text-slate-800">{{ tempCategory ? tempCategory.name : 'เลือกหมวดหมู่' }}</span>
            </div>
            <button @click="isQuickSelectOpen = false"><Icon icon="mdi:close" /></button>
          </div>
          <div class="flex-1 p-3 overflow-y-auto space-y-1 bg-white">
            <div v-if="!tempCategory" class="grid grid-cols-1 gap-1">
               <button v-for="cat in categories" :key="cat.id" class="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-blue-50 text-left" @click="selectMainCategory(cat)">
                <span class="text-2xl">{{ cat.icon }}</span>
                <span class="font-bold text-slate-700 text-sm flex-1">{{ cat.name }}</span>
                <Icon icon="mdi:chevron-right" class="text-slate-300" />
               </button>
            </div>
            <div v-else class="space-y-1">
              <button v-for="sub in tempCategory.subCats" :key="sub.id" class="w-full p-3.5 rounded-2xl text-left flex items-center justify-between" :class="activeSubCategoryId === sub.id ? 'bg-blue-50 text-[#0D95DA] font-bold' : 'text-slate-600'" @click="handleModalSelect(tempCategory.id, sub.id)">
                <span class="text-sm">{{ sub.name }}</span>
                <Icon :icon="activeSubCategoryId === sub.id ? 'mdi:check-circle' : 'mdi:chevron-right'" />
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
<template>
  <div class="flex flex-col min-h-screen w-full bg-slate-100 p-2 md:p-4">
    <nav class="flex items-center gap-2 mb-4 px-4 text-sm font-medium">
      <NuxtLink to="/" class="flex items-center gap-1 text-slate-500 hover:text-[#0D95DA] transition-colors">
        <Icon icon="mdi:home-outline" class="w-4 h-4" />
        หน้าแรก
      </NuxtLink>
      <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
      <span class="text-slate-500">หมวดหมู่สินค้า</span>
      <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
      <span :class="[activeSubCategory ? 'text-slate-500' : 'text-[#0D95DA] ']">
        {{ activeCategoryName }}
      </span>
      <template v-if="activeSubCategory">
        <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
        <span class="text-[#0D95DA] ">{{ activeSubCategory }}</span>
      </template>
    </nav>

    <div class="flex flex-1 gap-3 items-start overflow-visible">
      <aside 
        :class="[isSidebarOpen ? 'w-64' : 'w-20']"
        class="sticky top-4 h-[calc(100vh-60px)] bg-white text-black transition-all duration-300 flex flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden"
      >
        <div class="p-4 flex justify-between items-center border-b h-16 shrink-0">
          <span v-if="isSidebarOpen" class="font-bold truncate text-[#0D95DA]">Advice Catalog</span>
          <button class="hover:bg-slate-100 p-1.5 rounded-lg transition-colors ml-1" @click="isSidebarOpen = !isSidebarOpen">
            <Icon icon="mdi:menu" class="w-6 h-6 text-slate-600" />
          </button>
        </div>
        
        <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <div v-for="cat in categories" :key="cat.id" class="flex flex-col">
            <div 
              class="p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all group m-1"
              :class="[activeCategory === cat.id ? 'bg-primary text-[#0D95DA]' : 'hover:bg-slate-50 text-slate-600']"
              @click="toggleCategory(cat, $event)" 
            >
              <div class="flex items-center gap-3">
                <span class="text-xl">{{ cat.icon }}</span>
                <span v-if="isSidebarOpen" class="font-medium whitespace-nowrap">{{ cat.name }}</span>
              </div>
              <Icon v-if="isSidebarOpen" icon="mdi:chevron-down" class="w-4 h-4 transition-transform duration-200 opacity-50" :class="{ 'rotate-180': activeCategory === cat.id }" />
            </div>
            
            <transition 
              enter-active-class="transition-all duration-300 ease-out" 
              enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-64 opacity-100" 
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-64 opacity-100" leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="activeCategory === cat.id && isSidebarOpen" class="overflow-hidden bg-white rounded-b-xl mb-2">
                <div 
                  v-for="sub in cat.subCats" :key="sub"
                  class="py-2.5 pl-12 pr-4 text-sm transition-colors relative cursor-pointer text-slate-400 hover:text-black hover:bg-slate-50"
                  :class="{ 'text-[#0D95DA]  bg-blue-50/50': activeSubCategory === sub }"
                  @click="selectSubCategory(cat.id, sub)"
                >
                  {{ sub }}
                </div>
              </div>
            </transition>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-1 pb-10">
        <header class="bg-white border-b border-slate-200 p-6 shadow-sm shrink-0 rounded-2xl border-t-6 border-t-[#0D95DA] mr-2">
          <div class="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
            <div class="flex items-baseline gap-2">
              <h2 class="text-xl text-slate-800">{{ activeSubCategory || activeCategoryName }}</h2>
              <span class="text-slate-400 text-xs">({{ filteredProducts.length }} รายการ)</span>
            </div>

            <div class="flex items-center gap-3">
              <button class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-200">
                <Icon icon="mdi:printer-outline" class="w-5 h-5" />
              </button>
              <div class="h-8 w-px bg-slate-200 mx-1" />
              <button 
                class="p-2 transition-all rounded-lg border"
                :class="[viewMode === 'grid' ? 'text-[#0D95DA] bg-blue-50 border-blue-200' : 'text-slate-400 hover:bg-slate-50 border-slate-200']"
                @click="viewMode = 'grid'"
              >
                <Icon icon="mdi:view-grid-outline" class="w-5 h-5" />
              </button>
              <button 
                class="p-2 transition-all rounded-lg border"
                :class="[viewMode === 'list' ? 'text-[#0D95DA] bg-blue-50 border-blue-200' : 'text-slate-400 hover:bg-slate-50 border-slate-200']"
                @click="viewMode = 'list'"
              >
                <Icon icon="mdi:format-list-bulleted" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-2"><span class=" text-slate-800 text-sm">รุ่น / ซีรีส์:</span></div>
            <div class="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
              <button
                :class="[activeSubTag === 'ALL' ? 'bg-primary text-white' : 'bg-white text-slate-500 hover:bg-slate-50']"
                class="px-5 py-2 rounded-full text-md border transition-all " 
                @click="activeSubTag = 'ALL'"
              >
                ALL
              </button>
              <button 
                v-for="tag in currentSubCatTags" :key="tag"
                :class="[activeSubTag === tag ? 'bg-primary text-white' : 'bg-white text-slate-500  hover:bg-slate-50']"
                class="px-5 py-2 rounded-full text-md  border transition-all " 
                @click="activeSubTag = tag"
              > 
                {{ tag }}
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative w-full max-w-md">
              <input 
                v-model="searchQuery" type="text" placeholder="ค้นหาชื่อสินค้า..."
                class="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0D95DA] shadow-sm"
              >
              <Icon icon="mdi:magnify" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-600 font-medium">สถานะสินค้า:</span>
              <div class="relative min-w-35">
                <select v-model="stockStatus" class="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none">
                  <option>ทั้งหมด</option>
                  <option>มีของ</option>
                  <option>ของหมด</option>
                </select>
                <Icon icon="mdi:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </header>

        <section class="mr-2 mt-2">
          <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <Icon icon="mdi:package-variant-closed" class="w-16 h-16 text-slate-200 mb-4" />
            <p class="text-slate-400 font-medium">ไม่พบสินค้าที่คุณต้องการ</p>
            <button class="mt-2 text-[#0D95DA] text-sm font-bold" @click="resetFilters">ล้างการกรอง</button>
          </div>

          <template v-else>
            <div class="space-y-4">
              <div v-for="(taggedProducts, tagName) in productsBySubTag" :key="tagName">
                <ProductDropdown 
                  :label="tagName" :products="taggedProducts" :view-mode="viewMode"
                  :is-open="dropdownStates[tagName]" @toggle="toggleDropdown(tagName)" 
                />
              </div>
            </div>
          </template>
        </section>
      </main>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-x-2" enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0" leave-to-class="opacity-0 -translate-x-2"
    >
      <div v-if="isQuickSelectOpen" class="fixed inset-0 z-100 bg-transparent" @click.self="isQuickSelectOpen = false">
        <div 
          class="absolute left-22 bg-white w-72 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-200 flex flex-col"
          :style="isFlipped ? { bottom: `${flyoutOffset}px` } : { top: `${flyoutOffset}px` }"
        >
          <div class="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/80 rounded-t-3xl">
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ tempCategory?.icon }}</span>
              <div>
                <h3 class="text-slate-800 text-xs">{{ tempCategory?.name }}</h3>
                <p class="text-[9px] text-[#0D95DA] font-black uppercase">Quick Select</p>
              </div>
            </div>
            <button class="p-1 hover:bg-white rounded-lg text-slate-400" @click="isQuickSelectOpen = false">
              <Icon icon="mdi:close" class="w-4 h-4" />
            </button>
          </div>

          <div class="p-2 max-h-[45vh] overflow-y-auto space-y-1 scrollbar-thin">
            <button
              v-for="sub in tempCategory?.subCats" :key="sub"
              class="w-full p-3 rounded-xl text-left flex items-center justify-between group transition-all hover:bg-slate-50"
              :class="{ 'bg-blue-50 text-primary': activeSubCategory === sub }"
              @click="handleModalSelect(tempCategory.id, sub)"
            >
              <span class="text-xs ">{{ sub }}</span>
              <Icon icon="mdi:chevron-right" class="w-4 h-4 text-[#0D95DA] opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          </div>
          
          <div class="absolute -left-1.5 w-3 h-3 bg-white rotate-45 border-l border-b border-slate-200" :class="isFlipped ? 'bottom-6' : 'top-6'" />
        </div>
      </div>
    </Transition>
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-[999]">
        <div class="max-w-screen-2xl mx-auto px-8 py-5 flex items-center justify-center gap-10">
          <div class="text-center">
            <p class="text-slate-800 text-lg font-semibold">หากต้องการสั่งสินค้าให้กดปุ่ม <span class="text-[#0D95DA] font-bold">เปิดบิล</span> ตรงตารางสินค้า</p>
            <p class="text-sm text-slate-400 mt-1">จะถูกนำไปยังการสร้างใบสั่งซื้อใหม่ ที่เป็นเหมือนตะกร้าใส่สินค้า</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

// 🟢 STATES
const isSidebarOpen = ref(true);
const activeCategory = ref(1);
const activeSubCategory = ref('iPhone');
const activeSubTag = ref('ALL');
const globalLoading = useState('global-loading', () => false);
const viewMode = ref('list');

// Flyout States
const isQuickSelectOpen = ref(false);
const tempCategory = ref(null);
const flyoutOffset = ref(0);
const isFlipped = ref(false);

const searchQuery = ref('');
const stockStatus = ref('ทั้งหมด');

// Mock Data / Composables
const { products } = useDashboard();

// 🟢 COMPUTED FILTERS
const filteredProducts = computed(() => {
  let result = [...products.value];
  if (activeSubCategory.value) {
    result = result.filter(p => p.category?.toLowerCase() === activeSubCategory.value.toLowerCase());
  }
  if (activeSubTag.value !== 'ALL') {
    result = result.filter(p => p.tag === activeSubTag.value);
  }
  if (searchQuery.value) {
    result = result.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  if (stockStatus.value !== 'ทั้งหมด') {
    const isStocked = stockStatus.value === 'มีของ';
    result = result.filter(p => (p.stock > 0) === isStocked);
  }
  return result;
});

const baseCategories = [
  { name: 'Apple Products', icon: '📱', subCats: ['iPhone', 'iPad', 'Mac', 'AirPods', 'Apple watch'] },
  { name: 'Laptops', icon: '💻', subCats: ['Gaming', 'Thin & Light', 'Workstation'] },
  { name: 'PC Components', icon: '🔌', subCats: ['CPU', 'GPU', 'Mainboard', 'RAM'] }
];
const categories = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, ...baseCategories[i % baseCategories.length] }));

const activeCategoryName = computed(() => categories.find(c => c.id === activeCategory.value)?.name || 'Categories');

const currentSubCatTags = computed(() => {
  if (!activeSubCategory.value) return [];
  const tags = new Set();
  products.value
    .filter(p => p.category?.toLowerCase() === activeSubCategory.value?.toLowerCase())
    .forEach(p => p.tag && tags.add(p.tag));
  return Array.from(tags).sort();
});

// 🟢 ACTIONS
const toggleCategory = (cat, event) => {
  if (!isSidebarOpen.value) {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const menuHeight = 350;
    
    if (rect.top + menuHeight > viewportHeight) {
      isFlipped.value = true;
      flyoutOffset.value = viewportHeight - rect.bottom; 
    } else {
      isFlipped.value = false;
      flyoutOffset.value = rect.top;
    }
    
    tempCategory.value = cat;
    isQuickSelectOpen.value = true;
  } else {
    activeCategory.value = activeCategory.value === cat.id ? null : cat.id;
  }
};

const selectSubCategory = async (catId, subName) => {
  globalLoading.value = true;
  activeCategory.value = catId; // 🟢 FIX: Sync main category highlight
  activeSubCategory.value = subName;
  activeSubTag.value = 'ALL';
  isQuickSelectOpen.value = false;
  
  try { await new Promise(r => setTimeout(r, 400)); } 
  finally { globalLoading.value = false; }
};

const handleModalSelect = (catId, subName) => {
  selectSubCategory(catId, subName);
};

const resetFilters = () => {
  searchQuery.value = ''; 
  stockStatus.value = 'ทั้งหมด';
  activeSubTag.value = 'ALL';
};

// 🟢 DROPDOWN LOGIC
const productsBySubTag = computed(() => {
  const groups = {};
  if (activeSubTag.value !== 'ALL') {
    groups[activeSubTag.value] = filteredProducts.value;
    return groups;
  }
  
  currentSubCatTags.value.forEach(tag => {
    const matched = filteredProducts.value.filter(p => p.tag === tag);
    if (matched.length > 0) groups[tag] = matched;
  });
  
  const others = filteredProducts.value.filter(p => !p.tag);
  if (others.length > 0) groups['อื่นๆ'] = others;
  return groups;
});

const dropdownStates = ref({});
const toggleDropdown = (tagName) => dropdownStates.value[tagName] = !dropdownStates.value[tagName];

watch(productsBySubTag, (newGroups) => {
  Object.keys(newGroups).forEach(tag => { 
    if (dropdownStates.value[tag] === undefined) dropdownStates.value[tag] = true; 
  });
}, { immediate: true });
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
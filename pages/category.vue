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
      
      <span :class="[activeSubCategory ? 'text-slate-500' : 'text-[#0D95DA] font-bold']">
        {{ activeCategoryName }}
      </span>

      <template v-if="activeSubCategory">
        <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300" />
        <span class="text-[#0D95DA] font-bold">{{ activeSubCategory }}</span>
      </template>
    </nav>

    <div class="flex flex-1 gap-3 items-start">
      
      <aside 
        :class="[isSidebarOpen ? 'w-64' : 'w-20']"
        class="sticky top-4 h-[calc(100vh-60px)] bg-white text-black transition-all duration-300 flex flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden"
      >
        <div class="p-4 flex justify-between items-center border-b h-16 shrink-0">
          <span v-if="isSidebarOpen" class="font-bold truncate text-[#0D95DA]">Advice Catalog</span>
          <button class="hover:bg-slate-100 p-1.5 rounded-lg transition-colors" @click="isSidebarOpen = !isSidebarOpen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <div v-for="cat in categories" :key="cat.id" class="flex flex-col">
            <div 
              class="p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all group"
              :class="[activeCategory === cat.id ? 'bg-blue-50 text-[#0D95DA]' : 'hover:bg-slate-50 text-slate-600']"
              @click="toggleCategory(cat.id)"
            >
              <div class="flex items-center gap-3">
                <span class="text-xl">{{ cat.icon }}</span>
                <span v-if="isSidebarOpen" class="font-medium whitespace-nowrap">{{ cat.name }}</span>
              </div>
              <svg 
                v-if="isSidebarOpen"
                :class="{'rotate-180': activeCategory === cat.id}"
                class="w-4 h-4 transition-transform duration-200 opacity-50" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-64 opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-64 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="activeCategory === cat.id && isSidebarOpen" class="overflow-hidden bg-white rounded-b-xl mb-2">
                <div 
                  v-for="sub in cat.subCats" :key="sub"
                  class="py-2.5 pl-12 pr-4 text-sm transition-colors relative cursor-pointer"
                  :class="[activeSubCategory === sub ? 'text-[#0D95DA] font-bold bg-blue-50/50' : 'text-slate-400 hover:text-black hover:bg-slate-50']"
                  @click="selectSubCategory(sub)"
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
              <h2 class="text-xl font-bold text-slate-800">
                {{ activeCategoryName }} <span v-if="activeSubCategory" class="text-[#0D95DA]">/ {{ activeSubCategory }}</span>
              </h2>
              <span class="text-slate-400 text-xs">({{ products.length }} รายการ)</span>
            </div>
            
            <div class="flex items-center gap-3">
              <button class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-200"><Icon icon="mdi:printer-outline" class="w-5 h-5" /></button>
              <div class="h-8 w-px bg-slate-200 mx-1"/>
              <button class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-200"><Icon icon="mdi:view-grid-outline" class="w-5 h-5" /></button>
              <button class="p-2 text-[#0D95DA] bg-blue-50 rounded-lg border border-blue-100"><Icon icon="mdi:format-list-bulleted" class="w-5 h-5" /></button>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-800">รุ่น / ซีรีส์:</span>
            </div>
            <div class="flex flex-wrap gap-3 pb-6 border-b border-slate-300">
              <button
                :class="[activeSubTag === 'ALL' ? 'bg-[#2D5A9E] text-white' : 'bg-white text-slate-500 border-slate-200']" class="px-5 py-2 rounded-full text-sm font-medium border transition-all"
                @click="activeSubTag = 'ALL'" 
              > 
                ALL 
              </button>
              <button
                v-for="tag in currentSubCatTags" :key="tag" 
                :class="[activeSubTag === tag ? 'bg-[#2D5A9E] text-white' : 'bg-white text-slate-500 border-slate-200']" class="px-5 py-2 rounded-full text-sm border transition-all"
                @click="activeSubTag = tag" 
              > 
                {{ tag }} 
              </button>
            </div>
          </div>

          <div class="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative w-full max-w-md">
              <input type="text" placeholder="ค้นหาชื่อสินค้า..." class="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0D95DA] shadow-sm">
              <Icon icon="mdi:magnify" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-600 font-medium">สถานะสินค้า:</span>
              <div class="relative min-w-35">
                <select class="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#0D95DA]">
                  <option>ทั้งหมด</option>
                  <option>มีของ</option>
                  <option>ของหมด</option>
                </select>
                <Icon icon="mdi:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </header>

        <section class="mr-2 mt-4 space-y-4">
          <ProductDropdown :products="products" />
          <ProductDropdown :products="products" />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

// ข้อมูลจำลอง
const { products } = useDashboard();

// States
const isSidebarOpen = ref(true);
const activeCategory = ref(1); // Default เปิด Apple
const activeSubCategory = ref(undefined); // Default เลือก iPhone
const activeSubTag = ref('ALL');

const categories = [
  { 
    id: 1, name: 'Apple Products', icon: '📱', 
    subCats: ['iPhone', 'iPad', 'Mac', 'AirPods' , 'Apple watch'] 
  },
  { 
    id: 2, name: 'Laptops', icon: '💻', 
    subCats: ['Gaming', 'Thin & Light', 'Workstation'] 
  },
  { 
    id: 3, name: 'PC Components', icon: '🔌', 
    subCats: ['CPU', 'GPU', 'Mainboard', 'RAM'] 
  },
];

// Computed สำหรับแสดงชื่อ Category หลักที่เลือก
const activeCategoryName = computed(() => {
  const cat = categories.find(c => c.id === activeCategory.value);
  return cat ? cat.name : 'Select Category';
});

// Computed สำหรับแสดง Sub-tags (ตัวอย่าง)
const currentSubCatTags = computed(() => {
  if (activeSubCategory.value === 'iPhone') return ['iPhone 17', 'iPhone 16', 'iPhone 15', 'iPhone 14'];
  if (activeSubCategory.value === 'iPad') return ['iPad Pro', 'iPad Air', 'iPad Mini'];
  return ['Model A', 'Model B'];
});

const toggleCategory = (id) => {
  if (activeCategory.value === id) {
    activeCategory.value = null;
  } else {
    activeCategory.value = id;
    isSidebarOpen.value = true;
  }
};

const selectSubCategory = (subName) => {
  activeSubCategory.value = subName;
  activeSubTag.value = 'ALL'; // Reset tag เมื่อเปลี่ยนหมวดหมู่ย่อย
};
</script>
<template>
  <div class="flex flex-col min-h-screen w-full bg-slate-100 p-2 md:p-4">
    <nav class="flex items-center gap-2 mb-4 px-2 md:px-4 text-xs md:text-sm font-medium overflow-x-auto whitespace-nowrap">
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

    <div class="flex flex-1 flex-col lg:flex-row gap-3 items-start">
      <aside :class="[isSidebarOpen ? 'lg:w-64' : 'lg:w-20']" class="w-full lg:sticky lg:top-4 lg:h-[calc(100vh-60px)] bg-white text-black transition-all duration-300 flex flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden">
        <div class="p-4 flex justify-between items-center border-b h-16 shrink-0">
          <span v-if="isSidebarOpen" class="font-bold truncate text-[#0D95DA]">Advice Catalog</span>
          <button class="hover:bg-slate-100 p-1.5 rounded-lg transition-colors ml-1" @click="isSidebarOpen = !isSidebarOpen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <div v-for="cat in categories" :key="cat.id" class="flex flex-col">
            <div class="p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all group m-1" :class="[activeCategory === cat.id ? 'bg-blue-50 text-[#0D95DA]' : 'hover:bg-slate-50 text-slate-600']" @click="toggleCategory(cat.id)">
              <div class="flex items-center gap-3">
                <span class="text-xl">{{ cat.icon }}</span>
                <span v-if="isSidebarOpen" class="font-medium whitespace-nowrap">{{ cat.name }}</span>
              </div>
              <svg v-if="isSidebarOpen" :class="{'rotate-180': activeCategory === cat.id}" class="w-4 h-4 transition-transform duration-200 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </div>
            <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-64 opacity-100" leave-active-class="transition-all duration-200 ease-in" leave-from-class="max-h-64 opacity-100" leave-to-class="max-h-0 opacity-0">
              <div v-if="activeCategory === cat.id && isSidebarOpen" class="overflow-hidden bg-white rounded-b-xl mb-2">
                <div v-for="sub in cat.subCats" :key="sub" class="py-2.5 pl-12 pr-4 text-sm transition-colors relative cursor-pointer" :class="[activeSubCategory === sub ? 'text-[#0D95DA] font-bold bg-blue-50/50' : 'text-slate-400 hover:text-black hover:bg-slate-50']" @click="selectSubCategory(sub)">{{ sub }}</div>
              </div>
            </transition>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-1 pb-10">
        <header class="bg-white border-b border-slate-200 p-4 md:p-6 shadow-sm shrink-0 rounded-2xl border-t-6 border-t-[#0D95DA] mr-0 lg:mr-2">
          <div class="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6 border-b border-slate-200 pb-4">
            <div class="flex items-baseline gap-2">
              <h2 class="text-xl font-bold text-slate-800">
                {{ activeCategoryName }} <span v-if="activeSubCategory" class="text-[#0D95DA]"/>
              </h2>
              <span class="text-slate-400 text-xs">({{ filteredProducts.length }} รายการ)</span>
            </div>
            
            <div class="flex items-center gap-2 md:gap-3">
              <button class="p-2 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-200">
                <Icon icon="mdi:printer-outline" class="w-5 h-5" />
              </button>
              <div class="h-8 w-px bg-slate-200 mx-1"/>
              
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
            <div class="flex items-center gap-2"><span class="font-bold text-slate-800">รุ่น / ซีรีส์:</span></div>
            <div class="flex flex-wrap gap-2 md:gap-3 pb-6 border-b border-slate-300">
              <button :class="[activeSubTag === 'ALL' ? 'bg-[#2D5A9E] text-white' : 'bg-white text-slate-500 border-slate-200']" class="px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium border transition-all" @click="activeSubTag = 'ALL'"> ALL </button>
              <button v-for="tag in currentSubCatTags" :key="tag" :class="[activeSubTag === tag ? 'bg-[#2D5A9E] text-white' : 'bg-white text-slate-500 border-slate-200']" class="px-3 md:px-5 py-2 rounded-full text-xs md:text-sm border transition-all" @click="activeSubTag = tag"> {{ tag }} </button>
            </div>
          </div>

          <div class="mt-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div class="relative w-full max-w-md">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="ค้นหาชื่อสินค้า " 
                class="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0D95DA] shadow-sm"
              >
              <Icon icon="mdi:magnify" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <div class="flex items-center gap-2 md:gap-3 w-full md:w-auto">
              <span class="text-sm text-slate-600 font-medium">สถานะสินค้า:</span>
              <div class="relative min-w-0 w-full md:min-w-35">
                <select 
                  v-model="stockStatus" 
                  class="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#0D95DA]"
                >
                  <option>ทั้งหมด</option>
                  <option>มีของ</option>
                  <option>ของหมด</option>
                </select>
                <Icon icon="mdi:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </header>

        <section class="mr-0 lg:mr-2 mt-2">
          <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-14 md:py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 mr-0 lg:mr-2">
            <Icon icon="mdi:package-variant-closed" class="w-16 h-16 text-slate-200 mb-4" />
            <p class="text-slate-400 font-medium">ไม่พบสินค้าที่คุณต้องการ ลองเปลี่ยนคำค้นหาใหม่ดูนะ</p>
            <button 
            class="mt-4 text-[#0D95DA] text-sm font-bold hover:underline"
            @click="resetFilters" 
            >
              ล้างการกรองทั้งหมด
          </button>
          </div>

         <template v-else>
  <div class="space-y-4">
    <div v-for="(taggedProducts, tagName) in productsBySubTag" :key="tagName">
      <ProductDropdown 
        :label="tagName" 
        :products="taggedProducts" 
        :view-mode="viewMode" 
        :is-open="dropdownStates[tagName]" 
        @toggle="toggleDropdown(tagName)"
      />
    </div>
  </div>
</template>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

// 🟢 2. UI STATES
const isSidebarOpen = ref(true);
const activeCategory = ref(undefined);
const activeSubCategory = ref(undefined);
const activeSubTag = ref('ALL');
const globalLoading = useState('global-loading', () => false);
const viewMode = ref('list');

// 🟢 3. FILTER STATES
const searchQuery = ref('');
const stockStatus = ref('ทั้งหมด');

// 🟢 4. COMPUTED FILTER PIPELINE (หัวใจสำคัญ)
const { products } = useDashboard(); 

// 2. ปรับการกรองให้รองรับชื่อหมวดหมู่ที่อาจจะไม่ตรงกันเป๊ะ (Case Insensitive)
// 🟢 Update your filteredProducts in <script setup>
const filteredProducts = computed(() => {
  const allProducts = products.value; 
  let result = [...allProducts];

  // 1. Filter by Category/SubCategory
  if (activeSubCategory.value) {
    result = result.filter(p => 
      p.category?.toLowerCase() === activeSubCategory.value.toLowerCase()
    );
  } else if (activeCategory.value) {
    const catName = activeCategoryName.value;
    if (catName === 'PC Components') {
      result = result.filter(p => ['CPU', 'VGA', 'Mainboard'].includes(p.category));
    }
  }

  // 🟢 NEW: Filter by SubTag (Line 83 buttons)
  if (activeSubTag.value !== 'ALL') {
    result = result.filter(p => 
      p.name.toLowerCase().includes(activeSubTag.value.toLowerCase())
    );
  }

  // 3. Filter by Search
  if (searchQuery.value) {
    result = result.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }

  return result;
});

// 🟢 5. SIDEBAR DATA
const baseCategories = [
  { name: 'Apple Products', icon: '📱', subCats: ['iPhone', 'iPad', 'Mac', 'AirPods' , 'Apple watch'] },
  { name: 'Laptops', icon: '💻', subCats: ['Gaming', 'Thin & Light', 'Workstation'] },
  { name: 'PC Components', icon: '🔌', subCats: ['CPU', 'GPU', 'Mainboard', 'RAM'] },
  { name: 'Monitors', icon: '🖥️', subCats: ['Gaming Monitor', '4K UHD', 'Ultrawide', 'Office'] },
  { name: 'Storage', icon: '💾', subCats: ['SSD', 'External HDD', 'NVMe', 'Flash Drive'] }
];

const categories = Array.from({ length: 100 }, (_, index) => {
  const base = baseCategories[index % baseCategories.length];
  return { id: index + 1, ...base };
});

const activeCategoryName = computed(() => {
  const cat = categories.find(c => c.id === activeCategory.value);
  return cat ? cat.name : 'Select Category';
});

useHeadSafe({
  meta: [
    { name: 'cache-control', content: 'no-store, no-cache, must-revalidate' },
    { name: 'pragma', content: 'no-cache' },
    { name: 'expires', content: '0' },
    { name: 'referrer', content: 'no-referrer' },
  ],
});

useSeoMeta({
  title: () => `${activeSubCategory.value || activeCategoryName.value} | Category`,
  description: 'Browse and filter products by category and sub-category.',
  ogTitle: () => `${activeSubCategory.value || activeCategoryName.value} | Category`,
  ogDescription: 'Secure category listing for dealer users.',
  robots: 'noindex, nofollow',
});

// ใน category.vue
// 🟢 Fixed currentSubCatTags in category.vue
const currentSubCatTags = computed(() => {
  // 1. Get products matching the current SubCategory
  const relatedProducts = products.value.filter(p => 
    p.category?.toLowerCase() === activeSubCategory.value?.toLowerCase()
  );

  // 2. Extract unique tags from these products
  // Correct syntax: new Set<string>() without 'any' inside
  const tags = new Set();
  
  relatedProducts.forEach(p => {
    if (p.tag) {
      tags.add(p.tag);
    }
  });

  // 3. Return as a sorted array
  return Array.from(tags).sort((a, b) => b.localeCompare(a)); 
});

// 🟢 6. ACTIONS
const toggleCategory = (id) => {
  if (activeCategory.value === id) {
    activeCategory.value = null;
  } else {
    activeCategory.value = id;
    isSidebarOpen.value = true;
  }
};

const selectSubCategory = async (subName) => {
  globalLoading.value = true;
  activeSubCategory.value = subName;
  activeSubTag.value = 'ALL'; 
  searchQuery.value = ''; // ล้างคำค้นหาเมื่อเปลี่ยนหมวดหมู่ใหม่ (Optional)

  try {
    await new Promise(resolve => setTimeout(resolve, 500)); 
  } finally {
    setTimeout(() => { globalLoading.value = false; }, 300);
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  stockStatus.value = 'ทั้งหมด';
  activeSubTag.value = 'ALL';
  activeCategory.value = '';
  activeSubCategory.value = '';
};

// 🟢 Add this to your <script setup> in category.vue
// 🟢 Update productsBySubTag in <script setup>
const productsBySubTag = computed(() => {
  const groups = {};
  const currentTags = currentSubCatTags.value;
  const allAvailableProducts = filteredProducts.value;

  currentTags.forEach(tag => {
    const matched = allAvailableProducts.filter(p => 
      p.name.toLowerCase().includes(tag.toLowerCase())
    );
    
    if (matched.length > 0) {
      groups[tag] = matched;
    }
  });

  // Optional: Add a "Others" group for products that didn't match any tag
  const taggedIds = new Set(Object.values(groups).flat().map(p => p.id));
  const others = allAvailableProducts.filter(p => !taggedIds.has(p.id));
  
  if (others.length > 0) {
    groups['อื่นๆ'] = others;
  }

  return groups;
});

// 🟢 Update in <script setup>
// Use an object to track the open state of each tag individually
const dropdownStates = ref({});

// Function to toggle a specific tag
const toggleDropdown = (tagName) => {
  dropdownStates.value[tagName] = !dropdownStates.value[tagName];
};

// Initialize all tags to 'open' by default when data changes
watch(productsBySubTag, (newGroups) => {
  Object.keys(newGroups).forEach(tag => {
    if (dropdownStates.value[tag] === undefined) {
      dropdownStates.value[tag] = true; 
    }
  });
}, { immediate: true });

// 🟢 Force open the specific dropdown when a SubTag is selected
watch(activeSubTag, (newTag) => {
  if (newTag !== 'ALL') {
    dropdownStates.value[newTag] = true;
  }
});

</script>

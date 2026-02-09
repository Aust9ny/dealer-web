<script setup lang="ts">
// Nuxt auto-imports these functions
const { menuGroups } = useNavigation();
const { startDate, endDate, banner1, banner2, products, newList, stats, categoryTitle, chartData } = useDashboard();
</script>

<template>
  <div class="bg-gray-100 min-h-screen font-thai">
    <div class="max-w-400 mx-auto p-6">
      <div class="grid grid-cols-12 gap-6">

        <aside class="col-span-12 lg:col-span-3 space-y-4">
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-300 border-t-12 border-t-primary">
            <nav class="space-y-6">
              <div v-for="group in menuGroups" :key="group.title">
                <h3 class="font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span class="text-lg">{{ group.icon }}</span> {{ group.title }}
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li v-for="link in group.links" :key="link" class="hover:text-[#2196F3] cursor-pointer transition">
                    {{ link }}
                  </li>
                  <div class="mt-4 h-px w-full bg-slate-600" />
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        <main class="col-span-12 lg:col-span-9 space-y-10">
          <header
            class="bg-white rounded-2xl p-4 shadow-sm border border-slate-300 flex items-center justify-between border-t-12 border-t-primary">
            <h2 class="font-bold text-xl text-slate-800">สรุปผลการดำเนินงาน</h2>
            <div class="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl p-1.5">
              <input v-model="startDate" type="date" class="bg-transparent border-none text-sm">
              <span class="text-slate-300">|</span>
              <input v-model="endDate" type="date" class="bg-transparent border-none text-sm">
            </div>
          </header>

          <div class="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-slate-300">

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div 
              v-for="stat in stats" :key="stat.label"
                class="border-2 border-slate-300 rounded-2xl p-6 relative overflow-hidden hover:border-blue-400 ">
                <p class="text-sm font-bold text-slate-400 uppercase">{{ stat.label }}</p>
                <h2 class="text-2xl font-black" :class="stat.colorClass">{{ stat.value }}</h2>
                <div class="absolute -right-2 -bottom-2 opacity-5 text-4xl">{{ stat.icon }}</div>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-xl font-bold text-slate-800 mb-6">ยอดขายรายเดือน</h3>
              <div class="w-full h-100 relative">
                <ClientOnly>
                  <Chart :labels="chartData.labels" :datasets="chartData.datasets" />
                  <template #fallback>
                    <div class="h-100 w-full bg-gray-100 animate-pulse" />
                  </template>
                </ClientOnly>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>

    <div class="bg-white border-t border-slate-200 pb-20 px-6 mt-10">
      <div class="max-w-350 mx-auto space-y-10 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromotionBanner :banners="banner1" />
          <PromotionBanner :banners="banner2" />
        </div>
        <ProductList :title="categoryTitle" :products="products" />
        <FooterNews :news-list="newList" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// Nuxt auto-imports these functions
const { menuGroups } = useNavigation();
const {
  startDate,
  endDate,
  banner1,
  banner2,
  products,
  newList,
  stats,
  categoryTitle,
  chartData,
  topSales,
  bottomSales,
  quickAccessItems,
} = useDashboard();
const showModal = ref(false);
const isMenuOpen = ref(false);
</script>

<template>
  <div class="bg-gray-100 min-h-screen font-thai">
    <div class="max-w-400 mx-auto p-3 md:p-6">
      <div class="grid grid-cols-12 gap-4 md:gap-6">
        <aside class="hidden lg:block col-span-12 lg:col-span-3 space-y-4">
          <div
            class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-300 border-t-12 border-t-primary"
          >
            <div class="mb-3 font-bold text-slate-800">เมนูจัดการ:</div>
            <div
              class="block w-60 mx-auto bg-primary text-white py-2 rounded-md text-center hover:bg-primary/90 transition mb-6"
              @click="showModal = true"
            >
              เปิดบิลสั่งซื้อสินค้า
            </div>
            <SelectPurchaseOrderModal v-model="showModal" />
            <nav class="space-y-6">
              <div v-for="group in menuGroups" :key="group.title">
                <h3
                  class="font-bold text-slate-800 flex items-center gap-2 mb-3"
                >
                  <span class="text-lg">{{ group.icon }}</span>
                  {{ group.title }}
                </h3>
                <ul class="space-y-2 text-sm text-slate-600">
                  <li
                    v-for="link in group.links"
                    :key="link"
                    class="hover:text-[#2196F3] cursor-pointer transition"
                  >
                    {{ link }}
                  </li>
                  <div class="mt-4 h-px w-full bg-slate-600" />
                </ul>
              </div>
            </nav>
          </div>
        </aside>
        <!-- MOBILE ONLY -->
        <div class="lg:hidden col-span-12 space-y-4">
          <!-- CARD 1 : ปุ่มเปิดบิล -->
          <div class="bg-white rounded-xl shadow p-4">
            <div
              class="w-full bg-primary text-white py-2 rounded-md text-center hover:bg-primary/90 transition cursor-pointer"
              @click="showModal = true"
            >
              เปิดบิลสั่งซื้อสินค้า
            </div>
          </div>

          <!-- CARD 2 : เมนูจัดการ -->
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <!-- HEADER -->
            <button
              class="w-full flex justify-between items-center p-4 font-bold text-slate-800"
              :class="isMenuOpen ? 'border-b' : ''"
              @click="isMenuOpen = !isMenuOpen"
            >
              เมนูจัดการ
              <span
                class="transition-transform duration-300"
                :class="isMenuOpen ? 'rotate-180' : ''"
              >
                ▼
              </span>
            </button>

            <!-- DROPDOWN -->
            <transition name="slide-down">
              <div v-if="isMenuOpen" class="p-4 space-y-6">
                <div v-for="group in menuGroups" :key="group.title">
                  <h3
                    class="font-bold text-slate-800 flex items-center gap-2 mb-3"
                  >
                    <span class="text-lg">{{ group.icon }}</span>
                    {{ group.title }}
                  </h3>

                  <ul class="space-y-2 text-sm text-slate-600">
                    <li
                      v-for="link in group.links"
                      :key="link"
                      class="hover:text-[#2196F3] cursor-pointer transition"
                    >
                      {{ link }}
                    </li>
                  </ul>

                  <div class="mt-4 h-px w-full bg-slate-300" />
                </div>
              </div>
            </transition>
          </div>

          <!-- Modal วางไว้ข้างนอกสุด -->
          <SelectPurchaseOrderModal v-model="showModal" />
        </div>

        <main class="col-span-12 lg:col-span-9 space-y-5">
          <header
            class="bg-white rounded-2xl p-4 shadow-sm border border-slate-300 flex flex-col md:flex-row gap-3 md:items-center justify-between border-t-12 border-t-primary"
          >
            <h2 class="font-bold text-lg md:text-xl text-slate-800">
              สรุปผลการดำเนินงาน
            </h2>
            <div
              class="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl p-1.5 w-full md:w-auto"
            >
              <input
                v-model="startDate"
                type="date"
                class="bg-transparent border-none text-sm"
              >
              <span class="text-slate-300">|</span>
              <input
                v-model="endDate"
                type="date"
                class="bg-transparent border-none text-sm"
              >
            </div>
          </header>

          <div
            class="bg-white rounded-2xl p-4 md:p-8 lg:p-12 shadow-sm border border-slate-300"
          >
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
            >
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="border-2 border-slate-300 rounded-2xl p-6 relative overflow-hidden hover:border-blue-400"
              >
                <p class="text-sm font-bold text-slate-400 uppercase">
                  {{ stat.label }}
                </p>
                <h2 class="text-2xl font-black" :class="stat.colorClass">
                  {{ stat.value }}
                </h2>
                <div class="absolute -right-2 -bottom-2 opacity-5 text-4xl">
                  {{ stat.icon }}
                </div>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-xl font-bold text-slate-800 mb-6">
                ยอดขายรายเดือน
              </h3>
              <div class="w-full h-100 relative">
                <ClientOnly>
                  <Chart
                    :labels="chartData.labels"
                    :datasets="chartData.datasets"
                  />
                  <template #fallback>
                    <div class="h-100 w-full bg-gray-100 animate-pulse" />
                  </template>
                </ClientOnly>
              </div>

              <div class="grid grid-cols-1 gap-4 mt-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div
                    class="bg-white rounded-2xl p-4 border-l-4 border-emerald-500 shadow-sm border-y border-r"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <h4
                        class="text-xs font-black text-slate-800 uppercase tracking-tighter"
                      >
                        🔥 Most Sales
                      </h4>
                      <span
                        class="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded"
                        >Top 5</span
                      >
                    </div>

                    <div class="space-y-2">
                      <div
                        v-for="(product, i) in topSales"
                        :key="i"
                        class="flex items-center gap-3 group"
                      >
                        <span
                          class="text-[10px] font-bold text-slate-300 group-hover:text-emerald-500 w-3"
                          >{{ i + 1 }}</span
                        >
                        <p
                          class="flex-1 text-[11px] font-bold text-slate-600 truncate"
                        >
                          {{ product.name }}
                        </p>
                        <span
                          class="text-[11px] font-black text-slate-800 whitespace-nowrap"
                          >฿{{ (product.total / 1000).toFixed(0) }}k</span
                        >
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white rounded-2xl p-4 border-l-4 border-rose-500 shadow-sm border-y border-r"
                  >
                    <div class="flex items-center justify-between mb-4">
                      <h4
                        class="text-xs font-black text-slate-800 uppercase tracking-tighter"
                      >
                        ❄️ Least Sales
                      </h4>
                      <span
                        class="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded"
                        >Bottom 5</span
                      >
                    </div>

                    <div class="space-y-2">
                      <div
                        v-for="(product, i) in bottomSales"
                        :key="i"
                        class="flex items-center gap-3 group"
                      >
                        <span
                          class="text-[10px] font-bold text-slate-300 group-hover:text-rose-500 w-3"
                          >{{ i + 1 }}</span
                        >
                        <p
                          class="flex-1 text-[11px] text-slate-400 italic truncate"
                        >
                          {{ product.name }}
                        </p>
                        <span
                          class="text-[11px] font-bold text-slate-400 whitespace-nowrap"
                          >{{ product.amount }} pcs</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div class="rounded-2xl p-2 md:p-4 mt-5">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10"
        >
          <div
            v-for="(item, index) in quickAccessItems"
            :key="index"
            class="group relative h-40 flex flex-col items-center justify-center rounded-3xl transition-all hover:z-20 cursor-pointer border-4 border-transparent shadow-md aspect-2/1"
            :class="item.bgColor + ' ' + item.hoverBorder"
          >
            <span
              class="font-black text-xl tracking-tight"
              :class="item.textColor"
            >
              {{ item.title }}
            </span>

            <div
              class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white border-t border-slate-200 pb-20 px-3 md:px-6">
      <div class="max-w-350 mx-auto space-y-10 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromotionBanner :banners="banner1" />
          <PromotionBanner :banners="banner2" />
        </div>
        <ProductList :title="categoryTitle" :products="products" />
        <ProductList :title="categoryTitle" :products="products" />
        <FooterNews :news-list="newList" />
      </div>
    </div>
  </div>
</template>
<style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

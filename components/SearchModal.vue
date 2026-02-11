<template>
  <div
  v-if="modelValue"
  class="fixed inset-0 z-50 flex items-start justify-center pt-22"
>

    <!-- Overlay -->
    <div
      class="absolute inset-0"
      @click="close"
    />

    <!-- Modal -->
    <div
      class="relative w-[1500px] max-w-[95vw] bg-white border border-gray-200 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]"
    >
      <div class="grid grid-cols-12 min-h-[420px] max-h-[80vh] overflow-y-auto">
        <!-- Col 1 -->
        <div class="col-span-2 grid grid-rows-2 border-r border-gray-200">
          <!-- Trending -->
          <div class="p-5">
            <div class="text-[13px] font-semibold text-gray-800 mb-3">
              📈 เทรนด์การค้นหาช่วงนี้
            </div>

            <ul class="space-y-2 text-[13px] text-gray-600">
              <li
                v-for="item in trendingKeywords"
                :key="item"
                class="hover:text-primary cursor-pointer"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- History -->
          <div class="border-t border-gray-200 p-5">
            <div class="text-[13px] font-semibold text-gray-800 mb-3">
              🕘 ประวัติที่คุณเคยค้นหา
            </div>

            <ul class="space-y-2 text-[13px] text-gray-500">
              <li
                v-for="item in searchHistory"
                :key="item"
                class="flex items-center hover:text-primary cursor-pointer"
              >
                {{ item }}
                <span class="ml-auto text-gray-300">✕</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Col 2 : Products -->
        <div class="col-span-5 col-start-3 p-5 border-r border-gray-200">
          <div class="text-[13px] font-semibold text-gray-800 mb-3">
            สินค้าที่เป็นเทรนด์ตอนนี้
          </div>

          <div
            v-for="product in trendingProducts"
            :key="product.id"
            class="flex gap-3 py-3 hover:bg-gray-50"
          >
            <img
              :src="product.image"
              class="w-20 h-20 rounded-md object-cover"
            />
            <div>
              <div class="text-[13px] text-gray-800">
                {{ product.name }}
              </div>
              <div class="text-[12px] text-gray-500">
                ฿{{ product.price.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Col 3 : Banner -->
        <div class="col-span-5 col-start-8 p-5">
          <div class="text-[13px] font-semibold text-gray-800 mb-4">
            โปรโมชั่น
          </div>

          <a
            v-for="banner in banners"
            :key="banner.id"
            :href="banner.link"
            target="_blank"
            class="block mb-3 overflow-hidden rounded-xl border hover:shadow-md"
          >
            <img
              :src="banner.image"
              class="w-full h-36 object-cover"
            />
          </a>
          <a
            v-for="banner in banners"
            :key="banner.id"
            :href="banner.link"
            target="_blank"
            class="block mb-3 overflow-hidden rounded-xl border hover:shadow-md"
          >
            <img
              :src="banner.image"
              class="w-full h-36 object-cover"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  trendingProducts: any[]
  banners: any[]
  trendingKeywords: string[]
  searchHistory: string[]
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const close = () => {
  emit('update:modelValue', false);
};
</script>

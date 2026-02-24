<template>
  <div
    v-if="modelValue"
    class="fixed top-16 left-0 right-0 bottom-0 md:left-0 md:right-0 md:bottom-0 md:top-22 z-140 flex items-end md:items-start justify-center"
  >
    <!-- Overlay -->
    <div class="absolute inset-0" @click="close" />

    <!-- Modal -->
    <div
      class="relative w-full md:w-425 h-[90vh] md:h-[80vh] bg-white rounded-t-3xl md:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.25)] md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden"
    >
      <div
        class="flex flex-col md:grid md:grid-cols-12 min-h-full max-h-full overflow-y-auto md:overflow-hidden"
      >
        <!-- Col 1 -->
        <div
          class="md:col-span-3 relative flex flex-col border-b md:border-b-0"
        >
          <div
            class="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-gray-400"
          />

          <!-- Trending -->
          <div class="px-4 py-5 md:p-5">
            <div class="text-[15px] font-bold text-gray-900 mb-4">
              📈 เทรนด์การค้นหาช่วงนี้
            </div>

            <ul class="text-[13px] text-gray-600 divide-y divide-gray-200">
              <li
                v-for="item in trendingKeywords"
                :key="item"
                class="py-2 hover:text-primary cursor-pointer"
              >
                {{ item }}
              </li>
            </ul>

            <div
              class="mt-3 text-[12px] text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              แสดงผลลัพธ์เพิ่มเติม 10+
            </div>
          </div>

          <!-- เส้นคั่น -->
          <div class="px-4 py-5 md:p-5">
            <div class="h-px w-4/4 bg-gray-400" />
          </div>

          <!-- History -->
          <div class="px-4 py-5 md:p-5">
            <div class="flex items-center justify-between mb-4">
              <div class="text-[15px] font-bold text-gray-900">
                🕘 ประวัติที่คุณเคยค้นหา
              </div>

              <button class="text-[12px] text-gray-400 hover:text-red-500">
                ลบทั้งหมด
              </button>
            </div>

            <ul class="text-[13px] text-gray-500 divide-y divide-gray-200">
              <li
                v-for="item in searchHistory"
                :key="item"
                class="flex items-center py-2 hover:text-primary cursor-pointer"
              >
                {{ item }}
                <span class="ml-auto text-gray-300">✕</span>
              </li>
            </ul>

            <div
              class="mt-3 text-[12px] text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              แสดงผลลัพธ์เพิ่มเติม 10+
            </div>
          </div>
        </div>

        <!-- Col 2 : Products -->
        <div
          class="md:col-span-5 md:col-start-4 relative flex flex-col md:max-h-[80vh] border-b md:border-b-0"
        >
          <!-- เส้นแบ่ง desktop -->
          <div
            class="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-gray-300"
          />

          <!-- Header -->
          <div
            class="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6 pb-4 shrink-0"
          >
            <div class="text-[16px] font-bold text-gray-900">
              🔥 สินค้าที่เป็นเทรนด์ตอนนี้
            </div>
            <button
              class="text-[13px] font-medium text-primary hover:underline"
            >
              ดูทั้งหมด
            </button>
          </div>

          <!-- Product List -->
          <div class="flex-1 overflow-y-auto px-4 md:px-4 pb-4 md:pb-6">
            <div
              v-for="product in trendingProducts"
              :key="product.id"
              class="flex flex-col sm:flex-row gap-2 md:gap-3 px-2 md:px-3 py-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition"
            >
              <!-- Image -->
              <div
                class="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg"
              >
                <img
                  :src="product.image"
                  class="max-h-20 max-w-full object-contain"
                >
              </div>

              <!-- Content Wrapper -->
              <div class="flex-1 flex justify-between min-w-0">
                <!-- LEFT -->
                <div class="flex flex-col justify-between pr-4 min-w-0">
                  <div
                    class="text-[11px] font-semibold text-blue-600 tracking-wide"
                  >
                    {{ product.brand }}
                  </div>

                  <div
                    class="text-[13px] text-gray-800 leading-snug line-clamp-2"
                  >
                    {{ product.name }}
                  </div>

                  <div class="text-[12px] text-gray-400 line-clamp-1">
                    {{ product.spec }}
                  </div>
                </div>

                <!-- RIGHT -->
                <div
                  class="flex flex-col items-start sm:items-end justify-between text-left sm:text-right min-w-0 sm:min-w-[170px]"
                >
                  <div class="flex flex-col items-start sm:items-end gap-1">
                    <div
                      class="text-[18px] font-bold text-gray-900 whitespace-nowrap"
                    >
                      ฿{{ formatNumber(product.price) }}
                    </div>

                    <div
                      v-if="product.oldPrice"
                      class="flex items-center gap-2 flex-wrap sm:flex-nowrap"
                    >
                      <div
                        v-if="product.discount"
                        class="bg-red-700 text-white text-[11px] px-3 py-0.5 rounded-full whitespace-nowrap"
                      >
                        -฿{{ formatNumber(product.discount) }}
                      </div>

                      <div
                        class="text-[12px] text-gray-400 line-through whitespace-nowrap"
                      >
                        ฿{{ formatNumber(product.oldPrice) }}
                      </div>
                    </div>

                    <div class="text-[10px] text-gray-400">
                      *ราคานี้เฉพาะออนไลน์เท่านั้น
                    </div>

                    <div
                      v-if="product.readyPoint"
                      class="text-[11px] text-green-600 font-medium"
                    >
                      *Ready Point: {{ product.readyPoint }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 3 : Banner -->

        <div
          class="md:col-span-4 md:col-start-9 p-4 md:p-5 flex flex-col md:max-h-[80vh]"
        >
          <!-- Header -->

          <div class="flex items-center justify-between mb-5 shrink-0">
            <div class="text-[16px] font-bold text-gray-900 tracking-wide">
              📣 โปรโมชั่น
            </div>

            <button
              class="text-[13px] font-medium text-primary hover:underline"
            >
              ดูทั้งหมด
            </button>
          </div>

          <div class="overflow-y-auto space-y-3 pr-0 md:pr-2">
            <a
              v-for="banner in banners"
              :key="banner.id"
              :href="banner.link"
              target="_blank"
              class="block mb-3 overflow-hidden rounded-xl border hover:shadow-md"
            >
              <img :src="banner.image" class="w-full h-36 object-cover" >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trendingProducts: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  banners: any[];
  trendingKeywords: string[];
  searchHistory: string[];
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'update:modelValue', value: boolean): void;
}>();
const { formatNumber } = useThaiFormatters();

const close = () => {
  emit('update:modelValue', false);
};
</script>

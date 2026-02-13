<template>
  <div
    v-if="modelValue"
    class="fixed left-0 right-0 bottom-0 top-20 z-[110] flex items-start justify-center pt-2"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40" @click="close" />

    <!-- Modal -->
    <div
      class="relative w-[1700px] max-w-[98vw] h-[85vh] bg-white border border-gray-300 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]"
    >
      <div class="grid grid-cols-12 min-h-[420px] max-h-[80vh]">
        <!-- Col 1 -->
        <div class="col-span-3 relative flex flex-col">
          <div class="absolute right-0 top-6 bottom-6 w-px bg-gray-400"></div>

          <!-- Trending -->
          <div class="p-5">
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
          <div class="px-5">
            <div class="h-px w-4/4 bg-gray-400"></div>
          </div>

          <!-- History -->
          <div class="p-5">
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
        <div class="col-span-5 col-start-4 relative flex flex-col max-h-[80vh]">
          <div class="absolute right-0 top-6 bottom-6 w-px bg-gray-400"></div>

          <!-- Header -->
          <div
            class="flex items-center justify-between px-6 pt-6 pb-4 shrink-0"
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
          <div class="flex-1 overflow-y-auto px-4 pb-6">
            <div
              v-for="product in trendingProducts"
              :key="product.id"
              class="flex gap-4 px-3 py-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition"
            >
              <!-- Image -->
              <div
                class="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-lg"
              >
                <img :src="product.image" class="max-h-20 object-contain" />
              </div>

              <!-- Content Wrapper -->
              <div class="flex-1 flex justify-between">
                <!-- LEFT : Info -->
                <div class="flex flex-col justify-between pr-4">
                  <!-- Brand -->
                  <div
                    class="text-[11px] font-semibold text-blue-600 tracking-wide"
                  >
                    {{ product.brand }}
                  </div>

                  <!-- Name -->
                  <div
                    class="text-[13px] text-gray-800 leading-snug line-clamp-2"
                  >
                    {{ product.name }}
                  </div>

                  <!-- Spec -->
                  <div class="text-[12px] text-gray-400 line-clamp-1">
                    {{ product.spec }}
                  </div>
                </div>

                <!-- RIGHT : Price -->
                <div
                  class="flex flex-col items-end justify-between text-right min-w-[170px]"
                >
                  <div class="flex flex-col items-end gap-1">
                    <!-- Current Price -->

                    <div class="text-[18px] font-bold text-gray-900">
                      ฿{{ product.price.toLocaleString() }}
                    </div>

                    <!-- Old price + Discount badge -->

                    <div
                      v-if="product.oldPrice"
                      class="flex items-center gap-2"
                    >
                      <!-- Discount Oval -->
                      <div
                        v-if="product.discount"
                        class="bg-red-700 text-white text-[11px] px-3 py-[2px] rounded-full"
                      >
                        -฿{{ product.discount.toLocaleString() }}
                      </div>

                      <!-- Old Price -->
                      <div class="text-[12px] text-gray-400 line-through">
                        ฿{{ product.oldPrice.toLocaleString() }}
                      </div>
                    </div>
                    <!-- Online Only -->
                    <div class="text-[10px] text-gray-400">
                      *ราคานี้เฉพาะออนไลน์เท่านั้น
                    </div>
                    <!-- Ready Point -->
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

        <div class="col-span-4 col-start-9 p-5 flex flex-col max-h-[80vh]">
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

          <div class="overflow-y-auto space-y-3 pr-2">
            <a
              v-for="banner in banners"
              :key="banner.id"
              :href="banner.link"
              target="_blank"
              class="block mb-3 overflow-hidden rounded-xl border hover:shadow-md"
            >
              <img :src="banner.image" class="w-full h-36 object-cover" />
            </a>

            <a
              v-for="banner in banners"
              :key="banner.id"
              :href="banner.link"
              target="_blank"
              class="block mb-3 overflow-hidden rounded-xl border hover:shadow-md"
            >
              <img :src="banner.image" class="w-full h-36 object-cover" />
            </a>

            <a
              v-for="banner in banners"
              :key="banner.id"
              :href="banner.link"
              target="_blank"
              class="block mb-3 overflow-hidden rounded-xl border hover:shadow-md"
            >
              <img :src="banner.image" class="w-full h-36 object-cover" />
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
  trendingProducts: any[];
  banners: any[];
  trendingKeywords: string[];
  searchHistory: string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};
</script>

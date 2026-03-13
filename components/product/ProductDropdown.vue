<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useNotifyLogic } from '~/composables/shared/useNotifyLogic';
import { useProductUrl } from '~/composables/shared/useProductUrl';
import { useScrollLock } from '~/composables/shared/useScrollLock';
import { useThaiFormatters } from '~/composables/shared/useThaiFormatters';
import { useAuth } from '~/composables/auth/useAuth';
import type { Product } from '~/types/product';
import type { ProductListItem } from '~/composables/category/useProduct_get';

interface TableHeader {
  key: string;
  label: string;
}

// 🟢 ปรับ DropdownRow ให้สอดคล้องกับ Interface ใหม่
interface DropdownRow extends Product {
  statusLabel: string;
  sortKey: string;
  rawVolumePrices: Record<string, string | number>;
  packQty: number;
}

interface Props {
  products: ProductListItem[];
  tableHeaders?: TableHeader[];
  label?: string;
  viewMode: 'list' | 'grid';
  isOpen?: boolean;
  activeSubTag?: string;
  activeCategoryName?: string;
  activeSubCategoryName?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['toggle']);

const { addToCart } = useAuth();
const { formatNumber } = useThaiFormatters();
const { getProductUrl } = useProductUrl();

const {
  showNotifyModal,
  targetProduct,
  notifyForm,
  isSubmitted,
  isEmailValid,
  isTelValid,
  openNotifyModal,
  onlyNumeric,
  isSuccess,
  resetNotifyState,
} = useNotifyLogic();

useScrollLock(showNotifyModal);

const NO_DATA = 'no data';
const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400/f8fafc/cbd5e1?text=No+Image';

const toText = (value?: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : NO_DATA;
};

const toNumber = (value: unknown) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'string' && value.trim() !== '') {
    // 🟢 ลบ Comma ออกเพื่อให้แปลงเป็นตัวเลขได้ถูกต้อง
    const cleanValue = value.replace(/,/g, '');
    const parsed = Number(cleanValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

// ใช้สำหรับแสดงผล HTML ใน Specs หรือ Detail
const stripHtml = (value: string | null | undefined) => {
  if (!value?.trim()) return NO_DATA;
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || NO_DATA;
};

const tableHeaders = computed<TableHeader[]>(() => props.tableHeaders ?? []);

const rows = computed<DropdownRow[]>(() =>
  props.products.map((item: any, index) => {
    // 🟢 ดึง Volume Prices จาก API (saleprice5, 4, 3, 2)
    const volumePrices = (item.volume_prices && typeof item.volume_prices === 'object')
      ? item.volume_prices
      : {};

    // 🟢 ใช้ saleprice5 เป็นราคาฐาน (Base Price)
    const basePrice = toNumber(volumePrices.saleprice5 || item.price);
    
    // Advice API มักใช้ Code ดึงรูป
    const image = item.image || (item.code ? `https://img.advice.co.th/images_product/${item.code}.jpg` : NO_DATA);
    const stock = Math.max(toNumber(item.stock), 0);
    const packQty = Math.max(toNumber(item.pack_qty), 1);
    const isInStock = stock > 0 || item.type === 'instock';

    return {
      code: toText(item.code),
      name: toText(item.name),
      detail: item.detail || NO_DATA,
      warranty: toText(item.warranty),
      pack_qty: packQty,
      stock: stock,
      volume_prices: volumePrices,
      type: item.type || '',
      // UI Additional Fields
      statusLabel: isInStock ? 'In Stock' : 'Out of Stock',
      sortKey: `${item.name}-${item.code}`,
      rawVolumePrices: volumePrices,
      packQty: packQty,
      price: basePrice, // เพื่อให้ใช้งานกับระบบ Cart เดิมได้
      image: image === NO_DATA ? PLACEHOLDER_IMAGE : image,
      specs: stripHtml(item.detail),
      category: props.activeSubCategoryName || NO_DATA,
      tag: props.label || props.activeSubTag || NO_DATA,
      isInStock
    } as DropdownRow;
  }),
);

const cartQuantities = ref<Record<string, number>>({});

const handleAdd = (product: DropdownRow) => {
  const qty = cartQuantities.value[product.code || ''] || product.packQty;
  if (qty > 0) {
    addToCart(product as any, qty);
  }
};

const getHeaderPrice = (product: DropdownRow, key: string) =>
  toNumber(product.rawVolumePrices[key]);

const handleNotifySubmit = async () => {
  isSubmitted.value = true;
  if (!isEmailValid.value || !isTelValid.value || !notifyForm.value.consent) return;
  isSubmitted.value = false;
  notifyForm.value = { email: '', tel: '', consent: false };
  isSuccess.value = true;
};
</script>

<template>
  <div class="w-full mb-1">
    <button
      class="sticky top-24 z-60 w-full flex items-center justify-between bg-white/95 backdrop-blur-sm border border-slate-300 px-3 md:px-4 py-4 md:py-6 rounded-2xl shadow-md hover:bg-slate-50 transition-all text-left border-t-4 border-t-[#B0D7EB]"
      @click="emit('toggle')"
    >
      <div class="flex space-x-1 w-full text-sm items-center">
        <span class="text-slate-800 font-black uppercase tracking-tight">{{ label || activeSubTag || NO_DATA }}</span>
        <span class="text-slate-400 font-bold text-xs">({{ rows.length }} รายการ)</span>
      </div>
      <Icon
        icon="mdi:chevron-down"
        class="w-5 h-5 text-slate-400 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition-[max-height,opacity] duration-500 ease-in-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[5000px] opacity-100"
      leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
      leave-from-class="max-h-[5000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isOpen" class="mt-2 bg-slate-50 border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
        
        <div v-if="viewMode === 'list'" class="overflow-x-auto scrollbar-thin bg-white">
          <table class="w-full min-w-300 text-left border-separate border-spacing-0 table-fixed">
            <thead class="bg-slate-50 sticky top-0 z-30">
              <tr class="text-[12px] uppercase tracking-tighter text-slate-500 font-black">
                <th class="p-3 w-20 text-center sticky left-0 z-40 bg-slate-50 border-b border-r border-slate-200">รูป</th>
                <th class="p-3 w-64 md:sticky md:left-20 z-40 bg-slate-50 border-b border-r border-slate-200 md:shadow-sm">ชื่อสินค้า</th>
                <th class="p-3 w-auto bg-slate-50 border-b border-r border-slate-200">รายละเอียด</th>
                <th class="p-3 w-24 text-center bg-slate-50 border-b border-r border-slate-200">ประกัน</th>
                
                <th
                  v-for="header in tableHeaders"
                  :key="header.key"
                  class="p-3 w-30 text-center border-b border-r border-slate-200"
                  :class="header.key === 'saleprice5' ? 'bg-blue-50/50 text-blue-900' : 'bg-[#0D95DA]/5 text-[#0D95DA]'"
                >
                  {{ header.label }}
                </th>

                <th class="p-3 w-24 text-center bg-slate-50 border-b border-r border-slate-200">จำนวน</th>
                <th class="p-3 w-32 text-center bg-slate-50 border-b sticky right-0 z-30 border-l-2 border-l-slate-300 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">ตัวเลือก</th>
              </tr>
            </thead>

            <tbody class="text-[12px] bg-white">
              <tr v-for="product in rows" :key="product.code" class="hover:bg-blue-50/20 transition-colors group">
                <td class="p-2 sticky left-0 z-20 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100">
                  <NuxtLink :to="getProductUrl(product as any)" class="hover:scale-105 active:scale-95 transition-transform block">
                    <NuxtImg
                      :src="product.image"
                      :alt="product.name"
                      class="w-12 h-12 mx-auto object-contain bg-white rounded-lg p-1 border border-slate-100 shadow-sm"
                      @error="(e: any) => e.target.src = PLACEHOLDER_IMAGE"
                    />
                  </NuxtLink>
                </td>

                <td class="p-3 font-bold md:sticky left-20 z-20 bg-white group-hover:bg-slate-50 border-b border-r border-slate-200">
                  <div class="line-clamp-2 text-slate-800 leading-snug">{{ product.name }}</div>
                  <div class="mt-1 flex items-center gap-2">
                    <span :class="product.isInStock ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'" class="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-current">
                      {{ product.statusLabel }}
                    </span>
                    <span class="text-[9px] text-slate-300 font-medium">#{{ product.code }}</span>
                  </div>
                </td>

                <td class="p-3 border-b border-r border-slate-100 text-slate-500 text-[10px] leading-tight">
                  <div class="line-clamp-2" v-html="product.detail"></div>
                </td>

                <td class="p-3 text-center border-b border-r border-slate-100 font-bold text-slate-600">
                  {{ product.warranty }}
                </td>

                <td
                  v-for="header in tableHeaders"
                  :key="header.key"
                  class="p-3 text-center border-b border-r border-slate-100 font-black"
                  :class="header.key === 'saleprice5' ? 'text-slate-500 bg-slate-50/30' : 'text-[#0D95DA] bg-blue-50/30'"
                >
                  ฿{{ formatNumber(getHeaderPrice(product, header.key)) }}
                </td>

                <td class="p-3 border-b border-r border-slate-100 text-center">
                  <input
                    v-model.number="cartQuantities[product.code || '']"
                    type="number"
                    :min="product.packQty"
                    class="w-16 p-1.5 border border-slate-200 rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-blue-100"
                    :placeholder="String(product.packQty)"
                  >
                </td>

                <td class="p-3 text-center border-b sticky right-0 z-20 bg-white group-hover:bg-slate-50 border-l-2 border-l-slate-300">
                  <button
                    v-if="product.isInStock"
                    class="bg-[#0D95DA] text-white p-2.5 rounded-xl hover:bg-[#004a85] transition-all flex items-center justify-center gap-1.5 w-full active:scale-95 shadow-sm"
                    @click="handleAdd(product)"
                  >
                    <Icon icon="mdi:cart-plus" class="w-4 h-4" />
                    <span class="text-[10px] font-black uppercase">เปิดบิล</span>
                  </button>
                  <span
                    v-else
                    class="text-[10px] font-bold underline text-slate-400 hover:text-blue-500 cursor-pointer"
                    @click="openNotifyModal(product as any)"
                  >แจ้งเตือนเมื่อมีสินค้า</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ProductCard v-for="product in rows" :key="product.code" :product="product as any" view-mode="grid" />
        </div>
      </div>
    </Transition>

    <ModalStockNotify
      v-model="showNotifyModal"
      v-model:form="notifyForm"
      :product="targetProduct"
      :is-submitted="isSubmitted"
      :is-email-valid="isEmailValid"
      :is-tel-valid="isTelValid"
      :is-success="isSuccess"
      @submit="handleNotifySubmit"
      @reset-all="resetNotifyState"
    />
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.sticky { background-clip: padding-box; }
</style>
<script setup lang="ts">
import { useMockPO } from '@/composables/po/useMockPO';
import { usePOFooterHelpers } from '@/composables/po/usePOFooterHelpers';
import { usePOPricing } from '@/composables/po/usePOPricing';

definePageMeta({
  middleware: 'po-owner',
});

const route = useRoute();
const { userOrders } = useMockPO();
const { formatNumber, formatThaiDate } = usePOFooterHelpers();
const { getOrderSubtotal, getVat, getGrandTotal } = usePOPricing();

// 🟢 1. ดึงข้อมูล PO จาก ID ใน URL
const poId = computed(() => route.params.id as string);
const po = computed(() => userOrders.value.find((order) => order.id === poId.value));

useHeadSafe({
  meta: [
    { name: 'cache-control', content: 'no-store, no-cache, must-revalidate' },
    { name: 'pragma', content: 'no-cache' },
    { name: 'expires', content: '0' },
  ],
});

useSeoMeta({
  title: () => `PO #${poId.value} | Order Details`,
  description: () => `Securely view purchase order ${poId.value}.`,
  ogTitle: () => `PO #${poId.value} | Order Details`,
  ogDescription: () => `Secure access to purchase order ${poId.value}.`,
  robots: 'noindex, nofollow',
});

// 🟢 2. คำนวณราคากลาง (Shared Calculations)
// หน้าลูก (index, address, payment) จะใช้ค่าชุดเดียวกันจากที่นี่
const subtotal = computed(() => {
  return getOrderSubtotal(po.value);
});

const vat = computed(() => getVat(subtotal.value));
const grandTotal = computed(() => getGrandTotal(subtotal.value));

// 🟢 3. Helper Functions สำหรับจัดการ Format
const formatPrice = (val: number) => formatNumber(val);

const formatDate = (dateStr: string , timeStr: boolean) => {
  return formatThaiDate(dateStr, timeStr);
};

const removePOItem = (productId: number) => {
  if (po.value) {
    po.value.items = po.value.items.filter((item) => item.product.id !== productId);
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-2 md:p-4">
    <div class="max-w-350 mx-auto w-full">

      <NuxtPage 
        :po="po" 
        :subtotal="subtotal"
        :vat="vat"
        :grand-total="grandTotal"
        :format-price="formatPrice"
        :format-date="formatDate"
        :remove-po-item="removePOItem"
      />

    </div>
  </div>
</template>

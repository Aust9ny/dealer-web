<script setup lang="ts">
import { useMockPO } from '@/composables/useMockPO';

const route = useRoute();
const { getPOById } = useMockPO();

// 🟢 1. ดึงข้อมูล PO จาก ID ใน URL
const poId = computed(() => route.params.id as string);
const po = ref(getPOById(poId.value));

// 🟢 2. คำนวณราคากลาง (Shared Calculations) - ปรับปรุงใหม่
// หน้าลูก (index, address, payment) จะใช้ค่าชุดเดียวกันจากที่นี่
const subtotal = computed(() => {
  if (!po.value) return 0;
  
  return po.value.items.reduce((sum, item) => {
    const price = item.priceAtPurchase;
    const orderQty = item.quantity || 0;
    const stockQty = item.product.stock || 0;
    
    // 💡 Logic: ใช้จำนวนที่น้อยกว่าระหว่าง "จำนวนที่สั่ง" กับ "จำนวนที่มีในสต็อก"
    // ถ้าสต็อกเป็น 0 หรือติดลบ (สินค้าหมด) ยอดจะเป็น 0 ทันที
    const actualQty = Math.max(0, Math.min(orderQty, stockQty));
    
    return sum + (price * actualQty);
  }, 0);
});

const vat = computed(() => subtotal.value * 0.07);
const grandTotal = computed(() => subtotal.value + vat.value);

// 🟢 3. Helper Functions สำหรับจัดการ Format
const formatPrice = (val: number) => new Intl.NumberFormat('th-TH').format(val);

const formatDate = (dateStr: string , timeStr: boolean) => {
  if (!dateStr) return '';
  if (!timeStr) return new Intl.DateTimeFormat('th-TH', { 
    dateStyle: 'short', 
    // timeStyle: 'short' 
  }).format(new Date(dateStr));
  if (timeStr) return new Intl.DateTimeFormat('th-TH', { 
    dateStyle: 'short', 
    timeStyle: 'medium' 
  }).format(new Date(dateStr));
};

const removePOItem = (productId: number) => {
  if (po.value) {
    po.value.items = po.value.items.filter(item => item.product.id !== productId);
  }
};

// 🟢 4. Error Handling กรณีไม่พบ PO
if (!po.value) {
  throw createError({ statusCode: 404, statusMessage: 'ไม่พบรายการใบสั่งซื้อที่คุณต้องการ' });
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-2 md:p-4 pt-2 md:pt-4 pb-40 md:pb-32">
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

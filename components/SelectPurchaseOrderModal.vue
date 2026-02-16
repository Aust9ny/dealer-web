<script setup lang="ts">
import { ref, computed } from 'vue';
import { useScrollLock } from '@/composables/useScrollLock';
import type { PurchaseOrder } from '@/types/purchase-order';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const close = () => {
  emit('update:modelValue', false);
};

const isOpen = computed(() => props.modelValue);
useScrollLock(isOpen);

// ✅ format เวลาไทย
const formatThaiTime = (value: string) => {
  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: 'Asia/Bangkok'
  }).format(new Date(value));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(value);
};

// ✅ ตัวอย่างข้อมูลแบบ ISO
const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO123455', amount: 135185, createdAt: '2026-02-16T08:30:00Z' },
  { id: 'PO123456', amount: 243510, createdAt: '2026-02-16T09:15:00Z' },
  { id: 'PO123454', amount: 15200, createdAt: '2026-02-15T11:45:00Z' },
  { id: 'PO123453', amount: 8900, createdAt: '2026-02-14T13:20:00Z' },
  { id: 'PO123452', amount: 8900, createdAt: '2026-02-14T14:00:00Z' }
];

const selected = ref(purchaseOrders[0]);

// ✅ ส่ง createdAt ไปหน้า category
const handleContinue = () => {
  router.push({
    path: '/category',
    query: {
      id: selected.value.id,
      amount: selected.value.amount.toString(),
      createdAt: selected.value.createdAt
    }
  });

  close();
};
</script>


<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-[120] flex items-start justify-center pt-20"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40" @click="close" />

    <!-- Modal -->
    <div
      class="relative w-[640px] max-w-[95vw] bg-white rounded-2xl shadow-2xl p-6 border border-slate-300 border-t-10 border-t-primary"
    >
      <h2 class="text-lg font-bold text-center mb-6">
        เลือกใบสั่งซื้อ ({{ purchaseOrders.length }})
      </h2>

      <!-- List -->
      <div class="p-3 max-h-[500px] overflow-y-auto">
        <div
          v-for="po in purchaseOrders"
          :key="po.id"
          class="px-4 py-3 rounded-lg cursor-pointer text-sm transition flex justify-between items-center"
          :class="
            selected.id === po.id
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-slate-100 text-slate-700'
          "
          @click="selected = po"
        >
          <span>
            #{{ po.id }} | {{ formatThaiTime(po.createdAt) }} |
            {{ formatCurrency(po.amount) }}
          </span>
        </div>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-2 gap-4 mt-6">
        <button
          class="w-full py-3 rounded-xl bg-slate-200 text-slate-600 hover:bg-slate-300 transition font-medium"
          @click="close"
        >
          ยกเลิก
        </button>
        <button
          class="w-full py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition font-medium flex items-center justify-center gap-2"
          @click="handleContinue"
        >
          ดำเนินการต่อ
          <span>›</span>
        </button>
      </div>
    </div>
  </div>
</template>

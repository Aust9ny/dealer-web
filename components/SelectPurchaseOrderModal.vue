<script setup lang="ts">
import { ref, computed } from 'vue';
import { useScrollLock } from '@/composables/useScrollLock';
import { useRouter } from 'vue-router';
import { useMockPO } from '@/composables/useMockPO';
import { usePOFooterHelpers } from '@/composables/usePOFooterHelpers';

const router = useRouter();
const { formatCurrency, formatThaiDateTime } = usePOFooterHelpers();

// ✅ ดึงข้อมูลจาก composable (แหล่งเดียว)
const { getAllPO } = useMockPO();
const purchaseOrders = getAllPO();

// ✅ ป้องกันกรณี array ว่าง
const selected = ref(purchaseOrders.length ? purchaseOrders[0] : null);

const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'update:modelValue', value: boolean): void
}>();

const close = () => {
  emit('update:modelValue', false);
};

const isOpen = computed(() => props.modelValue);
useScrollLock(isOpen);

// มี PO ไหม
const hasPO = computed(() => purchaseOrders.length > 0);
const handleContinue = () => {
  if (!hasPO.value) {
    router.push('/category'); // หรือ path ที่ใช้สร้าง PO ใหม่
    close();
    return;
  }
  if (!selected.value) return;
  router.push(`/category/${selected.value.id}`);
  close();
};
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-120 flex items-start justify-center pt-20"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40" @click="close" />

    <!-- Modal -->
    <div
      class="relative w-160 max-w-[95vw] bg-white rounded-2xl shadow-2xl p-6 border border-slate-300 border-t-10 border-t-primary"
    >
      <h2 class="text-lg font-bold text-center mb-6">
        เลือกใบสั่งซื้อ ({{ purchaseOrders.length }})
      </h2>

        <!-- List -->
        <div class="p-3 max-h-[50vh] md:max-h-125 overflow-y-auto border border-slate-200 rounded-lg">        <div
          v-for="po in purchaseOrders"
          :key="po.id"
          class="px-4 py-3 rounded-lg cursor-pointer text-sm transition flex justify-between items-center"
          :class="
            selected?.id === po.id
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-slate-100 text-slate-700'
          "
          @click="selected = po"
        >
          <span>
            #{{ po.id }} |
            {{ formatThaiDateTime(po.createdAt) }} |
            {{ formatCurrency(po.totalAmount) }}
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
          class="w-full py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          :disabled="hasPO && !selected"
          @click="handleContinue"
        >
          {{ hasPO ? 'ดำเนินการต่อ' : 'สร้างใบสั่งซื้อใหม่' }}
          <span v-if="hasPO">›</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useScrollLock } from '@/composables/shared/useScrollLock';
import { useRouter } from 'vue-router';
import { useMockPO } from '@/composables/po/useMockPO';
import { usePOFooterHelpers } from '@/composables/po/usePOFooterHelpers';
import { Icon } from '@iconify/vue';

const router = useRouter();
const { formatCurrency, formatThaiDateTime } = usePOFooterHelpers();

// ✅ ดึงเฉพาะ PO ของผู้ใช้ที่ล็อกอิน
const { userOrders } = useMockPO();
const purchaseOrders = computed(() => userOrders.value);

// ✅ ป้องกันกรณี array ว่าง
const selected = ref(purchaseOrders.value.length ? purchaseOrders.value[0] : null);

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
const hasPO = computed(() => purchaseOrders.value.length > 0);

watch(purchaseOrders, (orders) => {
  if (!orders.length) {
    selected.value = null;
    return;
  }

  if (!selected.value || !orders.some(po => po.id === selected.value?.id)) {
    selected.value = orders[0];
  }
}, { immediate: true });
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
        <div class="p-3 h-[50vh] md:h-125 overflow-y-auto border border-slate-200 rounded-lg">
          <template v-if="hasPO">
            <div
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
          </template>

          <div
            v-else
            class="h-full rounded-lg border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-center px-6"
          >
            <Icon icon="mdi:file-document-outline" class="w-12 h-12 text-slate-300 mb-3" />
            <p class="text-base font-black text-slate-700">ยังไม่มีใบสั่งซื้อ</p>
            <p class="text-sm text-slate-400 mt-1">เริ่มสร้างใบสั่งซื้อใหม่เพื่อดำเนินการต่อ</p>
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

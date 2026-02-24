<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useMockPO } from '@/composables/useMockPO';
import { Icon } from '@iconify/vue';
import { useLoading } from '@/composables/useLoading';

const { isLoading, startLoading } = useLoading();
const router = useRouter();

const route = useRoute();
const { getPOById } = useMockPO();

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));
const hasPO = computed(() => !!po.value);
const goToPO = () => {
  if (!hasPO.value) {
    router.push('/category'); // หน้าเริ่มสร้างใหม่
    return;
  }

  startLoading();

  setTimeout(() => {
    router.push(`/po/${po.value?.id}`);
  }, 1500);
};
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(value);
};

const formatThaiDateTime = (value: string) => {
  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(value));
};
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-99 border-t-4 border-t-primary"
  >
    <div
      class="max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-4 flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between"
    >
      <!-- ซ้าย -->
      <div
        class="flex items-center gap-3 md:gap-4 md:flex-row flex-col md:items-center text-center md:text-left"
      >
        <div
          class="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0"
        >
          <Icon
            icon="mdi:file-document-check"
            class="w-5 h-5 md:w-7 md:h-7 text-[#0D95DA]"
          />
        </div>

        <div v-if="hasPO">
          <div
            class="font-black text-sm md:text-lg text-slate-800 uppercase tracking-tight"
          >
            #{{ po?.id }}
          </div>
          <div
            class="text-[11px] md:text-sm text-slate-400 font-medium lowercase"
          >
            {{ formatThaiDateTime(po?.createdAt ?? "") }}
          </div>
        </div>

        <div v-else class="flex flex-col">
          <div
            class="font-extrabold text-base md:text-xl text-slate-800 tracking-tight"
          >
            ยังไม่มีใบสั่งซื้อ
          </div>
          <div class="text-xs md:text-base text-slate-500 font-medium mt-1">
            กรุณาสร้างใบสั่งซื้อใหม่
          </div>
        </div>
      </div>

      <!-- ขวา -->
      <div
        class="flex flex-col md:flex-row items-center gap-3 md:gap-8 w-full md:w-auto text-center md:text-right"
      >
        <div v-if="hasPO" class="leading-tight">
          <div
            class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            ยอดรวมสุทธิทั้งหมด:
          </div>
          <div
            class="text-xl md:text-3xl font-black text-[#2D5A9E] wrap-break-word"
          >
            {{ formatCurrency(po?.totalAmount ?? 0) }}
          </div>
          <div class="hidden md:block text-[10px] text-slate-400 font-medium">
            (ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)
          </div>
        </div>

        <button
          class="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[#2D5A9E] text-white rounded-xl font-black text-base md:text-base hover:bg-[#1A3D6E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed mx-auto md:mx-0"
          :disabled="hasPO && isLoading"
          @click="goToPO"
        >
          <template v-if="hasPO">
            <template v-if="isLoading">
              <Icon
                icon="mdi:loading"
                class="w-4 h-4 md:w-5 md:h-5 animate-spin"
              />
              <span class="hidden md:inline">กำลังโหลด...</span>
            </template>
            <template v-else>
              ตรวจสอบรายการ
              <Icon icon="mdi:chevron-right" class="w-4 h-4 md:w-5 md:h-5" />
            </template>
          </template>

          <template v-else>
            สร้างใหม่
            <Icon icon="mdi:plus" class="w-4 h-4 md:w-5 md:h-5" />
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
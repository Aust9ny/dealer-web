<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useMockPO } from '@/composables/po/useMockPO';
import { useLoading } from '@/composables/shared/useLoading';
import { usePOFooterHelpers } from '@/composables/po/usePOFooterHelpers';
import { usePOPricing } from '@/composables/po/usePOPricing';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { formatCurrency, formatThaiDateTime, runWithLoading } = usePOFooterHelpers();
const { getOrderSubtotal, getGrandTotal } = usePOPricing();
const { getPOById } = useMockPO();

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));
const displayTotal = computed(() => getGrandTotal(getOrderSubtotal(po.value)));

const goToPayment = async () => {
  if (!po.value) return;
  await runWithLoading({ startLoading, stopLoading }, async () => {
    await router.push(`/po/${po.value?.id}/payment`);
  });
};

const saveDraft = async () => {
  if (!po.value) return;
  await runWithLoading({ startLoading, stopLoading }, async () => {
    await router.push(`/po/${po.value?.id}`);
  });
};
</script>

<template>
  <div
    v-if="po"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-99 border-t-4 border-t-primary"
  >
    <div
      class="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 justify-between"
    >
      <div class="flex items-center gap-3 md:gap-4">
        <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
          <Icon icon="mdi:file-document-check" class="w-6 h-6 md:w-7 md:h-7 text-[#0D95DA]" />
        </div>

        <div>
          <div class="font-black text-base md:text-lg text-slate-800 uppercase tracking-tight">
            #{{ po.id }}
          </div>
          <div class="text-xs md:text-sm text-slate-400 font-medium lowercase">
            {{ formatThaiDateTime(po.createdAt) }}
          </div>
        </div>
      </div>

      <div class="flex items-end md:items-center gap-3 md:gap-8 w-full md:w-auto justify-between">
        <div class="text-right leading-tight">
          <div class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
            ยอดรวมสุทธิทั้งหมด:
          </div>
          <div class="text-xl md:text-3xl font-black text-[#2D5A9E]">
            {{ formatCurrency(displayTotal) }}
          </div>
          <div class="hidden md:block text-[10px] text-slate-400 font-medium">
            (ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)
          </div>
        </div>

        <div class="flex flex-col gap-2 min-w-42 md:min-w-55">
          <button
            class="px-4 md:px-8 py-2.5 md:py-3 bg-[#2D5A9E] text-white rounded-xl font-black hover:bg-[#1A3D6E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-60"
            :disabled="isLoading"
            @click="goToPayment"
          >
            <template v-if="isLoading">
              <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
              กำลังดำเนินการ...
            </template>
            <template v-else>
              ชำระเงินทันที
              <Icon icon="mdi:chevron-right" class="w-5 h-5" />
            </template>
          </button>

          <button
            class="px-3 md:px-4 py-2 text-[11px] md:text-xs font-bold bg-white text-[#0D95DA] border border-[#0D95DA] rounded-xl hover:bg-blue-50 transition uppercase disabled:opacity-60"
            :disabled="isLoading"
            @click="saveDraft"
          >
            บันทึกใบจอง
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

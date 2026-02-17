<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useMockPO } from '@/composables/useMockPO';
import { Icon } from '@iconify/vue';

const router = useRouter();
const route = useRoute();
const { getPOById } = useMockPO();

/**
 * 🟢 FLOW STATE MANAGEMENT
 * currentStep: Tracks 1 (Check), 2 (Address), or 3 (Payment)
 * nextStep: Moves forward
 * prevStep: Moves backward (Added for Step 3 navigation)
 */
const { currentStep, nextStep, prevStep } = usePOFlow(); 

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));

/**
 * 🟢 PRIMARY ACTION HANDLER
 * This handles the logic for the main blue button.
 */
const handleMainAction = () => {
  if (currentStep.value < 3) {
    // Progresses the UI from Table -> Address -> Payment
    nextStep(); 
  } else {
    // This is where you will eventually trigger the final API call
    console.log('Final Payment Triggered');
  }
};

/**
 * 🟢 SECONDARY ACTION HANDLER
 * Updated to allow navigating back through the steps.
 */
const handleSecondaryAction = () => {
  if (currentStep.value > 1) {
    // 🟢 ALLOW GO BACK: Moves from Payment back to Address, or Address to Table
    prevStep();
  } else {
    // If on Step 1, navigate back to the product catalog
    const from = route.query.from as string;

    if (from && from.startsWith('/category')) {
      router.push(from);
    } else if (po.value?.id) {
      router.push(`/category/${po.value.id}`);
    } else {
      router.push('/category');
    }
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
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
    v-if="po"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-[150] border-t-4 border-t-[#0D95DA]"
  >
    <div class="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
      
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
          <Icon icon="mdi:file-document-check" class="w-7 h-7 text-[#0D95DA]" />
        </div>
        <div>
          <div class="font-black text-lg text-slate-800 uppercase tracking-tight">#{{ po.id }}</div>
          <div class="text-sm text-slate-400 font-medium lowercase">
            {{ formatThaiDateTime(po.createdAt) }}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-8">
        <div class="text-right leading-tight">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ยอดรวมสุทธิทั้งหมด:</div>
          <div class="text-3xl font-black text-[#2D5A9E]">
            {{ formatCurrency(po.totalAmount) }}
          </div>
          <div class="text-[10px] text-slate-400 font-medium">
            (ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)
          </div>
        </div>
        
        <div class="flex flex-col gap-2 min-w-[220px]">
          <button
            class="px-8 py-3 bg-[#2D5A9E] text-white rounded-xl font-black hover:bg-[#1A3D6E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            @click="handleMainAction"
          >
            {{ currentStep === 3 ? 'ยืนยันการชำระเงิน' : currentStep === 2 ? 'ชำระเงินทันที' : 'ดำเนินการต่อ' }}
            <Icon icon="mdi:chevron-right" class="w-5 h-5" />
          </button>

          <button
            class="px-4 py-2 text-xs font-bold bg-white text-[#0D95DA] border border-[#0D95DA] rounded-xl hover:bg-blue-50 transition uppercase"
            @click="handleSecondaryAction"
          >
            {{ currentStep > 1 ? 'ย้อนกลับ' : 'เลือกสินค้าเพิ่มเติม' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useMockPO } from '@/composables/useMockPO';
import { Icon } from '@iconify/vue';
import { useLoading } from '@/composables/useLoading';

const { isLoading, startLoading, stopLoading } = useLoading();
const router = useRouter();
const route = useRoute();
const { getPOById } = useMockPO();

// เรายังเก็บ currentStep ไว้เพื่อแสดงข้อความบนปุ่ม แต่การย้ายหน้าจะใช้ Router แทน
const { currentStep } = usePOFlow(); 

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));

// ... (Logic คำนวณราคาคงเดิม) ...
const subtotal = computed(() => {
  if (!po.value) return 0;
  return po.value.items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
});
const vat = computed(() => subtotal.value * 0.07);
const grandTotal = computed(() => subtotal.value + vat.value);

/**
 * 🟢 PRIMARY ACTION HANDLER
 * เปลี่ยนจากการเรียก nextStep() เป็น router.push()
 */
const handleMainAction = () => {
  startLoading();
  
  setTimeout(() => {
    if (currentStep.value === 1) {
      // หน้า 1 (Check) -> ไปหน้า Address
      router.push(`/po/${poId.value}/address`);
    } else if (currentStep.value === 2) {
      // หน้า 2 (Address) -> ไปหน้า Payment
      router.push(`/po/${poId.value}/payment`);
    } else {
      // หน้า 3 (Payment) -> ยืนยันการชำระเงิน
      // console.log('Final Payment Triggered');
    }
    stopLoading();
  }, 500);
};

/**
 * 🟢 SECONDARY ACTION HANDLER
 * เปลี่ยนจากการเรียก prevStep() เป็น router.push()
 */
const handleSecondaryAction = () => {
  startLoading();

  setTimeout(() => {
    if (currentStep.value === 3) {
      // หน้า 3 (Payment) -> ถอยกลับไป Address
      router.push(`/po/${poId.value}/address`);
    } else if (currentStep.value === 2) {
      // หน้า 2 (Address) -> ถอยกลับไปหน้าแรก (Index)
      router.push(`/po/${poId.value}`);
    } else {
      // หน้า 1 (Check) -> กลับไปเลือกสินค้าเพิ่ม (Logic เดิมของคุณ)
      const from = route.query.from as string;
      if (from && from.startsWith('/category')) {
        router.push(from);
      } else if (po.value?.id) {
        router.push(`/category/${po.value.id}`);
      } else {
        router.push('/category');
      }
    }
    stopLoading();
  }, 300);
};

// ... (formatCurrency, formatThaiDateTime คงเดิม) ...
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
  <div v-if="po" class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-99 border-t-4 border-t-primary ">
    <div class="max-w-350 mx-auto px-6 py-4 flex items-center justify-between">
      
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
            {{ formatCurrency(grandTotal) }}
          </div>
          <div class="text-[10px] text-slate-400 font-medium">(ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)</div>
        </div>
        
        <div class="flex flex-col gap-2 min-w-55">
          <button
            class="px-8 py-3 bg-[#2D5A9E] text-white rounded-xl font-black hover:bg-[#1A3D6E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-60"
            :disabled="isLoading"
            @click="handleMainAction"
          >
            <template v-if="isLoading">
              <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
              กำลังดำเนินการ...
            </template>
            <template v-else>
              {{ currentStep === 3 ? 'ยืนยันการชำระเงิน' : currentStep === 2 ? 'ชำระเงินทันที' : 'ดำเนินการต่อ' }}
              <Icon icon="mdi:chevron-right" class="w-5 h-5" />
            </template>
          </button>
          
          <button
            class="px-4 py-2 text-xs font-bold bg-white text-[#0D95DA] border border-[#0D95DA] rounded-xl hover:bg-blue-50 transition uppercase disabled:opacity-60"
            :disabled="isLoading"
            @click="handleSecondaryAction"
          >
            {{ currentStep > 1 ? 'ย้อนกลับ' : 'เลือกสินค้าเพิ่มเติม' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
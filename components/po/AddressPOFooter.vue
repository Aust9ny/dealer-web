<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useMockPO } from '@/composables/po/useMockPO';
import { Icon } from '@iconify/vue';
import { useLoading } from '@/composables/shared/useLoading';
import { usePOFooterHelpers } from '@/composables/po/usePOFooterHelpers';
import { usePOPricing } from '@/composables/po/usePOPricing';
import { usePOFlow } from '@/composables/po/usePOFlow';
import { usePOCheckoutState } from '@/composables/po/usePOCheckoutState';



const { isLoading, startLoading, stopLoading } = useLoading();
const { formatCurrency, formatThaiDateTime, runWithLoading } = usePOFooterHelpers();
const { getOrderSubtotal, getGrandTotal } = usePOPricing();
const router = useRouter();
const route = useRoute();
const { getPOById } = useMockPO();

// เรายังเก็บ currentStep ไว้เพื่อแสดงข้อความบนปุ่ม แต่การย้ายหน้าจะใช้ Router แทน
const { currentStep } = usePOFlow();
const { state: checkoutState, isAddressReady, setAddressValidationAttempted } = usePOCheckoutState();

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));

// ... (Logic คำนวณราคาคงเดิม) ...
const subtotal = computed(() => {
  return getOrderSubtotal(po.value);
});
const grandTotal = computed(() => getGrandTotal(subtotal.value));
const isStepOneLocked = computed(
  () => currentStep.value === 1 && !checkoutState.value.stockChecked,
);
const missingSelectionCount = computed(() => {
  const state = checkoutState.value;
  const options = [
    state.shippingAddressSelected,
    state.taxAddressSelected,
    state.deliveryMethodSelected,
    state.paymentMethodSelected,
  ];
  return options.filter((selected) => !selected).length;
});

/**
 * 🟢 PRIMARY ACTION HANDLER
 * เปลี่ยนจากการเรียก nextStep() เป็น router.push()
 */
const handleMainAction = async () => {
  if (isStepOneLocked.value) return;
  if (currentStep.value === 2) {
    setAddressValidationAttempted(true);
    if (!isAddressReady.value) return;
  }

  await runWithLoading({ startLoading, stopLoading }, async () => {
    if (currentStep.value === 1) {
      // หน้า 1 (Check) -> ไปหน้า Address
      await router.push(`/po/${poId.value}/address`);
    } else if (currentStep.value === 2) {
      // หน้า 2 (Address) -> ไปหน้า Payment
      setAddressValidationAttempted(false);
      await router.push(`/po/${poId.value}/payment`);
    } else {
      // หน้า 3 (Payment) -> ยืนยันการชำระเงิน
      // console.log('Final Payment Triggered');
    }
  });
};

/**
 * 🟢 SECONDARY ACTION HANDLER
 * เปลี่ยนจากการเรียก prevStep() เป็น router.push()
 */
const handleSecondaryAction = async () => {
  await runWithLoading({ startLoading, stopLoading }, async () => {
    if (currentStep.value === 3) {
      // หน้า 3 (Payment) -> ถอยกลับไป Address
      await router.push(`/po/${poId.value}/address`);
    } else if (currentStep.value === 2) {
      // หน้า 2 (Address) -> ถอยกลับไปหน้าแรก (Index)
      await router.push(`/po/${poId.value}`);
    } else {
      // หน้า 1 (Check) -> กลับไปเลือกสินค้าเพิ่ม (Logic เดิมของคุณ)
      const from = route.query.from as string;
      if (from && from.startsWith('/category')) {
        await router.push(from);
      } else if (po.value?.id) {
        await router.push(`/category/${po.value.id}`);
      } else {
        await router.push('/category');
      }
    }
  });
};
</script>

<template>
  <div
    v-if="po"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-99 border-t-4 border-t-primary"
  >
    <div
      class="max-w-350 mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between"
    >
      <!-- ซ้าย -->
      <div
        class="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left"
      >
        <div
          class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100"
        >
          <Icon
            icon="mdi:file-document-check"
            class="w-6 h-6 md:w-7 md:h-7 text-[#0D95DA]"
          />
        </div>

        <div class="text-center md:text-left">
          <div
            class="font-black text-base md:text-lg text-slate-800 uppercase tracking-tight"
          >
            #{{ po.id }}
          </div>
          <div class="text-xs md:text-sm text-slate-400 font-medium lowercase">
            {{ formatThaiDateTime(po.createdAt) }}
          </div>
        </div>
      </div>

      <!-- ขวา -->
      <div class="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
        <!-- ราคา -->
        <div class="text-center md:text-right leading-tight">
          <div
            class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            ยอดรวมสุทธิทั้งหมด:
          </div>
          <div class="text-2xl md:text-3xl font-black text-[#2D5A9E]">
            {{ formatCurrency(grandTotal) }}
          </div>
          <div class="hidden md:block text-[10px] text-slate-400 font-medium">
            (ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)
          </div>
        </div>

        <!-- ปุ่ม -->
        <div class="flex flex-col gap-2 w-full md:w-auto">
          <button
            class="w-full md:w-auto px-6 md:px-8 py-3 bg-[#2D5A9E] text-white rounded-xl font-black hover:bg-[#1A3D6E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-60"
            :disabled="isLoading || isStepOneLocked"
            @click="handleMainAction"
          >
            <template v-if="isLoading">
              <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
              กำลังดำเนินการ...
            </template>
            <template v-else>
              {{
                currentStep === 3
                  ? "ยืนยันการชำระเงิน"
                  : currentStep === 2
                    ? "ชำระเงินทันที"
                    : "ดำเนินการต่อ"
              }}
              <Icon icon="mdi:chevron-right" class="w-5 h-5" />
            </template>
          </button>

          <button
            class="w-full md:w-auto px-4 py-2 text-xs font-bold bg-white text-[#0D95DA] border border-[#0D95DA] rounded-xl hover:bg-blue-50 transition uppercase disabled:opacity-60"
            :disabled="isLoading"
            @click="handleSecondaryAction"
          >
            {{ currentStep > 1 ? "ย้อนกลับ" : "เลือกสินค้าเพิ่มเติม" }}
          </button>

          <p v-if="isStepOneLocked" class="text-[11px] font-bold text-red-500 text-center md:text-right">
            กรุณากด "ตรวจสอบสต็อก" ก่อนดำเนินการต่อ
          </p>
          <p
            v-if="currentStep === 2 && checkoutState.addressValidationAttempted && !isAddressReady"
            class="text-[11px] font-bold text-red-500 text-center md:text-right"
          >
            กรุณาเลือกข้อมูลให้ครบ 4 รายการก่อนชำระเงิน (ขาด {{ missingSelectionCount }} รายการ)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

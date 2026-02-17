<script setup lang="ts">
// 🟢 1. Import your three modular files
import OrderCheck from './OrderCheck.vue';
import AddressDetail from './AddressDetail.vue';
import Payment from './Payment.vue';

import { useMockPO } from '@/composables/useMockPO';

const route = useRoute();
const { getPOById } = useMockPO();

// 🟢 2. Use your flow composable to track the state
const { currentStep } = usePOFlow(); 

const poId = computed(() => route.params.id as string);
const po = ref(getPOById(poId.value));

// 🟢 3. Shared Calculations (Passed down as props)
const subtotal = computed(() => {
  if (!po.value) return 0;
  return po.value.items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
});
const vat = computed(() => subtotal.value * 0.07);
const grandTotal = computed(() => subtotal.value + vat.value);

const formatPrice = (val: number) => new Intl.NumberFormat('th-TH').format(val);
const formatDate = (dateStr: string) => new Intl.DateTimeFormat('th-TH', { 
  dateStyle: 'short', timeStyle: 'short' 
}).format(new Date(dateStr));
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-2 md:p-4 pt-24 pb-32">
    <div class="max-w-350 mx-auto w-full">
      
      <OrderCheck 
        v-if="currentStep === 1" 
        :po="po" 
      />

      <AddressDetail
        v-else-if="currentStep === 2" 
        :po="po"
        :subtotal="subtotal"
        :vat="vat"
        :grand-total="grandTotal"
        :format-price="formatPrice"
        :format-date="formatDate"
      />

      <Payment
        v-else-if="currentStep === 3" 
        :po="po"
        :subtotal="subtotal"
        :vat="vat"
        :grand-total="grandTotal"
        :format-price="formatPrice"
        :format-date="formatDate"
      />

    </div>
    
    <POFlowFooter />
  </div>
</template>
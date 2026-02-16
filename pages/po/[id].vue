<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useMockPO } from '@/composables/useMockPO';

const route = useRoute();
const { getPOById } = useMockPO();

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(value);
};

const formatThaiDateTime = (value: string) => {
  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: 'Asia/Bangkok'
  }).format(new Date(value));
};
</script>

<template>
 <div>
  <div v-if="po" class="p-8 pb-32">
    {{ po }}
    <h1 class="text-2xl font-bold mb-2">
      #{{ po.id }}
    </h1>

    <div class="text-slate-500 mb-4">
      {{ formatThaiDateTime(po.createdAt) }}
    </div>

    <div class="text-xl font-bold text-primary">
      {{ formatCurrency(po.amount) }}
    </div>
  </div>

  <div v-else class="p-8 text-red-500">
    ไม่พบใบสั่งซื้อ
  </div>
  <SelectedPOFooter />
</div>
</template>

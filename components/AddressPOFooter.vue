<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useMockPO } from "@/composables/useMockPO";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const { getPOById } = useMockPO();
const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));
const goBack = () => {
  const from = route.query.from as string;

  if (from && from.startsWith('/category')) {
    router.push(from);
  } else if (po.value?.id) {
    router.push(`/category/${po.value.id}`);
  } else {
    router.push('/category');
  }
};


const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(value);
};

const formatThaiDateTime = (value: string) => {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Asia/Bangkok",
  }).format(new Date(value));
};
</script>

<template>
  <div
    v-if="po"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-99 border-t-4 border-t-primary"
  >
    <div
      class="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between"
    >
      <!-- ซ้าย -->
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
        >
          📄
        </div>

        <div>
          <div class="font-semibold text-lg text-slate-800">#{{ po.id }}</div>
          <div class="text-sm text-slate-500">
            {{ formatThaiDateTime(po.createdAt) }}
          </div>
        </div>
      </div>

      <!-- ขวา -->
      <div class="flex items-center gap-8">
        <div class="text-right">
          <div class="text-2xl text-slate-600">ยอดรวมสุทธิทั้งหมด:</div>
          <div class="text-xs text-slate-400">
            (ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)
          </div>
        </div>
        <div class="text-xl font-bold text-primary">
          {{ formatCurrency(po.totalAmount) }}
        </div>
        <div class="flex flex-col gap-2">
          <!-- ปุ่มหลัก -->
          <button
            class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            ดำเนินการต่อ
            <span>›</span>
          </button>

          <!-- ปุ่มรอง -->
          <button
            class="px-4 py-2 text-sm bg-white text-primary border border-primary rounded-xl hover:bg-primary/5 transition flex items-center justify-center gap-2"
            @click="goBack"
          >
            เลือกสินค้าเพิ่มเติม
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

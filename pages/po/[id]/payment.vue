<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  po: any;
  subtotal: number;
  vat: number;
  grandTotal: number;
  formatPrice: (val: number) => string;
  formatDate: (dateStr: string , showTime?: boolean) => string;
}>();

const getStockStatus = (item: any) => {
  const stock = item.product.stock || 0;
  if (stock <= 0)
    return {
      text: 'สินค้าหมด',
      colorClass: 'text-red-500',
      bgClass: 'bg-red-50',
    };
  if (stock < item.quantity)
    return {
      text: `สินค้าไม่พอ (เหลือ ${stock})`,
      colorClass: 'text-orange-500',
      bgClass: 'bg-orange-50',
    };
  return {
    text: 'พร้อมส่งครบ',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
  };
};

// const route = useRoute();
const router = useRouter();

// 🟢 Countdown Timer Logic
const minutes = ref(15);
const seconds = ref(0);

const timeLeft = computed(() => {
  return `${minutes.value.toString().padStart(2, '0')}:${seconds.value.toString().padStart(2, '0')}`;
});

let timer: any;
onMounted(() => {
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else if (minutes.value > 0) {
      minutes.value--;
      seconds.value = 59;
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

onUnmounted(() => clearInterval(timer));

const goBack = () => {
  // ย้อนกลับไปหน้าเลือกที่อยู่
  router.push(`/po/${props.po?.id}/address`);
};
</script>

<template>
  <div class="flex flex-col w-full">
<div class="w-full mb-4 md:mb-8 bg-white md:bg-transparent p-3 md:p-0 rounded-2xl shadow-sm md:shadow-none">
      <nav class="flex flex-col gap-4 w-full">
        <div class="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full">
          
          <div class="flex items-center gap-1 group  bg-white">
            <div class="flex border border-slate-300 p-1 pr-3 rounded-lg text-slate-300 shadow-2md py-2" @click="goBack">
              <div class="p-1.5 md:p-0 rounded-full group-hover:bg-blue-50 transition-colors justify-center items-center">
                <Icon
                  icon="mdi:chevron-left"
                  class="w-6 h-6 text-slate-400 group-hover:text-[#0D95DA] transition-all"
                />
              </div>
              <button
                class="text-slate-500 hover:text-[#0D95DA] transition-colors font-semibold text-sm md:text-base active:scale-95"
              >
                แก้ไขที่อยู่จัดส่ง / ภาษี
              </button>
            </div>
          </div>

          <div class="w-full md:w-auto flex justify-center md:justify-end pt-2 md:pt-0 border-t border-slate-100 md:border-none">
            <div class="w-full max-w-100 md:w-auto scale-95 md:scale-100 origin-center md:origin-right">
              <POStepper />
            </div>
          </div>

        </div>
      </nav>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
      <div class="lg:col-span-8 space-y-4 md:space-y-6">
        <div
          class="bg-white rounded-xl p-4 md:p-10 border border-t-10 border-t-primary border-slate-200 shadow-sm text-center"
        >
          <div class="max-w-sm mx-auto">
            <h2
              class="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight"
            >
              ชำระเงินผ่าน QR Code
            </h2>
            <p class="text-sm text-slate-400 mb-8 font-medium italic">
              กรุณาสแกน QR Code ด้านล่างเพื่อชำระเงิน
            </p>

            <div
              class="bg-white p-6 border-2 border-slate-100 rounded-3xl shadow-inner mb-6 relative group"
            >
              <div
                class="aspect-square bg-slate-100 rounded-xl flex items-center justify-center border-4 border-dashed border-slate-200"
              >
                  <Icon icon="mdi:qrcode-scan" class="w-24 h-24 md:w-32 md:h-32 text-slate-300" />
              </div>
              <div
                class="mt-4 flex items-center justify-center gap-2 text-red-500 font-black"
              >
                <Icon icon="mdi:clock-outline" class="w-5 h-5" />
                    <span class="text-base md:text-lg uppercase tracking-tighter"
                  >หมดอายุใน: {{ timeLeft }}</span
                >
              </div>
            </div>

            <div
              class="space-y-4 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100"
            >
              <div class="flex justify-between text-sm">
                <span class="font-bold text-slate-500">ชื่อบัญชี:</span>
                <span class="font-black text-slate-800"
                  >บมจ. แอดไวซ์ ไอที อินฟินิท</span
                >
              </div>
              <div class="flex justify-between text-sm">
                <span class="font-bold text-slate-500"
                  >จำนวนเงินที่ต้องชำระ:</span
                >
                <span class="text-xl font-black text-[#2D5A9E]"
                  >฿{{ formatPrice(grandTotal) }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-sm opacity-60"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <Icon icon="mdi:bank-outline" class="w-8 h-8 text-slate-400" />
              <div>
                <h3 class="font-black text-slate-800 uppercase">
                  โอนผ่านธนาคาร / ATM
                </h3>
                <p class="text-xs text-slate-400 font-medium italic">
                  ยืนยันยอดเงินภายใน 15-30 นาที
                </p>
              </div>
            </div>
            <button
              class="text-[#0D95DA] font-black text-xs underline uppercase"
            >
              เลือกใช้วิธีนี้
            </button>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 lg:sticky lg:top-24">
        <div class="lg:col-span-4 lg:sticky lg:top-24">
          <div
            class="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative StyledReceipt"
          >
            <div
              class="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-white border-t-10 border-t-primary"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100"
                >
                  <Icon
                    icon="mdi:file-document-edit-outline"
                    class="w-8 h-8 text-[#0D95DA]"
                  />
                </div>
                <div>
                  <h3
                    class="text-lg md:text-xl font-black text-slate-800 tracking-tighter uppercase"
                  >
                    #{{ po?.id }}
                  </h3>
                  <p
                    class="text-[12px] text-slate-400 font-bold uppercase tracking-widest"
                  >
                    {{ formatDate(po?.createdAt || "",true) }}
                  </p>
                </div>
              </div>
              <button
                class="p-3 text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <Icon icon="mdi:printer" class="w-6 h-6" />
              </button>
            </div>

            <div class="p-4 md:p-6 space-y-6">
              <div
                class="flex justify-between items-center border-b border-black pb-2"
              >
                <h4
                  class="text-sm font-black text-slate-800 uppercase tracking-tight"
                >
                  สรุปรายการสั่งซื้อ:
                </h4>
                <span class="text-sm font-black text-slate-800"
                  >{{ po?.items.length }} รายการ</span
                >
              </div>

              <div class="space-y-3">
                <div
                  v-for="item in po?.items"
                  :key="item.product.id"
                  class="flex gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100"
                >
                  <img
                    :src="item.product.image"
                    class="w-14 h-14 object-contain bg-white rounded-xl p-1 border border-slate-200 shrink-0"
                  >
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-xs font-bold text-slate-600 truncate uppercase"
                    >
                      {{ item.product.name }}
                    </p>
                    <p class="text-[10px] text-slate-400 mb-1">
                      {{ item.product.specs || "No specs" }}
                    </p>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-slate-400 font-bold"
                        >x{{ item.quantity }}</span
                      >
                      <div class="text-right">
                        <p class="text-[10px] font-black text-slate-800">
                          ฿{{
                            formatPrice(item.priceAtPurchase * item.quantity)
                          }}
                        </p>
                        <p
                          class="text-[9px] font-black uppercase tracking-tighter mt-1 px-1.5 py-0.5 rounded"
                          :class="[
                            getStockStatus(item).colorClass,
                            getStockStatus(item).bgClass,
                          ]"
                        >
                          {{ getStockStatus(item).text }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="bg-[#FFFBEB] rounded-2xl p-5 space-y-2 border border-[#FEF3C7]"
              >
                <div
                  class="flex justify-between text-xs font-bold text-slate-500"
                >
                  <span>ยอดค้างชำระเดิม:</span>
                  <span>฿0.0</span>
                </div>
                <div
                  class="flex justify-between text-xs font-bold text-slate-500"
                >
                  <span>ยอดสินค้าค้างส่ง (รอชำระ):</span>
                  <span>฿0.0</span>
                </div>
                <div
                  class="flex justify-between text-sm font-black text-slate-800 pt-1"
                >
                  <span>ยอดค้างชำระทั้งสิ้น:</span>
                  <span class="text-lg">฿{{ formatPrice(subtotal) }}</span>
                </div>
              </div>

              <div class="space-y-3 pt-2">
                <div
                  class="flex justify-between text-sm font-bold text-slate-400"
                >
                  <span>สินค้าทั้งหมด ({{ po?.items.length }} ชิ้น):</span>
                  <span class="text-slate-800 font-black"
                    >฿{{ formatPrice(subtotal + 4110) }}</span
                  >
                </div>

                <div
                  class="flex justify-between items-center text-sm font-bold text-slate-400 border-t border-dashed border-slate-200 pt-3"
                >
                  <div class="flex items-center gap-2">
                    <span>ส่วนลด:</span>
                    <span
                      class="bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-black italic tracking-widest uppercase"
                      >#DEALER2026</span
                    >
                  </div>
                  <span class="text-slate-800 font-black"
                    >-฿{{ formatPrice(4110) }}</span
                  >
                </div>

                <div
                  class="flex justify-between text-sm font-bold text-slate-400 pt-1"
                >
                  <span>ยอดก่อน Vat:</span>
                  <span class="text-slate-800 font-black"
                    >฿{{ formatPrice(subtotal - vat) }}</span
                  >
                </div>

                <div
                  class="flex justify-between text-sm font-bold text-slate-400"
                >
                  <span>ยอด Vat7%:</span>
                  <span class="text-slate-800 font-black"
                    >฿{{ formatPrice(vat) }}</span
                  >
                </div>
              </div>

              <div class="mt-4 border-t-2 border-black">
                <div
                  class="bg-blue-50/30 p-6 flex justify-between items-center rounded-b-2xl"
                >
                  <div class="flex flex-col">
                    <span
                      class="text-base font-black text-slate-800 uppercase tracking-tighter"
                      >ยอดรวมสุทธิทั้งหมด:</span
                    >
                    <span class="text-[10px] text-slate-400 font-medium italic"
                      >(ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)</span
                    >
                  </div>
                  <span class="text-3xl font-black text-[#2D5A9E]">
                    ฿{{ formatPrice(grandTotal) }}
                  </span>
                </div>
                <div class="border-b-4 border-black mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.StyledReceipt {
  position: relative;
}
</style>

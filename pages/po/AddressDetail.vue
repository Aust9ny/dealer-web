<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRoute , useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const goBack = () => {
  const from = route.query.from as string;

  if (from && from.startsWith('/category')) {
    router.push(from);
  } else if (props.po?.id) {
    router.push(`/category/${props.po?.id}`);
  } else {
    router.push('/category');
  }
};

// 🟢 Received Props from po/[id].vue
const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  po: any;
  subtotal: number;
  vat: number;
  grandTotal: number;
  // eslint-disable-next-line no-unused-vars
  formatPrice: (val: number) => string;
  // eslint-disable-next-line no-unused-vars
  formatDate: (dateStr: string) => string;
}>();
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="w-full mb-6">
      <nav class="flex items-center text-sm font-medium w-full">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1">
            <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300 rotate-180" />
            <button class="text-slate-500 hover:text-[#0D95DA] transition-colors font-bold" @click="goBack">
              เลือกสินค้าเพิ่ม
            </button>
          </div>
          
          <div class="flex items-center justify-end">
            <POStepper />
          </div>
        </div>
      </nav>
    </div>

    <div class="grid grid-cols-12 gap-6 items-start ">
      
      <div class="col-span-8 space-y-6">
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
            ที่อยู่ในการจัดส่งสินค้า / วิธีการจัดส่ง
          </h2>

          <div class="grid grid-cols-2 gap-4">
            <div class="border rounded-2xl p-6 bg-slate-50/50 relative">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">ที่อยู่จัดส่ง:</span>
                <button class="text-[#0D95DA] text-xs font-bold underline">แก้ไข</button>
              </div>
              <p class="font-black text-slate-800 text-sm">บริษัท แอดไวซ์ ไอที อินฟินิท จำกัด (มหาชน)</p>
              <p class="text-xs text-slate-500 mt-1">0821234568</p>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed">
                74/1 หมู่ 1 ต.ท่าอิฐ อ.ปากเกร็ด จ.นนทบุรี 11120
              </p>
            </div>

            <div class="border rounded-2xl p-6 bg-slate-50/50">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">วิธีการจัดส่ง:</span>
                <button class="text-[#0D95DA] text-xs font-bold underline">แก้ไข</button>
              </div>
              <p class="font-black text-[#0D95DA] text-sm ">TGM Dealer</p>
              <p class="text-[10px] text-emerald-600 font-black mt-2">ส่งด่วนวันถัดไป ก่อน 17.00 ฟรี</p>
              <p class="text-[9px] text-slate-400 mt-1 leading-tight">
                โอนชำระ + แนบสลิป ก่อน 12.00 น. *ส่งภายในวันถัดไป ก่อน 17.00 น.
              </p>
            </div>
          </div>

          <p class="text-[10px] text-red-500 mt-6 font-bold ">
            * กรณีสั่งซื้อสินค้าจำนวน 3 รายการ "มูลค่ารวม 10,000 บาทขึ้นไป" ต่อ 1 บิล
            สามารถเลือกวิธีการจัดส่งด่วนภายในวันได้
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">ที่อยู่ในการออกใบกำกับภาษี</h2>
          <div class="border rounded-2xl p-6 bg-slate-50/50">
            <div class="flex justify-between items-center mb-4">
              <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">ข้อมูลใบกำกับภาษี:</span>
              <button class="text-[#0D95DA] text-xs font-bold underline">แก้ไข</button>
            </div>
            <p class="font-black text-slate-800 text-sm">บริษัท แอดไวซ์ ไอที อินฟินิท จำกัด (มหาชน)</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">วิธีการชำระเงิน</h2>
          <div class="grid grid-cols-2 gap-4">
            <button class="border-2 border-[#0D95DA] bg-blue-50/50 rounded-2xl p-6 text-sm font-black text-[#0D95DA] flex flex-col items-center gap-2 transition-all">
              <Icon icon="mdi:bank-outline" class="w-8 h-8" />
              โอนผ่านธนาคาร / ATM
            </button>
            <button class="border-2 border-slate-100 rounded-2xl p-6 text-sm font-black text-slate-500 flex flex-col items-center gap-2 hover:bg-slate-50 transition-all">
              <Icon icon="mdi:qrcode-scan" class="w-8 h-8" />
              QR Code
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-4 sticky top-24">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative StyledReceipt">
          <div class="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/30">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100">
              <Icon icon="mdi:file-document-outline" class="w-7 h-7 text-[#0D95DA]" />
            </div>
            <div>
              <h3 class="font-black text-slate-800 uppercase tracking-tighter">#{{ po?.id }}</h3>
              <p class="text-[10px] text-slate-400 font-bold tracking-widest">{{ formatDate(po?.createdAt || '') }}</p>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-dashed pb-2">สรุปรายการสั่งซื้อ:</h4>
            
            <div class="space-y-4 max-h-75 overflow-y-auto scrollbar-thin pr-2">
              <div v-for="item in po?.items" :key="item.product.id" class="flex gap-3">
                <img :src="item.product.image" class="w-10 h-10 object-contain border p-1 rounded-lg bg-white shrink-0">
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-bold text-slate-800 line-clamp-1 truncate uppercase">{{ item.product.name }}</p>
                  <div class="flex justify-between items-center mt-1">
                    <span class="text-[10px] text-slate-400 font-bold">x{{ item.quantity }}</span>
                    <span class="text-[10px] font-black text-emerald-600">ได้รับสินค้าทุกชิ้น</span>
                  </div>
                  <p class="text-[10px] font-black text-slate-800 text-right mt-1">฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}</p>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-dashed space-y-2">
              <div class="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>ยอดค้างชำระเดิม:</span>
                <span>฿0.0</span>
              </div>
              <div class="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>ยอดสินค้าค้างส่ง (รอชำระ):</span>
                <span>฿0.0</span>
              </div>
              <div class="flex justify-between text-[11px] font-bold text-slate-800 uppercase tracking-tighter border-b pb-2">
                <span>ยอดค้างชำระทั้งสิ้น:</span>
                <span>฿{{ formatPrice(subtotal) }}</span>
              </div>

              <div class="flex justify-between text-[11px] font-bold text-slate-400 pt-2">
                <span>สินค้าทั้งหมด ({{ po?.items.length }} ชิ้น):</span>
                <span class="text-slate-800 font-black">฿{{ formatPrice(subtotal + 4110) }}</span>
              </div>
              <div class="flex justify-between items-center text-[11px] font-bold text-slate-400">
                <div class="flex items-center gap-1">
                  <span>ส่วนลด:</span>
                  <span class="bg-slate-100 text-slate-400 px-1 py-0.5 rounded border text-[9px] font-black italic">#DEALER2026</span>
                </div>
                <span class="text-slate-800 font-black">-฿4,110</span>
              </div>
              <div class="flex justify-between text-[11px] font-bold text-slate-400">
                <span>ยอดก่อน Vat:</span>
                <span class="text-slate-800 font-black">฿{{ formatPrice(subtotal - vat) }}</span>
              </div>
              <div class="flex justify-between text-[11px] font-bold text-slate-400">
                <span>ยอด Vat 7%:</span>
                <span class="text-slate-800 font-black">฿{{ formatPrice(vat) }}</span>
              </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 border-b-4 border-b-slate-800">
              <div class="flex justify-between items-end">
                <div class="flex flex-col">
                  <span class="text-[10px] font-black text-slate-800 uppercase tracking-tighter">ยอดรวมสุทธิทั้งหมด:</span>
                  <span class="text-[8px] text-slate-400 font-medium ">(ราคานี้รวม Vat แล้ว)</span>
                </div>
                <span class="text-2xl font-black text-[#2D5A9E]">฿{{ formatPrice(grandTotal) }}</span>
              </div>
            </div>
          </div>

          <div class="absolute bottom-0 left-0 w-full h-4 bg-[radial-gradient(circle,transparent_8px,#fff_8px)] bg-size-[24px_24px] bg-repeat-x -mb-2" />
        </div>
      </div>
    </div>
  </div>
</template>
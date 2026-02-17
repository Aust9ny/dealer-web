<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
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

// Simple mock countdown for the QR Code
const timeLeft = ref('14:59');
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="w-full mb-6">
      <nav class="flex items-center text-sm font-medium w-full">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1">
            <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300 rotate-180" />
            <NuxtLink to="/category" class="text-slate-500 hover:text-[#0D95DA] transition-colors font-bold">
              เลือกสินค้าเพิ่ม
            </NuxtLink>
          </div>
          
          <div class="flex items-center justify-end">
            <POStepper />
          </div>
        </div>
      </nav>
    </div>

    <div class="grid grid-cols-12 gap-6 items-start">
      <div class="col-span-8 space-y-6">
        <div class="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center">
          <div class="max-w-sm mx-auto">
            <h2 class="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">ชำระเงินผ่าน QR Code</h2>
            <p class="text-sm text-slate-400 mb-8 font-medium italic">กรุณาสแกน QR Code ด้านล่างเพื่อชำระเงิน</p>
            
            <div class="bg-white p-6 border-2 border-slate-100 rounded-3xl shadow-inner mb-6 relative group">
              <div class="aspect-square bg-slate-100 rounded-xl flex items-center justify-center border-4 border-dashed border-slate-200">
                 <Icon icon="mdi:qrcode-scan" class="w-32 h-32 text-slate-300" />
              </div>
              <div class="mt-4 flex items-center justify-center gap-2 text-red-500 font-black">
                 <Icon icon="mdi:clock-outline" class="w-5 h-5" />
                 <span class="text-lg uppercase tracking-tighter">หมดอายุใน: {{ timeLeft }}</span>
              </div>
            </div>

            <div class="space-y-4 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div class="flex justify-between text-sm">
                <span class="font-bold text-slate-500">ชื่อบัญชี:</span>
                <span class="font-black text-slate-800">บมจ. แอดไวซ์ ไอที อินฟินิท</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="font-bold text-slate-500">จำนวนเงินที่ต้องชำระ:</span>
                <span class="text-xl font-black text-[#2D5A9E]">฿{{ formatPrice(grandTotal) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm opacity-60">
          <div class="flex items-center justify-between">
             <div class="flex items-center gap-4">
                <Icon icon="mdi:bank-outline" class="w-8 h-8 text-slate-400" />
                <div>
                   <h3 class="font-black text-slate-800 uppercase">โอนผ่านธนาคาร / ATM</h3>
                   <p class="text-xs text-slate-400 font-medium italic">ยืนยันยอดเงินภายใน 15-30 นาที</p>
                </div>
             </div>
             <button class="text-[#0D95DA] font-black text-xs underline uppercase">เลือกใช้วิธีนี้</button>
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
            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-dashed pb-2">สรุปการสั่งซื้อ:</h4>
            
            <div class="space-y-4 max-h-62.5 overflow-y-auto scrollbar-thin pr-2">
              <div v-for="item in po?.items" :key="item.product.id" class="flex gap-3">
                <img :src="item.product.image" class="w-10 h-10 object-contain border p-1 rounded-lg bg-white shrink-0">
                <div class="flex-1">
                  <p class="text-[10px] font-bold text-slate-800 line-clamp-1 truncate uppercase">{{ item.product.name }}</p>
                  <div class="flex justify-between items-center mt-1">
                     <span class="text-[10px] text-slate-400 font-bold">x{{ item.quantity }}</span>
                     <span class="text-[10px] font-black text-slate-800 italic">฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-dashed space-y-2">
               <div class="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
                  <span>สินค้าทั้งหมด ({{ po?.items.length }} ชิ้น):</span>
                  <span class="text-slate-800 font-black">฿{{ formatPrice(subtotal + 4110) }}</span>
               </div>
               <div class="flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase">
                  <span>ส่วนลด:</span>
                  <span class="text-slate-800 font-black">-฿4,110</span>
               </div>
               <div class="h-px bg-slate-100 my-2"/>
               <div class="flex justify-between items-end">
                  <div class="flex flex-col">
                     <span class="text-[10px] font-black text-slate-800 uppercase tracking-tighter">ยอดรวมสุทธิ:</span>
                     <span class="text-[8px] text-slate-400 font-medium italic">(รวม Vat แล้ว)</span>
                  </div>
                  <span class="text-2xl font-black text-[#2D5A9E]">฿{{ formatPrice(grandTotal) }}</span>
               </div>
            </div>
          </div>
          
          <div class="absolute bottom-0 left-0 w-full h-4 bg-[radial-gradient(circle,transparent_8px,#fff_8px)] bg-size-[24px_24px] bg-repeat-x -mb-2"/>
        </div>
      </div>
    </div>
  </div>
</template>
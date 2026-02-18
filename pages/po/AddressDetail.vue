<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useAddress } from '@/composables/useAddress';
import AddressSelectionModal from '~/components/AddressSelectionModal.vue';

const { savedAddresses, getFullAddress } = useAddress();
const router = useRouter();
const route = useRoute();

// 🟢 1. PROPS
const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  po: any;
  subtotal: number;
  vat: number;
  grandTotal: number;
  // eslint-disable-next-line no-unused-vars
  formatPrice: (_: number) => string;
  formatDate: (_: string) => string;
}>();

// 🟢 2. STATE MANAGEMENT
const isAddressModalOpen = ref(false);
const selectedAddressId = ref(1);
const selectedMethod = ref('tgm'); // Mocked selected method
const selectedPayment = ref('bank'); // Default to 'bank' or null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStockStatus = (item: any) => {
  const stock = item.product.stock || 0;
  const quantity = item.quantity;

  if (stock <= 0) {
    return {
      text: 'สินค้าหมด (Out of Stock)',
      colorClass: 'text-red-500',
      bgClass: 'bg-red-50'
    };
  } else if (stock < quantity) {
    return {
      text: `สินค้าไม่พอ (เหลือเพียง ${stock} ชิ้น)`,
      colorClass: 'text-orange-500',
      bgClass: 'bg-orange-50'
    };
  } else {
    return {
      text: 'ได้รับสินค้าครบทุกชิ้น',
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50'
    };
  }
};

const currentAddress = computed(() => 
  savedAddresses.value.find(a => a.id === selectedAddressId.value) || savedAddresses.value[0]
);

// Must have fix later
const openTaxAddressModal = () => {
  isAddressModalOpen.value = true;
};


useScrollLock(isAddressModalOpen);

// 🟢 3. ACTIONS
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

const handleAddressSelect = (id: number ) => {
  selectedAddressId.value = id;
  isAddressModalOpen.value = false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAddressAdd = (newAddr: any) => {
  const id = Date.now();
  // Handle default logic
  if (newAddr.isDefault) {
    savedAddresses.value.forEach(a => a.isDefault = false);
  }
  savedAddresses.value.push({ id, ...newAddr });
  selectedAddressId.value = id;
  isAddressModalOpen.value = false;
};
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

    <div class="grid grid-cols-12 gap-6 items-start">
      <div class="col-span-8 space-y-6">
        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
            ที่อยู่ในการจัดส่งสินค้า / วิธีการจัดส่ง
          </h2>
          
          <div class="grid grid-cols-2 gap-4">
            <div v-if="savedAddresses.length > 0" class="border-2 border-[#0D95DA] rounded-2xl p-6 bg-blue-50/50 relative">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">ที่อยู่จัดส่ง:</span>
                <button
                  class="text-[#0D95DA] text-xs font-black underline cursor-pointer hover:text-blue-700"
                  @click="isAddressModalOpen = true"
                >
                  แก้ไข
                </button>
              </div>
              <p class="font-black text-slate-800 text-sm">{{ currentAddress.recipientName }}</p>
              <p class="text-xs text-slate-500 mt-1">{{ currentAddress.phone }}</p>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                {{ getFullAddress(currentAddress) }}
              </p>
            </div>

            <button 
              v-else 
              class="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-white hover:bg-slate-50 hover:border-[#0D95DA] group transition-all flex flex-col items-center justify-center text-center min-h-[160px]"
              @click="isAddressModalOpen = true"
            >
              <Icon icon="mdi:map-marker-plus-outline" class="w-10 h-10 text-slate-300 group-hover:text-[#0D95DA] transition-colors mb-2" />
              <span class="text-xs font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-widest">เพิ่มที่อยู่จัดส่ง</span>
            </button>

            <div v-if="selectedMethod" class="border rounded-2xl p-6 bg-slate-50/50 relative">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">วิธีการจัดส่ง:</span>
                <button class="text-[#0D95DA] text-xs font-black underline hover:text-blue-700">แก้ไข</button>
              </div>
              <p class="font-black text-[#0D95DA] text-sm ">TGM Dealer</p>
              <p class="text-[10px] text-emerald-600 font-black mt-2">ส่งด่วนวันถัดไป ก่อน 17.00 ฟรี</p>
              <p class="text-[9px] text-slate-400 mt-1 leading-tight">โอนชำระ + แนบสลิป ก่อน 12.00 น.</p>
            </div>

            <button 
              v-else 
              class="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-white hover:bg-slate-50 hover:border-[#0D95DA] group transition-all flex flex-col items-center justify-center text-center min-h-[160px]"
            >
              <Icon icon="mdi:truck-delivery-outline" class="w-10 h-10 text-slate-300 group-hover:text-[#0D95DA] transition-colors mb-2" />
              <span class="text-xs font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-widest">เลือกวิธีการจัดส่ง</span>
            </button>
          </div>
          <p class="text-[10px] text-red-500 mt-6 font-bold">* กรณีสั่งซื้อสินค้าจำนวน 3 รายการ "มูลค่ารวม 10,000 บาทขึ้นไป" สามารถเลือกส่งด่วนได้</p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
            ที่อยู่ในการออกใบกำกับภาษี
          </h2>

          <div v-if="props.po?.taxAddress" class="border rounded-2xl p-6 bg-slate-50/50 relative">
            <div class="flex justify-between items-center mb-4">
              <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">ข้อมูลใบกำกับภาษี:</span>
              <button class="text-[#0D95DA] text-xs font-bold underline hover:text-blue-700">แก้ไข</button>
            </div>
            <p class="font-black text-slate-800 text-sm">
              {{ props.po.taxAddress.companyName || 'บริษัท แอดไวซ์ ไอที อินฟินิท จำกัด (มหาชน)' }}
            </p>
            <p class="text-[10px] text-slate-400 mt-1 font-bold">เลขประจำตัวผู้เสียภาษี: 0107565000XXX</p>
          </div>

          
          <button 
            v-else 
            class="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-white hover:bg-slate-50 hover:border-[#0D95DA] group transition-all flex flex-col items-center justify-center text-center"
            @click="openTaxAddressModal"
          >
            <div class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
              <Icon icon="mdi:file-document-plus-outline" class="w-7 h-7 text-slate-300 group-hover:text-[#0D95DA]" />
            </div>
            <span class="text-xs font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-widest">
              เพิ่มข้อมูลใบกำกับภาษี
            </span>
            <p class="text-[10px] text-slate-300 mt-1 font-medium ">
              (จำเป็นต้องระบุ เพื่อใช้ในการออกใบเสร็จรับเงิน)
            </p>
          </button>
          
        </div>

<div class="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
    <h2 class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
      วิธีการชำระเงิน
    </h2>
    
    <div class="grid grid-cols-2 gap-4">
      <button 
        class="relative border-2 rounded-2xl p-6 text-sm font-black flex flex-col items-center gap-2 transition-all active:scale-95 overflow-hidden"
        :class="selectedPayment === 'bank' 
          ? 'border-[#0D95DA] bg-blue-50/50 text-[#0D95DA]' 
          : 'border-slate-100 text-slate-500 hover:bg-slate-50'"
        @click="selectedPayment = 'bank'"
      >
        <div class="absolute top-4 left-4">
          <Icon 
            :icon="selectedPayment === 'bank' ? 'mdi:radiobox-marked' : 'mdi:radiobox-blank'" 
            class="w-5 h-5" 
            :class="selectedPayment === 'bank' ? 'text-[#0D95DA]' : 'text-slate-300'"
          />
        </div>
        
        <Icon icon="mdi:bank-outline" class="w-8 h-8" />
        <span>โอนผ่านธนาคาร / ATM</span>
      </button>

      <button 
        class="relative border-2 rounded-2xl p-6 text-sm font-black flex flex-col items-center gap-2 transition-all active:scale-95 overflow-hidden"
        :class="selectedPayment === 'qr' 
          ? 'border-[#0D95DA] bg-blue-50/50 text-[#0D95DA]' 
          : 'border-slate-100 text-slate-500 hover:bg-slate-50'"
        @click="selectedPayment = 'qr'"
      >
        <div class="absolute top-4 left-4">
          <Icon 
            :icon="selectedPayment === 'qr' ? 'mdi:radiobox-marked' : 'mdi:radiobox-blank'" 
            class="w-5 h-5" 
            :class="selectedPayment === 'qr' ? 'text-[#0D95DA]' : 'text-slate-300'"
          />
        </div>

        <Icon icon="mdi:qrcode-scan" class="w-8 h-8" />
        <span>QR Code</span>
      </button>
    </div>
  </div>
      </div>

      <div class="col-span-4 sticky top-24">
<div class="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden relative StyledReceipt">
    <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
          <Icon icon="mdi:file-document-edit-outline" class="w-8 h-8 text-[#0D95DA]" />
        </div>
        <div>
          <h3 class="text-xl font-black text-slate-800 tracking-tighter uppercase">#{{ po?.id }}</h3>
          <p class="text-[12px] text-slate-400 font-bold uppercase tracking-widest">{{ formatDate(po?.createdAt || '') }}</p>
        </div>
      </div>
      <button class="p-3 text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
        <Icon icon="mdi:printer" class="w-6 h-6" />
      </button>
    </div>

    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center border-b border-black pb-2">
        <h4 class="text-sm font-black text-slate-800 uppercase tracking-tight">สรุปรายการสั่งซื้อ:</h4>
        <span class="text-sm font-black text-slate-800">{{ po?.items.length }} รายการ</span>
      </div>

      <div class="space-y-3">
        <div v-for="item in po?.items" :key="item.product.id" class="flex gap-4 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
          <img :src="item.product.image" class="w-14 h-14 object-contain bg-white rounded-xl p-1 border border-slate-200 shrink-0">
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-600 truncate uppercase">{{ item.product.name }}</p>
            <p class="text-[10px] text-slate-400 mb-1">{{ item.product.specs || 'No specs' }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-slate-400 font-bold">x{{ item.quantity }}</span>
              <div class="text-right">
                <p class="text-[10px] font-black text-slate-800">
                   ฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}
                </p>
                <p 
                  class="text-[9px] font-black uppercase tracking-tighter mt-1 px-1.5 py-0.5 rounded"
                  :class="[getStockStatus(item).colorClass, getStockStatus(item).bgClass]"
                >
                  {{ getStockStatus(item).text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#FFFBEB] rounded-2xl p-5 space-y-2 border border-[#FEF3C7]">
        <div class="flex justify-between text-xs font-bold text-slate-500">
          <span>ยอดค้างชำระเดิม:</span>
          <span>฿0.0</span>
        </div>
        <div class="flex justify-between text-xs font-bold text-slate-500">
          <span>ยอดสินค้าค้างส่ง (รอชำระ):</span>
          <span>฿0.0</span>
        </div>
        <div class="flex justify-between text-sm font-black text-slate-800 pt-1">
          <span>ยอดค้างชำระทั้งสิ้น:</span>
          <span class="text-lg">฿{{ formatPrice(subtotal) }}</span>
        </div>
      </div>

      <div class="space-y-3 pt-2">
        <div class="flex justify-between text-sm font-bold text-slate-400">
          <span>สินค้าทั้งหมด ({{ po?.items.length }} ชิ้น):</span>
          <span class="text-slate-800 font-black">฿{{ formatPrice(subtotal + 4110) }}</span>
        </div>

        <div class="flex justify-between items-center text-sm font-bold text-slate-400 border-t border-dashed border-slate-200 pt-3">
          <div class="flex items-center gap-2">
            <span>ส่วนลด:</span>
            <span class="bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-black italic tracking-widest uppercase">#DEALER2026</span>
          </div>
          <span class="text-slate-800 font-black">-฿{{ formatPrice(4110) }}</span>
        </div>

        <div class="flex justify-between text-sm font-bold text-slate-400 pt-1">
          <span>ยอดก่อน Vat:</span>
          <span class="text-slate-800 font-black">฿{{ formatPrice(subtotal - vat) }}</span>
        </div>
        
        <div class="flex justify-between text-sm font-bold text-slate-400">
          <span>ยอด Vat7%:</span>
          <span class="text-slate-800 font-black">฿{{ formatPrice(vat) }}</span>
        </div>
      </div>

      <div class="mt-4 border-t-2 border-black">
        <div class="bg-blue-50/30 p-6 flex justify-between items-center rounded-b-2xl">
          <div class="flex flex-col">
            <span class="text-base font-black text-slate-800 uppercase tracking-tighter">ยอดรวมสุทธิทั้งหมด:</span>
            <span class="text-[10px] text-slate-400 font-medium italic">(ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)</span>
          </div>
          <span class="text-3xl font-black text-[#2D5A9E]">
            ฿{{ formatPrice(grandTotal) }}
          </span>
        </div>
        <div class="border-b-4 border-black mt-1"/>
      </div>
    </div>
    
    <div class="absolute bottom-0 left-0 w-full h-4 bg-[radial-gradient(circle,transparent_8px,#fff_8px)] bg-[length:24px_24px] bg-repeat-x -mb-2 z-10" />
  </div>
      </div>
    </div>

    <AddressSelectionModal 
      :is-open="isAddressModalOpen"
      :addresses="savedAddresses"
      :selected-id="selectedAddressId"
      @close="isAddressModalOpen = false"
      @select="handleAddressSelect"
      @add="handleAddressAdd"
    />
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar { width: 5px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.StyledReceipt { position: relative; }
</style>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AddressSelectionModal from '~/components/po/AddressSelectionModal.vue';
import TaxAddressModal from '~/components/po/TaxAddressModal.vue';
import { usePOPricing } from '@/composables/po/usePOPricing';
import { useUser } from '~/composables/auth/useUser';
import { useAuth } from '~/composables/auth/useAuth';
import { usePOCheckoutState } from '~/composables/po/usePOCheckoutState';
import { useDeliveryMethods } from '~/composables/po/useDeliveryMethods';
import { usePOAddressStep } from '~/composables/po/usePOAddressStep';

type POItem = {
  quantity: number;
  priceAtPurchase?: number;
  product: {
    id: number | string;
    image: string;
    name: string;
    specs?: string;
    warranty?: string;
    stock?: number;
  };
};

type PurchaseOrderView = {
  id?: number | string;
  createdAt?: string;
  items: POItem[];
};

// 🟢 1. รับ PROPS จากไฟล์แม่ [id].vue
const props = defineProps<{
  po: PurchaseOrderView;
  subtotal: number;
  vat: number;
  grandTotal: number;
  formatPrice: (val: number) => string;
  formatDate: (dateStr: string, showTime?: boolean) => string;
}>();

const { getFullAddress } = useUser();
const { currentUser } = useAuth();
const { getEffectiveQuantity } = usePOPricing();
const {
  state: checkoutState,
  setAddressSelections,
  setAddressValidationAttempted,
} = usePOCheckoutState();
const { deliveryMethods } = useDeliveryMethods();

const {
  addressForm,
  currentAddress,
  currentShippingIsDefault,
  currentTaxAddress,
  currentTaxId,
  currentTaxIsDefault,
  getLineTotal,
  getStockStatus,
  goBack,
  handleAddressAdd,
  handleAddressDelete,
  handleAddressSelect,
  handleAddressUpdate,
  handleDeliveryConfirm,
  handleSetDefaultAddress,
  handleTaxAddressAddRequest,
  handleTaxAddressSubmit,
  isAddressModalOpen,
  isDeliveryMissing,
  isPaymentMissing,
  isShippingMissing,
  isSubmitted,
  isTaxAddressModalOpen,
  isTaxMissing,
  isTelValid,
  modalAddresses,
  modalMode,
  openModal,
  paymentMethods,
  selectedAddressId,
  selectedDeliveryData,
  selectedDeliveryMethod,
  selectedPayment,
  selectedTaxAddressId,
  showSelectionErrors,
  startWithDeliveryInModal,
  taxModalInitialData,
} = usePOAddressStep({
  currentUser,
  deliveryMethods,
  setAddressSelections,
  setAddressValidationAttempted,
  getEffectiveQuantity: getEffectiveQuantity as any,
  checkoutState,
  poId: props.po?.id,
});

useSeoMeta({
  title: () => `PO #${props.po?.id} | Shipping & Tax Address`,
  description: () => `Select shipping, tax address, and payment method for purchase order ${props.po?.id}.`,
  ogTitle: () => `PO #${props.po?.id} | Shipping & Tax Address`,
  ogDescription: () => `Configure shipping and billing details for purchase order ${props.po?.id}.`,
  robots: 'noindex, nofollow',
});

useHeadSafe({
  meta: [
    { name: 'cache-control', content: 'no-store, no-cache, must-revalidate' },
    { name: 'pragma', content: 'no-cache' },
    { name: 'expires', content: '0' },
  ],
});
</script>

<template>
  <div class="flex flex-col w-full">
<div class="w-full mb-4 md:mb-8 bg-white md:bg-transparent p-3 md:p-0 rounded-2xl shadow-sm md:shadow-none">
      <nav class="flex flex-col gap-4 w-full">
        <div class="flex flex-col md:flex-row gap-4 md:items-center justify-between w-full">
          
          <div class="flex items-center gap-1 group">
            <div class="flex border border-slate-300 p-1 pr-3 rounded-lg text-slate-300 shadow-2md py-2 bg-white" @click="goBack">
              <div class="p-1.5 md:p-0 rounded-full group-hover:bg-blue-50 transition-colors">
                <Icon
                  icon="mdi:chevron-left"
                  class="w-6 h-6 text-slate-400 group-hover:text-[#0D95DA] transition-all"
                />
              </div>
              <button
                class="text-slate-500 hover:text-[#0D95DA] transition-colors font-semibold text-sm md:text-base active:scale-95"
              >
                ตรวจสอบรายการ
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

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start pb-6 md:pb-20">
      <div class="lg:col-span-8 space-y-4 md:space-y-6">
        
        <div class="bg-white rounded-xl p-4 md:p-8 border border-slate-200 shadow-sm border-t-primary border-t-10">
          
          <h2 class="text-lg md:text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">เลือกที่อยู่ในการจัดส่งสินค้า / วิธีการจัดส่ง</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-if="currentAddress"
              class="border rounded-2xl p-6 bg-white relative"
              :class="showSelectionErrors && isShippingMissing ? 'border-red-400 bg-red-50/30' : 'border-slate-300'"
            >
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">ที่อยู่จัดส่งสินค้า:</span>
                <button class="text-[#0D95DA] text-xs font-black underline hover:text-blue-700" @click="openModal('shipping')">แก้ไข</button>
              </div>
              <div class="p-4 rounded-2xl bg-secondary">
                <p class="text-sm font-semibold text-primary">{{ currentAddress.recipientName }}</p>
                <p class="text-sm text-slate-500 mt-1">{{ currentAddress.phone }}</p>
                <p class="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2">{{ getFullAddress(currentAddress) }}</p>
                <p v-if="currentShippingIsDefault" class="text-[10px] mt-2 text-slate-400 bg-slate-200 w-fit px-2 py-0.5 rounded-full uppercase font-bold">ค่าเริ่มต้น</p>
              </div>
            </div>
            
            <div
              v-else
              class="border rounded-2xl p-6 bg-white relative"
              :class="showSelectionErrors && isShippingMissing ? 'border-red-400 bg-red-50/30' : 'border-slate-300'"
              @click="openModal('shipping')"
            > 
            <div class="flex justify-between items-center mb-4">
              <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">เลือกสถานที่จัดส่งสินค้า:</span>
            </div>
            <div class="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 flex flex-col items-center justify-center min-h-45 group transition-all cursor-pointer">
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                <Icon icon="mdi:map-marker-plus-outline" class="w-6 h-6 text-slate-300 group-hover:text-[#0D95DA]" />
              </div>
              <span class="text-sm font-bold text-slate-400 group-hover:text-[#0D95DA]">เพิ่มที่อยู่จัดส่งใหม่</span>
            </div>
            </div>

            <div
              class="border rounded-2xl p-6 bg-white relative"
              :class="showSelectionErrors && isDeliveryMissing ? 'border-red-400 bg-red-50/30' : 'border-slate-300'"
            >
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">วิธีการจัดส่ง:</span>
                <button
                  v-if="selectedDeliveryMethod"
                  class="text-[#0D95DA] text-xs font-black underline hover:text-blue-700"
                  @click="openModal('shipping', true)"
                >
                  แก้ไข
                </button>
              </div>

              <div
                v-if="!selectedDeliveryMethod"
                class="border-2 border-dashed rounded-2xl p-6 bg-slate-50 flex flex-col items-center justify-center min-h-45 group transition-all cursor-pointer"
                :class="showSelectionErrors && isDeliveryMissing ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-[#0D95DA]'"
                @click="openModal('shipping', true)"
              >
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Icon icon="mdi:truck-plus-outline" class="w-6 h-6 text-slate-300 group-hover:text-[#0D95DA]" />
                </div>
                <span class="text-sm font-bold text-slate-400 group-hover:text-[#0D95DA]">เลือกวิธีการจัดส่ง</span>
              </div>

              <div v-else class="p-4 rounded-2xl bg-secondary">
                <p class="text-primary text-sm font-semibold">{{ selectedDeliveryData?.label }}</p>
                <div class="w-full border-b my-2 border-slate-200" />
                <div class="flex items-center justify-between">
                  <span class="text-xs text-primary font-medium">{{ selectedDeliveryData?.desc }}</span>
                  <span class="text-sm text-[#12B76A] font-black uppercase">ฟรี</span>
                </div>
              </div>
            </div>
          </div>

          <p v-if="showSelectionErrors && isShippingMissing" class="mt-3 text-xs font-bold text-red-500">
            กรุณาเลือกที่อยู่จัดส่งสินค้า
          </p>
          <p v-if="showSelectionErrors && isDeliveryMissing" class="mt-1 text-xs font-bold text-red-500">
            กรุณาเลือกวิธีการจัดส่ง
          </p>
          
          <div class="mt-6 p-4 bg-red-50/50 rounded-xl border border-red-100">
            <p class="text-xs text-red-500 leading-relaxed font-medium">
              * กรณีสั่งซื้อสินค้าครบ 3 รายการ "มีมูลค่ารวม 10,000 บาทขึ้นไป" ต่อ 1 บิลสามารถเลือกจัดส่งภายในวันได้ <br>
              ** กรณีที่ตรงกับวันหยุดนักขัตฤกษ์ของบริษัท จัดส่งในวันเปิดทำการ
            </p>
          </div>
        </div>

        <div class="bg-white rounded-xl p-4 md:p-8 border border-slate-200 shadow-sm">
          <h2 class="text-lg md:text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">เลือกที่อยู่ในการออกใบกำกับภาษี</h2>
          
          <div
            v-if="currentTaxAddress"
            class="border rounded-2xl p-6 bg-white relative transition-all"
            :class="showSelectionErrors && isTaxMissing ? 'border-red-400 bg-red-50/30' : 'border-slate-300'"
          >
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-500 text-xs uppercase tracking-widest">ที่อยู่ออกใบกำกับ:</span>
                <span v-if="currentTaxAddress.label" class="text-[10px] bg-blue-50 text-[#0D95DA] px-2 py-0.5 rounded-full font-bold uppercase">{{ currentTaxAddress.label }}</span>
              </div>
              
              <button 
                class="text-xs font-black underline transition-all duration-200" 
                :class="(isShippingMissing || isDeliveryMissing) 
                  ? 'text-slate-300 cursor-not-allowed no-underline' 
                  : 'text-[#0D95DA] hover:text-blue-700 active:scale-95'"
                :disabled="isShippingMissing || isDeliveryMissing"
                @click="openModal('tax')"
              >
                แก้ไข
              </button>
            </div>

            <div class="bg-secondary p-4 rounded-xl">
              <p class="font-black text-sm text-primary">{{ currentTaxAddress.recipientName }}</p>
              <p v-if="currentTaxIsDefault" class="text-[10px] mt-2 text-slate-400 bg-slate-200 w-fit px-2 py-0.5 rounded-full uppercase font-bold">ค่าเริ่มต้น</p>
              <p v-if="currentTaxId" class="text-xs mt-1 text-slate-500">
                เลขผู้เสียภาษี: {{ currentTaxId }}
              </p>
              <p class="text-sm mt-1 text-slate-500">{{ currentTaxAddress.phone }}</p>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">{{ getFullAddress(currentTaxAddress) }}</p>
            </div>
          </div>

          <div
            v-else
            class="border-2 border-slate-200 rounded-3xl p-4 bg-white min-h-45 flex items-center justify-center transition-all"
            :class="[
              (isShippingMissing || isDeliveryMissing) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'group cursor-pointer hover:border-[#0D95DA] hover:shadow-lg hover:shadow-[#0D95DA]/5',
              showSelectionErrors && isTaxMissing ? 'border-red-400 bg-red-50/30' : ''
            ]"
            @click="(!isShippingMissing && !isDeliveryMissing) ? openModal('tax') : null"
          >
            <div 
              class="w-full h-full border-2 border-dashed rounded-2xl p-6 bg-slate-50 flex flex-col items-center justify-center transition-colors"
              :class="[
                (isShippingMissing || isDeliveryMissing) 
                  ? 'border-slate-200' 
                  : 'group-hover:bg-white group-hover:border-[#0D95DA]/30',
                showSelectionErrors && isTaxMissing ? 'border-red-300' : 'border-slate-200'
              ]"
            >
              <Icon 
                icon="mdi:file-document-plus-outline" 
                class="w-10 h-10 mb-2 transition-colors" 
                :class="(isShippingMissing || isDeliveryMissing) ? 'text-slate-200' : 'text-slate-300 group-hover:text-[#0D95DA]'"
              />
              <span 
                class="text-sm font-bold transition-colors"
                :class="(isShippingMissing || isDeliveryMissing) ? 'text-slate-200' : 'text-slate-400 group-hover:text-[#0D95DA]'"
              >
                เพิ่มที่อยู่ออกใบกำกับภาษี
              </span>
            </div>
          </div>
          
          <p v-if="showSelectionErrors && isTaxMissing" class="mt-3 text-xs font-bold text-red-500 italic">
            ! กรุณาเลือกที่อยู่ออกใบกำกับภาษี
          </p>
        </div>

        <div
          class="bg-white rounded-xl p-4 md:p-8 border shadow-sm"
          :class="showSelectionErrors && isPaymentMissing ? 'border-red-400 bg-red-50/20' : 'border-slate-200'"
        >
          <h2 class="text-lg md:text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">วิธีการชำระเงิน</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="method in paymentMethods" :key="method" class="relative border-2 rounded-2xl p-6 text-sm font-black flex items-center gap-4 transition-all w-full group"
              :class="selectedPayment === method ? 'border-[#0D95DA] bg-blue-50/50 text-[#0D95DA]' : 'border-slate-100 text-slate-500 hover:border-slate-200'"
              @click="selectedPayment = method">
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                :class="selectedPayment === method ? 'border-[#0D95DA]' : 'border-slate-300'">
                <div v-if="selectedPayment === method" class="w-2.5 h-2.5 rounded-full bg-[#0D95DA] animate-in zoom-in duration-200" />
              </div>
              <div class="flex items-center gap-3">
                <Icon :icon="method === 'bank' ? 'mdi:bank-outline' : 'mdi:qrcode-scan'" class="w-8 h-8" />
                <span class="tracking-tight">{{ method === "bank" ? "โอนผ่านธนาคาร" : "QR Code / PromptPay" }}</span>
              </div>
            </button>
          </div>
          <p v-if="showSelectionErrors && isPaymentMissing" class="mt-3 text-xs font-bold text-red-500">
            กรุณาเลือกวิธีการชำระเงิน
          </p>
          
          <div class="bg-[#FFFCED] mt-4 rounded-xl p-4 flex items-center gap-3 border border-[#FEF3C7]">
            <Icon icon="zondicons:exclamation-outline" width="20" height="20" style="color: #DBAA00" />
            <span class="text-[#DBAA00] text-xs font-medium leading-relaxed">
              กรุณาทำรายการชำระเงินภายในเวลา 24 ชั่วโมง หากท่านไม่ดำเนินการตามเวลาที่กำหนด คำสั่งซื้อจะถูกยกเลิกอัตโนมัติ
            </span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 lg:sticky lg:top-0">
        <div class="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden relative StyledReceipt">
          <div class="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-white border-t-10 border-t-primary rounded-xl">
            <div class="flex items-center gap-3 md:gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                <Icon icon="mdi:file-document-edit-outline" class="w-6 h-6 text-[#0D95DA]" />
              </div>
              <div>
                <h3 class="text-lg font-black text-slate-800 tracking-tighter uppercase">#{{ po?.id }}</h3>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ formatDate(po?.createdAt || "" , true) }}</p>
              </div>
            </div>
            <button class="p-2.5 text-slate-300 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
              <Icon icon="mdi:printer" class="w-5 h-5" />
            </button>
          </div>

          <div class="p-6 space-y-5">
            <div class="flex justify-between items-center border-b border-black pb-2">
              <h4 class="text-xs font-black text-slate-800 uppercase">สรุปรายการ:</h4>
              <span class="text-xs font-black text-slate-800">{{ po?.items.length }} รายการ</span>
            </div>

            <div class="max-h-75 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              <div v-for="item in po?.items" :key="item.product.id" class="flex gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                <img :src="item.product.image" class="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-200 shrink-0">
                <div class="flex-1 min-w-0">
                  <p class="text-[11px] font-black text-slate-600 line-clamp-1 uppercase">{{ item.product.name }}</p>
                  <div class="">
                    <span class="text-[11px]  text-slate-600 truncate">{{ item.product.specs || "No specs" }}</span>
                  </div>
                  <div class="flex justify-between items-end mt-1">
                    <div class="flex flex-col gap-1">
                      <span class="text-[11px] text-slate-400 bold"> {{ item.product.warranty }}</span>
                      <span class="text-[11px] text-slate-400 font-bold">x{{ item.quantity }}</span>
                    </div>
                    <div class="text-right">
                      <p class="text-[11px] font-black text-slate-800">฿{{ formatPrice(getLineTotal(item)) }}</p>
                      <p
                        class="text-[8px] font-black uppercase tracking-tighter mt-1 px-1.5 py-0.5 rounded-full"
                        :class="[getStockStatus(item).colorClass, getStockStatus(item).bgClass]">
                        {{ getStockStatus(item).text }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-[#FFFBEB] rounded-xl p-4 space-y-2 border border-[#FEF3C7]">
              <div class="flex justify-between text-[11px] font-bold text-slate-500">
                <span>ยอดค้างชำระเดิม:</span><span>฿0.0</span>
              </div>
              <div class="flex justify-between text-[11px] font-black text-slate-800 pt-1">
                <span>ยอดค้างชำระทั้งสิ้น:</span><span class="text-base">฿{{ formatPrice(subtotal) }}</span>
              </div>
            </div>

            <div class="space-y-2 pt-2 text-[12px] font-bold text-slate-400">
              <div class="flex justify-between">
                <span>ยอดสินค้ารวม:</span><span class="text-slate-800 font-black">฿{{ formatPrice(subtotal + 4110) }}</span>
              </div>
              <div class="flex justify-between text-[#0D95DA]">
                <span>ส่วนลด (DEALER2026):</span><span class="font-black">-฿{{ formatPrice(4110) }}</span>
              </div>
              <div class="flex justify-between border-t border-dashed pt-2">
                <span>ยอด Vat 7%:</span><span class="text-slate-800 font-black">฿{{ formatPrice(vat) }}</span>
              </div>
            </div>

            <div class="mt-4 border-t-2 border-black pt-4">
              <div class="flex justify-between items-center">
                <div class="flex flex-col">
                  <span class="text-[12px] font-black text-slate-800 uppercase tracking-tighter">ยอดสุทธิ:</span>
                  <span class="text-[9px] text-slate-400 font-medium italic">(Inc. VAT)</span>
                </div>
                <span class="text-2xl font-black text-[#2D5A9E]">฿{{ formatPrice(grandTotal) }}</span>
              </div>
              <div class="border-b-4 border-black mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddressSelectionModal
      :is-open="isAddressModalOpen"
      :addresses="modalAddresses"
      :selected-id="modalMode === 'tax' ? selectedTaxAddressId : selectedAddressId"
      :selected-delivery-method="selectedDeliveryMethod"
      :start-with-delivery="startWithDeliveryInModal"
      :mode="modalMode"
      :is-submitted="isSubmitted"
      :is-tel-valid="isTelValid"
      :form="addressForm"
      @close="isAddressModalOpen = false; startWithDeliveryInModal = false"
      @select="handleAddressSelect"
      @add="handleAddressAdd"
      @update="handleAddressUpdate"
      @delete="handleAddressDelete"
      @set-default="handleSetDefaultAddress"
      @delivery-confirm="handleDeliveryConfirm"
      @reset-submit="isSubmitted = false"
      @tax-add-request="handleTaxAddressAddRequest"
    />

    <TaxAddressModal
      :is-open="isTaxAddressModalOpen"
      :initial-data="taxModalInitialData"
      @close="isTaxAddressModalOpen = false"
      @submit="handleTaxAddressSubmit"
    />
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.StyledReceipt { position: relative; }
.StyledReceipt::after {
  content: "";
  position: absolute;
  bottom: -10px; left: 0; right: 0;
  height: 20px;
  background-image: radial-gradient(circle, transparent 70%, white 70%);
  background-size: 20px 20px;
  background-position: 0 -10px;
}
</style>

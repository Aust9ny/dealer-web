<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AddressSelectionModal from '~/components/AddressSelectionModal.vue';

// 🟢 1. รับ PROPS จากไฟล์แม่ [id].vue
const props = defineProps<{
  po: any;
  subtotal: number;
  vat: number;
  grandTotal: number;
  formatPrice: (val: number) => string;
  formatDate: (dateStr: string , showTime?: boolean) => string;
}>();

const { getFullAddress } = useUser();
const { currentUser } = useAuth();
// const route = useRoute();
const router = useRouter();

// 🟢 2. STATE MANAGEMENT
const isAddressModalOpen = ref(false);
const modalMode = ref<'shipping' | 'tax'>('shipping');
// const selectedMethod = ref('tgm');
const selectedPayment = ref('bank');

// Form state for Modal validation
const isSubmitted = ref(false);
const isTelValid = ref(true);
const addressForm = ref({
  addressDetail: {
    label: '',
    recipientName: '',
    phone: '',
    addressDetail: '',
    subDistrict: '',
    district: '',
    province: '',
    postalCode: '',
    isDefault: false,
    isTaxAddress: false,
  } as any,
});

const savedAddresses = computed(() => currentUser.value?.addresses || []);
const selectedAddressId = ref<number | string>(1);
const selectedTaxAddressId = ref<number | string>(1);

// Computed Addresses
const currentAddress = computed(
  () =>
    savedAddresses.value.find((a) => a.id === selectedAddressId.value) ||
    savedAddresses.value[0],
);

const currentTaxAddress = computed(
  () =>
    savedAddresses.value.find((a) => a.id === selectedTaxAddressId.value) ||
    savedAddresses.value.find((a) => a.isTaxAddress) ||
    savedAddresses.value[0],
);

// 🟢 3. ACTIONS
const openModal = (mode: 'shipping' | 'tax') => {
  modalMode.value = mode;
  isAddressModalOpen.value = true;
};

const handleAddressSelect = (id: number | string) => {
  if (modalMode.value === 'shipping') {
    selectedAddressId.value = id;
  } else {
    selectedTaxAddressId.value = id;
  }
  isAddressModalOpen.value = false;
};

const handleAddressAdd = (newAddr: any) => {
  if (!currentUser.value) return;
  const id = Date.now();
  if (newAddr.isDefault) {
    currentUser.value.addresses.forEach((a) => (a.isDefault = false));
  }
  currentUser.value.addresses.push({ id, ...newAddr });

  // Auto-select based on mode
  if (modalMode.value === 'shipping') selectedAddressId.value = id;
  else selectedTaxAddressId.value = id;

  isAddressModalOpen.value = false;
};

const goBackToOrder = () => {
  router.push(`/po/${props.po?.id}`);
};

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

// Sync Default Address on Load
watch(
  savedAddresses,
  (newAddrs) => {
    if (newAddrs.length > 0 && !selectedAddressId.value) {
      const def = newAddrs.find((a) => a.isDefault);
      selectedAddressId.value = def ? def.id : newAddrs[0].id;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="w-full mb-6">
      <nav class="flex items-center text-sm font-medium w-full">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1">
            <Icon
              icon="mdi:chevron-right"
              class="w-4 h-4 text-slate-300 rotate-180"
            />
            <button
              class="text-slate-500 hover:text-[#0D95DA] transition-colors font-bold"
              @click="goBackToOrder"
            >
              กลับไปตรวจสอบรายการ
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
        <div class="bg-white rounded-xl p-8 border border-slate-200 shadow-sm border-t-primary border-t-10">
          <h2
            class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight"
          >
            เลือกที่อยู่ในการจัดส่งสินค้า / วิธีการจัดส่ง
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-if="currentAddress"
              class="border border-slate-300 rounded-2xl p-6 bg-white relative"
            >
              <div class="flex justify-between items-center mb-4">
                <span
                  class="font-bold text-slate-500 text-xs uppercase tracking-widest"
                  >ที่อยู่จัดส่งสินค้า:</span
                >
                <button
                  class="text-[#0D95DA] text-xs font-black underline hover:text-blue-700"
                  @click="openModal('shipping')"
                >
                  แก้ไข
                </button>
              </div>
              <div class=" p-3 rounded-2xl bg-secondary">
                <p class=" text-sm font-semibold text-primary">
                  {{ currentAddress.recipientName }}
                </p>
                <p class="text-sm text-slate-500 mt-1">
                  {{ currentAddress.phone }}
                </p>
                <p
                  class="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2"
                >
                  {{ getFullAddress(currentAddress) }}
                </p>
                <p v-if="currentAddress.isDefault" class="text-xs mt-2 text-slate-400 bg-slate-200 w-fit rounded-xl p-1">
                    ค่าเริ่มต้น
                </p>
              </div>
            </div>

            <div class="border border-slate-300 rounded-2xl p-6 bg-white relative">

              <div class="flex justify-between items-center mb-4">
                <span
                  class="font-bold text-slate-500 text-xs uppercase tracking-widest"
                  >วิธีการจัดส่ง:</span
                >
                <button
                  class="text-[#0D95DA] text-xs font-black underline hover:text-blue-700"
                >
                  แก้ไข
                </button>
              </div>

              <div class="bg-secondary p-3 rounded-2xl">
                <p class=" text-primary text-sm font-semibold">
                  TGM Dealer Delivery
                </p>
                <div class="w-full border border-b mt-1 border-slate-300"/>
                <span class="text-sm text-primary  mt-1">
                  ส่งด่วนวันถัดไปก่อน 17:00 น.
                </span>
                <span class="text-sm text-[#12B76A]  mt-1 ml-1">
                  ฟรี
                </span>
                <p class="text-xs mt-1 text-slate-400">
                  โอนชำระ + แนบสลิปก่อน 12.00 น.
                </p>
                <p class="text-xs mt-1 text-slate-400">
                  *ส่งภายในวันถัดไปก่อน 17:00 น.
                </p>
              </div>
            </div>
            <div>
              <p class="text-sm text-nowrap  text-red-500 ml-2">
                * กรณีสั่งซื้อสินค้าครบ 3 รายการ "มีมูลค่ารวม 10,000 บาทขึ้นไป" ต่อ 1 บิลสามารถเลือกจัดส่งภายในวันได้ <br>
              </p>
              <p class="text-sm  text-red-500 ml-2">
                ** กรณีที่ตรงกับวันหยุดนักขัตฤกษ์ของบริษัท จัดส่งในวันเปิดทำการ
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h2
            class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight"
          >
            เลือกที่อยู่ในการออกใบกำกับภาษี
          </h2>
          <div
            v-if="currentTaxAddress"
            class="border border-slate-200 rounded-2xl p-6 bg-white relative"
          >
            <div class="flex justify-between items-center mb-4">
              <span
                class="font-bold text-slate-500 text-xs uppercase tracking-widest"
                >ที่อยู่ออกใบกำกับ:</span
              >
              <button
                class="text-[#0D95DA] text-xs font-bold underline hover:text-blue-700"
                @click="openModal('tax')"
              >
                แก้ไข
              </button>
            </div>
            <div class="bg-secondary p-3 rounded-xl">
              <p class="font-black text-sm text-primary">
                {{ currentTaxAddress.recipientName }}
              </p>
              <p class="text-sm mt-1 text-slate-400">
                {{ currentTaxAddress.phone }}
              </p>
              <p class="text-[10px] text-slate-400 mt-1">
                {{ getFullAddress(currentTaxAddress) }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h2
            class="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight"
          >
            วิธีการชำระเงิน
          </h2>
          <div class="grid grid-cols-2 gap-4">
          <button
            v-for="method in ['bank', 'qr']"
            :key="method"
            class="relative border-2 rounded-2xl p-6 text-sm font-black flex items-center gap-4 transition-all w-full group"
            :class="
              selectedPayment === method
                ? 'border-[#0D95DA] bg-blue-50/50 text-[#0D95DA]'
                : 'border-slate-100 text-slate-500 hover:border-slate-200'
            "
            @click="selectedPayment = method"
          >
            <div 
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
              :class="selectedPayment === method ? 'border-[#0D95DA]' : 'border-slate-300'"
            >
              <div 
                v-if="selectedPayment === method"
                class="w-2.5 h-2.5 rounded-full bg-[#0D95DA] animate-in zoom-in duration-200"
              />
            </div>

            <div class="flex items-center gap-3">
              <Icon
                :icon="method === 'bank' ? 'mdi:bank-outline' : 'mdi:qrcode-scan'"
                class="w-8 h-8"
              />
              <span class=" tracking-tight">
                {{ method === "bank" ? "โอนผ่านธนาคาร" : "QR Code / PromptPay" }}
              </span>
            </div>

          </button>
          </div>
          
          <div class="bg-[#FFFCED] mt-4 gap-3 ">
            <div class="flex items-center mr-3 gap-3 pl-3">
              <Icon icon="zondicons:exclamation-outline" width="16" height="16"  style="color: #DBAA00" />
              <span class="text-[#DBAA00] pt-2 text-sm text-center pb-2 ">
                กรุณาทำรายการชำระเงินภายในเวลา 24 ชั่วโมง หากท่านไม่ดำเนินการตามเวลาที่กำหนด คำสั่งซื้อจะถูกยกเลิกอัตโนมัติ
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 sticky top-24">
        <div
          class="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden relative StyledReceipt"
        >
          <div
            class="p-6 border-b border-slate-100 flex justify-between items-center bg-white border-t-10 border-t-primary rounded-xl"
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
                  class="text-xl font-black text-slate-800 tracking-tighter uppercase"
                >
                  #{{ po?.id }}
                </h3>
                <p
                  class="text-[12px] text-slate-400 font-bold uppercase tracking-widest"
                >
                  {{ formatDate(po?.createdAt || "" , true) }}
                </p>
              </div>
            </div>
            <button
              class="p-3 text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Icon icon="mdi:printer" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-6 space-y-6">
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
                        ฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}
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

    <AddressSelectionModal
      :is-open="isAddressModalOpen"
      :addresses="savedAddresses"
      :selected-id="
        modalMode === 'tax' ? selectedTaxAddressId : selectedAddressId
      "
      :mode="modalMode"
      :is-submitted="isSubmitted"
      :is-tel-valid="isTelValid"
      :form="addressForm"
      @close="isAddressModalOpen = false"
      @select="handleAddressSelect"
      @add="handleAddressAdd"
      @reset-submit="isSubmitted = false"
    />
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.StyledReceipt {
  position: relative;
}
</style>

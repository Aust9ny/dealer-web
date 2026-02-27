<!-- eslint-disable quotes -->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Address } from "@/types/address";
import { useScrollLock } from "~/composables/shared/useScrollLock";
import DeliveryMethod from "~/components/po/DeliveryMethod.vue";

// 🟢 1. PROPS & EMITS
const props = defineProps<{
  isOpen: boolean;
  addresses: Address[];
  selectedId: number | string;
  isSubmitted: boolean;
  isTelValid: boolean;
  mode: "shipping" | "tax";
  selectedDeliveryMethod?: string;
  startWithDelivery?: boolean;
  form: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addressDetail: any;
  };
}>();

const activeMenuId = ref<number | string | null>(null);

const toggleMenu = (id: number | string) => {
    if (activeMenuId.value === id) {
        activeMenuId.value = null;
    } else {
        activeMenuId.value = id;
    }
};

const emit = defineEmits([
  "close",
  "select",
  "add",
  "update",
  "delete",
  "set-default",
  "delivery-confirm",
  "keypress-numeric",
  "update:form",
  "reset-submit",
]);

const isLocked = computed(() => props.isOpen);
useScrollLock(isLocked);
const hasSelectedDeliveryMethod = computed(() => !!props.selectedDeliveryMethod);

// 🟢 2. LOCAL STATE
const isAddingNew = ref(false);
const isDeliveryModalOpen = ref(false);
const localSelectedId = ref<number | string>(props.selectedId);
const editingAddressId = ref<number | string | null>(null);

const newAddress = ref({
  label: "",
  recipientName: "",
  phone: "",
  addressDetail: "",
  subDistrict: "",
  district: "",
  province: "",
  postalCode: "",
  isDefault: false,
  isTaxAddress: false,
});

const resetNewAddress = () => {
  newAddress.value = {
    label: "",
    recipientName: "",
    phone: "",
    addressDetail: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    isDefault: false,
    isTaxAddress: false,
  };
};

watch(
  () => props.selectedId,
  (newId) => {
    localSelectedId.value = newId;
  },
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) return;
    isDeliveryModalOpen.value = !!(props.startWithDelivery && props.mode === "shipping");
  },
  { immediate: true },
);

// 🟢 3. ACTIONS
const handleSelect = (id: number | string) => {
  localSelectedId.value = id; // เลือกแล้วไฮไลต์สีเดิมของคุณ แต่ไม่ปิด Modal
};

const handleNext = () => {
  if (localSelectedId.value) {
    if (props.mode === "shipping") {
      if (hasSelectedDeliveryMethod.value) {
        emit("select", localSelectedId.value);
        return;
      }
      isDeliveryModalOpen.value = true;
      return;
    }
    emit("select", localSelectedId.value);
  }
};

const handleDeliveryConfirm = (method: string) => {
  emit("delivery-confirm", method);
  emit("select", localSelectedId.value);
  isDeliveryModalOpen.value = false;
};

const handleDeliveryBackOrClose = () => {
  isDeliveryModalOpen.value = false;
  if (props.startWithDelivery) {
    emit("close");
    return;
  }
};

const handleAdd = () => {
  if (!newAddress.value.recipientName || !newAddress.value.phone || !newAddress.value.postalCode) {
    return;
  }

  if (editingAddressId.value !== null) {
    emit("update", { id: editingAddressId.value, ...newAddress.value });
  } else {
    emit("add", { ...newAddress.value });
  }

  editingAddressId.value = null;
  resetNewAddress();
  isAddingNew.value = false;
};

const makeDefault = (id: number | string) => {
  emit("set-default", id);
  activeMenuId.value = null;
};

const openEditModal = (id: number | string) => {
  const target = props.addresses.find((addr) => addr.id === id);
  if (!target) return;

  editingAddressId.value = id;
  newAddress.value = {
    label: target.label || "",
    recipientName: target.recipientName || "",
    phone: target.phone || "",
    addressDetail: target.addressDetail || "",
    subDistrict: target.subDistrict || "",
    district: target.district || "",
    province: target.province || "",
    postalCode: target.postalCode || "",
    isDefault: !!target.isDefault,
    isTaxAddress: !!target.isTaxAddress,
  };
  activeMenuId.value = null;
  isAddingNew.value = true;
};

const deleteAddress = (id: number | string) => {
  emit("delete", id);
  if (localSelectedId.value === id) {
    localSelectedId.value = "";
  }
  activeMenuId.value = null;
};

const onPhoneInput = () => {
  newAddress.value.phone = newAddress.value.phone.replace(/\D/g, "").slice(0, 10);
};

const onPostalCodeInput = () => {
  newAddress.value.postalCode = newAddress.value.postalCode.replace(/\D/g, "").slice(0, 5);
};

const handleWindowClick = () => {
  activeMenuId.value = null;
};

const close = () => {
  isDeliveryModalOpen.value = false;
  emit("close");
  isAddingNew.value = false;
  editingAddressId.value = null;
  activeMenuId.value = null;
};

onMounted(() => {
  window.addEventListener("click", handleWindowClick);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleWindowClick);
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen && !isDeliveryModalOpen"
      class="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div
        class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div v-if="!isAddingNew" class="shrink-0">
          <div class="flex justify-end p-2">
            <button
              class="mt-2 mr-2 text-slate-400 hover:bg-slate-100 rounded-xl"
              @click="close"
            >
              <Icon icon="mdi:close" class="w-6 h-6" />
            </button>
          </div>
          <div class="border-b pb-3 flex flex-col items-center bg-slate-50/50">
            <h3 class="text-xl font-black text-slate-800 uppercase text-center">
              เลือกที่อยู่จัดส่ง
            </h3>
            <p class="text-xs text-slate-400 font-bold">
              บันทึกแล้ว {{ addresses.length }}/5 ที่อยู่
            </p>
          </div>
        </div>

        <div
          v-else
          class="bg-[#004A85] p-5 flex items-center justify-between text-white shrink-0"
        >
          <div class="flex items-center gap-3">
            <button
              class="hover:bg-white/10 p-1 rounded-lg transition-colors"
              @click="isAddingNew = false; editingAddressId = null; resetNewAddress()"
            >
              <Icon icon="weui:back-outlined" class="w-7 h-7" />
            </button>
            <h3 class="text-xl font-black uppercase tracking-tight">
              {{ editingAddressId !== null ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่" }}
            </h3>
          </div>
          <button
            class="p-2 hover:bg-white/10 rounded-full transition-colors"
            @click="close"
          >
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="!isAddingNew"
          class="p-6 space-y-3 overflow-y-auto max-h-[60vh] scrollbar-thin flex-1 bg-white"
        >
          <div
            v-for="addr in addresses"
            :key="addr.id"
            class="p-5 rounded-2xl border-2 cursor-pointer transition-all"
            :class="[
              localSelectedId === addr.id
                ? 'border-[#0D95DA] bg-blue-50/50'
                : 'border-slate-100 hover:bg-slate-50',
            ]"
            @click="handleSelect(addr.id)"
          >
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between w-full">
                <div class="flex gap-2 items-center">
                  <Icon
                    :icon="
                      localSelectedId === addr.id
                        ? 'mdi:check-circle'
                        : 'mdi:circle-outline'
                    "
                    class="w-6 h-6"
                    :class="
                      localSelectedId === addr.id
                        ? 'text-[#0D95DA]'
                        : 'text-slate-200'
                    "
                  />
                  <span
                    v-if="addr.isDefault"
                    class="text-[8px] bg-[#0D95DA] text-white px-1.5 py-0.5 rounded font-black uppercase"
                    >Default</span
                  >
                </div>
                <div class="relative">
                    <button
                        class="p-1 hover:bg-slate-200/50 rounded-full transition-colors"
                        @click.stop="toggleMenu(addr.id)"
                    >
                        <Icon
                            icon="octicon:kebab-horizontal-16"
                            width="20"
                            height="20"
                            style="color: #747373"
                        />
                    </button>

                    <Transition name="fade">
                        <div 
                            v-if="activeMenuId === addr.id"
                            class="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in slide-in-from-top-2 duration-200"
                        >
                            <button 
                                class="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors"
                                @click.stop="makeDefault(addr.id)"
                            >
                                <Icon icon="mdi:pin-outline" class="w-4 h-4 text-slate-400" />
                                <span class="text-[11px] font-bold text-slate-600">ตั้งที่อยู่เป็นค่าเริ่มต้น</span>
                            </button>

                            <button 
                                class="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-slate-50 transition-colors border-t border-slate-50"
                                @click.stop="openEditModal(addr.id)"
                            >
                                <Icon icon="mdi:pencil-outline" class="w-4 h-4 text-slate-400" />
                                <span class="text-[11px] font-bold text-slate-600">แก้ไขที่อยู่</span>
                            </button>

                            <button 
                                class="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-red-50 transition-colors border-t border-slate-50 group"
                                @click.stop="deleteAddress(addr.id)"
                            >
                                <Icon icon="mdi:delete-outline" class="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                                <span class="text-[11px] font-bold text-slate-600 group-hover:text-red-500">ลบที่อยู่</span>
                            </button>
                        </div>
                    </Transition>
                </div>
              </div>
              <div>
                <div class="flex gap-2 items-center">
                  <p class="font-black text-sm text-slate-800">
                    {{ addr.label || addr.recipientName }}
                  </p>
                  <p class="text-sm text-slate-500">{{ addr.phone }}</p>
                </div>
                <p class="text-[12px] text-slate-400 mt-1 leading-relaxed">
                  {{ addr.addressDetail }} ต.{{ addr.subDistrict }} อ.{{
                    addr.district
                  }}
                  จ.{{ addr.province }} {{ addr.postalCode }}
                </p>
              </div>
            </div>
          </div>
          <button
            v-if="addresses.length < 5"
            class="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#0D95DA] hover:text-[#0D95DA] transition-all"
            @click="isAddingNew = true"
          >
            <Icon icon="mdi:plus-circle-outline" class="w-8 h-8" />
            <span class="text-xs font-black uppercase tracking-widest"
              >เพิ่มที่อยู่ใหม่</span
            >
          </button>
        </div>

        <div
          v-else
          class="p-8 space-y-8 overflow-y-auto scrollbar-thin flex-1 bg-white"
        >
          <div class="space-y-6">
            <div class="flex items-center gap-4">
            
              <h4
                class="text-lg font-black text-slate-800 uppercase tracking-tight"
              >
                ที่อยู่ในการรับสินค้า
              </h4>
            </div>
            <div class="ml-14 grid grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1"
                  >ชื่อผู้รับ / บริษัท *</label
                >
                <input
                  v-model="newAddress.recipientName"
                  type="text"
                  class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none"
                  placeholder="ระบุชื่อ..."
                >
              </div>
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1"
                  >เบอร์โทรศัพท์ติดต่อ *</label
                >
                <input
                  v-model="newAddress.phone"
                  type="text"
                  maxlength="10"
                  class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none"
                  placeholder="0XX-XXXX-XXX"
                  @input="onPhoneInput"
                >
              </div>
            </div>
          </div>

          <div class="space-y-6">

            <div class="ml-14 space-y-5">
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >รหัสไปรษณีย์ *</label
                  >
                  <div class="relative">
                    <input
                      v-model="newAddress.postalCode"
                      type="text"
                      maxlength="5"
                      class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none"
                      placeholder="ระบุรหัสไปรษณีย์"
                      @input="onPostalCodeInput"
                    >
                    <Icon
                      icon="mdi:chevron-down"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >จังหวัด</label
                  >
                  <input
                    v-model="newAddress.province"
                    type="text"
                    readonly
                    class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-400"
                    placeholder="จังหวัด"
                  >
                </div>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >อำเภอ / เขต</label
                  >
                  <input
                    v-model="newAddress.district"
                    type="text"
                    readonly
                    class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-400"
                    placeholder="อำเภอ"
                  >
                </div>
                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >ตำบล / แขวง</label
                  >
                  <input
                    v-model="newAddress.subDistrict"
                    type="text"
                    readonly
                    class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-400"
                    placeholder="ตำบล"
                  >
                </div>
              </div>

              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >เลขที่</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none"
                  >
                </div>
                <div class="col-span-6 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >ชื่ออาคาร</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none"
                  >
                </div>
                <div class="col-span-3 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >ชั้นที่</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none"
                  >
                </div>
              </div>

              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-3 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >หมู่</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none"
                  >
                </div>
                <div class="col-span-9 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >หมู่บ้าน</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none"
                  >
                </div>
              </div>

              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-6 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >ซอย</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none"
                  >
                </div>
                <div class="col-span-6 space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 px-1"
                    >ถนน</label
                  >
                  <input
                    type="text"
                    class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none"
                  >
                </div>
              </div>

              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1"
                  >ตัวอย่างที่อยู่ฉบับเต็ม</label
                >
                <textarea
                  v-model="newAddress.addressDetail"
                  rows="2"
                  class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm resize-none focus:border-[#0D95DA] outline-none"
                  placeholder="ที่อยู่ฉบับเต็มจะปรากฏที่นี่..."
                />
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-white border-t shrink-0">
          <div v-if="!isAddingNew" class="bg-white p-5">
            <div class="flex justify-between bg-white h-15 gap-10">
              <div
                class="bg-primary w-full justify-center flex rounded-full transition-all"
                :class="localSelectedId ? 'hover:cursor-pointer hover:bg-primary/95' : 'opacity-50 cursor-not-allowed'"
                @click="handleNext"
              >
                <button class="text-white font-black uppercase" :disabled="!localSelectedId">ถัดไป</button>
              </div>
            </div>
          </div>
          <div v-else class="flex gap-4">
            <button
              class="flex-1 py-4 font-black text-[#0D95DA] border-2 border-[#0D95DA] rounded-full uppercase text-xs"
              @click="isAddingNew = false; editingAddressId = null; resetNewAddress()"
            >
              ย้อนกลับ
            </button>
            <button
              class="flex-2 py-4 bg-[#2D5A9E] text-white rounded-full font-black uppercase text-xs shadow-lg hover:bg-[#1E3F7D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!newAddress.recipientName || newAddress.phone.length !== 10 || newAddress.postalCode.length !== 5"
              @click="handleAdd"
            >
              ยืนยันข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>

  </Transition>

  <DeliveryMethod
    :is-open="isDeliveryModalOpen"
    :selected-method="selectedDeliveryMethod"
    @back="handleDeliveryBackOrClose"
    @close="handleDeliveryBackOrClose"
    @confirm="handleDeliveryConfirm"
  />
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

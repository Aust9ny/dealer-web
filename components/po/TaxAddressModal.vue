<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Address } from '@/types/address';
import { useScrollLock } from '~/composables/shared/useScrollLock';
import { useTaxAddressModal } from '~/composables/po/useTaxAddressModal';

const props = defineProps<{
  isOpen: boolean;
  initialData?: Partial<Address> | null;
}>();

const emit = defineEmits(['close', 'submit']);

const isLocked = computed(() => props.isOpen);
useScrollLock(isLocked);
const { close, form, isFormValid, onPostalCodeInput, onTaxIdInput, submit } = useTaxAddressModal(props, emit as any);
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="bg-[#004A85] p-5 flex items-center justify-between text-white shrink-0">
          <div class="flex items-center gap-3">
            <button
              class="hover:bg-white/10 p-1 rounded-lg transition-colors"
              @click="close"
            >
              <Icon icon="weui:back-outlined" class="w-7 h-7" />
            </button>
            <h3 class="text-xl font-black uppercase tracking-tight">เพิ่มที่อยู่ในการออกใบกำกับภาษี</h3>
          </div>
          <button class="p-2 hover:bg-white/10 rounded-full transition-colors" @click="close">
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div class="p-8 space-y-8 overflow-y-auto scrollbar-thin flex-1 bg-white">
          
          <section class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-[#004A85] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">1</div>
              <div class="flex-1">
                <h4 class="text-lg font-black text-slate-800 uppercase tracking-tight">ประเภทการขอใบกำกับภาษี</h4>
                <p class="text-red-500 text-[10px] font-bold mt-1">
                  *กรณีลูกค้าที่เลือกไม่ใบกำกับภาษีแล้ว หากต้องการขอใบกำกับภาษีเต็มรูปแบบสามารถขอได้ภายในวันที่ซื้อสินค้าเท่านั้น
                </p>

                <div class="mt-5 flex items-center gap-8">
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input
                      v-model="form.taxPayerType"
                      type="radio"
                      class="w-5 h-5 accent-[#0D95DA]"
                      value="personal"
                    >
                    <span class="text-sm font-bold" :class="form.taxPayerType === 'personal' ? 'text-[#0D95DA]' : 'text-slate-400'">บุคคลธรรมดา</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <input
                      v-model="form.taxPayerType"
                      type="radio"
                      class="w-5 h-5 accent-[#0D95DA]"
                      value="company"
                    >
                    <span class="text-sm font-bold" :class="form.taxPayerType === 'company' ? 'text-[#0D95DA]' : 'text-slate-400'">นิติบุคคล</span>
                  </label>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ชื่อ - นามสกุล*</label>
                    <input
                      v-model="form.recipientName"
                      type="text"
                      class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none transition-all"
                      placeholder="ระบุชื่อ..."
                    >
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">เลขประจำตัวผู้เสียภาษี*</label>
                    <input
                      v-model="form.taxId"
                      type="text"
                      class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none transition-all"
                      placeholder="1100XXXXXXXXX"
                      @input="onTaxIdInput"
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-[#004A85] text-white flex items-center justify-center font-black text-lg shadow-lg shrink-0">2</div>
              <div class="flex-1 space-y-5">
                <h4 class="text-lg font-black text-slate-800 uppercase tracking-tight">ที่อยู่ในใบกำกับภาษี</h4>

                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">รหัสไปรษณีย์*</label>
                    <div class="relative">
                      <input
                        v-model="form.postalCode"
                        type="text"
                        maxlength="5"
                        class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm focus:border-[#0D95DA] outline-none transition-all"
                        placeholder="ระบุรหัสไปรษณีย์"
                        @input="onPostalCodeInput"
                      >
                      <Icon icon="mdi:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">จังหวัด*</label>
                    <input
                      v-model="form.province"
                      type="text"
                      readonly
                      class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-400"
                      placeholder="จังหวัด"
                    >
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">อำเภอ / เขต*</label>
                    <input
                      v-model="form.district"
                      type="text"
                      readonly
                      class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-400"
                      placeholder="อำเภอ"
                    >
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">ตำบล / แขวง*</label>
                    <input
                      v-model="form.subDistrict"
                      type="text"
                      readonly
                      class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-400"
                      placeholder="ตำบล"
                    >
                  </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-3 space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">เลขที่</label>
                    <input v-model="form.houseNo" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                  <div class="col-span-6 space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">ชื่ออาคาร</label>
                    <input v-model="form.building" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                  <div class="col-span-3 space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">ชั้นที่</label>
                    <input v-model="form.floor" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-3 space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">หมู่</label>
                    <input v-model="form.moo" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                  <div class="col-span-9 space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">หมู่บ้าน</label>
                    <input v-model="form.village" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">ซอย</label>
                    <input v-model="form.soi" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-black text-slate-400 px-1">ถนน</label>
                    <input v-model="form.road" type="text" class="w-full p-4 border border-slate-200 rounded-xl font-bold text-sm outline-none focus:border-[#0D95DA]">
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ตัวอย่าง</label>
                  <p class="text-[10px] text-slate-400 font-bold">* กรุณาระบุข้อมูลตามที่ท่านต้องการ กรณีไม่มีข้อมูลให้เว้นว่างไว้ไม่ต้องใส่ - (ขีด)</p>
                  <textarea
                    v-model="form.addressNote"
                    rows="3"
                    class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm resize-none outline-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="p-6 bg-white border-t flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input v-model="form.isDefault" type="checkbox" class="w-5 h-5 rounded border-slate-300 accent-[#004A85]">
            <span class="text-xs font-bold text-slate-600">ตั้งค่าที่อยู่นี้เป็นค่าเริ่มต้น</span>
          </label>
          <div class="flex gap-4 w-full md:w-auto">
            <button
              class="flex-1 md:min-w-37.5 py-4 font-black text-[#0D95DA] border-2 border-[#0D95DA] rounded-full uppercase text-xs hover:bg-slate-50 transition-all"
              @click="close"
            >
              ย้อนกลับ
            </button>
            <button
              class="flex-2 md:min-w-50 py-4 bg-[#2D5A9E] text-white rounded-full font-black uppercase text-xs shadow-lg hover:bg-[#1E3F7D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isFormValid"
              @click="submit"
            >
              ยืนยันข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

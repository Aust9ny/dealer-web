<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Product } from '~/types/product';

const props = defineProps<{
    modelValue: boolean;
    product: Product | null;
    form: { email: string; tel: string; consent: boolean };
    isSubmitted: boolean;
    isEmailValid: boolean;
    isTelValid: boolean;
    showEmailError: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'update:form', 'submit', 'keypress-numeric', 'reset-submit']);

const updateFormField = (field: keyof typeof props.form, value: any) => {
    emit('update:form', {
        ...props.form,
        [field]: value
    });
    emit('reset-submit');
};
</script>

<template>
    <Teleport to="body">
        <Transition 
            enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200" @click.stop>
                    <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 class="font-black text-slate-800 flex items-center gap-2">รับแจ้งเตือนสินค้าเข้า</h3>
                        <button class="text-slate-400 hover:text-slate-600 transition-colors" @click="emit('update:modelValue', false)">
                            <Icon icon="mdi:close" class="w-6 h-6" />
                        </button>
                    </div>

                    <div class="p-8 space-y-6">
                        <h1 class="text-center font-bold text-lg">แจ้งเตือนให้ทันทีที่สินค้านี้พร้อมจำหน่าย</h1>
                        <p class="text-center whitespace-pre-line">
                            กรอกอีเมลหรือเบอร์โทรของคุณ<br>
                            ระบบจะแจ้งเตือนเมื่อสินค้าชิ้นนี้พร้อมจำหน่าย
                        </p>

                        <div class="flex gap-4 items-start bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <img :src="product?.image" class="w-16 h-16 object-contain bg-white rounded-lg border border-slate-200 shrink-0">
                            <div>
                                <p class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">กำลังติดตาม</p>
                                <p class="text-sm font-bold text-slate-800 line-clamp-2">{{ product?.name }}</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="space-y-1.5">
                                <label class="text-xs font-bold text-slate-500 ml-1">อีเมลสำหรับรับแจ้งเตือน</label>
                                <div class="relative">
                                    <Icon 
                                        icon="mdi:email-outline" class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" 
                                        :class="showEmailError ? 'text-red-400' : 'text-slate-400'" />
                                    <input 
                                        :value="form.email" type="email" placeholder="example@email.com"
                                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm"
                                        :class="[showEmailError ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-blue-100 focus:border-[#0D95DA]']"
                                        @input="updateFormField('email', ($event.target as HTMLInputElement).value)">
                                </div>
                                <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
                                    <p v-if="showEmailError" class="text-[10px] text-red-500 font-bold ml-1">* กรุณากรอกรูปแบบอีเมลให้ถูกต้อง</p>
                                </Transition>
                            </div>

                            <div class="space-y-1.5">
                                <label class="text-xs font-bold text-slate-500 ml-1">เบอร์โทรศัพท์</label>
                                <div class="relative">
                                    <Icon 
                                        icon="mdi:phone-outline" class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" 
                                        :class="isSubmitted && !isTelValid ? 'text-red-400' : 'text-slate-400'" />
                                    <input 
                                        :value="form.tel" type="text" inputmode="numeric" maxlength="10" placeholder="08XXXXXXXX"
                                        class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm"
                                        :class="[isSubmitted && !isTelValid ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-blue-100 focus:border-[#0D95DA]']"
                                        @keypress="emit('keypress-numeric', $event)" @input="updateFormField('tel', ($event.target as HTMLInputElement).value)">
                                </div>
                                <p v-if="isSubmitted && !isTelValid" class="text-[10px] text-red-500 font-bold ml-1">* กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง</p>
                            </div>

                            <div class="pt-2 px-1">
                                <label class="group flex items-start gap-3 cursor-pointer select-none">
                                    <div class="relative flex items-center mt-0.5">
                                        <input 
                                            :checked="form.consent" type="checkbox" class="peer appearance-none w-5 h-5 border-2 rounded-md bg-white transition-all cursor-pointer"
                                            :class="[isSubmitted && !form.consent ? 'border-red-400 bg-red-50' : 'border-slate-300 peer-checked:border-[#0D95DA] peer-checked:bg-[#0D95DA]']"
                                            @change="updateFormField('consent', ($event.target as HTMLInputElement).checked)">
                                        <Icon icon="mdi:check" class="absolute w-4 h-4 text-blue-500 opacity-0 peer-checked:opacity-100 left-0.5 transition-opacity pointer-events-none" />
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-[11px] leading-tight transition-colors" :class="isSubmitted && !form.consent ? 'text-red-500 font-bold' : 'text-slate-600'">ฉันยินยอมรับข่าวสาร โปรโมชั่น และข้อมูลอัปเดต</span>
                                        <p class="text-[9px] text-slate-400 mt-1 italic">* ยกเลิกได้ทุกเมื่อในภายหลัง</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-slate-50 flex gap-3">
                        <button class="flex-2 py-3 px-4 rounded-xl font-bold text-white bg-[#0D95DA] hover:bg-[#0b7cb5] shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm" @click="emit('submit')">
                            ยืนยันการรับแจ้งเตือน
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
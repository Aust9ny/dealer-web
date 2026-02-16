<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Product } from '~/types/product';

const props = defineProps<{
    modelValue?: boolean;
    product: Product | null;
    form: { email: string; tel: string; consent: boolean };
    isSubmitted: boolean;
    isEmailValid: boolean;
    isTelValid: boolean;
    showEmailError: boolean;
    isSuccess: boolean; // 🟢 New state for success view
}>();

const emit = defineEmits(['update:modelValue', 'update:form', 'submit', 'keypress-numeric', 'reset-submit', 'reset-all']);

// Disable logic: Both fields are empty OR consent is not checked
const isButtonDisabled = computed(() => {
    return (!props.form.email && !props.form.tel) || !props.form.consent;
});

const updateFormField = (field: keyof typeof props.form, value: any) => {
    emit('update:form', {
        ...props.form,
        [field]: value
    });
    emit('reset-submit');
};

const handleClose = () => {
    emit('update:modelValue', false);
    // Give time for transition before resetting
    setTimeout(() => emit('reset-all'), 300); 
};
</script>

<template>
    <Teleport to="body">
        <Transition 
            enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="modelValue" class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200" @click.stop>
                    
                    <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 class="font-black text-slate-800 flex items-center gap-2">
                            {{ isSuccess ? 'สำเร็จ' : 'รับแจ้งเตือนสินค้าเข้า' }}
                        </h3>
                        <button class="text-slate-400 hover:text-slate-600 transition-colors" @click="handleClose">
                            <Icon icon="mdi:close" class="w-6 h-6" />
                        </button>
                    </div>

                    <div v-if="isSuccess" class="p-10 flex flex-col items-center text-center space-y-4">
                        <div class="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                            <Icon icon="mdi:check-circle" class="w-12 h-12" />
                        </div>
                        <div class="space-y-2">
                            <h2 class="text-xl font-black text-slate-800">บันทึกข้อมูลสำเร็จ!</h2>
                            <p class="text-slate-500 text-sm">เราจะแจ้งเตือนคุณทันทีเมื่อ <br> <span class="font-bold text-slate-700">{{ product?.name }}</span> <br> พร้อมสำหรับการสั่งซื้อ</p>
                        </div>
                        <button 
                            class="w-full py-3 mt-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all active:scale-95"
                            @click="handleClose">
                            ตกลง
                        </button>
                    </div>

                    <template v-else>
                        <div class="p-8 space-y-6">
                            <h1 class="text-center font-bold text-lg">แจ้งเตือนให้ทันทีที่สินค้านี้พร้อมจำหน่าย</h1>
                            <p class="text-center text-slate-500 text-[13px]">
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
                                        <Icon icon="mdi:email-outline" class="absolute left-4 top-1/2 -translate-y-1/2" :class="showEmailError ? 'text-red-400' : 'text-slate-400'" />
                                        <input 
                                            :value="form.email" type="email" placeholder="example@email.com"
                                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm"
                                            :class="[showEmailError ? 'border-red-300' : 'border-slate-200 focus:border-[#0D95DA]']"
                                            @input="updateFormField('email', ($event.target as HTMLInputElement).value)">
                                        </div>
                                        <span v-if="showEmailError" class="text-red-500 text-sm ml-3">* กรุณากรอกอีเมลให้ถูกต้อง</span>
                                </div>

                                <div class="space-y-1.5">
                                    <label class="text-xs font-bold text-slate-500 ml-1">เบอร์โทรศัพท์</label>
                                    <div class="relative">
                                        <Icon icon="mdi:phone-outline" class="absolute left-4 top-1/2 -translate-y-1/2" :class="isSubmitted && !isTelValid ? 'text-red-400' : 'text-slate-400'" />
                                        <input 
                                            :value="form.tel" type="text" inputmode="numeric" maxlength="10" placeholder="0XX-XXXX-XXX"
                                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none text-sm transition-all"
                                            :class="[isSubmitted && !isTelValid ? 'border-red-300' : 'border-slate-200 focus:border-[#0D95DA]']"
                                            @keypress="emit('keypress-numeric', $event)" @input="updateFormField('tel', ($event.target as HTMLInputElement).value)">
                                    </div>
                                    <span v-if="!isTelValid" class="text-red-500 text-sm ml-3">* กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง</span>
                                </div>

                                <div class="pt-2">
                                    <label class="group flex items-center gap-3 cursor-pointer">
                                        <div class="relative flex items-center mt-0.5">
                                            <input 
                                                :checked="form.consent" type="checkbox" class="peer hidden"
                                                @change="updateFormField('consent', ($event.target as HTMLInputElement).checked)">
                                            <div 
                                                class="w-5 h-5 border-2 rounded-md transition-all flex items-center justify-center peer-checked:bg-[#0D95DA] peer-checked:border-[#0D95DA] ml-1"
                                                :class="isSubmitted && !form.consent ? 'border-red-400' : 'border-slate-300'">
                                                <Icon icon="mdi:check" class="text-white w-4 h-4 opacity-100 peer-checked:opacity-100" />
                                            </div>
                                        </div>
                                        <span class="text-[11px] text-slate-600">ฉันยินยอมรับข่าวสารและโปรโมชั่น</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="p-6 bg-slate-50">
                            <button 
                                :disabled="isButtonDisabled"
                                class="w-full py-4 rounded-xl font-bold text-white transition-all active:scale-95 disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed"
                                :class="isButtonDisabled ? '' : 'bg-[#0D95DA] hover:bg-[#0b7cb5] shadow-lg shadow-blue-500/20'"
                                @click="emit('submit')">
                                {{ (form.email || form.tel) ? 'ยืนยันการรับแจ้งเตือน' : 'กรุณากรอกข้อมูลเพื่อแจ้งเตือน' }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
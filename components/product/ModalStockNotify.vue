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
    isSuccess: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'update:form', 'submit', 'keypress-numeric', 'reset-submit', 'reset-all']);

// Disable logic: ทั้งสองฟิลด์ว่าง OR ยังไม่ได้กดยินยอม
const isButtonDisabled = computed(() => {
    return (!props.form.email && !props.form.tel) || !props.form.consent;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateFormField = (field: keyof typeof props.form, value: any) => {
    emit('update:form', {
        ...props.form,
        [field]: value
    });
    emit('reset-submit');
};

const handleClose = () => {
    emit('update:modelValue', false);
    setTimeout(() => emit('reset-all'), 300); 
};
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div 
                v-if="modelValue" 
                class="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                @click="handleClose">
                
                <div 
                    class="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden border border-slate-200" 
                    @click.stop
                    >
                    
                    <div class="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                        <h3 class="font-black text-slate-800 flex items-center gap-2">
                            <Icon v-if="!isSuccess" icon="mdi:bell-ring-outline" class="text-[#0D95DA]" />
                            {{ isSuccess ? 'สำเร็จ' : 'รับแจ้งเตือนสินค้าเข้า' }}
                        </h3>
                        <button class="text-slate-400 hover:text-slate-600 transition-colors p-1" @click="handleClose">
                            <Icon icon="mdi:close" class="w-6 h-6" />
                        </button>
                    </div>

                    <div class="overflow-y-auto flex-1 custom-scrollbar">
                        <div v-if="isSuccess" class="p-8 sm:p-10 flex flex-col items-center text-center space-y-4">
                            <div class="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
                                <Icon icon="mdi:check-circle" class="w-12 h-12" />
                            </div>
                            <div class="space-y-2">
                                <h2 class="text-xl font-black text-slate-800">บันทึกข้อมูลสำเร็จ!</h2>
                                <p class="text-slate-500 text-sm leading-relaxed">
                                    เราจะแจ้งเตือนคุณทันทีเมื่อ <br> 
                                    <span class="font-bold text-slate-700">{{ product?.name }}</span> <br> 
                                    พร้อมสำหรับการสั่งซื้อ
                                </p>
                            </div>
                        </div>

                        <template v-else>
                            <div class="p-6 sm:p-8 space-y-6">
                                <div class="text-center space-y-2">
                                    <h1 class="font-bold text-lg text-slate-800">แจ้งเตือนให้ทันทีที่สินค้านี้พร้อมจำหน่าย</h1>
                                    <p class="text-slate-500 text-[13px] leading-relaxed">
                                        กรอกอีเมลหรือเบอร์โทรของคุณ ระบบจะแจ้งเตือนเมื่อสินค้าชิ้นนี้พร้อมจำหน่าย
                                    </p>
                                </div>

                                <div class="flex gap-4 items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                                    <NuxtImg 
                                        :src="product?.image" 
                                        :alt="product?.name"
                                        loading="lazy"
                                        format="webp"
                                        class="w-14 h-14 object-contain bg-white rounded-xl border border-slate-200 shrink-0 shadow-sm"
                                    />
                                    <div class="min-w-0">
                                        <p class="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-0.5">กำลังติดตาม</p>
                                        <p class="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">{{ product?.name }}</p>
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
                                                :class="[showEmailError ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200 focus:border-[#0D95DA] focus:ring-4 focus:ring-blue-50']"
                                                @input="updateFormField('email', ($event.target as HTMLInputElement).value)">
                                        </div>
                                        <p v-if="showEmailError" class="text-red-500 text-[11px] font-bold mt-1 ml-2 italic">* กรุณากรอกอีเมลให้ถูกต้อง</p>
                                    </div>

                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold text-slate-500 ml-1">เบอร์โทรศัพท์ (ถ้ามี)</label>
                                        <div class="relative">
                                            <Icon icon="mdi:phone-outline" class="absolute left-4 top-1/2 -translate-y-1/2" :class="isSubmitted && !isTelValid ? 'text-red-400' : 'text-slate-400'" />
                                            <input 
                                                :value="form.tel" type="text" inputmode="numeric" maxlength="10" placeholder="0XX-XXXX-XXX"
                                                class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none text-sm transition-all"
                                                :class="[isSubmitted && !isTelValid ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-200 focus:border-[#0D95DA] focus:ring-4 focus:ring-blue-50']"
                                                @keypress="emit('keypress-numeric', $event)" @input="updateFormField('tel', ($event.target as HTMLInputElement).value)">
                                        </div>
                                        <p v-if="!isTelValid" class="text-red-500 text-[11px] font-bold mt-1 ml-2 italic">* กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง</p>
                                    </div>

                                    <div class="pt-2">
                                        <label class="group flex items-center gap-3 cursor-pointer select-none">
                                            <div class="relative flex items-center shrink-0">
                                                <input 
                                                    :checked="form.consent" type="checkbox" class="peer hidden"
                                                    @change="updateFormField('consent', ($event.target as HTMLInputElement).checked)">
                                                <div 
                                                    class="w-5 h-5 border-2 rounded-md transition-all flex items-center justify-center peer-checked:bg-[#0D95DA] peer-checked:border-[#0D95DA]"
                                                    :class="isSubmitted && !form.consent ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white group-hover:border-blue-400'">
                                                    <Icon icon="mdi:check" class="text-white w-4 h-4" />
                                                </div>
                                            </div>
                                            <span class="text-[11px] text-slate-500 leading-tight">ฉันยินยอมรับข่าวสารและโปรโมชั่นพิเศษผ่านช่องทางที่ระบุไว้</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
                        <button 
                            v-if="isSuccess"
                            class="w-full py-4 rounded-xl font-black text-white bg-slate-900 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                            @click="handleClose">
                            ตกลง
                        </button>
                        <button 
                            v-else
                            :disabled="isButtonDisabled"
                            class="w-full py-4 rounded-xl font-black text-white transition-all active:scale-95 disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xl"
                            :class="isButtonDisabled ? '' : 'bg-[#0D95DA] hover:bg-[#0b7cb5] shadow-blue-500/20'"
                            @click="emit('submit')">
                            {{ (form.email || form.tel) ? 'ยืนยันการรับแจ้งเตือน' : 'กรุณากรอกข้อมูลเพื่อแจ้งเตือน' }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* Custom Scrollbar สำหรับ Modal Content */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}
</style>
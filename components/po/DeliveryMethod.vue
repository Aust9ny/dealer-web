<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import { useScrollLock } from '~/composables/shared/useScrollLock';
import { useDeliveryMethods } from '~/composables/po/useDeliveryMethods';

// 🟢 1. PROPS & EMITS
const props = defineProps<{
    isOpen: boolean;
    selectedMethod?: string;
}>();

const emit = defineEmits(['close', 'back', 'confirm']);

// จัดการเรื่องการล็อค Scroll พื้นหลังเมื่อ Modal เปิด
const isLocked = computed(() => props.isOpen);
useScrollLock(isLocked);

// 🟢 2. LOCAL STATE
const { deliveryMethods } = useDeliveryMethods();

const tempSelectedMethod = ref<string | null>(null);

watch(
    () => props.isOpen,
    (isOpen) => {
        if (!isOpen) return;
        tempSelectedMethod.value = props.selectedMethod || null;
    },
    { immediate: true }
);

// 🟢 3. ACTIONS
const selectMethod = (methodId: string) => {
    tempSelectedMethod.value = methodId;
};

const handleConfirm = () => {
    if (tempSelectedMethod.value) {
        // ส่งค่ากลับไปยังไฟล์แม่ (address.vue) ผ่าน Event confirm
        emit('confirm', tempSelectedMethod.value); 
    }
};

const handleClose = () => {
    tempSelectedMethod.value = null; 
    emit('close');
};
</script>

<template>
    <div 
        v-if="isOpen" 
        class="fixed inset-0 z-210 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
        <div class="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[95vh]">
            
            <div class="bg-white p-2 shrink-0 border-b border-slate-100">
                <div class="flex items-center justify-between w-full px-2 py-2">
                    <button 
                        class="hover:bg-slate-100 rounded-lg p-2 transition-colors"
                        @click="emit('back')"   
                    >
                        <Icon icon="mdi:chevron-left" class="w-7 h-7 text-slate-600" />
                    </button>

                    <h3 class="text-lg font-black text-slate-800 uppercase tracking-tight">เลือกวิธีการจัดส่ง</h3>
                    
                    <button class="p-2 hover:bg-slate-100 rounded-full transition-colors" @click="handleClose">
                        <Icon icon="mdi:close" class="w-6 h-6 text-slate-400" />
                    </button>
                </div>
            </div>

            <div class="p-6 space-y-4 overflow-y-auto scrollbar-thin flex-1 bg-white">

                <div class="grid grid-cols-1 gap-3">
                    <div 
                        v-for="method in deliveryMethods" :key="method.id"
                        class="p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 relative group"
                        :class="[tempSelectedMethod === method.id ? 'border-[#0D95DA] bg-blue-50/30' : 'border-slate-100 hover:border-slate-200']"
                        @click="selectMethod(method.id)">
                        
                        <div class="shrink-0">
                            <div 
                                class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors" 
                                :class="tempSelectedMethod === method.id ? 'border-[#0D95DA]' : 'border-slate-300'">
                                <div v-if="tempSelectedMethod === method.id" class="w-3 h-3 rounded-full bg-[#0D95DA]"/>
                            </div>
                        </div>

                        <div class="flex-1 flex flex-col gap-0.5">
                            <div class="flex items-center justify-between gap-2">
                                <p class="font-black text-sm text-slate-800 leading-tight">
                                    {{ method.label }}
                                </p>
                                <span class="text-[9px] font-black text-[#12B76A] bg-emerald-50 px-2 py-0.5 rounded-full uppercase">ฟรี</span>
                            </div>
                            <p class="text-[11px] text-slate-400 font-medium leading-tight">
                                {{ method.desc }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6 bg-white border-t border-slate-300 flex gap-3 shrink-0">
                <button
                    class="flex-[2.5] py-4 bg-primary text-white rounded-full uppercase text-md shadow-lg shadow-blue-900/10 hover:bg-[#003E73] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!tempSelectedMethod"
                    @click="handleConfirm">
                    ตกลง
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* สไตล์สำหรับ Scrollbar แบบบาง */
.scrollbar-thin::-webkit-scrollbar { width: 4px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }

/* Animation สำหรับ Modal */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

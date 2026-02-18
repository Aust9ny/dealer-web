<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Address } from '@/types/address';

// 🟢 PROPS & EMITS
defineProps<{
    isOpen: boolean;
    addresses: Address[];
    selectedId: number | string;
}>();

const emit = defineEmits(['close', 'select', 'add']);

// 🟢 LOCAL STATES
const isAddingNew = ref(false);
const newAddress = ref({
    label: '',
    recipientName: '',
    phone: '',
    addressDetail: '',
    subDistrict: '',
    district: '',
    province: '',
    postalCode: '',
    isDefault: false
});

// 🟢 ACTIONS
const handleSelect = (id: number | string) => {
    emit('select', id);
    isAddingNew.value = false;
};

const handleAdd = () => {
    emit('add', { ...newAddress.value });
    // Reset form
    newAddress.value = {
        label: '', recipientName: '', phone: '', addressDetail: '',
        subDistrict: '', district: '', province: '', postalCode: '', isDefault: false
    };
    isAddingNew.value = false;
};

const close = () => {
    emit('close');
    isAddingNew.value = false;
};
</script>

<template>
    <Transition name="fade">
        <div 
            v-if="isOpen"
            class="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                <div class="flex justify-end p-2">
                    <button class="mt-2 mr-2 text-slate-400 hover:bg-slate-100 rounded-xl" @click="close">
                        <Icon icon="mdi:close" class="w-6 h-6" />
                    </button>
                </div>

                <div class=" border-b pb-8 flex flex-col items-center bg-slate-50/50">
                    <h3 class="text-xl font-black text-slate-800 uppercase text-center">
                        {{ isAddingNew ? 'เพิ่มที่อยู่ใหม่' : 'เลือกที่อยู่จัดส่ง' }}
                    </h3>
                    <p class="text-xs text-slate-400 font-bold">บันทึกแล้ว {{ addresses.length }}/5 ที่อยู่</p>
                </div>

                <div v-if="!isAddingNew" class="p-6 space-y-3 overflow-y-auto max-h-[50vh] scrollbar-thin">
                    <div 
                        v-for="addr in addresses" :key="addr.id"
                        class="p-5 rounded-2xl border-2 cursor-pointer transition-all"
                        :class="[selectedId === addr.id ? 'border-[#0D95DA] bg-blue-50/50' : 'border-slate-100 hover:bg-slate-50']"
                        @click="handleSelect(addr.id)">
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center justify-between w-full">
                                <div class="flex gap-2 items-center">
                                    <Icon 
                                        :icon="selectedId === addr.id ? 'mdi:check-circle' : 'mdi:circle-outline'"
                                        class="w-6 h-6"
                                        :class="selectedId === addr.id ? 'text-[#0D95DA]' : 'text-slate-200'" />
                                    <span 
                                        v-if="addr.isDefault"
                                        class="text-[8px] bg-[#0D95DA] text-white px-1.5 py-0.5 rounded font-black uppercase">
                                        Default
                                    </span>
                                </div>

                                <button class="p-1 hover:bg-slate-200/50 rounded-full transition-colors" @click.stop="">
                                    <Icon 
                                        icon="octicon:kebab-horizontal-16" width="20" height="20"
                                        style="color: #747373" />
                                </button>
                            </div>

                            <div>
                                <p class="font-black text-sm text-slate-800">{{ addr.label || addr.recipientName }}</p>
                                <p class="text-[11px] text-slate-400 mt-1 leading-relaxed">
                                    {{ addr.addressDetail }} ต.{{ addr.subDistrict }} อ.{{ addr.district }} จ.{{
                                    addr.province }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button 
                        v-if="addresses.length < 5"
                        class="w-full py-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#0D95DA] hover:text-[#0D95DA] transition-all"
                        @click="isAddingNew = true">
                        <Icon icon="mdi:plus-circle-outline" class="w-8 h-8" />
                        <span class="text-xs font-black uppercase tracking-widest">เพิ่มที่อยู่ใหม่</span>
                    </button>
                </div>

                <div v-else class="p-8 space-y-4">
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ชื่อผู้รับ /
                            บริษัท</label>
                        <input 
                            v-model="newAddress.recipientName" type="text"
                            class="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm" placeholder="ชื่อ...">
                    </div>
                    <div class="space-y-1">
                        <label
                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest">รายละเอียดที่อยู่</label>
                        <textarea 
                            v-model="newAddress.addressDetail" rows="2"
                            class="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm resize-none"
                            placeholder="บ้านเลขที่, ถนน..." />
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button 
                            class="flex-1 py-4 font-black text-slate-400 uppercase text-xs"
                            @click="isAddingNew = false">ยกเลิก</button>
                        <button
                            class="flex-2 py-4 bg-[#0D95DA] text-white rounded-2xl font-black uppercase text-xs shadow-lg shadow-blue-500/20"
                            @click="handleAdd">บันทึกที่อยู่</button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    width: 5px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
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
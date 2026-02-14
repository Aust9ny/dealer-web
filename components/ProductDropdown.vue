<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Product } from '~/types/product';

interface Props {
    products: Product[]
    label?: string
    viewMode: 'list' | 'grid'
    isOpen?: boolean
    activeSubTag?: string
}

const {getProductUrl} = useProductUrl();

defineProps<Props>();
const emit = defineEmits(['toggle']);

// 🟢 Logic from composables (Nuxt auto-imports these)
const { 
    showNotifyModal, targetProduct, notifyForm, isSubmitted, 
    isEmailValid, isTelValid, openNotifyModal, onlyNumeric,isSuccess,resetNotifyState
} = useNotifyLogic();

// 🟢 Scroll Lock
useScrollLock(showNotifyModal);

const cartQuantities = ref<Record<number, number>>({});

const handleNotifySubmit = async () => {
    isSubmitted.value = true;
    if (!isEmailValid.value || !isTelValid.value || !notifyForm.value.consent) return;
    
    // Simulate API Call
    isSubmitted.value = false;
    notifyForm.value = { email: '', tel: '', consent: false };
    isSuccess.value = true;
};

</script>

<template>
    <div class="w-full mb-1">
        <button
            class="sticky top-0 z-50 w-full flex items-center justify-between bg-white border border-slate-300 px-4 py-6 rounded-2xl shadow-sm hover:bg-slate-50 transition-all text-left border-t-4 border-t-[#B0D7EB]"
            @click="emit('toggle')"
        >
            <div class="flex space-x-1 w-full text-sm">
                <span class="text-slate-500">รายการสินค้าในหมวดหมู่</span>
                <span class="text-slate-800 font-bold">{{ label || activeSubTag }}</span>
                <span class="text-[#0D95DA] font-bold">({{ products.length }})</span>
            </div>
            <Icon icon="mdi:chevron-down" class="w-5 h-5 text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
        </button>

        <Transition 
            enter-active-class="transition-[max-height,opacity] duration-500 ease-in-out"
            enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-[5000px] opacity-100"
            leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
            leave-from-class="max-h-[5000px] opacity-100" leave-to-class="max-h-0 opacity-0"
        >
            <div v-if="isOpen" class="mt-2 bg-slate-50 border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                <div v-if="viewMode === 'list'" class="overflow-x-auto scrollbar-thin bg-white">
                    <table class="w-full text-left border-separate border-spacing-0 table-auto">
                        <thead class="bg-slate-50 sticky top-0 z-30">
                            <tr class="text-[12px] uppercase tracking-tighter text-slate-500 font-black">
                                <th class="p-3 min-w-30 text-center sticky left-0 z-1 bg-slate-50 border-b border-r border-slate-200">รูปสินค้า</th>
                                <th class="p-3 min-w-45 max-w-45 sticky left-30 z-1 bg-slate-50 border-b border-r border-slate-200 shadow-[2px_0_0_0_#e2e8f0]">ชื่อสินค้า</th>
                                <th class="p-3 min-w-50 bg-slate-50 border-b border-r border-slate-200">รายละเอียด</th>
                                <th class="p-3 min-w-45 text-center bg-slate-50 border-b border-r border-slate-200">ประกัน</th>
                                <th class="p-3 text-center bg-blue-300/20 text-blue-900 border-b border-r border-slate-200">SRP</th>
                                <th class="p-3 text-center bg-blue-200/20 text-blue-800 border-b border-r border-slate-200">Tech</th>
                                <th class="p-3 text-center bg-blue-100/20 text-blue-800 border-b border-r border-slate-200">Dealer</th>
                                <th class="p-3 text-center bg-blue-50/20 text-blue-800 border-b border-r border-slate-200">Fran.</th>
                                <th class="p-3 text-center w-5 bg-slate-50 border-b border-r border-slate-200">จำนวน</th>
                                <th class="p-3 w-16 bg-slate-50/50 text-center border-b border-r border-slate-200">Pack</th>
                                <th class="p-3 w-20 bg-emerald-50 text-center text-emerald-700 border-b border-r border-slate-200">1-2 ชิ้น</th>
                                <th class="p-3 w-20 bg-emerald-100 text-center text-emerald-800 border-b border-r border-slate-200">3-5 ชิ้น</th>
                                <th class="p-3 w-20 bg-emerald-200 text-center text-emerald-900 border-b border-r border-slate-200">6 ชิ้นขึ้นไป</th>
                                <th class="p-3 text-center min-w-25 bg-slate-50 border-b border-slate-200 sticky right-0 z-10 border-l-2 border-l-slate-300 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">ตัวเลือก</th>
                            </tr>
                        </thead>

                        <tbody class="text-[12px] bg-white">
                            <tr v-for="product in products" :key="product.id" class="hover:bg-slate-50 transition-colors group">
                                <td class="p-2 sticky left-0 z-1 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100">
                                    <NuxtLink :to="getProductUrl(product)" class="hover:scale-105 active:scale-95">
                                        <img :src="product.image" class="w-10 h-10 mx-auto object-contain bg-white rounded-md p-1 border border-slate-200 shadow-sm">
                                    </NuxtLink>
                                    
                                </td>

                                <td class="p-3 font-bold sticky left-30 z-1 bg-white group-hover:bg-slate-50 border-b border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                    <div class="line-clamp-1 max-w-42.5">{{ product.name }}</div>
                                    <div class="gap-1 flex flex-wrap mt-1">
                                        <span v-if="product.stock && product.stock > 0" class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 border border-emerald-200">In Stock</span>
                                        <span v-else class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200 opacity-75">Out of Stock</span>
                                        <span v-if="product.isHot" class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-rose-100 text-rose-600 border border-rose-200">Hot</span>
                                    </div>
                                </td>

                                <td class="p-3 min-w-50 max-w-62.5 border-b border-r border-slate-100 whitespace-normal">
                                    <p class="text-slate-500 text-[11px] leading-relaxed line-clamp-2">{{ product.specs }}</p>
                                </td>

                                <td class="p-3 text-center border-b border-r border-slate-100">
                                    <span class="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{{ product.warranty }}</span>
                                </td>

                                <td class="p-3 text-center font-black bg-blue-300 border-b border-r border-blue-400/20">฿{{ product.price.toLocaleString() }}</td>
                                <td class="p-3 text-center font-bold bg-blue-200 border-b border-r border-blue-400/20">฿{{ (product.price * 0.95).toLocaleString() }}</td>
                                <td class="p-3 text-center font-semibold bg-blue-100 border-b border-r border-blue-400/20">฿{{ (product.price * 0.9).toLocaleString() }}</td>
                                <td class="p-3 text-center font-medium bg-blue-50 border-b border-r border-blue-400/20">฿{{ (product.price * 0.85).toLocaleString() }}</td>

                                <td class="p-3 border-b border-r border-slate-100">
                                    <input v-model="cartQuantities[product.id]" type="number" class="w-14 p-1 border border-slate-300 rounded text-center font-bold outline-none focus:ring-1 focus:ring-blue-400" placeholder="0">
                                </td>

                                <td class="p-3 text-center text-slate-400 italic border-b border-r border-slate-100">-</td>

                                <td class="p-3 text-center font-bold bg-emerald-50 text-emerald-700 border-b border-r border-emerald-200/50">฿{{ (product.price * 0.84).toLocaleString() }}</td>
                                <td class="p-3 text-center font-bold bg-emerald-100 text-emerald-800 border-b border-r border-emerald-200/50">฿{{ (product.price * 0.82).toLocaleString() }}</td>
                                <td class="p-3 text-center font-bold bg-emerald-200 text-emerald-900 border-b border-r border-emerald-200/50">฿{{ (product.price * 0.80).toLocaleString() }}</td>

                                <td class="p-3 text-center border-b sticky right-0 z-1 bg-white group-hover:bg-slate-50 border-l-2 border-l-slate-300 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] items-center justify-center">
                                    <button v-if="product.stock && product.stock > 0" class="group/btn bg-white text-slate-500 p-2 rounded-lg border border-slate-300 hover:bg-[#0D95DA] hover:text-white transition-all flex items-center justify-center gap-1.5 mx-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11m0-8.993a.5.5 0 0 1 .5.5V6h2.493a.5.5 0 0 1 0 1H7v2.493a.5.5 0 1 1-1 0V7H3.507a.5.5 0 0 1 0-1H6V3.507a.5.5 0 0 1 .5-.5" clip-rule="evenodd" /><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.5 14h-1.7c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C14 16.28 14 17.12 14 18.8v1.7M15.5 8H14m-2.5 4H13m.75-8h.35c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748c.436.856.436 1.976.436 4.216v3.449c0 .978 0 1.468-.11 1.928c-.099.408-.26.798-.48 1.156c-.247.404-.593.75-1.285 1.442l-.25.25c-.692.692-1.038 1.038-1.442 1.286a4 4 0 0 1-1.156.479c-.46.11-.95.11-1.928.11H10.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C4 17.46 4 16.34 4 14.1v-.35" /></g></svg>
                                        <span class="text-[11px] font-bold transition-colors">เปิดบิล</span>
                                    </button>
                                    <span v-else class="underline decoration-dotted text-slate-400 hover:text-blue-500 cursor-pointer" @click="openNotifyModal(product)">รับแจ้งเตือนเมื่อสินค้าเข้า</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <ProductCard 
                v-for="product in products" 
                :key="product.id" 
                :product="product"
                view-mode="grid"
          />
        </div>
            </div>
        </Transition>
        <ModalStockNotify 
            v-model="showNotifyModal"
            v-model:form="notifyForm"
            :product="targetProduct"
            :is-submitted="isSubmitted"
            :is-email-valid="isEmailValid"
            :is-tel-valid="isTelValid"
            :is-success="isSuccess"
            :show-email-error="isSubmitted && !isEmailValid"
            @submit="handleNotifySubmit"
            @keypress-numeric="onlyNumeric"
            @reset-submit="isSubmitted = false"
            @reset-all="resetNotifyState"
        />
    </div>
</template> 

<style scoped>
.scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: #f1f5f9; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.sticky { background-clip: padding-box; }
</style>
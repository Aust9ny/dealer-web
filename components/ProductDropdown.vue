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

// 🟢 Auth contains our global cart state and addToCart function
const { currentUser, addToCart } = useAuth();

const { getProductUrl } = useProductUrl();

defineProps<Props>();
const emit = defineEmits(['toggle']);

// 🟢 Notification Logic
const {
    showNotifyModal, targetProduct, notifyForm, isSubmitted,
    isEmailValid, isTelValid, openNotifyModal, onlyNumeric, isSuccess, resetNotifyState
} = useNotifyLogic();

useScrollLock(showNotifyModal);

// 🟢 Local state for inputs in the table
const cartQuantities = ref<Record<number, number>>({});

// 🟢 Price Logic based on Role
const getRolePrice = (basePrice: number) => {
    if (!currentUser.value) return basePrice;
    const multipliers = { Technician: 0.96, Dealer: 0.95, Franchise: 0.94 };
    return basePrice * (multipliers[currentUser.value.role as keyof typeof multipliers] || 1);
};

// 🟢 Action: Add to Cart
const handleAdd = (product: Product) => {
    // Use the input value, default to 1 if empty/0
    const qty = cartQuantities.value[product.id] || 1;

    if (qty > 0) {
        addToCart(product, qty);

        // Optional: Reset quantity after adding
        // cartQuantities.value[product.id] = 1;

        // Suggestion: Add a small toast or vibration here so user knows it worked
    }
};

const handleNotifySubmit = async () => {
    isSubmitted.value = true;
    if (!isEmailValid.value || !isTelValid.value || !notifyForm.value.consent) return;
    isSubmitted.value = false;
    notifyForm.value = { email: '', tel: '', consent: false };
    isSuccess.value = true;
};
</script>

<template>
    <div class="w-full mb-1">
        <button
            class="sticky top-23 z-60 w-full flex items-center justify-between bg-white border border-slate-300 px-4 py-6 rounded-2xl shadow-sm hover:bg-slate-50 transition-all text-left border-t-4 border-t-[#B0D7EB]"
            @click="emit('toggle')">
            <div class="flex space-x-1 w-full text-sm">
                <span class="text-slate-500">รายการสินค้าในหมวดหมู่</span>
                <span class="text-slate-800 font-bold">{{ label || activeSubTag }}</span>
                <span class="text-[#0D95DA] font-bold">({{ products.length }})</span>
            </div>
            <Icon
                icon="mdi:chevron-down" class="w-5 h-5 text-slate-400 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }" />
        </button>
        <Transition
            enter-active-class="transition-[max-height,opacity] duration-500 ease-in-out"
            enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-[5000px] opacity-100"
            leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
            leave-from-class="max-h-[5000px] opacity-100" leave-to-class="max-h-0 opacity-0">
            <div v-if="isOpen" class="mt-2 bg-slate-50 border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                <div v-if="viewMode === 'list'" class="overflow-x-auto scrollbar-thin bg-white">
                    <table class="w-full min-w-300 text-left border-separate border-spacing-0 table-fixed">
                        <thead class="bg-slate-50 sticky top-0 z-30">
                            <tr class="text-[12px] uppercase tracking-tighter text-slate-500 font-black">
                                <th
                                    class="p-3 w-20 text-center sticky left-0 z-40 bg-slate-50 border-b border-r border-slate-200">
                                    รูปสินค้า</th>
                                <th
                                    class="p-3 w-62.5 sticky left-20 z-40 bg-slate-50 border-b border-r border-slate-200 shadow-[2px_0_0_0_#e2e8f0]">
                                    ชื่อสินค้า</th>
                                <th class="p-3 w-auto bg-slate-50 border-b border-r border-slate-200">รายละเอียด</th>
                                <th class="p-3 w-30 text-center bg-slate-50 border-b border-r border-slate-200">
                                    ประกัน</th>
                                <th
                                    class="p-3 w-25 text-center bg-blue-100/30 text-blue-900 border-b border-r border-slate-200">
                                    SRP</th>
                                <th
                                    class="p-3 w-30 text-center bg-[#0D95DA]/10 text-[#0D95DA] border-b border-r border-slate-200 uppercase">
                                    {{ currentUser?.role || 'Guest' }}
                                </th>
                                <th class="p-3 w-20 text-center bg-slate-50 border-b border-r border-slate-200">
                                    จำนวน</th>
                                <th
                                    class="p-3 w-27.5 bg-emerald-50 text-center text-emerald-700 border-b border-r border-slate-200">
                                    6 ชิ้น+</th>
                                <th
                                    class="p-3 w-30 text-center bg-slate-50 border-b border-slate-200 sticky right-0 z-30 border-l-2 border-l-slate-300 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                    ตัวเลือก</th>
                            </tr>
                        </thead>

                        <tbody class="text-[12px] bg-white">
                            <tr
                                v-for="product in products" :key="product.id"
                                class="hover:bg-slate-50 transition-colors group">
                                <td
                                    class="p-2 sticky left-0 z-20 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100">
                                    <NuxtLink :to="getProductUrl(product)" class="hover:scale-105 active:scale-95">
                                        <img
                                            :src="product.image"
                                            class="w-10 h-10 mx-auto object-contain bg-white rounded-md p-1 border border-slate-200 shadow-sm">
                                    </NuxtLink>
                                </td>

                                <td
                                    class="p-3 font-bold sticky left-20 z-20 bg-white group-hover:bg-slate-50 border-b border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                    <NuxtLink :to="getProductUrl(product)" class="hover:scale-105 active:scale-95">
                                        <div class="whitespace-normal line-clamp-2">{{ product.name }}</div>
                                        <div class="gap-1 flex flex-wrap mt-1">
                                            <span
                                                v-if="product.stock && product.stock > 0"
                                                class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 border border-emerald-200">In
                                                Stock</span>
                                            <span
                                                v-else
                                                class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200 opacity-75">Out
                                                of Stock</span>
                                        </div>
                                    </NuxtLink>
                                </td>

                                <td
                                    class="p-3 border-b border-r border-slate-100 whitespace-normal text-slate-500 italic">
                                    <div class="line-clamp-2">{{ product.specs }}</div>
                                </td>

                                <td class="p-3 text-center border-b border-r border-slate-100 font-bold">
                                    {{ product.warranty }}
                                </td>

                                <td
                                    class="p-3 text-center font-bold bg-slate-50/50 border-b border-r border-slate-100 text-slate-400">
                                    ฿{{ product.price.toLocaleString() }}
                                </td>

                                <td
                                    class="p-3 text-center font-black bg-blue-50 text-[#0D95DA] border-b border-r border-blue-100">
                                    ฿{{ getRolePrice(product.price).toLocaleString() }}
                                </td>

                                <td class="p-3 border-b border-r border-slate-100 text-center">
                                    <input
                                        v-model.number="cartQuantities[product.id]" type="number" min="1"
                                        class="w-14 p-1 border border-slate-300 rounded text-center font-bold outline-none focus:ring-1 focus:ring-blue-400"
                                        placeholder="1">
                                </td>

                                <td
                                    class="p-3 text-center font-bold bg-emerald-50 text-emerald-800 border-b border-r border-emerald-100">
                                    ฿{{ (getRolePrice(product.price) * 0.98).toLocaleString() }}
                                </td>

                                <td
                                    class="p-3 text-center border-b sticky right-0 z-20 bg-white group-hover:bg-slate-50 border-l-2 border-l-slate-300 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                    <button
                                        v-if="product.stock && product.stock > 0"
                                        class="group/btn bg-[#0D95DA] text-white p-2 rounded-lg hover:bg-[#004a85] transition-all flex items-center justify-center gap-1.5 mx-auto w-full active:scale-90"
                                        @click="handleAdd(product)">
                                        <Icon icon="mdi:cart-plus" class="w-4 h-4" />
                                        <span class="text-[10px] font-bold">เปิดบิล</span>
                                    </button>
                                    <span
                                        v-else
                                        class="text-[10px] underline text-slate-400 hover:text-blue-500 cursor-pointer"
                                        @click="openNotifyModal(product)">แจ้งเตือน<br>เมื่อมีสินค้าเข้า</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <ProductCard v-for="product in products" :key="product.id" :product="product" view-mode="grid" />
                </div>
            </div>
        </Transition>
        <ModalStockNotify
v-model="showNotifyModal" v-model:form="notifyForm" :product="targetProduct"
            :is-submitted="isSubmitted" :is-email-valid="isEmailValid" :is-tel-valid="isTelValid"
            :is-success="isSuccess" :show-email-error="isSubmitted && !isEmailValid" @submit="handleNotifySubmit"
            @keypress-numeric="onlyNumeric" @reset-submit="isSubmitted = false" @reset-all="resetNotifyState" />
    </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

.sticky {
    background-clip: padding-box;
}
</style>
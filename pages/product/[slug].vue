<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useDashboard } from '~/composables/dashboard/useDashboard';
import { useAuth } from '~/composables/auth/useAuth';
import { useRolePricing } from '~/composables/auth/useRolePricing';
import { useThaiFormatters } from '~/composables/shared/useThaiFormatters';
import { useNotifyLogic } from '~/composables/shared/useNotifyLogic';
import { useScrollLock } from '~/composables/shared/useScrollLock';

const data = useDashboard();
const product = data.products;
const isExpanded = ref(false);

const route = useRoute();
const slug = route.params.slug as string;

// 🟢 1. Logic from composables (Nuxt auto-imports these)
const { currentUser } = useAuth();
const { getRoleMultiplier } = useRolePricing();
const { formatNumber } = useThaiFormatters();
const {
    showNotifyModal, targetProduct, notifyForm, isSubmitted,
    isEmailValid, isTelValid, openNotifyModal, onlyNumeric, isSuccess, resetNotifyState
} = useNotifyLogic();

// 🟢 2. Scroll Lock for Modal
useScrollLock(showNotifyModal);

// Extract ID and find product
const productId = computed(() => Number(slug.split('-').pop()));
const products = computed(() => product.value.find(p => p.id === productId.value));

const quantity = ref('');

// Pricing Tiers Logic
const priceTiers = computed(() => {
    const basePrice = products.value?.price || 0;

    // Determine current user role price
    const roleMultiplier = getRoleMultiplier(currentUser.value?.role);
    const rolePrice = basePrice * roleMultiplier;

    const tiers = [
        { label: 'SRP (ราคาแนะนำ):', price: basePrice, class: 'bg-white text-slate-500' }
    ];

    // Only add the second tier if a user is logged in
    if (currentUser.value) {
        tiers.push({ 
            label: `ราคาของคุณ (${currentUser.value.role}):`, 
            price: rolePrice, 
            class: 'bg-blue-50 text-[#0D95DA] border-2 border-blue-100' 
        });
    }

    return tiers;
});

const isOverStock = computed(() => {
    if (!products.value || !products.value.stock) return false;
    return Number(quantity.value) > products.value.stock;
});

// 🟢 3. Action Handler (Same as Dropdown)
const handleActionClick = () => {
    if (!products.value || isOverStock.value) return;

    if (!products.value.stock || products.value.stock <= 0) {
        // Now TS knows products.value is defined here
        openNotifyModal(products.value);
    } else {
        // 🟢 ESLint no-console Fix: Removed the console statement or use a custom logger
        // For production, usually we trigger a cart store action here
    }
};

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
    <div v-if="product" class="min-h-screen bg-[#F8F9FA] pb-20">
        <div class="max-w-300 mx-auto px-3 md:px-4 py-4 flex items-center gap-2 text-[12px] md:text-[13px] text-slate-500 overflow-x-auto whitespace-nowrap">
            <NuxtLink to="/" class="hover:text-blue-500">หน้าแรก</NuxtLink>
            <Icon icon="mdi:chevron-right" class="w-4 h-4" />
            <NuxtLink to="../category">
                <span class="hover:text-blue-500 cursor-pointer">หมวดหมู่สินค้า</span>
            </NuxtLink>
            <Icon icon="mdi:chevron-right" class="w-4 h-4" />
            <span class="truncate font-bold text-slate-800">{{ products?.name }}</span>
        </div>

        <div class="max-w-300 mx-auto px-3 md:px-4">
            <div class="bg-white border border-slate-200 rounded-2xl p-4 md:p-8 shadow-sm">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                    <div class="lg:col-span-5 space-y-6">
                        <div class="lg:col-span-5 space-y-6">
                            <div
                                class="aspect-square flex items-center justify-center p-4 rounded-xl group relative bg-white border border-slate-100 overflow-hidden">

                                <div 
                                    v-if="!products?.stock || products.stock <= 0"
                                    class="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                                    <div
                                        class="flex flex-col items-center justify-center bg-slate-700/80 opacity-50 text-white px-6 py-3 rounded-full shadow-xl transform w-50 h-50">
                                        <div class="flex gap-1 ">
                                            <span class="font-black text-sm tracking-widest uppercase text-center">สินค้าหมด</span>
                                        </div>
                                    </div>
                                </div>

                                <img 
                                    v-if="products?.image" :src="products?.image"
                                    class="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                    :class="{ 'grayscale opacity-50': !products?.stock || products.stock <= 0 }">

                                <div v-else class="text-slate-300 flex flex-col items-center">
                                    <Icon icon="mdi:image-off-outline" class="w-12 h-12" />
                                    <span class="text-xs mt-2">No Image Available</span>
                                </div>
                            </div>

                            <div class="flex gap-2 md:gap-3 justify-center overflow-x-auto">
                                <div 
                                    v-for="i in 5" :key="i"
                                    class="w-16 h-16 border rounded-lg p-1 cursor-pointer hover:border-blue-500 transition-all"
                                    :class="{ 'opacity-50 grayscale': !products?.stock || products.stock <= 0 }">
                                    <img :src="products?.image" class="w-full h-full object-contain">
                                </div>
                            </div>
                        </div>
                        <button class="flex items-center gap-2 mx-auto text-slate-400 text-sm hover:text-blue-500">
                            <Icon icon="mdi:share-variant-outline" /> แชร์สินค้า
                        </button>
                    </div>

                    <div class="lg:col-span-7 space-y-4 ">
                        <div>
                            <p class="text-[#0D95DA] font-bold uppercase text-xs tracking-wide">{{ products?.brand }}
                            </p>
                            <h1 class="text-xl font-bold text-slate-800 mt-1 leading-tight">{{ products?.name }}</h1>
                            <p class="text-xs text-slate-400 mt-2">รหัสสินค้า : {{ products?.sku }}</p>
                        </div>

                        <ul class="bg-slate-50 rounded-md p-4 space-y-1 border border-slate-100">
                            <li class="text-[11px] text-slate-500 flex gap-2">
                                <span class="font-bold min-w-20">• Spec:</span> {{ products?.specs }}
                            </li>
                            <li class="text-[11px] text-slate-500 flex gap-2">
                                <span class="font-bold min-w-20">• Warranty:</span> {{ products?.warranty }}
                            </li>
                        </ul>

                        <div class="rounded-md overflow-hidden border border-slate-100">
                            <div 
                                v-for="tier in priceTiers" :key="tier.label"
                                class="flex justify-between items-center p-3 border-b last:border-0"
                                :class="tier.class">
                                <span class="text-sm font-bold text-slate-600">{{ tier.label }}</span>
                                <span 
                                    class="text-lg font-black text-slate-900"
                                >
                                    ฿{{ formatNumber(tier.price) }}
                                </span>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center gap-3 md:gap-6 mt-8 md:mt-32">
                                <div class="flex items-center">
                                    <span class="text-sm font-bold mr-4">จำนวนสั่ง:</span>
                                    <input 
                                        v-model="quantity" type="number"
                                        class="w-20 p-2 border text-center rounded focus:ring-1 outline-none transition-all"
                                        :class="[
                                            isOverStock ? 'border-red-500 bg-red-50 ' : 'border-slate-300',
                                            (!products?.stock || products.stock <= 0) ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'bg-white'
                                        ]" :disabled="!products?.stock || products.stock <= 0">
                                </div>
                            </div>

                            <Transition 
                                enter-active-class="transition duration-200 ease-out"
                                enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
                                <p v-if="isOverStock" class="text-[11px] font-bold text-red-500 ml-0 md:ml-25.25">
                                    * จำนวนสินค้าตอนนี้มีเพียง {{ products?.stock }} ชิ้น
                                </p>
                            </Transition>
                        </div>

                        <button 
                            :disabled="isOverStock"
                            class="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            :class="[
                                isOverStock
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                    : (!products?.stock || products.stock <= 0)
                                        ? 'bg-white text-slate-500 border-2 border-slate-300 hover:bg-blue-50'
                                        : 'bg-primary text-white hover:cursor-pointer shadow-lg shadow-blue-500/20 active:scale-[0.98]'
                            ]" @click="handleActionClick">
                            <template v-if="isOverStock">
                                <Icon icon="mdi:alert-circle-outline" class="w-5 h-5" />
                                <span>จำนวนสินค้าไม่พอ</span>
                            </template>
                            <template v-else-if="!products?.stock || products.stock <= 0">
                                <Icon icon="mdi:bell-outline" class="w-5 h-5" />
                                <span class="underline hover-scale-103">รับแจ้งเตือนเมื่อมีสินค้าเข้า</span>
                            </template>
                            <template v-else>
                                <Icon icon="mdi:cart-plus" class="w-5 h-5" />
                                <span>เปิดบิล</span>
                            </template>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div class="flex border-b overflow-x-auto whitespace-nowrap">
                    <button
                        class="px-4 md:px-8 py-4 border-b-2 border-blue-500 text-blue-500 font-bold text-sm">รายละเอียดสินค้า</button>
                    <button
                        class="px-4 md:px-8 py-4 text-slate-400 font-bold text-sm hover:bg-slate-50 transition-colors">คุณสมบัติ</button>
                </div>

                <div 
                    class="relative transition-all duration-500 ease-in-out"
                    :class="[isExpanded ? 'max-h-500' : 'max-h-100 overflow-hidden']">

                    <div class="p-4 md:p-8 space-y-6">
                        <h2 class="text-lg font-bold text-slate-800">รายละเอียดสินค้า {{ products?.name }}</h2>
                        <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {{ products?.specs }} <br><br>
                            Powered by high-performance components designed for speed and reliability.
                            This product includes standard manufacturer warranty coverage.
                        </p>

                        <div class="pt-4 border-t border-slate-100">
                            <h3 class="font-bold text-slate-800 mb-4">Feature Highlights:</h3>
                            <ul class="space-y-2 text-sm text-slate-600">
                                <li v-for="feature in 8" :key="feature" class="flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                                    High-performance technology built for professional standards.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        v-if="!isExpanded"
                        class="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white/80 to-transparent z-10" />
                </div>

                <div class="p-4 flex justify-center bg-transparent">
                    <button
                        class="flex items-center gap-2  border border-slate-300 p-4 bg-slate-100 rounded-3xl text-slate-500 font-bold text-sm hover:text-[#0678B4] transition-colors"
                        @click="isExpanded = !isExpanded">
                        {{ isExpanded ? 'แสดงน้อยลง' : 'ดูรายละเอียดเพิ่มเติม' }}
                    </button>
                </div>
            </div>
        </div>

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
            @reset-all="resetNotifyState" />
    </div>
</template>

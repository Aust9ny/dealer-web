<script setup lang="ts">
import type { Product } from '~/types/product';

interface Props {
    products: Product[];
    label?: string;
}

defineProps<Props>();
const isOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

// ฟังก์ชันสำหรับเลือกสินค้า
</script>

<template>
    <div class="w-full mb-4">
        <button
            class="w-full flex items-center justify-between bg-white border border-slate-300 px-4 py-6 rounded-2xl shadow-sm hover:bg-slate-50 transition-all text-left border-t-4 border-t-[#B0D7EB]"
            @click="isOpen = !isOpen"
        >
            <div v-if="selectedProduct" class="flex items-center gap-3 w-full">
                <span class="text-sm font-bold text-slate-700 truncate">{{ selectedProduct.name }}</span>
            </div>
            <div v-else class="flex space-x-1 w-full">
                <span class="text-slate-500 text-sm">{{ products[0]?.name || 'ค้นหาและเลือกสินค้า...' }}</span>
                <span class="text-slate-500 text-sm">({{ products.length }}) รายการ</span>
            </div>
            <svg 
                class="w-5 h-5 text-slate-400 transition-transform duration-300" 
                :class="{ 'rotate-180': isOpen }" 
                fill="none"
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>

        <transition 
            enter-active-class="transition-[max-height,opacity] duration-500 ease-in-out"
            enter-from-class="max-h-0 opacity-0" 
            enter-to-class="max-h-[1200px] opacity-100"
            leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out" 
            leave-from-class="max-h-[1200px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
        >
            <div 
                v-if="isOpen"
                class="mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden"
            >
                <div class="overflow-x-auto scrollbar-thin">
                    <table class="w-full text-left border-collapse table-auto">
                        <thead class="bg-slate-50 sticky top-0 z-10 border-b border-slate-300">
                            <tr class="text-[12px] uppercase tracking-tighter text-slate-500 font-black divide-x divide-slate-200">
                                <th class="p-3 w-20 text-center">รูปสินค้า</th>
                                <th class="p-3 min-w-45">ชื่อสินค้า</th>
                                <th class="p-3 min-w-50">รายละเอียด/ของแถม</th>
                                <th class="p-3 text-center">ประกัน/ผ่อน</th>
                                <th class="p-3 text-center">SRP</th>
                                <th class="p-3 text-center">Tech</th>
                                <th class="p-3 text-center">Dealer</th>
                                <th class="p-3 text-center">Fran.</th>
                                <th class="p-3 text-center w-20">จำนวนสั่ง</th>
                                <th class="p-3 w-16 bg-slate-50/50 text-center">Pack</th>
                                <th class="p-3 w-20 bg-slate-50/50 text-center">1 ชิ้นขึ้นไป</th>
                                <th class="p-3 text-center w-20">ตัวเลือก</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-100 text-[12px]">
                            <tr 
                                v-for="product in products" :key="product.id"
                                class="hover:bg-slate-50 transition-colors divide-x divide-slate-200 cursor-pointer"
                            >
                                <td class="p-2">
                                    <div class="w-10 h-10 mx-auto bg-white rounded-md p-1 border border-slate-200 shadow-sm">
                                        <img :src="product.image" class="w-full h-full object-contain">
                                    </div>
                                </td>
                                <td class="p-3 font-bold text-slate-800 max-w-50">
                                    {{ product.name }}
                                    <div class="flex items-center gap-1">
                                        <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 border border-emerald-200">
                                            In Stock
                                        </span>
                                    </div>
                                </td>
                                <td class="p-3 max-w-62.5 whitespace-normal border-r border-slate-200">
                                    <div class="flex flex-col gap-2">
                                        <p class="text-slate-500 text-[11px] leading-relaxed">
                                            {{ product.specs }}
                                        </p>
                                    </div>
                                </td>
                                <td class="p-3 text-center whitespace-nowrap">
                                    <span class="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{{ product.warranty }}</span>
                                </td>
                                <td class="p-3 text-center font-black text-black bg-blue-300">
                                    ฿{{ product.price.toLocaleString() }}
                                </td>
                                <td class="p-3 text-center font-bold text-black bg-blue-200">
                                    ฿{{ (product.price * 0.95).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}) }}
                                </td>
                                <td class="p-3 text-center font-semibold text-black bg-blue-100">
                                    ฿{{ (product.price * 0.9).toLocaleString() }}
                                </td>
                                <td class="p-3 text-center font-medium text-black bg-blue-50">
                                    ฿{{ (product.price * 0.85).toLocaleString() }}
                                </td>
                                <td class="p-3">
                                    <input type="number" class="w-14 p-1 border border-slate-300 rounded text-center font-bold" value="">
                                </td>
                                <td class="p-3 text-center text-slate-400 italic">-</td>
                                <td class="p-3 text-center text-slate-400 italic">-</td>
                                <td class="p-3 text-center">
                                    <button class="bg-slate-900 text-white p-2 rounded-lg hover:bg-[#0D95DA] transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                            <path d="M5 12h14M12 5v14" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </transition>
    </div>
</template>
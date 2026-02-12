<script setup lang="ts">
import type { Product } from '~/types/product';
import { Icon } from '@iconify/vue'; // Add this import

interface Props {
    products: Product[];
    label?: string;
    viewMode: 'list' | 'grid';
    isOpen?: boolean;
    activeSubTag?: string;
}

defineProps<Props>();
const emit = defineEmits(['toggle']);

const selectedProduct = ref<Product | null>(null);
const cartQuantities = ref<Record<number, number>>({});

// Optional: Logic to handle "Open Bill" count
// const totalItems = computed(() => {
//   return Object.values(cartQuantities.value).reduce((sum, q) => sum + (q || 0), 0);
// });

// Modal & Form State
const showNotifyModal = ref(false);
const targetProduct = ref<Product | null>(null);
const notifyForm = ref({
    email: '',
    tel: '',
    consent : false 
});

const openNotifyModal = (product: Product) => {
    targetProduct.value = product;
    showNotifyModal.value = true;
};

const isSubmitted = ref(false); // Track if user tried to submit

// Standard Email Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^0\d{7}$/;

// Optional: Only validate tel if the user actually typed something
const isTelValid = computed(() => {
    if (!notifyForm.value.tel) return true; // Phone is optional
    return telRegex.test(notifyForm.value.tel);
});

// Helper to block non-numeric keys
const onlyNumeric = (event: KeyboardEvent) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
};
// Computed validation
const isEmailValid = computed(() => {
    return emailRegex.test(notifyForm.value.email);
});

// Logic to determine if we should show error styling
const showEmailError = computed(() => {
    return isSubmitted.value && !isEmailValid.value;
});

const handleNotifySubmit = async () => {
    isSubmitted.value = true;
    if (!isEmailValid.value || !isTelValid.value || !notifyForm.value.consent) return;
    showNotifyModal.value = false;
    isSubmitted.value = false;
    notifyForm.value = { email: '', tel: '' , consent : false};
    alert('บันทึกการแจ้งเตือนสำเร็จ!');
};
</script>
<template>
    <div class="w-full mb-1">
        <button
            class="sticky top-0 z-50 w-full flex items-center justify-between bg-white border border-slate-300 px-4 py-6 rounded-2xl shadow-sm hover:bg-slate-50 transition-all text-left border-t-4 border-t-[#B0D7EB]"
            @click="emit('toggle')">
            <div v-if="selectedProduct" class="flex items-center gap-3 w-full">
                <span class="text-sm font-bold text-slate-700 truncate">{{
                    selectedProduct.name
                    }}</span>
            </div>
            <div v-else class="flex space-x-1 w-full">
                <span class="text-slate-500 text-sm">รายการสินค้าในหมวดหมู่</span>
                <span class="text-slate-800 font-bold text-sm">{{
                    label || activeSubTag
                    }}</span>
                <span class="text-[#0D95DA] text-sm font-bold">({{ products.length }})</span>
            </div>
            <svg 
                class="w-5 h-5 text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': isOpen }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>

        <transition 
            enter-active-class="transition-[max-height,opacity] duration-500 ease-in-out"
            enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-[5000px] opacity-100"
            leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
            leave-from-class="max-h-[5000px] opacity-100" leave-to-class="max-h-0 opacity-0">
            <div v-if="isOpen" class="mt-2 bg-slate-50 border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
                <div v-if="viewMode === 'list'" class="overflow-x-auto scrollbar-thin bg-white">
                    <table class="w-full text-left border-separate border-spacing-0 table-auto">
                        <thead class="bg-slate-50 sticky top-0 z-30">
                            <tr class="text-[12px] uppercase tracking-tighter text-slate-500 font-black">
                                <th
                                    class="p-3 w-20 text-center sticky left-0 z-1 bg-slate-50 border-b border-r border-slate-200">
                                    รูปสินค้า
                                </th>

                                <th
                                    class="p-3 min-w-45 max-w-45 sticky left-14 z-1 bg-slate-50 border-b border-r border-slate-200 shadow-[2px_0_0_0_#e2e8f0]">
                                    ชื่อสินค้า
                                </th>

                                <th class="p-3 min-w-50 bg-slate-50 border-b border-r border-slate-200">
                                    รายละเอียด/ของแถม
                                </th>
                                <th class="p-3 text-center bg-slate-50 border-b border-r border-slate-200">
                                    ประกัน/ผ่อน
                                </th>
                                <th
                                    class="p-3 text-center bg-blue-300/20 text-blue-900 border-b border-r border-slate-200">
                                    SRP
                                </th>
                                <th
                                    class="p-3 text-center bg-blue-200/20 text-blue-800 border-b border-r border-slate-200">
                                    Tech
                                </th>
                                <th
                                    class="p-3 text-center bg-blue-100/20 text-blue-800 border-b border-r border-slate-200">
                                    Dealer
                                </th>
                                <th
                                    class="p-3 text-center bg-blue-50/20 text-blue-800 border-b border-r border-slate-200">
                                    Fran.
                                </th>
                                <th class="p-3 text-center w-5 bg-slate-50 border-b border-r border-slate-200">
                                    จำนวนสั่ง
                                </th>
                                <th class="p-3 w-16 bg-slate-50/50 text-center border-b border-r border-slate-200">
                                    Pack
                                </th>

                                <th
                                    class="p-3 w-20 bg-emerald-50 text-center text-emerald-700 border-b border-r border-slate-200">
                                    1-2 ชิ้น
                                </th>
                                <th
                                    class="p-3 w-20 bg-emerald-100 text-center text-emerald-800 border-b border-r border-slate-200">
                                    3-5 ชิ้น
                                </th>
                                <th
                                    class="p-3 w-20 bg-emerald-200 text-center text-emerald-900 border-b border-r border-slate-200">
                                    6 ชิ้นขึ้นไป
                                </th>

                                <th
                                    class="p-3 text-center min-w-25 bg-slate-50 border-b border-slate-200 sticky right-0 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-l-2 border-l-slate-300">
                                    ตัวเลือก
                                </th>
                            </tr>
                        </thead>

                        <tbody class="text-[12px] bg-white">
                            <tr 
                                v-for="product in products" :key="product.id"
                                class="hover:bg-slate-50 transition-colors cursor-pointer group">
                                <td
                                    class="p-2 sticky left-0 z-1 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100">
                                    <div
                                        class="w-10 h-10 mx-auto bg-white rounded-md p-1 border border-slate-200 shadow-sm">
                                        <img :src="product.image" class="w-full h-full object-contain" >
                                    </div>
                                </td>

                                <td
                                    class="p-3 font-bold sticky left-14 z-1 bg-white group-hover:bg-slate-50 border-b border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] flex flex-wrap">
                                    <div class="truncate-line-clamp-1 max-w-42.5">
                                        {{ product.name }}
                                    </div>

                                    <div class="gap-1 flex flex-wrap">
                                        <div class="flex items-center gap-1 mt-1">
                                            <span
                                                class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 border border-emerald-200">
                                                In Stock
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-1 mt-1">
                                            <span
                                                class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-rose-100 text-rose-600 border border-rose-200">
                                                Hot
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td
                                    class="p-3 min-w-50 max-w-62.5 whitespace-normal border-b border-r border-slate-100">
                                    <p class="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                                        {{ product.specs }}
                                    </p>
                                </td>

                                <td class="p-3 text-center whitespace-nowrap border-b border-r border-slate-100">
                                    <span class="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold">{{
                                        product.warranty }}</span>
                                </td>

                                <td
                                    class="p-3 text-center font-black text-black bg-blue-300 border-b border-r border-blue-400/20">
                                    ฿{{ product.price.toLocaleString() }}
                                </td>
                                <td
                                    class="p-3 text-center font-bold text-black bg-blue-200 border-b border-r border-blue-400/20">
                                    ฿{{
                                        (product.price * 0.95).toLocaleString(undefined, {
                                            minimumFractionDigits: 0,
                                    })
                                    }}
                                </td>
                                <td
                                    class="p-3 text-center font-semibold text-black bg-blue-100 border-b border-r border-blue-400/20">
                                    ฿{{ (product.price * 0.9).toLocaleString() }}
                                </td>
                                <td
                                    class="p-3 text-center font-medium text-black bg-blue-50 border-b border-r border-blue-400/20">
                                    ฿{{ (product.price * 0.85).toLocaleString() }}
                                </td>

                                <td class="p-3 border-b border-r border-slate-100">
                                    <input 
                                        v-model="cartQuantities[product.id]" type="number"
                                        class="w-14 p-1 border border-slate-300 rounded text-center font-bold focus:ring-1 outline-none focus:ring-blue-400"
                                        placeholder="0" >
                                </td>

                                <td class="p-3 text-center text-slate-400 italic border-b border-r border-slate-100">
                                    -
                                </td>

                                <td
                                    class="p-3 text-center font-bold bg-emerald-50 text-emerald-700 border-b border-r border-emerald-200/50">
                                    ฿{{ (product.price * 0.84).toLocaleString() }}
                                </td>
                                <td
                                    class="p-3 text-center font-bold bg-emerald-100 text-emerald-800 border-b border-r border-emerald-200/50">
                                    ฿{{ (product.price * 0.82).toLocaleString() }}
                                </td>
                                <td
                                    class="p-3 text-center font-bold bg-emerald-200 text-emerald-900 border-b border-r border-emerald-200/50">
                                    ฿{{ (product.price * 0.8).toLocaleString() }}
                                </td>

                                <td
                                    class="p-3 text-center border-b border-slate-100 sticky right-0 z-1 bg-white border-l border-l-slate-300 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                    <button
                                        v-if="product.stock !== undefined && product.stock >= 0"
                                        class="group/btn bg-white text-slate-500 p-2 rounded-lg border border-slate-300 transition-all active:scale-95 hover:bg-[#0D95DA] hover:border-[#0D95DA] hover:text-white shadow-sm flex items-center justify-center gap-1.5 min-w-20">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 24 24" class="transition-colors duration-200">
                                            <g fill="none">
                                                <path 
                                                    fill="currentColor" fill-rule="evenodd"
                                                    d="M6.5 12a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11m0-8.993a.5.5 0 0 1 .5.5V6h2.493a.5.5 0 0 1 0 1H7v2.493a.5.5 0 1 1-1 0V7H3.507a.5.5 0 0 1 0-1H6V3.507a.5.5 0 0 1 .5-.5"
                                                    clip-rule="evenodd" />
                                                <path 
                                                    stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="1.5"
                                                    d="M20.5 14h-1.7c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C14 16.28 14 17.12 14 18.8v1.7M15.5 8H14m-2.5 4H13m.75-8h.35c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748c.436.856.436 1.976.436 4.216v3.449c0 .978 0 1.468-.11 1.928c-.099.408-.26.798-.48 1.156c-.247.404-.593.75-1.285 1.442l-.25.25c-.692.692-1.038 1.038-1.442 1.286a4 4 0 0 1-1.156.479c-.46.11-.95.11-1.928.11H10.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C4 17.46 4 16.34 4 14.1v-.35" />
                                            </g>
                                        </svg>

                                        <span class="text-[11px] font-bold transition-colors duration-200">
                                            เปิดบิล
                                        </span>
                                    </button>
                                    <span
                                        v-else class="underline decoration-dotted hover:text-blue-400"
                                        @click="openNotifyModal(product)">
                                        รับแจ้งเตือนเมื่อมีสินค้าเข้า
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div 
                v-else
                    class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <ProductCard 
                        v-for="product in products" :key="product.id" :product="product"
                        :view-mode="viewMode" />
                </div>
            </div>
        </transition>
        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div 
                    v-if="showNotifyModal"
                    class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ">
                    <div 
                        class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
                        @click.stop>
                        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 class="font-black text-slate-800 flex items-center gap-2">
                                รับแจ้งเตือนสินค้าเข้า
                            </h3>

                            <button 
                                class="text-slate-400 hover:text-slate-600 transition-colors"
                                @click="showNotifyModal = false">
                                <Icon icon="mdi:close" class="w-6 h-6" />
                            </button>
                        </div>

                        <div class="p-8 space-y-6">
                            <h1 class="text-center font-bold text-lg">
                                แจ้งเตือนให้ทันทีที่สินค้านี้พร้อมจำหน่าย
                            </h1>
                            <p class=" text-center whitespace-pre-line ">
                                กรอกอีเมลหรือเบอร์โทรของคุณ
                                ระบบจะแจ้งเตือนเมื่อสินค้าชิ้นนี้พร้อมจำหน่าย
                            </p>
                            <div class="flex gap-4 items-start bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                <img 
                                    :src="targetProduct?.image"
                                    class="w-16 h-16 object-contain bg-white rounded-lg border border-slate-200 shrink-0" >
                                <div>
                                    <p class="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                                        กำลังติดตาม
                                    </p>
                                    <p class="text-sm font-bold text-slate-800 line-clamp-2">
                                        {{ targetProduct?.name }}
                                    </p>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div class="space-y-1.5">
                                    <label class="text-xs font-bold text-slate-500 ml-1">อีเมลสำหรับรับแจ้งเตือน</label>
                                    <div class="relative">
                                        <Icon 
                                            icon="mdi:email-outline"
                                            class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" :class="showEmailError ? 'text-red-400' : 'text-slate-400'" 
                                        />
                                        <input 
                                            v-model="notifyForm.email" type="email" placeholder="example@email.com"
                                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm"
                                            :class="[
                                                showEmailError
                                                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                                                    : 'border-slate-200 focus:ring-blue-100 focus:border-[#0D95DA]',
                                            ]" @input="isSubmitted = false" >
                                    </div>

                                    <transition 
                                        enter-active-class="transition duration-200 ease-out"
                                        enter-from-class="opacity-0 -translate-y-1"
                                        enter-to-class="opacity-100 translate-y-0">
                                        <p v-if="showEmailError" class="text-[10px] text-red-500 font-bold ml-1">
                                            * กรุณากรอกรูปแบบอีเมลให้ถูกต้อง (เช่น name@domain.com)
                                        </p>
                                    </transition>
                                </div>

                                <div class="space-y-1.5">
                                    <label class="text-xs font-bold text-slate-500 ml-1">เบอร์โทรศัพท์</label>
                                    <div class="relative">
                                        <Icon 
                                            icon="mdi:phone-outline"
                                            class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" :class="isSubmitted && !isTelValid
                                                    ? 'text-red-400'
                                                    : 'text-slate-400'
                                                " />
                                        <input 
                                            v-model="notifyForm.tel" type="text" inputmode="numeric" maxlength="10"
                                            placeholder="08XXXXXXXX"
                                            class="w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-sm"
                                            :class="[
                                                isSubmitted && !isTelValid
                                                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                                                    : 'border-slate-200 focus:ring-blue-100 focus:border-[#0D95DA]',
                                            ]" @keypress="onlyNumeric" @input="isSubmitted = false" >
                                    </div>

                                    <p  
                                        v-if="isSubmitted && !isTelValid"
                                        class="text-[10px] text-red-500 font-bold ml-1">
                                        * กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 0812345678)
                                    </p>
                                </div>
                                <div class="pt-2 px-1">
  <label class="group flex items-start gap-3 cursor-pointer select-none">
    <div class="relative flex items-center mt-0.5">
      <input 
        v-model="notifyForm.consent"
        type="checkbox"
        class="peer appearance-none w-5 h-5 border-2 rounded-md bg-white transition-all cursor-pointer"
        :class="[
          isSubmitted && !notifyForm.consent 
            ? 'border-red-400 bg-red-50' 
            : 'border-slate-300 peer-checked:border-[#0D95DA] peer-checked:bg-[#0D95DA]'
        ]"
      >
      <Icon 
        icon="mdi:check" 
        class="absolute w-4 h-4 text-blue-500 opacity-0 peer-checked:opacity-100 left-0.5 transition-opacity pointer-events-none" 
      />
    </div>
    
    <div class="flex flex-col">
      <span 
        class="text-[11px] leading-tight transition-colors"
        :class="isSubmitted && !notifyForm.consent ? 'text-red-500 font-bold' : 'text-slate-600'"
      >
        ฉันยินยอมรับข่าวสาร โปรโมชั่น และข้อมูลอัปเดตจากร้านค้าผ่านทางอีเมลและเบอร์โทรศัพท์
      </span>
      <p class="text-[9px] text-slate-400 mt-1 italic">
        * คุณสามารถยกเลิกการรับข่าวสารได้ทุกเมื่อในภายหลัง
      </p>
    </div>
  </label>
</div>
                            </div>
                        </div>

                        <div class="p-6 bg-slate-50 flex gap-3">
                            <button
                                class="flex-2 py-3 px-4 rounded-xl font-bold text-white bg-[#0D95DA] hover:bg-[#0b7cb5] shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm"
                                @click="handleNotifySubmit">
                                ยืนยันการรับแจ้งเตือน
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
/* Modern scrollbar styling */
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

/* Ensure sticky columns don't have transparent gaps */
.sticky {
    background-clip: padding-box;
}
</style>

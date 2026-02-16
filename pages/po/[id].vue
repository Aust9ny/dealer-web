<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useMockPO } from '@/composables/useMockPO';

// 🟢 1. STATES & DATA
const route = useRoute();
const router = useRouter();
const { getPOById, userOrders } = useMockPO();
const isSidebarOpen = ref(true);
const isQuickSelectOpen = ref(false);
const flyoutOffset = ref(0);
const isFlipped = ref(false);

const poId = computed(() => route.params.id as string);
const po = computed(() => getPOById(poId.value));

// 🟢 2. CALCULATIONS
const subtotal = computed(() => po.value?.totalAmount || 0);
const vat = computed(() => subtotal.value * 0.07);
const grandTotal = computed(() => subtotal.value + vat.value);

const formatPrice = (val: number) => new Intl.NumberFormat('th-TH').format(val);
const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('th-TH', {
    year: '2-digit', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date(dateStr));
};

// 🟢 3. SIDEBAR FLYOUT LOGIC (Matched to Catalog)
const handleSidebarItemClick = (event: MouseEvent) => {
  if (!isSidebarOpen.value) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const estimatedMenuHeight = 400;
    
    if (rect.top + estimatedMenuHeight > viewportHeight) {
      isFlipped.value = true;
      flyoutOffset.value = viewportHeight - rect.bottom; 
    } else {
      isFlipped.value = false;
      flyoutOffset.value = rect.top;
    }
    isQuickSelectOpen.value = true;
  }
};

const goBack = () => {
  const from = route.query.from as string;

  if (from && from.startsWith('/category')) {
    router.push(from);
  } else if (po.value?.id) {
    router.push(`/category/${po.value.id}`);
  } else {
    router.push('/category');
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen w-full bg-slate-100 p-2 md:p-4 pt-24">
    <nav class="flex items-center gap-2 mb-4 px-4 text-sm font-medium">
      <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300 rotate-180" />
      <button class="text-slate-500 hover:text-[#0D95DA]" @click="goBack">เลือกสินค้าเพิ่ม</button>
    </nav>

    <div class="flex flex-1 gap-3 items-start overflow-visible">
      <aside 
        :class="[isSidebarOpen ? 'w-64' : 'w-20']"
        class="sticky top-24 h-[calc(100vh-120px)] bg-white text-black transition-all duration-300 flex flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden"
      >
        <div class="p-4 flex justify-between items-center border-b h-16 shrink-0">
          <span v-if="isSidebarOpen" class="font-bold truncate text-[#0D95DA]">ประวัติการสั่งซื้อ</span>
          <button 
            class="hover:bg-slate-100 p-1.5 rounded-lg transition-colors ml-1"
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <Icon icon="mdi:menu" class="w-6 h-6 text-slate-600" />
          </button>
        </div>
        
        <nav class="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
          <div 
            v-for="order in userOrders" :key="order.id"
            class="relative group"
            @mouseenter="handleSidebarItemClick($event)"
          >
            <NuxtLink 
              :to="`/po/${order.id}`"
              class="flex items-center gap-3 p-3 rounded-xl transition-all border border-transparent "
              :class="[poId === order.id ? 'bg-blue-50 text-[#0D95DA] border-blue-100' : 'hover:bg-slate-50 text-slate-600']"
            >
              <div class="min-w-6 flex justify-center">
                <Icon :icon="poId === order.id ? 'mdi:file-check' : 'mdi:file-outline'" class="w-6 h-6" />
              </div>
              <div v-if="isSidebarOpen" class="overflow-hidden">
                <p class="font-bold text-xs truncate">#{{ order.id }}</p>
                <p class="text-[10px] opacity-60">{{ formatDate(order.createdAt).split(' ')[0] }}</p>
              </div>
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-3 pb-10">
        <header class="bg-white border-b border-slate-200 p-6 shadow-sm shrink-0 rounded-2xl border-t-6 border-t-[#0D95DA]">
          <div v-if="po" class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                <Icon icon="mdi:file-document-edit-outline" class="w-8 h-8 text-[#0D95DA]" />
              </div>
              <div>
                <h1 class="text-xl font-black text-slate-800 uppercase tracking-tight">ใบสั่งซื้อ #{{ po.id }}</h1>
                <div class="flex items-center gap-3 mt-1">
                   <span class="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{{ formatDate(po.createdAt) }}</span>
                   <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase">{{ po.status }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button class="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all">
                <Icon icon="mdi:printer-outline" class="w-5 h-5" />
              </button>
              <button class="bg-[#0D95DA] text-white px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#004a85] transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Icon icon="mdi:magnify-scan" class="w-4 h-4" />
                เช็คสถานะ
              </button>
            </div>
          </div>
        </header>

        <section v-if="po" class="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div class="overflow-x-auto scrollbar-thin">
            <table class="w-full text-left border-separate border-spacing-0 table-auto">
              <thead class="bg-slate-50 sticky top-0 z-30">
                <tr class="text-[11px] uppercase tracking-tighter text-slate-500 font-black">
                  <th class="p-4 w-12 text-center sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200"><input type="checkbox" class="rounded"></th>
                  <th class="p-4 text-center border-b border-r border-slate-200">รูปสินค้า</th>
                  <th class="p-4 border-b border-r border-slate-200 min-w-62.5">ชื่อสินค้า</th>
                  <th class="p-4 border-b border-r border-slate-200">รายละเอียด</th>
                  <th class="p-4 text-center border-b border-r border-slate-200">จำนวนสั่ง</th>
                  <th class="p-4 text-right border-b border-r border-slate-200">ราคา/หน่วย</th>
                  <th class="p-4 text-right border-b border-r border-slate-200 bg-blue-50/50">ราคารวม</th>
                  <th class="p-4 text-center border-b border-slate-200">จัดการ</th>
                </tr>
              </thead>
              <tbody class="text-[12px] bg-white">
                <tr v-for="item in po.items" :key="item.product.id" class="hover:bg-slate-50/80 transition-colors group">
                  <td class="p-4 text-center sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100"><input type="checkbox" class="rounded"></td>
                  <td class="p-4 text-center border-b border-r border-slate-100">
                    <img :src="item.product.image" class="w-12 h-12 mx-auto object-contain bg-white rounded-lg p-1 border border-slate-200">
                  </td>
                  <td class="p-4 font-bold border-b border-r border-slate-200">
                    <p class="text-[#0D95DA] text-[10px] uppercase font-black tracking-tighter">{{ item.product.brand }}</p>
                    <p class="line-clamp-2 leading-tight text-slate-800">{{ item.product.name }}</p>
                  </td>
                  <td class="p-4 text-slate-400 italic text-[10px] border-b border-r border-slate-100">{{ item.product.specs }}</td>
                  <td class="p-4 text-center border-b border-r border-slate-100">
                    <div class="inline-block bg-slate-50 border border-slate-200 rounded-lg py-1 px-4 font-black text-slate-700">{{ item.quantity }}</div>
                  </td>
                  <td class="p-4 text-right font-bold text-slate-500 border-b border-r border-slate-100">฿{{ formatPrice(item.priceAtPurchase) }}</td>
                  <td class="p-4 text-right font-black text-slate-900 border-b border-r border-slate-200 bg-blue-50/20">฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}</td>
                  <td class="p-4 text-center border-b border-slate-100">
                    <button class="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Icon icon="mdi:trash-can-outline" class="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-8 border-t border-slate-100 flex justify-end bg-white">
            <div class="w-full max-w-87.5 space-y-4">
              <div class="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span>ยอดรวมสินค้า (Sub-total):</span>
                <span class="text-slate-800 text-sm">฿{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span>ภาษีมูลค่าเพิ่ม VAT (7%):</span>
                <span class="text-slate-800 text-sm">฿{{ formatPrice(vat) }}</span>
              </div>
              <div class="h-px bg-slate-100 my-4" />
              <div class="flex justify-between items-end">
                <span class="text-sm font-black text-slate-800 uppercase tracking-tighter italic">Total Amount:</span>
                <span class="text-4xl font-black text-[#0D95DA] tracking-tighter">฿{{ formatPrice(grandTotal) }}</span>
              </div>
              <p class="text-[10px] text-slate-400 text-right font-medium italic">*ราคานี้รวมภาษีมูลค่าเพิ่มเรียบร้อยแล้ว</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-2"
    >
      <div v-if="isQuickSelectOpen && !isSidebarOpen" class="fixed inset-0 z-100 bg-transparent" @click.self="isQuickSelectOpen = false">
        <div 
          class="absolute left-22 bg-white w-72 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          :style="isFlipped ? { bottom: `${flyoutOffset}px` } : { top: `${flyoutOffset}px` }"
        >
          <div class="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 class="font-black text-[10px] text-[#0D95DA] uppercase tracking-widest">เลือกใบสั่งซื้อด่วน</h3>
            <button @click="isQuickSelectOpen = false"><Icon icon="mdi:close" class="w-4 h-4 text-slate-400" /></button>
          </div>
          <div class="p-2 max-h-[50vh] overflow-y-auto space-y-1 scrollbar-thin">
            <NuxtLink 
              v-for="order in userOrders" :key="order.id" :to="`/orders/${order.id}`"
              class="w-full p-3 rounded-xl flex justify-between items-center transition-all hover:bg-slate-50"
              @click="isQuickSelectOpen = false"
            >
              <span class="text-xs font-bold text-slate-700">#{{ order.id }}</span>
              <Icon icon="mdi:chevron-right" class="w-4 h-4 text-[#0D95DA]" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <AddressPOFooter />
</template>

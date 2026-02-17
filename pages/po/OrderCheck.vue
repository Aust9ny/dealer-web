<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useMockPO } from '@/composables/useMockPO';
import { useRoute , useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
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

// 🟢 1. STATES & DATA
const route = useRoute();
const { getPOById, userOrders } = useMockPO();
const isSidebarOpen = ref(true);
const isQuickSelectOpen = ref(false);
const flyoutOffset = ref(0);
const isFlipped = ref(false);

// PO Flow state from your composable
const { currentStep } = usePOFlow();

const poId = computed(() => route.params.id as string);
const po = ref(getPOById(poId.value));

// 🟢 2. INTERACTIVE LOGIC STATES
const checkedItems = ref<Record<number, boolean>>({});

// 🟢 3. SELECT ALL LOGIC
const isAllSelected = computed({
  get: () => {
    if (!po.value || po.value.items.length === 0) return false;
    return po.value.items.every((item) => checkedItems.value[item.product.id]);
  },
  set: (val) => {
    if (po.value) {
      po.value.items.forEach((item) => {
        checkedItems.value[item.product.id] = val;
      });
    }
  },
});

// Sync data when route changes
watch(
  () => poId.value,
  (newId) => {
    const data = getPOById(newId);
    if (data) {
      po.value = JSON.parse(JSON.stringify(data));
      data.items.forEach((item) => {
        checkedItems.value[item.product.id] = true;
      });
    }
  },
  { immediate: true },
);


// 🟢 4. CALCULATIONS (Only for checked items)
const subtotal = computed(() => {
  if (!po.value) return 0;
  return po.value.items.reduce((sum, item) => {
    if (checkedItems.value[item.product.id]) {
      return sum + item.priceAtPurchase * item.quantity;
    }
    return sum;
  }, 0);
});

const vat = computed(() => subtotal.value * 0.07);
const grandTotal = computed(() => subtotal.value + vat.value);

// 🟢 5. ACTIONS
const removeProduct = (productId: number) => {
  if (!po.value) return;
  po.value.items = po.value.items.filter(
    (item) => item.product.id !== productId,
  );
  checkedItems.value[productId] = false;
};

const formatPrice = (val: number) => new Intl.NumberFormat('th-TH').format(val);
const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('th-TH', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(dateStr));
};

// 🟢 6. READY TO SHIP LOGIC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReadyToShipStatus = (item: any) => {
  const stock = item.product.stock || 0;
  const requested = item.quantity;
  if (stock <= 0) return { text: 'สินค้าหมด', color: 'text-red-500 bg-red-50' };
  if (stock >= requested)
    return {
      text: `พร้อมส่ง ${requested} ชิ้น`,
      color: 'text-emerald-600 bg-emerald-50',
    };
  return {
    text: `พร้อมส่ง ${stock} ชิ้น`,
    color: 'text-orange-600 bg-orange-50',
  };
};

const handleSidebarItemClick = (event: MouseEvent) => {
  if (!isSidebarOpen.value) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (rect.top + 400 > viewportHeight) {
      isFlipped.value = true;
      flyoutOffset.value = viewportHeight - rect.bottom;
    } else {
      isFlipped.value = false;
      flyoutOffset.value = rect.top;
    }
    isQuickSelectOpen.value = true;
  }
};

</script>

<template>
  <div class="flex flex-col min-h-screen w-full bg-slate-100 p-2 md:p-4 pt-24">
    <div class="max-w-350 mx-auto w-full px-4">
      <nav class="flex items-center mb-4 text-sm font-medium w-full">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1">
            <Icon icon="mdi:chevron-right" class="w-4 h-4 text-slate-300 rotate-180" />
            <button class="text-slate-500 hover:text-[#0D95DA] transition-colors" @click="goBack">
              เลือกสินค้าเพิ่ม
            </button>
          </div>
          <div class="flex items-center justify-end">
            <POStepper />
          </div>
        </div>
      </nav>
    </div>

    <div class="flex flex-1 gap-3 items-start overflow-visible">
      <aside 
        :class="[isSidebarOpen ? 'w-64' : 'w-20']"
        class="sticky top-24 h-[calc(100vh-120px)] bg-white transition-all duration-300 flex flex-col rounded-xl border-t-6 border-t-[#0D95DA] shadow-md shrink-0 overflow-hidden">
        <div class="p-4 flex justify-between items-center border-b h-16 shrink-0">
          <span v-if="isSidebarOpen" class="font-bold truncate text-[#0D95DA]">เลือกใบสั่งซื้อ ({{ userOrders.length }})</span>
          <button class="hover:bg-slate-100 p-1.5 rounded-lg" @click="isSidebarOpen = !isSidebarOpen">
            <Icon icon="mdi:menu" class="w-6 h-6 text-slate-600" />
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
          <div 
            v-for="order in userOrders" :key="order.id" class="relative group"
            @mouseenter="handleSidebarItemClick($event)">
            <NuxtLink 
              :to="`/po/${order.id}`"
              class="flex items-center gap-3 p-3 rounded-xl transition-all border border-transparent" :class="[
                poId === order.id
                  ? 'bg-blue-50 text-[#0D95DA] border-blue-100'
                  : 'hover:bg-slate-50 text-slate-600',
              ]">
              <div v-if="isSidebarOpen" class="overflow-hidden">
                <p class="font-bold text-xs truncate">
                  #{{ order.id }} |
                  {{ formatDate(order.createdAt).split(" ")[0] }} |
                  ฿{{ formatPrice(order.totalAmount) }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-3 pb-32">
        <div v-if="currentStep === 1">
          <header
            class="bg-white border-b border-slate-200 p-6 shadow-sm rounded-2xl border-t-6 border-t-[#0D95DA] mb-3">
            <div v-if="po" class="flex justify-between items-center">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                  <Icon icon="mdi:file-document-edit-outline" class="w-8 h-8 text-[#0D95DA]" />
                </div>
                <div>
                  <h1 class="text-xl font-black text-slate-800 uppercase tracking-tight">
                    {{ po.id }}
                  </h1>
                  <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                    {{ formatDate(po.createdAt) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <button class="p-2.5 text-slate-400 border rounded-xl">
                  <Icon icon="mdi:printer-outline" class="w-5 h-5" />
                </button>
                <button
                  class="bg-[#0D95DA] text-white px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-500/20">
                  <Icon icon="mdi:magnify-scan" class="w-4 h-4" />เช็คสถานะ
                </button>
              </div>
            </div>
          </header>

          <section 
            v-if="po"
            class="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden StyledReceipt">
            <div class="overflow-x-auto scrollbar-thin">
              <table class="w-full text-left border-separate border-spacing-0">
                <thead class="bg-slate-50 sticky top-0 z-30">
                  <tr class="text-[11px] uppercase text-slate-500 font-black tracking-tighter">
                    <th class="p-4 w-12 text-center sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200">
                      <input v-model="isAllSelected" type="checkbox" class="rounded cursor-pointer">
                    </th>
                    <th class="p-4 text-center border-b border-r border-slate-200">
                      รูปสินค้า
                    </th>
                    <th class="p-4 border-b border-r border-slate-200 min-w-62.5">
                      ชื่อสินค้า
                    </th>
                    <th class="p-4 border-b border-r border-slate-200">
                      รายละเอียด
                    </th>
                    <th class="p-4 text-center border-b border-r border-slate-200">
                      จำนวนสั่ง
                    </th>
                    <th class="p-4 text-right border-b border-r border-slate-200">
                      ราคา/หน่วย
                    </th>
                    <th class="p-4 text-right border-b border-r border-slate-200 bg-blue-50/50">
                      ราคารวม
                    </th>
                    <th class="p-4 text-center border-b border-r border-slate-200">
                      สถานะพร้อมส่ง
                    </th>
                    <th class="p-4 text-center border-b border-slate-200">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody class="text-[12px] bg-white">
                  <tr 
                    v-for="item in po.items" :key="item.product.id"
                    class="hover:bg-slate-50/80 transition-colors group" :class="{
                      'opacity-50 grayscale-[0.3]':
                        !checkedItems[item.product.id],
                    }">
                    <td
                      class="p-4 text-center sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100">
                      <input v-model="checkedItems[item.product.id]" type="checkbox" class="rounded cursor-pointer">
                    </td>
                    <td class="p-4 text-center border-b border-r border-slate-100">
                      <img 
                        :src="item.product.image"
                        class="w-12 h-12 mx-auto object-contain bg-white rounded-lg p-1 border border-slate-200">
                    </td>
                    <td class="p-4 font-bold border-b border-r border-slate-200">
                      <p class="text-[#0D95DA] text-[10px] uppercase font-black">
                        {{ item.product.brand }}
                      </p>
                      <p class="line-clamp-2 text-slate-800">
                        {{ item.product.name }}
                      </p>
                    </td>
                    <td class="p-4 text-slate-400 italic text-[10px] border-b border-r border-slate-100">
                      {{ item.product.specs }}
                    </td>
                    <td class="p-4 text-center border-b border-r border-slate-100">
                      <input 
                        v-model.number="item.quantity" type="number" min="1"
                        class="w-16 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-center font-black">
                    </td>
                    <td class="p-4 text-right font-bold text-slate-500 border-b border-r border-slate-100">
                      ฿{{ formatPrice(item.priceAtPurchase) }}
                    </td>
                    <td
                      class="p-4 text-right font-black text-slate-900 border-b border-r border-slate-200 bg-blue-50/20">
                      ฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}
                    </td>
                    <td class="p-4 text-center border-b border-r border-slate-100">
                      <span 
                        :class="getReadyToShipStatus(item)?.color"
                        class="px-3 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap">{{
                        getReadyToShipStatus(item)?.text }}</span>
                    </td>
                    <td class="p-4 text-center border-b border-slate-100">
                      <button class="text-slate-300 hover:text-red-500 p-2" @click="removeProduct(item.product.id)">
                        <Icon icon="mdi:trash-can-outline" class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-8 border-t border-slate-100 flex justify-end bg-white">
              <div class="w-full max-w-md space-y-3 bg-white">
                <div class="flex justify-between text-sm font-bold text-slate-600">
                  <span>สินค้าทั้งหมด ({{ po?.items.length }} ชิ้น):</span><span>฿{{ formatPrice(subtotal + 4110)
                    }}</span>
                </div>
                <div class="flex justify-between items-center text-sm font-bold text-slate-600">
                  <div class="flex items-center gap-3 justify-center">
                    <span>
                      ส่วนลด:
                    </span>
                    <span class="inline-flex items-center gap-1 bg-blue-50 text-[#0D95DA] px-2 py-0.5 rounded border border-blue-200 text-xs font-black">
                      #DEALER2026
                      <Icon icon="mdi:close" class="w-3 h-3 cursor-pointer" />
                    </span>
                  </div>
                  <span class="text-slate-800">-฿{{ formatPrice(4110) }}</span>
                </div>
                <div class="flex justify-between text-sm font-bold pt-2 border-t border-dashed">
                  <span>ยอดก่อน Vat:</span>
                  <span class="text-slate-800 font-black">฿{{ formatPrice(subtotal - vat) }}</span>
                </div>
                <div class="flex justify-between text-sm font-bold text-slate-600">
                  <span>ยอด Vat7%:</span><span class="text-slate-800 font-black">฿{{ formatPrice(vat) }}</span>
                </div>
                <div class="mt-4 pt-4 border-t-2 border-slate-800">
                  <div class="bg-slate-50/80 p-6 flex justify-between items-center rounded-sm">
                    <div class="flex flex-col">
                      <span class="text-lg font-black text-slate-800 uppercase">
                        ยอดรวมสุทธิทั้งหมด:
                      </span>
                      <span class="text-[10px] text-slate-400 font-medium">
                        (ราคานี้รวมภาษีมูลค่าเพิ่ม / Vat แล้ว)
                      </span>
                    </div>
                    <span class="text-2xl font-black text-[#2D5A9E]">
                      ฿{{ formatPrice(grandTotal) }}
                    </span>
                  </div>
                  <div class="mt-2 border-b-2 border-slate-800" />
                  <div class="mt-0.5 border-b border-slate-800" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div 
          v-else-if="currentStep === 2"
          class="p-20 bg-white rounded-3xl border border-t-6 border-t-[#0D95DA] text-center shadow-md">
          <Icon icon="mdi:map-marker-radius" class="w-16 h-16 text-slate-200 mx-auto" />
          <h2 class="text-xl font-bold mt-4 text-slate-800 uppercase tracking-tight">
            ที่อยู่ในการจัดส่ง
          </h2>
          <p class="text-slate-400 text-sm mt-1 font-medium italic">
            กรุณาเลือกที่อยู่สำหรับการจัดส่งสินค้า
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { PurchaseOrder as PO } from '@/types/purchase-order';

// 1. รับ Props จากหน้าแม่ [id].vue
const props = defineProps<{
  po: PO;
  subtotal: number;
  vat: number;
  grandTotal: number;
  // eslint-disable-next-line no-unused-vars
  removePOItem: (productId: number) => void;
  // eslint-disable-next-line no-unused-vars
  formatPrice: (val: number) => string;
  // eslint-disable-next-line no-unused-vars
  formatDate: (dateStr: string , showTime?: boolean) => string;
}>();

const router = useRouter();

const { userOrders, updatePOItemQuantity } = useMockPO();

// 2. Local UI State (เฉพาะหน้านี้)
const isSidebarOpen = ref(true);
const currentStep = ref(1);
const checkedItems = ref<Record<number, boolean>>({});

// Initialize Checked Items เมื่อโหลดหน้า
onMounted(() => {
  props.po.items.forEach((item) => {
    const hasStock = (item.product.stock ?? 0) > 0;
    checkedItems.value[item.product.id] = hasStock;
  });
});

// 3. Select All Logic
const isAllSelected = computed({
  get: () => {
    const orderableItems = props.po.items.filter(
      (i) => (i.product.stock ?? 0) > 0,
    );
    return (
      orderableItems.length > 0 &&
      orderableItems.every((i) => checkedItems.value[i.product.id])
    );
  },
  set: (val) => {
    props.po.items.forEach((item) => {
      if ((item.product.stock ?? 0) > 0)
        checkedItems.value[item.product.id] = val;
    });
  },
});

const goBack = () => {
  router.push('/');
};

// 4. Validation Logic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateQuantity = (item: any) => {
  if (item.quantity < 0 || !item.quantity) item.quantity = 0;
  updatePOItemQuantity(props.po.id, item.product.id, item.quantity);
};

const removeProduct = (productId: number) => {
  props.removePOItem(productId);
  checkedItems.value[productId] = false;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReadyToShipStatus = (item: any) => {
  const stock = item.product.stock || 0;
  if (stock <= 0) return { text: 'สินค้าหมด', color: 'text-red-500 bg-red-50' };
  if (stock >= item.quantity)
    return {
      text: `พร้อมส่ง ${item.quantity} ชิ้น`,
      color: 'text-emerald-600 bg-emerald-50',
    };
  return {
    text: `พร้อมส่ง ${stock} ชิ้น`,
    color: 'text-orange-600 bg-orange-50',
  };
};
</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="w-full mb-6 px-1">
      <nav class="flex items-center text-sm font-medium w-full">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1 border border-slate-200 bg-white p-3 rounded-lg">
            <Icon
              icon="mdi:chevron-right"
              class="w-4 h-4 text-slate-300 rotate-180"
            />
            <button
              class="text-slate-500 hover:text-[#0D95DA] transition-colors font-bold uppercase  tracking-tight"
              @click="goBack"
            >
              เลือกสินค้าเพิ่ม
            </button>
          </div>
          <div class="flex items-center justify-end">
            <POStepper />
          </div>
        </div>
      </nav>
    </div>

    <div class="flex gap-3 items-start overflow-visible">
      <aside
        :class="[isSidebarOpen ? 'w-64 hover:w-80' : 'w-20']"
        class="sticky top-24 h-[calc(100vh-120px)] bg-white transition-all duration-300 flex flex-col rounded-xl border-t-10 border-t-primary shadow-md shrink-0 "
      >
        <div
          class="p-4 flex justify-between items-center border-b h-16 shrink-0"
        >
          <span v-if="isSidebarOpen" class="font-bold  text-[#0D95DA]"
            >เลือกใบสั่งซื้อ ({{ userOrders.length }})</span
          >
          <!-- <button
            class="hover:bg-slate-100 p-1.5 rounded-lg"
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <Icon icon="mdi:menu" class="w-6 h-6 text-slate-600" />
          </button> -->
        </div>
        <nav class="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
          <NuxtLink
            v-for="order in userOrders"
            :key="order.id"
            :to="`/po/${order.id}`"
            class="flex items-center gap-3 p-3 rounded-xl transition-all border border-transparent"
            :class="[
              po.id === order.id
                ? 'bg-blue-50 text-[#0D95DA] border-blue-100'
                : 'hover:bg-slate-50 text-slate-600',
            ]"
          >
            <p v-if="isSidebarOpen" class="font-bold text-[14px] truncate">
              #{{ order.id }} | {{ formatDate(order.createdAt,false) }} | ฿ {{ formatPrice(order.totalAmount) }}
            </p>
          </NuxtLink>
        </nav>
      </aside>

      <main class="flex-1 flex flex-col min-w-0 gap-3 pb-32">
        <div v-if="currentStep === 1">
        <header class="bg-white border-b border-slate-200 p-4 shadow-sm rounded-2xl border-t-8 border-t-primary mb-3">
          <div v-if="po" class="flex justify-between items-center px-2">
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                <Icon icon="mdi:file-document-edit-outline" class="w-6 h-6 text-[#0D95DA]" />
              </div>
              
              <div>
                <h1 class="text-lg font-black text-slate-800 uppercase leading-none mb-1">
                  {{ po.id }}
                </h1>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {{ formatDate(po.createdAt, true) }}
                </p>
              </div>

              <div class="h-8 bg-slate-200 w-px mx-2" />

              <button class="p-2 text-slate-400 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Icon icon="mdi:printer-outline" class="w-5 h-5" />
              </button>
            </div>

            <div class="flex items-center gap-4">
              <button class="bg-white text-slate-500 border border-slate-200 px-4 py-2 rounded-lg text-[11px] font-black flex items-center gap-2 hover:bg-slate-50 transition-all">
                <Icon icon="mdi:magnify-scan" class="w-4 h-4" /> ตรวจสอบสต็อก
              </button>
              
              <div class="h-8 bg-slate-200 w-px" />

              <button class="p-1 hover:bg-slate-100 rounded-full transition-colors">
                <Icon icon="octicon:kebab-horizontal-16" width="20" height="20" class="text-slate-400" />
              </button>
            </div>
            
          </div>
        </header>

          <section
            v-if="po"
            class="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden StyledReceipt"
          >
            <div class="overflow-x-auto scrollbar-thin">
              <table class="w-full text-left border-separate border-spacing-0">
                <thead class="bg-slate-50 sticky top-0 z-30">
                  <tr
                    class="text-[11px] uppercase text-slate-500 font-black tracking-tighter"
                  >
                    <th
                      class="p-4 w-12 text-center sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200"
                    >
                      <input
                        v-model="isAllSelected"
                        type="checkbox"
                        class="rounded cursor-pointer"
                      >
                    </th>
                    <th
                      class="p-4 text-center border-b border-r border-slate-200"
                    >
                      รูปสินค้า
                    </th>
                    <th
                      class="p-4 border-b border-r border-slate-200 min-w-62.5"
                    >
                      ชื่อสินค้า
                    </th>
                    <th class="p-4 border-b border-r border-slate-200">
                      รายละเอียด
                    </th>
                    <th
                      class="p-4 text-center border-b border-r border-slate-200"
                    >
                      จำนวนสั่ง
                    </th>
                    <th
                      class="p-4 text-right border-b border-r border-slate-200"
                    >
                      ราคา/หน่วย
                    </th>
                    <th
                      class="p-4 text-right border-b border-r border-slate-200 bg-blue-50/50"
                    >
                      ราคารวม
                    </th>
                    <th
                      class="p-4 text-center border-b border-r border-slate-200"
                    >
                      สถานะพร้อมส่ง
                    </th>
                    <th class="p-4 text-center border-b border-slate-200">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody class="text-[12px] bg-white">
                  <tr
                    v-for="item in po.items"
                    :key="item.product.id"
                    class="hover:bg-slate-50/80 transition-colors group"
                    :class="{
                      'opacity-50 grayscale-[0.3]':
                        !checkedItems[item.product.id],
                    }"
                  >
                    <td
                      class="p-4 text-center sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-b border-r border-slate-100"
                    >
                      <input
                        v-model="checkedItems[item.product.id]"
                        type="checkbox"
                        :disabled="(item.product.stock ?? 0) <= 0"
                        class="rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                    </td>
                    <td
                      class="p-4 text-center border-b border-r border-slate-100"
                    >
                      <img
                        :src="item.product.image"
                        class="w-12 h-12 mx-auto object-contain bg-white rounded-lg p-1 border border-slate-200"
                      >
                    </td>
                    <td
                      class="p-4 font-bold border-b border-r border-slate-200"
                    >
                      <p
                        class="text-[#0D95DA] text-[10px] uppercase font-black"
                      >
                        {{ item.product.brand }}
                      </p>
                      <p class="line-clamp-2 text-slate-800">
                        {{ item.product.name }}
                      </p>
                    </td>
                    <td
                      class="p-4 text-slate-400 italic text-[10px] border-b border-r border-slate-100"
                    >
                      {{ item.product.specs }}
                    </td>
                    <td
                      class="p-4 text-center border-b border-r border-slate-100"
                    >
                      <input
                        :value="item.quantity ?? 0"
                        type="number"
                        :min="0"
                        :disabled="(item.product.stock ?? 0) <= 0"
                        class="w-16 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-center font-black transition-opacity"
                        :class="{
                          'opacity-50 cursor-not-allowed bg-slate-100':
                            (item.product.stock ?? 0) <= 0,
                        }"
                        @input="
                          item.quantity =
                            Number(($event.target as HTMLInputElement).value) ||
                            0
                        "
                        @change="validateQuantity(item)"
                      >
                    </td>
                    <td
                      class="p-4 text-right font-bold text-slate-500 border-b border-r border-slate-100"
                    >
                      ฿{{ formatPrice(item.priceAtPurchase) }}
                    </td>
                    <td
                      class="p-4 text-right font-black text-slate-900 border-b border-r border-slate-200 bg-blue-50/20"
                    >
                      ฿{{ formatPrice(item.priceAtPurchase * item.quantity) }}
                    </td>
                    <td
                      class="p-4 text-center border-b border-r border-slate-100"
                    >
                      <span
                        :class="getReadyToShipStatus(item)?.color"
                        class="px-3 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap"
                        >{{ getReadyToShipStatus(item)?.text }}</span
                      >
                    </td>
                    <td class="p-4 text-center border-b border-slate-100">
                      <button
                        class="text-slate-300 hover:text-red-500 p-2"
                        @click="removeProduct(item.product.id)"
                      >
                        <Icon icon="mdi:trash-can-outline" class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="p-8 border-t border-slate-100 flex justify-end bg-white "
            >
              <div class="w-full max-w-md space-y-3 bg-white">
                <div
                  class="flex justify-between text-sm font-bold text-slate-600"
                >
                  <span>สินค้าทั้งหมด ({{ po?.items.length }} ชิ้น):</span
                  ><span>฿{{ formatPrice(subtotal + 4110) }}</span>
                </div>
                <div
                  class="flex justify-between items-center text-sm font-bold text-slate-600"
                >
                  <div class="flex items-center gap-3 justify-center">
                    <span> ส่วนลด: </span>
                    <span
                      class="inline-flex items-center gap-1 bg-blue-50 text-[#0D95DA] px-2 py-0.5 rounded border border-blue-200 text-xs font-black"
                    >
                      #DEALER2026
                      <Icon icon="mdi:close" class="w-3 h-3 cursor-pointer" />
                    </span>
                  </div>
                  <span class="text-slate-800">-฿{{ formatPrice(4110) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold pt-2 border-t border-dashed"
                >
                  <span>ยอดก่อน Vat:</span>
                  <span class="text-slate-800 font-black"
                    >฿{{ formatPrice(subtotal - vat) }}</span
                  >
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-slate-600"
                >
                  <span>ยอด Vat7%:</span
                  ><span class="text-slate-800 font-black"
                    >฿{{ formatPrice(vat) }}</span
                  >
                </div>
                <div class="mt-4 pt-4 border-t-2 border-slate-800">
                  <div
                    class="bg-slate-50/80 p-6 flex justify-between items-center rounded-sm"
                  >
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
      </main>
    </div>
  </div>
</template>

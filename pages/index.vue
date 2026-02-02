<template>
  <div class="mx-auto max-w-2xl px-6 py-12">
    <header class="mb-12">
      <h1 class="text-4xl font-black italic uppercase text-slate-900 tracking-tighter">
        Dealer <span class="text-[#386156]">Inventory</span>
      </h1>
      <div class="mt-2 h-1.5 w-16 bg-[#386156]" />
    </header>

    <div class="space-y-12">
      <article v-for="product in products" :key="product.id" class="group">
        <div class="overflow-hidden rounded-4xl bg-white ring-1 ring-slate-200 transition-all duration-500 hover:ring-[#386156] hover:shadow-xl hover:shadow-slate-200/50">
          
          <div class="relative aspect-video overflow-hidden">
            <img :src="product.image" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" >
            <div class="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              SKU: {{ product.sku }}
            </div>
          </div>

          <div class="p-8">
            <div class="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span class="rounded bg-slate-100 px-2 py-0.5 text-slate-600">{{ product.category }}</span>
              <span>•</span>
              <span>In Stock</span>
            </div>
            
            <h2 class="text-2xl font-bold  leading-tight text-amber-400">
              {{ product.name }}
            </h2>

            <div class="mt-8 flex items-center justify-between border-t border-slate-50 pt-6">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase">Dealer Price</p>
                <p class="text-3xl font-black text-slate-900 italic">฿{{ product.price.toLocaleString() }}</p>
              </div>
              
              <button class="rounded-full bg-slate-900 px-8 py-3.5 text-sm font-black uppercase text-white transition-all hover:bg-[#386156] active:scale-95">
                Quick Order
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default { name: 'DealerInventory' };
</script>

<script setup>
const products = [
  { id: 1, sku: 'OIL-5W30', name: 'Engine Oil 5W-30 Synthetic', price: 1200, category: 'Maintenance', image: 'https://images.unsplash.com/photo-1635843231454-061030e79603?auto=format&fit=crop&q=80&w=600' },
  { id: 2, sku: 'BRK-CF-9', name: 'Brake Pads - Carbon Fiber', price: 850, category: 'Parts', image: 'https://images.unsplash.com/photo-1486006396193-471e6f5a3f71?auto=format&fit=crop&q=80&w=600' }
];
</script>


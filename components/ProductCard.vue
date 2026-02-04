<template>
  <article class="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-300 ">
    <div class="aspect-square mb-4 overflow-hidden rounded-xl bg-white flex items-center justify-center relative">
      <div v-if="product.isHot" class="absolute top-0 left-0 z-20 bg-[#ef4444] text-white text-[9px] font-black px-2 py-1 rounded-br-xl flex flex-col items-center leading-tight shadow-sm">
        <span>FREE!!</span>
        <span class="text-[7px] opacity-90">GIFT SET</span>
      </div>

      <div class="absolute top-0 right-0 z-20 flex flex-col items-end gap-1">
        <div>
          <span v-if="product.brandImg" class="bg-white/70 backdrop-blur-sm border border-slate-100 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <img :src="product.brandImg" :alt="product.brand">
          </span>
          <span v-else >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	            <path fill="currentColor" d="M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053q0 .77.13 1.292q.131.511.44.828c.203.21.475.359.803.451q.502.138 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.67.67 0 0 1-.39-.173a.7.7 0 0 1-.173-.377a4 4 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241q-.49.242-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214q.025-.881.433-1.299c.29-.297.642-.445 1.044-.445c.476 0 .841.149 1.082.433c.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09s-1.1-.742-1.917-.742zm10.065.006a3.25 3.25 0 0 0-2.306.946c-.29.29-.525.637-.692 1.033a3.15 3.15 0 0 0-.254 1.273q0 .679.241 1.274c.161.395.39.742.674 1.032s.637.526 1.045.693c.408.173.86.26 1.342.26c1.397 0 2.262-.637 2.782-1.23l-1.187-.904c-.248.297-.841.699-1.583.699c-.464 0-.847-.105-1.138-.321a1.6 1.6 0 0 1-.593-.872l-.019-.056h4.915v-.587q-.001-.676-.235-1.267a3.4 3.4 0 0 0-.661-1.033a3 3 0 0 0-1.02-.692a3.35 3.35 0 0 0-1.311-.248m-16.297.118v6.256h1.651v-6.256zm16.278 1.286c1.132 0 1.664.797 1.664 1.255l-3.32.006c0-.458.525-1.255 1.656-1.261m7.073 3.814a.606.606 0 0 0-.606.606a.606.606 0 0 0 .606.606a.606.606 0 0 0 .606-.606a.606.606 0 0 0-.606-.606m-.008.105h.002a.5.5 0 0 1 .5.501a.5.5 0 0 1-.5.5a.5.5 0 0 1-.5-.5a.5.5 0 0 1 .498-.5zm-.233.155v.699h.13v-.285h.093l.173.285h.136l-.18-.297a.2.2 0 0 0 .118-.056c.03-.03.05-.074.05-.136q0-.1-.063-.154c-.037-.038-.105-.056-.185-.056zm.13.099h.154q.028.001.056.012a.06.06 0 0 1 .037.031c.013.013.012.031.012.056a.1.1 0 0 1-.012.055a.2.2 0 0 1-.037.031q-.028.011-.056.013h-.154Z" />
            </svg>
          </span>
        </div>
        <div class="bg-[#facc15] text-[8px] font-black px-2 py-0.5 rounded-l-full shadow-sm flex items-center gap-1">
          <span class="bg-white text-[#facc15] rounded-full w-2.5 h-2.5 flex items-center justify-center text-[6px]">▶</span>
          PARTNER PROMO
        </div>
        <div>
          <!-- in product remove the '!' out of it -->
          <span v-if="!product.isNew" class="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-l-md shadow-sm">
            NEW
          </span>
        </div>
        <div v-if="product.discountPercentage" class="bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-l-md shadow-sm">
          -{{ product.discountPercentage }}%
        </div>
      </div>

      <!-- <div class="absolute bottom-2 left-0 right-0 z-20 flex justify-center px-2">
        <span class="bg-white/70 backdrop-blur-sm border border-slate-100 text-slate-500 text-[9px] font-bold px-3 py-0.5 rounded-full shadow-sm">
          {{ product.screenSize || 'PREMIUM QUALITY' }}
        </span>
      </div> -->
      
      <img :src="product.image" :alt="product.name" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 z-10">
    </div>

    <div class="space-y-1">
      <p class="text-[#3b82f6] text-[11px] font-bold uppercase tracking-wider">{{ product.brand }}</p>
      <h3 class="text-slate-900 font-bold text-sm leading-snug line-clamp-2 min-h-10">
        {{ product.name }}
      </h3>
      <p class="text-slate-400 text-[10px] leading-tight">{{ product.specs }}</p>
    </div>

    <div v-if="product.promotion" class="mt-3 border-2 border-dashed border-[#3b82f6]/30 rounded-lg p-2 bg-[#f0f7ff]">
      <p class="text-[#1e40af] text-[10px] font-medium truncate">
        {{ product.promotion }}... <span class="font-bold underline">ดูเพิ่มเติม</span>
      </p>
    </div>

    <div class="mt-4 flex flex-col gap-2">
      <div class="flex items-baseline gap-1">
        <span class="text-2xl font-black text-slate-900">฿{{ product.price.toLocaleString() }}</span>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span class="bg-slate-50 text-slate-500 text-[9px] px-2 py-0.5 rounded-full border border-slate-100 italic">
            {{ product.warranty }}
          </span>
          <span class="bg-slate-50 text-slate-500 text-[9px] px-2 py-0.5 rounded-full border border-slate-100">
            {{ product.delivery }}
          </span>
        </div>
        <div class="text-slate-300 text-[10px] flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
</svg>{{ product.views }}
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product';
defineProps<{ product: Product }>();
</script>
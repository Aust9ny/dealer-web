<template>
  <header class="w-full h-20 bg-white flex items-center px-12">
    <!-- Left : Brand -->
    <div class="flex items-center leading-none select-none">
      <div class="text-3xl font-bold text-blue-600">
        Advice <span class="text-green-500">Dealers</span>
      </div>
    </div>

    <!-- Center : Search -->
    <div class="flex-1 flex justify-center">
      <div class="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="ค้นหาสินค้า, แบรนด์, รุ่น"
          class="w-full h-10 pl-4 pr-24 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        >

        <button
          class="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-4 bg-[#00569C] text-white flex items-center gap-2 rounded-full hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>
          ค้นหา
        </button>
      </div>
    </div>

    <!-- Right : Profile -->
    <div class="flex items-center gap-4">
      <!-- Credit Info -->
      <div class="hidden md:flex flex-col text-right leading-tight">
        <span class="text-xs text-gray-400">วงเงินคงเหลือ</span>
        <span class="text-sm font-semibold text-emerald-600"> ฿ 120,000 </span>
      </div>

      <!-- Profile Card -->
      <div
        class="flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          class="w-9 h-9 rounded-full"
        />

        <div class="hidden sm:flex flex-col leading-tight">
          <span class="text-sm font-medium text-gray-700"> Jam </span>
          <span class="text-xs text-gray-400"> Dealer </span>
        </div>

        <!-- Chevron -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-400 hidden sm:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<template>
  <header class="w-full h-20 bg-white border-b flex items-center px-12">
    <!-- Left : Logo -->
    <div class="flex items-center text-xl font-semibold text-gray-800">
      Advice Dealer
    </div>

    <!-- Center : Search -->
    <div class="flex-1 flex justify-center">
      <div class="relative w-full max-w-xl">
        <input
          type="text"
          placeholder="ค้นหาสินค้า, แบรนด์, รุ่น"
          class="w-full h-10 pl-4 pr-24 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00569C]"
        />

        <button
          class="absolute right-1 top-1/2 -translate-y-1/2
                 h-8 px-4 bg-[#00569C] text-white
                 flex items-center gap-2 rounded-full
                 hover:opacity-90"
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
    <div class="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        class="w-9 h-9 rounded-full"
      />
      <span class="text-sm font-medium text-gray-700"> Jam </span>
    </div>
  </header>
</template>

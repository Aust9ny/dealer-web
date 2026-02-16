<template>
  <transition name="fade">
    <div 
      v-if="loading" 
      class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
        <circle cx="4" cy="12" r="3" fill="#0D95DA">
          <animate id="SVGKiXXedfO" attributeName="cy" begin="0;SVGgLulOGrw.end+0.263s" calcMode="spline" dur="0.63s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
        </circle>
        <circle cx="12" cy="12" r="3" fill="#0D95DA">
          <animate attributeName="cy" begin="SVGKiXXedfO.begin+0.105s" calcMode="spline" dur="0.63s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
        </circle>
        <circle cx="20" cy="12" r="3" fill="#0D95DA">
          <animate id="SVGgLulOGrw" attributeName="cy" begin="SVGKiXXedfO.begin+0.21s" calcMode="spline" dur="0.63s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
        </circle>
      </svg>
      
      <p class="mt-4 text-[#0D95DA] font-bold animate-pulse">กำลังโหลดข้อมูล...</p>
    </div>
  </transition>
</template>

<script setup>
const loading = useState('global-loading', () => false);
const nuxtApp = useNuxtApp();

// เริ่มโหลดเมื่อเปลี่ยนหน้า
nuxtApp.hook('page:start', () => {
  loading.value = true;
});

// หยุดโหลดเมื่อ Render เสร็จ
nuxtApp.hook('page:finish', () => {
  setTimeout(() => {
    loading.value = false;
  }, 500); // หน่วงเวลาเล็กน้อยเพื่อให้ดูสมูท
});
</script>

<style scoped>
/* เพิ่ม Animation ตอนปรากฏและหายไป */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
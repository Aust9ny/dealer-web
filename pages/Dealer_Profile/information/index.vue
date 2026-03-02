<script setup lang="ts">
useHeadSafe({
  meta: [
    { name: 'cache-control', content: 'no-store, no-cache, must-revalidate' },
    { name: 'pragma', content: 'no-cache' },
    { name: 'expires', content: '0' },
    { name: 'referrer', content: 'no-referrer' },
  ],
});

useSeoMeta({
  title: 'Dealer Profile',
  description: 'Dealer account profile and order overview.',
  ogTitle: 'Dealer Profile',
  ogDescription: 'Secure dealer profile and order management page.',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <MenuProfile @logout="navigateTo('/')" />
        <!-- RIGHT CONTENT -->
        <div class="bg-white rounded-xl shadow overflow-hidden lg:col-span-4">
          <div class="p-6 text-center bg-primary">
            <h1 class="text-xl text-white uppercase tracking-wide">
              ข้อมูลส่วนตัวดีลเลอร์
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Ensure Thai text looks clean and loopless if using Inter + IBM Plex */
.font-thai {
  line-height: 1.6;
}
</style>
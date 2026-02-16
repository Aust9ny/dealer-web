<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isCategoryPage = computed(() => route.path === '/category');

const showPOFooter = computed(() =>
  isCategoryPage.value && route.query.id
);
</script>

<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />
    
    <main class="pt-23 pb-21">
      <slot />
    </main>

     <!-- ✅ แสดง Footer ปกติ เฉพาะหน้าที่ไม่ใช่ category -->
    <Footer v-if="!isCategoryPage" />

    <!-- ✅ แสดง PO Footer เฉพาะหน้า category -->
    <SelectedPOFooter v-if="showPOFooter" />
  </div>
</template>
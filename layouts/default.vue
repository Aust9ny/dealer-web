<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const footerType = computed(() => {
  if (route.path.startsWith('/po')) return 'address';
  if (route.path.startsWith('/category')) return 'selected';
  return 'default';
});

const mainPaddingClass = computed(() => {
  if (footerType.value === 'address') return 'pb-44 md:pb-32';
  if (footerType.value === 'selected') return 'pb-36 md:pb-22';
  return 'pb-24';
});

</script>

<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />

    <main :class="['pt-16 md:pt-23', mainPaddingClass]">
      <slot />
    </main>
    <BackToTop/>

    <Footer v-if="footerType === 'default'" />
    <SelectedPOFooter v-if="footerType === 'selected'" />
    <AddressPOFooter v-if="footerType === 'address'" />
  </div>
</template>

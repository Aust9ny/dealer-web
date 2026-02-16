<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const showPOFooter = computed(() => {
  return route.path.startsWith('/category') || route.path.startsWith('/po');
});

</script>

<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />

    <main class="pt-23 pb-21">
      <slot />
    </main>

    <Footer v-if="!showPOFooter" />
    <SelectedPOFooter v-if="showPOFooter" />
  </div>
</template>
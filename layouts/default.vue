<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const footerType = computed(() => {
  if (route.path.startsWith("/po")) return "address";
  if (route.path.startsWith("/category")) return "selected";
  if (route.path.startsWith("/checkout")) return "checkout";
  return "default";
});
</script>

<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />

    <main class="pt-23 pb-21">
      <slot />
    </main>

    <Footer v-if="footerType === 'default'" />
    <SelectedPOFooter v-if="footerType === 'selected'" />
    <AddressPOFooter v-if="footerType === 'address'" />
    <CheckoutPOFooter v-if="footerType === 'checkout'" />
  </div>
</template>
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
  title: 'Category Detail',
  description: 'View products in a specific category.',
  ogTitle: 'Category Detail',
  ogDescription: 'Secure category detail listing for dealer users.',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <div>
    <Category />
  </div>
</template>

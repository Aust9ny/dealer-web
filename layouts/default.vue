<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />
    
    <main class="pt-23">
      <slot />
    </main>

    <Footer />
  </div>
</template>
<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />
    
    <main class="pt-20">
      <slot />
    </main>

    <Footer />
  </div>
</template>
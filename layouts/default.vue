<template>
  <div class="min-h-screen">
    <LoadingScreen />

    <Topbar />
    
    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>
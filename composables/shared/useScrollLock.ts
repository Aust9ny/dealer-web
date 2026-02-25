export const useScrollLock = (isLocked: Ref<boolean>) => {
  watch(isLocked, (val) => {
    if (!import.meta.client) return;
    if (val) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.classList.add('overflow-hidden-modal');
    } else {
      document.body.style.paddingRight = '';
      document.body.classList.remove('overflow-hidden-modal');
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      document.body.classList.remove('overflow-hidden-modal');
      document.body.style.paddingRight = '';
    }
  });
};
// composables/usePOFlow.ts
export const usePOFlow = () => {
  const route = useRoute();

  const steps = [
    { id: 1, label: 'ตรวจสอบรายการ', icon: 'mdi:format-list-checks' },
    { id: 2, label: 'ที่อยู่และการจัดส่ง', icon: 'mdi:map-marker-outline' },
    { id: 3, label: 'ชำระเงิน', icon: 'mdi:credit-card-outline' }
  ];

  const currentStep = computed(() => {
    const path = route.path;
    if (path.endsWith('/payment')) return 3;
    if (path.endsWith('/address')) return 2;
    return 1;
  });

  return {
    steps,
    currentStep
  };
};
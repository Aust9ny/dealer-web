export const usePOFlow = () => {
  // 1 = ตรวจสอบรายการ, 2 = ที่อยู่ในการจัดส่ง, 3 = ชำระเงิน
  const currentStep = useState('order-step', () => 1);

  const steps = [
    { id: 1, label: 'ตรวจสอบรายการ', icon: 'mdi:check-circle-outline' },
    { id: 2, label: 'ที่อยู่ในการจัดส่ง', icon: 'mdi:map-marker-outline' },
    { id: 3, label: 'ชำระเงิน', icon: 'mdi:credit-card-outline' }
  ];

  const nextStep = () => { if (currentStep.value < 3) currentStep.value++; };
  const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };

  return { currentStep, steps, nextStep, prevStep };
};
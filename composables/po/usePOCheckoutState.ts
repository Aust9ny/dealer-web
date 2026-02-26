interface POCheckoutState {
  stockChecked: boolean;
  addressValidationAttempted: boolean;
  shippingAddressSelected: boolean;
  taxAddressSelected: boolean;
  deliveryMethodSelected: boolean;
  paymentMethodSelected: boolean;
}

const createDefaultState = (): POCheckoutState => ({
  stockChecked: false,
  addressValidationAttempted: false,
  shippingAddressSelected: false,
  taxAddressSelected: false,
  deliveryMethodSelected: false,
  paymentMethodSelected: false,
});

export const usePOCheckoutState = () => {
  const route = useRoute();
  const poStateMap = useState<Record<string, POCheckoutState>>(
    'po-checkout-state-map',
    () => ({}),
  );

  const poId = computed(() => String(route.params.id ?? ''));

  const ensurePOState = (id: string) => {
    if (!id) return createDefaultState();
    if (!poStateMap.value[id]) {
      poStateMap.value[id] = createDefaultState();
    }
    return poStateMap.value[id];
  };

  const state = computed(() => ensurePOState(poId.value));

  const isAddressReady = computed(() => {
    const current = state.value;
    return (
      current.shippingAddressSelected &&
      current.taxAddressSelected &&
      current.deliveryMethodSelected &&
      current.paymentMethodSelected
    );
  });

  const setStockChecked = (value: boolean) => {
    ensurePOState(poId.value).stockChecked = value;
  };

  const setAddressValidationAttempted = (value: boolean) => {
    ensurePOState(poId.value).addressValidationAttempted = value;
  };

  const setAddressSelections = (payload: {
    shippingAddressSelected: boolean;
    taxAddressSelected: boolean;
    deliveryMethodSelected: boolean;
    paymentMethodSelected: boolean;
  }) => {
    const current = ensurePOState(poId.value);
    current.shippingAddressSelected = payload.shippingAddressSelected;
    current.taxAddressSelected = payload.taxAddressSelected;
    current.deliveryMethodSelected = payload.deliveryMethodSelected;
    current.paymentMethodSelected = payload.paymentMethodSelected;
  };

  return {
    state,
    isAddressReady,
    setStockChecked,
    setAddressValidationAttempted,
    setAddressSelections,
  };
};

/* eslint-disable no-unused-vars */
import type { Address } from '@/types/address';
import { usePOCheckoutState } from './usePOCheckoutState';

type PaymentMethod = 'bank' | 'qr' | '';
type DeliveryMethod =
  | 'next-day'
  | 'same-day'
  | 'counter'
  | 'dealer-123'
  | 'tmg'
  | '';

type POItem = {
  quantity: number;
  priceAtPurchase?: number;
  product: {
    stock?: number;
  };
};

type UsePOAddressStepArgs = {
  currentUser: Ref<{ addresses: Address[] } | null | undefined>;
  deliveryMethods: Array<{ id: string; label?: string; desc?: string }>;
  getEffectiveQuantity: (_item: POItem) => number;
  poId: string | number | undefined;
};

export const usePOAddressStep = ({
  currentUser,
  deliveryMethods,
  getEffectiveQuantity,
  poId,
}: UsePOAddressStepArgs) => {
  const router = useRouter();
  const {
    state: checkoutState,
    setAddressSelections,
    setAddressValidationAttempted,
  } = usePOCheckoutState();

  const isAddressModalOpen = ref(false);
  const isTaxAddressModalOpen = ref(false);
  const startWithDeliveryInModal = ref(false);
  const modalMode = ref<'shipping' | 'tax'>('shipping');
  const selectedPayment = ref<PaymentMethod>('');
  const selectedDeliveryMethod = ref<DeliveryMethod>('');
  const paymentMethods = ['bank', 'qr'] as const;
  const isSubmitted = ref(false);
  const isTelValid = ref(true);

  const addressForm = ref({
    addressDetail: {
      label: '',
      recipientName: '',
      phone: '',
      addressDetail: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
      isDefault: false,
      isTaxAddress: false,
    } as Record<string, unknown>,
  });

  const savedAddresses = computed(() => currentUser.value?.addresses || []);
  const selectedAddressId = ref<number | string>('');
  const selectedTaxAddressId = ref<number | string>('');

  const currentAddress = computed(() => {
    if (savedAddresses.value.length === 0 || !selectedAddressId.value) return null;
    return savedAddresses.value.find((a: Address) => a.id === selectedAddressId.value) || null;
  });

  const currentTaxAddress = computed(() => {
    if (savedAddresses.value.length === 0 || !selectedTaxAddressId.value) return null;
    return savedAddresses.value.find((a: Address) => a.id === selectedTaxAddressId.value) || null;
  });

  const showSelectionErrors = computed(() => checkoutState.value.addressValidationAttempted);
  const isShippingMissing = computed(() => !checkoutState.value.shippingAddressSelected);
  const isTaxMissing = computed(() => !checkoutState.value.taxAddressSelected);
  const isDeliveryMissing = computed(() => !checkoutState.value.deliveryMethodSelected);
  const isPaymentMissing = computed(() => !checkoutState.value.paymentMethodSelected);
  const selectedDeliveryData = computed(() => {
    return deliveryMethods.find((method) => method.id === selectedDeliveryMethod.value) || null;
  });
  const currentTaxId = computed(() => currentTaxAddress.value?.taxId || '');

  const isShippingDefaultAddress = (address: Address) => {
    if (typeof address.isDefaultShipping === 'boolean') return address.isDefaultShipping;
    return !!address.isDefault && !address.isTaxAddress;
  };

  const isTaxDefaultAddress = (address: Address) => {
    if (typeof address.isDefaultTax === 'boolean') return address.isDefaultTax;
    return !!address.isDefault && !!address.isTaxAddress;
  };

  const currentShippingIsDefault = computed(() => {
    return currentAddress.value ? isShippingDefaultAddress(currentAddress.value) : false;
  });

  const currentTaxIsDefault = computed(() => {
    return currentTaxAddress.value ? isTaxDefaultAddress(currentTaxAddress.value) : false;
  });

  const modalAddresses = computed(() => savedAddresses.value);

  const openModal = (mode: 'shipping' | 'tax', startWithDelivery = false) => {
    modalMode.value = mode;
    startWithDeliveryInModal.value = startWithDelivery;
    isAddressModalOpen.value = true;
  };

  const handleDeliveryConfirm = (method: string) => {
    selectedDeliveryMethod.value = method as DeliveryMethod;
    isAddressModalOpen.value = false;
  };

  const handleAddressSelect = (id: number | string) => {
    if (modalMode.value === 'tax') selectedTaxAddressId.value = id;
    else selectedAddressId.value = id;
    isAddressModalOpen.value = false;
  };

  const handleAddressAdd = (newAddr: Partial<Address> & { isDefault?: boolean }) => {
    if (!currentUser.value) return;
    const id = Date.now();
    if (newAddr.isDefault) {
      currentUser.value.addresses.forEach((a: Address) => {
        if (modalMode.value === 'tax') a.isDefaultTax = false;
        else a.isDefaultShipping = false;
      });
    }
    currentUser.value.addresses.push({
      id,
      ...newAddr,
      isDefaultTax: modalMode.value === 'tax' ? !!newAddr.isDefault : false,
      isDefaultShipping: modalMode.value === 'shipping' ? !!newAddr.isDefault : false,
      isDefault: !!newAddr.isDefault,
    } as Address);

    if (modalMode.value === 'tax') selectedTaxAddressId.value = id;
    else selectedAddressId.value = id;

    isAddressModalOpen.value = false;
  };

  const handleAddressUpdate = (payload: { id: number | string } & Record<string, unknown>) => {
    if (!currentUser.value) return;

    const index = currentUser.value.addresses.findIndex((a: Address) => a.id === payload.id);
    if (index === -1) return;

    if (payload.isDefault) {
      currentUser.value.addresses.forEach((a: Address) => {
        if (modalMode.value === 'tax') a.isDefaultTax = false;
        else a.isDefaultShipping = false;
      });
    }

    currentUser.value.addresses[index] = {
      ...currentUser.value.addresses[index],
      ...payload,
      isDefaultTax: modalMode.value === 'tax'
        ? !!payload.isDefault
        : !!currentUser.value.addresses[index].isDefaultTax,
      isDefaultShipping: modalMode.value === 'shipping'
        ? !!payload.isDefault
        : !!currentUser.value.addresses[index].isDefaultShipping,
    } as Address;

    if (modalMode.value === 'tax') selectedTaxAddressId.value = payload.id;
    else selectedAddressId.value = payload.id;

    isAddressModalOpen.value = false;
  };

  const handleAddressDelete = (id: number | string) => {
    if (!currentUser.value) return;

    currentUser.value.addresses = currentUser.value.addresses.filter((a: Address) => a.id !== id);

    if (selectedAddressId.value === id) selectedAddressId.value = '';
    if (selectedTaxAddressId.value === id) selectedTaxAddressId.value = '';
  };

  const handleSetDefaultAddress = (id: number | string) => {
    if (!currentUser.value) return;

    currentUser.value.addresses.forEach((a: Address) => {
      if (modalMode.value === 'tax') a.isDefaultTax = a.id === id;
      else a.isDefaultShipping = a.id === id;
      a.isDefault = !!a.isDefaultShipping || !!a.isDefaultTax;
    });
  };

  const joinAddressParts = (...parts: (string | undefined)[]) => {
    return parts.map((part) => (part || '').trim()).filter(Boolean).join(' ');
  };

  const taxModalInitialData = computed(() => currentTaxAddress.value);

  const handleTaxAddressSubmit = (taxForm: Partial<Address>) => {
    if (!currentUser.value) return;

    const detailParts = [
      taxForm.houseNo ? `เลขที่ ${taxForm.houseNo}` : '',
      taxForm.building ? `อาคาร ${taxForm.building}` : '',
      taxForm.floor ? `ชั้น ${taxForm.floor}` : '',
      taxForm.moo ? `หมู่ ${taxForm.moo}` : '',
      taxForm.village ? `หมู่บ้าน ${taxForm.village}` : '',
      taxForm.soi ? `ซอย ${taxForm.soi}` : '',
      taxForm.road ? `ถนน ${taxForm.road}` : '',
    ];

    const payload = {
      label: 'ที่อยู่ออกใบกำกับภาษี',
      recipientName: taxForm.recipientName || '',
      phone: taxForm.phone || currentTaxAddress.value?.phone || currentAddress.value?.phone || '',
      addressDetail: joinAddressParts(...detailParts) || taxForm.addressNote || '-',
      subDistrict: taxForm.subDistrict || '',
      district: taxForm.district || '',
      province: taxForm.province || '',
      postalCode: taxForm.postalCode || '',
      isDefault: !!taxForm.isDefault,
      isTaxAddress: true,
      taxPayerType: taxForm.taxPayerType,
      taxId: taxForm.taxId || '',
      houseNo: taxForm.houseNo || '',
      building: taxForm.building || '',
      floor: taxForm.floor || '',
      moo: taxForm.moo || '',
      village: taxForm.village || '',
      soi: taxForm.soi || '',
      road: taxForm.road || '',
      addressNote: taxForm.addressNote || '',
    };

    const existingId = selectedTaxAddressId.value;
    const currentIndex = currentUser.value.addresses.findIndex((a: Address) => a.id === existingId);

    if (payload.isDefault) {
      currentUser.value.addresses.forEach((a: Address) => {
        a.isDefaultTax = false;
        a.isDefault = !!a.isDefaultShipping || !!a.isDefaultTax;
      });
    }

    if (currentIndex !== -1 && existingId) {
      currentUser.value.addresses[currentIndex] = {
        ...currentUser.value.addresses[currentIndex],
        ...payload,
        isDefaultTax: payload.isDefault,
        isDefault: !!currentUser.value.addresses[currentIndex].isDefaultShipping || !!payload.isDefault,
      } as Address;
      selectedTaxAddressId.value = existingId;
    } else {
      const newId = Date.now();
      currentUser.value.addresses.push({
        id: newId,
        ...payload,
        isDefaultTax: payload.isDefault,
        isDefaultShipping: false,
        isDefault: !!payload.isDefault,
      } as Address);
      selectedTaxAddressId.value = newId;
    }

    isTaxAddressModalOpen.value = false;
  };

  const handleTaxAddressAddRequest = () => {
    isAddressModalOpen.value = false;
    startWithDeliveryInModal.value = false;
    isTaxAddressModalOpen.value = true;
  };

  const goBack = () => {
    router.push(`/po/${poId}`);
  };

  const getStockStatus = (item: POItem) => {
    const stock = item.product.stock || 0;
    if (stock <= 0) return { text: 'สินค้าหมด', colorClass: 'text-red-500', bgClass: 'bg-red-50' };
    if (stock < item.quantity) {
      return {
        text: `สินค้าไม่พอ (เหลือ ${stock})`,
        colorClass: 'text-orange-500',
        bgClass: 'bg-orange-50',
      };
    }
    return { text: 'พร้อมส่งครบ', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-50' };
  };

  const getLineTotal = (item: POItem) => {
    const price = item.priceAtPurchase ?? 0;
    return price * getEffectiveQuantity(item);
  };

  watch(
    savedAddresses,
    (newAddrs) => {
      if (newAddrs.length > 0) {
        const defaultShipping = newAddrs.find((a: Address) => isShippingDefaultAddress(a));
        if (defaultShipping && !selectedAddressId.value) {
          selectedAddressId.value = defaultShipping.id;
        }

        const defaultTax = newAddrs.find((a: Address) => isTaxDefaultAddress(a));
        if (defaultTax && !selectedTaxAddressId.value) {
          selectedTaxAddressId.value = defaultTax.id;
        }
      } else {
        selectedAddressId.value = '';
        selectedTaxAddressId.value = '';
      }
    },
    { immediate: true },
  );

  watch(
    [currentAddress, currentTaxAddress, selectedDeliveryMethod, selectedPayment],
    () => {
      setAddressSelections({
        shippingAddressSelected: !!currentAddress.value,
        taxAddressSelected: !!currentTaxAddress.value,
        deliveryMethodSelected: !!selectedDeliveryMethod.value,
        paymentMethodSelected: !!selectedPayment.value,
      });
    },
    { immediate: true },
  );

  onMounted(() => {
    setAddressValidationAttempted(false);
  });

  return {
    addressForm,
    currentAddress,
    currentShippingIsDefault,
    currentTaxAddress,
    currentTaxId,
    currentTaxIsDefault,
    getLineTotal,
    getStockStatus,
    goBack,
    handleAddressAdd,
    handleAddressDelete,
    handleAddressSelect,
    handleAddressUpdate,
    handleDeliveryConfirm,
    handleSetDefaultAddress,
    handleTaxAddressAddRequest,
    handleTaxAddressSubmit,
    isAddressModalOpen,
    isDeliveryMissing,
    isPaymentMissing,
    isShippingMissing,
    isSubmitted,
    isTaxAddressModalOpen,
    isTaxMissing,
    isTelValid,
    modalAddresses,
    modalMode,
    openModal,
    paymentMethods,
    savedAddresses,
    selectedAddressId,
    selectedDeliveryData,
    selectedDeliveryMethod,
    selectedPayment,
    selectedTaxAddressId,
    showSelectionErrors,
    startWithDeliveryInModal,
    taxModalInitialData,
  };
};

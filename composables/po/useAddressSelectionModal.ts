/* eslint-disable no-unused-vars */
import type { Address } from '@/types/address';

type AddressSelectionModalProps = {
  isOpen: boolean;
  addresses: Address[];
  selectedId: number | string;
  mode: 'shipping' | 'tax';
  selectedDeliveryMethod?: string;
  startWithDelivery?: boolean;
};

type AddressSelectionEmit = (..._args: unknown[]) => void;

export const useAddressSelectionModal = (
  props: AddressSelectionModalProps,
  emit: AddressSelectionEmit,
) => {
  const activeMenuId = ref<number | string | null>(null);
  const isAddingNew = ref(false);
  const isDeliveryModalOpen = ref(false);
  const localSelectedId = ref<number | string>(props.selectedId);
  const editingAddressId = ref<number | string | null>(null);

  const newAddress = ref({
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
  });

  const hasSelectedDeliveryMethod = computed(() => !!props.selectedDeliveryMethod);
  const modalTitle = computed(() =>
    props.mode === 'tax' ? 'เลือกที่อยู่ออกใบกำกับภาษี' : 'เลือกที่อยู่จัดส่ง',
  );

  const isAddressDefaultByMode = (address: Address) => {
    if (props.mode === 'tax') {
      if (typeof address.isDefaultTax === 'boolean') return address.isDefaultTax;
      return !!address.isDefault && !!address.isTaxAddress;
    }
    if (typeof address.isDefaultShipping === 'boolean') return address.isDefaultShipping;
    return !!address.isDefault && !address.isTaxAddress;
  };

  const resetNewAddress = () => {
    newAddress.value = {
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
    };
  };

  const toggleMenu = (id: number | string) => {
    activeMenuId.value = activeMenuId.value === id ? null : id;
  };

  const handleSelect = (id: number | string) => {
    localSelectedId.value = id;
  };

  const handleNext = () => {
    if (!localSelectedId.value) return;

    if (props.mode === 'shipping') {
      if (hasSelectedDeliveryMethod.value) {
        emit('select', localSelectedId.value);
        return;
      }
      isDeliveryModalOpen.value = true;
      return;
    }

    emit('select', localSelectedId.value);
  };

  const handleDeliveryConfirm = (method: string) => {
    emit('delivery-confirm', method);
    emit('select', localSelectedId.value);
    isDeliveryModalOpen.value = false;
  };

  const handleDeliveryBackOrClose = () => {
    isDeliveryModalOpen.value = false;
    if (props.startWithDelivery) {
      emit('close');
    }
  };

  const handleAdd = () => {
    if (!newAddress.value.recipientName || !newAddress.value.phone || !newAddress.value.postalCode) {
      return;
    }

    if (editingAddressId.value !== null) {
      emit('update', { id: editingAddressId.value, ...newAddress.value });
    } else {
      emit('add', { ...newAddress.value });
    }

    editingAddressId.value = null;
    resetNewAddress();
    isAddingNew.value = false;
  };

  const makeDefault = (id: number | string) => {
    emit('set-default', id);
    activeMenuId.value = null;
  };

  const openEditModal = (id: number | string) => {
    const target = props.addresses.find((addr) => addr.id === id);
    if (!target) return;

    editingAddressId.value = id;
    newAddress.value = {
      label: target.label || '',
      recipientName: target.recipientName || '',
      phone: target.phone || '',
      addressDetail: target.addressDetail || '',
      subDistrict: target.subDistrict || '',
      district: target.district || '',
      province: target.province || '',
      postalCode: target.postalCode || '',
      isDefault: isAddressDefaultByMode(target),
      isTaxAddress: !!target.isTaxAddress,
    };
    activeMenuId.value = null;
    isAddingNew.value = true;
  };

  const deleteAddress = (id: number | string) => {
    emit('delete', id);
    if (localSelectedId.value === id) {
      localSelectedId.value = '';
    }
    activeMenuId.value = null;
  };

  const onPhoneInput = () => {
    newAddress.value.phone = newAddress.value.phone.replace(/\D/g, '').slice(0, 10);
  };

  const onPostalCodeInput = () => {
    newAddress.value.postalCode = newAddress.value.postalCode.replace(/\D/g, '').slice(0, 5);
  };

  const handleWindowClick = () => {
    activeMenuId.value = null;
  };

  const close = () => {
    isDeliveryModalOpen.value = false;
    emit('close');
    isAddingNew.value = false;
    editingAddressId.value = null;
    activeMenuId.value = null;
  };

  watch(
    () => props.selectedId,
    (newId) => {
      localSelectedId.value = newId;
    },
  );

  watch(
    () => props.isOpen,
    (isOpen) => {
      if (!isOpen) return;
      isDeliveryModalOpen.value = !!(props.startWithDelivery && props.mode === 'shipping');
    },
    { immediate: true },
  );

  onMounted(() => {
    window.addEventListener('click', handleWindowClick);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleWindowClick);
  });

  return {
    activeMenuId,
    close,
    deleteAddress,
    editingAddressId,
    handleAdd,
    handleDeliveryBackOrClose,
    handleDeliveryConfirm,
    handleNext,
    handleSelect,
    isAddingNew,
    isAddressDefaultByMode,
    isDeliveryModalOpen,
    localSelectedId,
    makeDefault,
    modalTitle,
    newAddress,
    onPhoneInput,
    onPostalCodeInput,
    openEditModal,
    resetNewAddress,
    toggleMenu,
  };
};

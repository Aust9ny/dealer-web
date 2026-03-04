/* eslint-disable no-unused-vars */
import type { Address } from '@/types/address';

type UseTaxAddressModalArgs = {
  initialData?: Partial<Address> | null;
  isOpen: boolean;
};

type TaxModalEmit = (..._args: unknown[]) => void;

type TaxAddressDraft = Omit<Address, 'id'>;

export const useTaxAddressModal = (
  props: UseTaxAddressModalArgs,
  emit: TaxModalEmit,
) => {
  const blankForm = (): TaxAddressDraft => ({
    label: 'ที่อยู่ออกใบกำกับภาษี',
    recipientName: '',
    phone: '',
    addressDetail: '',
    subDistrict: '',
    district: '',
    province: '',
    postalCode: '',
    coordinates: undefined,
    isDefault: false,
    isTaxAddress: true,
    taxPayerType: 'personal',
    taxId: '',
    houseNo: '',
    building: '',
    floor: '',
    moo: '',
    village: '',
    soi: '',
    road: '',
    addressNote: '',
  });

  const form = ref<TaxAddressDraft>(blankForm());

  watch(
    () => props.isOpen,
    (isOpen) => {
      if (!isOpen) return;
      form.value = {
        ...blankForm(),
        ...(props.initialData || {}),
      };
    },
    { immediate: true },
  );

  const onTaxIdInput = () => {
    form.value.taxId = (form.value.taxId || '').replace(/\D/g, '').slice(0, 13);
  };

  const onPostalCodeInput = () => {
    form.value.postalCode = (form.value.postalCode || '').replace(/\D/g, '').slice(0, 5);
  };

  const isFormValid = computed(() => {
    return (
      form.value.recipientName.trim().length > 0 &&
      (form.value.taxId || '').length >= 10 &&
      form.value.postalCode.length === 5 &&
      form.value.province.trim().length > 0 &&
      form.value.district.trim().length > 0 &&
      form.value.subDistrict.trim().length > 0
    );
  });

  const close = () => {
    emit('close');
  };

  const submit = () => {
    if (!isFormValid.value) return;
    emit('submit', { ...form.value });
  };

  return {
    close,
    form,
    isFormValid,
    onPostalCodeInput,
    onTaxIdInput,
    submit,
  };
};

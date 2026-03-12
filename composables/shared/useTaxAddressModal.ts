/* eslint-disable no-unused-vars */
import type { Address } from '@/types/address';
import { useAuth } from '../auth/useAuth';

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
  const { currentUser } = useAuth();

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

  const getAddressFullText = (address?: Partial<Address> | null) => {
    if (!address) return '';
    const detail = (address.addressDetail || '').trim();
    const subDistrict = (address.subDistrict || '').trim();
    const district = (address.district || '').trim();
    const province = (address.province || '').trim();
    const postalCode = (address.postalCode || '').trim();
    return [detail, subDistrict && `ต.${subDistrict}`, district && `อ.${district}`, province && `จ.${province}`, postalCode]
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  const getCurrentUserDefaultAddress = () => {
    const addresses = currentUser.value?.addresses || [];
    if (!addresses.length) return null;

    return (
      addresses.find((address) => address.isDefaultTax) ||
      addresses.find((address) => address.isDefaultShipping) ||
      addresses.find((address) => address.isDefault) ||
      addresses[0]
    );
  };

  watch(
    () => props.isOpen,
    (isOpen) => {
      if (!isOpen) return;
      const fallbackAddress = getCurrentUserDefaultAddress();
      const initialAddress = props.initialData || fallbackAddress;

      form.value = {
        ...blankForm(),
        ...(fallbackAddress || {}),
        ...(props.initialData || {}),
      };

      if (!form.value.addressNote?.trim()) {
        form.value.addressNote = getAddressFullText(initialAddress);
      }
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

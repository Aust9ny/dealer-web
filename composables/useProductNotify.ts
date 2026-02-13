// composables/useNotifyLogic.ts
import type { Product } from '~/types/product';

export const useNotifyLogic = () => {
    const showNotifyModal = ref(false);
    const targetProduct = ref<Product | null>(null);
    const isSubmitted = ref(false);
    const notifyForm = ref({
        email: '',
        tel: '',
        consent: false,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^0\d{7}$/; // Standard 10 digits

    const isEmailValid = computed(() => emailRegex.test(notifyForm.value.email));
    const isTelValid = computed(() => !notifyForm.value.tel || telRegex.test(notifyForm.value.tel));
    
    const openNotifyModal = (product: Product) => {
        targetProduct.value = product;
        showNotifyModal.value = true;
    };

    const onlyNumeric = (event: KeyboardEvent) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };

    return {
        showNotifyModal,
        targetProduct,
        notifyForm,
        isSubmitted,
        isEmailValid,
        isTelValid,
        openNotifyModal,
        onlyNumeric
    };
};
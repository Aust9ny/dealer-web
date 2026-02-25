import { useThaiFormatters } from '../shared/useThaiFormatters';

interface LoadingControls {
  startLoading: () => void;
  stopLoading: () => void;
}

export const usePOFooterHelpers = () => {
  const { formatNumber, formatThaiDate, formatCurrency, formatThaiDateTime } =
    useThaiFormatters();

  const runWithLoading = async (
    loading: LoadingControls,
    task: () => Promise<void>,
  ) => {
    loading.startLoading();
    try {
      await task();
    } finally {
      loading.stopLoading();
    }
  };

  return {
    formatNumber,
    formatThaiDate,
    formatCurrency,
    formatThaiDateTime,
    runWithLoading,
  };
};

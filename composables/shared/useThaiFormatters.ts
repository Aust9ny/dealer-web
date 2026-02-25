export const useThaiFormatters = () => {
  const formatNumber = (value: number, maxFractionDigits = 0) =>
    new Intl.NumberFormat('th-TH', {
      maximumFractionDigits: maxFractionDigits,
    }).format(value);

  const formatCurrency = (value: number, maxFractionDigits = 0) =>
    new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: maxFractionDigits,
    }).format(value);

  const formatThaiDate = (value: string, withTime = false) => {
    if (!value) return '';
    return new Intl.DateTimeFormat('th-TH', {
      dateStyle: 'short',
      ...(withTime ? { timeStyle: 'medium' as const } : {}),
      timeZone: 'Asia/Bangkok',
    }).format(new Date(value));
  };

  const formatThaiDateTime = (value: string) => formatThaiDate(value, true);

  return {
    formatNumber,
    formatCurrency,
    formatThaiDate,
    formatThaiDateTime,
  };
};

import dayjs from 'dayjs';

export function formatIDR(amount: number, withPrefix: boolean = true): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return withPrefix ? formatted : formatted.replace(/^Rp\s?/, '');
}

export const formatSubscriptionDateTime = (value?: string) => {
  if (!value) return 'Not Provided';
  const parsedDate = dayjs(value);
  return parsedDate.isValid()
    ? parsedDate.format('DD/MM/YYYY')
    : 'Not Provided';
};

export const formatStatusLabel = (value?: string) => {
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

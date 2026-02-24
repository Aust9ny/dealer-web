import type { OrderLineItem, PurchaseOrder } from '@/types/purchase-order';

export const usePOPricing = () => {
  const getEffectiveQuantity = (item: OrderLineItem) => {
    const orderedQty = Math.max(0, item.quantity ?? 0);
    const stockQty = Math.max(0, item.product.stock ?? 0);
    return Math.min(orderedQty, stockQty);
  };

  const getSubtotalFromItems = (items: OrderLineItem[]) =>
    items.reduce((sum, item) => {
      const price = item.priceAtPurchase ?? 0;
      return sum + price * getEffectiveQuantity(item);
    }, 0);

  const getVat = (subtotal: number, rate = 0.07) => subtotal * rate;

  const getGrandTotal = (subtotal: number, rate = 0.07) =>
    subtotal + getVat(subtotal, rate);

  const getOrderSubtotal = (po: PurchaseOrder | null | undefined) =>
    po ? getSubtotalFromItems(po.items) : 0;

  return {
    getEffectiveQuantity,
    getSubtotalFromItems,
    getOrderSubtotal,
    getVat,
    getGrandTotal,
  };
};

// composables/shared/useProductUrl.ts
import type { Product } from '~/types/product';

export const useProductUrl = () => {
  /**
   * Generates an SEO-friendly kebab-case URL including the product ID.
   * Format: /product/product-name-kebab-case-id
   */
  const getProductUrl = (product: Product): string => {
    if (!product?.name || !product?.id) return '#';

    const slug = product.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-')  // Replace spaces/underscores with -
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

    return `/product/${slug}-${product.id}`;
  };

  return {
    getProductUrl
  };
};

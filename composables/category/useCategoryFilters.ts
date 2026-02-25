import type { Ref, ComputedRef } from 'vue';
import type { Product } from '@/types/product';

interface CategoryFilterParams {
  products: Ref<Product[]>;
  activeSubCategory: Ref<string>;
  activeSubTag: Ref<string>;
  searchQuery: Ref<string>;
  stockStatus: Ref<'ทั้งหมด' | 'มีของ' | 'ของหมด'>;
}

export const useCategoryFilters = ({
  products,
  activeSubCategory,
  activeSubTag,
  searchQuery,
  stockStatus,
}: CategoryFilterParams): {
  filteredProducts: ComputedRef<Product[]>;
  productsBySubTag: ComputedRef<Record<string, Product[]>>;
  currentSubCatTags: ComputedRef<string[]>;
} => {
  const filteredProducts = computed(() => {
    let result = [...products.value];

    if (activeSubCategory.value) {
      const selectedCategory = activeSubCategory.value.toLowerCase();
      result = result.filter((p) => p.category?.toLowerCase() === selectedCategory);
    }

    if (activeSubTag.value !== 'ALL') {
      result = result.filter((p) => p.tag === activeSubTag.value);
    }

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      );
    }

    if (stockStatus.value !== 'ทั้งหมด') {
      result = result.filter((p) =>
        stockStatus.value === 'มีของ' ? (p.stock ?? 0) > 0 : (p.stock ?? 0) === 0,
      );
    }

    return result;
  });

  const productsBySubTag = computed(() => {
    const groups: Record<string, Product[]> = {};

    filteredProducts.value.forEach((p) => {
      const key = p.tag || 'อื่นๆ';
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }))
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {} as Record<string, Product[]>);
  });

  const currentSubCatTags = computed(() => {
    const tags = new Set<string>();
    const selectedCategory = activeSubCategory.value.toLowerCase();

    products.value
      .filter((p) => p.category?.toLowerCase() === selectedCategory)
      .forEach((p) => {
        if (p.tag) tags.add(p.tag);
      });

    return Array.from(tags).sort();
  });

  return { filteredProducts, productsBySubTag, currentSubCatTags };
};

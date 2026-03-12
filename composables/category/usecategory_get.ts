import type { productGroup } from '~/types/Product/product_group';


export const productGroupsData = async (): Promise<productGroup> => {
  const data = await $fetch<productGroup>('https://developback.advice.in.th/apiadvicedealer/v1.0.0/product/category/get');
  return data;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.adviceApi.endsWith('/') ? config.adviceApi : `${config.adviceApi}/`;
  const body = await readBody<Record<string, string | number | null | undefined>>(event);

  if (!config.adviceToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing advice API token',
    });
  }

  try {
    return await $fetch('pricelist/product', {
      baseURL: baseUrl,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.adviceToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        gr: body.gr ?? '',
        gmall: body.gmall ?? '',
        basket_id: body.basket_id ?? config.basketId,
        hi_end: body.hi_end ?? '',
        mnew_grp: body.mnew_grp ?? '',
        old_data: body.old_data ?? '',
      },
    });
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?._data?.message || error?.message || 'Failed to fetch product list',
      data: error?.response?._data,
    });
  }
});

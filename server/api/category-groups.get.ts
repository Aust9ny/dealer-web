/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const baseUrl = config.adviceApi.endsWith('/') ? config.adviceApi : `${config.adviceApi}/`;

  if (!config.adviceToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing advice API token',
    });
  }

  try {
    return await $fetch('product/category/get', {
      baseURL: baseUrl,
      headers: {
        Authorization: config.adviceToken,
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: error?.response?._data?.message || error?.message || 'Failed to fetch category groups',
      data: error?.response?._data,
    });
  }
});

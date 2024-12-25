import queryString from 'query-string';

interface Params {
  [key: string]: any;
}

export const buildParams = (params: Params): string => {
  // Bo'sh qiymatlarni va bo'sh array elementlarini olib tashlash
  const cleanedParams = Object.keys(params).reduce(
    (acc: Params, key: string) => {
      const value = params[key];
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        (!Array.isArray(value) ||
          (Array.isArray(value) && value.filter((v) => v !== '').length > 0))
      ) {
        acc[key] = Array.isArray(value) ? value.filter((v) => v !== '') : value;
      }
      return acc;
    },
    {},
  );

  const queryStringResult = queryString.stringify(cleanedParams, {
    arrayFormat: 'none',
  });

  return queryStringResult ? `?${queryStringResult}` : '';
};

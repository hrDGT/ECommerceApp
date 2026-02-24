import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ProductsResponse } from '../types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => '/products?limit=1000',
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { User, UserResponse, RegisterUser } from '../types/user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, void>({
      query: () => '/users',
    }),
    registerUser: builder.mutation<User, RegisterUser>({
      query: (user) => ({
        url: '/users/add',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation } = usersApi;

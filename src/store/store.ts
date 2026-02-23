import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { productsApi } from '../api/product';
import { usersApi } from '../api/user';

import authReducer from './authSlice';
import searchReducer from './searchSlice';
import categoryReducer from './categorySlice';
import sortReducer from './sortSlice';
import cartReducer from './cartSlice';
import likesReducer from './likesSlice';
import priceReducer from './priceSlice';
import attributeFilterReducer from "./attributeFilterSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
    search: searchReducer,
    category: categoryReducer,
    sort: sortReducer,
    cart: cartReducer,
    likes: likesReducer,
    price: priceReducer,
    attributes: attributeFilterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, usersApi.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
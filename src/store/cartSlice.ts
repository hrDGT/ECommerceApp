import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { CartState } from '../types/store';

const initialState: CartState = {
  count: 0,
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<number>) {
      const id = action.payload;

      if (state.items[id]) {
        delete state.items[id];
        state.count -= 1;
      } else {
        state.items[id] = true;
        state.count += 1;
      }
    },
  },
});

export const { toggleItem } = cartSlice.actions;
export default cartSlice.reducer;

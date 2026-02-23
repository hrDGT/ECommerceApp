import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { LikesState } from '../types/store';

const initialState: LikesState = {
  count: 0,
  items: {},
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
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

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;

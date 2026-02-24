import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { CategoryState } from '../types/store';

const initialState: CategoryState = {
  selectedCategory: null,
  selectedTag: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      state.selectedTag = null;
    },
    setTag(state, action: PayloadAction<string | null>) {
      state.selectedTag = action.payload;
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, setTag } = categorySlice.actions;
export default categorySlice.reducer;

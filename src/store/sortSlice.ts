import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { SortState, SortType } from '../types/store';

const initialState: SortState = {
  sort: null,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;

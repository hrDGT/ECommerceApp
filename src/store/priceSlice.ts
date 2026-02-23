import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PriceState = {
  min: number;
  max: number;
};

const initialState: PriceState = {
  min: 0,
  max: 2000
};

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPriceRange(state, action: PayloadAction<PriceState>) {
      state.min = action.payload.min;
      state.max = action.payload.max;
    }
  }
});

export const { setPriceRange } = priceSlice.actions;
export default priceSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AttributeFilterState = {
  brands: string[];
  weights: number[];
};

const initialState: AttributeFilterState = {
  brands: [],
  weights: []
};

export const attributeFilterSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    toggleBrand(state, action: PayloadAction<string>) {
      const value = action.payload;
      if (state.brands.includes(value)) {
        state.brands = state.brands.filter(b => b !== value);
      } else {
        state.brands.push(value);
      }
    },
    toggleWeight(state, action: PayloadAction<number>) {
      const value = action.payload;
      if (state.weights.includes(value)) {
        state.weights = state.weights.filter(w => w !== value);
      } else {
        state.weights.push(value);
      }
    },
    resetAttributes(state) {
      state.brands = [];
      state.weights = [];
    }
  }
});

export const { toggleBrand, toggleWeight, resetAttributes } = attributeFilterSlice.actions;
export default attributeFilterSlice.reducer;

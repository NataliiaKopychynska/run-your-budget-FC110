import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./operations";

const initialState = {
  categories: {
    title: [],
  },
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.title = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(getCategories.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const homeReducers = slice.reducer;

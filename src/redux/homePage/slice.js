import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCategories, getTransactions } from "./operations";

const initialState = {
  transactions: {
    items: [],
  },
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
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions.items = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.title = action.payload;
        state.isError = null;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(getTransactions.pending, getCategories.pending),
        (state) => {
          state.isError = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(getTransactions.rejected, getCategories.rejected),
        (state, action) => {
          state.isError = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const homeReducers = slice.reducer;

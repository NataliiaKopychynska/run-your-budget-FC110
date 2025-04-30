import { createSlice } from "@reduxjs/toolkit";
import { getBalance } from "./operations";

const initialState = {
  sum: 0,
};

const slice = createSlice({
  name: "balance",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.sum = action.payload.data.balance;
    });
  },
});

export const balanceReducer = slice.reducer;

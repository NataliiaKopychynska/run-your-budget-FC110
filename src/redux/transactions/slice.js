import { createSlice } from "@reduxjs/toolkit";
import { fetchTransaction } from "./operations";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  isEdit: false,
  isDelete: false,
  isAdding: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setIsAdding: (state, action) => {
      state.isAdding = action.payload;
    },
    setIsDelete: (state, action) => {
      state.isDelete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransaction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;

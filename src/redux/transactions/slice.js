import { createSlice } from "@reduxjs/toolkit";
import { deleteTransaction, fetchTransactions } from "./operations";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  isEditTransaction: false,
  isAddTransaction: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setIsEditTransaction: (state, action) => {
      state.isEditTransaction = action.payload;
    },
    setIsAddTransaction: (state, action) => {
      state.isAddTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id
        );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const { setIsAddTransaction, setIsEditTransaction } =
  transactionsSlice.actions;

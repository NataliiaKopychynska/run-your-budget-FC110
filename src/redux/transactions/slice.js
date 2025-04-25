import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
} from "./operations";
import toast from "react-hot-toast";

const toastParams = {
  position: "bottom-right",
  duration: 500,
  style: {
    textAlign: "left",
    background:
      "linear-gradient(103deg,     #ffc727 0%,    #9e40ba 61.46%,    #7000ff 90.54%  )",

    color: "white",
  },
};

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  isEditTransaction: false,
  isAddTransaction: false,
  deletingTransaction: null,
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

    setDeletingTransaction: (state, action) => {
      state.deletingTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.data.data;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        toast.error(
          `Failed to fetch transactions: ${action.error?.message}`,
          toastParams
        );
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload._id
        );
        state.isLoading = false;
        state.isError = false;

        toast.error(
          `Transaction for ₴${action.payload.sum} \n has been deleted`,
          toastParams
        );
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        state.isLoading = false;
        state.isError = false;
        toast.success(
          `Transaction for ₴${action.payload.sum} \n has been added`,
          toastParams
        );
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(
          `Error: ${action.payload || "Something went wrong"}`,
          toastParams
        );
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {
  setIsAddTransaction,
  setIsEditTransaction,

  setDeletingTransaction,
} = transactionsSlice.actions;

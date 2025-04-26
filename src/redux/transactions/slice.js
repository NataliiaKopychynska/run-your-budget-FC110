import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
} from "./operations";
import toast from "react-hot-toast";

const toastParams = {
  position: "bottom-right",
  duration: 2000,
  style: {
    textAlign: "left",
    background:
      "linear-gradient(103deg,     #ffc727 0%,    #9e40ba 61.46%,    #7000ff 90.54%  )",

    color: "white",
  },
};

const initialState = {
  transactions: [],
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
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload._id
        );
        toast.error(`Transaction has been deleted`, toastParams);
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
        toast.success(
          `Transaction for ₴${action.payload.sum} \n has been added`,
          toastParams
        );
      })
      .addCase(addTransaction.rejected, (state, action) => {
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

import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "./operations";
import toast from "react-hot-toast";

const toastParams = {
  position: "bottom-right",
  duration: 2000,
  style: {
    textAlign: "left",
    background:
      "linear-gradient(103deg,rgb(1, 1, 0) 0%,    #9e40ba 61.46%,    #7000ff 90.54%  )",
    color: "white",
  },
};

const initialState = {
  transactions: [],
  isEditTransaction: false,
  isAddTransaction: false,
  deletingTransaction: null,
  paginationData: {},
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
        const { data, ...paginationData } = action.payload.data;
        state.transactions = data;
        state.paginationData = paginationData;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload.data._id
        );
        toast.error(
          `Transaction for ₴${action.payload.data.sum}\nhas been deleted`,
          toastParams
        );
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload.data);
        toast.success(
          `Transaction for ₴${action.payload.data.sum}\nhas been added`,
          toastParams
        );
      })
      .addCase(addTransaction.rejected, (state, action) => {
        toast.error(
          `Error: ${action.payload || "Something went wrong"}`,
          toastParams
        );
      })
      .addCase(editTransaction.fulfilled, (state, { payload }) => {
        const updated = payload.data;
        state.transactions = state.transactions.map((t) =>
          t._id === updated._id ? updated : t
        );
        toast.success(`Transaction has been updated`, toastParams);
      })
      .addCase(editTransaction.rejected, (state, { payload }) => {
        toast.error(`Error: ${payload}`, toastParams);
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {
  setIsAddTransaction,
  setIsEditTransaction,
  setDeletingTransaction,
} = transactionsSlice.actions;

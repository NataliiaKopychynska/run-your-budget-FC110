import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const runBudgetApi = axios.create({
  baseURL: "https://moneyguard-group-06.onrender.com/",
});

runBudgetApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchAll",
  async (body, thunkApi) => {
    try {
      const { data } = await runBudgetApi.get("/transactions", {
        params: {
          sortBy: body.sortBy,
          sortOrder: body.sortOrder,
          type: body.type,
          category: body.category,
          minSum: body.minSum,
          maxSum: body.maxSum,
          page: body.page,
          perPage: body.perPage,
        },
      });
      console.log("Filtered data:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const fetchTransactionsAll = createAsyncThunk(
//   "transaction/fetchAllAll",
//   async (_, thunkApi) => {
//     try {
//       const { data } = await runBudgetApi.get(`/transactions`);
//       console.log("Full data:", data);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransactions",
  async (id, thunkApi) => {
    try {
      const { data } = await runBudgetApi.delete(`transactions/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, thunkApi) => {
    try {
      const { data } = await runBudgetApi.post("/transactions", transaction);
      thunkApi.dispatch(fetchTransactions());

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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
  async (_, thunkApi) => {
    try {
      const { data } = await runBudgetApi.get("/transactions");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransactions",
  async (id, thunkApi) => {
    try {
      const { data } = await runBudgetApi.delete(`transactions/${id}`);
      thunkApi.dispatch(fetchTransactions());
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

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (transaction, thunkAPI) => {
    try {
      const { id, ...body } = transaction;    
      const { data } = await runBudgetApi.patch(
        `/transactions/${id}`,body                                  
      );
      thunkAPI.dispatch(fetchTransactions());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
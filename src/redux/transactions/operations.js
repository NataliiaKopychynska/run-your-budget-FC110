import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const runBudgetApi = axios.create({
  baseURL: "https://6802ad240a99cb7408ea3ab1.mockapi.io/budget",
});

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

      return data, thunkApi.dispatch(fetchTransactions());
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

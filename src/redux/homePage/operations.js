import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://680363400a99cb7408ebd6c4.mockapi.io/";

export const getTransactions = createAsyncThunk(
  "transactions/allTransactions",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/home/transactions");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/allCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/home/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrencyRates = createAsyncThunk(
  "currency/fetchRates",
  async (_, thunkAPI) => {
    const cacheKey = "currencyRatesCache";
    const cached = JSON.parse(localStorage.getItem(cacheKey));

    const now = new Date();
    if (cached && now - new Date(cached.timestamp) < 60 * 60 * 1000) {
      return cached.rates;
    }

    try {
      const { data } = await axios.get("https://api.monobank.ua/bank/currency");

      localStorage.setItem(
        cacheKey,
        JSON.stringify({ rates: data, timestamp: now.toISOString() })
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

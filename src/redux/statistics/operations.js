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

export const getPeriodTransactions = createAsyncThunk(
  "transactions/getPeriodTransactions",
  async (period, thunkAPI) => {
    try {
      const { month, year } = period;
      const response = await runBudgetApi.get(
        `/transactions/summary/${year}-${String(month).padStart(2, "0")}`
      );
      const { iSummary, eSummary } = response.data.data;

      const categoriesSummary = [];

      if (iSummary?.income) {
        for (const [category, total] of Object.entries(iSummary.income)) {
          if (total > 0) {
            categoriesSummary.push({
              name: category,
              type: "INCOME",
              total,
            });
          }
        }
      }

      if (eSummary?.expenses) {
        for (const [category, total] of Object.entries(eSummary.expenses)) {
          if (total > 0) {
            categoriesSummary.push({
              name: category,
              type: "EXPENSE",
              total,
            });
          }
        }
      }

      const incomeSummary = iSummary?.totalIncome || 0;
      const expenseSummary = eSummary?.totalExpenses || 0;
      const periodTotal = incomeSummary - expenseSummary;

      return {
        categoriesSummary,
        incomeSummary,
        expenseSummary,
        periodTotal,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

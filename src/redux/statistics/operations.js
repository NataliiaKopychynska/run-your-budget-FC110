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
      const { data } = await runBudgetApi.get("/transactions");

      const filteredData = data.data.data.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth() + 1;
        const transactionYear = transactionDate.getFullYear();

        return transactionMonth === month && transactionYear === year;
      });

      const categoriesSummary = [];
      let expenseSummary = 0;
      let incomeSummary = 0;

      filteredData.forEach((transaction) => {
        const { sum, type, category } = transaction;
        const amount = Number(sum);

        if (type === "income") {
          incomeSummary += amount;
        } else if (type === "expenses") {
          expenseSummary += amount;
        }

        const transactionType = type === "income" ? "INCOME" : "EXPENSE";
        const existingCategory = categoriesSummary.find(
          (cat) => cat.name === category && cat.type === transactionType
        );

        if (existingCategory) {
          existingCategory.total += amount;
        } else {
          categoriesSummary.push({
            name: category,
            type: transactionType,
            total: amount,
          });
        }
      });

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

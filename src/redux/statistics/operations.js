import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTransactions } from "../transactions/operations";

export const runBudgetApi = axios.create({
  baseURL: "https://6802ad240a99cb7408ea3ab1.mockapi.io/budget",
});

export const getPeriodTransactions = createAsyncThunk(
  "transactions/getPeriodTransactions",
  async (period, thunkAPI) => {
    try {
      const { month, year } = period;

      const { data } = await runBudgetApi.get("/transactions");

      const filteredData = data.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth() + 1;
        const transactionYear = transactionDate.getFullYear();

        return transactionMonth === month && transactionYear === year;
      });

      const categoriesSummary = [];
      let incomeSummary = 0;
      let expenseSummary = 0;

      filteredData.forEach((transaction) => {
        const { sum, type, category } = transaction;
        const amount = Number(sum);

        if (type === true) {
          incomeSummary += amount;
        } else {
          expenseSummary += amount;
        }

        const transactionType = type === true ? "INCOME" : "EXPENSE";
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
      thunkAPI.dispatch(fetchTransactions());

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

import { createSlice } from "@reduxjs/toolkit";
import { getPeriodTransactions } from "./operations";

const initialState = {
  periodTransactions: [],
  selectedMonth: 1,
  selectedYear: new Date().getFullYear(),
  isLoading: false,
  isError: false,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeriodTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getPeriodTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.periodTransactions = action.payload;
      })
      .addCase(getPeriodTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { setSelectedMonth, setSelectedYear } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;

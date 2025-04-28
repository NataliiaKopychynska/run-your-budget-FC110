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
    builder.addCase(getPeriodTransactions.fulfilled, (state, action) => {
      state.periodTransactions = action.payload;
    });
  },
});

export const { setSelectedMonth, setSelectedYear } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;

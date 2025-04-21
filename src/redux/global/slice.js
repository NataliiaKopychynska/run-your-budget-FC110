import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || action.error.message;
      });
  },
});

export const globalReducer = globalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./operations";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || { name: "", email: "" },
  token: localStorage.getItem("token") || "",
  isLogin: Boolean(localStorage.getItem("token")),
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
        state.token = action.payload.token;
        //
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

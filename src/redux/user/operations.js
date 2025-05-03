import { createAsyncThunk } from "@reduxjs/toolkit";
import { runBudgetApi } from "../transactions/operations";
import axios from "axios";
import toast from "react-hot-toast";
import { setIsEditModalOpen } from "./slice";

const toastParams = {
  position: "bottom-right",
  duration: 2000,
  style: {
    textAlign: "left",
    background:
      "linear-gradient(103deg,rgb(1, 1, 0) 0%,    #9e40ba 61.46%,    #7000ff 90.54%  )",
    color: "white",
  },
};

runBudgetApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token ");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUserThunk = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkApi) => {
    try {
      const { data } = await runBudgetApi.get("/user");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editUserThunk = createAsyncThunk(
  "user/editUserData",
  async ({ data }, thunkAPI) => {
    try {
      await runBudgetApi.patch(`/user/`, data);
      thunkAPI.dispatch(fetchUserThunk());
      thunkAPI.dispatch(setIsEditModalOpen(false));

      toast.success(`User updated successfully!`, toastParams);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

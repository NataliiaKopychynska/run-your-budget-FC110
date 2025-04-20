import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const connectApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

export const setAuthHeader = (token) => {
  connectApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await connectApi.post("users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

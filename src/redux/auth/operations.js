import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "https://moneyguard-group-06.onrender.com/";


export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post("auth/register", credentials);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      setAuthHeader(data.data.token);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  if (!savedToken) {
    return thunkApi.rejectWithValue("Token does not exist!");
  }
  setAuthHeader(savedToken);
  try {
    const { data } = await axios.get("/auth/current");
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

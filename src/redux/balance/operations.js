import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://moneyguard-group-06.onrender.com";

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched user data:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk } from "./operations";

const initialState = {
  user: {},
  isEditUser: false,
  isUserModalOpen: false,
  isEditModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsEditUser: (state, action) => {
      state.isEditUser = action.payload;
    },
    setIsUserModalOpen: (state, action) => {
      state.isUserModalOpen = action.payload;
    },
    setIsEditModalOpen: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { setIsEditUser, setIsUserModalOpen, setIsEditModalOpen } =
  userSlice.actions;

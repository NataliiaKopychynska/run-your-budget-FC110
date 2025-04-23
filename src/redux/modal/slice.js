import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalType: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modalType = action.payload;
        },
        closeModal: (state) => {
            state.modalType = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
export const modalReducer = modalSlice.reducer;
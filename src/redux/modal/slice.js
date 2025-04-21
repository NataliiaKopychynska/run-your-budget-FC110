import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
    },
    reducers: {
        openModal: state => {
            state.isModalOpen = true;
        },
        closeModal: state => {
            state.isModalOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
export const modalReducer = modalSlice.reducer;

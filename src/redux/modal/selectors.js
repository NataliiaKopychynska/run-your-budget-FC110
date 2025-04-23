export const selectModalType = (state) => state.modal.modalType;

export const selectIsModalOpen = (state) =>
    state.modal.modalType === "logoutConfirm";
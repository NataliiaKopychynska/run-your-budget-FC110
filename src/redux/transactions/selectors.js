export const selectTransactions = (state) => state.transactions.transactions;

export const selectIsEditTransaction = (state) =>
  state.transactions.isEditTransaction;

export const selectIsAddTransaction = (state) =>
  state.transactions.isAddTransaction;

export const selectIsError = (state) => state.transactions.isError;

export const selectDeletingTransaction = (state) =>
  state.transactions.deletingTransaction;

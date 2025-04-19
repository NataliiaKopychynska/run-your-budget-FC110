export const selectTransactions = (state) => state.transactions.transactions;
export const selectIsEditTransaction = (state) =>
  state.transactions.isEditTransaction;
export const selectIsAddTransaction = (state) =>
  state.transactions.isAddTransaction;

export const selectTransactions = (state) => state.home.transactions.items;
export const selectCategories = (state) => state.home.categories.title;
export const selectIsLoading = (state) => state.home.isLoading;
export const selectIsError = (state) => state.home.isError;

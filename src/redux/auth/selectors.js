export const selectUser = (state) => state.auth.user;
export const selectUserEmail = (state) => state.auth.user?.email;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

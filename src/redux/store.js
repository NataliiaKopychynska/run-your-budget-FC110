import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { transactionsReducer } from "./transactions/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "transactions"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

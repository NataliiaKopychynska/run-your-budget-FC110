import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { transactionsReducer } from "./transactions/slice";
import { modalReducer } from "./modal/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  modal: modalReducer,
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

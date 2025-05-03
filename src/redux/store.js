import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { transactionsReducer } from "./transactions/slice";
import { modalReducer } from "./modal/slice";
import { globalReducer } from "./global/slice";
import { currencyReducer } from "./currency/slice";
import { statisticsReducer } from "./statistics/slice";
import { balanceReducer } from "./balance/slice";
import { userReducer } from "./user/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "statistics"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionsReducer,
  statistics: statisticsReducer,
  modal: modalReducer,
  global: globalReducer,
  currency: currencyReducer,
  balance: balanceReducer,
  user: userReducer,
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

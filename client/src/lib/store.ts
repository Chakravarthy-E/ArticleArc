import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth";
import blogReducer from "./slices/blog";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { apiSlice } from "./features/api/apiSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const reducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // Add apiSlice reducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/auth";
import blogReducer from "./slices/blog";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  blogs: blogReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

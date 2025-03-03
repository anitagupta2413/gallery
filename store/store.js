import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/AuthReducers"; // Import the auth slice
import { apiSlice } from "../apislices/ApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Register the auth reducer
    [apiSlice.reducerPath]: apiSlice.reducer, // Register API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

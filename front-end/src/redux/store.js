import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice.js";
import { apiSlice } from "./api/apislice.js";

import moviesReducer from "../redux/slices/MoviesSlice.js";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// getdefault middlewares contains all the deafault middlewares by redux and we are adding an additional middleware
// by .concat(apislice.middleware) it helps in automatic caching,re-fetching and managing api requests

export default store;

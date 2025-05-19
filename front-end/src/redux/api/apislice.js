import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token; // Get token from Redux state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Attach token to headers
    }
    return headers;
  },
}); // specifies base url for all the requests

export const apiSlice = createApi({
  // reducerPath : 'api' by default so no need to specify explicitly
  baseQuery, // giving apiSlice the basequery
  endpoints: () => ({}), // i can specify all endpoints here or in a separate file
});

import { apiSlice } from "./apislice";
import { USERS_URL } from "../constants";
// contain endpoint for all user routes

export const userapiSlice = apiSlice.injectEndpoints({
  // we will inject end points to the apislice from here
  endpoints: (builder) => ({
    login: builder.mutation({
      // creating mutation for login which will send dat to server on url by method
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      // mutation because we are sending some data to our database
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT", // because in this we will be changing the data
        body: data,
      }),
    }),
    getAllusers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetAllusersQuery,
} = userapiSlice;

import { apiSlice } from "./apislice";
import { GENRE_URL } from "../constants";

export const genreapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (data) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, data }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    listGenre: builder.query({
      // becuase it is a get request
      query: () => ({
        url: `${GENRE_URL}/genres`,
      }),
    }),
  }),
});

// exporting the hoooks
export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useListGenreQuery,
} = genreapiSlice;

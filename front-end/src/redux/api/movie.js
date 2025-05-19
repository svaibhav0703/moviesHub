import { apiSlice } from "../api/apislice.js";
import { MOVIE_URL, UPLOAD_URL } from "../constants.js";

export const movieapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),
    createMovie: builder.mutation({
      query: (data) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: data,
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-review`,
        method: "DELETE",
        body: { movieId, reviewId }, // If your backend expects body in DELETE
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),
    getMovie: builder.query({
      query: (id) => `${MOVIE_URL}/chosen-movie/${id}`,
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/new-movies`,
    }),
    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),
    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteReviewMutation,
  useDeleteMovieMutation,
  useGetMovieQuery,
  useUploadImageMutation,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} = movieapiSlice;

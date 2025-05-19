import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movies",
  initialState: {
    MoviesFilter: {
      searchTerm: "", // the search keyword entered by the user in text input
      selectedGenre: "", // the genre selected by the user
      selectedYear: "", // the year selected by the user
      selectedSort: "", // the type of sort user selected asc/desc
    },
    filteredMovies: [],
    movieYears: [],
    uniqueYears: [],
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.MoviesFilter = { ...state.MoviesFilter, ...action.payload }; // the current filter + the new filter
    },

    setfilteredMovie: (state, action) => {
      state.filteredMovies = action.payload;
    },

    setmovieYears: (state, action) => {
      state.movieYears = action.payload;
    },

    setuniqueYears: (state, action) => {
      state.uniqueYears = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setfilteredMovie,
  setmovieYears,
  setuniqueYears,
} = MovieSlice.actions;

export default MovieSlice.reducer;

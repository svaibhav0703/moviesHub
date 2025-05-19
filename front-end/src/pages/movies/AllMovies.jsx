import React from "react";
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movie.js";

import MovieCard from "./MovieCard.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useListGenreQuery } from "../../redux/api/genre.js";
import Nav from "../auth/Nav.jsx";

import {
  setmovieYears,
  setMoviesFilter,
  setfilteredMovie,
  setuniqueYears,
} from "../../redux/slices/MoviesSlice.js";

import { useForm } from "react-hook-form";
const AllMovies = () => {
  const dispatch = useDispatch();
  const { data: movies } = useGetAllMoviesQuery();
  const { data: genres } = useListGenreQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { MoviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = movies?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [searched, Genre, Year, SortBy] = watch([
    "search",
    "genre",
    "year",
    "sort",
  ]);

  useEffect(() => {
    dispatch(setfilteredMovie(movies, []));
    dispatch(setmovieYears(movieYears));
    dispatch(setuniqueYears(uniqueYears));
  }, [movies, dispatch]);

  useEffect(() => {
    dispatch(
      setMoviesFilter({
        searchTerm: searched,
        selectedGenre: Genre,
        selectedYear: Year,
        selectedSort: SortBy,
      })
    );
    let newfilteredMovies = movies || [];
    console.log(newfilteredMovies);
    if (SortBy === "New movies") {
      newfilteredMovies = newMovies;
    } else if (SortBy === "Top movies") {
      newfilteredMovies = topMovies;
    } else if (SortBy === "Random movies") {
      newfilteredMovies = randomMovies;
    }

    newfilteredMovies = newfilteredMovies?.filter((movie) => {
      const matchesSearch =
        !searched ||
        movie.movieName.toLowerCase().includes(searched?.toLowerCase());
      const matchesGenre = !Genre || movie.genre === Genre;
      const matchesYear = !Year || movie.year === parseInt(Year);
      return matchesSearch && matchesGenre && matchesYear;
    });
    dispatch(setfilteredMovie(newfilteredMovies));
  }, [searched, Genre, Year, movies, SortBy, dispatch]); // whenever any of this changes the moviesFilter inside changes in the store
  // after that filteredMovies object in the front-end changes

  return (
    <div className="h-fit bg-gray-950">
      <Nav />
      <div className=" h-fit w-screen relative">
        <div className="flex flex-row">
          <img
            src="../src/assets/i.jpg"
            className="w-120 h-150 object-cover object-top"
            alt=""
          />

          <img
            src="../src/assets/i2.jpg"
            className="w-120 h-150 object-cover object-bottom "
            alt=""
          />
          <img
            src="../src/assets/i3.jpg"
            className="w-120 h-150 object-cover object-top"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-950 opacity-60"></div>

        <div className="absolute w-[80%] left-[50%] translate-x-[-50%] text-center bottom-[50%] translate-y-[40%] ">
          <h1 className=" text-white text-8xl">THE MOVIES HUB</h1>
          <p className="text-xl text-gray-300">
            Cinematic oddysey: Unveiling the magic of movies
          </p>

          <hr className="ml-auto mr-auto mt-2 text-gray-300 w-200" />
        </div>
      </div>
      <form className="absolute bottom-[42%] left-[50%] translate-x-[-50%] flex flex-col gap-5">
        <div>
          <input
            type="text"
            className="h-14 w-100 bg-white p-3 rounded-md text-center"
            placeholder="Search"
            {...register("search")}
          />
        </div>

        <div className="flex flex-row justify-between text-gray-500">
          <select {...register("genre")} className="bg-white h-10 w-30">
            <option value="">Genres</option>
            {genres?.map((genre) => {
              return (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              );
            })}
          </select>

          <select {...register("year")} className="bg-white h-10 w-30">
            <option value="">Year</option>
            {uniqueYears?.map((year) => {
              return <option key={year}>{year}</option>;
            })}
          </select>

          <select {...register("sort")} className="bg-white h-10 w-30">
            <option>Sort by</option>
            <option value="New movies">New movies</option>
            <option value="Top movies">Top movies</option>
            <option value="Random movies">Random movies</option>
          </select>
        </div>
      </form>

      <div className="w-[90%] grid grid-cols-6 gap-y-10 gap-x-10 ml-auto mr-auto mt-30">
        {filteredMovies?.map((movie) => {
          return <MovieCard key={movie._id} movie={movie}></MovieCard>;
        })}
      </div>
    </div>
  );
};

export default AllMovies;

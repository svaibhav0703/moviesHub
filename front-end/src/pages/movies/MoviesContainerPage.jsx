import React, { useEffect, useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movie";

import { useListGenreQuery } from "../../redux/api/genre.js";
import SliderUtil from "./SliderUtil";
const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useListGenreQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleClickGenre = (e, genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovie = newMovies?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre._id
  );
  useEffect(() => {
    console.log(genres);
    console.log(newMovies);
  }, [genres, newMovies]);
  return (
    <>
      <div className="mr-auto ml-auto w-[90%] mt-10 ">
        <div className="flex  flex-row flex-wrap justify-center items-center gap-5  ">
          {genres?.map((genre) => {
            return (
              <button
                className={` h-10 w-fit border-1 border-gray-500 rounded-md p-2 transition-transform text-gray-500 duration-100 ease-in hover:scale-105 hover:border-white hover:text-white ${
                  genre._id === selectedGenre ? "text-white" : "text-gray-500"
                }`}
                key={genre._id}
                onClick={(e) => handleClickGenre(e, genre)}
              >
                {genre.name}
              </button>
            );
          })}
        </div>

        <div>
          <h1 className="text-gray-500 mb-10 mt-10">
            {selectedGenre ? selectedGenre.name : "Top Movies"}
          </h1>
          <SliderUtil
            data={selectedGenre ? filteredMovie : topMovies}
          ></SliderUtil>
        </div>
      </div>
    </>
  );
};

export default MoviesContainerPage;

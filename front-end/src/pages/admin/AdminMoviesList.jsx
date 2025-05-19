import React from "react";
import { useGetAllMoviesQuery } from "../../redux/api/movie";
import { Link } from "react-router-dom";
const AdminMoviesList = () => {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();

  if (isLoading) return <p className="text-white">Loading movies...</p>;
  if (error) return <p className="text-white">Error loading movies</p>;

  return (
    <div className="flex flex-col gap-10 h-fit bg-gray-950">
      <div className="text-5xl text-white ml-8 mt-8">
        ALL MOVIES ({movies?.length})
      </div>
      <div className="flex flex-row flex-wrap gap-10 border-1 border-gray-500 rounded-2xl w-[96%] ml-auto mr-auto p-16">
        {movies.map((movie) => (
          <Link
            key={movie._id}
            to={`/admin/movies/update/${movie._id}`}
            className="block overflow-hidden hover:cursor-pointer"
          >
            <div className="flex flex-row gap-10 border-1 border-gray-500 rounded-md p-4">
              <div>
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-40 h-40 object-cover rounded-md cursor-pointer "
                />
                <p className="text-gray-500 text-center mt-4 border-1 border-gray-500 bg-whiter rounded-md h-10 flex flex-row justify-center items-center">
                  {movie.movieName}
                </p>
              </div>

              <div className="text-gray-500 w-90 h-fit">{movie.detail}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminMoviesList;

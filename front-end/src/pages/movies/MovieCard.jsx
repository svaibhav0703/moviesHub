import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  return (
    <div className=" transition-transform text-gray-500 duration-100 ease-in hover:scale-105 hover:text-white">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.movieName}
          className="w-40 h-40 object-cover transition-transform duration-100 ease-in hover:scale-101 rounded-2xl "
        />
      </Link>
      <p>{movie.movieName}</p>
    </div>
  );
};

export default MovieCard;

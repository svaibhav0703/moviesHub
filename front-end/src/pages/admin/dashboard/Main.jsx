import React from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../redux/api/movie";

import { useGetAllusersQuery } from "../../../redux/api/users";
const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: Users } = useGetAllusersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((movies) => movies.numReviews); // array of number of comments

  const sumOfComments = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <section className="h-fit bg-gray-950 pb-50">
      <div className="flex flex-col justify-center items-center pt-40">
        <div className="flex flex-row justify-center items-center gap-10">
          <SecondaryCard
            pill="users"
            content={Users?.length}
            info="30 more than usual"
          />
          <SecondaryCard
            pill="comments"
            content={sumOfComments}
            info="15 more than usual"
          />
          <SecondaryCard
            pill="movies"
            content={allMovies?.length}
            info="10+ more than usual"
          />
        </div>
        <div className="flex justify-between items-center text-white mt-10 w-[38%] mb-5">
          <p>Top content</p>
          <p>Comments </p>
        </div>
        <div className="flex flex-col items-center gap-5">
          {topMovies?.map((movie) => {
            return (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.movieName}
                date={movie.year}
                comment={movie.numReviews}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Main;

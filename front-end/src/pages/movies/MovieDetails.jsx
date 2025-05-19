import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import MovieTabs from "./MovieTabs.jsx";
import {
  useGetMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movie.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const MovieDetails = () => {
  const navigate = useNavigate();
  const { id: movieId } = useParams(); // desturcture id as movieId

  const { data: movie, refetch } = useGetMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);

  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const [createReview, { loading: creatingReview }] =
    useAddMovieReviewMutation();

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("review added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit text-white relative w-screen bg-gray-950">
      <Toaster position="top-center"></Toaster>
      <button
        onClick={() => navigate(-1)}
        className="h-10 w-10 absolute border-1 border-gray-500 rounded-2xl left-5 top-5"
      >
        <FontAwesomeIcon color="gray" icon={faArrowLeft} />
      </button>

      <div className="flex justify-start items-center h-[50%] w-screen ">
        <div className="flex justify-center items-center gap-30 mt-10 p-15">
          <img
            src={movie?.image}
            alt={movie?.movieName}
            className="rounded w-[20%]"
          />
          <div className="flex flex-col gap-10">
            <div className="w-200">
              <h2 className="text-white text-2xl ">
                {movie?.movieName} ({movie?.year})
              </h2>
              <br />
              <p>{movie?.detail}</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <p className="text-xl">Cast:</p>
              {movie?.cast.map((actor) => {
                return (
                  <>
                    <div className="h-fit w-fit border-1 text-gray-500 rounded-md  border-gray-500 hover:scale-101 hover:border-white hover:text-white  flex items-center p-2">
                      {actor}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 w-[80%] mr-auto ml-auto">
        <div>
          <MovieTabs
            loadingMovieReview={creatingReview}
            userInfo={userInfo}
            rating={rating}
            setrating={setrating}
            comment={comment}
            setcomment={setcomment}
            submithandler={submithandler}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import React from "react";
import {
  useDeleteReviewMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movie";
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
const Allcomments = () => {
  const navigate = useNavigate();
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteReview] = useDeleteReviewMutation();
  const handleDelete = async (movieId, reviewId) => {
    try {
      await deleteReview({ movieId, reviewId }).unwrap();
      toast.success("review deleted");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" relative h-fit bg-gray-950 flex flex-col justify-center items-center gap-5">
      <Toaster position="top-center"></Toaster>
      <button
        onClick={() => navigate(-1)}
        className="h-10 w-10 absolute border-1 border-gray-500 rounded-2xl left-5 top-5"
      >
        <FontAwesomeIcon color="gray" icon={faArrowLeft} />
      </button>
      <h1 className="text-white text-5xl mt-10">All Reviews</h1>
      <hr className="mr-auto ml-auto w-80 text-white mb-7" />
      {movies?.map((movie) => {
        if (!movie.reviews.length) return null;

        return (
          <section
            key={movie._id}
            className="h-fit w-screen flex flex-col  justify-center items-center gap-2"
          >
            <h1 className="text-white text-xl">{movie.movieName}</h1>

            {movie?.reviews.map((review) => {
              return (
                <div
                  className=" w-140 h-fit border-1 border-gray-500 rounded-md hover:border-white hover:scale-101 transition delay-100 p-3 flex flex-row justify-between items-center"
                  key={review._id}
                >
                  <div className="text-gray-500 hover:text-white">
                    <strong>{review.name}</strong>
                    <p>{review.comment}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(movie._id, review._id)}
                      className=" h-8 w-20 border-1 border-gray-500 rounded-md p-1 text-gray-500 hover:text-white hover:border-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
};

export default Allcomments;

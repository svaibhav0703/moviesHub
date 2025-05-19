import React from "react";
import { Link } from "react-router-dom";
const MovieTabs = ({
  userInfo,
  rating,
  setrating,
  comment,
  setcomment,
  loadingMovieReview,
  movie,
  submithandler,
}) => {
  return (
    <div>
      <section>
        {userInfo ? (
          <>
            <form onSubmit={submithandler}>
              <div className="flex flex-col gap-2">
                <label htmlFor="comment" className="text-white text-xl">
                  Write review
                </label>
                <textarea
                  id="comment"
                  required
                  value={comment}
                  onChange={(e) => setcomment(e.target.value)}
                  placeholder="Your review"
                  rows={5}
                  className="text-gray-500 p-2 border-1 border-gray-500 rounded-md h-30 w-inherit hover:border-white"
                ></textarea>
                <button className="h-10 w-50 border-1 text-gray-500 rounded-md  border-gray-500 hover:scale-101 hover:border-white hover:text-white ">
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="text-gray-500">
              please <Link to="/login" className="text-white"></Link>to write a
              review
            </p>
          </>
        )}
      </section>
      <section>
        <div>
          {movie?.reviews.length === 0 && (
            <>
              <p>No reviews</p>
            </>
          )}
        </div>
        <div className="mt-10 flex flex-wrap justify-between">
          {movie?.reviews.length && (
            <>
              {movie?.reviews.map((review) => {
                return (
                  <>
                    <div
                      key={review._id}
                      className="h-fit w-140 border-1  border-gray-500  p-5 rounded-md text-gray-500"
                    >
                      <h1 className="text-xl">{review.name}</h1>

                      <p>{review.comment}</p>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;

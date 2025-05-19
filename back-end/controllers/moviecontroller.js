import asynchandler from "../middlewares/asynchandle.js";
import Movie from "../models/movie.js";

const getallMovies = asynchandler(async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (error) {
    res.status(400).json(error);
  }
});

const createMovie = asynchandler(async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    console.log(newMovie);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getMovie = asynchandler(async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findOne({ _id: id });
    if (!movie) {
      res.status(404).json("movie not found");
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json(error);
  }
});

const updateMovie = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      res.status(400).json({ message: "movie not found" });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json(error);
  }
});

const movieReview = asynchandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // the r.user is a objectId && req.user the userobject we are selecting id from it
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        // if already reviewed no more reviews
        res.status(400).json({ message: "already reviewed" });
        return;
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;

      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
      await movie.save();
      res.status(200).json({ message: `review added by ${req.user.username}` });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

const deleteMovie = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      res.status(400).json({ message: "movie does not exist" });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json(error);
  }
});

const deleteReview = asynchandler(async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      res.status(404).json({ message: "review not found" });
    }

    movie.reviews.splice(reviewIndex, 1); // deleting 1 review from reviewindex
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;
    await movie.save();
    res.json({ message: "review deleted succesfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

const getNewMovies = asynchandler(async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getTopMovies = asynchandler(async (req, res) => {
  try {
    const topMovies = await Movie.find().sort({ numReviews: -1 }).limit(10);
    res.json(topMovies);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getRandomMovies = asynchandler(async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
  } catch (error) {
    res.status(500).json(error);
  }
});
export {
  getallMovies,
  createMovie,
  getMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteReview,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};

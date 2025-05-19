import express from "express";
import {
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
} from "./controllers/moviecontroller.js";

const router = express.Router();

// controllers
// middlewares
import { auth, authAdmin } from "./middlewares/auth.js";
import checkId from "./middlewares/checkId.js";

// public routes ( for users who are not logged in )
router.get("/all-movies", getallMovies);
router.get("/chosen-movie/:id", getMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);
// restricted routes ( for logged in users )
router.post("/:id/reviews", auth, checkId, movieReview);

// admin routes ( for admins )
router.post("/create-movie", auth, authAdmin, createMovie);
router.put("/update-movie/:id", auth, authAdmin, updateMovie);
router.delete("/delete-movie/:id", auth, authAdmin, deleteMovie);
router.delete("/delete-review", auth, authAdmin, deleteReview);
export default router;

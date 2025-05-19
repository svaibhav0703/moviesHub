import express from "express";
import {
  createGenre,
  updateGenre,
  deleteGenre,
  listGenre,
  readGenre,
} from "./controllers/genrecontroller.js";
const router = express.Router();

// controllers

// middlewares
import { auth, authAdmin } from "./middlewares/auth.js";

router.route("/").post(auth, authAdmin, createGenre);
router.route("/:id").put(auth, authAdmin, updateGenre);
router.route("/:id").delete(auth, authAdmin, deleteGenre);
router.route("/genres").get(listGenre);
router.route("/:id").get(readGenre);

export default router;

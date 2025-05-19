import genre from "../models/genre.js";
import asynchandler from "../middlewares/asynchandle.js";

const createGenre = asynchandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json("genre is required");
    }
    const existingGenre = await genre.findOne({ name });
    if (existingGenre) {
      return res.status(400).json("genre already exists");
    }
    console.log("HI");
    const Genre = await new genre({ name }).save();
    return res.status(200).json(Genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateGenre = asynchandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params; // we are putting the id into the url

    const Genre = await genre.findOne({ _id: id });
    if (!Genre) {
      return res.status(400).json({ error: "genre not found" });
    }
    // updating the name in the instance of the database
    Genre.name = name;
    // updating the actual database
    const updatedGenre = await Genre.save();
    res.status(200).json("genre is updated");
  } catch (error) {
    res.status(400).json(error);
  }
});

const deleteGenre = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await genre.findByIdAndDelete(id);
    if (!removed) {
      res.status(404).json({ error: "genre not found" });
    }
    res.json("deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const listGenre = asynchandler(async (req, res) => {
  try {
    const all = await genre.find({});
    res.status(200).json(all);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

const readGenre = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const Genre = await genre.findOne({ _id: id });
    res.status(200).json(Genre);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

export { createGenre, updateGenre, deleteGenre, listGenre, readGenre };

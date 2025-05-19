import express from "express";
import DBconnect from "./DBconnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes.js";
import cors from "cors";
import movieRoutes from "./MovieRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import path from "path";
//dotenv.config() is a function from the dotenv package in Node.js.
// It loads environment variables from a .env file into process.env.
dotenv.config();

const app = express();
const port = process.env.port;
const database_url = process.env.database_url;

// connecting the server to the database
DBconnect(database_url);

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies
  })
);

// middlewares

// converts incoming json data by POST method to javascript objects and then we destructure them to display on the frontend
app.use(express.json());

// Parses application/x-www-form-urlencoded data (the default encoding for HTML forms).
// Converts the incoming request body into a JavaScript object and attaches it to req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

import genreRoutes from "./genreRoutes.js";
app.use("/api/v1/genre", genreRoutes);

app.use("/api/v1/movies", movieRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/upload", uploadRoutes);

app.listen(port, () => {
  console.log("listening to port", process.env.port);
});

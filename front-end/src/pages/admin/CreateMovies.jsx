import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import { useListGenreQuery } from "../../redux/api/genre.js";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movie.js";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [createMovie, { isLoading: isCreatingMovie, error: createError }] =
    useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploading, error: uploadError }] =
    useUploadImageMutation();

  const { data: genres, isLoading: loadingGenre } = useListGenreQuery();
  const userInfo = useSelector((state) => state.auth.userInfo);
  /* useEffect(() => {
    console.log(genres);
    console.log(userInfo.token);
  }, [genres, userInfo.token]); */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateMovie = async (data) => {
    try {
      console.log(data);

      const movieName = data.name;
      const detail = data.Details;
      const Genre = data.genre;
      const year = data.year;
      const cast = data.Cast.split(",");

      if (!data.Image) {
        console.log("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("image", data.Image[0]);
      /* console.log(data.Image[0]); */

      let uploadedimagePath = null;
      const uploadImageResponse = await uploadImage(formData);
      if (uploadImageResponse.data) {
        uploadedimagePath = uploadImageResponse.data.image;
      } else {
        console.log(uploadError);
        toast.error("failed to upload image");
        return;
      }

      const selectedGenre = genres.find((genre) => genre.name === Genre);
      if (!selectedGenre) {
        toast.error("choose a genre");
        return;
      }
      console.log(uploadedimagePath);
      /* console.log("TOKEN FROM REDUX:", userInfo?.token); */
      await createMovie({
        movieName,
        image: uploadedimagePath.toString(),
        year,
        genre: selectedGenre._id,
        detail,
        cast,
      }).unwrap();
      toast.success("movie created");
      navigate("/admin/movies-list");
    } catch (error) {
      console.log("threre is an error", error.data);
    }
  };

  return (
    <div className="text-gray-500 flex flex-col justify-center items-center">
      <Toaster position="top-center"></Toaster>
      <h1 className="text-white text-5xl mb-10 mt-5  ">ADD NEW MOVIES</h1>
      <form
        onSubmit={handleSubmit(handleCreateMovie)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-row gap-10">
          <div>
            <label htmlFor="name" className="">
              name
            </label>
            <br />
            <input
              type="text"
              className="h-10 w-100  border-1 border-gray-500 rounded-md  p-2 "
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <label htmlFor="year" className="">
              Year
            </label>
            <br />
            <input
              type="number"
              className="h-10 w-100  border-1 border-gray-500 rounded-md "
              {...register("year", { required: true })}
            />
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <div className="">
            <label>Image</label>
            <br />
            <input
              type="file"
              className="bg-white w-100 h-10 rounded-md text-center p-2"
              {...register("Image", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="genre" className="">
              Genre
            </label>
            <br />
            <select
              id="genre"
              {...register("genre", { required: true })}
              className="h-10 w-100 bg-white"
            >
              {loadingGenre ? (
                <option>Loading genres....</option>
              ) : (
                genres.map((genre) => {
                  return <option key={genre._id}>{genre.name}</option>;
                })
              )}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="Details" className="">
            Details
          </label>
          <br />
          <textarea
            type="text"
            className="h-30 w-210  border-1 border-gray-500 rounded-md  p-2"
            {...register("Details", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="Cast" className="">
            Cast(comma-separated) {/* we should use .join  */}
          </label>
          <br />
          <input
            type="text"
            key="cast"
            className="h-10 w-210  border-1 border-gray-500 rounded-md  p-2"
            {...register("Cast", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="h-10 w-100 bg-white rounded-md ml-auto mr-auto"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;

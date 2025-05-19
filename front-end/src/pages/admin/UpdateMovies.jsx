import { React, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useDeleteMovieMutation,
  useUploadImageMutation,
  useGetMovieQuery,
  useUpdateMovieMutation,
} from "../../redux/api/movie";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const UpdateMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: initialMovie } = useGetMovieQuery(id);

  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isLoading, error: uploadError }] =
    useUploadImageMutation();
  const [deleteMovie, { isLoading: isDeleting, error: deleteError }] =
    useDeleteMovieMutation();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialMovie) {
      reset({
        name: initialMovie.movieName,
        year: initialMovie.year,
        Details: initialMovie.detail,
        Cast: initialMovie.cast.join(", "), // if cast is an array
        Image: initialMovie.image,
      });
    }
  }, [initialMovie, reset]);

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    try {
      // all details and image is stored inside variables now
      const data = getValues();
      const movieName = data.name;
      const year = data.year;
      const details = data.Details;
      const cast = data.Cast.split(",");
      const formData = new FormData();
      formData.append("image", data.Image[0]);
      if (!cast || !movieName || !year || !details || !formData) {
        toast.error("fill all the details");
        return;
      }

      let uploadedImagePath = initialMovie.image;
      console.log("Uploaded image", uploadedImagePath);
      const uploadImageResponse = await uploadImage(formData);
      console.log(uploadImageResponse);
      if (uploadImageResponse.data) {
        uploadedImagePath = uploadImageResponse.data.image;
      } else {
        toast.error("failed to upload image");
        return;
      }

      console.log("final", uploadedImagePath);
      await updateMovie({
        id,
        data: {
          movieName,
          year,
          details,
          cast,
          image: uploadedImagePath.toString(),
        },
      }).unwrap();
      toast.success("movie updated");
      navigate("/movies");
    } catch (error) {
      console.log("not updated error:", error);
    }
  };
  const handleDeleteMovie = async (e) => {
    e.preventDefault();
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center text-gray-500">
      <Toaster position="top-center"></Toaster>
      <form className="flex flex-col gap-10">
        <p className="text-white text-5xl mt-10 text-center">UPDATE MOVIE</p>
        <div className="flex flex-row gap-10">
          <div>
            <label htmlFor="name" className="">
              name
            </label>
            <br />
            <input
              type="text"
              placeholder=""
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

        <div className="ml-auto mr-auto">
          <label>Image</label>
          <br />
          <input
            type="file"
            className="bg-white w-100 h-10 rounded-md text-center p-2"
            {...register("Image", { required: true })}
          />
        </div>
        <div className="flex flex-row gap-10">
          <button
            type="submit"
            className="h-10 w-100 rounded-md ml-auto mr-auto bg-green-500 text-white"
            onClick={(e) => handleUpdateMovie(e)}
          >
            {isUpdating || isLoading ? "updating..." : "update"}
          </button>
          <button
            onClick={(e) => handleDeleteMovie(e)}
            type="submit"
            className="h-10 w-100  rounded-md ml-auto mr-auto bg-red-500 text-white"
          >
            {isDeleting || isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovies;

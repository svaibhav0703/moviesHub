import React from "react";
import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useListGenreQuery,
} from "../../redux/api/genre.js";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const GenreList = () => {
  const { data: genres, refetch } = useListGenreQuery(); // returns and object so we destructure using curly braces

  const [selectedGenre, setselectedGenre] = useState(null);
  const [visible, setvisible] = useState(false);

  const [createGenre] = useCreateGenreMutation(); // returns an array
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  // to create multiple forms inside one page
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    getValues: getValues1,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    getValues: getValues2,
  } = useForm();

  const handleCreateGenre = async (data) => {
    try {
      const Genre = data.genre;
      const res = await createGenre({ name: Genre }).unwrap(); // sends the data to the backend and then unwraps the response givne by the bakend
      if (!res) {
        toast.error(res);
      }
      toast.success("genre created");
      refetch();
      reset1();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleClick = (e, genre) => {
    setvisible(true);
    setselectedGenre(genre);
  };

  const handleUpdateGenre = async (e) => {
    try {
      e.preventDefault();

      const data = getValues2();

      const res = await updateGenre({
        id: selectedGenre._id,
        data: { name: data.newgenre },
      }).unwrap();

      refetch();
      toast.success("genre is updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    try {
      e.preventDefault();
      console.log(selectedGenre._id);
      const res = await deleteGenre(selectedGenre._id).unwrap();
      refetch();
      toast.success("genre is deleted");
    } catch (error) {
      console.log(error);
    }
  };

  /*  useEffect(() => {
    console.log(selectedGenre);
  }, [selectedGenre]); */

  const all = genres;

  return (
    <div className="flex flex-col   gap-10 relative">
      <Toaster position="top-center" />
      <div>
        <h1 className="text-white text-5xl bold mt-15 ml-14">MANAGE GENRES</h1>
      </div>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col h-80 w-screen  border-white rounded-2xl p-15 gap-10">
          <div>
            <form
              onSubmit={handleSubmit1(handleCreateGenre)}
              className="flex flex-row gap-10 items-center"
            >
              <input
                type="text"
                placeholder="enter the genre"
                className="h-10 w-100 p-2 text-gray-500 border-1 border-white rounded-md"
                {...register1("genre", { required: true, maxLength: 30 })}
              />
              <button className="h-10 w-25 bg-white text-gray-500 border-1 border-white rounded-md">
                Add
              </button>
            </form>
          </div>

          <div className="flex flex-row flex-wrap  gap-5 mt-5">
            {all?.map((genre) => (
              <div
                className="h-10 w-fit bg-white rounded-md flex flex-row items-center justify-center p-2 "
                key={genre._id}
              >
                <h3
                  onClick={(e) => handleClick(e, genre)}
                  color="gray"
                  className="hover: cursor-pointer"
                >
                  {genre.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div>
          {visible && (
            <>
              <div className="h-60 w-120 border-1 border-white rounded-2xl relative flex flex-col justify-center items-center gap-5 mt-5">
                <h1 className="text-white text-2xl">selected genre</h1>
                <div>
                  <form className="flex flex-col justify-center gap-10 items-center">
                    <input
                      type="text"
                      placeholder={selectedGenre.name}
                      className="h-10 w-100 p-2 text-gray-500 border-1 border-white rounded-md text-center"
                      {...register2("newgenre", {
                        required: true,
                        maxLength: 30,
                      })}
                    />
                    <div className="flex flex-row gap-50">
                      <button
                        className="h-10 w-25 bg-white text-black border-1 border-white rounded-md"
                        onClick={handleUpdateGenre}
                      >
                        Update
                      </button>

                      <button
                        className="h-10 w-25 bg-white text-black border-1 border-white rounded-md"
                        onClick={handleDeleteGenre}
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <button
                onClick={() => {
                  setvisible(false);
                }}
                className="h-10 w-10 absolute border-1 border-white rounded-2xl left-[50%] translate-x-[-50%] bottom-8 hover: cursor-pointer"
              >
                <FontAwesomeIcon color="white" icon={faXmark} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreList;

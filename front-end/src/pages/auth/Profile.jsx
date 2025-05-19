import React, { useState, useEffect } from "react";
import { setCredentials } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useProfileMutation } from "../../redux/api/users.js";
import { Toaster, toast } from "react-hot-toast";
import Nav from "../auth/Nav.jsx";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    console.log(userInfo.token);
  }, [userInfo.token]);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    if (data.password !== data.Cpassword) {
      toast("paasword mismatch");
      console.log("HI");
      return;
    } else {
      try {
        const username = data.name;
        const email = data.email;
        const password = data.password;
        const newDetails = await updateProfile({
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...newDetails }));
        toast.success("profile updated");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10 relative">
      <Toaster position="top-right" />
      <button
        onClick={() => navigate(-1)} // to go to the previous page
        className="h-10 w-10 absolute border-1 border-gray-500 rounded-2xl left-5 top-5"
      >
        <FontAwesomeIcon color="gray" icon={faArrowLeft} />
      </button>
      <div>
        <h1 className="text-gray-500 text-5xl font-bold">UPDATE PROFILE</h1>
      </div>
      <div className="container border-1 border-gray-500 w-fit h-fit rounded-md p-10">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="text-gray-500 flex flex-col  items-center "
        >
          <div className=" text-gray-500 rounded-md p-5 flex flex-col">
            <label htmlFor="username" className="text-gray-500">
              Username
            </label>
            <input
              className="h-5 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
              type="text"
              {...register("name", { maxLength: 30 })}
              placeholder={userInfo.username}
            />
          </div>
          <div className=" text-gray-500 rounded-md p-5 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="h-5 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
              type="text"
              {...register("email", { maxLength: 30 })}
              placeholder={userInfo.email}
            />
          </div>
          <div className="text-gray-500 rounded-md p-5 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="h-5 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
              type="text"
              {...register("password", { maxLength: 30 })}
              placeholder="enter new password"
            />
          </div>
          <div className=" text-gray-500 rounded-md p-5 flex flex-col">
            <label htmlFor="Cpassword" className="text-gray-500">
              Confirm password
            </label>
            <input
              className="h-5 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
              type="text"
              {...register("Cpassword", { maxLength: 30 })}
              placeholder="confirm new password"
            />
          </div>
          <div className="h-[106px] w-[440px] flex flex-row justify-center items-center">
            <button
              className="h-10 w-100 bg-white rounded-md text-gray-900 hover:cursor-pointer hover:bg-gray-500"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

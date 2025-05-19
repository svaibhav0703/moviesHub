import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/slices/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { useRegisterMutation } from "../../redux/api/users";

import { useForm } from "react-hook-form";
const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate(); // useNavigator is used to navigate to a different route

  const [Register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation(); // useLocation gives the details about the current route (search gives query string)
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; // if user is admin then we have to move them to dashboard

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const onsubmit = async (data) => {
    if (data.password != data.password2) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        // if password matches we send the data to the server
        const username = data.name;
        const email = data.email;
        const password = data.password;
        const user = await Register({ username, email, password }).unwrap(); // token is sent by the backend and it gets updated in the store
        // if the key and value are same we can write them in shorthand instead of {username:username,email:email}..
        dispatch(setCredentials({ ...user }));
        navigate(redirect);
        toast.success("users registerd successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-row justify-around items-center">
      <Toaster />
      <div className="flex flex-col items-center gap-10 ">
        <div className="border-1 border-gray-500 rounded-md p-15">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col items-center justify-evenly gap-5"
          >
            {" "}
            {/* on submit function will run whenever we submit the form  */}
            <div>
              <label htmlFor="name" className=" text-gray-500">
                Name
              </label>
              <br />
              <input
                className="h-10 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true, maxLength: 20 })}
              />
            </div>
            <div>
              <label htmlFor="email" className=" text-gray-500">
                Email
              </label>
              <br />
              <input
                className="h-10 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
                type="email"
                placeholder="Enter your mail"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="password" className=" text-gray-500">
                Password
              </label>
              <br />
              <input
                className="h-10 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="password2" className=" text-gray-500">
                confirm password
              </label>
              <br />
              <input
                className="h-10 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
                type="text"
                placeholder="confirm your password"
                {...register("password2", { required: true })}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-white h-10 w-100 rounded-md mt-5 hover:cursor-pointer"
            >
              {isLoading ? "Registering" : "Register"}
            </button>
            <div className="text-gray-500">
              {" "}
              Already registered?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-white hover:text-green-300"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="h-180 w-180 grid grid-cols-2 grid-rows-2 ">
        <div>
          <img
            className="w-[60%] row-span-2"
            src="https://i.pinimg.com/474x/7e/7b/3f/7e7b3ffc29378ae09015c4ad34e39cfa.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[60%]"
            src="https://i.pinimg.com/736x/a4/d5/5e/a4d55e1f7b119986b193cc9d1d0e6663.jpg"
            alt=""
          />
        </div>

        <div>
          <img
            className="w-[60%]"
            src="https://i.pinimg.com/736x/c9/7c/54/c97c54d09e728cc4e68ae6f630d43984.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-[70%]"
            src="https://i.pinimg.com/736x/e9/b8/7c/e9b87cbb10b9784ffbcdfb09d83cb696.jpg"
            alt=""
          />
        </div>
      </div> */}
    </div>
  );
};

export default Register;

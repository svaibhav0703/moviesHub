import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { useLoginMutation } from "../../redux/api/users";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation(); // return value of the query string string
  const sp = new URLSearchParams(search); // object contaning all search parameters
  const redirect = sp.get("redirect") || "/"; // if we have something in redirect than we will go there otherwise we go to homepage
  // basically redirect is to redirect us to the admin dashboard in this project

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // navigate to ADMIN or HOME
    }
  }, [navigate, redirect, userInfo]); // if any of this changes than we must implement function inside the useeffect
  // navigate is generally stable but it is advised to include all dependency by ESLint rules (but not necessary becauase it is stable)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // to check if the token is present or not
  /* useEffect(() => {
    if (userInfo?.token) {
      console.log("token got updated", userInfo.token);
    }
  }, [userInfo]); */
  const onsubmit = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap(); // sends the data
      /* console.log(res); */
      // without unwrap this returns data,error,isLoading | with unwrap it only sends data or the error
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="h-screen flex flex-row justify-around items-center">
      <Toaster position="top-center" />
      <div className="flex flex-col items-center gap-10 ">
        <div className="border-1 border-gray-500 rounded-md p-15">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="flex flex-col items-center justify-evenly gap-5"
          >
            {" "}
            {/* on submit function will run whenever we submit the form  */}
            <div>
              <label htmlFor="email" className=" text-gray-500">
                Email
              </label>
              <br />
              <input
                className="h-10 w-100 border-1 border-gray-500 text-gray-500 rounded-md p-5"
                type="email"
                placeholder="Enter your Email"
                {...register("email", { required: true, maxLength: 30 })}
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
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-white h-10 w-100 rounded-md mt-5 hover:cursor-pointer"
            >
              {isLoading ? "Logging in" : "Log in"}
            </button>
            <div className="text-gray-500">
              {" "}
              New user?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-white hover:text-green-300"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd, // Make sure this is spelled correctly
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users.js"; // If calling logout API
import { logout } from "../../redux/slices/authSlice.js";

const Nav = () => {
  const { userInfo } = useSelector((state) => state.auth); // userInfo is the object containing all the info aboout the user
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutapicall] = useLogoutMutation();

  const logouthandler = async () => {
    try {
      await logoutapicall().unwrap(); // send the message to the backend that we are logging out
      dispatch(logout()); // then updating the frontend states by logout action in authslice of store
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  /* const [logoutapicall] = useLoginMutation(); */
  return (
    <>
      <div className="h-30 w-100 bg-gray-950 fixed bottom-10 left-[50%] transform translate-x-[-50%] border-1 border-gray-500 rounded-xl flex flex-row justify-around items-center">
        <div className="flex flex-row gap-5">
          <Link to="/">
            <AiOutlineHome className="" size={26} color="gray" />
          </Link>
          <Link to="/movies">
            <MdOutlineLocalMovies size={26} color="gray"></MdOutlineLocalMovies>
          </Link>
        </div>

        {/* if logged in then we will have userInfo then we will have a name and when we click it we need a dropdown */}
        <button
          onClick={toggleDropdown}
          className="relative text-gray-500 hover:cursor-pointer bg-gray-950"
        >
          {userInfo ? <span>{userInfo.username} </span> : <></>}

          {userInfo && dropdownOpen && (
            <>
              <div
                className={`absolute  h-15 w-100 right-0 bottom-20 transform ${
                  !userInfo ? "translate-x-[14%]" : "translate-x-[14%]"
                } border-1 border-gray-500 bg-gray-950 rounded-xl`}
              ></div>
            </>
          )}
        </button>

        {userInfo && dropdownOpen && (
          <ul className="absolute flex flex-row justify-between items-center gap-5 mb-50">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/movies/dashboard" className="text-gray-500">
                    Dashboard
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="text-gray-500">
                profile
              </Link>
            </li>
            <li>
              <button className="text-gray-500 " onClick={logouthandler}>
                Logout
              </button>
            </li>
          </ul>
        )}

        {!userInfo && (
          <ul className="flex flex-row justify-around gap-5 ">
            <li>
              <Link to="/login">
                <AiOutlineLogin size={26} color="gray" />
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-500">
                <AiOutlineUserAdd size={26} color="gray"></AiOutlineUserAdd>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Nav;

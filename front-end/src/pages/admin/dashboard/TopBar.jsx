import React from "react";
import { Link } from "react-router-dom";
const TopBar = () => {
  return (
    <div className="w-screen fixed border-b-1 border-gray-500   p-5 bg-gray-950 ">
      <ul className="flex flex-row gap-10 items-center ">
        <li className="text-gray-500 hover:text-white hover:scale-102 transition delay-50 hover:translate-y-0.5">
          <Link to="/admin/movies/dashboard">Dashboard</Link>
        </li>
        <li className="text-gray-500 hover:text-white hover:scale-102 transition delay-50 hover:translate-y-0.5">
          <Link to="/admin/movies/create">Create movie</Link>
        </li>
        <li className="text-gray-500 hover:text-white hover:scale-102 transition delay-50 hover:translate-y-0.5">
          <Link to="/admin/movies/allgenre">Create genre</Link>
        </li>
        <li className="text-gray-500 hover:text-white hover:scale-102 transition delay-50 hover:translate-y-0.5">
          <Link to="/admin/movies-list">Update movie</Link>
        </li>
        <li className="text-gray-500 hover:text-white hover:scale-102 transition delay-50 hover:translate-y-0.5">
          <Link to="/admin/movies/comment">Reviews</Link>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;

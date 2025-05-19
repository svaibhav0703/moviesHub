import React, { useEffect } from "react";
import { useGetNewMoviesQuery } from "../../redux/api/movie.js";
import { Link } from "react-router-dom";
import SliderUtil from "./SliderUtil.jsx";

const Header = () => {
  const { data } = useGetNewMoviesQuery();
  /* useEffect(() => {
    console.log(data);
  }, [data]); */
  return (
    <div className=" flex flex-col p-5 gap-18 ">
      <div className="flex flex-row gap-10 hover:cursor-pointer border-b-1 border-gray-500">
        <nav className="text-gray-500  rounded-md p-3 hover:text-white   hover:translate-y-[-2px] transition delay-50  ">
          <Link to="/">Home</Link>
        </nav>
        <nav className="text-gray-500  rounded-md p-3 hover:text-white hover:cursor-pointer    hover:translate-y-[-2px] transition delay-50 ">
          <Link to="/movies">Browse movies</Link>
        </nav>
      </div>

      <div className="w-[95%] mr-auto ml-auto ">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;

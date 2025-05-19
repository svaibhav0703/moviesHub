import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: data?.length > 1,
    slidesToShow: 6,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
  };
  return (
    <Slider {...settings}>
      {data?.map((movie) => {
        return <MovieCard key={movie._id} movie={movie} />;
      })}
    </Slider>
  );
};

export default SliderUtil;

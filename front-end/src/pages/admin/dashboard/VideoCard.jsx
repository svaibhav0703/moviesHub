import React from "react";

const VideoCard = ({ image, title, comment, date }) => {
  return (
    <>
      <div className="flex text-gray-500 justify-between items-center w-135 hover:scale-105 transition delay-50 hover:text-white">
        <div className="flex gap-5">
          <div>
            <img src={image} alt={title} className="h-20 w-20" />
          </div>
          <div className="">
            <p>{title}</p>
            <p>{date}</p>
          </div>
        </div>

        <div>{comment}</div>
      </div>
    </>
  );
};

export default VideoCard;

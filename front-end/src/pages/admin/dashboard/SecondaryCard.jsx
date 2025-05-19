import React from "react";

const SecondaryCard = ({ pill, content, info }) => {
  return (
    <div className="h-40 w-40 border-1 text-gray-500 rounded-md border-gray-950 text-center bg-gradient-to-b from-gray-950 to-purple-950 hover:scale-110 hover:text-white transition delay-50">
      <div className="h-20">
        <h1 className="text-xl">{pill}</h1>
      </div>
      <div className="h-20 ">
        <p className="text-5xl ">{content}</p>
      </div>
    </div>
  );
};

export default SecondaryCard;

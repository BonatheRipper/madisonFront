import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingElementUser = () => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center  text-c-gold">
      <ClipLoader color="#D2B6A2" />
    </div>
  );
};

export default LoadingElementUser;

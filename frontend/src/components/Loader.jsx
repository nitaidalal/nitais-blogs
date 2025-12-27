import React from "react";

const Loader = ({text}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-transparent border-t-blue-500 border-b-orange-400"></div>
        <div className="absolute h-12 w-12 bg-white rounded-full shadow-lg"></div>
      </div>

      <p className="mt-6 sm:text-lg text-gray-700 font-semibold tracking-wide animate-pulse">
        Fetching {text} <span className="text-primary">please wait...</span>
      </p>
    </div>
  );
};

export default Loader;

import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-500 text-sm">
        Loading tasks...
      </p>
    </div>
  );
};

export default Loader;
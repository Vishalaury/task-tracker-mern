import React from "react";
import { FiCheckSquare } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-5 flex items-center">
        <div className="bg-indigo-600 text-white p-2.5 rounded-lg shadow-sm">
          <FiCheckSquare size={24} />
        </div>

        <div className="ml-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Tracker
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your work efficiently
          </p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
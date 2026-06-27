import React from "react";
import { FiClipboard } from "react-icons/fi";

const EmptyState = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">

      <div className="flex justify-center mb-4">
        <div className="bg-indigo-100 p-4 rounded-full">
          <FiClipboard
            size={40}
            className="text-indigo-600"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Tasks Found
      </h2>

      <p className="text-gray-500">
        Create your first task to get started.
      </p>

    </div>
  );
};

export default EmptyState;
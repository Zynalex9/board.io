import React from "react";

export const NewFileBtn = () => {
  return (
    <button className="w-full bg-blue-600 mt-10 px-4 py-2 rounded text-lg font-Inter cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
      New File <span className="text-sm text-gray-400">Alt N</span>
    </button>
  );
};

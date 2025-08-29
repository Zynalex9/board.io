import { FolderPlus } from "lucide-react";
import React from "react";
import { SingleFolder } from "./SingleFolder";

export const TeamFolder = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mt-8 mb-5 w-full px-2 py-2 hover:bg-[#2A2B2B] text-white rounded transition-all duration-100 ">
        <h2 className="font-thin text-xs">TEAM FOLDERS</h2>
        <FolderPlus size={16} className="font-thin cursor-pointer" />
      </div>
      <div className="px-4">
        <SingleFolder />
      </div>
    </div>
  );
};

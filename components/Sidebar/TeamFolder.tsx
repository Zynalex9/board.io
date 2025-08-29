import { FolderPlus } from "lucide-react";
import React from "react";
import { SingleFolder } from "./SingleFolder";

export const TeamFolder = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mt-10 mb-5 w-full">
        <h2 className="font-thin text-xs">TEAM FOLDERS</h2>
        <FolderPlus size={16} className="font-thin cursor-pointer" />
      </div>
      <div className="px-4">
        <SingleFolder />
      </div>
    </div>
  );
};

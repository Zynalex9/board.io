import { Folder } from "lucide-react";
import React from "react";

export const TeamFolder = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mt-10 mb-5 w-full">
        <h2 className="font-thin text-xs">TEAM FOLDERS</h2>
        <Folder size={16} className="font-thin"/>
      </div>
    </div>
  );
};

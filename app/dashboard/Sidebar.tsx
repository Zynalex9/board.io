import { AllFiles } from "@/components/Sidebar/AllFiles";
import { Name } from "@/components/Sidebar/Name";
import { TeamFolder } from "@/components/Sidebar/TeamFolder";
import React from "react";

export const Sidebar = () => {
  return (
    <div className="w-[22%] h-screen bg-[#171717] text-white border-r-gray-700 border-r-1 py-4 px-6">
      <div className="mt-10 mx-10">
        <Name />
      </div>
      <AllFiles />
      <TeamFolder />
    </div>
  );
};

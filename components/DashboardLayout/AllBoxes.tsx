import React from "react";
import { SiPolestar } from "react-icons/si";
import { IoNewspaperOutline,IoAddOutline  } from "react-icons/io5";

export const AllBoxes = () => {
  return (
    <div className="my-5 grid grid-cols-3 gap-4 px-16">
      <div className="flex flex-col items-center mt-10 justify-center silver-border bg-primary-bg  h-40 cursor-pointer hover:bg-[#2A2B2B] hover:text-white transition-all duration-100 text-gray-50/80 space-y-4">
        <IoAddOutline size={52} />
        <p className="font-Inter text-xl font-thin">Create a blank file</p>
      </div>
      <div className="flex flex-col items-center mt-10 justify-center silver-border bg-primary-bg  h-40 cursor-pointer hover:bg-[#2A2B2B] hover:text-white transition-all duration-100 text-gray-50/80 space-y-4">
        <SiPolestar size={52} />
        <p className="font-Inter text-xl">Generate an AI Diagram</p>
      </div>
      <div className="flex flex-col items-center mt-10 justify-center silver-border bg-primary-bg  h-40 cursor-pointer hover:bg-[#2A2B2B] hover:text-white transition-all duration-100 text-gray-50/80 space-y-4">
      <IoNewspaperOutline size={52} />
        <p className="font-Inter text-xl">Generate an AI Outline</p>
      </div>

    </div>
  );
};

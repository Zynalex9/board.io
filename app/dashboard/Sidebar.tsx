import { Name } from "@/components/Sidebar/Name";
import React from "react";

export const Sidebar = () => {
  return (
    <div className="w-[22%] h-screen bg-black text-white border-r-gray-700 border-r-1 p-4">
        <Name/>
    </div>
  );
};

"use client";
import React from "react";
import { AiOutlineAlignRight } from "react-icons/ai";

export const Doc = () => {
  return (
    <div className="pt-20 border-r border-r-gray-400 w-[30rem] max-h-[100vh] overflow-auto minimal-scrollbar">
      <div className="w-full flex items-center gap-2 px-4 py-2">
        <AiOutlineAlignRight color="#A5A5A5"/>
        <input className="text-3xl text-grayish placeholder:text-3xl placeholder:text-grayish focus:outline-0 focus:border-0" placeholder="Untitled File"/>
      </div>
    </div>
  );
};

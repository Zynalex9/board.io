import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const EditorHeader = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <header className="flex w-full items-center justify-between bg-[#1E1E1E] text-white px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rotate-45"></div>
          <div className="w-3 h-3 bg-cyan-500 -ml-1 rotate-45"></div>
        </div>
        <span className="text-sm font-medium">Untitled File</span>
        <FaChevronDown className="ml-1 text-xs opacity-70" />
      </div>

      <div className="flex items-center gap-5 bg-[#2A2A2A] rounded-md overflow-hidden text-sm">
        {["Document", "Both", "Canvas"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 ${
              activeTab === tab ? "bg-[#3A3A3A] font-semibold" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button className="bg-[#2A2A2A] text-xs px-2 py-1 rounded-md">
          Ctrl K
        </button>
        <button className="bg-[#0078FF] hover:bg-[#006be0] text-sm font-medium px-3 py-1 rounded-md">
          Share
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-[#2A2A2A] rounded-md">
          💬
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-[#2A2A2A] rounded-md">
          📑
        </button>
      </div>
    </header>
  );
};

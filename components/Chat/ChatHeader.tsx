"use client";
import { X } from "lucide-react";
import React from "react";
import { IoEllipse } from "react-icons/io5";

export const ChatHeader = ({
  openChat,
  setOpenChat,
}: {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-500">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium text-white">Chat</h2>
        <IoEllipse className="text-green-500 w-2.5 h-2.5" />
      </div>

      <button
        onClick={() => setOpenChat(false)}
        className="p-1 rounded-md hover:bg-[#2A2A2A] transition"
      >
        <X className="w-4 h-4 text-gray-400 hover:text-white" />
      </button>
    </div>
  );
};

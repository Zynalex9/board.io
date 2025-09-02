import React from "react";
import { BsSendPlus } from "react-icons/bs";

export const InviteBar = () => {
  return (
    <div className="flex items-center gap-2">
      <input
        className="silver-border px-2 py-1.5 focus:outline-none active:outline-none"
        placeholder="Search"
      />
      <button className="bg-blue-600 mx-2 rounded-md flex items-center gap-2 cursor-pointer px-2 py-1.5">
        <BsSendPlus />
        Invite
      </button>
    </div>
  );
};

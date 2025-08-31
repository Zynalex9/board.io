'use client'
import { IUser } from "@/store/userSlice";
import React from "react";
interface User extends IUser{
  role?: string
}
export const Profile = ({user}:{user:User | null}) => {
  return (
    <div className="flex items-center gap-3  rounded-xl ">
      <img
        src={user?.avatar_url || "/Profile_avatar_placeholder_large.png"}
        alt="profile picture"
        className="w-10 h-10 rounded-full object-cover border border-gray-700"
      />
      <div className="flex flex-col">
        <h2 className="text-sm font-bold text-white font-Inter">
          {user?.username || "Guest User"}
        </h2>
        <h2 className="text-xs text-gray-400 font-Inter">
          {user?.email || "guest@example.com"}
        </h2>
      </div>
    </div>
  );
};

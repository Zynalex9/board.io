"use client";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export const ImageRight = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="w-[30%] flex flex-col items-center gap-3">
      <img
        src={user?.avatar_url || "/Profile_avatar_placeholder_large.png"}
        alt={user?.username || "Guest User"}
        className="size-56 object-center object-cover rounded-full"
      />
      <Input
        type="file"
        accept="image/*"
        className="w-40 text-sm cursor-pointer"
      />
    </div>
  );
};

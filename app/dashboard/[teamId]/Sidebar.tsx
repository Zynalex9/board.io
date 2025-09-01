"use client";
import { AllFiles } from "@/components/Sidebar/AllFiles";
import { Name } from "@/components/Sidebar/Name";
import { NewFileBtn } from "@/components/Sidebar/NewFileBtn";
import { TeamFolder } from "@/components/Sidebar/TeamFolder";
import { useTeams } from "@/hooks/useTeams";
import { useUser } from "@/hooks/useUser";
import React from "react";

export const Sidebar = () => {
  const { data: user } = useUser();
  const { data: teams } = useTeams(user);
  return (
    <div className="fixed top-0 left-0 w-[22%] h-screen bg-[#171717] text-white border-r-gray-700 border-r-1 py-4 px-6">
      <div className="mt-10 mx-4">
        <Name />
      </div>
      <AllFiles teams={teams} user={user} />
      <TeamFolder teams={teams} user={user} />
      <NewFileBtn />
    </div>
  );
};

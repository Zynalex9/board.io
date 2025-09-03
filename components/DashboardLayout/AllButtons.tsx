"use client";
import React from "react";
import { SiPolestar } from "react-icons/si";
import { IoNewspaperOutline, IoAddOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { useCreateWhiteboard } from "@/hooks/useCreateWhiteboard";
import { useUser } from "@/hooks/useUser";
import { useTeams } from "@/hooks/useTeams";
import { useTeamId } from "@/hooks/useTeamId";
export const AllButtons = () => {
  const { folderId } = useParams();
  const { data: user } = useUser();
  const { data: team } = useTeams(user);
  const { teamId: teamId2 } = useTeamId({ teams: team });
  const { mutate: CreateFile } = useCreateWhiteboard();
  const handleFileCreate = (name: string) => {
    CreateFile({
      team_id: teamId2!,
      name,
      folder_id: folderId ? (folderId as string) : null,
      created_by: user.id,
    });
  };
  return (
    <div className="my-5 grid grid-cols-3 gap-4 px-16">
      <button
        onClick={() => handleFileCreate("New Blank file")}
        className="flex flex-col items-center mt-10 justify-center silver-border bg-primary-bg  h-40 cursor-pointer hover:bg-[#2A2B2B] hover:text-white transition-all duration-100 text-gray-50/80 space-y-4"
      >
        <IoAddOutline size={52} />
        <p className="font-Inter text-xl font-thin">Create a blank file</p>
      </button>
      <button
        onClick={() => handleFileCreate("An AI Diagram")}
        className="flex flex-col items-center mt-10 justify-center silver-border bg-primary-bg  h-40 cursor-pointer hover:bg-[#2A2B2B] hover:text-white transition-all duration-100 text-gray-50/80 space-y-4"
      >
        <SiPolestar size={52} />
        <p className="font-Inter text-xl">Generate an AI Diagram</p>
      </button>
      <button
        onClick={() => handleFileCreate("An AI outline")}
        className="flex flex-col items-center mt-10 justify-center silver-border bg-primary-bg  h-40 cursor-pointer hover:bg-[#0d0f0f] hover:text-white transition-all duration-100 text-gray-50/80 space-y-4"
      >
        <IoNewspaperOutline size={52} />
        <p className="font-Inter text-xl">Generate an AI Outline</p>
      </button>
    </div>
  );
};

"use client";
import { useCreateWhiteboard } from "@/hooks/useCreateWhiteboard";
import { SidebarCompProps } from "@/types/allTypes";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const AllFiles = ({ teams, user }: SidebarCompProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { teamId } = useParams();
  const team = teams?.find((team) => team.teams.id === teamId);
  const { mutate: createFile, isPending } = useCreateWhiteboard();
  const handleFileCreate = async () => {
    if (!user) {
      toast.error("Something went wrong");
      return;
    }
    createFile({
      team_id: team?.teams.id!,
      name: "New Whiteboard",
      folder_id: null,
      created_by: user.id,
    });
    toast.success("File created successfully");
  };
  return (
    <Link href={`/dashboard/${team?.teams.id}`} className={`no-underline `}>
      <div
        className={`flex items-center justify-between mt-6 mb-2 w-full px-4 py-1.5 ${
          isActive(`/dashboard/${team?.teams.id}`)
            ? "text-white font-bold bg-[#2A2B2B] border-gray-500 border-[0.5px] rounded-lg"
            : "text-gray-300 font-normal hover:text-white"
        } px-2 py-2 hover:bg-[#2A2B2B] text-white rounded transition-all duration-100`}
      >
        <div className="flex items-center gap-2 ">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M1.7.5A1.2 1.2 0 00.5 1.7v2.6a1.2 1.2 0 001.2 1.2h2.6a1.2 1.2 0 001.2-1.2V1.7A1.2 1.2 0 004.3.5H1.7zM7.7.5a1.2 1.2 0 00-1.2 1.2v2.6a1.2 1.2 0 001.2 1.2h2.6a1.2 1.2 0 001.2-1.2V1.7A1.2 1.2 0 0010.3.5H7.7zM1.7 6.5A1.2 1.2 0 00.5 7.7v2.6a1.2 1.2 0 001.2 1.2h2.6a1.2 1.2 0 001.2-1.2V7.7a1.2 1.2 0 00-1.2-1.2H1.7zM7.7 6.5a1.2 1.2 0 00-1.2 1.2v2.6a1.2 1.2 0 001.2 1.2h2.6a1.2 1.2 0 001.2-1.2V7.7a1.2 1.2 0 00-1.2-1.2H7.7z"
              fill="currentColor"
            ></path>
          </svg>
          <h1>All Files</h1>
        </div>
        <FilePlus2 size={16} onClick={handleFileCreate} />
      </div>
    </Link>
  );
};

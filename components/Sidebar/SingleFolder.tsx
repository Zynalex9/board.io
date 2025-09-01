"use client";
import { useFolder } from "@/hooks/useFolder";
import { isActiveLink } from "@/lib/helper";
import { SidebarCompProps } from "@/types/allTypes";
import { Folder, FolderPlus } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const SingleFolder = ({ teams, user }: SidebarCompProps) => {
  const pathname = usePathname();
  const { teamId } = useParams();
  const team = teams?.find((team) => team.teams.id === teamId);
  const { data: folders } = useFolder(team?.teams.id!);
  return (
    <div className="text-sm leading-tight font-Inter space-y-2 h-64 overflow-y-auto px-1">
      {folders?.map((folder, idx) => (
        <div
          className={`flex items-center justify-between w-full ${
            isActiveLink(
              `/dashboard/${team?.teams.id}/folders/${folder.id}`,
              pathname
            )
              ? "px-4 py-1.5 bg-[#2A2B2B] text-white border-gray-500 border-[0.5px] rounded-lg"
              : "px-4 py-1.5 text-gray-300 font-normal hover:text-white"
          } hover:bg-[#2A2B2B] text-white rounded transition-all duration-100 `}
          key={idx}
        >
          <Link
            href={`/dashboard/${team?.teams.id}/folders/${folder.id}`}
            className={`block`}
          >
            <Folder size={16} className="font-thin cursor-pointer inline-block mx-2" />
            {folder.name}
          </Link>
          {isActiveLink(
            `/dashboard/${team?.teams.id}/folders/${folder.id}`,
            pathname
          ) && <FolderPlus size={16} className="font-thin cursor-pointer" />}
        </div>
      ))}
    </div>
  );
};

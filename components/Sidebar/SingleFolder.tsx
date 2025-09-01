"use client";
import { isActiveLink } from "@/lib/helper";
import { SidebarCompProps } from "@/types/allTypes";
import { FolderPlus } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const SingleFolder = ({ teams, user }: SidebarCompProps) => {
  const pathname = usePathname();
  const { teamId } = useParams();
  const team = teams?.find((team) => team.teams.id === teamId);
  return (
    <div className="text-sm leading-tight font-Inter space-y-2 h-64 overflow-y-auto">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          className={`flex items-center justify-between w-full ${
            isActiveLink(
              `/dashboard/${team?.teams.id}/folders/untitled${idx + 1}`,
              pathname
            )
              ? "px-4 py-1.5 bg-[#2A2B2B] text-white border-gray-500 border-[0.5px] rounded-lg"
              : "px-4 py-1.5 text-gray-300 font-normal hover:text-white"
          } hover:bg-[#2A2B2B] text-white rounded transition-all duration-100 `}
          key={idx}
        >
          <Link
            href={`/dashboard/${team?.teams.id}/folders/untitled${idx + 1}`}
            className={`block`}
          >
            Untitled Folder {idx + 1}
          </Link>
          {isActiveLink(
            `/dashboard/${team?.teams.id}/folders/untitled${idx + 1}`,
            pathname
          ) && <FolderPlus size={16} className="font-thin cursor-pointer" />}
        </div>
      ))}
    </div>
  );
};

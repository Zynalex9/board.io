'use client'
import { isActiveLink } from "@/lib/helper";
import { FolderPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SingleFolder = () => {
  const pathname = usePathname();
  return (
    <div className="text-sm leading-tight font-Inter space-y-2 h-64 overflow-y-auto">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          className={`flex items-center justify-between w-full ${
            isActiveLink(`/dashboard/folder/untitled${idx + 1}`, pathname)
              ? "px-4 py-1.5 bg-[#2A2B2B] text-white border-gray-500 border-[0.5px] rounded-lg"
              : "px-4 py-1.5 text-gray-300 font-normal hover:text-white"
          } hover:bg-[#2A2B2B] text-white rounded transition-all duration-100 `}
          key={idx}
        >
          <Link
            href={`/dashboard/folders/untitled${idx + 1}`}
            className={`block`}
          >
            Untitled Folder {idx + 1}
          </Link>
          {isActiveLink(`/dashboard/folder/untitled${idx + 1}`, pathname) && (
            <FolderPlus size={16} className="font-thin cursor-pointer" />
          )}
        </div>
      ))}
    </div>
  );
};

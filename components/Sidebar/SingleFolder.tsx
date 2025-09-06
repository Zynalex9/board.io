"use client";
import { useTeamWhiteboards } from "@/hooks/getWhiteboard";
import { useCreateWhiteboard } from "@/hooks/useCreateWhiteboard";
import { useFolder } from "@/hooks/useFolder";
import { isActiveLink } from "@/lib/helper";
import { SidebarCompProps } from "@/types/allTypes";
import { Folder, FilePlus2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SingleFolder = ({ teams, user }: SidebarCompProps) => {
  const pathname = usePathname();
  const { teamId, folderId } = useParams();
  const [showboard, setShowboard] = useState<string>("");
  const team = teams?.find((team) => team.teams.id === teamId);
  const { data: folders } = useFolder(team?.teams.id!);
  const { mutate: createFile, isPending } = useCreateWhiteboard();
  const handleFileCreate = async () => {
    if (!user) {
      toast.error("Something went wrong");
      return;
    }
    createFile({
      team_id: team?.teams.id!,
      name: "New Whiteboard",
      folder_id: folderId as string,
      created_by: user.id,
    });
    toast.success("File created successfully");
  };
  const { data: whiteboards } = useTeamWhiteboards(team?.teams.id!);

  return (
    <div className="text-sm leading-tight font-Inter space-y-2 h-64 overflow-y-auto minimal-scrollbar px-1">
      {folders?.map((folder, idx) => (
        <div>
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
            <div className="flex gap-1 items-center">
              {showboard === folder.id ? (
                <ChevronUp size={13} onClick={() => setShowboard("")} />
              ) : (
                <ChevronDown
                  size={13}
                  onClick={() => setShowboard(folder.id)}
                />
              )}
              <Link
                href={`/dashboard/${team?.teams.id}/folders/${folder.id}`}
                className={`block`}
                onClick={() => setShowboard(folder.id)}
              >
                <Folder
                  size={16}
                  className="font-thin cursor-pointer inline-block mx-2"
                />
                {folder.name}
              </Link>
            </div>

            {isActiveLink(
              `/dashboard/${team?.teams.id}/folders/${folder.id}`,
              pathname
            ) && (
              <FilePlus2
                size={16}
                className="font-thin cursor-pointer"
                onClick={handleFileCreate}
              />
            )}
          </div>
          {showboard === folder.id && (
            <div className="pl-8 mt-1 space-y-1 border-l border-gray-700/50">
              {whiteboards &&
                whiteboards
                  .filter((file) => file.folder_id === folder.id)
                  .map((file) => (
                    <Link
                      key={file.id}
                      href={`/dashboard/board/${file.id}`}
                      className="group flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer
                       text-gray-400 hover:text-white hover:bg-[#2A2B2B] transition-all duration-150"
                    >
                      <span className="truncate text-sm">{file.name}</span>
                    </Link>
                  ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

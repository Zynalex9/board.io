"use client";

import { useFolder } from "@/hooks/useFolder";
import { useTeamId } from "@/hooks/useTeamId";
import { useTeams } from "@/hooks/useTeams";
import { useUser } from "@/hooks/useUser";
import { Ellipsis, FilePlus2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsSendPlus } from "react-icons/bs";
import { InviteBar } from "./InviteBar";

export const FolderTopBar = () => {
  const { data: user } = useUser();
  const { data: teams } = useTeams(user);
  const { teamId } = useTeamId({ teams });
  const { data: folders } = useFolder(teamId!);
  const { folderId } = useParams();
  const folder = folders?.find((folder) => folder.id === folderId);
  const [isEditing, setIsEditing] = useState(false);
  
  return (
      <div onDoubleClick={() => setIsEditing(!isEditing)}>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter a folder name"
              className="silver-border px-2 py-1.5"
              defaultValue={folder?.name}
              onBlur={() => setIsEditing(false)}
            />
            <Ellipsis className="w-5 h-5" />
            <FilePlus2 className="w-5 h-5" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              {folder?.name}
            </h2>
            <Ellipsis className="w-5 h-5" />
            <FilePlus2 className="w-5 h-5" />
          </div>
        )}
      </div>
  );
};

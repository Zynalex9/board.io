"use client";

import { useFolder, useUpdateFolderName } from "@/hooks/useFolder";
import { useTeamId } from "@/hooks/useTeamId";
import { useTeams } from "@/hooks/useTeams";
import { useUser } from "@/hooks/useUser";
import { Check, X, Ellipsis, FilePlus2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const FolderTopBar = () => {
  const [folderName, setFolderName] = useState("");
  const { data: user } = useUser();
  const { data: teams } = useTeams(user);
  const { teamId } = useTeamId({ teams });
  const { data: folders } = useFolder(teamId!);
  const { folderId } = useParams();
  const folder = folders?.find((folder) => folder.id === folderId);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: UpdateName } = useUpdateFolderName();
  console.log(folderName);
  const handleChangeName = async () => {
    if (!folderName) {
      toast.error("Enter a new name");
      return;
    }
    if (!user || !teamId) {
      toast.error("Something went wrong");
      return;
    }

    UpdateName({
      folderId: folderId as string,
      newName: folderName,
    });

    setIsEditing(false);
  };
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-[#1f1f1f] rounded-lg">
      {isEditing ? (
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Enter folder name"
            className="flex-1 bg-transparent border border-neutral-600 focus:border-blue-500 text-white rounded-md px-3 py-2 outline-none"
            defaultValue={folder?.name}
            onChange={(e) => setFolderName(e.target.value)}
            autoFocus
          />

          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-1 bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-2 rounded-md transition"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>

          <button
            onClick={handleChangeName}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md transition"
          >
            <Check className="w-4 h-4" />
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <h2
            className="text-lg font-semibold text-white cursor-pointer hover:text-blue-400 transition"
            onDoubleClick={() => setIsEditing(true)}
          >
            {folder?.name}
          </h2>
          <Ellipsis className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white" />
          <FilePlus2 className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white" />
        </div>
      )}
    </div>
  );
};

"use client";
import { useCreateFolder } from "@/hooks/useCreateFolder";
import { useTeamId } from "@/hooks/useTeamId";
import { SidebarCompProps } from "@/types/allTypes";
import { FolderPlus } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export const CreateFolder = ({ teams, user }: SidebarCompProps) => {
  const { mutate: createFolder, isPending } = useCreateFolder();
  const { teamId } = useTeamId({ teams });
  const handleCreate = async () => {
    if (!user || !teamId) {
      toast.error("Something went wrong");
      return;
    }
    createFolder({
      teamId,
      name: "New Folder",
      created_by: user.id,
    });
    toast.success("Folder created successfully");
  };
  return (
    <div className="flex items-center justify-between gap-2 mt-8 mb-5 w-full px-2 py-2 hover:bg-[#2A2B2B] text-white rounded transition-all duration-100 ">
      <h2 className="font-thin text-xs">TEAM FOLDERS</h2>
      <FolderPlus
        size={16}
        className="font-thin cursor-pointer"
        onClick={handleCreate}
      />
    </div>
  );
};

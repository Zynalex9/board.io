import { FolderPlus } from "lucide-react";
import React from "react";
import { SingleFolder } from "./SingleFolder";
import { SidebarCompProps } from "@/types/allTypes";
import { CreateFolder } from "./CreateFolder";

export const TeamFolder = ({ teams, user }: SidebarCompProps) => {
  return (
    <div>
      <CreateFolder teams={teams} user={user}/>
      <div className="px-4">
        <SingleFolder teams={teams} user={user} />
      </div>
    </div>
  );
};

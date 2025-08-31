import React from "react";
import { TeamMembers } from "./Team/TeamMembers";
import { TeamSettings } from "./Settings/TeamSettings";
import { ProfileTab } from "./Profile/ProfileTab";

export const ActivePanel = ({ activePanel }: { activePanel: string }) => {
  return (
    <div className="px-4">
      {activePanel === "teamMember" && <TeamMembers />}
      {activePanel === "billing" && <h1>Billings</h1>}
      {activePanel === "git" && <h1>Github</h1>}
      {activePanel === "settings" && <TeamSettings />}
      {activePanel === "profile" && <ProfileTab />}
      {activePanel === "appearance" && <h1>appearance</h1>}
    </div>
  );
};

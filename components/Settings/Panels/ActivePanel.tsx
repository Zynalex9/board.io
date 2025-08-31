import React from "react";
import { TeamMembers } from "./Team/TeamMembers";

export const ActivePanel = ({ activePanel }: { activePanel: string }) => {
  return (
    <div className="px-4">
      {activePanel === "teamMember" && <TeamMembers/>}
      {activePanel === "billing" && <h1>Billings</h1>}
      {activePanel === "git" && <h1>Github</h1>}
      {activePanel === "settings" && <h1>settings</h1>}
      {activePanel === "profile" && <h1>profile</h1>}
      {activePanel === "appearance" && <h1>appearance</h1>}
    </div>
  );
};

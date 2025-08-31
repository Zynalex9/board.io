import React from "react";
import { InviteInput } from "./InviteInput";
import { Profile } from "@/components/Sidebar/Profile";
import { SelectBox } from "./SelectBox";
import { InviteBox } from "./InviteBox";

export const TeamMembers = () => {
  const data = [
    {
      id: "1",
      username: "Zain",
      email: "zain123@gmail.com",
      avatar_url: "",
      role: "Admin",
    },
    {
      id: "2",
      username: "Ayesha",
      email: "ayesha.khan@gmail.com",
      avatar_url: "",
      role: "pending",
    },
    {
      id: "3",
      username: "Bilal",
      email: "bilal92@hotmail.com",
      avatar_url: "",
      role: "Viewer",
    },
    {
      id: "4",
      username: "Fatima",
      email: "fatima.shah@gmail.com",
      avatar_url: "",
      role: "Admin",
    },
    {
      id: "5",
      username: "Usman",
      email: "usman.dev@yahoo.com",
      avatar_url: "",
      role: "Editor",
    },
    {
      id: "6",
      username: "Hira",
      email: "hira.ali@gmail.com",
      avatar_url: "",
      role: "Viewer",
    },
    {
      id: "7",
      username: "Omar",
      email: "omar.tech@gmail.com",
      avatar_url: "",
      role: "Editor",
    },
    {
      id: "8",
      username: "Sana",
      email: "sana.farooq@gmail.com",
      avatar_url: "",
      role: "Viewer",
    },
    {
      id: "9",
      username: "Hamza",
      email: "hamza.dev@gmail.com",
      avatar_url: "",
      role: "Admin",
    },
    {
      id: "10",
      username: "Maryam",
      email: "maryam.design@gmail.com",
      avatar_url: "",
      role: "Editor",
    },
  ];

  return (
    <div>
      <p>
        Board.io is made for team collaboration. All team members see the same
        folders and files on their dashboard. Guests only have access to
        specific files.
      </p>
      <div className="flex gap-2 justify-between">
        <div className="my-3 w-[45%]">
          <InviteInput />
          <div className="h-72 overflow-y-auto space-y-4 mt-4 px-2">
            {data.map((user) => (
              <div className="flex items-center justify-between">
                <Profile user={user} />
                {user.role === "pending" ? (
                  <SelectBox />
                ) : (
                  <p className="text-sm text-dim-gray font-Inter">
                    {user.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary-bg rounded-xl p-4 mt-14 w-1/2 h-36 flex">
          <InviteBox />
        </div>
      </div>
    </div>
  );
};

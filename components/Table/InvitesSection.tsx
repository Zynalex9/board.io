"use client";
import React, { useState } from "react";
import { DynamicInput } from "../Reuseable/DynamicInput";
import { toast } from "sonner";
import { Profile } from "../Sidebar/Profile";
import { SelectBox } from "../Settings/Panels/Team/SelectBox";

export const InvitesSection = () => {
  const [email, setEmail] = useState("");
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
      <DynamicInput
        label="Invite"
        labelFor="invite"
        type="email"
        value={email}
        setValue={setEmail}
        onChangeFn={() => {
          toast.success("Invited Successfully");
          console.log(email);
          setEmail("");
        }}
      />
      <div className="h-36 overflow-y-auto space-y-4 mt-4 px-2 minimal-scrollbar">
        {data.map((user) => (
          <div className="flex items-center justify-between">
            <Profile user={user} />
            {user.role === "pending" ? (
              <SelectBox />
            ) : (
              <p className="text-sm text-dim-gray font-Inter">{user.role}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

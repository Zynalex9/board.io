"use client";
import React, { useState } from "react";
import { DynamicInput } from "../Reuseable/DynamicInput";
import { toast } from "sonner";
import { Profile } from "../Sidebar/Profile";
import { SelectBox } from "../Settings/Panels/Team/SelectBox";
import { IAllTableData } from "@/types/allTypes";

export const InvitesSection = ({ file }: { file: IAllTableData   }) => {
  const [email, setEmail] = useState("");
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
      <div className="max-h-36 overflow-y-auto space-y-4 mt-4 px-2 minimal-scrollbar">
        {file.board_members.map((user) => (
          <div className="flex items-center justify-between">
            <Profile user={user.users} />
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

"use client";
import React, { useEffect } from "react";
import { InviteInput } from "./InviteInput";
import { Profile } from "@/components/Sidebar/Profile";
import { SelectBox } from "./SelectBox";
import { InviteBox } from "./InviteBox";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { IUser } from "@/store/userSlice";
interface ITeamMember {
  created_at: string;
  joined_at: string;
  role: string;
  team_id: string;
  user_id: string;
  user: IUser;
}
export const TeamMembers = () => {
  const [members, setMembers] = React.useState<ITeamMember[]>([]);
  const { teamId } = useParams();
  const getMembers = async () => {
    const { data } = await supabase
      .from("team_members")
      .select("*, user:user_id(*)")
      .eq("team_id", teamId);
    setMembers(data as ITeamMember[]);
  };
  useEffect(() => {
    getMembers();
  }, []);

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
            {members &&
              members.length > 0 &&
              members.map((user) => (
                <div className="flex items-center justify-between">
                  <Profile user={user.user} />
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

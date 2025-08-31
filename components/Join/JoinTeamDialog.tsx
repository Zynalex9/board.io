"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Users } from "lucide-react";
import { DynamicInput } from "../Reuseable/DynamicInput";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const JoinTeamDialog = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [teamName, setTeamName] = useState(`${user?.username}'s Team` || "");

  const handleCreateTeam = async () => {
    if (!user) {
      toast.error("Couldn't fetch user info");
      return;
    }

    try {
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert([{ name: teamName, created_by: user.id }]) 
        .select()
        .single();

      if (teamError) throw teamError;
      if (!teamData) return;

      const { error: memberError } = await supabase
        .from("team_members")
        .insert([{ team_id: teamData.id, user_id: user.id, role: "owner" }]);

      if (memberError) throw memberError;

      toast.success(`Team "${teamName}" created successfully 🎉`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 text-xs text-gray-50 font-Inter cursor-pointer w-full">
          <Users size={16} />
          Join or Create Team
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="px-2 py-4 m-0 border-0 shadow-2xl bg-[#171717]">
        <div className="px-8 py-4">
          <h1 className="font-Inter text-xl font-semibold text-white">
            Create Team
          </h1>
          <h3 className="font-Inter text-md my-6 text-white">
            Fill the details to create a new team.
          </h3>
          <DynamicInput
            label="Team Name"
            labelFor="teamName"
            onChangeFn={handleCreateTeam}
            setValue={setTeamName}
            value={teamName}
            type="text"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-bg silver-border cursor-pointer"
            onClick={handleCreateTeam}
          >
            Create team
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

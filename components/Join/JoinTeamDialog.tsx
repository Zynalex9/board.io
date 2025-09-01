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
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const JoinTeamDialog = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [teamName, setTeamName] = useState(`${user?.username}'s Team` || "");

  const queryClient = useQueryClient();
  const createTeam = async ({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }) => {
    const { data: teamData, error: teamError } = await supabase
      .from("teams")
      .insert([{ name, created_by: userId }])
      .select()
      .single();

    if (teamError) throw new Error(teamError.message);

    const { error: memberError } = await supabase
      .from("team_members")
      .insert([{ team_id: teamData.id, user_id: userId, role: "owner" }]);

    if (memberError) throw new Error(memberError.message);

    return teamData;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, userId }: { name: string; userId: string }) =>
      createTeam({ name, userId }),
    onSuccess: () => {
      toast.success("Team created successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["teams"] }); 
    },
    onError: (error: any) => toast.error(error.message),
  });

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
            setValue={setTeamName} 
            value={teamName}
            type="text"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-primary-bg silver-border cursor-pointer"
            onClick={() => {
              if (!user) {
                toast.error("Couldn't fetch user info");
                return;
              }
              mutate({ name: teamName, userId: user.id }); 
            }}
          >
            {isPending ? "Creating..." : "Create team"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

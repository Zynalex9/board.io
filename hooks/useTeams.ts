import { supabase } from "@/lib/supabase";
import { fetchTeams, fetchTeamWithMembers } from "@/Queries/teams";
import { IUser } from "@/store/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useTeams = (user: IUser | null) => {
  return useQuery({
    queryKey: ["teams", user?.id],
    queryFn: () => fetchTeams(user!.id),
    enabled: !!user,
  });
};
export const useTeamWithMembers = (teamId: string) => {
  return useQuery({
    queryKey: ["teams", teamId],
    queryFn: () => fetchTeamWithMembers(teamId),
  });
};
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamId: string) => {
      const { data, error } = await supabase.rpc("delete_team", {
        target_team: teamId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["whiteboards"] });

    },
  });
};


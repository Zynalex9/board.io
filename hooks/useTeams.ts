import { fetchTeams, fetchTeamWithMembers } from "@/Queries/teams";
import { IUser } from "@/store/userSlice";
import { useQuery } from "@tanstack/react-query";

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
  })
};
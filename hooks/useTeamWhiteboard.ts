import { getTeamWhiteboards } from "@/Queries/whiteboard";
import { useQuery } from "@tanstack/react-query";

export const useTeamWhiteboard = (teamId: string) => {
  return useQuery({
    queryKey: ["whiteboards", teamId],
    queryFn: () => getTeamWhiteboards(teamId),
    enabled: !!teamId,
  });
};

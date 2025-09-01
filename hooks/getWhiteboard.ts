import { getTeamWhiteboards } from "@/Queries/whiteboard";
import { useQuery } from "@tanstack/react-query";

export async function useTeamWhiteboards(teamId: string) {
  return useQuery({
    queryKey: ["whiteboards"],
    queryFn: () => getTeamWhiteboards(teamId),
    enabled: !!teamId,
  });
}

export interface Whiteboard {
  created_at: string;
  created_by: string;
  folder_id: string | null;
  id: string;
  name: string;
  team_id: string;
  updated_at: string;
}
import { getTeamWhiteboards } from "@/Queries/whiteboard";
import { useQuery } from "@tanstack/react-query";

export function useTeamWhiteboards(teamId: string) {
  return useQuery<Whiteboard[]>({
    queryKey: ["whiteboards", teamId],
    queryFn: () => getTeamWhiteboards(teamId),
    enabled: !!teamId,
  });
}

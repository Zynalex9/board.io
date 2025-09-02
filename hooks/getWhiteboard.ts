export interface Whiteboard {
  created_at: string;
  created_by: string;
  folder_id: string | null;
  id: string;
  name: string;
  team_id: string;
  updated_at: string;
}
import {
  getAllTableWhiteboards,
  getFolderTableWhiteboards,
  getTeamWhiteboards,
} from "@/Queries/whiteboard";
import { useQuery } from "@tanstack/react-query";

export function useTeamWhiteboards(teamId: string) {
  return useQuery<Whiteboard[]>({
    queryKey: ["whiteboards", teamId],
    queryFn: () => getTeamWhiteboards(teamId),
    enabled: !!teamId,
  });
}
export function useAllTableWhiteboards(teamId: string) {
  return useQuery({
    queryKey: ["allTableWhiteboards", teamId],
    queryFn: () => getAllTableWhiteboards(teamId),
    enabled: !!teamId,
  });
}
export function useFolderTableWhiteboards(teamId: string,folderId:string) {
  return useQuery({
    queryKey: ["allFolderTableWhiteboards", teamId,folderId],
    queryFn: () => getFolderTableWhiteboards(teamId, folderId),
    enabled: !!teamId,
  });
}

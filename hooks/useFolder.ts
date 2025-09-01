import { fetchFolders } from "@/Queries/folder";
import { useQuery } from "@tanstack/react-query";

export const useFolder = (teamId: string) => {
  return useQuery({
    queryKey: ["folders", teamId],
    queryFn: () => fetchFolders(teamId),
    enabled: !!teamId,
  });
};

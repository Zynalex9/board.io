interface Idata {
  folderId: string;
  newName: string;
}
import { changeFolderName, fetchFolders } from "@/Queries/folder";
import { IFolder } from "@/types/allTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFolder = (teamId: string) => {
  return useQuery({
    queryKey: ["folders", teamId],
    queryFn: () => fetchFolders(teamId),
    enabled: !!teamId,
  });
};
export const useUpdateFolderName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Idata) => changeFolderName(data.folderId, data.newName),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["folders"] });
      const previousFolders = queryClient.getQueryData<IFolder[]>(["folders"]);
      queryClient.setQueryData<IFolder[]>(["folders"], (old = []) => {
        return old.map((folder) => {
          if (folder.id === data.folderId) {
            return { ...folder, name: data.newName };
          }
          return folder;
        });
      });

      return { previousFolders };
    },
    onError: (err: unknown, newFolder, context) => {
      if (context?.previousFolders) {
        queryClient.setQueryData(["folders"], context.previousFolders);
      }

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

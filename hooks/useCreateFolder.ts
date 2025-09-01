import { supabase } from "@/lib/supabase";
import { createFolder } from "@/Queries/folder";
import { IFolder } from "@/types/allTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface INewFolder {
  teamId: string;
  name: string;
  created_by: string;
  parentId?: string | null;
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newFolder: INewFolder) => createFolder(newFolder),

    onMutate: async (newFolder) => {
      await queryClient.cancelQueries({ queryKey: ["folders"] });

      const previousFolders = queryClient.getQueryData<INewFolder[]>([
        "folders",
      ]);

      queryClient.setQueryData<INewFolder[]>(["folders"], (old = []) => [
        ...old,
        { ...newFolder, id: "temp-id" },
      ]);

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

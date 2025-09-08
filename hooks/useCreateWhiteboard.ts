import { supabase } from "@/lib/supabase";
import { CreateFile, createWhiteboard } from "@/Queries/whiteboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateWhiteboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newWhiteboard: CreateFile) => createWhiteboard(newWhiteboard),

    onMutate: async (newWhiteboard) => {
      await queryClient.cancelQueries({ queryKey: ["whiteboards"] });

      const previousWhiteboards =
        queryClient.getQueryData<CreateFile[]>(["whiteboards"]) ?? [];

      queryClient.setQueryData<CreateFile[]>(["whiteboards"], (old = []) => [
        ...old,
        { ...newWhiteboard, id: "temp-id" },
      ]);

      return { previousWhiteboards };
    },

    onError: (err: unknown, _newWhiteboard, context) => {
      if (context?.previousWhiteboards) {
        queryClient.setQueryData(["whiteboards"], context.previousWhiteboards);
      }

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["whiteboards"] });
      queryClient.invalidateQueries({ queryKey: ["allTableWhiteboards"] });
      queryClient.invalidateQueries({
        queryKey: ["allFolderTableWhiteboards"],
      });
    },
  });
};
export const useDeleteWhiteboard = () => {
  const queryClient = useQueryClient();
return  useMutation({
    mutationFn: async (boardId: string) => {
      const { error } = await supabase.rpc("delete_whiteboard", {
        whiteboard_id: boardId,
      });
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.success("Deleted Successfully");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whiteboards"] });
      queryClient.invalidateQueries({ queryKey: ["allTableWhiteboards"] });
      queryClient.invalidateQueries({
        queryKey: ["allFolderTableWhiteboards"],
      });
    },
  });
};

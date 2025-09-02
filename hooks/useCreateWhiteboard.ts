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
    },
  });
};

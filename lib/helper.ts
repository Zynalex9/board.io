import { toast } from "sonner";
import { supabase } from "./supabase";

export const isActiveLink = (href: string, currentPath: string) => {
  return href === currentPath;
};
export const saveBoardElement = async (
  boardId: string,
  element: any,
  type: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("board_elements")
    .insert([
      {
        board_id: boardId,
        created_by: userId,
        type,
        properties: element,
      },
    ])
    .select()
    .single();
  if (error) {
    console.log("Error saving element:", error);
    toast.error(`Error saving element to database: ${error.message}`);
    return null;
  }
  return data;
};

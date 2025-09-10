import { Whiteboard } from "@/hooks/getWhiteboard";
import { supabase } from "@/lib/supabase";
import { SingleBoard } from "@/types/allTypes";
import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "sonner";
export const saveBoardElement = async (
  boardId: string,
  element: any,
  type: string,
  userId: string
): Promise<Whiteboard | PostgrestError> => {
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
    return error;
  }
  return data;
};
export const getSingleBoard = async (id: string): Promise<SingleBoard[] | PostgrestError> => {
  const { data, error } = await supabase
    .from("board_elements")
    .select("*, board:board_id(*)")
    .eq("board_id", id)
  if (error) {
    console.log("Error saving element:", error);
    toast.error(`Error fetching board from database: ${error.message}`);
    return error;
  }
  console.log(data)
  return data;
};

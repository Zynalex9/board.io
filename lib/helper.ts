import { supabase } from "./supabase";

export const isActiveLink = (href: string, currentPath: string) => {
  return href === currentPath;
};
export const saveBoardElement =async (
  boardId: string,
  element: any,
  type: string,
  userId: string
) => {
  const {} = await supabase.from("board_elements").insert([element]);
};

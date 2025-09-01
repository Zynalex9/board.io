import { supabase } from "@/lib/supabase";
export interface CreateFile {
  name: string;
  team_id: string;
  folder_id: string | null;
  created_by: string;
}
export const getTeamWhiteboards = async (teamId: string) => {
  const { data: whiteboards, error } = await supabase
    .from("whiteboards")
    .select("*")
    .eq("team_id", teamId);
  if (error) throw new Error(error.message);
  return whiteboards ?? [];
};
export const getFoldersWhiteboards = async (
  teamId: string,
  folderId: string
) => {
  const { data: whiteboards, error } = await supabase
    .from("whiteboards")
    .select("*")
    .eq("team_id", teamId)
    .eq("folder_id", folderId);
  if (error) throw new Error(error.message);
  return whiteboards ?? [];
};
export const createWhiteboard = async (data: CreateFile) => {
  const { data: whiteboard, error: whiteboardError } = await supabase
    .from("whiteboards")
    .insert([data])
    .select()
    .single();
  if (whiteboardError) throw whiteboardError;
  return whiteboard;
};

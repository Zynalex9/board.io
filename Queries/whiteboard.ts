import { Whiteboard } from "@/hooks/getWhiteboard";
import { supabase } from "@/lib/supabase";
import { IAllTableData } from "@/types/allTypes";
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
export const createWhiteboard = async (
  data: CreateFile
): Promise<Whiteboard[]> => {
  const { data: whiteboard, error: whiteboardError } = await supabase
    .from("whiteboards")
    .insert([data])
    .select()
    .single();
  if (whiteboardError) throw whiteboardError;
  const { error: memberError } = await supabase
    .from("board_members")
    .insert([
      { role: "owner", board_id: whiteboard.id, user_id: data.created_by },
    ]);
  if (memberError) throw memberError;
  return whiteboard;
};
export const getAllTableWhiteboards = async (
  teamId: string,
  userId: string
) :Promise<IAllTableData[] | null>=> {
  const { data, error } = await supabase
    .from("whiteboards")
    .select(
      "id,name,created_at,updated_at,team_id, board_members(role, joined_at, users(avatar_url))"
    )
    .eq("team_id", teamId)
    .eq("created_by", userId);
  if (error) {
    console.error("Error fetching boards:", error);
    return null;
  }
  return data;
};

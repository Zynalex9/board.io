import { supabase } from "@/lib/supabase";
import { IFolder } from "@/types/allTypes";
export const fetchFolders = async (teamId: string): Promise<IFolder[]> => {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}; 
export const createFolder = async ({
  teamId,
  name,
  created_by,
  parentId = null,
}: {
  teamId: string;
  name: string;
  created_by: string;
  parentId?: string | null;
}) => {
  try {
    const { data: folder, error: folderError } = await supabase
      .from("folders")
      .insert([{ team_id: teamId, name, created_by, parent_id: parentId }])
      .select()
      .single();

    if (folderError) throw folderError;
    return folder;
  } catch (error: any) {
    return error.message;
  }
};

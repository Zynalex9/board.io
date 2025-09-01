import { supabase } from "@/lib/supabase";
import { IMemberTeam } from "@/types/allTypes";

export const fetchTeams = async (userId: string): Promise<IMemberTeam[]> => {
  const { data, error } = await supabase
    .from("team_members")
    .select(
      `
      role,
      joined_at,
      teams:team_id (
        id, name, created_by, created_at
      )
    `
    )
    .eq("user_id", userId);

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
export const fetchUser = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  return profile;
};

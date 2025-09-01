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


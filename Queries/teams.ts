import { supabase } from "@/lib/supabase";
import { IUser } from "@/store/userSlice";
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

export const fetchUser = async (): Promise<IUser | null> => {
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
export const fetchTeamWithMembers = async (teamId: string) => {
  const { data, error } = await supabase
    .from("team_members")
    .select("*, user:user_id(*), team:team_id(*)")
    .eq("team_id", teamId);
  if (error) throw error;
  return data;
};

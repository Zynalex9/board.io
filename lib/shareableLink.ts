import { supabase } from "./supabase";

const generateToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const createShareableLink = async (
  targetId: string,
  targetType: "team" | "whiteboard",
  creatorId: string,
  options: { expiresInDays?: number; maxUses?: number } = {}
) => {
  const { expiresInDays = 30, maxUses = null } = options;

  const token = generateToken();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const { data, error } = await supabase
    .from("shareable_links")
    .insert([
      {
        token,
        target_id: targetId,
        target_type: targetType,
        created_by: creatorId,
        expires_at: expiresAt.toISOString(),
        max_uses: maxUses,
      },
    ])
    .select()
    .single();

  return { data, error };
};

export const refreshShareableLink = async (oldToken: string) => {
  const { data: oldLink, error } = await supabase
    .from("shareable_links")
    .select("*")
    .eq("token", oldToken)
    .single();

  if (error) return { error: "Link not found" };

  const newToken = generateToken();
  const { data: newLink, error: createError } = await supabase
    .from("shareable_links")
    .insert([
      {
        token: newToken,
        target_id: oldLink.target_id,
        target_type: oldLink.target_type,
        created_by: oldLink.created_by,
        expires_at: oldLink.expires_at,
        max_uses: oldLink.max_uses,
        use_count: 0,
      },
    ])
    .select()
    .single();

  if (createError) return { error: createError };

  await supabase
    .from("shareable_links")
    .update({ is_active: false })
    .eq("token", oldToken);

  return { data: newLink };
};

export const getShareableLinks = async (
  targetId: string,
  targetType: "team" | "whiteboard"
) => {
  const { data, error } = await supabase
    .from("shareable_links")
    .select("*")
    .eq("target_id", targetId)
    .eq("target_type", targetType)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return { data, error };
};

import { supabase } from "@/lib/supabase";

export async function EditFileName(file_id: string, name: string) {
  console.log(file_id, name);
  const { data, error } = await supabase
    .from("whiteboards")
    .update({ name })
    .eq("id", file_id)
    .select()
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

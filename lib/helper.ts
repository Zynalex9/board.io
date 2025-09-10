import { toast } from "sonner";
import { supabase } from "./supabase";

export const isActiveLink = (href: string, currentPath: string) => {
  return href === currentPath;
};


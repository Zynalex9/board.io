import type { NextConfig } from "next";
const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig: NextConfig = {
  images: {
    domains: [supabaseUrl.hostname], 
  },
};

export default nextConfig;

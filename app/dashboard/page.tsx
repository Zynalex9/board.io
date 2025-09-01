"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useTeams } from "@/hooks/useTeams";

export default function DashboardPage() {
  const router = useRouter();

  const { data: user, isLoading: userLoading } = useUser();
  const { data: teams, isLoading: teamsLoading } = useTeams(user);

  useEffect(() => {
    if (!teamsLoading && teams && teams.length > 0) {
      router.replace(`/dashboard/${teams[0].teams.id}`);
    }
  }, [teams, teamsLoading, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-8">Board.io</h1>

      {/* Loading bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 animate-[loading_2s_linear_infinite]" />
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        div > div {
          animation: loading 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

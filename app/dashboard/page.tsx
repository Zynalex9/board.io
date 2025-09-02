"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useTeams } from "@/hooks/useTeams";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  const { data: user, isLoading: userLoading } = useUser();
  const { data: teams, isLoading: teamsLoading } = useTeams(user);

  const [teamName, setTeamName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!teamsLoading && teams && teams.length > 0) {
      router.replace(`/dashboard/${teams[0].teams.id}`);
    }
  }, [teams, teamsLoading, router]);

  const handleCreateTeam = async () => {
    if (!user || !teamName) return;
    setCreating(true);

    const { data, error } = await supabase
      .from("teams")
      .insert([{ name: teamName, created_by: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Error creating team:", error);
      toast.error(error.message);
    }
    const { error: memberError } = await supabase
      .from("team_members")
      .insert([{ team_id: data.id, user_id: user.id, role: "owner" }]);
    if (memberError) {
      console.error("Error creating member:", memberError);
      toast.error(memberError.message);
    } else {
      router.replace(`/dashboard/${data.id}`);
    }
    setCreating(false);
  };

  if (teamsLoading || userLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold mb-8">Board.io</h1>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 animate-[loading_2s_linear_infinite]" />
        </div>
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Board.io</h1>
        <p className="mb-4 text-gray-400">
          You don’t have any teams yet. Create your first team:
        </p>

        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="mb-4 p-2 rounded-md text-white silver-border w-64"
        />

        <button
          onClick={handleCreateTeam}
          disabled={creating || !teamName}
          className="px-6 py-2 bg-blue-500 hover:bg-indigo-600 silver-border text-white disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Team"}
        </button>
      </div>
    );
  }

  return null;
}

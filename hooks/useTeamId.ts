import { IMemberTeam } from "@/types/allTypes";
import { useParams } from "next/navigation";

export const useTeamId = ({ teams }: { teams: IMemberTeam[] | undefined }) => {
  const { teamId } = useParams<{ teamId: string }>();

  const team = teams?.find((team) => team.teams.id === teamId);

  return {
    team,
    teamId: team?.teams.id,
  };
};

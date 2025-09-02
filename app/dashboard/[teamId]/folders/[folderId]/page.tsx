"use client";
import { Table } from "@/components/Table/Table";
import { useFolderTableWhiteboards } from "@/hooks/getWhiteboard";
import { useTeamId } from "@/hooks/useTeamId";
import { useTeams } from "@/hooks/useTeams";
import { useUser } from "@/hooks/useUser";
import { useParams } from "next/navigation";

export default function page() {
  const { folderId } = useParams<{ folderId: string }>();
  const { data: user } = useUser();
  const { data: teams } = useTeams(user);
  const { teamId } = useTeamId({ teams });
  const { data: whiteboards } = useFolderTableWhiteboards(
    teamId!,
    folderId!
  );
  console.log(whiteboards);
  return (
    <div>
      <Table data={whiteboards} />
    </div>
  );
}

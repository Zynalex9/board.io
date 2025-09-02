"use client";
import { useAllTableWhiteboards } from "@/hooks/getWhiteboard";
import { useTeamId } from "@/hooks/useTeamId";
import { useTeams } from "@/hooks/useTeams";
import { useUser } from "@/hooks/useUser";
import { Table } from "@/components/Table/Table";
import React from "react";

export default function page() {
  const { data: user } = useUser();
  const { data: teams } = useTeams(user);
  const { teamId } = useTeamId({ teams });
  const { data: whiteboards } = useAllTableWhiteboards(teamId!);
  return (
    <div className="">
      <Table  data={whiteboards}/>
    </div>
  );
}

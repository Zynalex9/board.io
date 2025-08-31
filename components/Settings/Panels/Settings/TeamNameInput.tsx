"use client";
import { DynamicInput } from "@/components/Reuseable/DynamicInput";
import React, { useState } from "react";

export const TeamNameInput = () => {
  const [teamName, setTeamName] = useState("Zain's Team");
  return (
    <div>
      <DynamicInput
        value={teamName}
        onChangeFn={() => {}}
        setValue={setTeamName}
        label="Team Name"
        labelFor="teamName"
        type="text"
      />
    </div>
  );
};

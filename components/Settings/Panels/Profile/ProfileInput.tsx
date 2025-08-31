"use client";
import { DynamicInput } from "@/components/Reuseable/DynamicInput";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export const ProfileInput = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = React.useState(user?.username || "");
  const [email, setEmail] = React.useState(user?.email || "");
  return (
    <div className="space-y-8">
      <DynamicInput
        value={username || ""}
        onChangeFn={() => {}}
        setValue={setUsername}
        label="Name"
        labelFor="name"
        type="text"
      />
      <DynamicInput
        value={email || ""}
        onChangeFn={() => {}}
        setValue={setEmail}
        label="Email"
        labelFor="email"
        type="email"
      />
    </div>
  );
};

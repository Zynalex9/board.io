import React from "react";
import { TeamNameInput } from "./TeamNameInput";

export const TeamSettings = () => {
  return (
    <div>
      <h1 className="font-Inter text-2xl">Basic Information</h1>
      <div className="my-4 w-[20rem]">
        <TeamNameInput />
      </div>
      <div className="w-full bg-primary-bg border-red-500 border-1 px-4 py-2 space-y-6 rounded-xl">
        <h2 className="mt-5 text-red-500">Danger Zone</h2>
        <p className="text-sm">
          Proceed with caution, once completed, these actions cannot be undone.
        </p>
        <button className="mb-5 silver-border px-2 py-1.5 bg-black text-white cursor-pointer hover:bg-black/50">
          Delete Team
        </button>
      </div>
    </div>
  );
};

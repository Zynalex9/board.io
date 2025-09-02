import React from "react";
import { Links } from "./Links";
import { BsSendPlus } from "react-icons/bs";
import { InviteBar } from "./InviteBar";

export const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-8">
      <Links />
      <InviteBar />
    </div>
  );
};

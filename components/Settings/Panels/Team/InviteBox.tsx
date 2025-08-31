"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const InviteBox = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="">
      <h2 className="text-md font-Inter mb-3">Settings</h2>
      <div className="flex items-center space-x-2">
        <Label htmlFor="invite" className="text-xs">Invite</Label>
        <Switch
          id="invite"
          checked={enabled}
          onCheckedChange={setEnabled}
          className={enabled ? "bg-blue-300" : "bg-gray-500"}
        />
      </div>
    </div>
  );
};

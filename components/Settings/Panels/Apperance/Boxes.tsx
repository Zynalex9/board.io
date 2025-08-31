"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const Boxes = () => {
  return (
    <RadioGroup
      defaultValue="light"
      className="flex items-center justify-between gap-4"
    >
      <div className="silver-border bg-gradient-to-b from-[#171717] to-[#242424] p-4 flex gap-4 items-center justify-between rounded-md">
        <RadioGroupItem
          value="light"
          id="light"
          className="data-[state=checked]:bg-green-500"
        />
        <div className="space-y-1">
          <Label htmlFor="light" className="text-white cursor-pointer">
            Light
          </Label>
          <p className="text-sm text-gray-400">
            A traditional 'white' board look
          </p>
        </div>
      </div>

      <div className="silver-border bg-gradient-to-b from-[#171717] to-[#242424] p-4 flex gap-4 items-center justify-between rounded-md">
        <RadioGroupItem
          value="dark"
          id="dark"
          className="data-[state=checked]:bg-green-500"
        />
        <div className="space-y-1">
          <Label htmlFor="dark" className="text-white cursor-pointer">
            Dark
          </Label>
          <p className="text-sm text-gray-400">A sleek dark board look</p>
        </div>
      </div>

      <div className="silver-border bg-gradient-to-b from-[#171717] to-[#242424] p-4 flex gap-4 items-center justify-between rounded-md">
        <RadioGroupItem
          value="custom"
          id="custom"
          className="data-[state=checked]:bg-green-500"
        />
        <div className="space-y-1">
          <Label htmlFor="custom" className="text-white cursor-pointer">
            System Preferences
          </Label>
          <p className="text-sm text-gray-400">
            Automatically adjust to your system preferences
          </p>
        </div>
      </div>
    </RadioGroup>
  );
};

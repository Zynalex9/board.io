"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserLock, Users } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
export function ShareTypeDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1 rounded-none  bg-primary-bg my-1.5">
          Open <ChevronDown />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        align="start"
        className="w-64 bg-[#171717] silver-border shadow-xl rounded-md p-1"
      >
        <DropdownMenuItem className="hover:bg-[#222] focus:bg-[#222] rounded-md cursor-pointer">
          <div className="flex items-start gap-3 px-2 py-2">
            <Users className="text-blue-400 mt-1" size={20} />
            <div>
              <h1 className="text-sm font-medium text-white">Team File</h1>
              <p className="text-xs text-gray-400">
                Any member can find or edit this file
              </p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-[#222] focus:bg-[#222] rounded-md cursor-pointer">
          <div className="flex items-start gap-3 px-2 py-2">
            <UserLock className="text-green-400 mt-1" size={20} />
            <div>
              <h1 className="text-sm font-medium text-white">Private File</h1>
              <p className="text-xs text-gray-400">
                Only you can access and edit this file
              </p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

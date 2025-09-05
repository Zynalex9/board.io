"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CircleX,
  Eye,
  Globe,
  Pencil,
  UserLock,
  Users,
} from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
export function AcessType() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center cursor-pointer gap-1 rounded-none  bg-primary-bg my-1.5">
          Anyone with the link can edit <ChevronDown />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        align="start"
        className="w-64 bg-[#171717] silver-border shadow-xl rounded-md  p-2"
      >
        <DropdownMenuItem className="hover:bg-primary-bg focus:bg-primary-bg rounded-md cursor-pointer">
          <div className="flex items-start gap-3 px-2 py-2">
            <CircleX className="mt-1" size={20} />
            <div>
              <h1 className="text-sm font-medium text-white">No Link Access</h1>
              <p className="text-xs text-gray-400">
                Any member with invitation can see and edit it
              </p>
            </div>
          </div>
        </DropdownMenuItem>
        <div className="h-px w-full bg-gray-700/40 my-2"></div>

        <DropdownMenuItem className="hover:bg-[#222] focus:bg-[#222] rounded-md cursor-pointer">
          <div className="flex items-start gap-3 px-2 py-2">
            <Pencil className="mt-1" size={20} />
            <div>
              <h1 className="text-sm font-medium text-white">
                Anyone with link can edit
              </h1>
              <p className="text-xs text-gray-400">
                Anyone with link can edit. Requires boardio account.
              </p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-[#222] focus:bg-[#222] rounded-md cursor-pointer">
          <div className="flex items-start gap-3 px-2 py-2">
            <Eye className="mt-1" size={20} />
            <div>
              <h1 className="text-sm font-medium text-white">
                Publicly Viewable
              </h1>
              <p className="text-xs text-gray-400">
                Anyone with link can view. Does not requires boardio account.
              </p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-[#222] focus:bg-[#222] rounded-md cursor-pointer">
          <div className="flex items-start gap-3 px-2 py-2">
            <Globe className="mt-1" size={20} />
            <div>
              <h1 className="text-sm font-medium text-white">
                Publicly Editable
              </h1>
              <p className="text-xs text-gray-400">
                Anyone with link can edit. Does not requires boardio account.
              </p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, LogOut } from "lucide-react";
import { JoinTeamDialog } from "../Join/JoinTeamDialog";
import { SettingsDialog } from "../Settings/SettingsDialog";
import { Profile } from "./Profile";
import { useUser } from "@/hooks/useUser";
import { useTeams } from "@/hooks/useTeams";
import { useParams } from "next/navigation";
import Link from "next/link";
export function Name() {
  const { data: user } = useUser();
  const { data: teams } = useTeams(user);
  const { teamId } = useParams();
  const team = teams?.find((team) => team.teams.id === teamId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user && (
          <Button
            variant="ghost"
            className="text-xl px-2 py-2 hover:bg-[#2A2B2B] text-white rounded transition-all duration-100 flex items-center gap-2 focus:outline-none active:scale-95 active:outline-0"
          >
            <svg viewBox="0 0 1699 660" className="size-8">
              <path
                fill="#EC2C40"
                d="M804.7,660.3H50c-38.8,0-62.8-55-42.7-98.2L253,31.4C262,11.9,278.2,0,295.7,0h509V660.3z"
              ></path>
              <path
                fill="#00A9E5"
                d="M891.3,0L1646,0c38.8,0,62.8,55,42.7,98.2L1443,628.9c-9,19.5-25.2,31.4-42.7,31.4h-509V0z"
              ></path>
            </svg>
            <h1 className="font-Inter">{team?.teams.name}</h1>
            <ArrowDown size={28} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#171717] border-[0.5px] border-gray-400">
        {teams &&
          teams.length > 0 &&
          teams.map((team) => (
            <Link href={`/dashboard/${team.teams.id}`}>
              <DropdownMenuItem
                className={`text-white  ${
                  team.teams.id === teamId && "bg-blue-600"
                } text-sm rounded-md cursor-pointer font-Inter px-1.5 py-1`}
              >
                {team.teams.name}
              </DropdownMenuItem>
            </Link>
          ))}
        <DropdownMenuSeparator className="bg-gray-500" />
        <div className="space-y-2 px-2 py-2">
          <DropdownMenuItem asChild>
            <JoinTeamDialog />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SettingsDialog />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button className="flex items-center -mx-2 gap-2 text-xs text-gray-50 font-Inter cursor-pointer w-full">
              <LogOut size={16} />
              Logout
            </button>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-gray-500" />
        <DropdownMenuItem>
          <Profile user={user} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

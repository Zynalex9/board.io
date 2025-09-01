"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch, RootState } from "@/store/store";
import { getUser } from "@/store/userSlice";
import { ArrowDown, LogOut, Settings, Users } from "lucide-react";
import { JoinTeamDialog } from "../Join/JoinTeamDialog";
import { SettingsDialog } from "../Settings/SettingsDialog";
import { Profile } from "./Profile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { IMemberTeam } from "@/types/allTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "@/Queries/teams";
export function Name() {
  const dispatch = useDispatch<AppDispatch>();
  const getUserData = async () => {
    try {
      await dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    if (!user) {
      getUserData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const { data: teams } = useQuery({
    queryKey: ["teams", user?.id],
    queryFn: () => fetchTeams(user!.id),
    enabled: !!user,
  });
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
            <h1 className="font-Inter">{user?.username}'s Team</h1>
            <ArrowDown size={28} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#171717] border-[0.5px] border-gray-400">
        {teams &&
          teams.length > 0 &&
          teams.map((team) => (
            <DropdownMenuItem className="text-white my-1 bg-blue-600 text-sm rounded-md cursor-pointer font-Inter px-1.5 py-1">
              {team.teams.name}
            </DropdownMenuItem>
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

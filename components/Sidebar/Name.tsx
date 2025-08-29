"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch, RootState } from "@/store/store";
import { getUser } from "@/store/userSlice";
import { ArrowDown } from "lucide-react";
export function Name() {
  const [position, setPosition] = React.useState("bottom");
  const dispatch = useDispatch<AppDispatch>();
  const getUserData = async () => {
    try {
      await dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getUserData();
  }, [dispatch]);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user && (
          <Button
            variant="ghost"
            className="text-2xl flex items-center gap-2 focus:outline-none active:scale-95 active:outline-0"
          >
            <h1 className="font-Inter font-semibold">
              {user?.username}'s Team
            </h1>
            <ArrowDown size={28} />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

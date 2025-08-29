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

  const { user } = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    if (!user) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
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
      <DropdownMenuContent className="w-56 bg-[#171717]">
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

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Settings } from "lucide-react";
import { ButtonsComp } from "./ButtonsComp";
export const SettingsDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 text-xs text-gray-50 font-Inter cursor-pointer w-full">
          <Settings size={16} />
          Settings
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="!w-[73rem] silver-border !max-w-[73rem] h-[35rem] px-2 py-4 m-0 border-0 shadow-2xl bg-[#171717] flex flex-col">
        <div className="w-full px-6 flex items-center justify-between h-[4rem]">
          <h1 className="text-3xl font-Inter text-white w-[20%]">Settings</h1>
          <div className="flex items-center gap-2 w-[80%]">
            <input
              className="silver-border px-2 py-1.5 focus:outline-none active:outline-none w-[90%]"
              placeholder="Search"
            />
            <AlertDialogCancel className="bg-primary-bg border-0">
              Cancel
            </AlertDialogCancel>
          </div>
        </div>
        <div className="h-px w-full bg-gray-400/40"></div>
        <div className="flex flex-grow px-6">
          <div className="w-1/5 h-full">
            <ButtonsComp />
          </div>
          <div className="w-4/5 h-full"></div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

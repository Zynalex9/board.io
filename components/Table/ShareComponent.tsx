import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, QrCode, Share } from "lucide-react";
import { ShareTypeDropdown } from "./ShareType";
import { AcessType } from "./AccessType";
import { InvitesSection } from "./InvitesSection";
export const ShareComponent = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-1 hovered cursor-pointer w-full">
          <Share />
          <span className="ml-2 text-xs">Share</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="px-7 py-4 m-0 border-0 shadow-2xl bg-[#171717]">
        <AlertDialogHeader>
          <div className="flex items-center justify-between  py-3 rounded-t-lg">
            <h1 className="font-inter text-lg font-semibold text-white">
              Share File
            </h1>
            <div className="flex items-center gap-2">
              <button
                className="hover:bg-[#2A2A2A] transition-colors duration-200
                   silver-border rounded-md p-2 flex items-center justify-center"
                title="Generate QR Code"
              >
                <QrCode size={18} className="text-gray-300" />
              </button>

              <button
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium
                   silver-border rounded-md hover:bg-[#2A2A2A] transition-colors duration-200 cursor-pointer"
              >
                <Link size={17} className="text-gray-300" />
                <span className="text-gray-200">Copy Link</span>
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-gray-700/40"></div>
        </AlertDialogHeader>

        <div>
          <h1 className="font-semibold font-Inter text-xl">Settings</h1>
          <ShareTypeDropdown />
          <AcessType />
          <div className="mt-6">
            <InvitesSection />
          </div>
          <div className="mt-7 bg-primary-bg p-4 silver-border rounded-md mx-3">
            <p className="text-sm">
              Invitees can always view and edit files, regardless of the file
              share settings.
            </p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

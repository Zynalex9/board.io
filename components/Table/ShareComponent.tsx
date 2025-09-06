'use client'
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, Share, Copy, RefreshCw } from "lucide-react";
import { ShareTypeDropdown } from "./ShareType";
import { AcessType } from "./AccessType";
import { InvitesSection } from "./InvitesSection";
import { IAllTableData } from "@/types/allTypes";
import { toast } from "sonner";
import { createShareableLink, refreshShareableLink } from "@/lib/shareableLink";
import { supabase } from "@/lib/supabase";

export const ShareComponent = ({ file }: { file: IAllTableData }) => {
  const [shareLink, setShareLink] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateShareLink = async () => {
    setIsGenerating(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to generate share links");
        return;
      }

      const { data: link, error } = await createShareableLink(
        file.id,
        'whiteboard', 
        user.user?.id!,
        { expiresInDays: 30 } 
      );

      if (error) {
        toast.error("Failed to generate share link");
        console.error(error);
        return;
      }

      const fullLink = `${window.location.origin}/join/${link.token}`;
      setShareLink(fullLink);
      toast.success("Share link generated");
    } catch (error) {
      toast.error("Failed to generate share link");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const refreshShareLink = async () => {
    if (!shareLink) return;
    
    setIsRefreshing(true);
    try {
      const token = shareLink.split('/').pop();
      if (!token) {
        toast.error("Invalid share link");
        return;
      }

      const { data: newLink, error } = await refreshShareableLink(token);
      if (error) {
        toast.error("Failed to refresh share link");
        console.error(error);
        return;
      }

      const fullLink = `${window.location.origin}/join/${newLink.token}`;
      setShareLink(fullLink);
      toast.success("Share link refreshed");
    } catch (error) {
      toast.error("Failed to refresh share link");
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyShareLink = () => {
    if (!shareLink) {
      toast.error("No share link generated yet");
      return;
    }
    
    navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-1 hovered cursor-pointer w-full">
          <Share />
          <span className="ml-2 text-xs">Share</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="px-7 py-4 m-0 border-0 shadow-2xl bg-[#171717] max-h-[80vh] overflow-y-auto minimal-scrollbar">
        <AlertDialogHeader>
          <div className="flex items-center justify-between py-3 rounded-t-lg">
            <h1 className="font-inter text-lg font-semibold text-white">
              Share File
            </h1>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium
                   silver-border rounded-md hover:bg-[#2A2A2A] transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/dashboard/board/${file.id}`
                  );
                  toast.success("File link copied");
                }}
              >
                <Link size={17} className="text-gray-300" />
                <span className="text-gray-200">Copy File Link</span>
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-gray-700/40"></div>
        </AlertDialogHeader>

        <div>
          <h1 className="font-semibold font-Inter text-xl mb-4">Settings</h1>
          <ShareTypeDropdown />
          <AcessType />
          
          <div className="mt-6">
            <h2 className="font-semibold text-gray-200 mb-3">Shareable Link</h2>
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={generateShareLink}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 
                         disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Link size={16} />
                    Generate Share Link
                  </>
                )}
              </button>
              
              {shareLink && (
                <button
                  onClick={refreshShareLink}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 hover:bg-gray-700 
                           disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                >
                  {isRefreshing ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      Refresh Link
                    </>
                  )}
                </button>
              )}
            </div>
            
            {shareLink && (
              <div className="bg-[#2A2A2A] rounded-md p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Share Link (Expires in 30 days)</span>
                  <button
                    onClick={copyShareLink}
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>
                <div className="bg-[#1A1A1A] rounded p-2">
                  <p className="text-sm text-gray-300 truncate">{shareLink}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <InvitesSection file={file} />
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
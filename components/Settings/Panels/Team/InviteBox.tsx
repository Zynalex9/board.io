"use client";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { createShareableLink, refreshShareableLink } from "@/lib/shareableLink";
import { useParams } from "next/navigation";

export const InviteBox = () => {
  const [enabled, setEnabled] = useState(false);
  const [shareLink, setShareLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { teamId } = useParams();

  useEffect(() => {
    const checkExistingInvite = async () => {
      try {
        const { data: links, error } = await supabase
          .from("shareable_links")
          .select("*")
          .eq("target_id", teamId)
          .eq("target_type", "team")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) throw error;

        if (links && links.length > 0) {
          const link = links[0];
          if (!link.expires_at || new Date(link.expires_at) > new Date()) {
            setEnabled(true);
            setShareLink(`${window.location.origin}/join/team/${link.token}`);
          }
        }
      } catch (error) {
        console.error("Error checking existing invites:", error);
      }
    };

    checkExistingInvite();
  }, [teamId]);

  const generateTeamInviteLink = async () => {
    setIsLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to generate invite links");
        return;
      }

      const { data: link, error } = await createShareableLink(
        teamId as string,
        "team",
        user.user?.id!,
        { expiresInDays: 30 }
      );

      if (error) {
        toast.error("Failed to generate invite link");
        console.error(error);
        return;
      }

      const fullLink = `${window.location.origin}/join/${link.token}`;
      setShareLink(fullLink);
      toast.success("Team invite link generated");
    } catch (error) {
      toast.error("Failed to generate invite link");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshInviteLink = async () => {
    if (!shareLink) return;

    setIsRefreshing(true);
    try {
      const token = shareLink.split("/").pop();
      if (!token) {
        toast.error("Invalid invite link");
        return;
      }

      const { data: newLink, error } = await refreshShareableLink(token);
      if (error) {
        toast.error("Failed to refresh invite link");
        console.error(error);
        return;
      }

      const fullLink = `${window.location.origin}/join/${newLink.token}`;
      setShareLink(fullLink);
      toast.success("Invite link refreshed");
    } catch (error) {
      toast.error("Failed to refresh invite link");
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyInviteLink = () => {
    if (!shareLink) {
      toast.error("No invite link generated yet");
      return;
    }

    navigator.clipboard.writeText(shareLink);
    toast.success("Invite link copied to clipboard");
  };

  const handleToggle = async (checked: boolean) => {
    setEnabled(checked);

    if (checked) {
      await generateTeamInviteLink();
    } else {
      setShareLink("");
      toast.info("Team invites disabled");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="team-invite" className="text-xs font-medium">
            Team Invite Link
          </Label>
          <Switch
            id="team-invite"
            checked={enabled}
            onCheckedChange={handleToggle}
            className={enabled ? "bg-blue-300" : "bg-gray-500"}
            disabled={isLoading}
          />
        </div>
        
        {enabled && shareLink && (
          <div className="flex items-center gap-1">
            <button
              onClick={copyInviteLink}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Copy link"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={refreshInviteLink}
              disabled={isRefreshing}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              title="Refresh link"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          </div>
        )}
      </div>

      {enabled && shareLink && (
        <div className="bg-gray-50 dark:bg-primary-bg2  p-2 silver-border">
          <div className="flex items-center gap-2 mb-1">
            <LinkIcon size={12} className="text-gray-400" />
            <p className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1">
              {shareLink}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Expires in 30 days • Anyone can join
          </p>
        </div>
      )}

      {enabled && isLoading && (
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <RefreshCw size={12} className="animate-spin" />
          Generating invite link...
        </div>
      )}
    </div>
  );
};
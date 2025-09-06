"use client";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function JoinTeamPage() {
  const { token } = useParams<{ token: string }>();
  const { data: user, isPending: isUserLoading } = useUser();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [linkInfo, setLinkInfo] = useState<any>(null);
  const [status, setStatus] = useState<
    "loading" | "valid" | "invalid" | "expired" | "used" | "success"
  >("loading");

  const processShareableLink = async () => {
    if (!user || !linkInfo) return;
    
    setIsProcessing(true);
    try {
      const { data: existingAccess } = await supabase
        .from("team_members")
        .select("id")
        .eq("team_id", linkInfo.target_id)
        .eq("user_id", user.id)
        .single();

      if (existingAccess) {
        toast.success("You already have access to this team");
        router.push(`/dashboard/team/${linkInfo.target_id}`);
        return;
      }
      const { error: memberError } = await supabase
        .from("team_members")
        .insert([{
          team_id: linkInfo.target_id,
          user_id: user.id,
          role: "member", 
          joined_at: new Date().toISOString()
        }]);

      if (memberError) throw memberError;

      const { error: linkError } = await supabase
        .from("shareable_links")
        .update({
          use_count: linkInfo.use_count + 1,
          is_active: linkInfo.max_uses !== null && linkInfo.use_count + 1 >= linkInfo.max_uses ? false : linkInfo.is_active
        })
        .eq("token", token);

      if (linkError) throw linkError;

      setStatus('success');
      toast.success("Successfully joined the team!");
      
      setTimeout(() => {
        router.push(`/dashboard/team/${linkInfo.target_id}`);
      }, 1500);

    } catch (error) {
      console.error("Error processing shareable link:", error);
      toast.error("Failed to join the team");
      setStatus('invalid');
    } finally {
      setIsProcessing(false);
    }
  };

  const validateLink = async () => {
    if (!token) {
      setStatus('invalid');
      return;
    }

    try {
      const { data, error } = await supabase
        .from("shareable_links")
        .select("*")
        .eq("token", token)
        .single();

      if (error || !data) {
        setStatus('invalid');
        return;
      }

      setLinkInfo(data);

      if (!data.is_active) {
        setStatus('used');
        return;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setStatus('expired');
        return;
      }

      if (data.max_uses !== null && data.use_count >= data.max_uses) {
        setStatus('used');
        return;
      }

      if (data.target_type !== 'team') {
        setStatus('invalid');
        return;
      }

      setStatus('valid');

    } catch (error) {
      console.error("Error validating link:", error);
      setStatus('invalid');
    }
  };

  useEffect(() => {
    if (token) {
      validateLink();
    }
  }, [token]);

  useEffect(() => {
    if (status === 'valid' && user) {
      processShareableLink();
    }
  }, [status, user]);

  if (isUserLoading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-white">Validating your team invitation link...</p>
        </div>
      </div>
    );
  }

  if (!user && !isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full bg-primary-bg silver-border p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to accept this invitation and join the team.
          </p>
          <button
            onClick={() => router.push(`/login?redirect=/join/${token}`)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full bg-primary-bg silver-border p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Invalid Link</h2>
          <p className="text-gray-600 mb-6">
            This team invitation link is invalid or may have been revoked.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full bg-primary-bg silver-border p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Link Expired</h2>
          <p className="text-gray-600 mb-6">
            This team invitation link has expired. Please ask the team owner for a new invitation.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status === 'used') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full bg-primary-bg silver-border p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Link Already Used</h2>
          <p className="text-gray-600 mb-6">
            This team invitation link has already been used or has reached its maximum usage limit.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-md w-full bg-primary-bg silver-border p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Success!</h2>
          <p className="text-gray-600 mb-6">
            You have successfully joined the team. Redirecting you now...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing your team invitation...</p>
      </div>
    </div>
  );
}
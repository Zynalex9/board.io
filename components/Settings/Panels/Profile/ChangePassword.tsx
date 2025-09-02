"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface IData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IData>();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IData) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user?.email) {
        toast.error("User not logged in");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        toast.error("Current password is incorrect");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        toast.error(updateError.message);
        return;
      }

      toast.success("Password updated successfully");
      reset();
      setShowForm(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-white font-Inter">
              Current Password
            </Label>
            <Input
              type="password"
              id="current-password"
              placeholder="Enter the current password"
              className="bg-primary-bg silver-border"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              disabled={loading}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white font-Inter">
              New Password
            </Label>
            <Input
              type="password"
              id="new-password"
              placeholder="Enter the new password"
              className="bg-primary-bg silver-border"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              disabled={loading}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="confirm-new-password"
              className="text-white font-Inter"
            >
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirm-new-password"
              placeholder="Confirm your new password"
              className="bg-primary-bg silver-border"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
              })}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="mt-4 bg-primary-bg silver-border text-white px-3 py-1.5 rounded-md"
              onClick={() => setShowForm(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-3 py-1.5 rounded-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-primary-bg p-4 rounded silver-border">
          <h1 className="font-Inter text-md">Password</h1>
          <button
            className="text-blue-500 text-xs my-2 font-Inter"
            onClick={() => setShowForm(true)}
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
};

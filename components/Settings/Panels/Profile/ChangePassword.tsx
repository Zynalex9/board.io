"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
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
  } = useForm<IData>();

  const onSubmit = (data: IData) => {
    console.log(data);
  };
  const [showForm, setShowForm] = useState(false);
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
              placeholder="Enter the confirm password"
              className="bg-primary-bg silver-border"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="mt-4 bg-primary-bg silver-border text-white px-3 py-1.5 rounded-md"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-3 py-1.5 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-primary-bg  p-4 rounded silver-border">
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

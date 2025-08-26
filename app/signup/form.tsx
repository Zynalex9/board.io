"use client";
import React from "react";
import { Label } from "@/components/ui/aceLabel";
import { Input } from "@/components/ui/aceInput";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { WavyBackground } from "@/components/ui/wavy-background";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

interface IFormData {
  username: string;
  email: string;
  password: string;
  avatar: FileList;
}

export function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    let avatarUrl = null;
    if (data.avatar && data.avatar.length > 0) {
      const file = data.avatar[0];
      const fileExtension = file.name.split(".").pop();
      const fileName = `${data.username}_${Date.now()}.${fileExtension}`;
      const filePath = `avatars/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("boardio")
        .upload(filePath, file);
      if (uploadError) {
        console.error("Error uploading avatar:", uploadError.message);
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from("boardio").getPublicUrl(filePath);
        avatarUrl = publicUrl;
      }
    }
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          avatar_url: avatarUrl,
        },
      },
    });
    if (signUpError) {
      toast.error(signUpError.message);
      return;
    }
    reset();
  };

  const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <WavyBackground>
      <div className="shadow-input my-14 mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to board.io
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
         

          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="projectmayhem"
              type="text"
              {...register("username", { required: "username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="avatar">Profile Picture</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              {...register("avatar")}
            />
          </LabelInputContainer>
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 inline-block hover:underline">
              Login now
            </Link>
          </p>

          <button
            className={`group/btn relative cursor-pointer block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : <>Sign up &rarr;</>}

            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
          <div className="flex flex-col space-y-4">
            <button
              disabled={isSubmitting}
              onClick={handleSignInWithGoogle}
              className={`group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 cursor-pointer px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </WavyBackground>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
  email: string;
  password: string;
}

export function SignInForm() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();
  const router = useRouter();
  const onSubmit = async (data: IFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    reset();
    router.push("/dashboard");
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
      <div className="shadow-input my-4 mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Board.io
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <p>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 inline-block hover:underline"
            >
              Register now
            </Link>
          </p>
          <button
            className="group/btn relative cursor-pointer block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In" : <>Sign In &rarr;</>}

            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            <button
              className="group/btn shadow-input cursor-pointer relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
              disabled={loading}
              onClick={handleSignInWithGoogle}
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

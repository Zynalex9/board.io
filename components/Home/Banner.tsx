"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Button } from "../ui/moving-border";

export function Banner() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-16">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Board.io makes collaboration easy
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Leverage the power of canvas to create beautiful diagrams and stories
      </p>

      {/* Buttons Section */}
      <div className="flex justify-center gap-6 mt-8">
        <Button
          borderRadius="1.75rem"
          className="px-5 py-2 text-sm md:text-base bg-white dark:bg-black
            text-black dark:text-white border-whit dark:border-slate-500"
        >
          Login
        </Button>
        <Button
          borderRadius="1.75rem"
          className="px-5 py-2 text-sm md:text-base bg-white dark:bg-black 
            text-black dark:text-white border-slate-700 dark:border-slate-500"
        >
          Sign Up
        </Button>
      </div>
    </WavyBackground>
  );
}

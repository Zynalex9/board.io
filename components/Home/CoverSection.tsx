import React from "react";
import { Cover } from "@/components/ui/cover";
import { Button } from "@/components/ui/moving-border"; 
export function CoverSection() {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 mb-10">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Build amazing boards <br /> at <Cover>warp speed</Cover>
      </h1>

      <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
        Design, collaborate, and launch faster than ever.  
        Draw on canvas, write documents, generate diagrams, and let AI assist 
        your team — all in one powerful platform.
      </p>
      <div className="mt-8 flex justify-center">
        <Button
          borderRadius="1.5rem"
          className="px-6 py-3 text-base md:text-lg bg-white dark:bg-black text-black dark:text-white border-neutral-400 dark:border-neutral-600"
        >
          Try Now
        </Button>
      </div>
    </div>
  );
}

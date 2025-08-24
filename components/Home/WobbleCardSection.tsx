"use client";

import React from "react";
import { WobbleCard } from "../ui/obble-card";

export function WobbleCardSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Real-time collaboration, endless canvas
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Multiple users can draw, edit, and build diagrams together. Every
            update appears instantly—no refresh needed. Boards are infinite in
            all directions, so your ideas never run out of space.
          </p>
        </div>
        <img
          src="/undraw_live-collaboration_i8an.png"
          width={500}
          height={500}
          alt="real-time collaboration"
          className="absolute -right-4 lg:-right-[20%] grayscale filter  -bottom-10 object-contain object-center rounded-2xl"
        />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Chat & voice built-in
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Stay connected with your team—whether through a live chat sidebar or
          voice chat with a single click. Collaboration feels natural and
          instant.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Smarter diagrams with AI assistance
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Generate ERDs, flowcharts, or any diagram in seconds. Each element
            is editable—tables, arrows, shapes stay connected when moved. Select
            areas to auto-fix errors, or let AI suggest improvements
            automatically. Even project descriptions in documents can be turned
            into clear, structured diagrams.
          </p>
        </div>
        <img
          src="/undraw_character-drawing_gtvs.png"
          width={500}
          height={500}
          alt="AI-powered diagrams"
          className="absolute -right-10 md:-right-[40%] lg:-right-[15%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-slate-800 min-h-[350px]">
        <div className="max-w-sm">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Search anything, control everything
          </h2>
          <p className="mt-4 max-w-[46rem] text-left text-base/6 text-neutral-200">
            Find icons instantly—React, Next.js, AWS, and more—ready to drop
            into your board. Role-based access control gives board owners full
            flexibility: keep members in read-only mode, or grant write access
            when needed.
          </p>
        </div>
      </WobbleCard>

    </div>
  );
}

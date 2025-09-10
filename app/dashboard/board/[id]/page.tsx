"use client";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { DrawType } from "@/types/allTypes";
export default function page() {
  const [drawAction, setDrawAction] = useState<DrawType>(DrawType.Select);
  return (
    <div className="relative overflow-auto minimal-scrollbar min-h-screen  bg-primary-bg2">
      <div className="fixed left-5 top-10">
        <Sidebar drawAction={drawAction} setDrawAction={setDrawAction} />
      </div>
    </div>
  );
}

import React from "react";
import { Sidebar } from "./Sidebar";
import { AllBoxes } from "@/components/DashboardLayout/AllBoxes";
import { ReduxProvider } from "../providers";
import { Topbar } from "@/components/DashboardTopbar/TopBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <div className="flex bg-[#171717] min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4  ml-[22%] bg-[#171717]">
          <Topbar/>
          <AllBoxes />
          {children}
        </main>
      </div>
    </ReduxProvider>
  );
}

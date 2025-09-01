import React from "react";
import { Sidebar } from "./Sidebar";
import { AllBoxes } from "@/components/DashboardLayout/AllBoxes";
import { Topbar } from "@/components/DashboardTopbar/TopBar";
import { ReduxProvider } from "@/app/providers";
import ReactQueryProviders from "@/app/QueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProviders>
        <div className="flex bg-[#171717] min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4  ml-[22%] bg-[#171717]">
            <Topbar />
            <AllBoxes />
            {children}
          </main>
        </div>
      </ReactQueryProviders>
    </ReduxProvider>
  );
}

'use client'
import React from "react";
import { Sidebar } from "./Sidebar";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4  ml-[22%]">{children}</main>
      </div>
    </Provider>
  );
}

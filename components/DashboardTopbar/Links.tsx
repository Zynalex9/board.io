"use client";
import React from "react";
import { isActiveLink } from "@/lib/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderTopBar } from "./FolderTopBar";
export const Links = () => {
  const pathname = usePathname();
  const isFolder = pathname.includes("/folders/");

  if (!isFolder)
    return (
      <div>
        <Link
          href="/dashboard"
          className={` text-sm mx-2
              ${
                isActiveLink("/dashboard", pathname)
                  ? "text-white bg-primary-bg py-2 px-3 silver-border"
                  : "text-[#878787] font-semibold"
              }`}
        >
          All
        </Link>
        <Link
          href="/dashboard/recent"
          className={` text-sm mx-2
              ${
                isActiveLink("/dashboard/recent", pathname)
                  ? "text-white bg-primary-bg py-2 px-3 silver-border"
                  : "text-[#878787] font-semibold"
              }`}
        >
          Recent
        </Link>
        <Link
          href="/dashboard/created-by-me"
          className={` text-sm mx-2
              ${
                isActiveLink("/dashboard/created-by-me", pathname)
                  ? "text-white bg-primary-bg py-2 px-3 silver-border"
                  : "text-[#878787] font-semibold"
              }`}
        >
          Created by me
        </Link>
        <Link
          href="/dashboard/folders"
          className={` text-sm mx-2
              ${
                isActiveLink("/dashboard/folders", pathname)
                  ? "text-white bg-primary-bg py-2 px-3 silver-border"
                  : "text-[#878787] font-semibold"
              }`}
        >
          Folders
        </Link>
      </div>
    );
  if (isFolder) {
    return <FolderTopBar />;
  }
};

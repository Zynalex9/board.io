import { Ellipsis } from "lucide-react";
import React from "react";

export const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden table-fixed">
        <thead>
          <tr className="bg-[#2A2B2B] text-gray-200 text-left text-sm">
            <th className="px-4 py-3 font-medium w-2/5">Name</th>
            <th className="px-4 py-3 font-medium w-1/5">Created</th>
            <th className="px-4 py-3 font-medium w-1/5">Edited</th>
            <th className="px-4 py-3 font-medium w-[15%]">Members</th>
            <th className="px-4 py-3 font-medium w-[25%]">Author</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 text-sm text-gray-300">
          <tr className="hover:bg-[#1E1E1E] transition-colors">
            <td className="px-4 py-3 truncate">Untitled File</td>
            <td className="px-4 py-3">1 Year ago</td>
            <td className="px-4 py-3">2 hours ago</td>
            <td className="px-4 py-3 flex items-center space-x-1">
              <img
                src={"/Profile_avatar_placeholder_large.png"}
                className="size-5 rounded-full object-cover object-center border border-gray-600"
                alt="member avatar"
              />
              <img
                src={"/Profile_avatar_placeholder_large.png"}
                className="size-5 rounded-full object-cover object-center border border-gray-600"
                alt="member avatar"
              />
           
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <img
                  src={"/Profile_avatar_placeholder_large.png"}
                  className="size-5 rounded-full object-cover object-center border border-gray-600"
                  alt="author avatar"
                />
                <Ellipsis size={14}/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

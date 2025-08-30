import React from "react";

export const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#2A2B2B] text-gray-200 text-left text-sm">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium">Edited</th>
            <th className="px-4 py-3 font-medium">Comments</th>
            <th className="px-4 py-3 font-medium">Author</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 text-sm text-gray-300">
          <tr className="hover:bg-[#1E1E1E] transition-colors">
            <td className="px-4 py-3">Untitled File</td>
            <td className="px-4 py-3">1 Year ago</td>
            <td className="px-4 py-3">2 hours ago</td>
            <td className="px-4 py-3">0</td>
            <td className="px-4 py-3">
              <img
                src={"/Profile_avatar_placeholder_large.png"}
                className="size-8 rounded-full object-cover object-center border border-gray-600"
                alt="author avatar"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

import { IAllTableData } from "@/types/allTypes";
import { Ellipsis } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

export const Table = ({
  data,
}: {
  data: IAllTableData[] | null | undefined;
}) => {
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
          {data &&
            data.length > 0 &&
            data.map((file) => {
              const owner = file.board_members.find(
                (m) => m.role === "owner"
              )?.users;

              const members = file.board_members.filter(
                (m) => m.role !== "owner"
              );

              return (
                <tr
                  key={file.id}
                  className="hover:bg-[#1E1E1E] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 truncate">{file.name}</td>
                  <td className="px-4 py-3">
                    {formatDistanceToNow(new Date(file.created_at), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {formatDistanceToNow(new Date(file.updated_at), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="px-4 py-3 flex items-center space-x-1">
                    {members.length > 0 ? members.map((member, i) => (
                      <img
                        key={i}
                        src={member.users.avatar_url}
                        className="size-5 rounded-full object-cover object-center border border-gray-600"
                        alt="member avatar"
                      />
                    )) : <p className="text-center">-</p>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {owner?.avatar_url ? (
                        <img
                          src={owner.avatar_url}
                          className="size-5 rounded-full object-cover object-center border border-gray-600"
                          alt="author avatar"
                        />
                      ) : (
                        <img
                          src="/Profile_avatar_placeholder_large.png"
                          className="size-5 rounded-full object-cover object-center border border-gray-600"
                          alt="author avatar"
                        />
                      )}
                      <Ellipsis size={14} />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

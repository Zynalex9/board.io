import { IAllTableData } from "@/types/allTypes";
import { formatDistanceToNow } from "date-fns";
import { Ellipsis } from "lucide-react";
import React from "react";

export const TableBody = ({
  data,
}: {
  data: IAllTableData[] | null | undefined;
}) => {
  return (
    <tbody className="divide-y divide-gray-700 text-sm text-gray-300">
      {data &&
        data.length > 0 &&
        data.map((file) => {
          const owner = file.board_members.find(
            (m) => m.role === "owner"
          )?.users;

          const members = file.board_members.filter((m) => m.role !== "owner");

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
                {members.length > 0 ? (
                  members.map((member, i) => (
                    <img
                      key={i}
                      src={member.users.avatar_url}
                      className="size-5 rounded-full object-cover object-center border border-gray-600"
                      alt="member avatar"
                    />
                  ))
                ) : (
                  <p className="text-center">-</p>
                )}
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
  );
};

"use client";
import { IAllTableData } from "@/types/allTypes";
import { formatDistanceToNow } from "date-fns";
import { Ellipsis, Link, Move, Pencil, Share } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CgDuplicate } from "react-icons/cg";
import { BsTrash } from "react-icons/bs";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditFileName } from "@/Queries/file";
import { ShareComponent } from "./ShareComponent";
export const TableBody = ({
  data,
}: {
  data: IAllTableData[] | null | undefined;
}) => {
  const [isEditing, setIsEditing] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link Copied", {
      position: "bottom-left",
    });
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ newName, file }: { newName: string; file: IAllTableData }) =>
      EditFileName(file.id, newName),
    onSettled: (_, __, { file }) => {
      queryClient.invalidateQueries({
        queryKey: ["allFolderTableWhiteboards", file.team_id, file.folder_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["allTableWhiteboards", file.team_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["whiteboards", file.team_id],
      });
    },
  });

  const handleRename = (file: IAllTableData) => {
    if (newName === file.name) return;
    if (!newName) {
      toast.error("Enter a new name");
      return;
    }
    mutation.isPending && toast.loading("Renaming...");
    mutation.mutate(
      { newName, file },
      {
        onSuccess: () => {
          toast.success("Renamed Successfully");
          setIsEditing("");
        },
        onError: (err: any) => {
          toast.error(err.message || "Something went wrong");
        },
      }
    );
  };

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
              <td className="py-3 truncate">
                {isEditing === file.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter folder name"
                      className="flex-1 bg-transparent border border-neutral-600 focus:border-blue-500 text-white rounded-md px-3 py-2 outline-none"
                      defaultValue={file.name}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                      onBlur={() => setIsEditing("")}
                      onKeyDown={(e) => e.key === "Enter" && handleRename(file)}
                    />
                  </div>
                ) : (
                  file.name
                )}
              </td>
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
                      src={
                        member?.users?.avatar_url
                          ? member?.users?.avatar_url
                          : "/Profile_avatar_placeholder_large.png"
                      }
                      className="size-5 rounded-full object-cover object-center border border-gray-600"
                      alt="member avatar"
                    />
                  ))
                ) : (
                  <p className="text-center">-</p>
                )}
              </td>
              <td className="px-2 py-3">
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
                      className="size-8 rounded-full object-cover object-center border border-gray-600"
                      alt="author avatar"
                    />
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Ellipsis size={25} className="hovered p-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#171717] silver-border shadow-xl">
                      <DropdownMenuItem>
                        <button
                          className="flex items-center gap-1 hovered cursor-pointer w-full"
                          onClick={() =>
                            handleCopy(
                              `${window.location.origin}/dashboard/board/${file.id}`
                            )
                          }
                        >
                          <Link />
                          <span className="ml-2 text-xs">Copy Link</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="flex items-center gap-1 hovered cursor-pointer w-full">
                          <Pencil />
                          <span
                            className="ml-2 text-xs"
                            onClick={() => setIsEditing(file.id)}
                          >
                            Rename
                          </span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <ShareComponent file={file} />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="flex items-center gap-1 hovered cursor-pointer w-full">
                          <Move />
                          <span className="ml-2 text-xs">Move</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="flex items-center gap-1 hovered cursor-pointer w-full">
                          <CgDuplicate />
                          <span className="ml-2 text-xs">Duplicate</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="flex items-center gap-1 hovered cursor-pointer w-full">
                          <BsTrash className="text-red-500" />
                          <span className="ml-2 text-xs text-red-500">
                            Delete
                          </span>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

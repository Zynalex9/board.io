import { IAllTableData } from "@/types/allTypes";
import React from "react";
import { TableBody } from "./TableBody";

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
            <th className="px-4 py-3 font-medium w-[10%]">Members</th>
            <th className="px-4 py-3 font-medium w-[30%]">Author</th>
          </tr>
        </thead>
        <TableBody data={data} />
      </table>
    </div>
  );
};

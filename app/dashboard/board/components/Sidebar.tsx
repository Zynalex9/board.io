"use client";
import { DrawType } from "@/types/allTypes";
import { Plus } from "lucide-react";
import { LuSquareDashed } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { MdOutlineTextFields } from "react-icons/md";
import React, { Dispatch, SetStateAction } from "react";
import {
  BsArrowUpRight,
  BsCircle,
  BsCursor,
  BsPencil,
  BsStars,
} from "react-icons/bs";
import { TbRectangle } from "react-icons/tb";

interface SidebarProps {
  drawAction: DrawType;
  setDrawAction: Dispatch<SetStateAction<DrawType>>;
}

export const Sidebar = ({ drawAction, setDrawAction }: SidebarProps) => {
  const btnClass = (tool: DrawType) =>
    `flex items-center justify-center px-2 py-1.5 rounded-md  text-white cursor-pointer
     ${drawAction === tool ? "bg-primary-bg" : "bg-primary-bg2"}
     hover:bg-primary-bg w-full`;

  return (
    <div className="w-[3rem] absolute z-[10000] flex flex-col items-center h-[30rem]">
      <button className="flex items-center justify-center px-2 py-1.5 bg-primary-bg2 silver-border-nr rounded-md text-white hover:bg-primary-bg">
        <Plus />
      </button>
      <button className="flex items-center justify-center mt-2 px-2 py-1.5 bg-primary-bg2 silver-border-nr rounded-md text-white hover:bg-primary-bg">
        <BsStars size={24} />
      </button>
      <div className="w-full p-1 flex flex-col items-center bg-primary-bg2 silver-border-nr rounded-md gap-4 my-4">
        <button onClick={() => setDrawAction(DrawType.Select)} className={btnClass(DrawType.Select)}>
          <BsCursor />
        </button>
        <button onClick={() => setDrawAction(DrawType.Rectangle)} className={btnClass(DrawType.Rectangle)}>
          <TbRectangle />
        </button>
        <button onClick={() => setDrawAction(DrawType.Circle)} className={btnClass(DrawType.Circle)}>
          <BsCircle />
        </button>
        <button onClick={() => setDrawAction(DrawType.Arrow)} className={btnClass(DrawType.Arrow)}>
          <BsArrowUpRight />
        </button>
        <button onClick={() => setDrawAction(DrawType.Line)} className={btnClass(DrawType.Line)}>
          <svg
            role="img"
            width="9"
            height="9"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 9 9"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="currentColor"
              d="M1.18499 8.59319C0.8921 8.3003 0.916513 7.80101 1.23952 7.478L7.47801 1.23951C7.80102 0.916502 8.30031 0.892089 8.5932 1.18498C8.8861 1.47787 8.86168 1.97716 8.53867 2.30017L2.30018 8.53866C1.97717 8.86167 1.47789 8.88609 1.18499 8.59319Z"
            ></path>
          </svg>
        </button>
        <button onClick={() => setDrawAction(DrawType.Scribble)} className={btnClass(DrawType.Scribble)}>
          <BsPencil />
        </button>
        <button onClick={() => setDrawAction(DrawType.Text)} className={btnClass(DrawType.Text)}>
          <MdOutlineTextFields />
        </button>
      </div>
      <div className="w-full flex flex-col items-center bg-primary-bg2 silver-border-nr rounded-md gap-2">
        <button className="flex items-center justify-center px-2 py-1.5 bg-primary-bg2 rounded-md text-white hover:bg-primary-bg">
          <LuSquareDashed />
        </button>
        <button className="flex items-center justify-center px-2 py-1.5 bg-primary-bg2 rounded-md text-white hover:bg-primary-bg">
          <FiMessageSquare />
        </button>
      </div>
    </div>
  );
};

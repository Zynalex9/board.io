import { type IconType } from "react-icons";
import { type LucideIcon } from "lucide-react";

type CustomIcon = IconType | LucideIcon;

export const CustomButton = ({
  btnText,
  Icon,
  handleClick,
  isActive,
}: {
  btnText: string;
  Icon: CustomIcon;
  handleClick?: () => void;
  isActive?: boolean;
}) => {
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-2 py-1.5 hover:bg- text-sm text-gray-50 font-Inter cursor-pointer w-full rounded-sm ${
        isActive
          ? "bg-blue-500"
          : "hover:bg-[#2A2B2B] text-white rounded transition-all duration-100"
      } `}
    >
      <Icon size={16} />
      {btnText}
    </button>
  );
};

"use client";
import React, { useState } from "react";
import { FaUsers, FaMoneyBill, FaGitAlt } from "react-icons/fa";
import { TbSettingsCog } from "react-icons/tb";
import { CustomButton } from "./CustomButton";

export const ButtonsComp = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const data = [
    {
      id: "teamMember",
      btnText: "Team Members",
      Icon: FaUsers,
    },
    {
      id: "billing",
      btnText: "Plans and Billing",
      Icon: FaMoneyBill,
    },
    {
      id: "git",
      btnText: "Git Connection",
      Icon: FaGitAlt,
    },
    {
      id: "settings",
      btnText: "Team Settings",
      Icon: TbSettingsCog,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <CustomButton
          key={item.id}
          btnText={item.btnText}
          Icon={item.Icon}
          handleClick={() => setActiveTab(item.id)}
          isActive={activeTab === item.id}
        />
      ))}
    </div>
  );
};

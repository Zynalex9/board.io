"use client";
import React, { useState } from "react";
import { FaUsers, FaMoneyBill, FaGitAlt, FaEye } from "react-icons/fa";
import { TbSettingsCog } from "react-icons/tb";
import { CustomButton } from "./CustomButton";
import { CgProfile } from "react-icons/cg";
export const ButtonsComp = () => {
  const [activeTab, setActiveTab] = useState<string>("teamMember");

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
  const personalData = [
    {
      id: "profile",
      btnText: "Profile",
      Icon: CgProfile,
    },
    {
      id: "appearance",
      btnText: "Appearance",
      Icon: FaEye,
    },
  ];
  return (
    <div>
      <h2 className="text-[8px] font-semibold font-Inter text-white mb-3">
        TEAM
      </h2>
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
      <div className="mt-32">
        <h2 className="text-[8px] font-semibold font-Inter text-white mb-3">
          PERSONAL
        </h2>
        <div className="flex flex-col gap-2">
          {personalData.map((item) => (
            <CustomButton
              key={item.id}
              btnText={item.btnText}
              Icon={item.Icon}
              handleClick={() => setActiveTab(item.id)}
              isActive={activeTab === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

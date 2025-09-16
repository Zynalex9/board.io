import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { Messages } from "./Messages";

export const Chat = ({
  openChat,
  setOpenChat,
}: {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-[40%] pb-2 rounded-md h-[80vh] flex flex-col silver-border-nr bg-primary-bg mt-14">
      <ChatHeader openChat={openChat} setOpenChat={setOpenChat} />
      <div className="flex-grow px-2 overflow-y-auto minimal-scrollbar">
        <Messages />
      </div>
      <ChatInput />
    </div>
  );
};

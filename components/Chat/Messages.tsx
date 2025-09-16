"use client";
import { useSocket } from "@/context/socket.context";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { Message } from "@/types/allTypes";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export const Messages = () => {
  const { id } = useParams();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { socket } = useSocket();
  const { data: user } = useUser();

  const fetchMessages = async () => {
    console.log("I am the id", id);
    const { data, error: MessagesError } = await supabase
      .from("chats")
      .select("*, user:sender_id(*)")
      .eq("board_id", id);

    if (MessagesError) throw new Error(MessagesError.message);
    setMessages(data || []);
  };

  socket?.on("newMessage", (data) => {
    console.log("data", data);
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto bg-primary-bg">
      {messages.length > 0 &&
        messages.map((message) => {
          const isMe = user?.id === message.user.id;

          return (
            <div
              key={message.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-md ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="break-words">{message.message}</p>
                <span className="mt-1 block text-xs opacity-70">
                  {message.user.username}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

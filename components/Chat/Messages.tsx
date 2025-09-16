"use client";
import { useSocket } from "@/context/socket.context";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { Message, User } from "@/types/allTypes";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";

export const Messages = () => {
  const { id } = useParams();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { socket } = useSocket();
  const { data: user } = useUser();
  const [typing, setTyping] = React.useState(false);
  const [typingUser, setTypingUser] = React.useState<User>();

  const fetchMessages = async () => {
    const { data, error: MessagesError } = await supabase
      .from("chats")
      .select("*, user:sender_id(*)")
      .eq("board_id", id);

    if (MessagesError) throw new Error(MessagesError.message);
    setMessages(data || []);
  };

  useEffect(() => {
    const handleNewMessage = (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    const handleTyping = (data: any) => {
      setTyping(data.isTyping);
      setTypingUser(data.user);
    };

    socket?.on("newMessage", handleNewMessage);
    socket?.on("onTyping", handleTyping);

    return () => {
      socket?.off("newMessage", handleNewMessage);
      socket?.off("onTyping", handleTyping);
    };
  }, [socket]);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col gap-3 py-4 px-1">
      {messages.length > 0 &&
        messages.map((message) => {
          const isMe = user?.id === message.user.id;

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                isMe ? "flex-row-reverse" : ""
              }`}
            >
              {!isMe && (
                <Image
                  src={
                    message.user.avatar_url ||
                    "/Profile_avatar_placeholder_large.png"
                  }
                  alt={message.user.username}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover border border-gray-700"
                />
              )}

              <div
                className={`flex flex-col ${
                  isMe ? "items-end text-right" : "items-start text-left"
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-medium text-gray-300">
                    {isMe
                      ? `${message.user.username} (You)`
                      : message.user.username}
                  </span>
                  <span>{format(new Date(message.created_at), "hh:mm a")}</span>
                </div>
                <p
                  className={`mt-1 px-3 py-1.5 rounded-md text-sm leading-snug 
              break-words whitespace-pre-wrap
              ${
                isMe
                  ? "bg-[var(--color-primary-bg2)] text-gray-100 max-w-[17rem]"
                  : "bg-[#1f1f1f] text-gray-200 max-w-[17rem]"
              }`}
                >
                  {message.message}
                </p>
              </div>
            </div>
          );
        })}
      {typing && typingUser && typingUser.id !== user?.id && (
        <div className="flex items-center gap-2">
          <Image
            src={
              typingUser.avatar_url || "/Profile_avatar_placeholder_large.png"
            }
            alt={typingUser.username}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover border border-gray-700"
          />
          <div className="px-3 py-1.5 rounded-md bg-[#1f1f1f] text-gray-300 text-sm flex items-center gap-1">
            <span className="mr-1">{typingUser.username} is typing</span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

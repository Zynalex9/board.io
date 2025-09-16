"use client";
import { useSocket } from "@/context/socket.context";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { id: boardId } = useParams();
  const { socket } = useSocket();
  const { data: user } = useUser();
  const [isTyping, setIsTyping] = useState(false);
  const sendMessage = async () => {
    if (message.trim() === "") return;
    socket?.emit("newMessage", {
      id: Date.now(),
      created_at: Date.now(),
      message,
      sender_id: user?.id,
      boardId,
      user,
    });
    setMessage("");
    const { error } = await supabase
      .from("chats")
      .insert({ message, board_id: boardId, sender_id: user?.id });

    if (error) {
      console.error("Error saving message:", error);
      toast.error(`Error saving message to database: ${error.message}`);
      return error;
    }
  };
  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [message]);
  useEffect(() => {
    socket?.emit("onTyping", { boardId, isTyping, user });
  }, [isTyping]);
  return (
    <div className="flex items-center gap-1 px-0.5">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); 
            sendMessage();
          }
        }}
        className="w-full max-h-32 resize-none overflow-y-auto rounded-lg border border-gray-500 bg-primary-bg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={sendMessage}
        className="rounded-md bg-blue-600 p-2 text-sm text-white hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

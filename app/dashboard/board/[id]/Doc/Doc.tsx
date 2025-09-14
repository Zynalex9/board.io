"use client";

import React, { useEffect } from "react";
import "./styles.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import { MenuBar } from "./MenuBar";
import FontSize from "./FontSize";
import { useSocket } from "@/context/socket.context";

export const Doc = ({ boardId }: { boardId: string }) => {
  let timeout: NodeJS.Timeout;
  const { socket } = useSocket();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      ...FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Start writing here...</p>",
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("html: ", html);
        console.log("json: ", json);
        const body = {
          json,
          boardId,
        };
        socket?.emit("documented:updated", body);
      }, 1000);
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "focus:outline-0 w-full text-white text-xl placeholder:text-3xl placeholder:text-grayish focus:outline-0 border-0",
      },
    },
  });
  useEffect(() => {
    if (!editor || !socket) return; 

    const handleUpdate = (json: any) => {
      editor.commands.setContent(json);
      console.log("I RAN ", json);
    };

    socket.on("documented:updated", handleUpdate);

    return () => {
      socket.off("documented:updated", handleUpdate);
    };
  }, [socket, editor]); 

  return (
    <div className="pt-20 border-r border-r-gray-400 w-full h-[100vh] max-h-100vh overflow-auto minimal-scrollbar">
      <div className="w-full flex items-center gap-2 px-4 py-2">
        <input
          className="text-3xl text-gray-700 placeholder:text-3xl placeholder:text-gray-400 focus:outline-0 border-0"
          placeholder="Untitled File"
        />
      </div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none px-4 py-2 focus:outline-none"
      />
    </div>
  );
};

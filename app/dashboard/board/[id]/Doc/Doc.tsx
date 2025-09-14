"use client";

import React from "react";
import "./styles.scss";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import { MenuBar } from "./MenuBar";
import FontSize from "./FontSize";

export const Doc = () => {
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

    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "focus:outline-0 w-[28rem] text-white text-xl placeholder:text-3xl placeholder:text-grayish focus:outline-0 border-0",
      },
    },
  });

  return (
    <div className="pt-20 border-r border-r-gray-400 w-[30rem] max-h-[100vh] overflow-auto minimal-scrollbar">
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

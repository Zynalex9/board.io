"use client";

import React from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Pilcrow,
  Type,
  Text,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle"
export const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const headingOptions = [
    {
      label: "Heading 1",
      icon: <Heading1 className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "Heading 2",
      icon: <Heading2 className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Heading 3",
      icon: <Heading3 className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Paragraph",
      icon: <Pilcrow className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
  ];

  const textStyleOptions = [
    {
      label: "Bold",
      icon: <Bold className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <Italic className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      label: "Strike",
      icon: <Strikethrough className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      label: "Highlight",
      icon: <Highlighter className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
  ];

  const alignOptions = [
    {
      label: "Left",
      icon: <AlignLeft className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Center",
      icon: <AlignCenter className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Right",
      icon: <AlignRight className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Justify",
      icon: <AlignJustify className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
  ];

  const fontSizes = ["12px", "14px", "16px", "20px", "24px", "32px"];

  return (
    <div className="flex gap-2 bg-primary-bg2 shadow-xl silver-border-nr z-50 absolute bottom-10 left-20 p-2 rounded-xl">
      {/* Typography */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle aria-label="Typography">
            <Type className="w-4 h-4 mr-1" /> T
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="flex flex-col gap-1">
            {headingOptions.map((opt, i) => (
              <Toggle
                key={i}
                pressed={opt.pressed}
                onPressedChange={opt.onClick}
                className="flex items-center justify-start gap-2"
              >
                {opt.icon} {opt.label}
              </Toggle>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Text Style */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle aria-label="Text style">
            <Text className="w-4 h-4 mr-1" /> Aa
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="flex flex-col gap-1">
            {textStyleOptions.map((opt, i) => (
              <Toggle
                key={i}
                pressed={opt.pressed}
                onPressedChange={opt.onClick}
                className="flex items-center justify-start gap-2"
              >
                {opt.icon} {opt.label}
              </Toggle>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Alignment */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle aria-label="Alignment">
            <AlignLeft className="w-4 h-4 mr-1" /> Align
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="flex flex-col gap-1">
            {alignOptions.map((opt, i) => (
              <Toggle
                key={i}
                pressed={opt.pressed}
                onPressedChange={opt.onClick}
                className="flex items-center justify-start gap-2"
              >
                {opt.icon} {opt.label}
              </Toggle>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <select
        onChange={(e) =>
          editor.chain().focus().setMark("textStyle", { fontSize: e.target.value }).run()
        }
        value={editor.getAttributes("textStyle").fontSize }
        className="border rounded p-1 text-sm"
      >
        {fontSizes.map((size) => (
          <option key={size} value={size} className="bg-primary-bg2 silver-border-nr">
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

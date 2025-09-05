"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const DynamicInput = ({
  value,
  setValue,
  onChangeFn,
  label,
  labelFor,
  type,
  placeholder,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeFn?: () => void;
  label: string;
  labelFor: string;
  type: string;
  placeholder?: string;
}) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={labelFor}
        className="text-white font-Inter text-sm font-medium"
      >
        {label}
      </Label>
      <Input
        type={type}
        id={labelFor}
        placeholder={placeholder || `Enter your ${label}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onChangeFn) {
            onChangeFn();
          }
        }}
        className="bg-primary-bg silver-border text-white placeholder:text-gray-500 
                   focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
      />
    </div>
  );
};

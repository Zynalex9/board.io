"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const DynamicInput = ({
  value,
  label,
  labelFor,
  type,
  onChangeFn,
  placeholder,
  setValue
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeFn: () => void;
  label: string;
  labelFor: string;
  type: string;
  placeholder?: string;
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={labelFor} className="text-white font-Inter">{label}</Label>
      <Input
        type={type}
        id={labelFor}
        placeholder={placeholder || `Enter your ${label}`}
        onKeyDown={(e) => e.key === "Enter" && onChangeFn()}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="bg-primary-bg silver-border"
      />
    </div>
  );
};

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectBox() {
  return (
    <Select>
      <SelectTrigger className="w-[120px] bg-primary-bg border-0">
        <SelectValue placeholder="Pending" />
      </SelectTrigger>
      <SelectContent className="bg-primary-bg border-">
        <SelectGroup>
          <SelectItem value="cancel">Cancel Invitation</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

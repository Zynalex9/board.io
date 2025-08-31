import React from "react";
import { Boxes } from "./Boxes";

export const Appearance = () => {
  return (
    <div className="space-y-4">
      <p>
        Toggle between Light & Dark mode at any time with ⇧ Alt D . Your
        personal settings do not affect what others see.
      </p>
      <Boxes />
    </div>
  );
};

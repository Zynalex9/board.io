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
      <img
        src="https://app.eraser.io/static/images/settingsModal/darkBg.svg"
        alt=""
        className="h-[16rem]  object-fill object-center"
      />
    </div>
  );
};

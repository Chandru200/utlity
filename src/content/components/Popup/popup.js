import React from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";
export function OpenPopUp({ elementID, textcomponent, PopupComponent }) {
  const dummyEle = document.createElement("div");
  dummyEle.id = "popupfromextension";
  dummyEle.style =
    "position: absolute;top: 0px;left: 0px;height: 100%;width: 100%;display: flex;align-items: center;justify-content: center";
  document.getElementById(elementID).appendChild(dummyEle);
  const rootInstance = createRoot(dummyEle);
  rootInstance.render(
    <Popup
      textcomponent={textcomponent}
      PopupComponent={PopupComponent}
      closePopop={() => {
        dummyEle.remove();
      }}
    />
  );
}

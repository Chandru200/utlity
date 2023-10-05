import React from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

export function OpenPopUp(elementID) {
  const dummyEle = document.createElement("div");
  dummyEle.id = "popupfromextension";
  document.getElementById(elementID).appendChild(dummyEle);
  const rootInstance = createRoot(dummyEle);
  rootInstance.render(<Popup />);
}

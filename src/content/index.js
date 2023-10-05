import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const dummyEle = document.createElement("div");
dummyEle.id = "utilityAppFromExtension";
document.body.appendChild(dummyEle);
const rootInstance = createRoot(dummyEle);
rootInstance.render(<App />);

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { Provider } from "react-redux";
import store from "../content/redux/store"; // Import the Redux store

const dummyEle = document.createElement("div");
dummyEle.id = "utilityAppFromExtension";
document.body.appendChild(dummyEle);
const rootInstance = createRoot(dummyEle);
rootInstance.render(
  <Provider store={store}>
    <App />
  </Provider>
);

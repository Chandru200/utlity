import React from "react";
import { OpenPopUp, closePopUp } from "../components/Popup/popup";
import { notifyBackgroundPage } from "../message";
export default function TabOperations({ tab }) {
  const closeTab = (e) => {
    OpenPopUp({
      elementID: "tab-limitter",

      textcomponent: {
        header: "Are you sure,Do you want to close?",
        yes: "Close",
        no: "Cancel",
        font: "300",
      },
      PopupComponent: () => {
        return <></>;
      },
      onYes: () => {
        console.log("done working");
        notifyBackgroundPage("closetab", { id: tab.id });
        closePopUp();
      },
    });
  };
  return (
    <div className="tabs-wrapper">
      <div className="tab-details">
        <div>
          <span>Website:</span>
          {new URL(tab.url ? tab.url : tab.pendingUrl).origin}
        </div>
        <div>
          <span>Title:</span>
          {tab.title}
        </div>
      </div>
      <button onClick={closeTab} className="close">
        <img src={chrome.runtime.getURL("assests/images/close.png")}></img>
      </button>
    </div>
  );
}

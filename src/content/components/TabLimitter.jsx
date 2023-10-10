import React from "react";
import { StyledTL } from "./styles/StyleTL.style";
import TabOperations from "./Taboperations";
import { notifyBackgroundPage } from "../message";

export default function TabLimitter({ canShowApp }) {
  console.log(canShowApp.tabs);
  const setTablimit = (e) => {
    canShowApp.limit != e.target.parentElement.children[0].value &&
      e.target.parentElement.children[0].value.trim().length > 0 &&
      notifyBackgroundPage("setLimit", {
        limit: e.target.parentElement.children[0].value,
      });
  };
  return (
    <StyledTL id="tab-limitter">
      <div className="tabname">Tab Limitter</div>
      <div className="tab-wrapper">
        <div className="tab-form">
          <input type="number"></input>
          <button onClick={setTablimit}>Set Tab Limit</button>
        </div>
        <div className="tab-limit">Current Limt:{canShowApp.tablimit}</div>
      </div>
      <div className="taboperations">
        <div className="list-tabs">
          Currently Opened Tabs :{canShowApp.tabs.length}
        </div>
        {canShowApp.tabs &&
          canShowApp.tabs.map((tab) => {
            return <TabOperations key={tab.id} tab={tab} />;
          })}
      </div>
    </StyledTL>
  );
}

import React from "react";
import { StyledHeader } from "./styles/styledHeader.style";
export default function Header() {
  const notification_icon = "";

  return (
    <StyledHeader>
      <div className="appname">Productivity Master</div>
      <div className="notification">
        <img src={chrome.runtime.getURL("assests/images/productivity.jpeg")} />
      </div>
    </StyledHeader>
  );
}

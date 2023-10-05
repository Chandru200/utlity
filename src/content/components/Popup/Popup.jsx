import React, { useState } from "react";
import { StyledPopup } from "./stylePopup.style";
function Popup({ isOpen, onClose, onYes, onNo, Content }) {
  return (
    <StyledPopup>
      <div className={`popup ${isOpen ? "open" : ""}`}>
        <div className="popup-content">
          <span className="popup-close" onClick={onClose}>
            {/* <img src={chrome.runtime.getURL("assests/images/close.png")}></img> */}
            X
          </span>
          <Content />
          <div className="popup-buttons">
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
          </div>
        </div>
      </div>
    </StyledPopup>
  );
}

export default Popup;

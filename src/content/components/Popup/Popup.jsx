import React, { useState } from "react";
import { StyledPopup } from "./stylePopup.style";

export function Popup({ textcomponent, PopupComponent, closePopop, onYes }) {
  return (
    <StyledPopup>
      <div className={`popup-header ${textcomponent.font && "semibold"}`}>
        {textcomponent.header}
      </div>
      <PopupComponent className="popup-body" />
      <div className="popup-footer">
        <button onClick={closePopop} className="no">
          {textcomponent.no ? textcomponent.no : "Yes"}
        </button>
        <button
          onClick={(event) => {
            event.currentTarget.classList.add("yes-loader");
            event.currentTarget.disabled = true;
            onYes(closePopop);
          }}
          className="yes"
        >
          {textcomponent.yes ? textcomponent.yes : "No"}
        </button>
      </div>
    </StyledPopup>
  );
}

export default Popup;

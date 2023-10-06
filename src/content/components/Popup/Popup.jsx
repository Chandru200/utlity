import React, { useState } from "react";
import { StyledPopup } from "./stylePopup.style";

export function Popup({ textcomponent, PopupComponent, closePopop }) {
  console.log(closePopop, "closePopop");
  return (
    <StyledPopup>
      <PopupComponent />
      <div className="popup-footer">
        <button onClick={() => closePopop()} className="no">
          {textcomponent.no ? textcomponent.no : "Yes"}
        </button>
        <button className="yes">
          {textcomponent.yes ? textcomponent.yes : "No"}
        </button>
      </div>
    </StyledPopup>
  );
}

export default Popup;

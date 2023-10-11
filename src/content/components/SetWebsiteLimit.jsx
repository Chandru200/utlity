import React, { useState } from "react";
import { notifyBackgroundPage } from "../message";
export default function SetWebsiteLimit() {
  const [limitData, setLimitData] = useState({ time: "00:00" });
  const validateUrl = (url) => {
    const pattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return pattern.test(url);
  };
  const setWebiteLimit = () => {
    if (validateUrl(limitData.url) && limitData.time !== "00:00") {
      console.log(limitData);
      notifyBackgroundPage("addwebsitelimit", limitData);
    }
  };
  const setLimit = (e) => {
    if (e.currentTarget.id == "url") {
      const url = e.currentTarget.value;
      const isValidURL = e.currentTarget.validity.valid;
      if (isValidURL) {
        e.currentTarget.classList.remove("red-border");
        setLimitData({ ...limitData, url });
      } else {
        e.currentTarget.classList.add("red-border");
      }
      e.currentTarget.style.border = isValidURL;
    } else {
      setLimitData({ ...limitData, time: e.currentTarget.value });
    }
    console.log(e.currentTarget.value);
  };
  return (
    <div className="setWebsiteTab-wrapper">
      <div className="setWebForm">
        <input
          id="url"
          type="url"
          pattern=" /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/"
          placeholder="http://www.example.com"
          onChange={setLimit}
        />
        <div className="time-wrapper">
          <input
            type="time"
            id="time"
            min="00:00"
            max="23:59"
            step="1"
            value={limitData.time}
            onChange={setLimit}
          />
          <button onClick={setWebiteLimit}>SetLimit</button>
        </div>
      </div>
    </div>
  );
}

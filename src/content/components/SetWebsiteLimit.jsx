import React, { useState } from "react";
import { notifyBackgroundPage } from "../message";
import { OpenPopUp, closePopUp } from "../components/Popup/popup";

export default function SetWebsiteLimit({ website_time_limit }) {
  const [limitData, setLimitData] = useState({ url: "", time: "00:00:00" });
  const validateUrl = (url) => {
    const pattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return pattern.test(url);
  };
  const setWebiteLimit = () => {
    if (validateUrl(limitData.url) && limitData.time !== "00:00") {
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
        setLimitData({ ...limitData, url });
      }
      e.currentTarget.style.border = isValidURL;
    } else {
      setLimitData({ ...limitData, time: e.currentTarget.value });
    }
  };

  const editLimit = (data) => {
    const time_rec = data.time.split(" ");
    const time_obj = ["00", "00", "00"];
    time_rec.map((time) => {
      if (time.slice(-2) == "hr") {
        time_obj[0] = time.slice(0, -2);
      } else if (time.slice(-3) == "min") {
        time_obj[1] = time.slice(0, -3);
      } else {
        time_obj[2] = time.slice(0, -3);
      }
    });
    setLimitData({
      ...limitData,
      url: "https://" + data.url,
      time: time_obj.join(":"),
    });

    const Spinning = [
      { transform: "rotate(0) scale(1)" },
      { transform: "rotate(10deg) scale(1)" },
    ];

    const Timing = {
      duration: 200,
      iterations: 1,
    };

    document.querySelector(".setWebForm").animate(Spinning, Timing);
  };

  const deleteLimit = (data) => {
    OpenPopUp({
      elementID: "limitwebsite",

      textcomponent: {
        header: "Are you sure,Do you want to remove limit for this site?",
        yes: "Remove",
        no: "Cancel",
        font: "300",
      },
      PopupComponent: () => {
        return <></>;
      },
      onYes: () => {
        notifyBackgroundPage("delete", data.url);
        // closePopUp();
      },
    });
  };

  function formTimeDate(time) {
    const constant = {
      0: "hr",
      1: "min",
      2: "sec",
    };
    let str = "";
    const time_split = time.split(":");
    for (var i = 0; i < time_split.length; i++) {
      if (time_split[i] != "00") {
        str = `${str} ${time_split[i]}${constant[i]}`;
      }
    }
    return str.trim();
  }

  function secondsToTime(seconds) {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 8);
  }

  function formArray(obj) {
    const sortedObj = Object.fromEntries(
      Object.entries(obj).sort(([, valueA], [, valueB]) => valueB - valueA)
    );
    let array = [];
    for (let key in sortedObj) {
      let newobj = {
        url: key,
        time: formTimeDate(secondsToTime(sortedObj[key])),
      };
      array.push(newobj);
    }
    return array;
  }

  website_time_limit = website_time_limit && formArray(website_time_limit);

  return (
    <div className="weblimit-wrapper overflow">
      <div className="setWebsiteTab-wrapper">
        <div className="setWebForm">
          <input
            id="url"
            type="url"
            pattern=" /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/"
            placeholder="http://www.example.com"
            onChange={(e) => {
              setLimit(e);
            }}
            value={limitData.url}
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
      <div className="head">
        {website_time_limit ? "Time Remaining" : "Currently no restriction"}
      </div>
      {website_time_limit && (
        <div className="stats-tab">
          {website_time_limit.map((data) => {
            return (
              data.url && (
                <div key={data.url} className="limit-wrapper">
                  <div className="stats-wrapper">
                    {data.url}:<span>{data.time}</span>
                  </div>
                  <div className="options-wrapper">
                    <div onClick={() => editLimit(data)} className="edit_limit">
                      <img
                        src={chrome.runtime.getURL("assests/images/edit.png")}
                      ></img>
                    </div>
                    <div
                      onClick={() => deleteLimit(data)}
                      className="delete_limit"
                    >
                      <img
                        src={chrome.runtime.getURL("assests/images/close.png")}
                      ></img>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

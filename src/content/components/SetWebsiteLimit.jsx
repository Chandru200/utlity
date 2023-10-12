import React, { useState } from "react";
import { notifyBackgroundPage } from "../message";
export default function SetWebsiteLimit({ website_time_limit }) {
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
  website_time_limit = formArray(website_time_limit);

  //   return (
  //     <div className="setWebsiteTab-wrapper">
  //       <div className="setWebForm">
  //         <input
  //           id="url"
  //           type="url"
  //           pattern=" /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/"
  //           placeholder="http://www.example.com"
  //           onChange={setLimit}
  //         />
  //         <div className="time-wrapper">
  //           <input
  //             type="time"
  //             id="time"
  //             min="00:00"
  //             max="23:59"
  //             step="1"
  //             value={limitData.time}
  //             onChange={setLimit}
  //           />
  //           <button onClick={setWebiteLimit}>SetLimit</button>
  //         </div>
  //       </div>
  //       <div>
  //         <div>Curernt Limits </div>
  //         {website_time_limit.map((webdata) => {
  //           return (
  //             <div>
  //               {webdata.url}
  //               <span>{webdata.time}</span>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  return (
    <div className="weblimit-wrapper overflow">
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
      <div className="head">
        Website Usage for <span>{new Date().toISOString().split("T")[0]}</span>
      </div>

      <div className="stats-tab">
        {website_time_limit.map((data) => {
          return (
            data.url && (
              <div key={data.url} className="stats-wrapper">
                {data.url}:<span>{data.time}</span>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

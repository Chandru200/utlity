import React from "react";
export default function WebsiteStats({ viewTime }) {
  function toTime(seconds) {
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }
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
  function formArray(obj) {
    const sortedObj = Object.fromEntries(
      Object.entries(obj).sort(([, valueA], [, valueB]) => valueB - valueA)
    );
    let array = [];
    for (let key in sortedObj) {
      let newobj = {
        url: key,
        time: formTimeDate(toTime(sortedObj[key])),
      };
      array.push(newobj);
    }
    return array;
  }
  viewTime = viewTime && formArray(viewTime);
  return (
    <div className="weblimit-wrapper">
      <div className="head">
        Website Usage for <span>{new Date().toISOString().split("T")[0]}</span>
      </div>
      <div className="stats-tab">
        {viewTime.map((data) => {
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
